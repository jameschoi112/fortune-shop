import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Star, Heart, DollarSign, GraduationCap } from 'lucide-react';
import LoadingSpinner from './shared/LoadingSpinner';
import { generateFortune } from '../services/openai';

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
  const [cardFlipped, setCardFlipped] = useState(false);

  useEffect(() => {
    if (!location.state) {
      navigate('/');
      return;
    }

    const getFortune = async () => {
      try {
        const result = await generateFortune(location.state.userInfo);
        setFortune(result);
        setTimeout(() => {
          setLoading(false);
          setTimeout(() => setCardFlipped(true), 500);
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
      <div className="fixed top-4 right-4 z-50 flex space-x-4">
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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">오늘의 운세</h1>
          <p className="text-xl text-purple-200">
            {new Date().toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>

        <div className="perspective-1000 mb-12">
          <motion.div
            className="relative w-72 h-108 mx-auto"
            animate={{ rotateY: cardFlipped ? 180 : 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <div className={`absolute w-full h-full backface-hidden ${
              cardFlipped ? 'opacity-0' : 'opacity-100'
            }`}>
              <div className="w-full h-full fortune-card flex items-center justify-center">
                <span className="text-9xl">🎴</span>
              </div>
            </div>
            <div className={`absolute w-full h-full backface-hidden rotateY-180 ${
              cardFlipped ? 'opacity-100' : 'opacity-0'
            }`}>
              <div className="w-full h-full fortune-card p-6 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <span className="text-9xl">✨</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="glassmorphism rounded-2xl p-8">
          <div className="flex flex-wrap gap-3 mb-8">
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
            className="text-white text-lg leading-relaxed space-y-4"
          >
            {getFortuneSection(currentTab).split('\n').map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default FortuneResult;