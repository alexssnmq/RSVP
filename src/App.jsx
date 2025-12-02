import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Plane,
  Minus,
  Plus,
  Loader2,
  Check,
  Info,
  Sparkles,
  Heart,
  Calendar,
  MapPin,
  Clock,
  Users,
} from 'lucide-react';

// --- Configuration ---
const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbzkJKeL7DRXaI33N0sBAyO4QMVnCZk08zgKkGF8yrHwS0kAbb6HIyeQCdIYMT2tbaTiEA/exec';

// --- Floating Elements Component ---
const FloatingElements = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute text-white/10 text-4xl sm:text-6xl"
        initial={{ 
          x: Math.random() * 100 + '%', 
          y: Math.random() * 100 + '%',
          rotate: Math.random() * 360 
        }}
        animate={{ 
          y: [null, '-20%', null],
          rotate: [null, Math.random() * 360, null],
        }}
        transition={{ 
          duration: 8 + Math.random() * 4, 
          repeat: Infinity, 
          ease: 'easeInOut',
          delay: i * 0.5 
        }}
      >
        {['💜', '💛', '☕', '🛋️', '🦞', '💍'][i]}
      </motion.div>
    ))}
  </div>
);

// --- The Iconic Yellow Frame ---
const YellowFrame = ({ onClick }) => (
  <motion.div
    className="cursor-pointer relative flex items-center justify-center group"
    onClick={onClick}
    initial={{ scale: 0.8, opacity: 0, y: 20 }}
    animate={{ scale: [1, 1.02, 1], opacity: 1, y: 0 }}
    transition={{ 
      scale: { repeat: Infinity, duration: 3, ease: 'easeInOut' }, 
      opacity: { duration: 0.6 },
      y: { duration: 0.6 }
    }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    style={{ width: 'min(65vw, 240px)', height: 'min(78vw, 280px)' }}
  >
    {/* Glow effect */}
    <div className="absolute inset-0 bg-yellow-400/30 blur-3xl rounded-full scale-150 group-hover:bg-yellow-400/40 transition-all duration-500" />
    
    <svg
      viewBox="0 0 200 240"
      className="w-full h-full drop-shadow-2xl transition-all duration-300 relative z-10"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="frameGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F4C430" />
          <stop offset="50%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#E6B800" />
        </linearGradient>
        <filter id="shadow">
          <feDropShadow dx="0" dy="8" stdDeviation="8" floodOpacity="0.3" />
        </filter>
      </defs>
      <path
        fill="url(#frameGradient)"
        filter="url(#shadow)"
        d="M20,20 C20,10 30,0 40,0 L160,0 C170,0 180,10 180,20 L180,220 C180,230 170,240 160,240 L40,240 C30,240 20,230 20,220 Z 
           M40,30 L160,30 L160,210 L40,210 Z"
      />
      {/* Decorative bolts */}
      <circle cx="100" cy="15" r="6" fill="#B8860B" />
      <circle cx="100" cy="225" r="6" fill="#B8860B" />
      <circle cx="25" cy="120" r="6" fill="#B8860B" />
      <circle cx="175" cy="120" r="6" fill="#B8860B" />
    </svg>

    {/* Text inside */}
    <div className="absolute text-center z-20">
      <motion.p 
        className="text-white font-serif tracking-[0.2em] text-lg sm:text-xl font-bold"
        style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        KNOCK
        <br />
        KNOCK
      </motion.p>
    </div>
  </motion.div>
);

// --- Modern RSVP Card ---
const RSVPCard = ({ text, subtext, onClick, isSelected, type, icon: Icon }) => {
  const getStyles = () => {
    if (!isSelected) {
      return 'bg-white/60 border-white/50 text-gray-700 hover:bg-white/80 hover:border-purple-200';
    }
    switch (type) {
      case 'Yes':
        return 'bg-gradient-to-br from-emerald-50 to-green-100 border-emerald-300 text-emerald-800 ring-2 ring-emerald-400 ring-offset-2';
      case 'Maybe':
        return 'bg-gradient-to-br from-amber-50 to-yellow-100 border-amber-300 text-amber-800 ring-2 ring-amber-400 ring-offset-2';
      case 'No':
        return 'bg-gradient-to-br from-rose-50 to-red-100 border-rose-300 text-rose-800 ring-2 ring-rose-400 ring-offset-2';
      default:
        return '';
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative w-full p-4 sm:p-5 rounded-2xl text-left transition-all duration-300 border-2 backdrop-blur-sm flex items-center gap-4 group shadow-lg shadow-black/5 ${getStyles()}`}
    >
      {/* Icon */}
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
        isSelected 
          ? type === 'Yes' ? 'bg-emerald-200' : type === 'Maybe' ? 'bg-amber-200' : 'bg-rose-200'
          : 'bg-gray-100 group-hover:bg-purple-100'
      }`}>
        <Icon size={22} className={isSelected ? 'text-current' : 'text-gray-500 group-hover:text-purple-600'} />
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-base sm:text-lg leading-snug truncate">{text}</p>
        <p className="text-xs opacity-70 font-medium mt-0.5 truncate">{subtext}</p>
      </div>

      {/* Checkbox */}
      <div
        className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all
        ${isSelected ? 'border-current bg-current scale-110' : 'border-gray-300 group-hover:border-purple-400'}`}
      >
        {isSelected && <Check size={14} className="text-white" strokeWidth={3} />}
      </div>
    </motion.button>
  );
};

// --- Main App ---
export default function EngagementRSVP() {
  const [scene, setScene] = useState(1);
  const [formData, setFormData] = useState({ name: '', guests: 1, status: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: '', type: 'info' });
  const [showPlane, setShowPlane] = useState(false);
  const [clapping, setClapping] = useState(false);

  const triggerConfetti = () => {
    const colors = ['#926F98', '#F4C430', '#ffffff', '#10b981', '#f59e0b'];
    confetti({ particleCount: 80, spread: 55, origin: { y: 0.6 }, colors });
    setTimeout(() => confetti({ particleCount: 60, spread: 70, origin: { y: 0.7, x: 0.3 }, colors }), 150);
    setTimeout(() => confetti({ particleCount: 60, spread: 70, origin: { y: 0.7, x: 0.7 }, colors }), 300);
  };

  const handleSelection = (type) => {
    setFormData({ ...formData, status: type });
    if (type === 'Yes') {
      triggerConfetti();
      setClapping(true);
      setTimeout(() => setClapping(false), 2500);
    } else if (type === 'No') {
      setShowPlane(true);
      setTimeout(() => setShowPlane(false), 2500);
    }
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      setToast({ show: true, msg: 'Please enter your name', type: 'error' });
      setTimeout(() => setToast({ show: false, msg: '', type: 'info' }), 2500);
      return;
    }
    if (!formData.status) {
      setToast({ show: true, msg: 'Please select an option', type: 'error' });
      setTimeout(() => setToast({ show: false, msg: '', type: 'info' }), 2500);
      return;
    }

    setLoading(true);
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
      if (formData.status === 'Yes') triggerConfetti();
    } catch (error) {
      setToast({ show: true, msg: 'Connection error. Try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen min-h-[100dvh] relative font-sans text-gray-900 selection:bg-purple-200 overflow-x-hidden">
      <AnimatePresence mode="wait">
        {/* SCENE 1: THE DOOR */}
        {scene === 1 && (
          <motion.div
            key="door"
            className="fixed inset-0 flex flex-col items-center justify-center z-20 px-4"
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #926F98 100%)',
            }}
            exit={{ opacity: 0, scale: 1.1, transition: { duration: 0.5 } }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 0%, transparent 50%),
                                  radial-gradient(circle at 75% 75%, rgba(244,196,48,0.2) 0%, transparent 50%)`
              }} />
            </div>
            
            <FloatingElements />

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-8 relative z-10"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring' }}
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-4"
              >
                <Sparkles size={16} className="text-yellow-300" />
                <span className="text-white/90 text-sm font-medium">You're Invited</span>
                <Sparkles size={16} className="text-yellow-300" />
              </motion.div>
            </motion.div>

            <YellowFrame onClick={() => setScene(2)} />

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              onClick={() => setScene(2)}
              className="mt-8 text-white text-sm sm:text-base font-medium bg-white/20 backdrop-blur-md px-6 py-3 rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300 flex items-center gap-2"
            >
              <span>Tap to open</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.button>
          </motion.div>
        )}

        {/* SCENE 2: THE INVITE */}
        {scene === 2 && (
          <motion.div
            key="invite"
            className="min-h-screen min-h-[100dvh] relative"
            style={{
              background: 'linear-gradient(180deg, #f8f4ff 0%, #fef9e7 50%, #fdf2f8 100%)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Decorative blobs */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl translate-x-1/2" />
            <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-pink-300/20 rounded-full blur-3xl translate-y-1/2" />

            <div className="relative z-10 w-full max-w-lg mx-auto min-h-screen min-h-[100dvh] flex flex-col">
              {!submitted ? (
                <div className="flex-1 overflow-y-auto">
                  <div className="p-5 sm:p-8 pt-10 sm:pt-14 flex flex-col gap-6 sm:gap-8 pb-10">
                    
                    {/* Header Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-xl shadow-purple-500/10 border border-white/50 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: 'spring', bounce: 0.5 }}
                        className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl mb-4 shadow-lg"
                      >
                        <span className="text-4xl sm:text-5xl">💍</span>
                      </motion.div>
                      
                      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                        The One With The
                        <br />
                        <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          Engagement
                        </span>
                      </h1>

                      {/* Event Details */}
                      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-4">
                        <div className="inline-flex items-center gap-1.5 bg-purple-100/80 text-purple-700 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium">
                          <Calendar size={14} />
                          <span>Dec 10</span>
                        </div>
                        <div className="inline-flex items-center gap-1.5 bg-amber-100/80 text-amber-700 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium">
                          <Clock size={14} />
                          <span>5:30 PM</span>
                        </div>
                        <div className="inline-flex items-center gap-1.5 bg-pink-100/80 text-pink-700 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium">
                          <MapPin size={14} />
                          <span>Accord Chrome</span>
                        </div>
                      </div>
                      <p className="text-gray-500 text-xs mt-2">Chrompet, Chennai</p>
                    </motion.div>

                    {/* Form Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="bg-white/70 backdrop-blur-xl rounded-3xl p-5 sm:p-6 shadow-xl shadow-purple-500/10 border border-white/50 space-y-5"
                    >
                      {/* Name Input */}
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2 ml-1">
                          <Users size={14} />
                          Your Name
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="block w-full px-4 py-3.5 text-base bg-white/80 border-2 border-gray-100 rounded-xl focus:bg-white focus:border-purple-400 focus:ring-4 focus:ring-purple-500/10 transition-all duration-200 outline-none font-medium placeholder:text-gray-300"
                          placeholder="Chandler Bing"
                        />
                      </div>

                      {/* Guest Counter */}
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50/80 to-pink-50/80 rounded-xl">
                        <label className="text-sm font-semibold text-gray-600">Total Guests</label>
                        <div className="flex items-center gap-3 bg-white p-1.5 rounded-xl shadow-sm border border-gray-100">
                          <button
                            onClick={() => setFormData((prev) => ({ ...prev, guests: Math.max(1, prev.guests - 1) }))}
                            className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-50 text-gray-600 hover:bg-purple-100 hover:text-purple-600 active:scale-95 transition-all"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-8 text-center font-bold text-lg text-gray-800">{formData.guests}</span>
                          <button
                            onClick={() => setFormData((prev) => ({ ...prev, guests: prev.guests + 1 }))}
                            className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-50 text-gray-600 hover:bg-purple-100 hover:text-purple-600 active:scale-95 transition-all"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    </motion.div>

                    {/* RSVP Options */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="space-y-3"
                    >
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2 ml-1">
                        <Heart size={14} />
                        Are you coming?
                      </label>
                      
                      <div className="space-y-3">
                        <RSVPCard
                          text="I'll be there for you!"
                          subtext="Wouldn't miss it for the world"
                          type="Yes"
                          icon={Heart}
                          isSelected={formData.status === 'Yes'}
                          onClick={() => handleSelection('Yes')}
                        />

                        <div className="relative">
                          <RSVPCard
                            text="We were on a break..."
                            subtext="Still figuring things out"
                            type="Maybe"
                            icon={Clock}
                            isSelected={formData.status === 'Maybe'}
                            onClick={() => handleSelection('Maybe')}
                          />
                          <AnimatePresence>
                            {formData.status === 'Maybe' && (
                              <motion.div
                                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
                                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                className="overflow-hidden"
                              >
                                <p className="text-xs font-medium text-amber-700 bg-amber-50 inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-amber-200">
                                  <Info size={12} strokeWidth={3} />
                                  No worries! We'll check back on Dec 8th
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        <RSVPCard
                          text="I'm in Yemen!"
                          subtext="Cheering for you from afar 💛"
                          type="No"
                          icon={Plane}
                          isSelected={formData.status === 'No'}
                          onClick={() => handleSelection('No')}
                        />
                      </div>
                    </motion.div>

                    {/* Submit Button */}
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      onClick={handleSubmit}
                      disabled={loading}
                      className="w-full py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-[length:200%_100%] text-white rounded-2xl font-bold text-base sm:text-lg shadow-xl shadow-purple-500/30 hover:shadow-purple-500/40 hover:-translate-y-0.5 active:scale-[0.98] transform transition-all disabled:opacity-50 disabled:translate-y-0 flex items-center justify-center gap-3 hover:bg-right"
                      style={{ backgroundPosition: 'left' }}
                    >
                      {loading ? (
                        <Loader2 className="animate-spin" size={22} />
                      ) : (
                        <>
                          <Sparkles size={18} />
                          Confirm RSVP
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              ) : (
                // SUCCESS STATE
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[100dvh]">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', bounce: 0.5 }}
                    className="relative mb-6"
                  >
                    <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 rounded-full flex items-center justify-center shadow-2xl">
                      <span className="text-6xl sm:text-7xl">🦞</span>
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -top-2 -right-2 text-3xl sm:text-4xl"
                    >
                      💖
                    </motion.div>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      className="absolute -bottom-1 -left-3 text-2xl sm:text-3xl"
                    >
                      ✨
                    </motion.div>
                  </motion.div>
                  
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3"
                  >
                    You're our Lobster!
                  </motion.h2>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-600 max-w-xs mx-auto text-sm sm:text-base leading-relaxed"
                  >
                    {formData.status === 'Yes'
                      ? "Thanks for confirming! We can't wait to celebrate with you. 🎉"
                      : formData.status === 'Maybe'
                      ? "No pressure! We'll reach out on Dec 8th. 💜"
                      : "We'll miss you! Thanks for letting us know. 💛"}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-8 flex items-center gap-2 text-gray-400 text-sm"
                  >
                    <Heart size={14} className="text-pink-400" />
                    <span>See you at Central Perk</span>
                    <Heart size={14} className="text-pink-400" />
                  </motion.div>
                </div>
              )}
            </div>

            {/* --- ANIMATION OVERLAYS --- */}

            {/* Clapping Hands */}
            <AnimatePresence>
              {clapping && (
                <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ 
                        y: '100vh', 
                        x: `${10 + i * 12}%`,
                        opacity: 0, 
                        scale: 0.5 
                      }}
                      animate={{
                        y: '-20vh',
                        opacity: [0, 1, 1, 0],
                        scale: [0.5, 1.2, 1],
                        rotate: Math.random() * 40 - 20,
                      }}
                      transition={{ duration: 2.5, ease: 'easeOut', delay: i * 0.1 }}
                      className="text-4xl sm:text-5xl absolute"
                    >
                      {['👏', '🎉', '💜', '✨', '👏', '💛', '🎊', '💕'][i]}
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>

            {/* Plane Animation */}
            <AnimatePresence>
              {showPlane && (
                <motion.div
                  initial={{ x: '-10vw', y: '80vh', scale: 0.3, rotate: -15 }}
                  animate={{ x: '110vw', y: '10vh', scale: 1, rotate: -25 }}
                  transition={{ duration: 2.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="fixed z-50 text-purple-600"
                >
                  <Plane size={60} fill="currentColor" className="drop-shadow-lg" />
                  <motion.span
                    className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-2xl"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.5, repeat: 5 }}
                  >
                    💨
                  </motion.span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Toast */}
            <AnimatePresence>
              {toast.show && (
                <motion.div
                  initial={{ y: 100, opacity: 0, scale: 0.9 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: 50, opacity: 0, scale: 0.9 }}
                  className={`fixed bottom-6 left-4 right-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:min-w-[300px] px-5 py-3.5 rounded-2xl shadow-2xl z-[60] text-sm font-semibold flex items-center justify-center gap-2 backdrop-blur-xl
                    ${toast.type === 'error' ? 'bg-red-500/95 text-white' : 'bg-gray-900/95 text-white'}`}
                >
                  {toast.msg}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
