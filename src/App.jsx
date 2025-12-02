import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Plane,
  Minus,
  Plus,
  Loader2,
  Check,
  AlertCircle,
  Info,
} from 'lucide-react';

// --- Configuration ---
const THEME_PURPLE = '#926F98'; // Monica's Door Purple
const THEME_YELLOW = '#F4C430'; // Frame Yellow
const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbzkJKeL7DRXaI33N0sBAyO4QMVnCZk08zgKkGF8yrHwS0kAbb6HIyeQCdIYMT2tbaTiEA/exec';

// --- Components ---

// 1. The Iconic Yellow Frame (SVG) - Refined Shadow
const YellowFrame = ({ onClick }) => (
  <motion.div
    className="cursor-pointer relative w-64 h-72 flex items-center justify-center group"
    onClick={onClick}
    initial={{ scale: 1 }}
    animate={{ scale: [1, 1.02, 1] }}
    transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {/* The Frame Shape */}
    <svg
      viewBox="0 0 200 240"
      className="w-full h-full drop-shadow-2xl transition-all duration-300 group-hover:drop-shadow-[0_20px_20px_rgba(0,0,0,0.5)]"
    >
      <defs>
        <filter id="shadow">
          <feDropShadow dx="2" dy="4" stdDeviation="4" floodOpacity="0.4" />
        </filter>
      </defs>
      <path
        fill={THEME_YELLOW}
        filter="url(#shadow)"
        d="M20,20 C20,10 30,0 40,0 L160,0 C170,0 180,10 180,20 L180,220 C180,230 170,240 160,240 L40,240 C30,240 20,230 20,220 Z 
           M40,30 L160,30 L160,210 L40,210 Z"
      />
      <circle cx="100" cy="15" r="5" fill={THEME_YELLOW} />
      <circle cx="100" cy="225" r="5" fill={THEME_YELLOW} />
      <circle cx="25" cy="120" r="5" fill={THEME_YELLOW} />
      <circle cx="175" cy="120" r="5" fill={THEME_YELLOW} />
    </svg>

    {/* Text inside the peephole */}
    <div className="absolute text-center z-10">
      <p className="text-white font-serif tracking-widest text-lg font-bold drop-shadow-md opacity-90">
        KNOCK
        <br />
        KNOCK
      </p>
    </div>
  </motion.div>
);

// 2. RSVP Card Component - Modernized
const RSVPCard = ({ text, subtext, onClick, isSelected, type }) => {
  // Dynamic styles based on selection type
  const getStyles = () => {
    if (!isSelected)
      return 'border-gray-100 bg-gray-50 text-gray-600 hover:bg-gray-100';
    switch (type) {
      case 'Yes':
        return 'border-green-200 bg-green-50 text-green-800 ring-2 ring-green-500 ring-offset-2';
      case 'Maybe':
        return 'border-amber-200 bg-amber-50 text-amber-800 ring-2 ring-amber-500 ring-offset-2';
      case 'No':
        return 'border-red-200 bg-red-50 text-red-800 ring-2 ring-red-500 ring-offset-2';
      default:
        return '';
    }
  };

  // Adjust subtext style if it's long (like the polite decline message)
  const isLongText = subtext.length > 10;

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative w-full p-5 rounded-2xl text-left transition-all duration-300 border-2 flex items-center justify-between group ${getStyles()}`}
    >
      <div className="flex-1 pr-4">
        <p className="font-semibold text-lg">{text}</p>
        <p
          className={`text-xs opacity-70 font-bold mt-1 ${
            isLongText
              ? 'normal-case leading-tight'
              : 'uppercase tracking-wider'
          }`}
        >
          {subtext}
        </p>
      </div>

      <div
        className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors
        ${isSelected ? 'border-current bg-current' : 'border-gray-300'}`}
      >
        {isSelected && (
          <Check size={14} className="text-white" strokeWidth={3} />
        )}
      </div>
    </motion.button>
  );
};

