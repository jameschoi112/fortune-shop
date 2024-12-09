import React from 'react';
import { motion } from 'framer-motion';
import {
  LogIn,
  BookOpen,
  HelpCircle,
  Mail,
  Clover,
  ChevronRight
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    {
      icon: LogIn,
      title: "로그인",
      subtitle: "로그인하고 더 많은 기능을 이용해보세요",
      color: "text-purple-300"
    },
    {
      icon: BookOpen,
      title: "이용 방법",
      subtitle: "행운상점 서비스 이용 가이드",
      color: "text-fuchsia-300"
    },
    {
      icon: HelpCircle,
      title: "고객 지원",
      subtitle: "무엇을 도와드릴까요?",
      color: "text-pink-300"
    },
    {
      icon: Mail,
      title: "컨택 문의",
      subtitle: "비즈니스 및 제휴 문의",
      color: "text-violet-300"
    },
  ];

  return (
    <>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ type: "spring", damping: 20 }}
        className="fixed top-0 right-0 w-80 h-full bg-gradient-to-b from-purple-900/95 to-indigo-900/95 backdrop-blur-md z-50"
      >
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <Clover className="w-6 h-6 text-fuchsia-400" />
            <span className="text-xl font-bold text-white">행운상점</span>
          </div>
        </div>

        <div className="py-4">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
                className="group px-6 py-4 hover:bg-white/5 cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-xl bg-white/5 ${item.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-white font-medium">{item.title}</div>
                      <div className="text-sm text-purple-200">{item.subtitle}</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors" />
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10">
          <div className="flex items-center justify-between text-sm text-purple-200">
            <span>© 2024 행운상점</span>
            <span>v1.0.0</span>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;