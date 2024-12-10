import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Coins, GraduationCap } from 'lucide-react';
import MenuBar from './shared/MenuBar';
import Sidebar from './shared/Sidebar';
import Modal from './shared/Modal';
import { isSameDay } from '../utils/dateCheck';

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
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const autoPlayRef = useRef(null);

  const minSwipeDistance = 50;

  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  }, []);

  const startAutoPlay = useCallback(() => {
    stopAutoPlay();
    autoPlayRef.current = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 10000);
  }, [stopAutoPlay, banners.length]);

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [startAutoPlay, stopAutoPlay]);

  const onTouchStart = (e) => {
    stopAutoPlay();
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      startAutoPlay();
      return;
    }

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    } else if (isRightSwipe) {
      setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
    }

    startAutoPlay();
  };

  const handleBannerClick = () => {
    if (currentBanner === 2) {
      window.open('https://sobbangjaebbang-weahter.netlify.app/', '_blank');
    }
  };

  return (
    <div className="glassmorphism rounded-2xl overflow-hidden relative">
      <div
        className="relative w-full h-36 cursor-pointer"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onClick={handleBannerClick}
      >
        <AnimatePresence initial={false}>
          {banners.map((banner, index) => (
            index === currentBanner && (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
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
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {banner.title}
                    </h3>
                    <p className="text-purple-200">{banner.description}</p>
                  </div>
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentBanner(index);
              startAutoPlay();
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
  const [showDailyLimitModal, setShowDailyLimitModal] = useState(false);

  const handleFortuneClick = () => {
    const lastCheckTime = localStorage.getItem('lastFortuneCheck');

    if (lastCheckTime) {
      const lastCheck = new Date(parseInt(lastCheckTime));
      const now = new Date();

      if (isSameDay(lastCheck, now)) {
        setShowDailyLimitModal(true);
        return;
      }
    }

    window.location.href = '/fortune';
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
      description: "무당 할머니에게 고민을 털어보세요",
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
      title: "AI 점쟁이 할머니",
      description: "무당 할머니에게 고민을 털어내보세요"
    },
    {
      title: "소빵재빵 날씨",
      description: "AI가 알려주는 날씨 사이트"
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
                  handleFortuneClick();
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

      <Modal isOpen={showDailyLimitModal} onClose={() => setShowDailyLimitModal(false)}>
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            className="w-20 h-20 mx-auto mb-4"
          >
            <img
              src="/assets/fortune_cookie.png"
              alt="Fortune Cookie"
              className="w-full h-full object-contain"
            />
          </motion.div>
          <h2 className="text-2xl font-bold text-white mb-4">하루 한 번만 가능해요</h2>
          <p className="text-purple-200 mb-6">
            오늘의 운세는 하루에 한 번만 <br/> 확인하실 수 있어요.<br/>
            <br/> 내일 다시 만나요!
          </p>
          <button
            className="w-full py-3 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors"
            onClick={() => setShowDailyLimitModal(false)}
          >
            확인
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Home;