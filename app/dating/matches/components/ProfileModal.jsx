"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { 
  Heart, 
  MessageCircle, 
  MapPin, 
  Shield, 
  ArrowLeft,
  Quote,
  Briefcase,
  GraduationCap,
  Mountain,
  CameraIcon,
  Plane,
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
  X,
  Users
} from 'lucide-react'
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"
import Image from "next/image"

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

// Enhanced Profile Modal Component - Mobile-inspired layout
export const ProfileModal = ({ 
  match, 
  isOpen, 
  onClose, 
  onMessage, 
  currentImageIndex, 
  onImageChange,
  onPrevImage,
  onNextImage
}) => {
  const [isImageDragging, setIsImageDragging] = useState(false)
  
  // Prevent background scroll when modal is open - always call hooks
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Early return after hooks
  if (!match || !isOpen) return null

  const user = match.user

  const handleImageDragEnd = (event, info) => {
    const threshold = 50
    if (info.offset.x > threshold) {
      onPrevImage()
    } else if (info.offset.x < -threshold) {
      onNextImage()
    }
    setIsImageDragging(false)
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center overflow-hidden"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="bg-white w-full h-full lg:w-full lg:max-w-4xl lg:h-[90vh] lg:rounded-3xl overflow-hidden shadow-2xl flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col lg:grid lg:grid-cols-2 h-full">
            {/* Mobile: Full scrollable content */}
            <div className="lg:hidden h-full overflow-y-auto">
              {/* Photo section */}
              <div className="relative h-[60vh] flex items-center justify-center bg-slate-100">
                <div className="relative h-[90%] w-[90%] max-w-md mx-auto rounded-2xl overflow-hidden shadow-xl">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.25 }}
                    className="relative w-full h-full"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.12}
                    onDragStart={() => setIsImageDragging(true)}
                    onDragEnd={handleImageDragEnd}
                    whileDrag={{ scale: 0.98 }}
                  >
                    <Image
                      src={user.images[currentImageIndex]?.url || "/placeholder.svg"}
                      alt={`${user.name} - ${user.images[currentImageIndex]?.title || 'Photo'}`}
                      fill
                      className="object-cover rounded-2xl select-none"
                      sizes="100vw"
                      priority
                      draggable={false}
                    />
                    {/* Swipe hint overlay */}
                    {isImageDragging && (
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
                  </motion.div>

                  {/* Close button */}
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-all duration-200 z-30 border border-white/30"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Image counter */}
                  {user.images && user.images.length > 1 && (
                    <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs font-bold z-20">
                      {currentImageIndex + 1} / {user.images.length}
                    </div>
                  )}

                  {/* Bottom indicators (mobile-style) */}
                  {user.images && user.images.length > 1 && (
                    <div className="absolute bottom-4 left-4 right-4 flex space-x-2 z-20 justify-center">
                      {user.images.map((_, index) => (
                        <motion.button
                          key={index}
                          onClick={(e) => {
                            e.stopPropagation()
                            onImageChange(index)
                          }}
                          className={cn(
                            "h-2 w-6 rounded-full transition-all duration-300 border border-white/30",
                            index === currentImageIndex ? "bg-white shadow-lg" : "bg-white/30"
                          )}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          animate={{
                            scale: index === currentImageIndex ? 1.1 : 1,
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Photo description below photo - mobile style */}
              <div className="max-w-md mx-auto px-4 pt-4 pb-2">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22 }}
                >
                  <h3 className="text-slate-900 font-bold text-lg mb-1">
                    {user.images[currentImageIndex]?.title || `Photo ${currentImageIndex + 1}`}
                  </h3>
                  {user.images[currentImageIndex]?.story && (
                    <p className="text-slate-700 text-sm leading-relaxed">
                      {user.images[currentImageIndex].story}
                    </p>
                  )}
                </motion.div>
              </div>

              {/* Profile content - mobile style */}
              <div className="p-6 space-y-6 bg-white">
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

                {/* Match Info */}
                <div className="bg-slate-50 rounded-2xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Heart className="w-4 h-4 text-pink-500 fill-current" />
                    <span className="font-medium text-gray-900">Matched on</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {new Date(match.matchedAt).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-2 text-base">About</h3>
                  <p className="text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-2xl text-sm">{user.bio}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-2xl">
                    <div className="flex items-center space-x-2 mb-1">
                      <Briefcase className="w-4 h-4 text-slate-600" />
                      <span className="font-bold text-gray-900 text-xs">Work</span>
                    </div>
                    <p className="text-gray-700 font-medium text-xs">{user.job || "Not specified"}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-2xl">
                    <div className="flex items-center space-x-2 mb-1">
                      <GraduationCap className="w-4 h-4 text-slate-600" />
                      <span className="font-bold text-gray-900 text-xs">Education</span>
                    </div>
                    <p className="text-gray-700 font-medium text-xs">{user.education || "Not specified"}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-2 text-base">Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {user.interests?.map((interest, index) => {
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

                {/* Action buttons - mobile style */}
                <div className="flex space-x-4 pt-4">
                  <Button
                    onClick={onClose}
                    variant="outline"
                    className="flex-1 rounded-2xl py-3 font-semibold"
                  >
                    Close
                  </Button>
                  <Button
                    onClick={() => onMessage(match)}
                    className="flex-1 bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-slate-950 text-white rounded-2xl py-3 font-semibold"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </div>

                <div className="pb-8"></div>
              </div>
            </div>

            {/* Desktop: Two column layout */}
            <div className="hidden lg:contents">
              {/* Left Side - Photos with desktop layout */}
              <div className="relative bg-gray-900 h-full order-1 lg:order-1 flex items-center justify-center">
                <div className="relative w-full h-full overflow-hidden">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.25 }}
                    className="relative w-full h-full"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.12}
                    onDragStart={() => setIsImageDragging(true)}
                    onDragEnd={handleImageDragEnd}
                    whileDrag={{ scale: 0.98 }}
                  >
                    <Image
                      src={user.images[currentImageIndex]?.url || "/placeholder.svg"}
                      alt={`${user.name} - ${user.images[currentImageIndex]?.title || 'Photo'}`}
                      fill
                      className="object-cover select-none"
                      sizes="50vw"
                      priority
                      draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    
                    {/* Swipe hint overlay */}
                    {isImageDragging && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-black/10 backdrop-blur-[1px] flex items-center justify-center"
                      >
                        <div className="bg-white/30 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30">
                          <span className="text-white text-sm font-medium">← Swipe to navigate →</span>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Image Navigation - Only show if multiple images */}
                  {user.images && user.images.length > 1 && (
                    <>
                      {/* Progress indicators at top */}
                      <div className="absolute top-4 left-4 right-4 flex space-x-1 z-20">
                        {user.images.map((_, index) => (
                          <motion.button
                            key={index}
                            onClick={(e) => {
                              e.stopPropagation()
                              onImageChange(index)
                            }}
                            className={cn(
                              "flex-1 h-1.5 rounded-full transition-all duration-300",
                              index === currentImageIndex ? "bg-white shadow-lg" : "bg-white/30"
                            )}
                            animate={{
                              scale: index === currentImageIndex ? 1.15 : 1,
                            }}
                          />
                        ))}
                      </div>

                      {/* Navigation arrows */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          onPrevImage()
                        }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-all duration-200 z-20"
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          onNextImage()
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-all duration-200 z-20"
                      >
                        <ArrowLeft className="w-5 h-5 rotate-180" />
                      </button>

                      {/* Image counter */}
                      <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm font-medium z-20">
                        {currentImageIndex + 1} / {user.images.length}
                      </div>

                      {/* Bottom indicators (mobile-style) */}
                      <div className="absolute bottom-4 left-4 right-4 flex space-x-2 z-20 justify-center">
                        {user.images.map((_, index) => (
                          <motion.button
                            key={index}
                            onClick={(e) => {
                              e.stopPropagation()
                              onImageChange(index)
                            }}
                            className={cn(
                              "h-2 w-6 rounded-full transition-all duration-300 border border-white/30",
                              index === currentImageIndex ? "bg-white shadow-lg" : "bg-white/30"
                            )}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            animate={{
                              scale: index === currentImageIndex ? 1.1 : 1,
                            }}
                          />
                        ))}
                      </div>
                    </>
                  )}

                  {/* Close button */}
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-all duration-200 z-30 border border-white/30"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Right Side - Profile Info */}
              <div className="flex flex-col h-full max-h-[90vh] order-2 lg:order-2 min-h-0 flex-1">
                <div className="flex-1 overflow-y-auto p-8 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  {/* Photo description for desktop */}
                  <div className="mb-6">
                    <motion.div
                      key={currentImageIndex}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.22 }}
                    >
                      <h3 className="text-slate-900 font-bold text-lg mb-2">
                        {user.images[currentImageIndex]?.title || `Photo ${currentImageIndex + 1}`}
                      </h3>
                      {user.images[currentImageIndex]?.story && (
                        <p className="text-slate-700 text-sm leading-relaxed bg-gray-50 p-3 rounded-xl">
                          {user.images[currentImageIndex].story}
                        </p>
                      )}
                    </motion.div>
                  </div>

                  {/* Header */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-xl">{user.name[0]}</span>
                      </div>
                      {user.online && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-3 border-white rounded-full animate-pulse"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h2 className="text-3xl font-bold text-gray-900 truncate">
                          {user.name}, {user.age}
                        </h2>
                        {user.verified && (
                          <div className="w-8 h-8 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                            <Shield className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        <span className="font-medium truncate">{user.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Match Info */}
                  <div className="bg-slate-50 rounded-2xl p-4 mb-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <Heart className="w-4 h-4 text-pink-500 fill-current" />
                      <span className="font-medium text-gray-900">Matched on</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {new Date(match.matchedAt).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>

                  {/* Bio */}
                  <div className="mb-6">
                    <div className="flex items-center space-x-3 mb-3">
                      <Quote className="w-5 h-5 text-slate-600" />
                      <h3 className="font-bold text-gray-900 text-lg">About</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-2xl">
                      {user.bio}
                    </p>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-2xl">
                      <div className="flex items-center space-x-2 mb-2">
                        <Briefcase className="w-4 h-4 text-slate-600" />
                        <span className="font-bold text-gray-900 text-sm">Work</span>
                      </div>
                      <p className="text-gray-700 font-medium text-sm">{user.job || "Not specified"}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-2xl">
                      <div className="flex items-center space-x-2 mb-2">
                        <GraduationCap className="w-4 h-4 text-slate-600" />
                        <span className="font-bold text-gray-900 text-sm">Education</span>
                      </div>
                      <p className="text-gray-700 font-medium text-sm">{user.education || "Not specified"}</p>
                    </div>
                  </div>

                  {/* Interests */}
                  {user.interests && user.interests.length > 0 && (
                    <div className="mb-6">
                      <h3 className="font-bold text-gray-900 mb-3 text-lg">Interests</h3>
                      <div className="flex flex-wrap gap-2">
                        {user.interests.map((interest, index) => {
                          const IconComponent = interestIcons[interest] || Heart
                          return (
                            <motion.span
                              key={index}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex items-center space-x-2 px-3 py-2 bg-slate-100 rounded-xl text-xs font-medium text-slate-700 border border-slate-200 shadow-sm"
                            >
                              <IconComponent className="w-3 h-3" />
                              <span>{interest}</span>
                            </motion.span>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="p-8 border-t border-gray-100 bg-gray-50/50 flex-shrink-0">
                  <div className="flex space-x-4">
                    <Button
                      onClick={onClose}
                      variant="outline"
                      className="flex-1 rounded-2xl py-3 font-semibold"
                    >
                      Close
                    </Button>
                    <Button
                      onClick={() => onMessage(match)}
                      className="flex-1 bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-slate-950 text-white rounded-2xl py-3 font-semibold"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
