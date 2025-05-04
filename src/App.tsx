import './App.css'
import ChatHeader from './components/chat/ChatHeader'
import ChatMessage from './components/chat/ChatMessage'
import ChatInput from './components/chat/ChatInput'
import TypingIndicator from './components/chat/TypingIndicator'
import Modal from './components/chat/Modal'
import { useChat } from './hooks/useChat'
import { useAutoScroll } from './hooks/useAutoScroll'
import { useState } from 'react'

function App() {
  const { messages, isLoading, isTyping, sendMessage, clearChat } = useChat()
  const scrollRef = useAutoScroll({ messages, isTyping })
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="flex flex-col h-screen bg-white">
      <ChatHeader title="IRUNLP Chat">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-sm px-3 py-1.5 text-blue-600 hover:text-blue-800 transition-colors"
          >
            See Database
          </button>
          <button
            onClick={clearChat}
            className="text-sm px-3 py-1.5 text-gray-500 hover:text-gray-700 transition-colors rounded-md hover:bg-gray-100"
          >
            Clear Chat
          </button>
        </div>
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <img 
          src="/images/db.png" 
          alt="Database Schema"
          className="max-h-[90vh] w-auto object-contain"
        />
      </Modal>
    </div>
  )
}

export default App
