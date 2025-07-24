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
  Bell,
  Settings,
  Sparkles,
  Shield,
  MapPin,
  MessageCircle,
  Image as ImageIcon,
  Smile,
  Search,
  Filter,
  Heart,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { useRouter, useSearchParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { useDatingLayout } from "../layout"

// Mock messages data
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

// Mock match data
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
  matchedAt: "2024-01-15T10:30:00Z",
  lastMessage: {
    text: "Hey! Thanks for the match 😊",
    timestamp: "2024-01-15T14:30:00Z",
    sender: "them",
  },
  unreadCount: 2,
}

// Enhanced Chat Header Component
const ChatHeader = ({ match, onBack }) => {
  return (
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm"
    >
      <div className="flex items-center justify-between p-4 sm:p-6">
        {/* Left side - Back button and user info */}
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

        {/* Right side - Action buttons */}
        <div className="flex items-center space-x-2">
          {[
            { icon: Phone, label: "Call" },
            { icon: Video, label: "Video call" },
            { icon: MoreHorizontal, label: "More options" }
          ].map(({ icon: Icon, label }) => (
            <motion.button
              key={label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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

// Enhanced Messages List Header
const MessagesListHeader = () => {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm"
    >
      <div className="p-4 sm:p-6 space-y-4">
        {/* Top row - Title and actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-slate-800 rounded-xl flex items-center justify-center shadow-sm">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Messages</h1>
              <p className="text-sm text-gray-500 font-medium">Stay connected with your matches</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/dating/matches")}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-xl text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200"
            >
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">View Matches</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200"
            >
              <Settings className="w-5 h-5 text-gray-600" />
            </motion.button>
          </div>
        </div>

        {/* Search and filter row */}
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversations..."
              className="pl-10 bg-gray-50 border-gray-200 rounded-xl focus:bg-white transition-all duration-200"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-200"
          >
            <Filter className="w-4 h-4 text-gray-600" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

// Enhanced Chat Component
const Chat = ({ match, onBack }) => {
  const [messages, setMessages] = useState(mockMessages)
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const { Header, sidebarCollapsed, isMobile } = useDatingLayout()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
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

    // Simulate sending delay
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === message.id ? { ...msg, status: "sent" } : msg
        )
      )
      setIsSending(false)

      // Simulate typing indicator
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
    }, 300)
  }

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
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 to-gray-100/50">
      <ChatHeader match={match} onBack={onBack} />

      {/* Enhanced Messages with improved animations */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        <AnimatePresence mode="popLayout">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
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
          ))}
        </AnimatePresence>

        {/* Enhanced typing indicator */}
        <AnimatePresence>
          {isTyping && (
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

        <div ref={messagesEndRef} />
      </div>

      {/* Enhanced Message Input with better animations */}
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
            className="p-2.5 sm:p-3 hover:bg-gray-100/80 rounded-xl transition-all duration-200 active:scale-95 hover:scale-105 mb-1"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
          </Button>
          
          <div className="flex-1 relative">
            <Input
              ref={inputRef}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className={cn(
                "pr-12 sm:pr-14 rounded-2xl border-gray-200 bg-gray-50 focus:bg-white",
                "transition-all duration-300 font-medium py-3 sm:py-3.5 text-sm sm:text-base",
                "focus:ring-2 focus:ring-slate-200 focus:border-slate-300",
                "placeholder:text-gray-400"
              )}
              onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
              disabled={isSending}
            />
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={sendMessage}
                size="sm"
                className={cn(
                  "absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 rounded-xl",
                  "w-8 h-8 sm:w-10 sm:h-10 p-0 transition-all duration-200",
                  "bg-gradient-to-br from-slate-700 to-slate-900",
                  "hover:from-slate-800 hover:to-slate-950",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  newMessage.trim() ? "scale-100" : "scale-90 opacity-70"
                )}
                disabled={!newMessage.trim() || isSending}
              >
                <Send className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
            </motion.div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="p-2.5 sm:p-3 hover:bg-gray-100/80 rounded-xl transition-all duration-200 active:scale-95 hover:scale-105 mb-1"
          >
            <Smile className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

// Component that uses useSearchParams
const MessagesPageContent = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const matchId = searchParams.get("match")
  const [selectedMatch, setSelectedMatch] = useState(null)

  useEffect(() => {
    if (matchId) {
      // In a real app, you'd fetch the match data based on the ID
      setSelectedMatch(mockMatch)
    }
  }, [matchId])

  const handleBackFromChat = () => {
    setSelectedMatch(null)
    router.push("/dating/messages")
  }

  const handleSelectMatch = (match) => {
    router.push(`/dating/messages?match=${match.id}`)
  }

  // Show chat if a match is selected
  if (selectedMatch) {
    return <Chat match={selectedMatch} onBack={handleBackFromChat} />
  }

  // Show messages list when no match is selected
  return <MessagesList onSelectMatch={handleSelectMatch} />
}

// Enhanced Messages List Component - focused on conversations only
const MessagesList = ({ onSelectMatch }) => {
  const router = useRouter()
  const { Header, sidebarCollapsed, isMobile } = useDatingLayout()
  
  // Mock conversations data
  const conversations = [
    {
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
      matchedAt: "2024-01-15T10:30:00Z",
      lastMessage: {
        text: "Hey! Thanks for the match 😊",
        timestamp: "2024-01-15T14:30:00Z",
        sender: "them",
      },
      unreadCount: 2,
    },
    {
      id: 2,
      user: {
        id: 2,
        name: "Sofia",
        age: 24,
        location: "5 miles away",
        images: [
          {
            url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop&crop=face",
            title: "Creative Process",
          },
        ],
        verified: true,
        online: false,
        lastSeen: "2 hours ago",
      },
      matchedAt: "2024-01-14T16:45:00Z",
      lastMessage: {
        text: "Would love to check out that art gallery you mentioned!",
        timestamp: "2024-01-14T18:20:00Z",
        sender: "me",
      },
      unreadCount: 0,
    },
    {
      id: 3,
      user: {
        id: 3,
        name: "Lisa",
        age: 28,
        location: "1 mile away",
        images: [
          {
            url: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=600&fit=crop&crop=face",
            title: "Morning Miles",
          },
        ],
        verified: false,
        online: true,
        lastSeen: "Active now",
      },
      matchedAt: "2024-01-13T09:15:00Z",
      lastMessage: {
        text: "That hiking trail looks amazing! When are you free to go?",
        timestamp: "2024-01-13T11:45:00Z",
        sender: "them",
      },
      unreadCount: 1,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50">
      <MessagesListHeader />

      {/* Conversations Stats */}
      <div className="px-4 sm:px-6 py-4">
        <div className="max-w-2xl mx-auto">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-slate-700">{conversations.length}</div>
              <div className="text-xs text-gray-600 font-medium">Active Chats</div>
            </div>
            <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-green-600">
                {conversations.filter(c => c.user.online).length}
              </div>
              <div className="text-xs text-gray-600 font-medium">Online Now</div>
            </div>
            <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-red-500">
                {conversations.reduce((sum, c) => sum + c.unreadCount, 0)}
              </div>
              <div className="text-xs text-gray-600 font-medium">Unread</div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Conversations List */}
      <div className="px-4 sm:px-6 pb-32">
        <div className="max-w-2xl mx-auto space-y-3">
          <AnimatePresence mode="popLayout">
            {conversations.length > 0 ? (
              conversations.map((conversation, index) => (
                <motion.div
                  key={conversation.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    y: -2,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center space-x-4 p-4 sm:p-5 bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 backdrop-blur-sm group"
                  onClick={() => onSelectMatch(conversation)}
                >
                  <div className="relative">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <Avatar className="w-14 h-14 sm:w-16 sm:h-16 ring-2 ring-gray-100 shadow-md group-hover:ring-slate-200 transition-all duration-300">
                        <AvatarImage src={conversation.user.images[0].url || "/placeholder.svg"} alt={conversation.user.name} />
                        <AvatarFallback className="bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 font-semibold text-lg">
                          {conversation.user.name[0]}
                        </AvatarFallback>
                      </Avatar>
                    </motion.div>
                    <AnimatePresence>
                      {conversation.user.online && (
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 border-2 border-white rounded-full shadow-sm"
                        >
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-full h-full bg-green-400 rounded-full"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-bold text-gray-900 truncate text-base sm:text-lg tracking-tight group-hover:text-slate-700 transition-colors duration-300">
                          {conversation.user.name}
                        </h3>
                        {conversation.user.verified && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            <Shield className="w-4 h-4 text-blue-500" />
                          </motion.div>
                        )}
                      </div>
                      <span className="text-xs text-gray-500 font-medium">
                        {new Date(conversation.lastMessage.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 truncate font-medium mb-2 group-hover:text-gray-700 transition-colors duration-300">
                      {conversation.lastMessage.sender === "me" ? "You: " : ""}{conversation.lastMessage.text}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <MapPin className="w-3 h-3" />
                        <span>{conversation.user.location}</span>
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {conversation.unreadCount > 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                        <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white min-w-[24px] h-6 rounded-full text-xs flex items-center justify-center font-bold shadow-lg">
                          {conversation.unreadCount}
                        </Badge>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <motion.div
                  animate={{ 
                    rotate: [0, -10, 10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                  className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                >
                  <MessageCircle className="w-10 h-10 text-gray-400" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">No conversations yet</h3>
                <p className="text-gray-600 mb-8 max-w-sm mx-auto leading-relaxed">
                  Start a conversation with your matches and create meaningful connections!
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    onClick={() => router.push("/dating/matches")}
                    className="bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-slate-950"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Find Matches
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

// Loading component for Suspense fallback
const MessagesPageLoading = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-700 mx-auto"></div>
        <p className="text-gray-600">Loading messages...</p>
      </div>
    </div>
  )
}

export default function MessagesPage() {
  return (
    <Suspense fallback={<MessagesPageLoading />}>
      <MessagesPageContent />
    </Suspense>
  )
}
