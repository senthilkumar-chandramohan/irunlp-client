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
    <div className="flex flex-col h-screen bg-white">
      <ChatHeader title="IRUNLP Chat">
        <button
          onClick={clearChat}
          className="text-sm px-3 py-1.5 text-gray-500 hover:text-gray-700 transition-colors rounded-md hover:bg-gray-100"
        >
          Clear Chat
        </button>
      </ChatHeader>
      
      <main ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
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
        </div>
      </main>

      <div className="border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
        </div>
      </div>
    </div>
  )
}

export default App
