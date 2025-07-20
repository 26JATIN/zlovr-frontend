"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  MessageCircle,
  Shield,
  Star,
  Sparkles,
  Play,
  MapPin,
  Menu,
  X,
  ChevronDown,
  Heart,
  Instagram,
  Twitter,
  Facebook,
  Mail,
  Phone,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react"

// Modern Header Component
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 20)
      
      // Get the success stories section
      const successSection = document.querySelector('#success')
      if (successSection) {
        const successTop = successSection.offsetTop
        const successBottom = successTop + successSection.offsetHeight
        
        // Hide header when in success stories section
        if (scrollY >= successTop - 100 && scrollY <= successBottom - 100) {
          setIsHidden(true)
        } else {
          setIsHidden(false)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Success Stories", href: "#success" },
    { name: "Safety", href: "#safety" },
  ]

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
      isScrolled 
        ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100" 
        : "bg-transparent",
      isHidden && "-translate-y-full"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="#" className="flex items-center space-x-2">
              <Image
                src="/heart-logo.png"
                alt="zlovr logo"
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
              />
              <span className={cn(
                "text-2xl font-bold transition-colors duration-300",
                isScrolled ? "text-gray-900" : "text-white"
              )}>
                zlovr
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-all duration-300 hover:scale-105",
                  isScrolled 
                    ? "text-gray-700 hover:text-slate-700" 
                    : "text-white/90 hover:text-white"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link href="/signin">
              <Button
                variant="ghost"
                className={cn(
                  "font-medium transition-all duration-300",
                                    isScrolled 
                      ? "text-gray-700 hover:text-slate-700 hover:bg-slate-50" 
                      : "text-white/90 hover:text-white hover:bg-white/10"
                )}
              >
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button
                className={cn(
                  "bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-slate-950 text-white font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl",
                  isScrolled && "shadow-slate-200"
                )}
              >
                Join Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "p-2 transition-colors duration-300",
                isScrolled 
                  ? "text-gray-700 hover:text-slate-700" 
                  : "text-white hover:text-white/80"
              )}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-white border-t border-gray-100 shadow-lg"
          >
            <div className="px-4 py-6 space-y-6">
              <nav className="space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block text-gray-700 hover:text-slate-700 font-medium transition-colors duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              
              <div className="pt-4 border-t border-gray-100 space-y-4">
                <Link href="/signin">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-700 hover:text-slate-700 hover:bg-slate-50"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button
                    className="w-full bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-slate-950 text-white font-medium shadow-lg"
                  >
                    Join Now
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default function HomePage() {
  const [onlineCount, setOnlineCount] = useState(3245)
  const [scrollY, setScrollY] = useState(0)

  // Scroll animations observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate")
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = document.querySelectorAll(
      ".scroll-fade-in, .scroll-slide-left, .scroll-slide-right, .scroll-scale",
    )
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  // Simulate live online counter
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineCount((prev) => prev + Math.floor(Math.random() * 10) - 5)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const loveStories = [
    {
      id: 1,
      names: "Emma & James",
      location: "New York",
      status: "Married 2 years",
      story:
        "We matched on zlovr and instantly clicked over our shared love of hiking and coffee. Two years later, we're happily married and expecting our first child! The AI matching was so accurate - it felt like we were meant to find each other.",
      image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1000&auto=format&fit=crop",
      layout: "left",
    },
    {
      id: 2,
      names: "Sofia & David",
      location: "Los Angeles",
      status: "Engaged",
      story:
        "After years of unsuccessful dating, zlovr's AI matching helped me find my soulmate. David proposed last month and we're planning our dream wedding! The compatibility questions really helped us understand each other deeply.",
      image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1000&auto=format&fit=crop",
      layout: "right",
    },
    {
      id: 3,
      names: "Lisa & Michael",
      location: "Chicago",
      status: "Dating 1 year",
      story:
        "The compatibility matching was perfect. We share the same values, dreams, and even the same favorite pizza toppings! It's like we were made for each other. Every conversation flows so naturally.",
      image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80&w=1000&auto=format&fit=crop",
      layout: "left",
    },
    {
      id: 4,
      names: "Alex & Jordan",
      location: "Miami",
      status: "Dating 6 months",
      story:
        "Long-distance seemed impossible until zlovr connected us. Now we're planning to move in together next month. Love truly knows no boundaries! The app helped us build a strong foundation before meeting.",
      image: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?q=80&w=1000&auto=format&fit=crop",
      layout: "right",
    },
  ]

  // Success Stories Component - Enhanced with Smooth Fade Transitions
  const SuccessStoriesSection = ({ stories }) => {
    const [scrollProgress, setScrollProgress] = useState(0)
    const sectionRef = useRef(null)

    // Smooth scroll handler for continuous transitions
    useEffect(() => {
      const handleScroll = () => {
        if (!sectionRef.current) return

        const section = sectionRef.current
        const rect = section.getBoundingClientRect()
        const viewportHeight = window.innerHeight

        // Only process when section is in view
        if (rect.top <= 0 && rect.bottom >= 0) {
          // Calculate scroll progress within the section
          const sectionScrolled = Math.abs(rect.top)
          const totalScrollableHeight = rect.height - viewportHeight
        let progress = Math.min(sectionScrolled / totalScrollableHeight, 1)
          
        // Extend the progress range for the last story to give it more time
        if (progress > 0.8) {
          // Slow down progress in the last 20% to give more time for the last story
          const slowProgress = (progress - 0.8) * 0.5 // Slow down by 50%
          progress = 0.8 + slowProgress
        }
        
        // Ensure progress can reach 1.0 for the last story
        if (progress > 0.9) {
          progress = Math.min(1.0, progress)
        }
        
        setScrollProgress(progress)
          }
        }

      // Use requestAnimationFrame for smooth performance
      let ticking = false
      const updateProgress = () => {
        handleScroll()
        ticking = false
      }

      const throttledHandleScroll = () => {
        if (!ticking) {
          requestAnimationFrame(updateProgress)
          ticking = true
        }
      }

      window.addEventListener("scroll", throttledHandleScroll, { passive: true })
      handleScroll()
      
      return () => window.removeEventListener("scroll", throttledHandleScroll)
    }, [])
    // Enhanced Story Component with smooth fade transitions
    const StoryCard = ({ story, index, scrollProgress }) => {
      const isImageLeft = story.layout === "left"
      
      // Initialize variables
      let opacity = 0
      let translateY = 30
      let scale = 0.95
      
      // Calculate story progress based on scroll
      const storyStart = index / (stories.length - 1)
      const storyEnd = (index + 1) / (stories.length - 1)
      
      // Calculate opacity and transform based on scroll position
      const isActive = scrollProgress >= storyStart && scrollProgress <= storyEnd
      
      // Create snappy fade zones for quick transitions
      const fadeInStart = storyStart - 0.05 // Start fading in just before
      const fadeOutStart = storyEnd - 0.05 // Start fading out just before
      const fadeOutEnd = storyEnd + 0.05 // End fading out just after
      
      // Special handling for the last story to ensure it gets full visibility
      if (index === stories.length - 1) {
        // For the last story, show it when we're past 80% of the scroll
        if (scrollProgress >= 0.8) {
          if (scrollProgress <= 0.9) {
            // Fading in
            const fadeProgress = (scrollProgress - 0.8) / 0.1
            opacity = Math.max(0, Math.min(1, fadeProgress))
            translateY = 30 * (1 - fadeProgress)
            scale = 0.95 + (0.05 * fadeProgress)
          } else {
            // Fully visible
            opacity = 1
            translateY = 0
            scale = 1
          }
        } else {
          opacity = 0
          translateY = 30
          scale = 0.95
        }
        
        // Return early for last story
      return (
          <div 
            className="absolute inset-0 flex items-center overflow-hidden"
            style={{
              opacity,
              transform: `translateY(${translateY}px) scale(${scale})`,
              pointerEvents: isActive ? 'auto' : 'none',
              zIndex: opacity > 0.1 ? 10 : 1,
              transition: 'all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }}
          >
          <div className="w-full h-full flex">
            <div className={`grid grid-cols-1 lg:grid-cols-2 w-full h-full ${
              isImageLeft ? "" : "lg:grid-flow-col-dense"
            }`}>
              {/* Story Image */}
                <div 
                  className={`relative overflow-hidden h-[50vh] lg:h-full w-full ${
                isImageLeft ? "lg:order-1" : "lg:order-2"
                  }`}
                  style={{
                    opacity: opacity,
                    transform: `translateX(${isImageLeft ? -15 * (1 - opacity) : 15 * (1 - opacity)}px)`,
                    transition: 'all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                  }}
                >
                <div className="relative overflow-hidden h-full w-full">
                  <div className="h-full w-full">
                    <Image
                      src={story.image}
                      alt={story.names}
                      width={1200}
                      height={800}
                      className="w-full h-full object-cover"
                      priority={index === 0}
                      fill={false}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  
                  {/* Floating elements */}
                  <div className="absolute top-4 right-4 lg:top-8 lg:right-8">
                    <div className="flex space-x-1">
                      <Heart className="w-4 h-4 lg:w-6 lg:h-6 text-red-400 fill-current animate-pulse" />
                      <Heart className="w-3 h-3 lg:w-5 lg:h-5 text-pink-400 fill-current animate-pulse delay-300" />
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute bottom-4 left-4 lg:bottom-8 lg:left-8">
                    <div className="flex space-x-2 lg:space-x-3">
                      <div className="w-3 h-3 lg:w-4 lg:h-4 bg-white/30 rounded-full"></div>
                      <div className="w-2 h-2 lg:w-3 lg:h-3 bg-white/20 rounded-full"></div>
                      <div className="w-4 h-4 lg:w-5 lg:h-5 bg-white/40 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Story Content */}
                <div 
                  className={`flex flex-col justify-center h-[50vh] lg:h-full px-6 sm:px-8 lg:px-16 xl:px-20 w-full ${
                isImageLeft ? "lg:order-2" : "lg:order-1"
                  }`}
                  style={{
                    opacity: opacity,
                    transform: `translateX(${isImageLeft ? 15 * (1 - opacity) : -15 * (1 - opacity)}px)`,
                    transition: 'all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                  }}
                >
                  <div className="space-y-6 sm:space-y-8 max-w-2xl">
                  {/* Verified Badge */}
                  <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <div className="bg-green-500/20 text-green-400 px-2 py-1 sm:px-3 rounded-full text-xs sm:text-sm font-medium border border-green-500/30">
                      ✓ Verified Couple
                    </div>
                  </div>

                  {/* Names */}
                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                      {story.names}
                    </h3>
                    <div className="flex flex-wrap items-center text-white/80 space-x-4 sm:space-x-6 text-base sm:text-lg">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400" />
                        <span className="font-medium">{story.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 fill-current" />
                        <span className="font-medium">{story.status}</span>
                      </div>
                    </div>
                  </div>

                  {/* Story Quote */}
                  <div className="relative">
                    <div className="absolute -left-2 sm:-left-4 -top-1 sm:-top-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white/20 font-serif">"</div>
                    <blockquote className="text-lg sm:text-xl lg:text-2xl text-white/90 leading-relaxed italic pl-4 sm:pl-8 pr-2 sm:pr-4 font-medium">
                      {story.story}
                    </blockquote>
                    <div className="absolute -right-1 sm:-right-2 -bottom-2 sm:-bottom-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white/20 font-serif">"</div>
                  </div>

                  {/* Story Meta */}
                  <div className="flex items-center pt-4 sm:pt-6 border-t border-white/20">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center">
                        <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-white fill-current" />
                      </div>
                      <span className="text-white/70 font-medium text-sm sm:text-base">Success Story #{story.id}</span>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
      
      if (scrollProgress >= fadeInStart && scrollProgress <= fadeOutEnd) {
        if (scrollProgress <= storyStart) {
          // Fading in - smooth and gradual
          const fadeProgress = (scrollProgress - fadeInStart) / (storyStart - fadeInStart)
          opacity = Math.max(0, Math.min(1, fadeProgress))
          translateY = 30 * (1 - fadeProgress)
          scale = 0.95 + (0.05 * fadeProgress)
        } else if (scrollProgress >= fadeOutStart) {
          // Fading out - smooth and gradual
          const fadeProgress = (scrollProgress - fadeOutStart) / (fadeOutEnd - fadeOutStart)
          opacity = Math.max(0, Math.min(1, 1 - fadeProgress))
          translateY = 30 * fadeProgress
          scale = 0.95 + (0.05 * (1 - fadeProgress))
        } else {
          // Fully visible
          opacity = 1
          translateY = 0
          scale = 1
        }
      }
      
      // Ensure complete fade out for non-active stories
      if (scrollProgress < fadeInStart || scrollProgress > fadeOutEnd) {
        opacity = 0
        translateY = 30
        scale = 0.95
      }
      
      // Ensure complete fade out for non-active stories
      if (scrollProgress < fadeInStart || scrollProgress > fadeOutEnd) {
        opacity = 0
        translateY = 30
        scale = 0.95
      }
      
      // Only hide stories that are completely out of range
      const currentStoryIndex = Math.round(scrollProgress * (stories.length - 1))
      const distanceFromCurrent = Math.abs(index - currentStoryIndex)
      
      // Only completely hide stories that are far from the current one
      if (distanceFromCurrent > 2) {
        opacity = 0
        translateY = 30
        scale = 0.95
      }
      
      // Special check for 3rd story to ensure it fades out properly
      if (index === 2 && scrollProgress > 0.75) { // 3rd story (index 2) should fade out after 75% scroll
        const fadeOutProgress = (scrollProgress - 0.75) / 0.1
        if (fadeOutProgress > 0) {
          opacity = Math.max(0, 1 - fadeOutProgress)
          translateY = 30 * fadeOutProgress
          scale = 0.95 + (0.05 * (1 - fadeOutProgress))
        }
      }

      return (
        <div 
          className="absolute inset-0 flex items-center overflow-hidden"
          style={{
            opacity,
            transform: `translateY(${translateY}px) scale(${scale})`,
            pointerEvents: isActive ? 'auto' : 'none',
            zIndex: opacity > 0.1 ? 10 : 1, // Only show high z-index when visible
            transition: 'all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
          }}
        >
          <div className="w-full h-full flex">
            <div className={`grid grid-cols-1 lg:grid-cols-2 w-full h-full ${
              isImageLeft ? "" : "lg:grid-flow-col-dense"
            }`}>
              {/* Story Image */}
              <div 
                className={`relative overflow-hidden h-[50vh] lg:h-full w-full ${
                  isImageLeft ? "lg:order-1" : "lg:order-2"
                }`}
                style={{
                  opacity: opacity, // Same opacity as the main container
                  transform: `translateX(${isImageLeft ? -15 * (1 - opacity) : 15 * (1 - opacity)}px)`,
                  transition: 'all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }}
              >
                <div className="relative overflow-hidden h-full w-full">
                  <div className="h-full w-full">
                    <Image
                      src={story.image}
                      alt={story.names}
                      width={1200}
                      height={800}
                      className="w-full h-full object-cover"
                      priority={index === 0}
                      fill={false}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  
                  {/* Floating elements */}
                  <div className="absolute top-4 right-4">
                    <div className="flex space-x-1">
                      <Heart className="w-4 h-4 text-red-400 fill-current animate-pulse" />
                      <Heart className="w-3 h-3 text-pink-400 fill-current animate-pulse delay-300" />
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute bottom-4 left-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                      <div className="w-2 h-2 bg-white/20 rounded-full"></div>
                      <div className="w-4 h-4 bg-white/40 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Story Content */}
              <div 
                className={`flex flex-col justify-center h-[50vh] lg:h-full px-6 sm:px-8 lg:px-16 xl:px-20 w-full ${
                  isImageLeft ? "lg:order-2" : "lg:order-1"
                }`}
                style={{
                  opacity: opacity, // Same opacity as the main container
                  transform: `translateX(${isImageLeft ? 15 * (1 - opacity) : -15 * (1 - opacity)}px)`,
                  transition: 'all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }}
              >
                <div className="space-y-6 sm:space-y-8 max-w-2xl">
                {/* Verified Badge */}
                <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <div className="bg-green-500/20 text-green-400 px-2 py-1 sm:px-3 rounded-full text-xs sm:text-sm font-medium border border-green-500/30">
                    ✓ Verified Couple
                  </div>
                </div>

                {/* Names */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                    {story.names}
                  </h3>
                  <div className="flex flex-wrap items-center text-white/80 space-x-4 sm:space-x-6 text-base sm:text-lg">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400" />
                      <span className="font-medium">{story.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 fill-current" />
                      <span className="font-medium">{story.status}</span>
                    </div>
                  </div>
                </div>

                {/* Story Quote */}
                <div className="relative">
                  <div className="absolute -left-2 sm:-left-4 -top-1 sm:-top-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white/20 font-serif">"</div>
                  <blockquote className="text-lg sm:text-xl lg:text-2xl text-white/90 leading-relaxed italic pl-4 sm:pl-8 pr-2 sm:pr-4 font-medium">
                    {story.story}
                  </blockquote>
                  <div className="absolute -right-1 sm:-right-2 -bottom-2 sm:-bottom-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white/20 font-serif">"</div>
                </div>

                                  {/* Story Meta */}
                  <div className="flex items-center pt-4 sm:pt-6 border-t border-white/20">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center">
                        <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-white fill-current" />
                      </div>
                      <span className="text-white/70 font-medium text-sm sm:text-base">Success Story #{story.id}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div ref={sectionRef} className="h-[600vh] relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-gradient-to-r from-slate-800 to-slate-900">
          {/* Render all stories with smooth fade transitions */}
          {stories.map((story, index) => (
            <StoryCard 
              key={story.id} 
              story={story} 
              index={index} 
              scrollProgress={scrollProgress}
            />
          ))}


        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* New Floating Navbar */}
      <Header />

      {/* Full Screen Hero Section - Updated */}
      <section
        className="relative h-screen hero-bg flex items-center justify-center overflow-hidden pt-0"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      >
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Main Heading with Smooth Writing Effect */}
            <div className="space-y-6">
              <h1 className="text-6xl lg:text-8xl font-bold-custom text-white mb-4 smooth-write text-glow">zlovr</h1>

              <div className="space-y-4">
                <h2 className="text-2xl lg:text-4xl font-bold text-white/90 smooth-write-delayed">
                  Where Hearts Find Their Home
                </h2>
                <p className="text-xl lg:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed smooth-write-delayed-2 font-medium">
                  Discover meaningful connections with people who truly understand you
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up stagger-3">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-slate-950 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 rounded-full px-12 py-6 text-xl font-bold btn-subtle"
                >
                  Start Your Journey
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/50 text-white hover:bg-white/10 hover:border-white transition-all duration-300 rounded-full px-12 py-6 text-xl bg-transparent backdrop-blur-sm font-bold"
              >
                <Play className="mr-3 w-6 h-6 text-white" />
                Watch Stories
              </Button>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-6 h-6 text-white/60" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 scroll-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Why Choose <span className="text-slate-700">zlovr</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              Advanced technology meets genuine human connection
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Smart AI Matching",
                description: "Our advanced algorithm analyzes 32+ compatibility factors to find your perfect match.",
                color: "from-slate-600 to-slate-800",
                delay: "stagger-1",
              },
              {
                icon: Shield,
                title: "Verified Profiles",
                description: "Every profile is manually verified with photo verification and background checks.",
                color: "from-gray-600 to-slate-800",
                delay: "stagger-2",
              },
              {
                icon: MessageCircle,
                title: "Secure Messaging",
                description: "End-to-end encrypted conversations with advanced privacy controls.",
                color: "from-gray-600 to-slate-800",
                delay: "stagger-3",
              },
              {
                icon: Users,
                title: "Relationship Goals",
                description: "Filter by what you're seeking - from casual dates to serious relationships.",
                color: "from-gray-600 to-slate-800",
                delay: "stagger-4",
              },
              {
                icon: MapPin,
                title: "Location-Based",
                description: "Find matches in your area or expand your search globally.",
                color: "from-gray-600 to-slate-800",
                delay: "stagger-5",
              },
              {
                icon: Star,
                title: "Premium Experience",
                description: "Unlimited likes, super boosts, and priority customer support.",
                color: "from-gray-600 to-slate-800",
                delay: "stagger-6",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className={`group hover:shadow-lg transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-sm rounded-2xl bg-white hover:bg-white scroll-slide-left ${feature.delay} card-hover`}
              >
                <CardContent className="p-8">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md`}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed font-medium">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories - Stable scroll behavior */}
      <section id="success" className="bg-gradient-to-r from-slate-800 to-slate-900 text-white relative">
        <div className="relative z-10">
          <div className="text-center pt-16 sm:pt-20 mb-8 sm:mb-12 px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">Real Love Stories</h2>
            <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto font-medium">
              Over 50,000 couples have found their perfect match through zlovr
            </p>
          </div>

          <SuccessStoriesSection stories={loveStories} />
        </div>
      </section>

      {/* Final CTA */}
      <section id="cta-section" className="py-20 bg-white text-gray-900 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto scroll-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">Find Your Perfect Match</h2>
              <p className="text-xl mb-8 text-gray-600 font-medium">
                Answer a few questions and let our AI find your ideal partner. Your soulmate is waiting.
              </p>
            </div>

            <Card className="bg-gradient-to-r from-slate-800 to-slate-900 border-0 shadow-2xl rounded-3xl overflow-hidden">
              <CardContent className="p-8 lg:p-12">
                <div className="max-w-2xl mx-auto">
                  <div className="space-y-6 text-center">
                    <h3 className="text-2xl font-bold text-white">Start Your Love Story</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          type="email"
                          placeholder="Your email"
                          className="rounded-full border-white/30 bg-white/10 text-white placeholder:text-white/70 focus:border-white/50 h-12 font-medium"
                        />
                        <Select>
                          <SelectTrigger className="rounded-full border-white/30 bg-white/10 text-white h-12 font-medium">
                            <SelectValue placeholder="Age" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="18-25">18-25</SelectItem>
                            <SelectItem value="26-35">26-35</SelectItem>
                            <SelectItem value="36-45">36-45</SelectItem>
                            <SelectItem value="46+">46+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Select>
                        <SelectTrigger className="rounded-full border-white/30 bg-white/10 text-white h-12 font-medium">
                          <SelectValue placeholder="What are you looking for?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="serious">Serious Dating</SelectItem>
                          <SelectItem value="casual">Casual Dating</SelectItem>
                          <SelectItem value="friendship">Friendship</SelectItem>
                          <SelectItem value="marriage">Marriage</SelectItem>
                        </SelectContent>
                      </Select>

                      <Link href="/signup">
                        <Button
                          size="lg"
                          className="w-full bg-white text-slate-800 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-full py-4 text-lg font-bold btn-subtle"
                        >
                          Find My Match
                          <Sparkles className="ml-2 w-5 h-5" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 text-white relative overflow-hidden">
        {/* Modern geometric background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-slate-600 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-gray-600 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-slate-500 to-gray-500 rounded-full blur-2xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="py-20">
            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
              {/* Brand Section */}
              <div className="lg:col-span-2 space-y-8">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-14 h-14 bg-gradient-to-r from-slate-700 to-slate-900 rounded-2xl flex items-center justify-center shadow-lg border border-slate-600">
                      <Heart className="w-8 h-8 text-white fill-current" />
                    </div>
                    <span className="text-4xl font-bold-custom text-white">zlovr</span>
                  </div>
                  <p className="text-white/80 text-lg leading-relaxed max-w-lg font-medium">
                    Connecting hearts and building lasting relationships through innovative technology and genuine care.
                    Your journey to love starts here.
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 hover:bg-slate-800/70 transition-all duration-300">
                    <div className="text-2xl font-bold text-white">50K+</div>
                    <div className="text-sm text-slate-300">Happy Couples</div>
                  </div>
                  <div className="text-center p-4 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 hover:bg-slate-800/70 transition-all duration-300">
                    <div className="text-2xl font-bold text-white">1M+</div>
                    <div className="text-sm text-slate-300">Active Users</div>
                  </div>
                  <div className="text-center p-4 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 hover:bg-slate-800/70 transition-all duration-300">
                    <div className="text-2xl font-bold text-white">95%</div>
                    <div className="text-sm text-slate-300">Success Rate</div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-white">Explore</h4>
                <ul className="space-y-4">
                  {[
                    "How It Works",
                    "Success Stories",
                    "Safety Center",
                    "Dating Tips",
                    "Premium Features",
                    "Mobile App",
                  ].map((item) => (
                    <li key={item}>
                      <Link
                        href="#"
                        className="text-slate-300 hover:text-white transition-all duration-300 flex items-center group font-medium"
                      >
                        <span className="w-2 h-2 bg-gradient-to-r from-slate-400 to-slate-600 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-125"></span>
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support & Contact */}
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-white">Support</h4>
                <div className="space-y-4">
                  <div className="p-4 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 hover:bg-slate-800/70 transition-all duration-300">
                    <div className="flex items-center space-x-3 text-white mb-2">
                      <Mail className="w-5 h-5 text-slate-400" />
                      <span className="font-medium">Email Us</span>
                    </div>
                    <span className="text-slate-300">hello@zlovr.com</span>
                  </div>
                  <div className="p-4 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 hover:bg-slate-800/70 transition-all duration-300">
                    <div className="flex items-center space-x-3 text-white mb-2">
                      <Phone className="w-5 h-5 text-slate-400" />
                      <span className="font-medium">Call Us</span>
                    </div>
                    <span className="text-slate-300">1-800-ZLOVR-US</span>
                  </div>

                  <div className="space-y-3">
                    {["Help Center", "Contact Support", "Report an Issue"].map((item) => (
                      <Link
                        key={item}
                        href="#"
                        className="block text-slate-300 hover:text-white transition-colors font-medium"
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media & Newsletter */}
          <div className="border-t border-slate-700/50 py-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-white">Stay Connected</h4>
                <div className="flex space-x-4">
                  {[
                    { icon: Instagram, label: "Instagram", color: "from-slate-600 to-slate-800" },
                    { icon: Twitter, label: "Twitter", color: "from-slate-600 to-slate-800" },
                    { icon: Facebook, label: "Facebook", color: "from-slate-600 to-slate-800" },
                  ].map(({ icon: Icon, label, color }) => (
                    <Button
                      key={label}
                      size="sm"
                      variant="ghost"
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${color} hover:scale-110 hover:from-slate-500 hover:to-slate-700 transition-all duration-300 shadow-lg hover:shadow-xl border border-slate-600`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-bold text-white">Get Love Tips</h4>
                <div className="flex space-x-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="rounded-xl border-slate-600 bg-slate-800/50 text-white placeholder:text-slate-400 focus:border-slate-500 font-medium"
                  />
                  <Button className="bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-600 hover:to-slate-800 text-white rounded-xl px-6 font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-slate-600">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-700/50 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-slate-400 text-sm font-medium">
                &copy; {new Date().getFullYear()} zlovr. All rights reserved. Made with ❤️ for finding love.
              </div>
              <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
                {["Privacy Policy", "Terms of Service", "Cookie Policy", "Accessibility"].map((item) => (
                  <Link key={item} href="#" className="text-slate-400 hover:text-white transition-colors font-medium">
                    {item}
                  </Link>
                ))}
              </div>
            </div>
            <div className="mt-6 text-center">
              <div className="inline-flex items-center space-x-2 px-6 py-3 bg-slate-800/50 backdrop-blur-sm rounded-full border border-slate-700/50">
                <span className="text-sm text-slate-300 font-medium">
                  Inclusive • Safe • Authentic • LGBTQ+ Friendly • Global Community
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
