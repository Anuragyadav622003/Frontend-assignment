import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Users } from 'lucide-react';
import Button from './ui/Button';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg group-hover:scale-105 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                UserHub Pro
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                User Management System
              </p>
            </div>
          </Link>
          
          <div className="flex items-center gap-4">
            <nav className="flex items-center gap-2">
              <Link to="/">
                <Button
                  variant={isActive('/') ? 'primary' : 'ghost'}
                  size="sm"
                >
                  Users
                </Button>
              </Link>
              <Link to="/users/create">
                <Button
                  variant={isActive('/users/create') ? 'primary' : 'ghost'}
                  size="sm"
                >
                  Add User
                </Button>
              </Link>
            </nav>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              icon={theme === 'light' ? Moon : Sun}
              className="w-12 h-12 !p-0"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {/* Empty children to satisfy TypeScript */}
              <span className="sr-only">
                {theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;