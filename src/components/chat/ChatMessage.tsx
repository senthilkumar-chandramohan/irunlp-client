import React from 'react';
import ActionButton from './ActionButton';

interface ChatMessageProps {
  text: string;
  isUser: boolean;
  error?: string;
  timestamp: Date;
  retry?: () => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  text,
  isUser,
  error,
  timestamp,
  retry
}) => {
  const messageClasses = error
    ? 'bg-red-100 text-red-800'
    : isUser
    ? 'bg-blue-500 text-white'
    : 'bg-white text-gray-800';

  const formattedTime = new Intl.DateTimeFormat('en', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(timestamp);

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className="max-w-[80%]">
        <div className={`rounded-lg p-3 ${messageClasses}`}>
          {text}
          {error && (
            <div className="mt-2 space-y-2">
              <div className="text-sm text-red-600">{error}</div>
              {retry && (
                <ActionButton onClick={retry} variant="danger">
                  Retry
                </ActionButton>
              )}
            </div>
          )}
        </div>
        <div className="text-xs text-gray-500 mt-1 px-1">
          {formattedTime}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;