"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Heart,
  MessageCircle,
  MapPin,
  Filter,
  Settings,
  User,
  ChevronLeft,
  ChevronRight,
  Shield,
  Sparkles,
  Zap,
  Bell,
  Send,
  Camera,
  Edit,
  MoreHorizontal,
  Phone,
  Video,
  Check,
  CheckCheck,
  Plus,
  ArrowLeft,
  Users,
  Music,
  Book,
  Dumbbell,
  Plane,
  Coffee,
  Dog,
  Gamepad2,
  Palette,
  Code,
  Mountain,
  Utensils,
  CameraIcon,
  Film,
  Headphones,
  Briefcase,
  GraduationCap,
  RefreshCw,
  Quote,
  Search,
} from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

// Enhanced mock data with detailed stories for each photo
const mockUsers = [
  {
    id: 1,
    name: "Emma",
    age: 26,
    location: "2 miles away",
    bio: "Adventure seeker, coffee lover, and dog mom 🐕☕️",
    images: [
      {
        url: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=600&fit=crop&crop=face",
        story:
          "This is me on my favorite hiking trail! I love exploring new paths and discovering hidden waterfalls. There's something magical about being surrounded by nature that just makes me feel alive.",
        title: "Weekend Adventures",
      },
      {
        url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop&crop=face",
        story:
          "Coffee shop vibes ☕️ This little café downtown makes the best lavender latte. I'm here almost every morning working on my design projects. Perfect spot for deep conversations too!",
        title: "Morning Rituals",
      },
      {
        url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop&crop=face",
        story:
          "Date night ready! I love dressing up for special occasions. This was taken before a gallery opening - art and good company make for the perfect evening.",
        title: "Special Moments",
      },
      {
        url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop&crop=face",
        story:
          "Beach day with my rescue pup, Luna! 🐕 She's my adventure buddy and the best judge of character. If she likes you, you're definitely a keeper!",
        title: "Life with Luna",
      },
    ],
    interests: ["Hiking", "Photography", "Travel", "Yoga", "Coffee", "Dogs", "Art", "Music"],
    verified: true,
    online: true,
    lastSeen: "Active now",
    job: "Graphic Designer",
    education: "NYU",
    height: "5'6\"",
    zodiac: "Gemini",
    drinking: "Socially",
    smoking: "Never",
    children: "Want someday",
    religion: "Agnostic",
    politics: "Liberal",
  },
  {
    id: 2,
    name: "Sofia",
    age: 24,
    location: "5 miles away",
    bio: "Artist by day, dreamer by night 🎨✨",
    images: [
      {
        url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop&crop=face",
        story:
          "In my art studio working on a new painting series about urban landscapes. Art is my way of seeing the world differently and expressing emotions that words can't capture.",
        title: "Creative Process",
      },
      {
        url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop&crop=face",
        story:
          "Sunday farmers market haul! I love cooking with fresh, local ingredients. There's something so satisfying about creating a meal from scratch with seasonal produce.",
        title: "Farm to Table",
      },
      {
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face",
        story:
          "Opening night at the local theater! I volunteer with the community arts program. Supporting local artists and bringing culture to our neighborhood is so important to me.",
        title: "Community Arts",
      },
      {
        url: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=600&fit=crop&crop=face",
        story:
          "Wine tasting in Napa Valley! This was an amazing weekend getaway. I love learning about different wine regions and the stories behind each vineyard.",
        title: "Wine Adventures",
      },
    ],
    interests: ["Art", "Music", "Cooking", "Reading", "Museums", "Wine", "Dancing", "Theater"],
    verified: true,
    online: false,
    lastSeen: "2 hours ago",
    job: "Art Teacher",
    education: "Parsons",
    height: "5'4\"",
    zodiac: "Pisces",
    drinking: "Occasionally",
    smoking: "Never",
    children: "Open to kids",
    religion: "Spiritual",
    politics: "Moderate",
  },
  {
    id: 3,
    name: "Lisa",
    age: 28,
    location: "1 mile away",
    bio: "Fitness enthusiast and foodie 🏃‍♀️🍕",
    images: [
      {
        url: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=600&fit=crop&crop=face",
        story:
          "Just finished my morning 10K run! Running is my meditation - it clears my mind and energizes me for the day ahead. The sunrise views from this trail are incredible.",
        title: "Morning Miles",
      },
      {
        url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop&crop=face",
        story:
          "Trying out a new recipe! I love experimenting in the kitchen, especially with healthy twists on comfort food. This quinoa bowl was absolutely delicious.",
        title: "Kitchen Experiments",
      },
      {
        url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop&crop=face",
        story:
          "Yoga class in the park! There's nothing like practicing mindfulness outdoors. This weekly session helps me stay centered and connected with nature.",
        title: "Mindful Moments",
      },
      {
        url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop&crop=face",
        story:
          "Celebrating my friend's birthday at this amazing rooftop restaurant! I believe life is about balance - work hard, play hard, and enjoy good food with great people.",
        title: "Good Times",
      },
    ],
    interests: ["Fitness", "Food", "Travel", "Movies", "Running", "Yoga", "Cooking", "Hiking"],
    verified: false,
    online: true,
    lastSeen: "Active now",
    job: "Personal Trainer",
    education: "UCLA",
    height: "5'7\"",
    zodiac: "Leo",
    drinking: "Regularly",
    smoking: "Never",
    children: "Don't want",
    religion: "Christian",
    politics: "Conservative",
  },
]

const mockMatches = [
  {
    id: 1,
    user: mockUsers[0],
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
    user: mockUsers[1],
    matchedAt: "2024-01-14T16:45:00Z",
    lastMessage: {
      text: "Would love to check out that art gallery you mentioned!",
      timestamp: "2024-01-14T18:20:00Z",
      sender: "me",
    },
    unreadCount: 0,
  },
]

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

