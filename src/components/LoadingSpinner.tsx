import React from 'react';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
  type?: 'spinner' | 'skeleton';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  message = 'Loading...',
  type = 'spinner'
}) => {
  const sizeClasses = {
    small: 'w-6 h-6 border-2',
    medium: 'w-12 h-12 border-3',
    large: 'w-16 h-16 border-4'
  };

  if (type === 'skeleton') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm"
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
          >
            <div className="flex gap-4 items-start">
              <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
              <div className="flex-1 space-y-3">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-5/6"></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <motion.div 
      className="flex flex-col items-center justify-center py-16 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className={`border-gray-200 dark:border-gray-700 border-t-blue-600 dark:border-t-blue-400 rounded-full ${sizeClasses[size]}`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      {message && (
        <motion.p 
          className="mt-4 text-gray-600 dark:text-gray-400 text-sm font-medium"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {message}
        </motion.p>
      )}
    </motion.div>
  );
};

export default LoadingSpinner;