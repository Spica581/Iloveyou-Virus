// ⚡ ENHANCED VERSION v2.1 - WITH CSS OVERRIDE FIX ⚡
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Tier2Letter from './Tier2Letter';

export default function Tier3Letter({ letter }) {

  const [step, setStep] = useState('intro');
  const [isDark, setIsDark] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [pulseHeart, setPulseHeart] = useState(false);
  const [buttonRipples, setButtonRipples] = useState([]);
  const [heartBurst, setHeartBurst] = useState(false);
  const [screenShake, setScreenShake] = useState(false);
  const [flashEffect, setFlashEffect] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [memorySlides, setMemorySlides] = useState([]);
  const [currentMemory, setCurrentMemory] = useState(0);
  const [hasReplayed, setHasReplayed] = useState(false);

  const triggerConfetti = () => {
    setShowConfetti(true);
    setPulseHeart(true);
    setShowFireworks(true);
    setTimeout(() => setShowConfetti(false), 4000);
    setTimeout(() => setPulseHeart(false), 1000);
    setTimeout(() => setShowFireworks(false), 3000);
  };

  const handleReplay = () => {
    setStep('intro');
    setClickCount(0);
    setHasReplayed(true);
    setShowConfetti(false);
    setPulseHeart(false);
    setHeartBurst(false);
    setScreenShake(false);
    setFlashEffect(false);
    setShowFireworks(false);
    setButtonRipples([]);
  };

  // Trigger button click effects
  const handleButtonClick = (e) => {
    // Increment click count
    const newCount = clickCount + 1;
    setClickCount(newCount);

    // Trigger confetti after 3 clicks
    if (newCount >= 3) {
      triggerConfetti();
    }

    // Screen shake effect
    setScreenShake(true);
    setTimeout(() => setScreenShake(false), 500);

    // Flash effect
    setFlashEffect(true);
    setTimeout(() => setFlashEffect(false), 300);

    // Ripple effect from click position
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { id: Date.now(), x, y };
    setButtonRipples(prev => [...prev, newRipple]);
    setTimeout(() => {
      setButtonRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 1000);

    // Heart burst from button
    setHeartBurst(true);
    setTimeout(() => setHeartBurst(false), 1000);

    // Create particle burst
    createParticleBurst(e.clientX, e.clientY);

    // Show alert with slight delay
    setTimeout(() => {
      alert("❤️ I love you more than words can say!");
    }, 100);
  };

  // Particle burst effect
  const createParticleBurst = (x, y) => {
    const particles = ['❤️', '💖', '💗', '💓', '💕', '✨', '⭐', '💫'];
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.innerText = particles[Math.floor(Math.random() * particles.length)];
      particle.style.position = 'fixed';
      particle.style.left = x + 'px';
      particle.style.top = y + 'px';
      particle.style.fontSize = (Math.random() * 15 + 15) + 'px';
      particle.style.zIndex = '9999';
      particle.style.pointerEvents = 'none';

      const angle = (Math.PI * 2 * i) / particleCount;
      const velocity = Math.random() * 150 + 100;
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity;

      particle.animate([
        {
          transform: 'translate(0, 0) scale(1) rotate(0deg)',
          opacity: 1
        },
        {
          transform: `translate(${tx}px, ${ty}px) scale(0) rotate(${Math.random() * 360}deg)`,
          opacity: 0
        }
      ], {
        duration: 800,
        easing: 'cubic-bezier(0.4, 0.0, 0.6, 1)'
      });

      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), 800);
    }
  };

  // Enhanced confetti with physics
  useEffect(() => {
    if (showConfetti) {
      const hearts = ['❤️', '💖', '💗', '💓', '💕', '💝', '💘', '💞'];
      
      for (let i = 0; i < 100; i++) {
        setTimeout(() => {
          const heart = document.createElement('div');
          heart.innerText = hearts[Math.floor(Math.random() * hearts.length)];
          heart.style.position = 'fixed';
          heart.style.left = Math.random() * 100 + 'vw';
          heart.style.top = '-50px';
          heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
          heart.style.zIndex = '9999';
          heart.style.pointerEvents = 'none';
          
          // Random rotation
          const rotation = Math.random() * 360;
          heart.style.transform = `rotate(${rotation}deg)`;
          
          // Animate down with wobble
          const fallDuration = Math.random() * 2 + 3;
          const wobble = Math.random() * 100 - 50;
          
          heart.animate([
            { 
              transform: `translateY(0) translateX(0) rotate(${rotation}deg) scale(1)`,
              opacity: 1
            },
            { 
              transform: `translateY(100vh) translateX(${wobble}px) rotate(${rotation + 360}deg) scale(0.8)`,
              opacity: 0
            }
          ], {
            duration: fallDuration * 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
          });
          
          document.body.appendChild(heart);
          setTimeout(() => heart.remove(), fallDuration * 1000);
        }, i * 30);
      }
    }
  }, [showConfetti]);

  if (step === 'intro') {
    return (
      <div className="min-h-screen romantic-bg flex flex-col items-center justify-center text-center p-6 overflow-hidden relative">
        {/* Floating hearts background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl opacity-20"
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: -50
              }}
              animate={{
                y: window.innerHeight + 50,
                x: Math.random() * window.innerWidth
              }}
              transition={{
                duration: Math.random() * 10 + 15,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
            >
              💕
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-8xl mb-6"
          >
            💌
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-7xl font-bold bg-gradient-to-r from-pink-600 via-rose-500 to-red-500 bg-clip-text text-transparent mb-8"
          >
            Our Story
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-2xl text-pink-700 mb-12 max-w-md cursive-font"
          >
            A love letter written from my heart to yours
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setStep('letter')}
            className="bg-gradient-to-r from-pink-600 to-rose-600 text-white px-16 py-6 rounded-full text-2xl font-semibold shadow-2xl hover:shadow-pink-500/50 transition-all relative overflow-hidden group"
          >
            <span className="relative z-10">Open the Letter →</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-rose-600 to-pink-600"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.div>
      </div>
    );
  }

  if (step === 'letter') {
    const { from_name, to_name, date, content, colors } = letter;
    
    // Fallback for to_name if empty/undefined
    const displayName = to_name && to_name.trim() ? to_name.trim() : 'My Love';

    return (
      <div className="min-h-screen relative overflow-hidden" style={{ background: `radial-gradient(circle at center, ${colors.bg} 0%, #fff5f7 70%, ${colors.accent}30 100%)` }}>
        {/* Dynamic background particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 6 + 2 + 'px',
                height: Math.random() * 6 + 2 + 'px',
                backgroundColor: colors.accent,
                opacity: 0.3
              }}
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: 0
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: [0, 1, 0],
                opacity: [0, 0.6, 0]
              }}
              transition={{
                duration: Math.random() * 8 + 4,
                repeat: Infinity,
                delay: Math.random() * 3
              }}
            />
          ))}
        </div>

        {/* Floating decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl opacity-40"
              initial={{
                x: Math.random() * window.innerWidth,
                y: window.innerHeight + 50,
                rotate: 0
              }}
              animate={{
                y: -50,
                rotate: 360,
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: Math.random() * 15 + 10,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
            >
              {['✨', '💫', '🌟', '⭐'][i % 4]}
            </motion.div>
          ))}
        </div>

        <div className="flex items-center justify-center min-h-screen p-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotateX: -90 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="max-w-4xl w-full bg-gradient-to-br from-white/95 via-pink-50/95 to-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-16 border-2 handwritten-paper transform-gpu"
            style={{ borderColor: colors.accent, boxShadow: `0 25px 50px -12px rgba(0,0,0,0.25), 0 0 0 1px ${colors.accent}20` }}
          >
            <div className="text-center mb-12">
              <motion.p
                className="text-xl italic cursive-font opacity-80 mb-4"
                style={{ color: colors.accent }}
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                {date} - Eternal Love Letter
              </motion.p>

              <motion.div
                className="text-6xl mb-6 animate-bounce"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                💌💖
              </motion.div>

              <motion.h1
                className="text-5xl font-bold cursive-font mb-8"
                style={{
                  background: `linear-gradient(45deg, ${colors.accent}, #ff6b9d, ${colors.accent})`,
                  backgroundSize: '200% 200%',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text'
                }}
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                To My Beloved {displayName}
              </motion.h1>
            </div>

            <div className="flex justify-center items-center gap-6 mb-8">
              <motion.span
                className="text-3xl"
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🌹
              </motion.span>
              <motion.div
                className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent"
                animate={{ scaleX: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.span
                className="text-3xl"
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, -10, 10, 0]
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                🌹
              </motion.span>
            </div>

            <motion.div
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1.5 }}
            >
              <p className="text-xl leading-relaxed whitespace-pre-line mb-12 font-light cursive-font handwritten-text text-center max-w-3xl mx-auto"
                 style={{ color: colors.text }}>
                {content}
              </p>

              {/* Decorative quote marks */}
              <motion.div
                className="absolute -top-4 -left-4 text-6xl opacity-30 cursive-font"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                "
              </motion.div>
              <motion.div
                className="absolute -bottom-8 -right-4 text-6xl opacity-30 cursive-font"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              >
                "
              </motion.div>
            </motion.div>

            <div className="flex justify-center items-center gap-6 mb-8">
              <motion.span
                className="text-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 15, -15, 0]
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                💕
              </motion.span>
              <motion.div
                className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent"
                animate={{ scaleX: [0, 1, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              />
              <motion.span
                className="text-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, -15, 15, 0]
                }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.8 }}
              >
                💕
              </motion.span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 1 }}
              className="text-center"
            >
              <p className="text-2xl cursive-font mb-4" style={{ color: colors.accent }}>
                With Every Beat of My Heart,
              </p>
              <motion.p
                className="text-4xl font-bold cursive-font animate-float"
                style={{
                  color: colors.accent,
                  textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                }}
              >
                {from_name} 💖
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 3, duration: 0.8 }}
              className="text-center mt-12"
            >
              <motion.div
                className="text-6xl inline-block animate-pulse-heart"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ❤️✨💫❤️
              </motion.div>
            </motion.div>

            {/* Continue button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.5 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStep('surprise')}
              className="mt-12 mx-auto block bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 text-white px-12 py-4 rounded-full text-xl font-semibold shadow-xl hover:shadow-pink-500/50 transition-all relative overflow-hidden group"
            >
              <span className="relative z-10">Continue to Surprise →</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-500"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  if (step === 'surprise') {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950 text-white' : 'bg-gradient-to-br from-pink-50 via-rose-50 to-red-50'} flex flex-col items-center justify-center text-center p-6 transition-all duration-700 relative overflow-hidden ${screenShake ? 'animate-shake' : ''}`}>
        
        {/* Flash effect overlay */}
        <AnimatePresence>
          {flashEffect && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`fixed inset-0 z-50 pointer-events-none ${isDark ? 'bg-pink-500' : 'bg-white'}`}
            />
          )}
        </AnimatePresence>
        
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-2 h-2 rounded-full ${isDark ? 'bg-pink-400' : 'bg-pink-300'}`}
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: 0
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: [0, 1, 0],
                opacity: [0, 0.6, 0]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>

        {/* Dark mode toggle */}
        <motion.button 
          onClick={() => setIsDark(!isDark)} 
          className={`absolute top-8 right-8 text-5xl hover:scale-125 transition-transform ${isDark ? 'drop-shadow-[0_0_10px_rgba(255,182,193,0.5)]' : ''}`}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          {isDark ? '☀️' : '🌙'}
        </motion.button>

        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          {/* Animated heart above title */}
          <motion.div
            animate={pulseHeart ? {
              scale: [1, 1.5, 1],
              rotate: [0, 360]
            } : {
              scale: [1, 1.2, 1],
              rotate: [0, -10, 10, -10, 0]
            }}
            transition={pulseHeart ? {
              duration: 0.6
            } : {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-8xl mb-8"
          >
            💖
          </motion.div>

          <motion.h1
            className={`text-6xl md:text-7xl font-bold mb-16 ${isDark ? 'bg-gradient-to-r from-pink-400 via-rose-300 to-red-400' : 'bg-gradient-to-r from-pink-600 via-rose-500 to-red-600'} bg-clip-text text-transparent cursive-font`}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ backgroundSize: '200% 200%' }}
          >
            Happy Valentines!!
          </motion.h1>

          {/* YES button with enhanced effects */}
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.3
            }}
            whileHover={{
              scale: 1.15,
              boxShadow: isDark
                ? '0 0 50px rgba(236, 72, 153, 0.6)'
                : '0 20px 60px rgba(236, 72, 153, 0.4)'
            }}
            whileTap={{ scale: 0.9 }}
            onClick={handleButtonClick}
            className={`relative bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 text-white text-4xl md:text-5xl px-20 py-12 rounded-full font-bold shadow-2xl overflow-hidden group cursive-font ${
              clickCount >= 3 ? 'animate-bounce' : ''
            }`}
          >
            {/* Ripple effects */}
            {buttonRipples.map(ripple => (
              <motion.div
                key={ripple.id}
                className="absolute rounded-full border-4 border-white pointer-events-none"
                initial={{
                  width: 0,
                  height: 0,
                  left: ripple.x,
                  top: ripple.y,
                  opacity: 0.8
                }}
                animate={{
                  width: 400,
                  height: 400,
                  left: ripple.x - 200,
                  top: ripple.y - 200,
                  opacity: 0
                }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            ))}

            {/* Heart burst effect */}
            <AnimatePresence>
              {heartBurst && (
                <>
                  {[...Array(12)].map((_, i) => {
                    const angle = (Math.PI * 2 * i) / 12;
                    return (
                      <motion.div
                        key={i}
                        className="absolute text-3xl pointer-events-none"
                        initial={{
                          left: '50%',
                          top: '50%',
                          x: '-50%',
                          y: '-50%',
                          scale: 0,
                          opacity: 1
                        }}
                        animate={{
                          x: `calc(-50% + ${Math.cos(angle) * 150}px)`,
                          y: `calc(-50% + ${Math.sin(angle) * 150}px)`,
                          scale: [0, 1, 0],
                          opacity: [1, 1, 0],
                          rotate: 360
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      >
                        {['❤️', '💖', '💗'][i % 3]}
                      </motion.div>
                    );
                  })}
                </>
              )}
            </AnimatePresence>

            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
              animate={{
                x: ['-200%', '200%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            <span className="relative z-10 drop-shadow-lg">
             ❤️
            </span>

            {/* Pulse ring effect */}
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-white"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Rotating glow rings */}
            {clickCount > 0 && (
              <>
                <motion.div
                  className="absolute inset-0 rounded-full opacity-50"
                  style={{
                    background: `conic-gradient(from 0deg, transparent, ${isDark ? '#ec4899' : '#ff1744'}, transparent)`
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full opacity-50"
                  style={{
                    background: `conic-gradient(from 180deg, transparent, ${isDark ? '#f472b6' : '#ff4569'}, transparent)`
                  }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              </>
            )}
          </motion.button>

          {/* Click counter hint */}
          <AnimatePresence>
            {clickCount < 3 && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`mt-12 text-xl ${isDark ? 'text-pink-300' : 'text-pink-700'} opacity-70`}
              >
                {clickCount === 0 && "Click the button 3 times for a surprise... ✨"}
                {clickCount === 1 && "Keep going! Something magical is about to happen... 🌟"}
                {clickCount === 2 && "Hit me baby one more time! 💫"}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Celebration message after confetti */}
          <AnimatePresence>
            {clickCount >= 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="mt-12 space-y-6"
              >
                <motion.p
                  animate={{
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className={`text-3xl font-bold ${isDark ? 'text-pink-300' : 'text-pink-600'}`}
                >
                  You make my heart so full! 💕
                </motion.p>



                {/* Replay button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 5 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReplay}
                  className="mt-8 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-full text-xl font-semibold shadow-xl hover:shadow-purple-500/50 transition-all"
                >
                  Replay Our Story 🔄
                </motion.button>

                {/* Hidden Easter egg message for replays */}
                <AnimatePresence>
                  {hasReplayed && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-6 text-lg text-pink-600 font-bold cursive-font"
                    >
                      ✨ You've unlocked the secret: Our love story never ends! Eternal hearts forever 💕
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Floating hearts decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl"
              initial={{
                x: `${i * 12.5}%`,
                y: 100
              }}
              animate={{
                y: -100,
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
            >
              {['💕', '💖', '💗', '💓'][i % 4]}
            </motion.div>
          ))}
        </div>


      </div>
    );
  }
}