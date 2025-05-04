import './App.css'
import ChatHeader from './components/chat/ChatHeader'
import ChatMessage from './components/chat/ChatMessage'
import ChatInput from './components/chat/ChatInput'
import TypingIndicator from './components/chat/TypingIndicator'
import { useChat } from './hooks/useChat'
import { useAutoScroll } from './hooks/useAutoScroll'

function App() {
  const { messages, isLoading, isTyping, sendMessage, clearChat } = useChat()
  const scrollRef = useAutoScroll({ messages, isTyping })

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <ChatHeader title="IRUNLP Chat Interface">
        <button
          onClick={clearChat}
          className="text-sm px-3 py-1 text-gray-600 hover:text-gray-800 transition-colors"
        >
          Clear Chat
        </button>
      </ChatHeader>
      
      <main ref={scrollRef} className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage 
            key={message.id}
            text={message.text}
            isUser={message.isUser}
            error={message.error}
            timestamp={message.timestamp}
            retry={message.retry}
          />
        ))}
        {isTyping && <TypingIndicator />}
      </main>

      <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
    </div>
  )
}

export default App
