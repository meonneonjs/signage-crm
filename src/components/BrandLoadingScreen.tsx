'use client';

import { motion } from 'framer-motion';

export function BrandLoadingScreen() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#fdfdfe] to-[#f8f9fb] flex flex-col items-center justify-center z-50">
      <div className="relative w-32 h-32 md:w-40 md:h-40">
        {/* Background glow effect */}
        <motion.div
          className="absolute inset-0 bg-[#1eb5b6]/10 rounded-full blur-xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 1 }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />

        {/* Logo */}
        <motion.svg
          viewBox="0 0 486.06 95.87"
          className="w-full h-full relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Brand Icon Animation Group */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {/* Triangle shapes with stroke animation */}
            <motion.path
              className="fill-[#1f2f5c]"
              d="M36.38,0c12.45,7.31,24.6,15.26,36.38,23.63v22.91l-36.38-23.27V0Z"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ 
                duration: 1.5,
                delay: 0.5,
                ease: "easeInOut"
              }}
            />
            <motion.polygon
              className="fill-[#1eb5b6]"
              points="36.38 23.27 0 45.81 0 23.63 36.38 0 36.38 23.27"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ 
                duration: 1.5,
                delay: 0.7,
                ease: "easeInOut"
              }}
            />
            <motion.path
              className="fill-[#1eb5b6]"
              d="M53.84,47.28c.35.42.1,1.01-.45,1.5-.98.88-13.96,9.41-14.86,9.74-5.24,1.92-14.1-8.74-19.61-9.81l.45-1.49,16.78-10.75,17.69,10.81Z"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                duration: 0.8,
                delay: 1,
                ease: "easeOut"
              }}
            />
          </motion.g>
        </motion.svg>
      </div>

      {/* Loading text and progress bar */}
      <div className="mt-8 flex flex-col items-center">
        <motion.div
          className="text-[#1f2f5c] text-lg font-medium mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          Loading your workspace
        </motion.div>

        {/* Progress bar */}
        <div className="w-48 h-1 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#1eb5b6] to-[#1f2f5c]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>
    </div>
  );
} 