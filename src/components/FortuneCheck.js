import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import { Calendar, User, ArrowLeft } from 'lucide-react';

const FortuneCheck = () => {
  const navigate = useNavigate();
  const [showIntro, setShowIntro] = useState(true);
  const [formData, setFormData] = useState({
    gender: '',
    calendar: 'solar',
    name: '',
    birthdate: ''
  });
  const [showCards, setShowCards] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowCards(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="fixed top-4 left-4 z-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="p-3 bg-white/10 rounded-full text-white hover:bg-white/20"
        >
          <ArrowLeft className="w-6 h-6" />
        </motion.button>
      </div>

      <Dialog
        open={showIntro}
        onClose={() => setShowIntro(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="glassmorphism rounded-2xl p-6 max-w-md w-full">
            <button
              onClick={() => setShowIntro(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white"
            >
              ✕
            </button>
            <div className="flex flex-col items-center text-center">

              <div className="w-64 h-64 mb-4 overflow-hidden rounded-lg">
                <img
                  src="/assets/popup_image.jpg"
                  alt="Fortune Guide"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-purple-200 mb-6">
                운세 확인을 위해 정보를 입력해주세요.<br/>
                당신만의 특별한 운세를 확인하실 수 있습니다.
              </p>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
                  onChange={() => {
                    localStorage.setItem('hideFortuneIntro', 'true');
                    setShowIntro(false);
                  }}
                />
                <span className="text-purple-200">다시 보지 않기</span>
              </label>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {!showCards ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">운세 확인하기</h1>
            <p className="text-lg text-purple-200">당신의 운세를 알아보세요</p>
          </div>

          <form onSubmit={handleSubmit} className="glassmorphism rounded-2xl p-8 space-y-8">
            <div className="space-y-4">
              <label className="text-lg font-medium text-white">성별</label>
              <div className="grid grid-cols-2 gap-4">
                {['male', 'female'].map((gender) => (
                  <button
                    key={gender}
                    type="button"
                    onClick={() => setFormData({ ...formData, gender })}
                    className={`
                      p-4 rounded-xl flex items-center justify-center space-x-3
                      transition-all duration-200
                      ${formData.gender === gender
                        ? 'bg-purple-600 ring-2 ring-purple-300'
                        : 'bg-white/10 hover:bg-white/20'}
                    `}
                  >
                    <User className="w-5 h-5" />
                    <span>{gender === 'male' ? '남성' : '여성'}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-lg font-medium text-white">음력/양력</label>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: 'solar', label: '양력' },
                  { value: 'lunar', label: '음력' }
                ].map((cal) => (
                  <button
                    key={cal.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, calendar: cal.value })}
                    className={`
                      p-4 rounded-xl flex items-center justify-center space-x-3
                      transition-all duration-200
                      ${formData.calendar === cal.value
                        ? 'bg-purple-600 ring-2 ring-purple-300'
                        : 'bg-white/10 hover:bg-white/20'}
                    `}
                  >
                    <Calendar className="w-5 h-5" />
                    <span>{cal.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-lg font-medium text-white">이름</label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-6 py-4 rounded-xl bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-300"
                placeholder="이름을 입력하세요"
              />
            </div>

            <div className="space-y-2">
              <label className="text-lg font-medium text-white">생년월일</label>
              <input
                required
                type="date"
                value={formData.birthdate}
                onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
                className="w-full px-6 py-4 rounded-xl bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-lg hover:opacity-90 transition-opacity"
            >
              운세 확인하기
            </button>
          </form>
        </motion.div>
      ) : (
        <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="fixed inset-0 flex flex-col items-center pt-20 overflow-hidden"
  >
    <motion.p
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-purple-200 text-xl mb-20 animate-bounce"
    >
      카드를 위로 드래그하여 뽑아주세요
    </motion.p>

    <div className="w-full overflow-x-auto scrollbar-hide pb-8">
      <div
        className="flex justify-start gap-8 px-8 min-w-max mx-auto"
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px"
        }}
      >
        {Array.from({ length: 7 }).map((_, index) => (
          <motion.div
            key={index}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={(event, info) => {
              if (info.offset.y < -100) {
                setSelectedCard(index);
                setShowConfirm(true);
              }
            }}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            whileDrag={{ scale: 1.1 }}
            className="relative cursor-grab active:cursor-grabbing"
          >
            <motion.div
              className="relative w-48 h-72 rounded-xl overflow-hidden"
              style={{
                boxShadow: "0 0 20px rgba(255, 215, 0, 0.3)",
                border: "1px solid rgba(255, 215, 0, 0.2)"
              }}
            >
              <img
                src="/assets/tarocard_back.jpg"
                alt="Tarot Card Back"
                className="w-full h-full object-cover"
              />
              <motion.div
                className="absolute inset-0"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(255, 215, 0, 0.2)",
                    "0 0 30px rgba(255, 215, 0, 0.4)",
                    "0 0 20px rgba(255, 215, 0, 0.2)"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
)}

      <Dialog
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="glassmorphism rounded-2xl p-8 max-w-sm w-full">
            <Dialog.Title className="text-2xl font-bold text-white mb-4 text-center">
              카드 선택 확인
            </Dialog.Title>
            <p className="text-purple-200 mb-8 text-center">
              이 카드로 당신의 운세를 확인하시겠습니까?
            </p>
            <div className="grid grid-cols-2 gap-4">
              <button
                className="py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-colors"
                onClick={() => setShowConfirm(false)}
              >
                다시 선택
              </button>
              <button
                className="py-3 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors"
                onClick={() => {
                  navigate('/result', {
                    state: {
                      selectedCard: selectedCard,
                      userInfo: formData
                    }
                  });
                }}
              >
                확인
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default FortuneCheck;