// Interest icons mapping
const interestIcons = {
  Hiking: Mountain,
  Photography: CameraIcon,
  Travel: Plane,
  Yoga: User,
  Coffee: Coffee,
  Dogs: Dog,
  Art: Palette,
  Music: Headphones,
  Cooking: Utensils,
  Reading: Book,
  Museums: GraduationCap,
  Wine: Utensils,
  Dancing: Music,
  Theater: Film,
  Fitness: Dumbbell,
  Food: Utensils,
  Movies: Film,
  Running: Dumbbell,
  Technology: Code,
  Gaming: Gamepad2,
  Coding: Code,
}

// Enhanced Header Component
const Header = ({ title, onBack, actions }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {onBack ? (
            <Button
              variant="ghost"
              size="sm"
              className="p-2.5 hover:bg-gray-100/80 rounded-xl transition-all duration-200 active:scale-95"
              onClick={onBack}
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </Button>
          ) : (
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">zlovr</span>
            </div>
          )}

          {title && <h1 className="text-xl font-semibold text-gray-900 tracking-tight">{title}</h1>}

          <div className="flex items-center space-x-2">
            {actions || (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2.5 hover:bg-gray-100/80 rounded-xl transition-all duration-200 active:scale-95"
                >
                  <Bell className="w-5 h-5 text-gray-700" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2.5 hover:bg-gray-100/80 rounded-xl transition-all duration-200 active:scale-95"
                >
                  <Settings className="w-5 h-5 text-gray-700" />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

// Desktop Sidebar Navigation
const DesktopSidebar = ({ activeTab, onTabChange, collapsed, setCollapsed }) => {
  const tabs = [
    { id: "discover", icon: Heart, label: "Discover", description: "Find new people" },
    { id: "matches", icon: Users, label: "Matches", description: "Your connections" },
    { id: "messages", icon: MessageCircle, label: "Messages", description: "Chat with matches" },
    { id: "profile", icon: User, label: "Profile", description: "Edit your profile" },
  ];
  return (
    <motion.div
      className="fixed left-0 top-0 bottom-0 z-40 hidden lg:block bg-white border-r border-gray-100 shadow-sm"
      initial={{ width: 96 }}
      animate={{ width: collapsed ? 96 : 288 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onMouseEnter={() => setCollapsed(false)}
      onMouseLeave={() => setCollapsed(true)}
    >
      <div className={cn("overflow-hidden", collapsed ? "p-4" : "p-6")}>
        <motion.div 
          className={cn("flex items-center", collapsed ? "mb-6 justify-center" : "mb-8")}
          animate={{ justifyContent: collapsed ? "center" : "flex-start" }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center shadow-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ 
              opacity: collapsed ? 0 : 1, 
              width: collapsed ? 0 : "auto",
              marginLeft: collapsed ? 0 : 12
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <span className="text-2xl font-bold text-gray-900 tracking-tight whitespace-nowrap">zlovr</span>
          </motion.div>
        </motion.div>
        <nav className={cn(collapsed ? "-space-y-1" : "space-y-2")}>
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "w-full flex items-center rounded-2xl text-left",
                  collapsed ? "justify-center p-1 mx-auto w-fit" : "p-4",
                  isActive && !collapsed
                    ? "bg-gradient-to-r from-slate-50 to-slate-100 text-slate-800 shadow-sm border border-slate-200"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300",
                    isActive
                      ? "bg-gradient-to-br from-slate-600 to-slate-800 text-white"
                      : "bg-gray-100 text-gray-600"
                  )}
                >
                  <IconComponent className="w-5 h-5" />
                </div>
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ 
                    opacity: collapsed ? 0 : 1, 
                    width: collapsed ? 0 : "auto",
                    marginLeft: collapsed ? 0 : 16
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden flex-1"
                >
                  <div className="flex-1">
                    <div className="font-semibold text-base">{tab.label}</div>
                    <div className="text-sm opacity-70">{tab.description}</div>
                  </div>
                </motion.div>
              </motion.button>
            );
          })}
        </nav>
        {/* Quick Actions */}
        <motion.div 
          className={cn("border-t border-gray-100", collapsed ? "pt-4 mt-4" : "pt-6 mt-8")}
          animate={{ marginTop: collapsed ? 16 : 32 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: collapsed ? 0 : 1, 
              height: collapsed ? 0 : "auto"
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Quick Actions</h3>
          </motion.div>
          <div className={cn(collapsed ? "-space-y-1" : "space-y-2")}>
            <Button
              variant="ghost"
              className={cn(
                "w-full text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl",
                collapsed ? "justify-center p-1 mx-auto w-fit" : "justify-start p-3"
              )}
            >
              <Filter className="w-4 h-4 mr-3" />
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ 
                  opacity: collapsed ? 0 : 1, 
                  width: collapsed ? 0 : "auto"
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                Filters
              </motion.span>
            </Button>
            <Button
              variant="ghost"
              className={cn(
                "w-full text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl",
                collapsed ? "justify-center p-1 mx-auto w-fit" : "justify-start p-3"
              )}
            >
              <Search className="w-4 h-4 mr-3" />
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ 
                  opacity: collapsed ? 0 : 1, 
                  width: collapsed ? 0 : "auto"
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                Search
              </motion.span>
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Desktop Profile Layout Component
const DesktopProfileLayout = ({ user, onLike, onRefresh, sidebarPadWithTransition }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showLikeModal, setShowLikeModal] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [showExpandedPhoto, setShowExpandedPhoto] = useState(false)
  const [expandedPhotoIndex, setExpandedPhotoIndex] = useState(0)
  const [clickedPhotoRef, setClickedPhotoRef] = useState(null)
  const photoRefs = useRef({})

  const handleImageClick = (index, event) => {
    const clickedElement = event.currentTarget
    const rect = clickedElement.getBoundingClientRect()
    setClickedPhotoRef({
      element: clickedElement,
      rect: {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height
      }
    })
    setExpandedPhotoIndex(index)
    setShowExpandedPhoto(true)
  }

  const handleLike = () => {
    setShowLikeModal(false)
    onLike()
  }

  const closeExpandedPhoto = () => {
    setShowExpandedPhoto(false)
    setClickedPhotoRef(null)
  }

  const nextPhoto = () => {
    setExpandedPhotoIndex((prev) => (prev + 1) % user.images.length)
  }

  const prevPhoto = () => {
    setExpandedPhotoIndex((prev) => (prev - 1 + user.images.length) % user.images.length)
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 to-white pt-7 ${sidebarPadWithTransition}`}>
      <div className="max-w-6xl mx-auto px-8 py-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Photos */}
          <div className="space-y-4">

            <div className="grid grid-cols-2 gap-4">
              {user.images.map((image, index) => (
                <motion.div
                  key={index}
                  ref={(el) => (photoRefs.current[index] = el)}
                  whileHover={{ scale: 1.03, y: -8 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all duration-500 group"
                  onClick={(e) => handleImageClick(index, e)}
                  layoutId={`photo-${index}`}
                >
                  <Image
                    src={image.url || "/placeholder.svg"}
                    alt={`${user.name} - ${image.title}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="absolute bottom-4 left-4 right-4">
                    <h4 className="text-white font-bold text-lg mb-1 drop-shadow-lg">{image.title}</h4>
                  </div>

                  <div className="absolute top-4 right-4">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30 group-hover:bg-pink-500/80 transition-all duration-300">
                      <Heart className="w-5 h-5 text-white group-hover:fill-current" />
                    </div>
                  </div>

                  {/* Photo number indicator */}
                  <div className="absolute top-4 left-4">
                    <div className="w-6 h-6 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                      <span className="text-white text-xs font-bold">{index + 1}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Side - Profile Info */}
          <div className="space-y-6 lg:sticky lg:top-24">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100/50 backdrop-blur-sm">
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-2xl">{user.name[0]}</span>
                    </div>
                    {user.online && (
                      <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 border-3 border-white rounded-full shadow-lg"></div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-4 mb-2">
                      <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
                        {user.name}, {user.age}
                      </h1>
                      {user.verified && (
                        <div className="w-10 h-10 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                          <Shield className="w-5 h-5 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <MapPin className="w-5 h-5" />
                      <span className="font-semibold text-lg">{user.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center space-x-3 mb-3">
                    <Quote className="w-5 h-5 text-slate-600" />
                    <h3 className="font-bold text-gray-900 text-lg">About Me</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed font-medium bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    {user.bio}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <div className="flex items-center space-x-2">
                      <Briefcase className="w-4 h-4 text-slate-600" />
                      <span className="font-bold text-gray-900 text-sm">Work</span>
                    </div>
                    <p className="text-gray-700 font-medium text-sm">{user.job}</p>
                  </div>
                  <div className="space-y-2 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <div className="flex items-center space-x-2">
                      <GraduationCap className="w-4 h-4 text-slate-600" />
                      <span className="font-bold text-gray-900 text-sm">Education</span>
                    </div>
                    <p className="text-gray-700 font-medium text-sm">{user.education}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Interests & Hobbies</h3>
                  <div className="flex flex-wrap gap-2">
                    {user.interests.map((interest, index) => {
                      const IconComponent = interestIcons[interest] || Heart
                      return (
                        <motion.span
                          key={index}
                          whileHover={{ scale: 1.05 }}
                          className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl text-xs font-semibold text-slate-700 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300"
                        >
                          <IconComponent className="w-3 h-3" />
                          <span>{interest}</span>
                        </motion.span>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onRefresh}
                className="flex-1 h-16 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center text-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
              >
                <RefreshCw className="w-6 h-6 mr-3" />
                <span className="font-semibold">Next Profile</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowLikeModal(true)}
                className="flex-1 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Heart className="w-6 h-6 mr-3 fill-current" />
                <span className="font-semibold">Like {user.name}</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Photo Modal */}
      <AnimatePresence>
        {showExpandedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={closeExpandedPhoto}
          >
            <motion.div
              initial={clickedPhotoRef ? {
                x: clickedPhotoRef.rect.left - (window.innerWidth / 2) + (clickedPhotoRef.rect.width / 2),
                y: clickedPhotoRef.rect.top - (window.innerHeight / 2) + (clickedPhotoRef.rect.height / 2),
                width: clickedPhotoRef.rect.width,
                height: clickedPhotoRef.rect.height,
                scale: 1
              } : { scale: 0.8, opacity: 0, y: 50 }}
              animate={{
                x: 0,
                y: 0,
                width: "100%",
                height: "100%",
                scale: 1
              }}
              exit={clickedPhotoRef ? {
                x: clickedPhotoRef.rect.left - (window.innerWidth / 2) + (clickedPhotoRef.rect.width / 2),
                y: clickedPhotoRef.rect.top - (window.innerHeight / 2) + (clickedPhotoRef.rect.height / 2),
                width: clickedPhotoRef.rect.width,
                height: clickedPhotoRef.rect.height,
                scale: 1
              } : { scale: 0.8, opacity: 0, y: 50 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 25,
                duration: 0.6
              }}
              className="relative max-w-4xl w-full h-[80vh] overflow-hidden shadow-2xl"
              style={{
                borderRadius: clickedPhotoRef ? "16px" : "24px"
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                key={expandedPhotoIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="relative w-full h-full"
              >
                <Image
                  src={user.images[expandedPhotoIndex].url || "/placeholder.svg"}
                  alt={`${user.name} - ${user.images[expandedPhotoIndex].title}`}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
                
                {/* Photo Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8">
                  <h3 className="text-white font-bold text-3xl mb-4">{user.images[expandedPhotoIndex].title}</h3>
                  <p className="text-white/90 text-lg leading-relaxed">{user.images[expandedPhotoIndex].story}</p>
                </div>

                {/* Navigation Buttons */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prevPhoto}
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/30 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white border border-white/30 shadow-lg"
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextPhoto}
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/30 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white border border-white/30 shadow-lg"
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>

                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closeExpandedPhoto}
                  className="absolute top-6 right-6 w-12 h-12 bg-black/30 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white border border-white/30 shadow-lg"
                >
                  <ArrowLeft className="w-6 h-6" />
                </motion.button>

                {/* Photo Counter */}
                <div className="absolute top-6 left-6">
                  <div className="px-4 py-2 bg-black/40 backdrop-blur-sm rounded-xl border border-white/30">
                    <span className="text-white text-sm font-bold">
                      {expandedPhotoIndex + 1} / {user.images.length}
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Like Modal */}
      <AnimatePresence>
        {showLikeModal && matchedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setShowLikeModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white rounded-3xl p-10 max-w-lg w-full text-center shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-8">
                <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-red-500 rounded-3xl flex items-center justify-center mx-auto shadow-xl">
                  <Heart className="w-12 h-12 text-white fill-current" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-3">Like {user.name}?</h3>
                  <p className="text-gray-600 text-lg">Show her that you're interested and start a conversation!</p>
                </div>
                <div className="space-y-4">
                  <Button
                    onClick={handleLike}
                    className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold rounded-2xl py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Heart className="w-5 h-5 mr-3 fill-current" />
                    Send Like
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowLikeModal(false)}
                    className="w-full border-2 border-gray-200 text-gray-700 hover:bg-gray-50 rounded-2xl py-3 font-semibold text-lg"
                  >
                    Maybe Later
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Mobile Profile Layout Component
const MobileProfileLayout = ({ user, onLike, onRefresh }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showLikeModal, setShowLikeModal] = useState(false)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % user.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + user.images.length) % user.images.length)
  }

  const handleImageTap = () => {
    setShowLikeModal(true)
  }

  const handleLike = () => {
    setShowLikeModal(false)
    onLike()
  }

  const currentImage = user.images[currentImageIndex]

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      <div className="w-full">
        {/* Image Section */}
        <div className="relative w-full">
          <div className="relative w-full h-[65vh] overflow-hidden rounded-none">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative h-full cursor-pointer"
              onClick={handleImageTap}
            >
              <Image
                src={currentImage.url || "/placeholder.svg"}
                alt={`${user.name} - ${currentImage.title}`}
                fill
                className="object-cover w-full h-full rounded-none"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              {/* Tap indicator */}
              <div className="absolute top-6 right-6">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 shadow-lg"
                >
                  <Heart className="w-6 h-6 text-white" />
                </motion.div>
              </div>

              {/* Photo counter */}
              <div className="absolute top-6 left-6">
                <div className="px-3 py-2 bg-black/40 backdrop-blur-sm rounded-xl border border-white/30">
                  <span className="text-white text-sm font-bold">
                    {currentImageIndex + 1} / {user.images.length}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Navigation buttons */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/30 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white border border-white/30 shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/30 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white border border-white/30 shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>

            {/* Image indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
              {user.images.map((_, index) => (
                <motion.div
                  key={index}
                  initial={false}
                  animate={{
                    width: index === currentImageIndex ? 32 : 8,
                    opacity: index === currentImageIndex ? 1 : 0.5,
                  }}
                  transition={{ duration: 0.3 }}
                  className="h-1.5 rounded-full bg-white shadow-sm"
                />
              ))}
            </div>
          </div>

          {/* Story Section */}
          <div className="bg-white p-6 shadow-lg border-t border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">{currentImage.title}</h3>
            <p className="text-gray-700 leading-relaxed text-base">{currentImage.story}</p>
          </div>
        </div>

        {/* Profile Info Section */}
        <div className="bg-white p-6 space-y-6 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">{user.name[0]}</span>
                </div>
                {user.online && (
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full shadow-sm"></div>
                )}
              </div>
              <div>
                <div className="flex items-center space-x-3">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {user.name}, {user.age}
                  </h1>
                  {user.verified && (
                    <div className="w-7 h-7 bg-blue-500 rounded-xl flex items-center justify-center shadow-md">
                      <Shield className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2 text-gray-600 mt-1">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm font-semibold">{user.location}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Quote className="w-5 h-5 text-slate-600" />
              <h3 className="font-bold text-gray-900">About Me</h3>
            </div>
            <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">{user.bio}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div className="flex items-center space-x-2">
                <Briefcase className="w-4 h-4 text-slate-600" />
                <span className="font-semibold text-gray-900 text-sm">Work</span>
              </div>
              <p className="text-gray-700 text-sm font-medium">{user.job}</p>
            </div>
            <div className="space-y-2 bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div className="flex items-center space-x-2">
                <GraduationCap className="w-4 h-4 text-slate-600" />
                <span className="font-semibold text-gray-900 text-sm">Education</span>
              </div>
              <p className="text-gray-700 text-sm font-medium">{user.education}</p>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-3">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {user.interests.slice(0, 6).map((interest, index) => {
                const IconComponent = interestIcons[interest] || Heart
                return (
                  <span
                    key={index}
                    className="flex items-center space-x-2 px-3 py-2 bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 border border-slate-200 shadow-sm"
                  >
                    <IconComponent className="w-3 h-3" />
                    <span>{interest}</span>
                  </span>
                )
              })}
              {user.interests.length > 6 && (
                <span className="px-3 py-2 bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 border border-slate-200 shadow-sm">
                  +{user.interests.length - 6}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Refresh Button */}
      <div className="fixed bottom-28 right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRefresh}
          className="w-16 h-16 bg-gradient-to-br from-slate-600 to-slate-800 rounded-2xl flex items-center justify-center text-white shadow-xl hover:shadow-2xl transition-all duration-300"
        >
          <RefreshCw className="w-7 h-7" />
        </motion.button>
      </div>

      {/* Like Modal */}
      <AnimatePresence>
        {showLikeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setShowLikeModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-6">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-red-500 rounded-3xl flex items-center justify-center mx-auto shadow-xl">
                  <Heart className="w-10 h-10 text-white fill-current" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Like this photo?</h3>
                  <p className="text-gray-600">Show {user.name} that you're interested!</p>
                </div>
                <div className="space-y-3">
                  <Button
                    onClick={handleLike}
                    className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold rounded-2xl py-3 shadow-lg"
                  >
                    <Heart className="w-4 h-4 mr-2 fill-current" />
                    Send Like
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowLikeModal(false)}
                    className="w-full border-2 border-gray-200 text-gray-700 hover:bg-gray-50 rounded-2xl py-2 font-semibold"
                  >
                    Maybe Later
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Enhanced Match Modal Component
const MatchModal = ({ matchedUser, onClose, onMessage }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.7, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.7, opacity: 0, y: 50 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl border border-gray-100"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="space-y-8">
            {/* Enhanced Match Animation */}
            <div className="relative">
              <div className="flex justify-center space-x-6">
                <motion.div
                  initial={{ x: -100, opacity: 0, rotate: -20 }}
                  animate={{ x: 0, opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-24 h-24 rounded-3xl overflow-hidden border-4 border-pink-500 shadow-xl"
                >
                  <Image
                    src={matchedUser.images[0].url || "/placeholder.svg"}
                    alt={matchedUser.name}
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                </motion.div>
                <motion.div
                  initial={{ x: 100, opacity: 0, rotate: 20 }}
                  animate={{ x: 0, opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-24 h-24 rounded-3xl overflow-hidden border-4 border-blue-500 shadow-xl"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face"
                    alt="You"
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                </motion.div>
              </div>

              {/* Enhanced Animated Heart */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 15 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-pink-500 to-red-500 rounded-3xl flex items-center justify-center shadow-xl border-4 border-white"
              >
                <Heart className="w-8 h-8 text-white fill-current" />
              </motion.div>

              {/* Enhanced Sparkle Effects */}
              {[
                { delay: 0.7, position: "-top-2 -left-2", color: "text-yellow-400" },
                { delay: 0.8, position: "-top-2 -right-2", color: "text-purple-400" },
                { delay: 0.9, position: "-bottom-2 -left-2", color: "text-blue-400" },
                { delay: 1.0, position: "-bottom-2 -right-2", color: "text-pink-400" },
              ].map((sparkle, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: sparkle.delay, type: "spring", stiffness: 200 }}
                  className={`absolute ${sparkle.position}`}
                >
                  <Sparkles className={`w-6 h-6 ${sparkle.color}`} />
                </motion.div>
              ))}
            </div>

            {/* Enhanced Match Text */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
              className="space-y-4"
            >
              <h2 className="text-4xl font-bold text-gray-900 tracking-tight">It's a Match! 🎉</h2>
              <p className="text-gray-600 text-lg font-medium">You and {matchedUser.name} liked each other</p>
            </motion.div>

            {/* Enhanced Action Buttons */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
              className="space-y-4"
            >
              <Button
                onClick={onMessage}
                className="w-full bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-slate-950 text-white font-bold rounded-2xl py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageCircle className="w-5 h-5 mr-3" />
                Send Message
              </Button>
              <Button
                variant="outline"
                onClick={onClose}
                className="w-full border-2 border-gray-200 text-gray-700 hover:bg-gray-50 rounded-2xl py-3 font-semibold text-lg transition-all duration-300 bg-transparent transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Keep Browsing
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
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
              <h3 className="font-bold text-gray-900 truncate text-lg tracking-tight">{match.user.name}</h3>
              <span className="text-xs text-gray-500 font-medium">
                {new Date(match.lastMessage.timestamp).toLocaleDateString()}
              </span>
            </div>
            <p className="text-sm text-gray-600 truncate font-medium mt-1">{match.lastMessage.text}</p>
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
    <div className="flex flex-col h-screen bg-gray-50 lg:pl-72">
      {/* Enhanced Chat Header */}
      <div className="bg-white/95 backdrop-blur-xl border-b border-gray-100/50 p-4 shadow-sm">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="p-2 hover:bg-gray-100/80 rounded-xl transition-all duration-200 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 text-gray-700" />
          </Button>
          <Avatar className="w-10 h-10 ring-2 ring-gray-100">
            <AvatarImage src={match.user.images[0].url || "/placeholder.svg"} alt={match.user.name} />
            <AvatarFallback className="bg-gray-100 text-gray-600 font-semibold">{match.user.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 tracking-tight text-base">{match.user.name}</h3>
            <p className="text-xs text-gray-500 font-medium">{match.user.lastSeen}</p>
          </div>
          <div className="flex space-x-1">
            <Button
              variant="ghost"
              size="sm"
              className="p-2 hover:bg-gray-100/80 rounded-xl transition-all duration-200 active:scale-95"
            >
              <Phone className="w-4 h-4 text-gray-700" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="p-2 hover:bg-gray-100/80 rounded-xl transition-all duration-200 active:scale-95"
            >
              <Video className="w-4 h-4 text-gray-700" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="p-2 hover:bg-gray-100/80 rounded-xl transition-all duration-200 active:scale-95"
            >
              <MoreHorizontal className="w-4 h-4 text-gray-700" />
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
      <div className="bg-white/95 backdrop-blur-xl border-t border-gray-100/50 p-6 shadow-sm">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="p-3 hover:bg-gray-100/80 rounded-xl transition-all duration-200 active:scale-95"
          >
            <Plus className="w-5 h-5 text-gray-700" />
          </Button>
          <div className="flex-1 relative">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="pr-14 rounded-2xl border-gray-200 bg-gray-50 focus:bg-white transition-all duration-200 font-medium py-3 text-base"
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <Button
              onClick={sendMessage}
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl w-10 h-10 p-0 bg-gradient-to-br from-slate-700 to-slate-900 hover:from-slate-800 hover:to-slate-950 transition-all duration-200 active:scale-95"
              disabled={!newMessage.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Enhanced Profile Settings Component
const ProfileSettings = ({ onBack }) => {
  const [profile, setProfile] = useState({
    name: "John",
    age: 28,
    bio: "Software engineer who loves hiking and photography",
    job: "Software Engineer",
    education: "Stanford University",
    height: "6'0\"",
    interests: ["Technology", "Hiking", "Photography", "Travel"],
  })

  return (
    <div className={`min-h-screen bg-gray-50 ${sidebarPadWithTransition}`}>
      <Header title="Edit Profile" onBack={onBack} />

      <div className="pt-18 pb-24 px-6 max-w-2xl mx-auto">
        <div className="space-y-8">
          {/* Enhanced Profile Photos */}
          <Card className="p-8 bg-white shadow-sm border border-gray-100 rounded-3xl">
            <h3 className="font-bold mb-6 text-gray-900 tracking-tight text-xl">Photos</h3>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="aspect-square bg-gray-50 rounded-3xl flex items-center justify-center border-2 border-dashed border-gray-200 hover:border-slate-400 transition-all duration-200 cursor-pointer"
                >
                  {index === 1 ? (
                    <Image
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
                      alt="Profile"
                      width={200}
                      height={200}
                      className="w-full h-full object-cover rounded-3xl"
                    />
                  ) : (
                    <Camera className="w-8 h-8 text-gray-400" />
                  )}
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Enhanced Basic Info */}
          <Card className="p-8 bg-white shadow-sm border border-gray-100 rounded-3xl">
            <h3 className="font-bold mb-6 text-gray-900 tracking-tight text-xl">Basic Information</h3>
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Name</label>
                <Input
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="border-gray-200 focus:border-slate-400 rounded-xl font-medium"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Age</label>
                <Input
                  type="number"
                  value={profile.age}
                  onChange={(e) => setProfile({ ...profile, age: Number.parseInt(e.target.value) })}
                  className="border-gray-200 focus:border-slate-400 rounded-xl font-medium"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Bio</label>
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-xl resize-none h-24 focus:border-slate-400 focus:outline-none transition-all duration-200 font-medium"
                  placeholder="Tell us about yourself..."
                />
              </div>
            </div>
          </Card>

          {/* Enhanced Work & Education */}
          <Card className="p-8 bg-white shadow-sm border border-gray-100 rounded-3xl">
            <h3 className="font-bold mb-6 text-gray-900 tracking-tight text-xl">Work & Education</h3>
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Job Title</label>
                <Input
                  value={profile.job}
                  onChange={(e) => setProfile({ ...profile, job: e.target.value })}
                  className="border-gray-200 focus:border-slate-400 rounded-xl font-medium"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Education</label>
                <Input
                  value={profile.education}
                  onChange={(e) => setProfile({ ...profile, education: e.target.value })}
                  className="border-gray-200 focus:border-slate-400 rounded-xl font-medium"
                />
              </div>
            </div>
          </Card>

          {/* Enhanced Interests */}
          <Card className="p-8 bg-white shadow-sm border border-gray-100 rounded-3xl">
            <h3 className="font-bold mb-6 text-gray-900 tracking-tight text-xl">Interests</h3>
            <div className="grid grid-cols-2 gap-3">
              {Object.keys(interestIcons).map((interest) => {
                const IconComponent = interestIcons[interest]
                const isSelected = profile.interests.includes(interest)
                return (
                  <motion.button
                    key={interest}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      if (isSelected) {
                        setProfile({
                          ...profile,
                          interests: profile.interests.filter((i) => i !== interest),
                        })
                      } else {
                        setProfile({
                          ...profile,
                          interests: [...profile.interests, interest],
                        })
                      }
                    }}
                    className={cn(
                      "flex items-center space-x-3 p-4 rounded-2xl border-2 transition-all duration-200",
                      isSelected
                        ? "border-slate-400 bg-slate-50 text-slate-700 shadow-sm"
                        : "border-gray-200 hover:border-slate-300",
                    )}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="text-sm font-medium">{interest}</span>
                  </motion.button>
                )
              })}
            </div>
          </Card>

          {/* Enhanced Save Button */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button className="w-full py-4 rounded-2xl font-semibold bg-gradient-to-br from-slate-700 to-slate-900 hover:from-slate-800 hover:to-slate-950 text-white shadow-xl hover:shadow-2xl transition-all duration-300">
              Save Changes
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// Enhanced Filters Component
const FiltersComponent = ({ onBack }) => {
  const [filters, setFilters] = useState({
    ageRange: [22, 35],
    distance: 25,
    interests: [],
    education: "",
    height: [60, 84], // inches
  })

  return (
    <div className={`min-h-screen bg-gray-50 ${sidebarPadWithTransition}`}>
      <Header title="Filters" onBack={onBack} />

      <div className="pt-18 pb-24 px-6 max-w-2xl mx-auto">
        <div className="space-y-8">
          {/* Enhanced Age Range */}
          <Card className="p-8 bg-white shadow-sm border border-gray-100 rounded-3xl">
            <h3 className="font-bold mb-6 text-gray-900 tracking-tight text-xl">Age Range</h3>
            <div className="space-y-6">
              <div className="flex justify-between text-sm text-gray-600 font-medium">
                <span>{filters.ageRange[0]} years</span>
                <span>{filters.ageRange[1]} years</span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="18"
                  max="50"
                  value={filters.ageRange[0]}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      ageRange: [Number.parseInt(e.target.value), filters.ageRange[1]],
                    })
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider accent-slate-600"
                />
              </div>
            </div>
          </Card>

          {/* Enhanced Distance */}
          <Card className="p-8 bg-white shadow-sm border border-gray-100 rounded-3xl">
            <h3 className="font-bold mb-6 text-gray-900 tracking-tight text-xl">Distance</h3>
            <div className="space-y-6">
              <div className="flex justify-between text-sm text-gray-600 font-medium">
                <span>1 mile</span>
                <span>{filters.distance} miles</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={filters.distance}
                onChange={(e) => setFilters({ ...filters, distance: Number.parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider accent-slate-600"
              />
            </div>
          </Card>

          {/* Enhanced Interests Filter */}
          <Card className="p-8 bg-white shadow-sm border border-gray-100 rounded-3xl">
            <h3 className="font-bold mb-6 text-gray-900 tracking-tight text-xl">Interests</h3>
            <div className="grid grid-cols-2 gap-3">
              {Object.keys(interestIcons)
                .slice(0, 8)
                .map((interest) => {
                  const IconComponent = interestIcons[interest]
                  const isSelected = filters.interests.includes(interest)
                  return (
                    <motion.button
                      key={interest}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        if (isSelected) {
                          setFilters({
                            ...filters,
                            interests: filters.interests.filter((i) => i !== interest),
                          })
                        } else {
                          setFilters({
                            ...filters,
                            interests: [...filters.interests, interest],
                          })
                        }
                      }}
                      className={cn(
                        "flex items-center space-x-3 p-4 rounded-2xl border-2 transition-all duration-200",
                        isSelected
                          ? "border-slate-400 bg-slate-50 text-slate-700 shadow-sm"
                          : "border-gray-200 hover:border-slate-300",
                      )}
                    >
                      <IconComponent className="w-5 h-5" />
                      <span className="text-sm font-medium">{interest}</span>
                    </motion.button>
                  )
                })}
            </div>
          </Card>

          {/* Enhanced Apply Filters Button */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button className="w-full py-4 rounded-2xl font-semibold bg-gradient-to-br from-slate-700 to-slate-900 hover:from-slate-800 hover:to-slate-950 text-white shadow-xl hover:shadow-2xl transition-all duration-300">
              Apply Filters
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// Enhanced Bottom Navigation Component (Mobile Only)
const BottomNavigation = ({ activeTab, onTabChange, onShowFilters }) => {
  const tabs = [
    { id: "discover", icon: Heart, label: "Discover" },
    { id: "matches", icon: Users, label: "Matches" },
    { id: "messages", icon: MessageCircle, label: "Messages" },
    { id: "profile", icon: User, label: "Profile" },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-100/50 shadow-lg z-30 lg:hidden">
      <div className="max-w-md mx-auto px-4">
        <div className="flex items-center justify-around h-20">
          {tabs.map((tab) => {
            const IconComponent = tab.icon
            const isActive = activeTab === tab.id
            return (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "flex flex-col items-center space-y-2 p-3 rounded-2xl transition-all duration-200",
                  isActive ? "text-slate-700 bg-slate-50" : "text-gray-500 hover:text-gray-700",
                )}
              >
                <IconComponent className={cn("w-6 h-6", isActive && "fill-current")} />
                <span className="text-xs font-semibold tracking-tight">{tab.label}</span>
              </motion.button>
            )
          })}
          
          {/* Filter Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onShowFilters}
            className="flex flex-col items-center space-y-2 p-3 rounded-2xl transition-all duration-200 text-gray-500 hover:text-gray-700"
          >
            <Filter className="w-6 h-6" />
            <span className="text-xs font-semibold tracking-tight">Filters</span>
          </motion.button>
        </div>
      </div>
    </div>
  )
}

// Main Dating App Component
export default function DatingApp() {
  const [users, setUsers] = useState(mockUsers)
  const [currentUserIndex, setCurrentUserIndex] = useState(0)
  const [matchedUser, setMatchedUser] = useState(null)
  const [showMatchModal, setShowMatchModal] = useState(false)
  const [activeTab, setActiveTab] = useState("discover")
  const [selectedMatch, setSelectedMatch] = useState(null)
  const [showProfile, setShowProfile] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true)

  const currentUser = users[currentUserIndex]

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Dynamic sidebar padding class
  const sidebarPad = !isMobile ? (sidebarCollapsed ? "pl-24" : "pl-72") : ""
  const sidebarPadWithTransition = !isMobile ? `${sidebarPad} transition-all duration-300 ease-in-out` : ""

  const handleLike = () => {
    // Simulate match (30% chance)
    if (Math.random() < 0.3) {
      setMatchedUser(currentUser)
      setTimeout(() => setShowMatchModal(true), 300)
    }

    // Move to next user
    setTimeout(() => {
      setCurrentUserIndex((prev) => prev + 1)
    }, 300)
  }

  const handleRefresh = () => {
    setCurrentUserIndex((prev) => prev + 1)
  }

  const closeMatchModal = () => {
    setShowMatchModal(false)
    setMatchedUser(null)
  }

  const handleMessage = () => {
    closeMatchModal()
    setActiveTab("messages")
  }

  const handleSelectMatch = (match) => {
    setSelectedMatch(match)
  }

  const handleBackFromChat = () => {
    setSelectedMatch(null)
  }

  const handleBackFromProfile = () => {
    setShowProfile(false)
  }

  const handleBackFromFilters = () => {
    setShowFilters(false)
  }

  // Reset when we run out of users
  useEffect(() => {
    if (currentUserIndex >= users.length) {
      setCurrentUserIndex(0)
    }
  }, [currentUserIndex, users.length])

  // Show chat if a match is selected
  if (selectedMatch) {
    return (
      <>
        <DesktopSidebar activeTab={activeTab} onTabChange={setActiveTab} collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
        <Chat match={selectedMatch} onBack={handleBackFromChat} />
      </>
    )
  }

  // Show profile settings
  if (showProfile) {
    return (
      <>
        <DesktopSidebar activeTab={activeTab} onTabChange={setActiveTab} collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
        <ProfileSettings onBack={handleBackFromProfile} />
      </>
    )
  }

  // Show filters
  if (showFilters) {
    return (
      <>
        <DesktopSidebar activeTab={activeTab} onTabChange={setActiveTab} collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
        <FiltersComponent onBack={handleBackFromFilters} />
      </>
    )
  }

  // Discover Tab
  if (activeTab === "discover") {
    if (!currentUser) {
      return (
        <div className={`min-h-screen bg-gray-50 flex items-center justify-center ${sidebarPadWithTransition}`}>
          <div className="text-center space-y-6 p-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="w-24 h-24 bg-gradient-to-br from-slate-600 to-slate-800 rounded-3xl flex items-center justify-center mx-auto shadow-2xl"
            >
              <Heart className="w-12 h-12 text-white" />
            </motion.div>
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-gray-900 tracking-tight"
            >
              No more profiles
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-600 text-lg font-medium"
            >
              Check back later for new matches!
            </motion.p>
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
              <Button
                onClick={() => setCurrentUserIndex(0)}
                className="bg-gradient-to-br from-slate-700 to-slate-900 hover:from-slate-800 hover:to-slate-950 text-white rounded-2xl px-8 py-4 font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <Zap className="w-5 h-5 mr-2" />
                Refresh
              </Button>
            </motion.div>
          </div>
          <DesktopSidebar activeTab={activeTab} onTabChange={setActiveTab} collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
          <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} onShowFilters={() => setShowFilters(true)} />
        </div>
      )
    }

    return (
      <>
        <DesktopSidebar activeTab={activeTab} onTabChange={setActiveTab} collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
        {isMobile ? (
          <MobileProfileLayout user={currentUser} onLike={handleLike} onRefresh={handleRefresh} />
        ) : (
          <DesktopProfileLayout user={currentUser} onLike={handleLike} onRefresh={handleRefresh} sidebarPadWithTransition={sidebarPadWithTransition} />
        )}

        {/* Match Modal */}
        {showMatchModal && matchedUser && (
          <MatchModal matchedUser={matchedUser} onClose={closeMatchModal} onMessage={handleMessage} />
        )}

        <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} onShowFilters={() => setShowFilters(true)} />
      </>
    )
  }

  // Matches Tab
  if (activeTab === "matches") {
    return (
      <div className={`min-h-screen bg-gray-50 ${sidebarPadWithTransition}`}>
        <DesktopSidebar activeTab={activeTab} onTabChange={setActiveTab} collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
        <Header title="Matches" />
        <div className="pt-18 pb-32 px-6">
          <div className="max-w-2xl mx-auto">
            <MatchesList matches={mockMatches} onSelectMatch={handleSelectMatch} />
          </div>
        </div>
        <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} onShowFilters={() => setShowFilters(true)} />
      </div>
    )
  }

  // Messages Tab
  if (activeTab === "messages") {
    return (
      <div className={`min-h-screen bg-gray-50 ${sidebarPadWithTransition}`}>
        <DesktopSidebar activeTab={activeTab} onTabChange={setActiveTab} collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
        <Header title="Messages" />
        <div className="pt-18 pb-32 px-6">
          <div className="max-w-2xl mx-auto">
            <MatchesList matches={mockMatches} onSelectMatch={handleSelectMatch} />
          </div>
        </div>
        <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} onShowFilters={() => setShowFilters(true)} />
      </div>
    )
  }

  // Profile Tab
  if (activeTab === "profile") {
    return (
      <div className={`min-h-screen bg-gray-50 ${sidebarPadWithTransition}`}>
        <DesktopSidebar activeTab={activeTab} onTabChange={setActiveTab} collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
        <Header title="Profile" />
        <div className="pt-18 pb-32 px-6">
          <div className="max-w-2xl mx-auto space-y-8">
            {/* Enhanced Profile Preview */}
            <Card className="p-8 bg-white shadow-sm border border-gray-100 rounded-3xl">
              <div className="flex items-center space-x-6 mb-8">
                <Avatar className="w-20 h-20 ring-2 ring-gray-100">
                  <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" />
                  <AvatarFallback className="bg-gray-100 text-gray-600 font-semibold">JD</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 tracking-tight">John, 28</h2>
                  <p className="text-gray-600 font-medium">Software Engineer</p>
                  <p className="text-sm text-gray-500 font-medium">Stanford University</p>
                </div>
              </div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={() => setShowProfile(true)}
                  className="w-full rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 hover:from-slate-800 hover:to-slate-950 text-white font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 py-4"
                  variant="default"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </motion.div>
            </Card>

            {/* Enhanced Settings */}
            <Card className="p-8 bg-white shadow-sm border border-gray-100 rounded-3xl">
              <h3 className="font-bold mb-6 text-gray-900 tracking-tight text-xl">Settings</h3>
              <div className="space-y-3">
                {[
                  { icon: Bell, label: "Notifications" },
                  { icon: Shield, label: "Privacy" },
                  { icon: Settings, label: "Account Settings" },
                ].map((item, index) => (
                  <motion.button
                    key={item.label}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="flex items-center justify-between w-full p-5 hover:bg-gray-50 rounded-2xl transition-all duration-200"
                  >
                    <div className="flex items-center space-x-4">
                      <item.icon className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-900 font-medium">{item.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </motion.button>
                ))}
              </div>
            </Card>
          </div>
        </div>
        <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} onShowFilters={() => setShowFilters(true)} />
      </div>
    )
  }

  return null
}
