"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  Heart,
  MapPin,
  Shield,
  Sparkles,
  Zap,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Quote,
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
  X,
  ChevronDown,
  Star,
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

// Interest icons mapping
const interestIcons = {
  Hiking: Mountain,
  Photography: CameraIcon,
  Travel: Plane,
  Yoga: Users,
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

// Enhanced Match Modal Component
const MatchModal = ({ matchedUser, onClose, onMessage, isSuperLike }) => {
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

              {/* Enhanced Animated Heart or Star for Super Like */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 15 }}
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 ${isSuperLike ? "bg-gradient-to-br from-blue-500 to-cyan-400" : "bg-gradient-to-br from-pink-500 to-red-500"} rounded-3xl flex items-center justify-center shadow-xl border-4 border-white`}
              >
                {isSuperLike ? (
                  <Star className="w-8 h-8 text-white fill-current" />
                ) : (
                  <Heart className="w-8 h-8 text-white fill-current" />
                )}
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
              <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
                {isSuperLike ? "Super Like! 🌟" : "It's a Match! 🎉"}
              </h2>
              <p className="text-gray-600 text-lg font-medium">
                {isSuperLike
                  ? `You sent a Super Like to ${matchedUser.name} and it's an instant match!`
                  : `You and ${matchedUser.name} liked each other`}
              </p>
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
                <Heart className="w-5 h-5 mr-3" />
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

