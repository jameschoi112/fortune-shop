import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SplashScreen from './components/SplashScreen';
import Home from './components/Home';
import FortuneCheck from './components/FortuneCheck';
import FortuneResult from './components/FortuneResult';

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-indigo-900">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fortune" element={<FortuneCheck />} />
          <Route path="/result" element={<FortuneResult />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;