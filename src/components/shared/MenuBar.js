import React from 'react';
import { motion } from 'framer-motion';
import { Menu, Clover } from 'lucide-react';

const MenuBar = ({ onMenuClick }) => (
  <div className="fixed top-0 left-0 right-0 z-50 bg-black/10 backdrop-blur-md">
    <div className="container mx-auto px-4 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Clover className="w-6 h-6 text-fuchsia-400" />
        <span className="text-xl font-bold text-white">행운상점</span>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="p-2 rounded-lg hover:bg-white/10 transition-colors"
        onClick={onMenuClick}
      >
        <Menu className="w-6 h-6 text-fuchsia-400" />
      </motion.button>
    </div>
  </div>
);

export default MenuBar;