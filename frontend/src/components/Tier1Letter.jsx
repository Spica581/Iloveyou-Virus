import { motion } from 'framer-motion';

export default function Tier1Letter({ letter }) {
  const { from_name, to_name, date, content, colors } = letter;

  return (
    <div className="min-h-screen romantic-bg flex items-center justify-center p-6" style={{ backgroundColor: colors.bg }}>
      <div
        className="max-w-2xl w-full bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-14 border border-pink-100 handwritten-paper"
        style={{ color: colors.text }}
      >
        <div className="text-center mb-12">
          <p className="text-xl italic cursive-font" style={{ color: colors.accent, textShadow: '1px 1px 2px rgba(0,0,0,0.1)' }}>{date}</p>
          <div className="text-6xl my-6 animate-float">💕</div>
          <div className="flex justify-center items-center gap-4 mb-4">
            <span className="text-2xl">✨</span>
            <hr className="flex-1 border-pink-200" />
            <span className="text-2xl">✨</span>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-center mb-10 cursive-font" style={{ color: colors.accent, textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
          Dear {to_name},
        </h1>

        <div className="flex justify-center items-center gap-4 mb-6">
          <span className="text-3xl">💖</span>
          <hr className="flex-1 border-pink-200" />
          <span className="text-3xl">💖</span>
        </div>

        <p className="text-[1.15rem] leading-relaxed whitespace-pre-line mb-12 font-light cursive-font handwritten-text">
          {content}
        </p>

        <div className="flex justify-center items-center gap-4 mb-6">
          <span className="text-3xl">💕</span>
          <hr className="flex-1 border-pink-200" />
          <span className="text-3xl">💕</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="text-right"
        >
          <p className="text-2xl cursive-font" style={{ color: colors.accent }}>With all my love,</p>
          <p className="text-3xl font-medium mt-2 cursive-font animate-float" style={{ color: colors.accent, textShadow: '1px 1px 2px rgba(0,0,0,0.1)' }}>{from_name}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="text-center mt-16 text-5xl animate-pulse-heart"
        >
          ❤️
        </motion.div>
      </div>
    </div>
  );
}
