import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Clapperboard,
  Flag,
  Shield,
  Radio,
  Minus,
  Plus,
  Loader2,
  Check,
  Info,
  Zap,
  Calendar,
  MapPin,
  Clock,
  Users,
  Sparkles,
  Heart,
  Star,
  CircleDot,
  Ticket,
  Film,
  Trophy,
  Flashlight,
  Coffee,
} from 'lucide-react';

// --- Configuration ---
const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbzkJKeL7DRXaI33N0sBAyO4QMVnCZk08zgKkGF8yrHwS0kAbb6HIyeQCdIYMT2tbaTiEA/exec';

// ============================================================================
// THEME SELECTOR LANDING PAGE
// ============================================================================

const ThemeCard = ({
  theme,
  title,
  subtitle,
  emoji,
  colors,
  icon: Icon,
  elements,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.03, y: -5 }}
      whileTap={{ scale: 0.98 }}
      style={{
        width: '100%',
        padding: '20px',
        borderRadius: '16px',
        border: `2px solid ${colors.border}`,
        background: `linear-gradient(135deg, ${colors.bg1} 0%, ${colors.bg2} 100%)`,
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'left',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        transition: 'box-shadow 0.3s',
        boxShadow: isHovered ? `0 10px 40px ${colors.glow}` : 'none',
      }}
    >
      {/* Animated background elements */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          opacity: 0.1,
        }}
      >
        {elements}
      </div>

      {/* Icon container */}
      <div
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '12px',
          background: `linear-gradient(135deg, ${colors.accent}33 0%, ${colors.accent}11 100%)`,
          border: `1px solid ${colors.accent}44`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          fontSize: '1.8rem',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {emoji}
      </div>

      {/* Text content */}
      <div style={{ flex: 1, position: 'relative', zIndex: 2 }}>
        <p
          style={{
            fontSize: '1.1rem',
            fontWeight: 700,
            color: colors.accent,
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          {title}
        </p>
        <p
          style={{
            fontSize: '0.75rem',
            color: '#888',
            margin: '4px 0 0 0',
            fontStyle: 'italic',
          }}
        >
          {subtitle}
        </p>
      </div>

      {/* Arrow */}
      <motion.div
        animate={{ x: isHovered ? 5 : 0 }}
        style={{
          color: colors.accent,
          fontSize: '1.2rem',
          position: 'relative',
          zIndex: 2,
        }}
      >
        →
      </motion.div>
    </motion.button>
  );
};

