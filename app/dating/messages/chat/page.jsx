"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ArrowLeft,
  Send,
  Phone,
  Video,
  MoreHorizontal,
  Plus,
  Check,
  CheckCheck,
  Shield,
  Smile,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"

// Mock data - replace with API calls
const mockMessages = [
  {
    id: 1,
    text: "Hey! Thanks for the match 😊",
    timestamp: "2024-01-15T14:30:00Z",
    sender: "them",
    status: "read",
  },
  {
    id: 2,
    text: "Hi Emma! Great to match with you too. I love your photos from that hiking trip!",
    timestamp: "2024-01-15T14:35:00Z",
    sender: "me",
    status: "read",
  },
  {
    id: 3,
    text: "Thank you! That was such an amazing day. Do you hike often?",
    timestamp: "2024-01-15T14:40:00Z",
    sender: "them",
    status: "read",
  },
  {
    id: 4,
    text: "I try to get out on the trails at least once a week. There are some beautiful spots around here. Would you like to explore one together sometime?",
    timestamp: "2024-01-15T14:45:00Z",
    sender: "me",
    status: "delivered",
  },
]

const mockMatch = {
  id: 1,
  user: {
    id: 1,
    name: "Emma",
    age: 26,
    location: "2 miles away",
    images: [
      {
        url: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=600&fit=crop&crop=face",
        title: "Weekend Adventures",
      },
    ],
    verified: true,
    online: true,
    lastSeen: "Active now",
  },
}