// Desktop Profile Layout Component (unchanged)
const DesktopProfileLayout = ({ user, onLike, onRefresh, onSuperLike, isMobile, superLikeUsed }) => {
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
        height: rect.height,
      },
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-7">
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
                onClick={() => {
                  if (isMobile) {
                    setShowLikeModal(true)
                  } else {
                    handleLike()
                  }
                }}
                className="flex-1 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Heart className="w-6 h-6 mr-3 fill-current" />
                <span className="font-semibold">Like {user.name}</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSuperLike()}
                disabled={superLikeUsed}
                className={`flex-1 h-16 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 font-bold border-2 border-blue-200 ${superLikeUsed ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Star className="w-6 h-6 mr-3 fill-current" />
                <span className="font-semibold">Super Like</span>
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
              initial={
                clickedPhotoRef
                  ? {
                      x: clickedPhotoRef.rect.left - window.innerWidth / 2 + clickedPhotoRef.rect.width / 2,
                      y: clickedPhotoRef.rect.top - window.innerHeight / 2 + clickedPhotoRef.rect.height / 2,
                      width: clickedPhotoRef.rect.width,
                      height: clickedPhotoRef.rect.height,
                      scale: 1,
                    }
                  : { scale: 0.8, opacity: 0, y: 50 }
              }
              animate={{
                x: 0,
                y: 0,
                width: "100%",
                height: "100%",
                scale: 1,
              }}
              exit={
                clickedPhotoRef
                  ? {
                      x: clickedPhotoRef.rect.left - window.innerWidth / 2 + clickedPhotoRef.rect.width / 2,
                      y: clickedPhotoRef.rect.top - window.innerHeight / 2 + clickedPhotoRef.rect.height / 2,
                      width: clickedPhotoRef.rect.width,
                      height: clickedPhotoRef.rect.height,
                      scale: 1,
                    }
                  : { scale: 0.8, opacity: 0, y: 50 }
              }
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                duration: 0.6,
              }}
              className="relative max-w-4xl w-full h-[80vh] overflow-hidden shadow-2xl"
              style={{
                borderRadius: clickedPhotoRef ? "16px" : "24px",
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

      {/* Like Modal (only for mobile) */}
      {isMobile && (
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
      )}
    </div>
  )
}

const MAX_SWIPE_X = 60; // Maximum px translation for swipe
const MAX_ROTATE = 3; // Maximum degrees rotation

const MobileSwipeLayout = ({ user, onLike, onRefresh, onSuperLike, superLikeUsed }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showProfile, setShowProfile] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [swipeDirection, setSwipeDirection] = useState(null)
  const [profileImageIndex, setProfileImageIndex] = useState(0)
  const [isProfileImageDragging, setIsProfileImageDragging] = useState(false)
  const [showSuperLikeModal, setShowSuperLikeModal] = useState(false)

  // --- SWIPE LOGIC ---
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % user.images.length)
  }
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + user.images.length) % user.images.length)
  }
  const handleDragStart = () => {
    setIsDragging(true)
    setSwipeDirection(null)
  }
  const handleDrag = (event, info) => {
    let { x } = info.offset
    // Clamp x to max
    if (x > MAX_SWIPE_X) x = MAX_SWIPE_X
    if (x < -MAX_SWIPE_X) x = -MAX_SWIPE_X
    setDragOffset({ x, y: 0 })
    if (Math.abs(x) > 16) {
      setSwipeDirection(x > 0 ? "right" : "left")
    } else {
      setSwipeDirection(null)
    }
  }
  const handleDragEnd = (event, info) => {
    setIsDragging(false)
    setDragOffset({ x: 0, y: 0 })
    setSwipeDirection(null)
    const swipeThreshold = 40
    const velocityThreshold = 250
    const { x } = info.offset
    const { x: velocityX } = info.velocity
    if (Math.abs(x) > swipeThreshold || Math.abs(velocityX) > velocityThreshold) {
      if (x > 0 || velocityX > velocityThreshold) {
        if (navigator.vibrate) navigator.vibrate(30)
        onLike()
      } else if (x < 0 || velocityX < -velocityThreshold) {
        if (navigator.vibrate) navigator.vibrate(30)
        onRefresh()
      }
    }
  }
  const handleImageTap = (event) => {
    if (isDragging) return
    const rect = event.currentTarget.getBoundingClientRect()
    const tapX = event.clientX - rect.left
    const cardWidth = rect.width
    if (tapX > cardWidth / 2) {
      nextImage()
    } else {
      prevImage()
    }
  }
  const handleCardTap = () => {
    if (!isDragging) {
      setProfileImageIndex(currentImageIndex)
      setShowProfile(true)
    }
  }
  const nextProfileImage = () => {
    setProfileImageIndex((prev) => (prev + 1) % user.images.length)
  }
  const prevProfileImage = () => {
    setProfileImageIndex((prev) => (prev - 1 + user.images.length) % user.images.length)
  }

  // Handle browser back button to close profile modal
  useEffect(() => {
    if (!showProfile) return
    // Push a new state to history when profile modal opens
    window.history.pushState({ profileModal: true }, "");
    const handlePopState = (e) => {
      setShowProfile(false)
    }
    window.addEventListener("popstate", handlePopState)
    return () => {
      window.removeEventListener("popstate", handlePopState)
      // If modal is closing, go back in history if we pushed a state
      if (window.history.state && window.history.state.profileModal) {
        window.history.back()
      }
    }
  }, [showProfile])

  return (
    <>
      <div className="fixed inset-0 bg-gray-50 flex items-center justify-center z-10 overflow-hidden">
        {/* Main Card Container - slightly above center for better balance */}
        <div className="w-full flex items-center justify-center p-4" style={{ minHeight: '100vh', alignItems: 'flex-start' }}>
          <div style={{ marginTop: '8vh', width: '100%' }}>
            <motion.div
              className="relative w-full max-w-sm h-[75vh] bg-white rounded-2xl shadow-2xl overflow-hidden cursor-pointer"
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.04}
              dragMomentum={false}
              onDragStart={handleDragStart}
              onDrag={handleDrag}
              onDragEnd={handleDragEnd}
              animate={{
                x: dragOffset.x,
                y: 0,
                rotate: (dragOffset.x / MAX_SWIPE_X) * MAX_ROTATE,
                scale: isDragging ? 1.01 : 1,
              }}
              transition={{
                type: "spring",
                stiffness: 700,
                damping: 40,
                duration: isDragging ? 0 : 0.25,
              }}
              onClick={handleCardTap}
              whileTap={{ scale: 0.98 }}
              style={{ transformOrigin: "center bottom" }}
            >
              {/* Cover Image */}
              <div className="relative h-full overflow-hidden" onClick={handleImageTap}>
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={user.images[currentImageIndex].url || "/placeholder.svg"}
                    alt={`${user.name}`}
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority={true}
                  />
                </motion.div>
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                {/* Image Progress Indicators */}
                <div className="absolute top-4 left-4 right-4 flex space-x-1 z-10">
                  {user.images.map((_, index) => (
                    <motion.div
                      key={index}
                      className={cn(
                        "flex-1 h-1.5 rounded-full transition-all duration-300",
                        index === currentImageIndex ? "bg-white shadow-lg" : "bg-white/30",
                      )}
                      animate={{
                        scale: index === currentImageIndex ? 1.15 : 1,
                      }}
                    />
                  ))}
                </div>
                {/* Polished Swipe Direction Overlays */}
                <AnimatePresence>
                  {swipeDirection && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 0.9, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.7 }}
                      className={cn(
                        "absolute inset-0 flex items-center justify-center backdrop-blur-[2px]",
                        swipeDirection === "right" ? "bg-green-400/20" : "bg-red-400/20",
                      )}
                    >
                      <motion.div
                        initial={{ scale: 0.7, rotate: -180 }}
                        animate={{ scale: [0.7, 1.1, 1], rotate: 0 }}
                        transition={{ scale: { duration: 0.22, ease: "easeOut" }, rotate: { duration: 0.18 } }}
                        className={cn(
                          "w-20 h-20 rounded-full flex items-center justify-center border-4 shadow-2xl",
                          swipeDirection === "right"
                            ? "bg-green-500 border-green-300 shadow-green-500/40"
                            : "bg-red-500 border-red-300 shadow-red-500/40",
                        )}
                      >
                        {swipeDirection === "right" ? (
                          <Heart className="w-10 h-10 text-white fill-current drop-shadow-lg" />
                        ) : (
                          <X className="w-10 h-10 text-white drop-shadow-lg" />
                        )}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
                {/* Basic Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <h1 className="text-3xl font-bold text-white drop-shadow-lg">
                        {user.name}, {user.age}
                      </h1>
                      {user.verified && (
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                          <Shield className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                    {user.online && <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg animate-pulse"></div>}
                  </div>
                  <div className="flex items-center space-x-2 text-white/90 mb-4">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-medium">{user.location}</span>
                  </div>
                  <motion.div
                    className="flex items-center justify-center space-x-2 text-white/70 text-sm"
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span>Tap to view profile</span>
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
            {/* Floating Super Like button - only on card view, not in profile modal */}
            {!showProfile && (
              <button
                className={`fixed bottom-28 right-6 z-30 w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 shadow-xl flex items-center justify-center border-4 border-white transition-all duration-200 ${superLikeUsed ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}`}
                onClick={() => !superLikeUsed && setShowSuperLikeModal(true)}
                disabled={superLikeUsed}
                aria-label="Super Like"
                style={{ boxShadow: '0 8px 32px 0 rgba(0, 120, 255, 0.18)' }}
              >
                <Star className="w-8 h-8 text-white fill-current" />
              </button>
            )}
          </div>
        </div>
        {/* Enhanced Swipe Instructions */}
        <motion.div
          className="fixed bottom-32 left-0 right-0 flex justify-center px-8 z-20 pointer-events-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
        </motion.div>
      </div>
      {/* Super Like Confirmation Modal */}
      <AnimatePresence>
        {showSuperLikeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setShowSuperLikeModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-3xl flex items-center justify-center mx-auto shadow-xl mb-4">
                <Star className="w-10 h-10 text-white fill-current" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Send Super Like?</h3>
              <p className="text-gray-600 mb-6">Super Like instantly matches you with this person. You have 1 Super Like per session.</p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowSuperLikeModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    setShowSuperLikeModal(false)
                    onSuperLike()
                  }}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold"
                  disabled={superLikeUsed}
                >
                  Super Like
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* --- PROFILE MODAL GALLERY IMPROVEMENTS --- */}
      <AnimatePresence>
        {showProfile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50"
            onClick={() => setShowProfile(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute inset-0 bg-white overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-full overflow-y-auto">
                {/* Gallery Section - Full Screen */}
                <div className="relative h-[60vh] flex items-center justify-center bg-slate-100">
                  {/* Main Image with Swipe Navigation */}
                  <div
                    className="relative h-[90%] w-[90%] max-w-md mx-auto rounded-2xl overflow-hidden shadow-xl flex items-center justify-center"
                    onClick={() => nextProfileImage()}
                    style={{ touchAction: 'pan-y' }}
                  >
                    <motion.div
                      key={profileImageIndex}
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.25 }}
                      className="relative w-full h-full"
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.12}
                      onDragStart={() => setIsProfileImageDragging(true)}
                      onDragEnd={(event, info) => {
                        setIsProfileImageDragging(false)
                        const threshold = 40
                        const velocity = Math.abs(info.velocity.x)
                        if (Math.abs(info.offset.x) > threshold || velocity > 180) {
                          if (info.offset.x > 0 || info.velocity.x > 180) {
                            prevProfileImage()
                          } else {
                            nextProfileImage()
                          }
                        }
                      }}
                      whileDrag={{ scale: 0.98 }}
                    >
                      <Image
                        src={user.images[profileImageIndex].url || "/placeholder.svg"}
                        alt={`${user.name} - ${user.images[profileImageIndex].title}`}
                        fill
                        className="object-cover rounded-2xl select-none"
                        sizes="100vw"
                        draggable={false}
                      />
                      {/* Swipe hint overlay */}
                      {isProfileImageDragging && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute inset-0 bg-black/10 backdrop-blur-[1px] flex items-center justify-center rounded-2xl"
                        >
                          <div className="bg-white/30 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30">
                            <span className="text-white text-sm font-medium">← Swipe to navigate →</span>
                          </div>
                        </motion.div>
                      )}
                      {/* Left/Right arrow overlays as cues */}
                      <div className="absolute left-2 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                        <div className="bg-black/30 rounded-full p-1 flex items-center justify-center">
                          <ChevronLeft className="w-5 h-5 text-white/80" />
                        </div>
                      </div>
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                        <div className="bg-black/30 rounded-full p-1 flex items-center justify-center">
                          <ChevronRight className="w-5 h-5 text-white/80" />
                        </div>
                      </div>
                    </motion.div>
                    {/* Close Button, Counter, Progress overlays unchanged */}
                    {/* Close Button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowProfile(false)}
                      className="absolute top-4 right-4 w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/30 shadow-lg z-10"
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                    {/* Image Counter */}
                    <div className="absolute top-4 left-4 z-10">
                      <div className="px-3 py-1 bg-black/40 backdrop-blur-sm rounded-full border border-white/30">
                        <span className="text-white text-xs font-bold">
                          {profileImageIndex + 1} / {user.images.length}
                        </span>
                      </div>
                    </div>
                    {/* Enhanced Image Progress Indicators */}
                    <div className="absolute bottom-4 left-4 right-4 flex space-x-2 z-10 justify-center">
                      {user.images.map((_, index) => (
                        <motion.button
                          key={index}
                          onClick={() => setProfileImageIndex(index)}
                          className={cn(
                            "h-2 w-6 rounded-full transition-all duration-300 border border-white/30",
                            index === profileImageIndex ? "bg-white shadow-lg" : "bg-white/30",
                          )}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          animate={{
                            scale: index === profileImageIndex ? 1.1 : 1,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                {/* Photo description below photo */}
                <div className="max-w-md mx-auto px-4 pt-4 pb-2">
                  <motion.div
                    key={profileImageIndex}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22 }}
                  >
                    <h3 className="text-slate-900 font-bold text-lg mb-1">
                      {user.images[profileImageIndex].title}
                    </h3>
                    <p className="text-slate-700 text-sm leading-relaxed">
                      {user.images[profileImageIndex].story}
                    </p>
                  </motion.div>
                </div>
                {/* Profile Content */}
                <div className="p-6 space-y-6 bg-white">
                  {/* Header */}
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-xl">{user.name[0]}</span>
                      </div>
                      {user.online && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-3 border-white rounded-full animate-pulse"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h2 className="text-2xl font-bold text-gray-900">
                          {user.name}, {user.age}
                        </h2>
                        {user.verified && (
                          <div className="w-7 h-7 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                            <Shield className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600 mt-2">
                        <MapPin className="w-4 h-4" />
                        <span className="text-base font-medium">{user.location}</span>
                      </div>
                    </div>
                  </div>
                  {/* Bio */}
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-base">About</h3>
                    <p className="text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-2xl text-sm">{user.bio}</p>
                  </div>
                  {/* Work & Education */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-2xl">
                      <div className="flex items-center space-x-2 mb-1">
                        <Briefcase className="w-4 h-4 text-slate-600" />
                        <span className="font-bold text-gray-900 text-xs">Work</span>
                      </div>
                      <p className="text-gray-700 font-medium text-xs">{user.job}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-2xl">
                      <div className="flex items-center space-x-2 mb-1">
                        <GraduationCap className="w-4 h-4 text-slate-600" />
                        <span className="font-bold text-gray-900 text-xs">Education</span>
                      </div>
                      <p className="text-gray-700 font-medium text-xs">{user.education}</p>
                    </div>
                  </div>
                  {/* Interests */}
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-base">Interests</h3>
                    <div className="flex flex-wrap gap-2">
                      {user.interests.map((interest, index) => {
                        const IconComponent = interestIcons[interest] || Heart
                        return (
                          <motion.span
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center space-x-2 px-3 py-2 bg-slate-100 rounded-xl font-medium text-slate-700 border border-slate-200 shadow-sm text-xs"
                          >
                            <IconComponent className="w-4 h-4" />
                            <span>{interest}</span>
                          </motion.span>
                        )
                      })}
                    </div>
                  </div>
                  {/* Bottom padding for scrolling */}
                  <div className="pb-8"></div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default function DiscoverPage() {
  const [users, setUsers] = useState(mockUsers)
  const [currentUserIndex, setCurrentUserIndex] = useState(0)
  const [matchedUser, setMatchedUser] = useState(null)
  const [showMatchModal, setShowMatchModal] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [superLikeUsed, setSuperLikeUsed] = useState(false)
  const [superLikeMatch, setSuperLikeMatch] = useState(false)

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

  const handleSuperLike = () => {
    if (superLikeUsed) return
    setSuperLikeUsed(true)
    setMatchedUser(currentUser)
    setSuperLikeMatch(true)
    setTimeout(() => setShowMatchModal(true), 300)
    setTimeout(() => {
      setCurrentUserIndex((prev) => prev + 1)
    }, 1200)
  }

  const closeMatchModal = () => {
    setShowMatchModal(false)
    setMatchedUser(null)
    setSuperLikeMatch(false)
  }

  const handleMessage = () => {
    closeMatchModal()
    // Navigate to messages would be handled by router
  }

  // Reset when we run out of users
  useEffect(() => {
    if (currentUserIndex >= users.length) {
      setCurrentUserIndex(0)
    }
  }, [currentUserIndex, users.length])

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
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
      </div>
    )
  }

  return (
    <>
      {isMobile ? (
        <MobileSwipeLayout user={currentUser} onLike={handleLike} onRefresh={handleRefresh} onSuperLike={handleSuperLike} superLikeUsed={superLikeUsed} />
      ) : (
        <DesktopProfileLayout user={currentUser} onLike={handleLike} onRefresh={handleRefresh} onSuperLike={handleSuperLike} isMobile={isMobile} superLikeUsed={superLikeUsed} />
      )}

      {/* Match Modal */}
      {showMatchModal && matchedUser && (
        <MatchModal matchedUser={matchedUser} onClose={closeMatchModal} onMessage={handleMessage} isSuperLike={superLikeMatch} />
      )}
    </>
  )
}
