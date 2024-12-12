import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-2 sm:top-4 right-2 sm:right-4 p-2 rounded-full bg-blue-100 dark:bg-gray-700 
                text-blue-600 dark:text-yellow-400 hover:bg-blue-200 dark:hover:bg-gray-600 
                transition-colors z-50"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <Moon size={18} className="sm:w-5 sm:h-5" /> : <Sun size={18} className="sm:w-5 sm:h-5" />}
    </button>
  );
};