import React from 'react';
import { Code } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-6 mt-12 bg-white dark:bg-gray-800 bg-opacity-50 dark:bg-opacity-50 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-300">
          <Code size={16} className="text-blue-500 dark:text-blue-400" />
          <p>
            Crafted with ❤️ by{' '}
            <a
              href="https://github.com/joeggggg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 font-medium"
            >
              joeggggg
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};