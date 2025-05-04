import { useState, useEffect, useCallback } from 'react';
import { sendMessage, ChatResponse } from '../utils/api';

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  error?: string;
  timestamp: Date;
  retry?: () => void;
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('chat-messages');
    return saved ? JSON.parse(saved, (key, value) => 
      key === 'timestamp' ? new Date(value) : value
    ) : [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Persist messages to localStorage
  useEffect(() => {
    localStorage.setItem('chat-messages', JSON.stringify(messages));
  }, [messages]);

  const handleMessage = useCallback(async (text: string, retryMessageId?: string) => {
    const messageId = Date.now().toString();
    
    try {
      setIsLoading(true);
      
      if (retryMessageId) {
        const userMessageIndex = messages.findIndex(m => m.id === retryMessageId);
        if (userMessageIndex !== -1) {
          setMessages(messages.slice(0, userMessageIndex + 1));
        }
      } else {
        // Add user message immediately
        setMessages(prev => [...prev, {
          id: messageId,
          text,
          isUser: true,
          timestamp: new Date()
        }]);
      }

      // Show typing indicator
      setIsTyping(true);
      
      // Simulate network delay for typing indicator
      await new Promise(resolve => setTimeout(resolve, 500));

      // Send to API and get response
      const response: ChatResponse = await sendMessage(text);

      // Remove typing indicator and add response
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: response.text,
        isUser: false,
        error: response.error,
        timestamp: new Date()
      }]);
    } catch (error) {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: 'Sorry, there was an error processing your request.',
        isUser: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date(),
        retry: () => handleMessage(text, messageId)
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  const clearChat = useCallback(() => {
    setMessages([]);
    localStorage.removeItem('chat-messages');
  }, []);

  return {
    messages,
    isLoading,
    isTyping,
    sendMessage: (text: string) => handleMessage(text),
    clearChat
  };
}