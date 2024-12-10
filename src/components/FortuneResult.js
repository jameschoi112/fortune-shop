import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Star, Heart, DollarSign, GraduationCap } from 'lucide-react';
import LoadingSpinner from './shared/LoadingSpinner';
import { generateFortune } from '../services/openai';
import { marked } from 'marked';

const FortuneButton = ({ icon: Icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`
      flex items-center space-x-2 px-6 py-3 rounded-xl transition-all
      ${isActive
        ? 'bg-purple-600 text-white'
        : 'bg-white/10 text-purple-200 hover:bg-white/20'}
    `}
  >
    <Icon className="w-5 h-5" />
    <span>{label}</span>
  </button>
);

const FortuneResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [fortune, setFortune] = useState('');
  const [currentTab, setCurrentTab] = useState('총운');

  useEffect(() => {
    if (!location.state) {
      navigate('/');
      return;
    }

    const getFortune = async () => {
  try {
    const result = await generateFortune(location.state.userInfo);


    // 결과가 문자열이 아닌 경우 처리
    if (typeof result !== 'string') {
      setFortune(result.choices[0].message.content);
    } else {
      setFortune(result);
    }

    localStorage.setItem('lastFortuneCheck', Date.now().toString());
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  } catch (error) {

    alert('운세 확인 중 오류가 발생했습니다.');
    navigate('/');
  }
};

    getFortune();
  }, [location.state, navigate]);

  const tabs = [
    { id: '총운', icon: Star },
    { id: '애정운', icon: Heart },
    { id: '금전운', icon: DollarSign },
    { id: '학업운', icon: GraduationCap }
  ];

  const getFortuneSection = (tab) => {



    const sections = fortune.split('\n\n');

    const section = sections.find(s => s.includes(tab));
    return section || '운세 정보를 불러오는 중입니다...';
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="fixed top-4 right-4 z-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="p-3 bg-white/10 rounded-full text-white hover:bg-white/20"
        >
          <Home className="w-6 h-6" />
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-2xl mx-auto"
      >
        <div className="glassmorphism rounded-2xl overflow-hidden mb-8">
          <img
            src="/assets/result_fortune.jpg"
            alt="Fortune Result"
            className="w-full h-48 object-cover"
          />
          <div className="p-6 text-center">
            <h1 className="text-2xl font-bold text-white mb-2">
              {location.state?.userInfo.name}님의 운세
            </h1>
            <p className="text-purple-200">
              {new Date().toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>

        <div className="glassmorphism rounded-2xl p-8">
          <div className="flex flex-wrap gap-3 mb-8 justify-center">
            {tabs.map(({ id, icon }) => (
              <FortuneButton
                key={id}
                icon={icon}
                label={id}
                isActive={currentTab === id}
                onClick={() => setCurrentTab(id)}
              />
            ))}
          </div>
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="prose prose-invert prose-lg max-w-none"
          >
            {getFortuneSection(currentTab).split('\n').map((line, i) => (
              <div
                key={i}
                className="mb-4 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: marked(line)
                }}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default FortuneResult;