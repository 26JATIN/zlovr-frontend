"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  Heart,
  MapPin,
  Shield,
  Sparkles,
  RefreshCw,
  Quote,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
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

// Desktop Profile Layout Component
export const DesktopProfileLayout = ({ user, onLike, onRefresh, onSuperLike, isMobile, superLikeUsed }) => {
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
