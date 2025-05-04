import React, { ReactNode } from 'react';

interface ChatHeaderProps {
  title: string;
  children?: ReactNode;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ title, children }) => {
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-lg font-medium text-gray-800">{title}</h1>
        <div className="flex items-center gap-2">
          {children}
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;