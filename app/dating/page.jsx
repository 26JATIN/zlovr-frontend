"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Heart,
  Sparkles,
  Zap,
  Star,
} from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import Image from "next/image"
import { DesktopProfileLayout } from "./reponsive-layouts/desktop"
import { MobileSwipeLayout } from "./reponsive-layouts/mobile"

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

export default function DiscoverPage() {
  // === MAIN STATE MANAGEMENT ===
  const [users, setUsers] = useState(mockUsers)
  const [currentUserIndex, setCurrentUserIndex] = useState(0)
  const [matchedUser, setMatchedUser] = useState(null)
  const [showMatchModal, setShowMatchModal] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [superLikeUsed, setSuperLikeUsed] = useState(false)
  const [superLikeMatch, setSuperLikeMatch] = useState(false)

  // === DESKTOP SPECIFIC STATE ===
  const [showExpandedPhoto, setShowExpandedPhoto] = useState(false)
  const [expandedPhotoIndex, setExpandedPhotoIndex] = useState(0)
  const [clickedPhotoRef, setClickedPhotoRef] = useState(null)
  const [showLikeModal, setShowLikeModal] = useState(false)

  // === MOBILE SPECIFIC STATE ===
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showProfile, setShowProfile] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [swipeDirection, setSwipeDirection] = useState(null)
  const [profileImageIndex, setProfileImageIndex] = useState(0)
  const [isProfileImageDragging, setIsProfileImageDragging] = useState(false)
  const [showSuperLikeModal, setShowSuperLikeModal] = useState(false)

  const currentUser = users[currentUserIndex]

  // === DEVICE DETECTION ===
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // === CORE ACTION HANDLERS ===
  const handleLike = () => {
    // TODO: Backend API call to send like
    console.log('API: Send like to user:', currentUser.id)
    
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
    // TODO: Backend API call to skip user
    console.log('API: Skip user:', currentUser.id)
    setCurrentUserIndex((prev) => prev + 1)
  }

  const handleSuperLike = () => {
    if (superLikeUsed) return
    
    // TODO: Backend API call to send super like
    console.log('API: Send super like to user:', currentUser.id)
    
    setSuperLikeUsed(true)
    setMatchedUser(currentUser)
    setSuperLikeMatch(true)
    setTimeout(() => setShowMatchModal(true), 300)
    setTimeout(() => {
      setCurrentUserIndex((prev) => prev + 1)
    }, 1200)
  }

  const handleMessage = () => {
    // TODO: Backend API call to create conversation
    console.log('API: Create conversation with user:', matchedUser.id)
    closeMatchModal()
    // Navigate to messages would be handled by router
  }

  // === DESKTOP SPECIFIC HANDLERS ===
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

  const handleDesktopLike = () => {
    setShowLikeModal(false)
    handleLike()
  }

  const closeExpandedPhoto = () => {
    setShowExpandedPhoto(false)
    setClickedPhotoRef(null)
  }

  const nextExpandedPhoto = () => {
    setExpandedPhotoIndex((prev) => (prev + 1) % currentUser.images.length)
  }

  const prevExpandedPhoto = () => {
    setExpandedPhotoIndex((prev) => (prev - 1 + currentUser.images.length) % currentUser.images.length)
  }

  const handleDesktopLikeClick = () => {
    if (isMobile) {
      setShowLikeModal(true)
    } else {
      handleDesktopLike()
    }
  }

  // === MOBILE SPECIFIC HANDLERS ===
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % currentUser.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + currentUser.images.length) % currentUser.images.length)
  }

  const handleDragStart = () => {
    setIsDragging(true)
    setSwipeDirection(null)
  }

  const handleDrag = (event, info) => {
    const MAX_SWIPE_X = 60
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
        handleLike()
      } else if (x < 0 || velocityX < -velocityThreshold) {
        if (navigator.vibrate) navigator.vibrate(30)
        handleRefresh()
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
    setProfileImageIndex((prev) => (prev + 1) % currentUser.images.length)
  }

  const prevProfileImage = () => {
    setProfileImageIndex((prev) => (prev - 1 + currentUser.images.length) % currentUser.images.length)
  }

  const handleSuperLikeModalOpen = () => {
    if (!superLikeUsed) {
      setShowSuperLikeModal(true)
    }
  }

  const handleSuperLikeConfirm = () => {
    setShowSuperLikeModal(false)
    handleSuperLike()
  }

  // === MODAL HANDLERS ===
  const closeMatchModal = () => {
    setShowMatchModal(false)
    setMatchedUser(null)
    setSuperLikeMatch(false)
  }

  const closeProfile = () => {
    setShowProfile(false)
  }

  const closeSuperLikeModal = () => {
    setShowSuperLikeModal(false)
  }

  const closeLikeModal = () => {
    setShowLikeModal(false)
  }

  // === PROFILE IMAGE DRAG HANDLERS ===
  const handleProfileImageDragStart = () => {
    setIsProfileImageDragging(true)
  }

  const handleProfileImageDragEnd = (event, info) => {
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
  }

  const setProfileImageIndexDirect = (index) => {
    setProfileImageIndex(index)
  }

  // === BROWSER BACK BUTTON HANDLER ===
  useEffect(() => {
    if (!showProfile) return
    window.history.pushState({ profileModal: true }, "")
    const handlePopState = (e) => {
      setShowProfile(false)
    }
    window.addEventListener("popstate", handlePopState)
    return () => {
      window.removeEventListener("popstate", handlePopState)
      if (window.history.state && window.history.state.profileModal) {
        window.history.back()
      }
    }
  }, [showProfile])

  // === RESET USERS WHEN END REACHED ===
  useEffect(() => {
    if (currentUserIndex >= users.length) {
      setCurrentUserIndex(0)
    }
  }, [currentUserIndex, users.length])

  // === RESET STATE ON USER CHANGE ===
  useEffect(() => {
    setCurrentImageIndex(0)
    setShowExpandedPhoto(false)
    setShowProfile(false)
    setIsDragging(false)
    setDragOffset({ x: 0, y: 0 })
    setSwipeDirection(null)
    setProfileImageIndex(0)
  }, [currentUserIndex])

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
        <MobileSwipeLayout 
          user={currentUser}
          // State
          currentImageIndex={currentImageIndex}
          showProfile={showProfile}
          isDragging={isDragging}
          dragOffset={dragOffset}
          swipeDirection={swipeDirection}
          profileImageIndex={profileImageIndex}
          isProfileImageDragging={isProfileImageDragging}
          showSuperLikeModal={showSuperLikeModal}
          superLikeUsed={superLikeUsed}
          // Handlers
          onLike={handleLike}
          onRefresh={handleRefresh}
          onSuperLike={handleSuperLikeModalOpen}
          onSuperLikeConfirm={handleSuperLikeConfirm}
          onImageTap={handleImageTap}
          onCardTap={handleCardTap}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          onNextImage={nextImage}
          onPrevImage={prevImage}
          onNextProfileImage={nextProfileImage}
          onPrevProfileImage={prevProfileImage}
          onCloseProfile={closeProfile}
          onCloseSuperLikeModal={closeSuperLikeModal}
          onProfileImageDragStart={handleProfileImageDragStart}
          onProfileImageDragEnd={handleProfileImageDragEnd}
          onSetProfileImageIndex={setProfileImageIndexDirect}
        />
      ) : (
        <DesktopProfileLayout 
          user={currentUser}
          // State
          showExpandedPhoto={showExpandedPhoto}
          expandedPhotoIndex={expandedPhotoIndex}
          clickedPhotoRef={clickedPhotoRef}
          showLikeModal={showLikeModal}
          superLikeUsed={superLikeUsed}
          isMobile={isMobile}
          // Handlers
          onLike={handleDesktopLikeClick}
          onRefresh={handleRefresh}
          onSuperLike={handleSuperLike}
          onImageClick={handleImageClick}
          onCloseExpandedPhoto={closeExpandedPhoto}
          onNextPhoto={nextExpandedPhoto}
          onPrevPhoto={prevExpandedPhoto}
          onDesktopLike={handleDesktopLike}
          onCloseLikeModal={closeLikeModal}
        />
      )}

      {/* Match Modal */}
      {showMatchModal && matchedUser && (
        <MatchModal 
          matchedUser={matchedUser} 
          onClose={closeMatchModal} 
          onMessage={handleMessage} 
          isSuperLike={superLikeMatch} 
        />
      )}
    </>
  )
}