// 3. Main App
export default function EngagementRSVP() {
  const [scene, setScene] = useState(1); // 1: Door, 2: Invite
  const [formData, setFormData] = useState({ name: '', guests: 1, status: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: '', type: 'info' });
  const [showPlane, setShowPlane] = useState(false);
  const [clapping, setClapping] = useState(false);

  // Helper: Trigger Confetti
  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.7 },
      colors: [THEME_PURPLE, THEME_YELLOW, '#ffffff'],
      disableForReducedMotion: true,
    });
  };

  // Logic: Selection Handling
  const handleSelection = (type) => {
    setFormData({ ...formData, status: type });

    if (type === 'Yes') {
      triggerConfetti();
      setClapping(true);
      setTimeout(() => setClapping(false), 2500);
    } else if (type === 'Maybe') {
      setToast({
        show: true,
        msg: "I'll reach out to you again on Dec 8th",
        type: 'info',
      });
      setTimeout(() => setToast({ show: false, msg: '', type: 'info' }), 4000);
    } else if (type === 'No') {
      setShowPlane(true);
      setTimeout(() => setShowPlane(false), 2000);
    }
  };

  // Logic: Submit
  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      setToast({ show: true, msg: 'Please enter your name', type: 'error' });
      setTimeout(() => setToast({ ...toast, show: false }), 2000);
      return;
    }
    if (!formData.status) {
      setToast({
        show: true,
        msg: 'Please select an RSVP option',
        type: 'error',
      });
      setTimeout(() => setToast({ ...toast, show: false }), 2000);
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
    } catch (error) {
      setToast({
        show: true,
        msg: 'Connection error. Try again.',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden bg-gray-50 relative font-sans text-gray-900 selection:bg-purple-200">
      <AnimatePresence mode="wait">
        {/* SCENE 1: THE DOOR */}
        {scene === 1 && (
          <motion.div
            key="door"
            className="absolute inset-0 flex flex-col items-center justify-center z-20"
            style={{ backgroundColor: THEME_PURPLE }}
            exit={{
              rotateY: -90,
              opacity: 0,
              x: -100,
              transition: { duration: 0.8, ease: 'circIn' },
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <YellowFrame onClick={() => setScene(2)} />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.8, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-10 text-white font-medium tracking-wide bg-white/10 px-6 py-2 rounded-full backdrop-blur-sm"
            >
              Tap the frame to open
            </motion.p>
          </motion.div>
        )}

        {/* SCENE 2: THE INVITE */}
        {scene === 2 && (
          <motion.div
            key="invite"
            className="absolute inset-0 flex flex-col overflow-y-auto bg-gray-50"
            initial={{ rotateY: 90, opacity: 0, x: 100 }}
            animate={{ rotateY: 0, opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'circOut' }}
          >
            <div className="w-full max-w-lg mx-auto min-h-screen bg-white shadow-2xl relative">
              {/* Decorative Top Bar */}
              <div className="h-2 w-full bg-gradient-to-r from-purple-400 via-yellow-400 to-purple-400" />

              {!submitted ? (
                <div className="p-8 pt-12 flex flex-col gap-8">
                  {/* Header */}
                  <div className="text-center space-y-2">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="inline-block p-3 rounded-full bg-purple-50 mb-2"
                    >
                      <div className="text-3xl">💍</div>
                    </motion.div>
                    <h1
                      className="text-4xl font-bold tracking-tight text-gray-900"
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      The One With The
                      <br />
                      Engagement
                    </h1>
                    <p className="text-gray-500 text-xs md:text-sm tracking-wide uppercase font-semibold">
                      Dec 10 • 5:30 PM • Our Central Perk
                      <br />
                      <span className="opacity-75 font-medium normal-case">
                        (Accord Chrome, Chrompet)
                      </span>
                    </p>
                  </div>

                  {/* Inputs Section */}
                  <div className="space-y-6">
                    {/* Name Input */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="block w-full px-4 py-4 text-lg bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all duration-200 outline-none font-medium placeholder:text-gray-300"
                        placeholder="Chandler Bing"
                      />
                    </div>

                    {/* Guest Counter */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                      <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                        Total Guests
                      </label>
                      <div className="flex items-center gap-4 bg-white p-1 rounded-xl shadow-sm border border-gray-100">
                        <button
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              guests: Math.max(1, prev.guests - 1),
                            }))
                          }
                          className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-50 text-gray-600 hover:bg-purple-100 hover:text-purple-600 transition-colors"
                        >
                          <Minus size={18} />
                        </button>
                        <span className="w-6 text-center font-bold text-lg text-gray-800">
                          {formData.guests}
                        </span>
                        <button
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              guests: prev.guests + 1,
                            }))
                          }
                          className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-50 text-gray-600 hover:bg-purple-100 hover:text-purple-600 transition-colors"
                        >
                          <Plus size={18} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-gray-100 w-full" />

                  {/* RSVP Cards */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">
                      Are you coming?
                    </label>
                    <div className="grid gap-4">
                      <RSVPCard
                        text="I'll be there for you!"
                        subtext="Accept"
                        type="Yes"
                        isSelected={formData.status === 'Yes'}
                        onClick={() => handleSelection('Yes')}
                      />

                      <div className="relative">
                        <RSVPCard
                          text="We were on a break..."
                          subtext="Maybe"
                          type="Maybe"
                          isSelected={formData.status === 'Maybe'}
                          onClick={() => handleSelection('Maybe')}
                        />
                        {/* Persistent message for Maybe */}
                        {formData.status === 'Maybe' && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-2 text-center"
                          >
                            <p className="text-xs font-medium text-amber-700 bg-amber-50 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-amber-100">
                              <Info size={12} strokeWidth={3} />
                              I'll reach out to you again on Dec 8th
                            </p>
                          </motion.div>
                        )}
                      </div>

                      <RSVPCard
                        text="I'm in Yemen"
                        subtext="Will be cheering for you guys from afar"
                        type="No"
                        isSelected={formData.status === 'No'}
                        onClick={() => handleSelection('No')}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="mt-4 w-full py-4 bg-gray-900 text-white rounded-2xl font-bold text-lg shadow-xl shadow-purple-900/10 hover:shadow-purple-900/20 hover:-translate-y-1 transform transition-all active:scale-95 disabled:opacity-50 disabled:translate-y-0 flex items-center justify-center gap-3"
                  >
                    {loading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      'Confirm RSVP'
                    )}
                  </button>
                </div>
              ) : (
                // SUCCESS STATE
                <div className="flex flex-col items-center justify-center h-screen p-8 text-center bg-white">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', bounce: 0.5 }}
                    className="text-8xl mb-6 relative"
                  >
                    🦞
                    <motion.div
                      animate={{ opacity: [0, 1, 0], y: -20 }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -top-4 -right-4 text-4xl"
                    >
                      💖
                    </motion.div>
                  </motion.div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    You're our Lobster!
                  </h2>
                  <p className="text-gray-500 max-w-xs mx-auto">
                    Thanks for letting us know. We can't wait to celebrate with
                    you.
                  </p>
                </div>
              )}
            </div>

            {/* --- ANIMATION OVERLAYS --- */}

            {/* 1. Clapping Hands Overlay */}
            <AnimatePresence>
              {clapping && (
                <div className="absolute inset-0 pointer-events-none flex items-end justify-center pb-20 z-50 overflow-hidden">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ y: 200, opacity: 0, scale: 0.5 }}
                      animate={{
                        y: -300 - Math.random() * 200,
                        opacity: [0, 1, 0],
                        scale: 1 + Math.random(),
                        x: (i - 2.5) * 100,
                        rotate: Math.random() * 40 - 20,
                      }}
                      transition={{ duration: 2, ease: 'easeOut' }}
                      className="text-6xl absolute bottom-0"
                    >
                      👏
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>

            {/* 2. Plane Animation */}
            <AnimatePresence>
              {showPlane && (
                <motion.div
                  initial={{ x: -100, y: 300, scale: 0.5, rotate: 0 }}
                  animate={{ x: '120vw', y: -500, scale: 2, rotate: -35 }}
                  transition={{ duration: 2.5, ease: 'easeInOut' }}
                  className="fixed bottom-0 left-0 z-50 text-gray-800 drop-shadow-2xl"
                >
                  <Plane
                    size={120}
                    fill="currentColor"
                    className="text-gray-800"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* 3. Toast Message */}
            <AnimatePresence>
              {toast.show && (
                <motion.div
                  initial={{ y: 50, opacity: 0, scale: 0.9 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: 20, opacity: 0, scale: 0.9 }}
                  className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-full shadow-2xl z-[60] text-sm font-bold flex items-center gap-2 whitespace-nowrap backdrop-blur-md
                    ${
                      toast.type === 'error'
                        ? 'bg-red-500/90 text-white'
                        : toast.type === 'warning'
                        ? 'bg-amber-400/90 text-amber-900'
                        : 'bg-gray-800/90 text-white'
                    }`}
                >
                  {toast.type === 'warning' && <AlertCircle size={16} />}
                  {toast.type === 'info' && <Info size={16} />}
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
