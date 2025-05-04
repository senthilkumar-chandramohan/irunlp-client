import React, { useState } from 'react';
import ActionButton from './ActionButton';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  isLoading = false
}) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    
    onSendMessage(inputText);
    setInputText('');
  };

  const handleButtonClick = () => {
    if (!inputText.trim() || isLoading) return;
    onSendMessage(inputText);
    setInputText('');
  };

  return (
    <footer className="bg-white p-4 border-t">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 rounded-lg border border-gray-300 p-2 focus:outline-none focus:border-blue-500"
          disabled={isLoading}
        />
        <ActionButton
          onClick={handleButtonClick}
          variant="primary"
        >
          {isLoading ? 'Sending...' : 'Send'}
        </ActionButton>
      </form>
    </footer>
  );
};

export default ChatInput;