import React from 'react';


const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="glassmorphism rounded-2xl p-6 max-w-sm w-full relative">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;