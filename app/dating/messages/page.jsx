"use client"

import { useState, useEffect, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Settings,
  Shield,
  MapPin,
  MessageCircle,
  Search,
  Filter,
  Heart,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"

// Mock conversations data
const mockConversations = [
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

// Messages List Header Component
const MessagesListHeader = ({ searchQuery, onSearchChange, onFilter, onViewMatches, onSettings }) => {
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
              onClick={onViewMatches}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-xl text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200"
            >
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">View Matches</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onSettings}
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
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search conversations..."
              className="pl-10 bg-gray-50 border-gray-200 rounded-xl focus:bg-white transition-all duration-200"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onFilter}
            className="p-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-200"
          >
            <Filter className="w-4 h-4 text-gray-600" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

// Conversation Item Component
const ConversationItem = ({ conversation, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ 
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
      onClick={() => onClick(conversation)}
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
  )
}

// Main Messages List Component with centralized state management
const MessagesPageContent = () => {
  const router = useRouter()
  
  // === STATE MANAGEMENT ===
  const [conversations, setConversations] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filteredConversations, setFilteredConversations] = useState([])

  // === DATA FETCHING ===
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setIsLoading(true)
        // TODO: Replace with actual API call
        console.log('API: Fetch conversations for current user')
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        setConversations(mockConversations)
      } catch (err) {
        console.error('Failed to fetch conversations:', err)
        setError('Failed to load conversations. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchConversations()
  }, [])

  // === SEARCH FILTERING ===
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredConversations(conversations)
    } else {
      const filtered = conversations.filter(conversation =>
        conversation.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conversation.lastMessage.text.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredConversations(filtered)
    }
  }, [searchQuery, conversations])

  // === ACTION HANDLERS ===
  const handleSelectConversation = (conversation) => {
    // TODO: Mark conversation as read if it has unread messages
    if (conversation.unreadCount > 0) {
      console.log('API: Mark conversation as read:', conversation.id)
    }
    
    router.push(`/dating/messages/chat?matchId=${conversation.id}`)
  }

  const handleSearchChange = (value) => {
    setSearchQuery(value)
  }

  const handleFilter = () => {
    // TODO: Implement filter functionality
    console.log('Show filter options')
  }

  const handleViewMatches = () => {
    router.push("/dating/matches")
  }

  const handleSettings = () => {
    // TODO: Navigate to message settings
    console.log('Navigate to message settings')
  }

  // === LOADING STATE ===
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-700 mx-auto"></div>
          <p className="text-gray-600">Loading messages...</p>
        </div>
      </div>
    )
  }

  // === ERROR STATE ===
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <span className="text-red-500 text-2xl">!</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900">Something went wrong</h2>
          <p className="text-gray-600">{error}</p>
          <Button onClick={() => window.location.reload()} className="bg-slate-700 hover:bg-slate-800">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50">
      <MessagesListHeader 
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onFilter={handleFilter}
        onViewMatches={handleViewMatches}
        onSettings={handleSettings}
      />

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

      {/* Conversations List */}
      <div className="px-4 sm:px-6 pb-32">
        <div className="max-w-2xl mx-auto space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredConversations.length > 0 ? (
              filteredConversations.map((conversation, index) => (
                <motion.div
                  key={conversation.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ConversationItem 
                    conversation={conversation}
                    onClick={handleSelectConversation}
                  />
                </motion.div>
              ))
            ) : searchQuery ? (
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600">Try searching with different keywords.</p>
              </motion.div>
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
                    onClick={handleViewMatches}
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
