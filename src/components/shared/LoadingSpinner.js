import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="relative w-24 h-24">
          {/* Base ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-[3px] border-purple-300/20"
          />

          {/* Spinning ring 1 */}
          <motion.div
            className="absolute inset-0 rounded-full border-[3px] border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Spinning ring 2 */}
          <motion.div
            className="absolute inset-[4px] rounded-full border-[3px] border-t-purple-400 border-r-transparent border-b-transparent border-l-transparent"
            animate={{ rotate: -360 }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        <motion.div
          className="mt-8 bg-purple-500/10 px-6 py-2 rounded-full"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <p className="text-purple-200 text-sm font-medium tracking-wider">
            운세를 불러오는 중입니다
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;