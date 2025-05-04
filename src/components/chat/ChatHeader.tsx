import React, { ReactNode } from 'react';

interface ChatHeaderProps {
  title: string;
  children?: ReactNode;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ title, children }) => {
  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
      {children}
    </header>
  );
};

export default ChatHeader;