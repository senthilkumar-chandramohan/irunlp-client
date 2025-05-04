import React from 'react';

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
  const formattedTime = new Intl.DateTimeFormat('en', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(timestamp);

  return (
    <div className={`py-6 ${isUser ? 'bg-white' : 'bg-gray-50'}`}>
      <div className="max-w-3xl mx-auto px-4">
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
          <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
              isUser ? 'bg-blue-600' : 'bg-emerald-600'
            }`}>
              {isUser ? 'U' : 'A'}
            </div>
            <div className="max-w-[85%] space-y-2">
              {error ? (
                <div className="text-red-600 bg-red-50 rounded-lg p-3 text-sm">
                  <p className="mb-2">{text}</p>
                  <p className="text-red-500">{error}</p>
                  {retry && (
                    <button 
                      onClick={retry}
                      className="mt-2 text-xs px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                    >
                      Retry
                    </button>
                  )}
                </div>
              ) : (
                <div className="text-gray-800 text-sm leading-relaxed">
                  {text}
                </div>
              )}
              <div className="text-xs text-gray-400">
                {formattedTime}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;