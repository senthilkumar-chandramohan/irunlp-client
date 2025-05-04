import { useEffect, useRef } from 'react';
import { Message } from './useChat';

interface ScrollState {
  messages: Message[];
  isTyping: boolean;
}

export function useAutoScroll({ messages, isTyping }: ScrollState) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const shouldAutoScroll =
      scrollElement.scrollHeight - scrollElement.scrollTop <=
      scrollElement.clientHeight + 100;

    if (shouldAutoScroll) {
      scrollElement.scrollTo({
        top: scrollElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isTyping]);

  return scrollRef;
}