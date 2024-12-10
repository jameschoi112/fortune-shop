import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Star, Heart, DollarSign, GraduationCap } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts';
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
  const [fortuneStats, setFortuneStats] = useState({
    '애정': 0,
    '재물': 0,
    '직장': 0,
    '건강': 0,
    '관계': 0,
    '행운': 0
  });

  useEffect(() => {
    if (!location.state) {
      navigate('/');
      return;
    }

    // 저장된 결과가 있는 경우
    if (location.state.fortune && location.state.stats) {
      setFortune(location.state.fortune);
      setFortuneStats(location.state.stats);
      setLoading(false);
      return;
    }

    const getFortune = async () => {
  try {
    const result = await generateFortune(location.state.userInfo);
    let processedStats = {}; // stats 객체를 여기서 선언

    // 수치 추출
    const statsMatch = result.match(/\[수치\]([\s\S]*?)\[\/수치\]/);
    if (statsMatch) {
      const statsText = statsMatch[1];

      statsText.split('\n').forEach(line => {
        const match = line.match(/(\S+):\s*(\d+)/);
        if (match) {
          processedStats[match[1]] = parseInt(match[2]);
        }
      });

      setFortuneStats(processedStats);
    }

    // 수치 부분을 제거하고 운세 텍스트만 저장
    const fortuneText = result.replace(/\[수치\][\s\S]*?\[\/수치\]\n\n/, '');
    setFortune(fortuneText);

    // 결과 저장 (processedStats 사용)
    const savedResult = {
      date: new Date().toISOString(),
      userInfo: location.state.userInfo,
      fortune: fortuneText,
      stats: processedStats
    };
    localStorage.setItem('lastFortuneResult', JSON.stringify(savedResult));
    localStorage.setItem('lastFortuneCheck', Date.now().toString());

    setTimeout(() => {
      setLoading(false);
    }, 1500);
  } catch (error) {
    console.error('운세 생성 오류:', error);
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
    if (!fortune) return '운세 정보를 불러오는 중입니다...';

    const sections = fortune.split('\n\n');
    const section = sections.find(s => s.includes(tab));
    return section || fortune;
  };

  // 차트 데이터 포맷팅
  const chartData = Object.entries(fortuneStats).map(([name, value]) => ({
    subject: name,
    value: value
  }));

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

        <div className="glassmorphism rounded-2xl p-8 mb-8">
          <h2 className="text-xl font-bold text-white mb-6 text-center">운세별 점수</h2>
          <div className="w-full h-[300px]">
            <ResponsiveContainer>
              <RadarChart data={chartData}>
                <PolarGrid className="text-purple-200" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: 'white' }}
                  className="text-sm"
                />
                <Radar
                  name="운세 수치"
                  dataKey="value"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.5}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-6 mt-6">
            {Object.entries(fortuneStats).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className="text-purple-200 text-sm whitespace-nowrap">{key}</div>
                <div className="text-white font-bold">{value}점</div>
              </div>
            ))}
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