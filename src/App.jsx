import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QRCode from 'react-qr-code';
import './App.css'; // Ensure we don't break if this exists, though we rely mostly on index.css

function App() {
  const [copied, setCopied] = useState(false);
  const [count, setCount] = useState(1);

  const address = "TMEykAzpSaCbiaJWbQ3NLp5MRZC8pAvTVF";

  useEffect(() => {
    // Fake "viral" counter effect
    const interval = setInterval(() => {
      setCount(prev => prev + Math.floor(Math.random() * 5));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 relative overflow-hidden">

      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-[-1]">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#bd00ff] rounded-full filter blur-[120px] opacity-20"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#00f2ff] rounded-full filter blur-[120px] opacity-20"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10 max-w-3xl"
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-[#00f2ff] tracking-[0.2em] text-sm uppercase font-bold mb-4 block"
        >
          The Experiment
        </motion.span>

        <h1 className="text-6xl md:text-8xl font-bold mb-6 text-white leading-tight">
          Billion Dollar <br />
          <span className="gradient-text">Proof</span>
        </h1>

        <p className="text-xl text-[var(--text-muted)] mb-12 max-w-xl mx-auto leading-relaxed">
          One wallet. One goal. A transparent demonstration of collective potential accumulating in real-time.
        </p>

        {/* Address Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="glass-card mb-12 relative group cursor-pointer"
          onClick={handleCopy}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#00f2ff] to-[#bd00ff] opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-[24px]" />

          <p className="text-sm text-[var(--text-muted)] mb-2 uppercase tracking-widest text-left">Wallet Address</p>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <code className="text-lg md:text-2xl font-mono text-white break-all text-left">
              {address}
            </code>
            <div className="flex items-center gap-2">
              <AnimatePresence mode='wait'>
                {copied ? (
                  <motion.span
                    key="copied"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-[#00f2ff] font-bold text-sm"
                  >
                    COPIED
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[var(--text-muted)] text-sm group-hover:text-white transition-colors"
                  >
                    TAP TO COPY
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Viral / Sharing Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col items-center gap-8 mb-16"
        >
          {/* Social Share Button */}
          <a
            href={`https://twitter.com/intent/tweet?text=I%20am%20a%20witness.%20The%20proof%20is%20accumulating.%20%23BillionDollarProof%0A%0A${address}`}
            target="_blank"
            rel="noopener noreferrer"
            className="neon-button group"
          >
            <span>Spread the Proof</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
            </svg>
          </a>

          {/* QR Code */}
          <div className="p-4 bg-white rounded-xl shadow-[0_0_40px_rgba(0,242,255,0.2)]">
            <QRCode value={address} size={128} level="H" />
          </div>
          <p className="text-[var(--text-muted)] text-xs uppercase tracking-widest">Scan to contribute</p>
        </motion.div>

        {/* Stats / CTA */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="text-center">
            <h3 className="text-4xl font-bold text-white mb-1">
              <span className="text-[#bd00ff]">$</span>0
            </h3>
            <p className="text-sm text-[var(--text-muted)] uppercase tracking-wider">Current Value</p>
          </div>

          <div className="w-px h-12 bg-white/10 hidden md:block"></div>

          <div className="text-center">
            <h3 className="text-4xl font-bold text-white mb-1">{count}</h3>
            <p className="text-sm text-[var(--text-muted)] uppercase tracking-wider">Witnesses</p>
          </div>
        </div>

      </motion.div>

      <footer className="absolute bottom-8 text-[var(--text-muted)] text-xs tracking-widest opacity-50">
        IMMUTABLE • TRANSPARENT • VERIFIED
      </footer>
    </div>
  );
}

export default App;
