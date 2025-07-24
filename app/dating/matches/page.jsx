"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, MapPin, Shield, Users, Clock, Sparkles, TrendingUp, Star, Settings, Filter, Search } from 'lucide-react'
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useDatingLayout } from "../layout"
import { Input } from "@/components/ui/input"

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

// Enhanced Matches Header - Made responsive and thinner
const MatchesHeader = () => {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm"
    >
      <div className="p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4">
        {/* Top row - Title and actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-slate-600 to-slate-800 rounded-xl flex items-center justify-center shadow-sm">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 tracking-tight">Matches</h1>
              <p className="text-xs sm:text-sm text-gray-500 font-medium hidden sm:block">People who liked you back</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-1 sm:space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/dating")}
              className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200"
            >
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Discover</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/dating/messages")}
              className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-slate-500 to-slate-600 text-white rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200"
            >
              <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Messages</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg sm:rounded-xl transition-all duration-200"
            >
              <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
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
              placeholder="Search matches..."
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

// Enhanced Match Card Component - focused on match interaction
const MatchCard = ({ match, index, onSelect, onMessage }) => {
  const [isHovered, setIsHovered] = useState(false)

  const timeSinceMatch = () => {
    const now = new Date()
    const matchTime = new Date(match.matchedAt)
    const diffInHours = Math.floor((now - matchTime) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return "Just matched!"
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
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
        y: -4,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-white rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100 overflow-hidden backdrop-blur-sm"
    >
      {/* Hover gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        animate={{ opacity: isHovered ? 1 : 0 }}
      />

      <div className="relative z-10">
        {/* Header with match time */}
        <div className="flex items-center justify-between mb-4">
          <motion.div
            animate={{ scale: isHovered ? 1.05 : 1 }}
            className="flex items-center space-x-2 px-3 py-1 bg-slate-50 rounded-full"
          >
            <Heart className="w-3 h-3 text-slate-600 fill-current" />
            <span className="text-xs font-medium text-slate-700">{timeSinceMatch()}</span>
          </motion.div>
          
          {match.unreadCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
            >
              <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white">
                {match.unreadCount} new
              </Badge>
            </motion.div>
          )}
        </div>

        {/* User info */}
        <div className="flex items-center space-x-4 mb-4" onClick={() => onSelect(match)}>
          <div className="relative">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 2 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Avatar className="w-16 h-16 sm:w-18 sm:h-18 ring-2 ring-gray-100 shadow-lg group-hover:ring-4 group-hover:ring-slate-200 transition-all duration-300">
                <AvatarImage 
                  src={match.user.images[0].url || "/placeholder.svg"} 
                  alt={match.user.name}
                  className="object-cover"
                />
                <AvatarFallback className="bg-gradient-to-br from-slate-100 to-slate-200 text-slate-700 font-bold text-xl">
                  {match.user.name[0]}
                </AvatarFallback>
              </Avatar>
            </motion.div>
            
            <AnimatePresence>
              {match.user.online && (
                <motion.div 
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 90 }}
                  className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-3 border-white rounded-full shadow-lg"
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [1, 0.7, 1]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-full h-full bg-green-400 rounded-full"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <motion.h3 
                className="font-bold text-gray-900 truncate text-lg sm:text-xl tracking-tight group-hover:text-slate-700 transition-colors duration-300"
                animate={{ x: isHovered ? 2 : 0 }}
              >
                {match.user.name}, {match.user.age}
              </motion.h3>
              {match.user.verified && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                >
                  <Shield className="w-4 h-4 text-blue-500" />
                </motion.div>
              )}
            </div>

            <motion.p 
              className="text-sm text-gray-600 font-medium mb-2 group-hover:text-gray-700 transition-colors duration-300 line-clamp-2"
              animate={{ x: isHovered ? 2 : 0 }}
            >
              {match.user.bio}
            </motion.p>

            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <MapPin className="w-3 h-3" />
              <span>{match.user.location}</span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation()
              onSelect(match)
            }}
            className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl py-3 px-4 font-medium text-sm transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Users className="w-4 h-4" />
            <span>View Profile</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation()
              onMessage(match)
            }}
            className="flex-1 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white rounded-xl py-3 px-4 font-medium text-sm transition-all duration-200 flex items-center justify-center space-x-2 shadow-sm hover:shadow-md"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Message</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

