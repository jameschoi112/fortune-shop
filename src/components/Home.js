import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Coins, GraduationCap } from 'lucide-react';
import MenuBar from './shared/MenuBar';
import Sidebar from './shared/Sidebar';
import Modal from './shared/Modal';

const FortuneCard = ({ title, description, icon: Icon, onClick, stats }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className="glassmorphism rounded-2xl overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-transparent" />
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{title}</h3>
              <p className="text-purple-200 text-sm">{description}</p>
            </div>
          </div>
          {stats && (
            <div className="flex items-center space-x-4 text-sm text-purple-200">
              <span>오늘 {stats.today}명 참여</span>
              <span>•</span>
              <span>전체 {stats.total}명 참여</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Banner = ({ banners }) => {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const handleBannerClick = () => {
    if (currentBanner === 2) {
      window.open('https://sobbangjaebbang-weahter.netlify.app/', '_blank');
    }
  };

  return (
    <div className="glassmorphism rounded-2xl overflow-hidden relative">
      <div
        className="relative w-full h-36 cursor-pointer"
        onClick={handleBannerClick}
      >
        {banners.map((banner, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{
              opacity: currentBanner === index ? 1 : 0,
              x: currentBanner === index ? 0 : 20
            }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('/assets/banner_${index + 1}.jpg')`,
                opacity: 0.4
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-transparent" />
            <div className="relative z-10 h-full flex items-center p-6">
              <div className="text-left">
                <motion.span
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="inline-block text-4xl mb-2"
                >
                  ✨
                </motion.span>
                <h3 className="text-2xl font-bold text-white mb-1">{banner.title}</h3>
                <p className="text-purple-200">{banner.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentBanner(index);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300
              ${currentBanner === index
                ? 'bg-fuchsia-400 w-4'
                : 'bg-white/50 hover:bg-white/70'}`}
          />
        ))}
      </div>

      {currentBanner === 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-3 right-3"
        >
          <span className="text-sm text-white/70">
            클릭하여 이동하기 →
          </span>
        </motion.div>
      )}
    </div>
  );
};

const Home = () => {
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleNavigate = (path) => {
    window.location.href = path;
  };

  const menuItems = [
    {
      title: "오늘의 운세",
      description: "오늘은 어떤 일들이 펼쳐질까요?",
      icon: Sparkles,
      route: "/fortune",
      stats: { today: 128, total: 1234 }
    },
    {
      title: "도화살 테스트",
      description: "당신에게는 어떤 도화살이 들어 있을까요?",
      icon: Heart,
      comingSoon: true,
      stats: { today: 56, total: 789 }
    },
    {
      title: "사주팔자",
      description: "금전과 재물의 기운을 알아보세요",
      icon: Coins,
      comingSoon: true,
      stats: { today: 92, total: 945 }
    },
    {
      title: "AI 점쟁이",
      description: "무당 할머니에게 고민을 풀어보세요",
      icon: GraduationCap,
      comingSoon: true,
      stats: { today: 73, total: 867 }
    }
  ];

  const banners = [
    {
      title: "오늘의 운세",
      description: "당신만의 특별한 운세를 확인해보세요"
    },
    {
      title: "2024년 운세",
      description: "새해를 맞아 특별한 운세를 준비했습니다"
    },
    {
      title: "특별한 이벤트",
      description: "매일 찾아오는 행운의 시간"
    }
  ];

  return (
    <div className="min-h-screen pb-8">
      <MenuBar onMenuClick={() => setIsSidebarOpen(true)} />
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="container mx-auto px-4 pt-20">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <Banner banners={banners} />
        </motion.div>

        <div className="space-y-4">
          {menuItems.map((item, index) => (
            <FortuneCard
              key={index}
              title={item.title}
              description={item.description}
              icon={item.icon}
              stats={item.stats}
              onClick={() => {
                if (item.comingSoon) {
                  setShowComingSoon(true);
                } else {
                  handleNavigate(item.route);
                }
              }}
            />
          ))}
        </div>
      </div>

      <Modal isOpen={showComingSoon} onClose={() => setShowComingSoon(false)}>
        <h2 className="text-2xl font-bold text-white mb-4">서비스 준비중</h2>
        <p className="text-purple-200 mb-6">
          더 나은 서비스로 곧 찾아뵙겠습니다! 💫
        </p>
        <button
          className="w-full py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors"
          onClick={() => setShowComingSoon(false)}
        >
          확인
        </button>
      </Modal>
    </div>
  );
};

export default Home;