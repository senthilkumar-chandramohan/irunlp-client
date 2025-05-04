import React from 'react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="py-6 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex justify-start">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white">
              A
            </div>
            <div className="flex items-center space-x-2 bg-white px-4 py-3 rounded-lg shadow-sm">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;