const ThemeSelectorPage = ({ onSelectTheme }) => {
  const themes = [
    {
      id: 'friends',
      title: '"Could I BE any more excited?"',
      subtitle: 'For the ones who never miss a rerun',
      emoji: '☕',
      colors: {
        bg1: '#2d1f3d',
        bg2: '#1a1025',
        border: '#926F98',
        accent: '#F4C430',
        glow: 'rgba(244, 196, 48, 0.3)',
      },
      elements: (
        <>
          <div
            style={{
              position: 'absolute',
              top: '10%',
              right: '10%',
              fontSize: '2rem',
              opacity: 0.3,
            }}
          >
            🛋️
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: '10%',
              right: '25%',
              fontSize: '1.5rem',
              opacity: 0.3,
            }}
          >
            🦞
          </div>
        </>
      ),
    },
    {
      id: 'kollywood',
      title: '"First Day First Show!"',
      subtitle: 'For the cinema lovers & blockbuster fans',
      emoji: '🎬',
      colors: {
        bg1: '#2d1a0a',
        bg2: '#1a0f05',
        border: '#ffd700',
        accent: '#ffd700',
        glow: 'rgba(255, 215, 0, 0.3)',
      },
      elements: (
        <>
          <div
            style={{
              position: 'absolute',
              top: '10%',
              right: '15%',
              fontSize: '1.5rem',
              opacity: 0.3,
            }}
          >
            ⭐
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: '15%',
              right: '10%',
              fontSize: '1.8rem',
              opacity: 0.3,
            }}
          >
            🎟️
          </div>
        </>
      ),
    },
    {
      id: 'f1',
      title: '"Box Box Box!"',
      subtitle: 'For those who live life in the fast lane',
      emoji: '🏎️',
      colors: {
        bg1: '#1a0a0a',
        bg2: '#0d0505',
        border: '#e10600',
        accent: '#e10600',
        glow: 'rgba(225, 6, 0, 0.3)',
      },
      elements: (
        <>
          <div
            style={{
              position: 'absolute',
              top: '15%',
              right: '10%',
              fontSize: '1.5rem',
              opacity: 0.3,
            }}
          >
            🏁
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: '10%',
              right: '20%',
              fontSize: '1.5rem',
              opacity: 0.3,
            }}
          >
            🏆
          </div>
        </>
      ),
    },
    {
      id: 'mcu',
      title: '"I Can Do This All Day"',
      subtitle: 'For the heroes ready to assemble',
      emoji: '🦸',
      colors: {
        bg1: '#0f1a2e',
        bg2: '#0a0f1a',
        border: '#3b82f6',
        accent: '#f97316',
        glow: 'rgba(59, 130, 246, 0.3)',
      },
      elements: (
        <>
          <div
            style={{
              position: 'absolute',
              top: '10%',
              right: '12%',
              fontSize: '1.5rem',
              opacity: 0.3,
            }}
          >
            ⚡
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: '15%',
              right: '15%',
              fontSize: '1.5rem',
              opacity: 0.3,
            }}
          >
            🛡️
          </div>
        </>
      ),
    },
    {
      id: 'strangerthings',
      title: '"Friends Don\'t Lie"',
      subtitle: 'For the ones brave enough to enter',
      emoji: '🧇',
      colors: {
        bg1: '#1a0505',
        bg2: '#0a0000',
        border: '#ff0000',
        accent: '#ff0000',
        glow: 'rgba(255, 0, 0, 0.3)',
      },
      elements: (
        <>
          <div
            style={{
              position: 'absolute',
              top: '12%',
              right: '10%',
              fontSize: '1.5rem',
              opacity: 0.3,
            }}
          >
            📻
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: '10%',
              right: '18%',
              fontSize: '1.5rem',
              opacity: 0.3,
            }}
          >
            🚲
          </div>
        </>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        minHeight: '100vh',
        minHeight: '100dvh',
        background: 'linear-gradient(180deg, #0f0f1a 0%, #050510 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '40px 20px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.03,
          backgroundImage: `
          linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
        `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Floating emojis */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        {['💍', '✨', '💖', '🎉', '💫'].map((emoji, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              fontSize: '1.5rem',
              opacity: 0.15,
              left: `${15 + i * 20}%`,
              top: `${10 + (i % 3) * 30}%`,
            }}
            animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
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

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{
          textAlign: 'center',
          marginBottom: '16px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
          style={{ fontSize: '4rem', marginBottom: '16px' }}
        >
          💍
        </motion.div>
        <p
          style={{
            fontSize: '0.7rem',
            color: '#666',
            letterSpacing: '0.3em',
            marginBottom: '8px',
            textTransform: 'uppercase',
          }}
        >
          You're Invited To
        </p>
        <h1
          style={{
            fontSize: 'clamp(1.8rem, 6vw, 2.5rem)',
            fontWeight: 900,
            margin: 0,
            background:
              'linear-gradient(135deg, #f97316 0%, #ec4899 50%, #8b5cf6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: 1.2,
          }}
        >
          The Engagement
        </h1>
        <p
          style={{
            fontSize: '0.85rem',
            color: '#888',
            marginTop: '8px',
          }}
        >
          Dec 10 • 5:30 PM • Accord Chrome, Chrompet
        </p>
      </motion.div>

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.5 }}
        style={{
          width: '60px',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #666, transparent)',
          margin: '20px 0',
        }}
      />

      {/* Choose Your Portal Title */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        style={{ textAlign: 'center', marginBottom: '24px' }}
      >
        <h2
          style={{
            fontSize: '1.3rem',
            fontWeight: 700,
            color: 'white',
            margin: '0 0 8px 0',
          }}
        >
          Choose Your Universe 🌌
        </h2>
        <p
          style={{
            fontSize: '0.8rem',
            color: '#666',
          }}
        >
          Pick a vibe that speaks to you
        </p>
      </motion.div>

      {/* Theme Cards */}
      <div
        style={{
          width: '100%',
          maxWidth: '450px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {themes.map((theme, index) => (
          <motion.div
            key={theme.id}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 + index * 0.1 }}
          >
            <ThemeCard {...theme} onClick={() => onSelectTheme(theme.id)} />
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        style={{
          marginTop: '32px',
          fontSize: '0.7rem',
          color: '#444',
          textAlign: 'center',
        }}
      >
        ✨ Each universe leads to the same celebration ✨
      </motion.p>
    </motion.div>
  );
};

