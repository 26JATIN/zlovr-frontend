"use client"

import { useState, useEffect, useRef } from "react"
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
} from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useRouter, useSearchParams } from "next/navigation"

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

// Enhanced Header Component
const Header = ({ title, onBack, actions }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {onBack ? (
            <Button
              variant="ghost"
              size="sm"
              className="p-2 sm:p-2.5 hover:bg-gray-100/80 rounded-xl transition-all duration-200 active:scale-95"
              onClick={onBack}
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
            </Button>
          ) : (
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center shadow-lg">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">zlovr</span>
            </div>
          )}

          {title && (
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900 tracking-tight truncate max-w-[200px] sm:max-w-none">
              {title}
            </h1>
          )}

          <div className="flex items-center space-x-1 sm:space-x-2">
            {actions || (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 sm:p-2.5 hover:bg-gray-100/80 rounded-xl transition-all duration-200 active:scale-95"
                >
                  <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 sm:p-2.5 hover:bg-gray-100/80 rounded-xl transition-all duration-200 active:scale-95"
                >
                  <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

// Enhanced Chat Component
const Chat = ({ match, onBack }) => {
  const [messages, setMessages] = useState(mockMessages)
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const message = {
      id: messages.length + 1,
      text: newMessage,
      timestamp: new Date().toISOString(),
      sender: "me",
      status: "sent",
    }

    setMessages([...messages, message])
    setNewMessage("")

    // Simulate typing indicator
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      // Simulate response
      const response = {
        id: messages.length + 2,
        text: "That sounds great! I'd love to do that 😊",
        timestamp: new Date().toISOString(),
        sender: "them",
        status: "read",
      }
      setMessages((prev) => [...prev, response])
    }, 2000)
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Enhanced Chat Header */}
      <div className="bg-white/95 backdrop-blur-xl border-b border-gray-100/50 p-3 sm:p-4 shadow-sm">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="p-1.5 sm:p-2 hover:bg-gray-100/80 rounded-xl transition-all duration-200 active:scale-95"
          >
            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
          </Button>
          <Avatar className="w-8 h-8 sm:w-10 sm:h-10 ring-2 ring-gray-100">
            <AvatarImage src={match.user.images[0].url || "/placeholder.svg"} alt={match.user.name} />
            <AvatarFallback className="bg-gray-100 text-gray-600 font-semibold text-sm sm:text-base">{match.user.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 tracking-tight text-sm sm:text-base truncate">{match.user.name}</h3>
            <p className="text-xs text-gray-500 font-medium truncate">{match.user.lastSeen}</p>
          </div>
          <div className="flex space-x-0.5 sm:space-x-1">
            <Button
              variant="ghost"
              size="sm"
              className="p-1.5 sm:p-2 hover:bg-gray-100/80 rounded-xl transition-all duration-200 active:scale-95"
            >
              <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="p-1.5 sm:p-2 hover:bg-gray-100/80 rounded-xl transition-all duration-200 active:scale-95"
            >
              <Video className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="p-1.5 sm:p-2 hover:bg-gray-100/80 rounded-xl transition-all duration-200 active:scale-95"
            >
              <MoreHorizontal className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={cn("flex", message.sender === "me" ? "justify-end" : "justify-start")}
          >
            <div
              className={cn(
                "max-w-[75%] p-4 rounded-3xl shadow-sm",
                message.sender === "me"
                  ? "bg-gradient-to-br from-slate-700 to-slate-900 text-white rounded-br-lg"
                  : "bg-white text-gray-900 rounded-bl-lg border border-gray-100",
              )}
            >
              <p className="text-sm font-medium leading-relaxed">{message.text}</p>
              <div className="flex items-center justify-end space-x-2 mt-2">
                <span className="text-xs opacity-70 font-medium">
                  {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
                {message.sender === "me" && (
                  <div className="text-xs opacity-70">
                    {message.status === "sent" && <Check className="w-3 h-3" />}
                    {message.status === "delivered" && <CheckCheck className="w-3 h-3" />}
                    {message.status === "read" && <CheckCheck className="w-3 h-3 text-blue-400" />}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
            <div className="bg-white p-4 rounded-3xl rounded-bl-lg shadow-sm border border-gray-100">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Enhanced Message Input */}
      <div className="bg-white/95 backdrop-blur-xl border-t border-gray-100/50 p-4 sm:p-6 shadow-sm">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="p-2 sm:p-3 hover:bg-gray-100/80 rounded-xl transition-all duration-200 active:scale-95"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
          </Button>
          <div className="flex-1 relative">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="pr-12 sm:pr-14 rounded-2xl border-gray-200 bg-gray-50 focus:bg-white transition-all duration-200 font-medium py-2.5 sm:py-3 text-sm sm:text-base"
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <Button
              onClick={sendMessage}
              size="sm"
              className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 rounded-xl w-8 h-8 sm:w-10 sm:h-10 p-0 bg-gradient-to-br from-slate-700 to-slate-900 hover:from-slate-800 hover:to-slate-950 transition-all duration-200 active:scale-95"
              disabled={!newMessage.trim()}
            >
              <Send className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function MessagesPage() {
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
    router.push("/dating/matches")
  }

  // Show messages list (redirect to matches for now)
  useEffect(() => {
    if (!matchId) {
      router.push("/dating/matches")
    }
  }, [matchId, router])

  // Show chat if a match is selected
  if (selectedMatch) {
    return <Chat match={selectedMatch} onBack={handleBackFromChat} />
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Select a match to start chatting</h2>
        <Button onClick={() => router.push("/dating/matches")}>Go to Matches</Button>
      </div>
    </div>
  )
}
