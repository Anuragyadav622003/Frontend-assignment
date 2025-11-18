import React from 'react';
import { Heart, Code, Coffee } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              <span>Built with React & TypeScript</span>
            </div>
            <div className="flex items-center gap-2">
              <Coffee className="w-4 h-4" />
              <span>Powered by Tailwind CSS</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>for modern web development</span>
          </div>
        </div>
        
        <div className="text-center mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            &copy; 2024 UserHub Pro. Demonstrating production-ready React development skills.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;