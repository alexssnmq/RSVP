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

// --- The Iconic Yellow Frame ---
const YellowFrame = ({ onClick }) => (
  <motion.div
    onClick={onClick}
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: [1, 1.02, 1], opacity: 1 }}
    transition={{
      scale: { repeat: Infinity, duration: 3, ease: 'easeInOut' },
      opacity: { duration: 0.6 },
    }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    style={{
      cursor: 'pointer',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 'min(65vw, 240px)',
      height: 'min(78vw, 280px)',
    }}
  >
    {/* Glow effect */}
    <div
      style={{
        position: 'absolute',
        inset: '-20%',
        background:
          'radial-gradient(circle, rgba(244,196,48,0.4) 0%, transparent 70%)',
        borderRadius: '50%',
      }}
    />

    <svg
      viewBox="0 0 200 240"
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        zIndex: 10,
        filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.3))',
      }}
    >
      <defs>
        <linearGradient id="frameGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F4C430" />
          <stop offset="50%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#E6B800" />
        </linearGradient>
      </defs>
      <path
        fill="url(#frameGradient)"
        d="M20,20 C20,10 30,0 40,0 L160,0 C170,0 180,10 180,20 L180,220 C180,230 170,240 160,240 L40,240 C30,240 20,230 20,220 Z 
           M40,30 L160,30 L160,210 L40,210 Z"
      />
      <circle cx="100" cy="15" r="6" fill="#B8860B" />
      <circle cx="100" cy="225" r="6" fill="#B8860B" />
      <circle cx="25" cy="120" r="6" fill="#B8860B" />
      <circle cx="175" cy="120" r="6" fill="#B8860B" />
    </svg>

    <div style={{ position: 'absolute', textAlign: 'center', zIndex: 20 }}>
      <motion.p
        style={{
          color: 'white',
          fontFamily: 'Georgia, serif',
          letterSpacing: '0.2em',
          fontSize: '1.25rem',
          fontWeight: 'bold',
          textShadow: '0 2px 10px rgba(0,0,0,0.5)',
        }}
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
  const getBackgroundColor = () => {
    if (!isSelected) return '#ffffff';
    switch (type) {
      case 'Yes':
        return '#ecfdf5';
      case 'Maybe':
        return '#fffbeb';
      case 'No':
        return '#fef2f2';
      default:
        return '#ffffff';
    }
  };

  const getBorderColor = () => {
    if (!isSelected) return '#e5e7eb';
    switch (type) {
      case 'Yes':
        return '#10b981';
      case 'Maybe':
        return '#f59e0b';
      case 'No':
        return '#ef4444';
      default:
        return '#e5e7eb';
    }
  };

  const getTextColor = () => {
    if (!isSelected) return '#374151';
    switch (type) {
      case 'Yes':
        return '#065f46';
      case 'Maybe':
        return '#92400e';
      case 'No':
        return '#991b1b';
      default:
        return '#374151';
    }
  };

  const getIconBg = () => {
    if (!isSelected) return '#f3f4f6';
    switch (type) {
      case 'Yes':
        return '#d1fae5';
      case 'Maybe':
        return '#fef3c7';
      case 'No':
        return '#fee2e2';
      default:
        return '#f3f4f6';
    }
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      style={{
        width: '100%',
        padding: '16px',
        borderRadius: '16px',
        textAlign: 'left',
        transition: 'all 0.2s',
        border: `2px solid ${getBorderColor()}`,
        backgroundColor: getBackgroundColor(),
        color: getTextColor(),
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        boxShadow: isSelected
          ? `0 0 0 3px ${getBorderColor()}33`
          : '0 1px 3px rgba(0,0,0,0.1)',
        cursor: 'pointer',
      }}
    >
      <div
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          backgroundColor: getIconBg(),
        }}
      >
        <Icon size={22} color={isSelected ? getTextColor() : '#6b7280'} />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontWeight: 600,
            fontSize: '1rem',
            margin: 0,
            lineHeight: 1.4,
          }}
        >
          {text}
        </p>
        <p style={{ fontSize: '0.75rem', opacity: 0.7, margin: '4px 0 0 0' }}>
          {subtext}
        </p>
      </div>

      <div
        style={{
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          border: `2px solid ${isSelected ? getTextColor() : '#d1d5db'}`,
          backgroundColor: isSelected ? getTextColor() : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {isSelected && <Check size={14} color="white" strokeWidth={3} />}
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
    setTimeout(
      () =>
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.7, x: 0.3 },
          colors,
        }),
      150
    );
    setTimeout(
      () =>
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.7, x: 0.7 },
          colors,
        }),
      300
    );
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
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        minHeight: '100dvh',
        position: 'relative',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        color: '#1f2937',
        overflowX: 'hidden',
      }}
    >
      <AnimatePresence mode="wait">
        {/* SCENE 1: THE DOOR */}
        {scene === 1 && (
          <motion.div
            key="door"
            style={{
              position: 'fixed',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 20,
              padding: '16px',
              background:
                'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #926F98 100%)',
            }}
            exit={{ opacity: 0, scale: 1.1, transition: { duration: 0.5 } }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Floating emojis */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                overflow: 'hidden',
                pointerEvents: 'none',
              }}
            >
              {['💜', '💛', '☕', '🦞', '💍', '✨'].map((emoji, i) => (
                <motion.div
                  key={i}
                  style={{
                    position: 'absolute',
                    fontSize: '2rem',
                    opacity: 0.15,
                    left: `${15 + i * 15}%`,
                    top: `${20 + (i % 3) * 25}%`,
                  }}
                  animate={{ y: [0, -30, 0], rotate: [0, 10, -10, 0] }}
                  transition={{
                    duration: 4 + i,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  {emoji}
                </motion.div>
              ))}
            </div>

            {/* Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255,255,255,0.2)',
                padding: '8px 16px',
                borderRadius: '9999px',
                marginBottom: '24px',
              }}
            >
              <Sparkles size={16} color="#fde047" />
              <span
                style={{
                  color: 'rgba(255,255,255,0.9)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                }}
              >
                You're Invited
              </span>
              <Sparkles size={16} color="#fde047" />
            </motion.div>

            <YellowFrame onClick={() => setScene(2)} />

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              onClick={() => setScene(2)}
              style={{
                marginTop: '32px',
                color: 'white',
                fontSize: '0.875rem',
                fontWeight: 500,
                background: 'rgba(255,255,255,0.2)',
                padding: '12px 24px',
                borderRadius: '9999px',
                border: '1px solid rgba(255,255,255,0.3)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
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
            style={{
              minHeight: '100vh',
              minHeight: '100dvh',
              position: 'relative',
              background:
                'linear-gradient(180deg, #faf5ff 0%, #fefce8 50%, #fdf2f8 100%)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Decorative circles */}
            <div
              style={{
                position: 'absolute',
                top: '-100px',
                left: '-100px',
                width: '300px',
                height: '300px',
                background:
                  'radial-gradient(circle, rgba(192,132,252,0.3) 0%, transparent 70%)',
                borderRadius: '50%',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '40%',
                right: '-150px',
                width: '400px',
                height: '400px',
                background:
                  'radial-gradient(circle, rgba(253,224,71,0.2) 0%, transparent 70%)',
                borderRadius: '50%',
              }}
            />

            <div
              style={{
                position: 'relative',
                zIndex: 10,
                width: '100%',
                maxWidth: '480px',
                margin: '0 auto',
                minHeight: '100vh',
                minHeight: '100dvh',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {!submitted ? (
                <div
                  style={{
                    flex: 1,
                    overflowY: 'auto',
                    WebkitOverflowScrolling: 'touch',
                  }}
                >
                  <div style={{ padding: '24px 20px 40px' }}>
                    {/* Header Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      style={{
                        background: 'white',
                        borderRadius: '24px',
                        padding: '28px 24px',
                        boxShadow: '0 4px 20px rgba(147, 51, 234, 0.1)',
                        textAlign: 'center',
                        marginBottom: '20px',
                      }}
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: 'spring', bounce: 0.5 }}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '72px',
                          height: '72px',
                          background:
                            'linear-gradient(135deg, #f3e8ff 0%, #fce7f3 100%)',
                          borderRadius: '20px',
                          marginBottom: '16px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        }}
                      >
                        <span style={{ fontSize: '2.5rem' }}>💍</span>
                      </motion.div>

                      <h1
                        style={{
                          fontSize: '1.75rem',
                          fontWeight: 'bold',
                          color: '#1f2937',
                          lineHeight: 1.3,
                          margin: '0 0 16px 0',
                          fontFamily: 'Georgia, serif',
                        }}
                      >
                        The One With The
                        <br />
                        <span
                          style={{
                            background:
                              'linear-gradient(90deg, #9333ea, #ec4899)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                          }}
                        >
                          Engagement
                        </span>
                      </h1>

                      {/* Event Details Pills */}
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          justifyContent: 'center',
                          gap: '8px',
                        }}
                      >
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            background: '#f3e8ff',
                            color: '#7c3aed',
                            padding: '6px 12px',
                            borderRadius: '9999px',
                            fontSize: '0.8rem',
                            fontWeight: 500,
                          }}
                        >
                          <Calendar size={14} />
                          <span>Dec 10</span>
                        </div>
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            background: '#fef3c7',
                            color: '#d97706',
                            padding: '6px 12px',
                            borderRadius: '9999px',
                            fontSize: '0.8rem',
                            fontWeight: 500,
                          }}
                        >
                          <Clock size={14} />
                          <span>5:30 PM</span>
                        </div>
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            background: '#fce7f3',
                            color: '#db2777',
                            padding: '6px 12px',
                            borderRadius: '9999px',
                            fontSize: '0.8rem',
                            fontWeight: 500,
                          }}
                        >
                          <MapPin size={14} />
                          <span>Accord Chrome</span>
                        </div>
                      </div>
                      <p
                        style={{
                          color: '#9ca3af',
                          fontSize: '0.75rem',
                          marginTop: '8px',
                        }}
                      >
                        Chrompet, Chennai
                      </p>
                    </motion.div>

                    {/* Form Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      style={{
                        background: 'white',
                        borderRadius: '24px',
                        padding: '24px 20px',
                        boxShadow: '0 4px 20px rgba(147, 51, 234, 0.1)',
                        marginBottom: '20px',
                      }}
                    >
                      {/* Name Input */}
                      <div style={{ marginBottom: '20px' }}>
                        <label
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            color: '#1f2937',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            marginBottom: '8px',
                            marginLeft: '4px',
                          }}
                        >
                          <Users size={14} />
                          Your Name
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="Chandler Bing"
                          style={{
                            width: '100%',
                            padding: '14px 16px',
                            fontSize: '1rem',
                            color: '#1f2937',
                            background: '#f9fafb',
                            border: '2px solid #f3f4f6',
                            borderRadius: '12px',
                            outline: 'none',
                            transition: 'all 0.2s',
                            boxSizing: 'border-box',
                          }}
                          onFocus={(e) => {
                            e.target.style.background = 'white';
                            e.target.style.borderColor = '#a855f7';
                          }}
                          onBlur={(e) => {
                            e.target.style.background = '#f9fafb';
                            e.target.style.borderColor = '#f3f4f6';
                          }}
                        />
                      </div>

                      {/* Guest Counter */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '16px',
                          background:
                            'linear-gradient(90deg, #faf5ff, #fdf2f8)',
                          borderRadius: '12px',
                        }}
                      >
                        <label
                          style={{
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            color: '#4b5563',
                          }}
                        >
                          Total Guests
                        </label>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            background: 'white',
                            padding: '6px',
                            borderRadius: '12px',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                          }}
                        >
                          <button
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                guests: Math.max(1, prev.guests - 1),
                              }))
                            }
                            style={{
                              width: '36px',
                              height: '36px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: '8px',
                              background: '#f3f4f6',
                              border: 'none',
                              cursor: 'pointer',
                              color: '#4b5563',
                            }}
                          >
                            <Minus size={16} />
                          </button>
                          <span
                            style={{
                              width: '24px',
                              textAlign: 'center',
                              fontWeight: 'bold',
                              fontSize: '1.125rem',
                            }}
                          >
                            {formData.guests}
                          </span>
                          <button
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                guests: prev.guests + 1,
                              }))
                            }
                            style={{
                              width: '36px',
                              height: '36px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: '8px',
                              background: '#f3f4f6',
                              border: 'none',
                              cursor: 'pointer',
                              color: '#4b5563',
                            }}
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
                    >
                      <label
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          color: '#9ca3af',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          marginBottom: '12px',
                          marginLeft: '4px',
                        }}
                      >
                        <Heart size={14} />
                        Are you coming?
                      </label>

                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '12px',
                        }}
                      >
                        <RSVPCard
                          text="I'll be there for you!"
                          subtext="Wouldn't miss it for the world"
                          type="Yes"
                          icon={Heart}
                          isSelected={formData.status === 'Yes'}
                          onClick={() => handleSelection('Yes')}
                        />

                        <div>
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
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                style={{ overflow: 'hidden', marginTop: '8px' }}
                              >
                                <p
                                  style={{
                                    fontSize: '0.75rem',
                                    fontWeight: 500,
                                    color: '#92400e',
                                    background: '#fef3c7',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '8px 12px',
                                    borderRadius: '12px',
                                    border: '1px solid #fde68a',
                                  }}
                                >
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
                      style={{
                        width: '100%',
                        marginTop: '24px',
                        padding: '16px',
                        background: 'linear-gradient(90deg, #9333ea, #ec4899)',
                        color: 'white',
                        borderRadius: '16px',
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        border: 'none',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        opacity: loading ? 0.6 : 1,
                        boxShadow: '0 8px 20px rgba(147, 51, 234, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                      }}
                      onMouseDown={(e) => {
                        if (!loading)
                          e.currentTarget.style.transform = 'scale(0.98)';
                      }}
                      onMouseUp={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      {loading ? (
                        <Loader2
                          size={22}
                          style={{ animation: 'spin 1s linear infinite' }}
                        />
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
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '32px',
                    textAlign: 'center',
                    minHeight: '100vh',
                  }}
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', bounce: 0.5 }}
                    style={{ position: 'relative', marginBottom: '24px' }}
                  >
                    <div
                      style={{
                        width: '140px',
                        height: '140px',
                        background:
                          'linear-gradient(135deg, #f3e8ff, #fce7f3, #fef3c7)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                      }}
                    >
                      <span style={{ fontSize: '4rem' }}>🦞</span>
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{
                        position: 'absolute',
                        top: '-8px',
                        right: '-8px',
                        fontSize: '2rem',
                      }}
                    >
                      💖
                    </motion.div>
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    style={{
                      fontSize: '1.75rem',
                      fontWeight: 'bold',
                      background: 'linear-gradient(90deg, #9333ea, #ec4899)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      marginBottom: '12px',
                    }}
                  >
                    You're our Lobster!
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    style={{
                      color: '#6b7280',
                      maxWidth: '280px',
                      lineHeight: 1.6,
                    }}
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
                    style={{
                      marginTop: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#9ca3af',
                      fontSize: '0.875rem',
                    }}
                  >
                    <Heart size={14} color="#f472b6" />
                    <span>See you at Central Perk</span>
                    <Heart size={14} color="#f472b6" />
                  </motion.div>
                </div>
              )}
            </div>

            {/* --- ANIMATION OVERLAYS --- */}

            {/* Clapping Emojis */}
            <AnimatePresence>
              {clapping && (
                <div
                  style={{
                    position: 'fixed',
                    inset: 0,
                    pointerEvents: 'none',
                    zIndex: 50,
                    overflow: 'hidden',
                  }}
                >
                  {['👏', '🎉', '💜', '✨', '👏', '💛', '🎊', '💕'].map(
                    (emoji, i) => (
                      <motion.div
                        key={i}
                        initial={{
                          y: '100vh',
                          x: `${10 + i * 12}%`,
                          opacity: 0,
                          scale: 0.5,
                        }}
                        animate={{
                          y: '-20vh',
                          opacity: [0, 1, 1, 0],
                          scale: [0.5, 1.2, 1],
                          rotate: Math.random() * 40 - 20,
                        }}
                        transition={{
                          duration: 2.5,
                          ease: 'easeOut',
                          delay: i * 0.1,
                        }}
                        style={{ position: 'absolute', fontSize: '2.5rem' }}
                      >
                        {emoji}
                      </motion.div>
                    )
                  )}
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
                  style={{ position: 'fixed', zIndex: 50, color: '#9333ea' }}
                >
                  <Plane
                    size={60}
                    fill="currentColor"
                    style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' }}
                  />
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
                  style={{
                    position: 'fixed',
                    bottom: '24px',
                    left: '16px',
                    right: '16px',
                    padding: '14px 20px',
                    borderRadius: '16px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                    zIndex: 60,
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    background: toast.type === 'error' ? '#ef4444' : '#1f2937',
                    color: 'white',
                  }}
                >
                  {toast.msg}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSS for spinner animation */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