// ============================================================================
// SHARED COMPONENTS
// ============================================================================

const EventDetails = ({ theme }) => {
  const configs = {
    friends: {
      colors: ['#926F98', '#F4C430', '#ec4899'],
      labels: ['Dec 10', '5:30 PM', 'Our Central Perk'],
    },
    kollywood: {
      colors: ['#ffd700', '#22c55e', '#f472b6'],
      labels: ['DEC 10', '5:30 PM', 'ACCORD CHROME'],
    },
    f1: {
      colors: ['#e10600', '#22c55e', '#eab308'],
      labels: ['DEC 10', '17:30 IST', 'ACCORD CHROME'],
    },
    mcu: {
      colors: ['#3b82f6', '#22c55e', '#f97316'],
      labels: ['DEC 10', '17:30 HRS', 'ACCORD CHROME'],
    },
    strangerthings: {
      colors: ['#ff0000', '#ffff00', '#00ff00'],
      labels: ['DEC 10', '5:30 PM', 'ACCORD CHROME'],
    },
  };
  const config = configs[theme];

  return (
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
          background: '#1a1a1a',
          color: config.colors[0],
          border: '1px solid #333',
          padding: '8px 14px',
          borderRadius: '8px',
          fontSize: '0.75rem',
          fontWeight: 600,
        }}
      >
        <Calendar size={14} />
        <span>{config.labels[0]}</span>
      </div>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: '#1a1a1a',
          color: config.colors[1],
          border: '1px solid #333',
          padding: '8px 14px',
          borderRadius: '8px',
          fontSize: '0.75rem',
          fontWeight: 600,
        }}
      >
        <Clock size={14} />
        <span>{config.labels[1]}</span>
      </div>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: '#1a1a1a',
          color: config.colors[2],
          border: '1px solid #333',
          padding: '8px 14px',
          borderRadius: '8px',
          fontSize: '0.75rem',
          fontWeight: 600,
        }}
      >
        <MapPin size={14} />
        <span>{config.labels[2]}</span>
      </div>
    </div>
  );
};

// ============================================================================
// THEME-SPECIFIC RSVP FORMS
// ============================================================================

// --- Generic RSVP Card ---
const RSVPCard = ({
  text,
  subtext,
  tagline,
  onClick,
  isSelected,
  type,
  icon: Icon,
  theme,
}) => {
  const getThemeColors = () => {
    const baseColors = {
      friends: { yes: '#22c55e', maybe: '#f59e0b', no: '#ef4444' },
      kollywood: { yes: '#ffd700', maybe: '#f59e0b', no: '#ef4444' },
      f1: { yes: '#22c55e', maybe: '#eab308', no: '#ef4444' },
      mcu: { yes: '#22c55e', maybe: '#eab308', no: '#ef4444' },
      strangerthings: { yes: '#ff0000', maybe: '#ffff00', no: '#0088ff' },
    };
    return baseColors[theme] || baseColors.friends;
  };

  const colors = getThemeColors();
  const accentColor = !isSelected
    ? '#666'
    : type === 'Yes'
    ? colors.yes
    : type === 'Maybe'
    ? colors.maybe
    : colors.no;

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      style={{
        width: '100%',
        padding: '16px',
        borderRadius: '12px',
        textAlign: 'left',
        transition: 'all 0.3s',
        border: `2px solid ${isSelected ? accentColor : '#333'}`,
        background: isSelected ? `${accentColor}15` : '#1a1a1a',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        boxShadow: isSelected ? `0 0 25px ${accentColor}33` : 'none',
        cursor: 'pointer',
      }}
    >
      <div
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          background: `${accentColor}22`,
          border: `1px solid ${accentColor}44`,
        }}
      >
        <Icon size={24} color={accentColor} />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontWeight: 700,
            fontSize: '1rem',
            margin: 0,
            color: isSelected ? accentColor : 'white',
          }}
        >
          {text}
        </p>
        {tagline && (
          <p
            style={{
              fontSize: '0.7rem',
              opacity: 0.5,
              margin: '2px 0 0 0',
              fontStyle: 'italic',
            }}
          >
            "{tagline}"
          </p>
        )}
        <p style={{ fontSize: '0.8rem', opacity: 0.7, margin: '4px 0 0 0' }}>
          {subtext}
        </p>
      </div>

      <div
        style={{
          width: '26px',
          height: '26px',
          borderRadius: '50%',
          border: `2px solid ${isSelected ? accentColor : '#444'}`,
          background: isSelected ? accentColor : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          boxShadow: isSelected ? `0 0 10px ${accentColor}` : 'none',
        }}
      >
        {isSelected && <Check size={14} color="#000" strokeWidth={3} />}
      </div>
    </motion.button>
  );
};

