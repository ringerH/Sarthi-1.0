import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 py-6 mt-12">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} IIITG Hub — Made with{' '}
          <span className="text-pink-500">❤</span> by Students
        </p>
        
      </div>
    </footer>
  );
}
