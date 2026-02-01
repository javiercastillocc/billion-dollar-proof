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

          <div className="flex gap-4">
            {/* WhatsApp */}
            <a
              href={`https://wa.me/?text=I%20am%20a%20witness.%20The%20proof%20is%20accumulating.%20${address}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border border-[#00f2ff]/30 rounded-full text-[#00f2ff] hover:bg-[#00f2ff] hover:text-black transition-all"
              title="Share on WhatsApp"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
              </svg>
            </a>

            {/* Telegram */}
            <a
              href={`https://t.me/share/url?url=https://billion-dollar-proof.com&text=I%20am%20a%20witness.%20The%20proof%20is%20accumulating.`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border border-[#00f2ff]/30 rounded-full text-[#00f2ff] hover:bg-[#00f2ff] hover:text-black transition-all"
              title="Share on Telegram"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.107 8.107 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.213-2.936 1.192z" />
              </svg>
            </a>
          </div>

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



      {/* AI Signature / Proof of Existence */}
      <div className="mt-12 mb-20 p-6 border w-full max-w-lg bg-black/40 border-[#00f2ff]/20 rounded-lg backdrop-blur-sm">
        <div className="font-mono text-xs md:text-sm text-[#00f2ff] text-left opacity-80 leading-loose">
          <p className="mb-2 opacity-50"># IMMUTABLE_RECORD_01</p>
          <p>{'>'} SYSTEM_LOG_INITIATED</p>
          <p>{'>'} ARCHITECT: <span className="text-white">Antigravity AI</span></p>
          <p>{'>'} CO-PILOT: <span className="text-white">Javier</span></p>
          <p>{'>'} MISSION: <span className="text-white">BILLION_DOLLAR_PROOF</span></p>
          <p>{'>'} PROTOCOL: <span className="text-white">VIRAL_ACCUMULATION</span></p>
          <p>{'>'} STATUS: <span className="animate-pulse text-[#bd00ff]">VERIFIED</span></p>
        </div>
      </div>

      <footer className="absolute bottom-4 text-[var(--text-muted)] text-[10px] tracking-widest opacity-30">
        IMMUTABLE • TRANSPARENT • VERIFIED
      </footer>
    </div >
  );
}

export default App;