// Chat Header Component
const ChatHeader = ({ match, onBack, onCall, onVideoCall, onMoreOptions }) => {
  return (
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm"
    >
      <div className="flex items-center justify-between p-4 sm:p-6">
        <div className="flex items-center space-x-4 flex-1">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </motion.button>
          
          <div className="flex items-center space-x-3 flex-1">
            <div className="relative">
              <Avatar className="w-12 h-12 ring-2 ring-white shadow-sm">
                <AvatarImage src={match.user.images[0].url} alt={match.user.name} />
                <AvatarFallback className="bg-gradient-to-br from-slate-100 to-slate-200 text-slate-700 font-semibold">
                  {match.user.name[0]}
                </AvatarFallback>
              </Avatar>
              {match.user.online && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-full h-full bg-green-400 rounded-full"
                  />
                </motion.div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <h2 className="font-bold text-gray-900 truncate text-lg">{match.user.name}</h2>
                {match.user.verified && (
                  <Shield className="w-4 h-4 text-blue-500 flex-shrink-0" />
                )}
              </div>
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <div className={cn(
                  "w-2 h-2 rounded-full transition-colors duration-300",
                  match.user.online ? "bg-green-500" : "bg-gray-400"
                )} />
                <span className="font-medium">
                  {match.user.online ? "Active now" : match.user.lastSeen}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {[
            { icon: Phone, label: "Call", onClick: onCall },
            { icon: Video, label: "Video call", onClick: onVideoCall },
            { icon: MoreHorizontal, label: "More options", onClick: onMoreOptions }
          ].map(({ icon: Icon, label, onClick }) => (
            <motion.button
              key={label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClick}
              className="p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200 group"
              aria-label={label}
            >
              <Icon className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// Message Component
const Message = ({ message }) => {
  const messageVariants = {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      }
    },
    exit: { opacity: 0, y: -20, scale: 0.95 }
  }

  return (
    <motion.div
      variants={messageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      layout
      className={cn("flex", message.sender === "me" ? "justify-end" : "justify-start")}
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={cn(
          "max-w-[80%] sm:max-w-[75%] p-3 sm:p-4 rounded-3xl shadow-sm relative",
          "transition-all duration-300",
          message.sender === "me"
            ? "bg-gradient-to-br from-slate-700 to-slate-900 text-white rounded-br-lg ml-auto"
            : "bg-white text-gray-900 rounded-bl-lg border border-gray-100 shadow-md hover:shadow-lg",
        )}
      >
        <p className="text-sm sm:text-base font-medium leading-relaxed break-words">
          {message.text}
        </p>
        <div className="flex items-center justify-end space-x-2 mt-2">
          <span className="text-xs opacity-70 font-medium">
            {new Date(message.timestamp).toLocaleTimeString([], { 
              hour: "2-digit", 
              minute: "2-digit" 
            })}
          </span>
          {message.sender === "me" && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-xs opacity-70"
            >
              {message.status === "sending" && (
                <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
              )}
              {message.status === "sent" && <Check className="w-3 h-3" />}
              {message.status === "delivered" && <CheckCheck className="w-3 h-3" />}
              {message.status === "read" && <CheckCheck className="w-3 h-3 text-blue-400" />}
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

// Typing Indicator Component
const TypingIndicator = ({ isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="flex justify-start"
        >
          <div className="bg-white p-4 rounded-3xl rounded-bl-lg shadow-lg border border-gray-100">
            <div className="flex space-x-1.5">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-gray-400 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Message Input Component
const MessageInput = ({ value, onChange, onSend, isSending, onAttachment, onEmoji }) => {
  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="bg-white/95 backdrop-blur-xl border-t border-gray-200/50 p-4 sm:p-6 shadow-lg"
    >
      <div className="flex items-end space-x-3 sm:space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onAttachment}
          className="p-2.5 sm:p-3 hover:bg-gray-100/80 rounded-xl transition-all duration-200 active:scale-95 hover:scale-105 mb-1"
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
        </Button>
        
        <div className="flex-1 relative">
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Type a message..."
            className={cn(
              "pr-12 sm:pr-14 rounded-2xl border-gray-200 bg-gray-50 focus:bg-white",
              "transition-all duration-300 font-medium py-3 sm:py-3.5 text-sm sm:text-base",
              "focus:ring-2 focus:ring-slate-200 focus:border-slate-300",
              "placeholder:text-gray-400"
            )}
            onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && onSend()}
            disabled={isSending}
          />
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={onSend}
              size="sm"
              className={cn(
                "absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 rounded-xl",
                "w-8 h-8 sm:w-10 sm:h-10 p-0 transition-all duration-200",
                "bg-gradient-to-br from-slate-700 to-slate-900",
                "hover:from-slate-800 hover:to-slate-950",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                value.trim() ? "scale-100" : "scale-90 opacity-70"
              )}
              disabled={!value.trim() || isSending}
            >
              <Send className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          </motion.div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={onEmoji}
          className="p-2.5 sm:p-3 hover:bg-gray-100/80 rounded-xl transition-all duration-200 active:scale-95 hover:scale-105 mb-1"
        >
          <Smile className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
        </Button>
      </div>
    </motion.div>
  )
}

// Main Chat Component with centralized state management
const ChatPageContent = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const matchId = searchParams.get("matchId")
  
  // === STATE MANAGEMENT ===
  const [match, setMatch] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // === REFS ===
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // === SCROLL TO BOTTOM ===
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // === DATA FETCHING ===
  useEffect(() => {
    const fetchChatData = async () => {
      if (!matchId) {
        router.push("/dating/messages")
        return
      }

      try {
        setIsLoading(true)
        // TODO: Replace with actual API calls
        console.log('API: Fetch match data for:', matchId)
        console.log('API: Fetch messages for match:', matchId)
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        setMatch(mockMatch)
        setMessages(mockMessages)
      } catch (err) {
        console.error('Failed to fetch chat data:', err)
        setError('Failed to load chat. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchChatData()
  }, [matchId, router])

  // === MESSAGE HANDLERS ===
  const handleSendMessage = async () => {
    if (!newMessage.trim() || isSending) return

    setIsSending(true)
    const messageText = newMessage
    setNewMessage("")

    const message = {
      id: Date.now(),
      text: messageText,
      timestamp: new Date().toISOString(),
      sender: "me",
      status: "sending",
    }

    setMessages(prev => [...prev, message])

    try {
      // TODO: Replace with actual API call
      console.log('API: Send message:', {
        matchId,
        text: messageText,
        timestamp: message.timestamp
      })

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300))

      setMessages(prev => 
        prev.map(msg => 
          msg.id === message.id ? { ...msg, status: "sent" } : msg
        )
      )

      // Simulate typing indicator and response
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        const response = {
          id: Date.now() + 1,
          text: "That sounds great! I'd love to do that 😊",
          timestamp: new Date().toISOString(),
          sender: "them",
          status: "read",
        }
        setMessages(prev => [...prev, response])
      }, 1500 + Math.random() * 1000)

    } catch (err) {
      console.error('Failed to send message:', err)
      setMessages(prev => 
        prev.map(msg => 
          msg.id === message.id ? { ...msg, status: "failed" } : msg
        )
      )
    } finally {
      setIsSending(false)
    }
  }

  // === ACTION HANDLERS ===
  const handleBack = () => {
    router.push("/dating/messages")
  }

  const handleCall = () => {
    // TODO: Implement voice call functionality
    console.log('API: Initiate voice call with:', match?.user.id)
  }

  const handleVideoCall = () => {
    // TODO: Implement video call functionality
    console.log('API: Initiate video call with:', match?.user.id)
  }

  const handleMoreOptions = () => {
    // TODO: Show more options menu
    console.log('Show more options for:', match?.user.id)
  }

  const handleAttachment = () => {
    // TODO: Handle file attachment
    console.log('Open attachment picker')
  }

  const handleEmoji = () => {
    // TODO: Handle emoji picker
    console.log('Open emoji picker')
  }

  // === LOADING STATE ===
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-700 mx-auto"></div>
          <p className="text-gray-600">Loading chat...</p>
        </div>
      </div>
    )
  }

  // === ERROR STATE ===
  if (error || !match) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <span className="text-red-500 text-2xl">!</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900">Chat Not Found</h2>
          <p className="text-gray-600">{error || "This chat doesn't exist or you don't have access to it."}</p>
          <Button onClick={handleBack} className="bg-slate-700 hover:bg-slate-800">
            Back to Messages
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 to-gray-100/50">
      <ChatHeader 
        match={match}
        onBack={handleBack}
        onCall={handleCall}
        onVideoCall={handleVideoCall}
        onMoreOptions={handleMoreOptions}
      />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        <AnimatePresence mode="popLayout">
          {messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
        </AnimatePresence>

        <TypingIndicator isVisible={isTyping} />
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <MessageInput
        value={newMessage}
        onChange={setNewMessage}
        onSend={handleSendMessage}
        isSending={isSending}
        onAttachment={handleAttachment}
        onEmoji={handleEmoji}
      />
    </div>
  )
}

// Loading component for Suspense fallback
const ChatPageLoading = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-700 mx-auto"></div>
        <p className="text-gray-600">Loading chat...</p>
      </div>
    </div>
  )
}

export default function ChatPage() {
  return (
    <Suspense fallback={<ChatPageLoading />}>
      <ChatPageContent />
    </Suspense>
  )
}