// --- Theme Configs ---
const themeConfigs = {
  friends: {
    name: 'Friends',
    headerEmoji: '💍',
    headerBadge: '☕ CENTRAL PERK EXCLUSIVE',
    title: 'The One With The',
    titleHighlight: 'Engagement',
    gradients: {
      bg: 'linear-gradient(180deg, #2d1f3d 0%, #1a1025 100%)',
      accent: 'linear-gradient(90deg, #926F98, #F4C430)',
      button: 'linear-gradient(90deg, #926F98, #F4C430)',
    },
    accentColor: '#F4C430',
    rsvpOptions: [
      {
        text: "I'll be there for you! 👏",
        tagline: 'So no one told you life was gonna be this way',
        subtext: "Wouldn't miss it for the world",
        type: 'Yes',
        icon: Heart,
      },
      {
        text: 'We were on a break... 🤔',
        tagline: null,
        subtext: 'Still figuring things out',
        type: 'Maybe',
        icon: Clock,
      },
      {
        text: "I'm in Yemen! ✈️",
        tagline: '15 Yemen Road, Yemen',
        subtext: 'Cheering from afar',
        type: 'No',
        icon: Coffee,
      },
    ],
    successEmoji: '🦞',
    successTitle: "You're our Lobster!",
  },
  kollywood: {
    name: 'Kollywood',
    headerEmoji: '💍',
    headerBadge: '⭐ NOW SHOWING ⭐',
    title: 'The',
    titleHighlight: 'Engagement',
    gradients: {
      bg: 'linear-gradient(180deg, #1a0a0a 0%, #0a0000 100%)',
      accent: 'linear-gradient(90deg, #ffd700, #ff8c00)',
      button: 'linear-gradient(90deg, #ffd700, #ff8c00)',
    },
    accentColor: '#ffd700',
    rsvpOptions: [
      {
        text: '🎬 First Day First Show!',
        tagline: null,
        subtext: "I'll be there with full excitement",
        type: 'Yes',
        icon: Star,
      },
      {
        text: '🎞️ Interval Break...',
        tagline: null,
        subtext: 'Still checking my schedule',
        type: 'Maybe',
        icon: Clock,
      },
      {
        text: '📺 Will Catch the Replay',
        tagline: null,
        subtext: "Can't make it, but sending love!",
        type: 'No',
        icon: Film,
      },
    ],
    successEmoji: '🎬',
    successTitle: 'Blockbuster Confirmed!',
  },
  f1: {
    name: 'F1',
    headerEmoji: '🏎️',
    headerBadge: '🏁 RACE DAY',
    title: 'Grand Prix of',
    titleHighlight: 'Love',
    gradients: {
      bg: 'linear-gradient(180deg, #1a0a0a 0%, #0a0000 100%)',
      accent: 'linear-gradient(90deg, #e10600, #ff4444)',
      button: '#e10600',
    },
    accentColor: '#e10600',
    rsvpOptions: [
      {
        text: 'Box Box Box! 🏁',
        tagline: 'Copy, we are coming in!',
        subtext: "Pit confirmed - I'll be there",
        type: 'Yes',
        icon: Flag,
      },
      {
        text: 'We Are Checking...',
        tagline: 'Slow button on',
        subtext: 'Still strategizing',
        type: 'Maybe',
        icon: Radio,
      },
      {
        text: 'Retire From Race',
        tagline: 'No power... no power!',
        subtext: "DNF - Can't make it",
        type: 'No',
        icon: Zap,
      },
    ],
    successEmoji: '🏆',
    successTitle: 'P1!',
  },
  mcu: {
    name: 'MCU',
    headerEmoji: '💍',
    headerBadge: 'PRIORITY CLEARANCE',
    title: 'The',
    titleHighlight: 'Engagement',
    gradients: {
      bg: 'linear-gradient(180deg, #0f0f1a 0%, #0a0a15 100%)',
      accent: 'linear-gradient(90deg, #f97316, #dc2626)',
      button: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
    },
    accentColor: '#3b82f6',
    rsvpOptions: [
      {
        text: "I'm In! 🦸",
        tagline: 'I can do this all day',
        subtext: 'Count me in for the celebration',
        type: 'Yes',
        icon: Shield,
      },
      {
        text: 'Checking the Timeline...',
        tagline: "We're in the endgame now",
        subtext: 'Still figuring out logistics',
        type: 'Maybe',
        icon: CircleDot,
      },
      {
        text: 'On Another Mission',
        tagline: 'I am inevitable... elsewhere',
        subtext: "Can't make it, but sending wishes!",
        type: 'No',
        icon: Sparkles,
      },
    ],
    successEmoji: '🦸',
    successTitle: "You're an Avenger!",
  },
  strangerthings: {
    name: 'Stranger Things',
    headerEmoji: '💍',
    headerBadge: '📻 HAWKINS TRANSMISSION',
    title: 'The',
    titleHighlight: 'Engagement',
    gradients: {
      bg: 'linear-gradient(180deg, #1a0505 0%, #0a0000 100%)',
      accent: '#ff0000',
      button: '#ff0000',
    },
    accentColor: '#ff0000',
    rsvpOptions: [
      {
        text: "Friends Don't Lie! 🧇",
        tagline: "I'll be there",
        subtext: '100% confirmed, count me in!',
        type: 'Yes',
        icon: Heart,
      },
      {
        text: 'Stuck in the Upside Down 🙃',
        tagline: 'Still finding my way back',
        subtext: 'Working on it, will confirm soon',
        type: 'Maybe',
        icon: Zap,
      },
      {
        text: 'Gone to Hawkins Lab 🔬',
        tagline: 'Running some experiments',
        subtext: "Can't make it, but sending love!",
        type: 'No',
        icon: Radio,
      },
    ],
    successEmoji: '🧇',
    successTitle: "You're in the Party!",
  },
};

