import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Tier2Letter({ letter }) {
  const { from_name, to_name, date, content, colors } = letter;
  const [showHidden, setShowHidden] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [showSurprise, setShowSurprise] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Floating hearts on scroll
  useEffect(() => {
    const handleScroll = () => {
      setHearts(prev => [...prev.slice(-6), { id: Date.now(), left: Math.random() * 90 + 5 }]);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${colors.bg} 0%, #ffe6f0 50%, ${colors.accent}20 100%)` }}>
      {/* Animated background with floating hearts */}
      {hearts.map(h => (
        <motion.div
          key={h.id}
          initial={{ y: '100vh', opacity: 0 }}
          animate={{ y: '-20vh', opacity: 0 }}
          transition={{ duration: 6 }}
          className="absolute text-4xl pointer-events-none"
          style={{ left: `${h.left}%`, color: colors.accent }}
        >
          ❤️
        </motion.div>
      ))}

      {/* Additional floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl opacity-30"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0
            }}
            animate={{
              y: [0, -20, 0],
              scale: [0, 1, 0],
              rotate: [0, 360]
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          >
            {['💖', '💗', '💓', '💕'][i % 4]}
          </motion.div>
        ))}
      </div>

      <div className="flex items-center justify-center min-h-screen p-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          onHoverStart={() => setShowSurprise(true)}
          onHoverEnd={() => setShowSurprise(false)}
          className="max-w-3xl w-full bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-12 border-4 border-pink-200 handwritten-paper transform-gpu"
          style={{ borderColor: colors.accent }}
        >
          <div className="text-center mb-8">
            <motion.p
              className="text-lg italic cursive-font opacity-75"
              style={{ color: colors.accent }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {date} - A Special Moment
            </motion.p>
            <motion.div
              className="text-5xl my-4 animate-bounce"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              💌✨
            </motion.div>
            <motion.h1
              className="text-3xl font-bold cursive-font mb-6"
              style={{ color: colors.accent }}
              animate={{ textShadow: ['0px 0px 0px', '0px 0px 10px rgba(255,0,150,0.5)', '0px 0px 0px'] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              My Dearest {to_name}
            </motion.h1>
          </div>

          <div className="flex justify-center items-center gap-4 mb-6">
            <motion.span
              className="text-2xl animate-pulse"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              🌹
            </motion.span>
            <hr className="flex-1 border-pink-300" />
            <motion.span
              className="text-2xl animate-pulse"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
            >
              🌹
            </motion.span>
          </div>

          <motion.p
            className="text-lg leading-relaxed whitespace-pre-line mb-8 font-light cursive-font handwritten-text"
            style={{ color: colors.text }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            {isTyping ? typedText : content}
          </motion.p>

          <div className="flex justify-center items-center gap-4 mb-6">
            <motion.span
              className="text-2xl animate-pulse"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
            >
              💕
            </motion.span>
            <hr className="flex-1 border-pink-300" />
            <motion.span
              className="text-2xl animate-pulse"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 1.5 }}
            >
              💕
            </motion.span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="text-right"
          >
            <p className="text-xl cursive-font" style={{ color: colors.accent }}>
              Forever Yours,
            </p>
            <motion.p
              className="text-2xl font-medium mt-2 cursive-font animate-float"
              style={{ color: colors.accent }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {from_name} 💖
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="text-center mt-12 text-4xl animate-pulse-heart"
          >
            ❤️✨❤️
          </motion.div>

          {/* Surprise line on hover */}
          {showSurprise && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-8 flex items-center justify-center pointer-events-none"
            >
              <motion.p
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-xl cursive-font text-pink-600 bg-white/90 px-6 py-3 rounded-full shadow-lg"
              >
                💕 You make my heart skip a beat! 💕
              </motion.p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Clickable Heart for Hidden Message */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50">
        <motion.div
          whileHover={{ scale: 1.4, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowHidden(!showHidden)}
          className="text-7xl cursor-pointer animate-glow-pulse"
          style={{ color: colors.accent }}
        >
          ❤️
        </motion.div>
        {showHidden && letter.hidden_message && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 bg-white/90 backdrop-blur px-8 py-4 rounded-2xl shadow text-center max-w-xs cursive-font"
            style={{ color: colors.accent }}
          >
            {letter.hidden_message}
          </motion.p>
        )}
      </div>

      {/* Music Toggle */}
      {letter.music_url && (
        <div className="fixed bottom-8 right-8">
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const audio = document.getElementById('love-music');
              isPlaying ? audio.pause() : audio.play();
              setIsPlaying(!isPlaying);
            }}
            className="bg-white/90 backdrop-blur px-6 py-3 rounded-full shadow-lg flex items-center gap-3 cursive-font"
          >
            {isPlaying ? '⏸️' : '🎵'} {isPlaying ? 'Pause Music' : 'Play Our Song'}
          </motion.button>
          <audio id="love-music" src={`http://localhost:8000${letter.music_url}`} loop />
        </div>
      )}
    </div>
  );
}
