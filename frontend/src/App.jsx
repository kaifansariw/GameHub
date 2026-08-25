import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage';
import LeaderboardPage from './pages/LeaderboardPage';
import GamePlayPage from './pages/GamePlayPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AboutPage from './pages/AboutPage';
import GamesPage from './pages/GamesPage';
import ProfilePage from './pages/ProfilePage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ProtocolTerms from './pages/ProtocolTerms';
import CookiePolicy from './pages/CookiePolicy';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import DevLogsPage from './pages/DevLogsPage';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import NotFoundPage from './pages/NotFoundPage';
import ScrollToTop from './components/ScrollToTop';
import BackToTop from './components/BackToTop/BackToTop';
import PWAInstallPrompt from './components/PWAInstallPrompt';

const AppLayout = () => {
  const location = useLocation();
  const isPlaying = location.pathname.startsWith('/play/');
  const isAuthPage = ['/login', '/register', '/forgot-password', '/reset-password'].some(path => location.pathname.startsWith(path));

  return (
    <div className="min-h-screen relative text-white bg-[#050508]">
      <ScrollToTop />
      {/* Animated Static Background Overlay */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/10 via-black to-blue-900/10" />
      </div>

      {!isPlaying && !isAuthPage && <Navbar />}

      <main className="relative z-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/play/:gameId" element={<GamePlayPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:uid/:token" element={<ResetPassword />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<ProtocolTerms />} />
          <Route path="/cookies" element={<CookiePolicy />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/devlogs" element={<DevLogsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {!isAuthPage && <Footer />}

      {!isPlaying && !isAuthPage && <BackToTop />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppLayout />
      {/* PWA Install Prompt — mounted once at app root, never remounts on route change */}
      <PWAInstallPrompt />
    </Router>
  );
}

export default App;
