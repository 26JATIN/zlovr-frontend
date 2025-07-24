"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Heart,
  MapPin,
  Shield,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  X,
  Star,
  Briefcase,
  GraduationCap,
  Mountain,
  CameraIcon,
  Plane,
  Users,
  Coffee,
  Dog,
  Palette,
  Headphones,
  Utensils,
  Book,
  Film,
  Dumbbell,
  Music,
  Code,
  Gamepad2,
} from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

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

const MAX_SWIPE_X = 60; // Maximum px translation for swipe
const MAX_ROTATE = 3; // Maximum degrees rotation

export const MobileSwipeLayout = ({ user, onLike, onRefresh, onSuperLike, superLikeUsed }) => {
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