// Enhanced Stats Card Component
const StatsCard = ({ icon: Icon, value, label, color = "slate", delay = 0, subtitle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        delay,
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
      whileHover={{ 
        scale: 1.05,
        y: -2,
        transition: { duration: 0.2 }
      }}
      className="relative bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden group"
    >
      {/* Background gradient */}
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300",
        color === "slate" && "bg-gradient-to-br from-slate-500 to-slate-700",
        color === "green" && "bg-gradient-to-br from-green-500 to-green-700",
        color === "red" && "bg-gradient-to-br from-red-500 to-red-700",
        color === "pink" && "bg-gradient-to-br from-pink-500 to-red-500"
      )} />

      <div className="relative z-10">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm",
            color === "slate" && "bg-slate-100 text-slate-700",
            color === "green" && "bg-green-100 text-green-700",
            color === "red" && "bg-red-100 text-red-700",
            color === "pink" && "bg-pink-100 text-pink-700"
          )}
        >
          <Icon className="w-6 h-6" />
        </motion.div>

        <motion.div 
          className={cn(
            "text-3xl font-bold mb-1",
            color === "slate" && "text-slate-700",
            color === "green" && "text-green-600",
            color === "red" && "text-red-500",
            color === "pink" && "text-pink-500"
          )}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          {value}
        </motion.div>

        <div className="text-sm text-gray-600 font-medium">{label}</div>
        {subtitle && (
          <div className="text-xs text-gray-500 mt-1">{subtitle}</div>
        )}
      </div>
    </motion.div>
  )
}

export default function MatchesPage() {
  const router = useRouter()
  const [matches, setMatches] = useState(mockMatches)

  const handleSelectMatch = (match) => {
    // Navigate to user profile or detailed view
    console.log("View profile for:", match.user.name)
  }

  const handleMessageMatch = (match) => {
    router.push(`/dating/messages?match=${match.id}`)
  }

  const stats = [
    {
      icon: Heart,
      value: matches.length,
      label: "Total Matches",
      subtitle: "This week",
      color: "slate",
      delay: 0
    },
    {
      icon: Users,
      value: matches.filter(m => m.user.online).length,
      label: "Online Now",
      subtitle: "Ready to chat",
      color: "green",
      delay: 0.1
    },
    {
      icon: Clock,
      value: matches.filter(m => new Date() - new Date(m.matchedAt) < 24 * 60 * 60 * 1000).length,
      label: "New Today",
      subtitle: "Fresh matches",
      color: "slate",
      delay: 0.2
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50">
      <MatchesHeader />

      <div className="px-4 sm:px-6 pb-32">
        <div className="max-w-4xl mx-auto">
          {/* Enhanced Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-3 gap-4 py-6"
          >
            {stats.map((stat, index) => (
              <StatsCard
                key={stat.label}
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
                subtitle={stat.subtitle}
                color={stat.color}
                delay={stat.delay}
              />
            ))}
          </motion.div>

          {/* Enhanced Matches List */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-between mb-6"
            >
              <h2 className="text-xl font-bold text-gray-900">Your Matches</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <TrendingUp className="w-4 h-4" />
                <span>Most recent first</span>
              </div>
            </motion.div>

            <AnimatePresence mode="popLayout">
              {matches.length > 0 ? (
                matches.map((match, index) => (
                  <MatchCard
                    key={match.id}
                    match={match}
                    index={index}
                    onSelect={handleSelectMatch}
                    onMessage={handleMessageMatch}
                  />
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-20"
                >
                  <motion.div
                    animate={{ 
                      rotate: [0, -10, 10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2
                    }}
                    className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg"
                  >
                    <Heart className="w-12 h-12 text-slate-600" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">No matches yet</h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                    Start swiping to find your perfect match! Amazing connections are waiting for you.
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      onClick={() => router.push("/dating/discover")}
                      className="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Start Discovering
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
