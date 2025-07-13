"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, MapPin, Shield, Users, Bell, Settings, Sparkles } from 'lucide-react'
import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

// Mock data for matches
const mockMatches = [
  {
    id: 1,
    user: {
      id: 1,
      name: "Emma",
      age: 26,
      location: "2 miles away",
      bio: "Adventure seeker, coffee lover, and dog mom 🐕☕️",
      images: [
        {
          url: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=600&fit=crop&crop=face",
          title: "Weekend Adventures",
        }
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
      bio: "Artist by day, dreamer by night 🎨✨",
      images: [
        {
          url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop&crop=face",
          title: "Creative Process",
        }
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
      bio: "Fitness enthusiast and foodie 🏃‍♀️🍕",
      images: [
        {
          url: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=600&fit=crop&crop=face",
          title: "Morning Miles",
        }
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

// Enhanced Header Component
const Header = ({ title, onBack, actions }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center shadow-lg">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">zlovr</span>
          </div>

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

// Enhanced Matches List Component
const MatchesList = ({ matches, onSelectMatch }) => {
  return (
    <div className="space-y-4">
      {matches.map((match, index) => (
        <motion.div
          key={match.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center space-x-4 p-6 bg-white rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 transform hover:scale-[1.02] active:scale-[0.98]"
          onClick={() => onSelectMatch(match)}
        >
          <div className="relative">
            <Avatar className="w-16 h-16 ring-2 ring-gray-100">
              <AvatarImage src={match.user.images[0].url || "/placeholder.svg"} alt={match.user.name} />
              <AvatarFallback className="bg-gray-100 text-gray-600 font-semibold">{match.user.name[0]}</AvatarFallback>
            </Avatar>
            {match.user.online && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full shadow-sm"></div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-gray-900 truncate text-lg tracking-tight">{match.user.name}</h3>
                {match.user.verified && (
                  <Shield className="w-4 h-4 text-blue-500" />
                )}
              </div>
              <span className="text-xs text-gray-500 font-medium">
                {new Date(match.lastMessage.timestamp).toLocaleDateString()}
              </span>
            </div>
            <p className="text-sm text-gray-600 truncate font-medium mt-1">{match.lastMessage.text}</p>
            <div className="flex items-center space-x-2 mt-2">
              <MapPin className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-500">{match.user.location}</span>
            </div>
          </div>

          {match.unreadCount > 0 && (
            <Badge className="bg-red-500 text-white min-w-[24px] h-6 rounded-full text-xs flex items-center justify-center font-bold shadow-sm">
              {match.unreadCount}
            </Badge>
          )}
        </motion.div>
      ))}
    </div>
  )
}

export default function MatchesPage() {
  const router = useRouter()
  const [matches, setMatches] = useState(mockMatches)

  const handleSelectMatch = (match) => {
    // Navigate to messages with the selected match
    router.push(`/dating/messages?match=${match.id}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Matches" />
      <div className="pt-16 sm:pt-18 pb-32 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-6 mb-8 shadow-sm border border-gray-100"
          >
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-slate-700">{matches.length}</div>
                <div className="text-sm text-gray-600 font-medium">Total Matches</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {matches.filter(m => m.user.online).length}
                </div>
                <div className="text-sm text-gray-600 font-medium">Online Now</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-500">
                  {matches.reduce((sum, m) => sum + m.unreadCount, 0)}
                </div>
                <div className="text-sm text-gray-600 font-medium">Unread</div>
              </div>
            </div>
          </motion.div>

          {/* Matches List */}
          <MatchesList matches={matches} onSelectMatch={handleSelectMatch} />
        </div>
      </div>
    </div>
  )
}