// --- Main RSVP Form ---
const ThemedRSVPForm = ({ theme, onBack }) => {
  const config = themeConfigs[theme];
  const [formData, setFormData] = useState({ name: '', guests: 1, status: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: '', type: 'info' });
  const [showCelebration, setShowCelebration] = useState(false);

  const triggerConfetti = () => {
    const colors = ['#926F98', '#F4C430', '#ff0000', '#22c55e', '#3b82f6'];
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors });
    setTimeout(
      () =>
        confetti({
          particleCount: 60,
          spread: 100,
          origin: { y: 0.5, x: 0.2 },
          colors,
        }),
      200
    );
    setTimeout(
      () =>
        confetti({
          particleCount: 60,
          spread: 100,
          origin: { y: 0.5, x: 0.8 },
          colors,
        }),
      400
    );
  };

  const handleSelection = (type) => {
    setFormData({ ...formData, status: type });
    if (type === 'Yes') {
      triggerConfetti();
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      setToast({ show: true, msg: 'Please enter your name!', type: 'error' });
      setTimeout(() => setToast({ show: false, msg: '', type: 'info' }), 2500);
      return;
    }
    if (!formData.status) {
      setToast({ show: true, msg: 'Please select an option!', type: 'error' });
      setTimeout(() => setToast({ show: false, msg: '', type: 'info' }), 2500);
      return;
    }

    setLoading(true);
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, theme }),
      });
      setSubmitted(true);
      if (formData.status === 'Yes') triggerConfetti();
    } catch (error) {
      setToast({
        show: true,
        msg: 'Connection error. Try again!',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        minHeight: '100vh',
        minHeight: '100dvh',
        background: config.gradients.bg,
        position: 'relative',
      }}
    >
      {/* Top accent bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background:
            typeof config.gradients.accent === 'string' &&
            !config.gradients.accent.includes('gradient')
              ? config.gradients.accent
              : config.gradients.accent,
        }}
      />

      {/* Back button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          background: 'rgba(255,255,255,0.1)',
          border: 'none',
          color: '#888',
          padding: '8px 16px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '0.8rem',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          zIndex: 100,
        }}
      >
        ← Back
      </motion.button>

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
            <div style={{ padding: '60px 20px 40px' }}>
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  background:
                    'linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)',
                  borderRadius: '20px',
                  padding: '28px 24px',
                  border: '1px solid #333',
                  textAlign: 'center',
                  marginBottom: '20px',
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', bounce: 0.5 }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '80px',
                    height: '80px',
                    background: `${config.accentColor}22`,
                    borderRadius: '50%',
                    marginBottom: '16px',
                    boxShadow: `0 0 40px ${config.accentColor}33`,
                  }}
                >
                  <span style={{ fontSize: '2.5rem' }}>
                    {config.headerEmoji}
                  </span>
                </motion.div>

                <div
                  style={{
                    display: 'inline-block',
                    background: config.gradients.accent,
                    padding: '4px 14px',
                    borderRadius: '4px',
                    marginBottom: '12px',
                  }}
                >
                  <p
                    style={{
                      fontSize: '0.6rem',
                      fontWeight: 800,
                      color:
                        theme === 'kollywood' || theme === 'f1'
                          ? '#000'
                          : '#fff',
                      letterSpacing: '0.15em',
                      margin: 0,
                    }}
                  >
                    {config.headerBadge}
                  </p>
                </div>

                <h1
                  style={{
                    fontSize: '1.75rem',
                    fontWeight: 900,
                    color: 'white',
                    lineHeight: 1.2,
                    margin: '0 0 8px 0',
                  }}
                >
                  {config.title}{' '}
                  <span
                    style={{
                      background: config.gradients.accent,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {config.titleHighlight}
                  </span>
                </h1>

                <EventDetails theme={theme} />
                <p
                  style={{
                    color: '#555',
                    fontSize: '0.7rem',
                    marginTop: '10px',
                  }}
                >
                  📍 Chrompet, Chennai
                </p>
              </motion.div>

              {/* Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                style={{
                  background:
                    'linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)',
                  borderRadius: '20px',
                  padding: '24px 20px',
                  border: '1px solid #333',
                  marginBottom: '20px',
                }}
              >
                {/* Name */}
                <div style={{ marginBottom: '20px' }}>
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      color: '#888',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      marginBottom: '8px',
                      marginLeft: '4px',
                    }}
                  >
                    <Users size={14} />
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Enter your name"
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      fontSize: '1rem',
                      color: 'white',
                      background: '#0a0a0a',
                      border: '2px solid #333',
                      borderRadius: '10px',
                      outline: 'none',
                      boxSizing: 'border-box',
                      fontWeight: 500,
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = config.accentColor;
                      e.target.style.boxShadow = `0 0 0 3px ${config.accentColor}33`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#333';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                {/* Guests */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px',
                    background: '#0a0a0a',
                    borderRadius: '10px',
                    border: '1px solid #222',
                  }}
                >
                  <label
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: '#888',
                      textTransform: 'uppercase',
                    }}
                  >
                    Total Guests
                  </label>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      background: '#1a1a1a',
                      padding: '6px',
                      borderRadius: '8px',
                      border: '1px solid #333',
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
                        borderRadius: '6px',
                        background: '#0a0a0a',
                        border: '1px solid #333',
                        cursor: 'pointer',
                        color: '#ef4444',
                      }}
                    >
                      <Minus size={16} />
                    </button>
                    <span
                      style={{
                        width: '28px',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: '1.25rem',
                        color: config.accentColor,
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
                        borderRadius: '6px',
                        background: '#0a0a0a',
                        border: '1px solid #333',
                        cursor: 'pointer',
                        color: '#22c55e',
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
                transition={{ delay: 0.2 }}
              >
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    color: '#888',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    marginBottom: '12px',
                    marginLeft: '4px',
                  }}
                >
                  <Heart size={14} />
                  YOUR RESPONSE
                </label>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                  }}
                >
                  {config.rsvpOptions.map((option, i) => (
                    <div key={option.type}>
                      <RSVPCard
                        {...option}
                        theme={theme}
                        isSelected={formData.status === option.type}
                        onClick={() => handleSelection(option.type)}
                      />
                      {option.type === 'Maybe' &&
                        formData.status === 'Maybe' && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            style={{ overflow: 'hidden', marginTop: '8px' }}
                          >
                            <p
                              style={{
                                fontSize: '0.75rem',
                                fontWeight: 500,
                                color: '#f59e0b',
                                background: '#1a1a0f',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '10px 14px',
                                borderRadius: '8px',
                                border: '1px solid #333',
                              }}
                            >
                              <Info size={12} strokeWidth={3} />
                              We'll send a reminder on Dec 8th!
                            </p>
                          </motion.div>
                        )}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Submit */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onClick={handleSubmit}
                disabled={loading}
                style={{
                  width: '100%',
                  marginTop: '28px',
                  padding: '18px',
                  background: loading ? '#333' : config.gradients.button,
                  color: theme === 'kollywood' ? '#000' : 'white',
                  borderRadius: '12px',
                  fontWeight: 800,
                  fontSize: '1rem',
                  border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: loading
                    ? 'none'
                    : `0 8px 30px ${config.accentColor}44`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
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
                    CONFIRM RSVP
                  </>
                )}
              </motion.button>
            </div>
          </div>
        ) : (
          // Success State
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '32px',
              textAlign: 'center',
            }}
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', bounce: 0.5 }}
              style={{
                width: '150px',
                height: '150px',
                background: `radial-gradient(circle, ${config.accentColor}33 0%, transparent 70%)`,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px',
                boxShadow: `0 0 60px ${config.accentColor}44`,
              }}
            >
              <span style={{ fontSize: '5rem' }}>{config.successEmoji}</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                fontSize: '2rem',
                fontWeight: 900,
                background: config.gradients.accent,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '12px',
              }}
            >
              {config.successTitle}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{ color: '#888', maxWidth: '280px', lineHeight: 1.7 }}
            >
              {formData.status === 'Yes'
                ? "🎉 You're confirmed! We can't wait to celebrate with you!"
                : formData.status === 'Maybe'
                ? "📅 No worries! We'll remind you on Dec 8th."
                : "💛 We'll miss you! Thanks for letting us know."}
            </motion.p>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              onClick={onBack}
              style={{
                marginTop: '32px',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: '#888',
                padding: '12px 24px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.85rem',
              }}
            >
              ← Choose Another Universe
            </motion.button>
          </div>
        )}
      </div>

      {/* Celebration Overlay */}
      <AnimatePresence>
        {showCelebration && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              pointerEvents: 'none',
              zIndex: 50,
              overflow: 'hidden',
            }}
          >
            {['🎉', '✨', '💖', '🎊', '💫', '⭐', '🥳', '💍'].map(
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
                    scale: [0.5, 1.4, 1],
                    rotate: Math.random() * 60 - 30,
                  }}
                  transition={{
                    duration: 2.5,
                    ease: 'easeOut',
                    delay: i * 0.08,
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

      {/* Toast */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            style={{
              position: 'fixed',
              bottom: '24px',
              left: '16px',
              right: '16px',
              padding: '14px 20px',
              borderRadius: '12px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
              zIndex: 60,
              fontSize: '0.875rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: toast.type === 'error' ? '#ef4444' : '#1a1a1a',
              color: 'white',
              border: '1px solid #333',
            }}
          >
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        input::placeholder { color: #444; }
      `}</style>
    </motion.div>
  );
};

// ============================================================================
// MAIN APP
// ============================================================================

export default function UnifiedRSVP() {
  const [selectedTheme, setSelectedTheme] = useState(null);

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        minHeight: '100dvh',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        color: 'white',
        overflowX: 'hidden',
        background: '#050510',
      }}
    >
      <AnimatePresence mode="wait">
        {!selectedTheme ? (
          <ThemeSelectorPage key="selector" onSelectTheme={setSelectedTheme} />
        ) : (
          <ThemedRSVPForm
            key={selectedTheme}
            theme={selectedTheme}
            onBack={() => setSelectedTheme(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
