import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import { Sparkles, Heart, Coins, GraduationCap } from 'lucide-react';

const MenuCard = ({ title, description, icon, onClick, isComingSoon }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="glassmorphism card-hover rounded-2xl p-6 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start space-x-4">
        <div className="p-3 bg-purple-500/20 rounded-xl">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-purple-200 text-sm">{description}</p>
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

  return (
    <div className="glassmorphism rounded-2xl overflow-hidden">
      <div className="relative w-full h-40">
        {banners.map((banner, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{
              opacity: currentBanner === index ? 1 : 0,
              x: currentBanner === index ? 0 : 20
            }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center p-6"
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">{banner.title}</h3>
              <p className="text-purple-200">{banner.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  const [showComingSoon, setShowComingSoon] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "오늘의 운세",
      description: "당신의 하루를 비춰줄 운세를 확인해보세요",
      icon: <Sparkles className="w-6 h-6 text-purple-300" />,
      route: "/fortune"
    },
    {
      title: "연애운",
      description: "당신의 사랑이 궁금하다면?",
      icon: <Heart className="w-6 h-6 text-pink-300" />,
      comingSoon: true
    },
    {
      title: "재물운",
      description: "금전과 재물의 기운을 알아보세요",
      icon: <Coins className="w-6 h-6 text-yellow-300" />,
      comingSoon: true
    },
    {
      title: "학업운",
      description: "학업과 진로의 길을 밝혀드립니다",
      icon: <GraduationCap className="w-6 h-6 text-blue-300" />,
      comingSoon: true
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
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-white mb-4">행운 상점</h1>
        <p className="text-lg text-purple-200">당신의 행운을 찾아보세요</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {menuItems.map((item, index) => (
          <MenuCard
            key={index}
            title={item.title}
            description={item.description}
            icon={item.icon}
            onClick={() => {
              if (item.comingSoon) {
                setShowComingSoon(true);
              } else {
                navigate(item.route);
              }
            }}
          />
        ))}
      </div>

      <Banner banners={banners} />

      <Dialog
        open={showComingSoon}
        onClose={() => setShowComingSoon(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="glassmorphism rounded-2xl p-6 max-w-sm w-full">
            <Dialog.Title className="text-2xl font-bold text-white mb-4">
              서비스 준비중
            </Dialog.Title>
            <p className="text-purple-200 mb-6">
              더 나은 서비스로 곧 찾아뵙겠습니다! 💫
            </p>
            <button
              className="w-full py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors"
              onClick={() => setShowComingSoon(false)}
            >
              확인
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default Home;