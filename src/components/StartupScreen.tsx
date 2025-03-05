'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export function StartupScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-gradient-to-b from-white to-gray-50 flex flex-col items-center justify-center"
        >
          <div className="text-center">
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {/* Brand Logo */}
              <div className="flex flex-col items-center gap-6">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="w-20 h-20"
                >
                  <Image
                    src="/brand/atellierCRM icon only.svg"
                    alt="AtellierCRM"
                    width={80}
                    height={80}
                    className="w-full h-full"
                  />
                </motion.div>
                
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="h-8"
                >
                  <Image
                    src="/brand/AtellierCRM logo without icon.svg"
                    alt="AtellierCRM"
                    width={200}
                    height={32}
                    className="h-full w-auto"
                  />
                </motion.div>
              </div>
            </motion.div>
            
            {/* Loading Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="mt-12"
            >
              <div className="flex justify-center gap-2">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 1, 0.3]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: 0
                  }}
                  className="w-2 h-2 bg-primary-600 rounded-full"
                />
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 1, 0.3]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: 0.2
                  }}
                  className="w-2 h-2 bg-primary-600 rounded-full"
                />
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 1, 0.3]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: 0.4
                  }}
                  className="w-2 h-2 bg-primary-600 rounded-full"
                />
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="mt-8 text-gray-600 text-lg font-medium tracking-wide"
            >
              Business Management for Creative Professionals
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 