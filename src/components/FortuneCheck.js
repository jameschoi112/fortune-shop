import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft } from 'lucide-react';

const FortuneCookie = ({ onClick, isSelected }) => (
  <motion.div
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
    className="relative cursor-pointer"
  >
    <motion.div
      animate={{
        y: [0, -10, 0],
        rotate: [0, 5, 0]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.5, 1]
      }}
      className="w-24 h-24 relative"
    >
      <img
        src="/assets/fortune_cookie.png"
        alt="Fortune Cookie"
        className="w-full h-full object-contain"
      />
      <motion.div
        animate={{
          opacity: [0.5, 1, 0.5],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className={`absolute inset-0 rounded-full ${
          isSelected ? 'ring-4 ring-fuchsia-400' : ''
        }`}
        style={{
          boxShadow: "0 0 20px rgba(168, 85, 247, 0.4)"
        }}
      />
    </motion.div>
  </motion.div>
);

const FortuneCheck = () => {
  const navigate = useNavigate();
  const [showIntro, setShowIntro] = useState(() => {
    return localStorage.getItem('hideFortuneIntro') !== 'true';
  });
  const [formData, setFormData] = useState({
    gender: '',
    calendar: 'solar',
    name: '',
    birthdate: ''
  });
  const [showCookies, setShowCookies] = useState(false);
  const [selectedCookie, setSelectedCookie] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowCookies(true);
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

      <div className="relative">
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

            <div className="space-y-4">
              <div className="flex flex-col">
                <label className="text-lg font-medium text-white mb-4">이름</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-6 py-4 rounded-xl bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  placeholder="이름을 입력하세요"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col w-full">
                <label className="text-lg font-medium text-white mb-4">생년월일</label>
                <input
                  required
                  type="date"
                  value={formData.birthdate}
                  onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
                  className="w-full px-6 py-5 rounded-xl bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-300 h-14 text-lg"
                  placeholder="클릭하여 생년월일을 선택해주세요"
                  style={{
                    minHeight: '3.5rem',
                    lineHeight: '1.5',
                    minWidth: '100%'
                  }}
                />
                <p className="mt-2 text-purple-200 text-sm">클릭하여 생년월일을 선택해주세요</p>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-lg hover:opacity-90 transition-opacity"
            >
              운세 확인하기
            </button>
          </form>
        </motion.div>

        {showIntro && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="glassmorphism rounded-2xl p-8 max-w-md w-full mx-4"
            >
              <button
                onClick={() => setShowIntro(false)}
                className="absolute top-4 right-4 text-white/60 hover:text-white"
              >
                ✕
              </button>
              <div className="text-center">
                <div className="w-64 h-64 mb-4 mx-auto overflow-hidden rounded-lg">
                  <img
                    src="/assets/popup_image.jpg"
                    alt="Fortune Guide"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-purple-200 mb-6">
                  운세 확인을 위해 정보를 입력해주세요.<br/><br/>

                  * 입력된 정보는 저장되지 않고 , <br/> 운세를 확인하는 용도로만 사용됩니다.
                </p>
                <label className="flex items-center justify-center space-x-3">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        localStorage.setItem('hideFortuneIntro', 'true');
                      }
                      setShowIntro(false);
                    }}
                    className="w-5 h-5 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-purple-200">다시 보지 않기</span>
                </label>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showCookies && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <div className="relative">
              <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-xl text-white mb-12"
              >
                행운의 포춘쿠키를 선택해주세요
              </motion.p>
              <div className="flex gap-8">
                {[0, 1, 2].map((index) => (
                  <FortuneCookie
                    key={index}
                    isSelected={selectedCookie === index}
                    onClick={() => {
                      setSelectedCookie(index);
                      setShowConfirm(true);
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="glassmorphism rounded-2xl p-8 max-w-sm w-full mx-4"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: 360 }}
                  className="w-20 h-20 mx-auto mb-4"
                >
                  <img
                    src="/assets/fortune_cookie.png"
                    alt="Selected Cookie"
                    className="w-full h-full object-contain"
                  />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-4">쿠키 선택</h3>
                <p className="text-purple-200 mb-6">
                  정말 이 쿠키를 선택하시겠습니까?
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowConfirm(false)}
                    className="flex-1 py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-colors"
                  >
                    다시 선택
                  </button>
                  <button
                    onClick={() => {
                      navigate('/result', {
                        state: {
                          selectedCookie: selectedCookie,
                          userInfo: formData
                        }
                      });
                    }}
                    className="flex-1 py-3 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors"
                  >
                    확인
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FortuneCheck;