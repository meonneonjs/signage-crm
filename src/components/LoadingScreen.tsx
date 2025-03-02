'use client';

import { motion } from 'framer-motion';

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-40">
      <div className="bg-white rounded-lg shadow-xl p-8">
        <div className="flex flex-col items-center">
          <motion.div
            className="w-16 h-16 relative"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute inset-0 border-t-4 border-indigo-500 rounded-full" />
            <div className="absolute inset-2 border-t-4 border-blue-500 rounded-full" />
            <motion.div 
              className="absolute inset-[35%] bg-indigo-600 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.div>
          
          <motion.p 
            className="mt-4 text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Loading...
          </motion.p>
        </div>
      </div>
    </div>
  );
} 