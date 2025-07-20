"use client"

import React, { useState, useEffect, useRef, useLayoutEffect } from "react"
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
} from "motion/react"
import MagicBento from "@/components/MagicBento"
import SplashCursor from "@/components/SplashCursor"
import { TracingBeam } from "@/components/ui/tracing-beam"

// Modern Header Component
const Header = ({ hide, transparentNav }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "About", href: "#about" },
    { name: "Safety", href: "#safety" },
  ]

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
      transparentNav
        ? "bg-transparent shadow-none border-none"
        : isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-red-100"
          : "bg-transparent",
      hide ? "opacity-0 pointer-events-none" : "opacity-100"
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
                  "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl",
                  isScrolled && "shadow-red-200"
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
                    className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-medium shadow-lg"
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
  const [hideNav, setHideNav] = useState(false)
  const loveQuotesRef = useRef(null)
  // Remove all lockQuotes, quotesComplete, lock/unlock logic, and placeholderRef
  const [currentQuote, setCurrentQuote] = useState(0)
  const [fade, setFade] = useState(true)

  const handleNext = () => {
    setFade(false)
    setTimeout(() => {
      setCurrentQuote((prev) => (prev + 1) % loveQuotes.length)
      setFade(true)
    }, 500)
  }
  const handlePrev = () => {
    setFade(false)
    setTimeout(() => {
      setCurrentQuote((prev) => (prev - 1 + loveQuotes.length) % loveQuotes.length)
      setFade(true)
    }, 500)
  }

  // IntersectionObserver for navbar auto-hide and lock-in
  useEffect(() => {
    const section = loveQuotesRef.current
    if (!section) return
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setHideNav(entry.isIntersecting)
        // Only lock if section is fully in view and not already locked or completed
        // if (entry.isIntersecting && !quotesComplete && !lockQuotes) {
        //   setLockedScrollY(window.scrollY)
        //   setLockQuotes(true)
        // }
        // Only unlock if completed and not intersecting
        // if (!entry.isIntersecting && quotesComplete && lockQuotes) {
        //   setLockQuotes(false)
        // }
      },
      { threshold: 0.99 } // require almost full section in view
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  // Scroll-based carousel logic
  const lastScroll = useRef(Date.now())
  const handleWheel = (e) => {
    const now = Date.now()
    if (now - lastScroll.current < 800) return // debounce
    if (e.deltaY > 0) {
      if (currentQuote === loveQuotes.length - 1) {
        // If on last quote, unlock on next scroll
        // setQuotesComplete(true)
        // setLockQuotes(false)
      } else {
        handleNext()
      }
    } else if (e.deltaY < 0) {
      if (currentQuote === 0) {
        // If user scrolls up after unlocking, relock and go to last quote
        // setQuotesComplete(false)
        // setLockQuotes(true)
        // setCurrentQuote(loveQuotes.length - 1)
      } else {
        handlePrev()
      }
    }
    lastScroll.current = now
  }
  // Touch support
  const touchStartY = useRef(null)
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY
  }
  const handleTouchEnd = (e) => {
    if (touchStartY.current === null) return
    const deltaY = e.changedTouches[0].clientY - touchStartY.current
    if (Math.abs(deltaY) > 40) {
      if (deltaY < 0) {
        if (currentQuote === loveQuotes.length - 1) {
          // setQuotesComplete(true)
          // setLockQuotes(false)
        } else {
          handleNext()
        }
      }
      else {
        if (currentQuote === 0) {
          // setQuotesComplete(false)
          // setLockQuotes(true)
          // setCurrentQuote(loveQuotes.length - 1)
        } else {
          handlePrev()
        }
      }
    }
    touchStartY.current = null
  }

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
      ".scroll-fade-in, .scroll-slide-left, .scroll-slide-right, .scroll-scale, .scroll-fade-in-up",
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

  // Lock/unlock body scroll and manage scroll position
  useLayoutEffect(() => {
    // if (lockQuotes) {
    //   document.body.classList.add('overflow-hidden')
    //   // Scroll to the locked section's top
    //   if (loveQuotesRef.current) {
    //     const rect = loveQuotesRef.current.getBoundingClientRect()
    //     const scrollTo = window.scrollY + rect.top
    //     window.scrollTo({ top: scrollTo })
    //   }
    // } else {
    //   document.body.classList.remove('overflow-hidden')
    //   // Restore scroll position to placeholder
    //   if (quotesComplete && placeholderRef.current) {
    //     const rect = placeholderRef.current.getBoundingClientRect()
    //     const scrollTo = window.scrollY + rect.top
    //     window.scrollTo({ top: scrollTo })
    //   }
    // }
    return () => {
      // document.body.classList.remove('overflow-hidden')
    }
  }, [])

  // Love Quotes Data
  const loveQuotes = [
    {
      author: "Maya Angelou",
      image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      bgClass: "bg-red-500",
      quote: "A wise woman wishes to be no one's enemy; a wise woman refuses to be anyone's victim.",
      desc: "True love begins with self-respect and understanding your own worth. When you know who you are, you attract the right kind of love into your life.",
      position: "left"
    },
    {
      author: "Rumi",
      image: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      bgClass: "bg-pink-500",
      quote: "Let yourself be silently drawn by the strange pull of what you really love. It will not lead you astray.",
      desc: "Follow your heart's calling. True connections happen when we're authentic to ourselves and open to the magic of genuine attraction.",
      position: "right"
    },
    {
      author: "Paulo Coelho",
      image: "https://images.unsplash.com/photo-1504593811423-6dd665756598?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      bgClass: "bg-rose-500",
      quote: "And, when you want something, all the universe conspires in helping you to achieve it.",
      desc: "When you're ready for love and open your heart to possibilities, the universe has a way of bringing the right person into your life.",
      position: "center"
    },
    {
      author: "Jane Austen",
      image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      bgClass: "bg-red-600",
      quote: "There is nothing like staying at home for real comfort.",
      desc: "True love creates a sense of home - not just a place, but a feeling of belonging, comfort, and safety with another person.",
      position: "left"
    },
    {
      author: "Bell Hooks",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      bgClass: "bg-pink-600",
      quote: "Sometimes people try to destroy you, precisely because they recognize your power.",
      desc: "Healthy love celebrates your strength and growth. The right person will encourage your dreams and support your journey to become your best self.",
      position: "right"
    },
  ]

  // Love Quotes Section - Scroll-driven sticky logic
  const [quoteScrollProgress, setQuoteScrollProgress] = useState(0)
  const loveQuotesSectionRef = useRef(null)
  const [hideNavForQuotes, setHideNavForQuotes] = useState(false)

  // IntersectionObserver to auto-hide navbar when love quotes section is in view
  useEffect(() => {
    const section = loveQuotesSectionRef.current
    if (!section) return
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setHideNavForQuotes(entry.isIntersecting)
      },
      { threshold: 0.5 }
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!loveQuotesSectionRef.current) return
      const section = loveQuotesSectionRef.current
      const rect = section.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      if (rect.top <= 0 && rect.bottom >= 0) {
        const sectionScrolled = Math.abs(rect.top)
        const totalScrollableHeight = rect.height - viewportHeight
        let progress = Math.min(sectionScrolled / totalScrollableHeight, 1)
        setQuoteScrollProgress(progress)
      }
    }
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

  // Love Quote Card (like StoryCard)
  const LoveQuoteCard = ({ quote, index, scrollProgress }) => {
    // Calculate progress for this quote
    const total = loveQuotes.length
    const quoteStart = index / (total - 1)
    const quoteEnd = (index + 1) / (total - 1)
    let opacity = 0
    let translateY = 40
    let scale = 0.96
    const fadeInStart = quoteStart - 0.05
    const fadeOutStart = quoteEnd - 0.05
    const fadeOutEnd = quoteEnd + 0.05
    const isActive = scrollProgress >= quoteStart && scrollProgress <= quoteEnd
    if (index === total - 1) {
      // Last quote: fade in at 80%, fully visible at 90%
      if (scrollProgress >= 0.8) {
        if (scrollProgress <= 0.9) {
          const fadeProgress = (scrollProgress - 0.8) / 0.1
          opacity = Math.max(0, Math.min(1, fadeProgress))
          translateY = 40 * (1 - fadeProgress)
          scale = 0.96 + 0.04 * fadeProgress
        } else {
          opacity = 1
          translateY = 0
          scale = 1
        }
      } else {
        opacity = 0
        translateY = 40
        scale = 0.96
      }
      return (
        <div
          className="absolute inset-0 flex items-end justify-center overflow-hidden"
          style={{
            opacity,
            transform: `translateY(${translateY}px) scale(${scale})`,
            pointerEvents: isActive ? "auto" : "none",
            zIndex: opacity > 0.1 ? 10 : 1,
            transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          {/* Background Image */}
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0" style={{ backgroundImage: `url('${quote.image}')` }}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          </div>
          {/* Splash Cursor over photo, under text */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            <SplashCursor
              SIM_RESOLUTION={64}
              DYE_RESOLUTION={512}
              DENSITY_DISSIPATION={2.5}
              VELOCITY_DISSIPATION={1.8}
              PRESSURE={0.05}
              CURL={1}
              SPLAT_RADIUS={0.12}
              SPLAT_FORCE={1500}
              SHADING={false}
              COLOR_UPDATE_SPEED={3}
              BACK_COLOR={{ r: 0.02, g: 0.01, b: 0.02 }}
              TRANSPARENT={true}
            />
          </div>
          {/* Quote block */}
          <div className={`absolute bottom-0 w-full p-8 md:p-16 flex items-end z-20 ${quote.position === 'left' ? 'justify-start' : quote.position === 'right' ? 'justify-end' : 'justify-center'}`}>
            <div className={`max-w-2xl ${quote.position === 'center' ? 'text-center' : quote.position === 'right' ? 'text-right ml-auto' : ''}`}> 
              <div className="mb-6">
                <span className={`${quote.bgClass} text-white rounded-full text-sm px-6 py-2 font-medium shadow-lg`}>{quote.author}</span>
              </div>
              <blockquote className="text-2xl md:text-4xl font-bold text-white leading-tight mb-6 drop-shadow-lg">
                "{quote.quote}"
              </blockquote>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed drop-shadow-md">
                {quote.desc}
              </p>
            </div>
          </div>
        </div>
      )
    }
    // For other quotes
    if (scrollProgress >= fadeInStart && scrollProgress <= fadeOutEnd) {
      if (scrollProgress <= quoteStart) {
        const fadeProgress = (scrollProgress - fadeInStart) / (quoteStart - fadeInStart)
        opacity = Math.max(0, Math.min(1, fadeProgress))
        translateY = 40 * (1 - fadeProgress)
        scale = 0.96 + 0.04 * fadeProgress
      } else if (scrollProgress >= fadeOutStart) {
        const fadeProgress = (scrollProgress - fadeOutStart) / (fadeOutEnd - fadeOutStart)
        opacity = Math.max(0, Math.min(1, 1 - fadeProgress))
        translateY = 40 * fadeProgress
        scale = 0.96 + 0.04 * (1 - fadeProgress)
      } else {
        opacity = 1
        translateY = 0
        scale = 1
      }
    }
    if (scrollProgress < fadeInStart || scrollProgress > fadeOutEnd) {
      opacity = 0
      translateY = 40
      scale = 0.96
    }
    // Only hide quotes far from current
    const currentQuoteIndex = Math.round(scrollProgress * (total - 1))
    if (Math.abs(index - currentQuoteIndex) > 2) {
      opacity = 0
      translateY = 40
      scale = 0.96
    }
    return (
      <div
        className="absolute inset-0 flex items-end justify-center overflow-hidden"
        style={{
          opacity,
          transform: `translateY(${translateY}px) scale(${scale})`,
          pointerEvents: isActive ? "auto" : "none",
          zIndex: opacity > 0.1 ? 10 : 1,
          transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        {/* Background Image */}
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0" style={{ backgroundImage: `url('${quote.image}')` }}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        </div>
        {/* Splash Cursor over photo, under text */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <SplashCursor
            SIM_RESOLUTION={64}
            DYE_RESOLUTION={512}
            DENSITY_DISSIPATION={2.5}
            VELOCITY_DISSIPATION={1.8}
            PRESSURE={0.05}
            CURL={1}
            SPLAT_RADIUS={0.12}
            SPLAT_FORCE={1500}
            SHADING={false}
            COLOR_UPDATE_SPEED={3}
            BACK_COLOR={{ r: 0.02, g: 0.01, b: 0.02 }}
            TRANSPARENT={true}
          />
        </div>
        {/* Quote block */}
        <div className={`absolute bottom-0 w-full p-8 md:p-16 flex items-end z-20 ${quote.position === 'left' ? 'justify-start' : quote.position === 'right' ? 'justify-end' : 'justify-center'}`}>
          <div className={`max-w-2xl ${quote.position === 'center' ? 'text-center' : quote.position === 'right' ? 'text-right ml-auto' : ''}`}> 
            <div className="mb-6">
              <span className={`${quote.bgClass} text-white rounded-full text-sm px-6 py-2 font-medium shadow-lg`}>{quote.author}</span>
            </div>
            <blockquote className="text-2xl md:text-4xl font-bold text-white leading-tight mb-6 drop-shadow-lg">
              "{quote.quote}"
            </blockquote>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed drop-shadow-md">
              {quote.desc}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* New Floating Navbar */}
      <Header hide={hideNav || hideNavForQuotes} transparentNav={hideNavForQuotes} />

      {/* Full Screen Hero Section - Heart themed */}
      <section className="relative h-screen hero-bg flex items-center justify-center overflow-hidden pt-0">
        {/* Heart-themed Splash Cursor Animation - constrained to hero section */}
        <div className="absolute inset-0 z-0">
          <SplashCursor
            SIM_RESOLUTION={64}
            DYE_RESOLUTION={512}
            DENSITY_DISSIPATION={2.5}
            VELOCITY_DISSIPATION={1.8}
            PRESSURE={0.05}
            CURL={1}
            SPLAT_RADIUS={0.12}
            SPLAT_FORCE={1500}
            SHADING={false}
            COLOR_UPDATE_SPEED={3}
            BACK_COLOR={{ r: 0.02, g: 0.01, b: 0.02 }}
            TRANSPARENT={true}
          />
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Main Heading with Heart-themed styling */}
            <div className="space-y-6">
              <div className="flex items-center justify-center mb-6">
                <div className="heart-pulse mr-4">
                  <Heart className="w-16 h-16 text-red-400 fill-current" />
                </div>
                <h1 className="text-6xl lg:text-8xl font-bold-custom text-white smooth-write text-glow">zlovr</h1>
                <div className="heart-pulse ml-4">
                  <Heart className="w-16 h-16 text-pink-400 fill-current" />
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl lg:text-4xl font-bold text-white/90 smooth-write-delayed">
                  Where Hearts Find Their Home
                </h2>
                <p className="text-xl lg:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed smooth-write-delayed-2 font-medium">
                  Discover meaningful connections with people who truly understand you
                </p>
              </div>
            </div>

            {/* CTA Buttons - Heart themed */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up stagger-3">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 rounded-full px-12 py-6 text-xl font-bold btn-subtle"
                >
                  <Heart className="w-6 h-6 mr-2 fill-current" />
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
        </div>
      </section>

      {/* Features Section - Heart themed */}
      <section id="features" className="py-20 gradient-heart">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 scroll-fade-in">
            <div className="inline-flex items-center px-6 py-3 bg-red-100 rounded-full text-red-700 text-sm font-medium mb-6">
              <Heart className="w-4 h-4 mr-2 fill-current" />
              Why Choose zlovr
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Features Made with 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500"> Love</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              Advanced technology meets genuine human connection
            </p>
          </div>

          <div className="flex justify-center">
            <MagicBento
              textAutoHide={true}
              enableStars={true}
              enableSpotlight={true}
              enableBorderGlow={true}
              disableAnimations={false}
              spotlightRadius={300}
              particleCount={8}
              enableTilt={true}
              glowColor="239, 68, 68"
              clickEffect={true}
              enableMagnetism={true}
            />
          </div>
        </div>
      </section>

      {/* Love Quotes Section - Scroll-driven sticky logic */}
      <section id="love-quotes" className="relative">
        <div ref={loveQuotesSectionRef} className="h-[600vh] relative">
          <div className="sticky top-0 h-screen w-full overflow-hidden">
            {/* Splash Cursor as background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <SplashCursor
                SIM_RESOLUTION={64}
                DYE_RESOLUTION={512}
                DENSITY_DISSIPATION={2.5}
                VELOCITY_DISSIPATION={1.8}
                PRESSURE={0.05}
                CURL={1}
                SPLAT_RADIUS={0.12}
                SPLAT_FORCE={1500}
                SHADING={false}
                COLOR_UPDATE_SPEED={3}
                BACK_COLOR={{ r: 0.02, g: 0.01, b: 0.02 }}
                TRANSPARENT={true}
              />
            </div>
            {/* Quotes on top of splash cursor */}
            {loveQuotes.map((quote, index) => (
              <LoveQuoteCard key={index} quote={quote} index={index} scrollProgress={quoteScrollProgress} />
            ))}
          </div>
        </div>
      </section>

      {/* Final inspirational section */}
      <section className="relative h-screen overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scroll-parallax"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1511988617509-a57c8a288659?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-red-900/70 via-pink-900/30 to-transparent"></div>
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center p-8 md:p-16">
          <div className="max-w-4xl text-center scroll-fade-in-up">
            <Heart className="w-16 h-16 text-white fill-current mx-auto mb-8 heart-pulse drop-shadow-lg" />
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-8 drop-shadow-lg">
              Your Love Story Awaits
            </h3>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-12 drop-shadow-md">
              Every great love story begins with a single moment of connection. 
              Let zlovr be the place where your beautiful journey starts.
            </p>
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold px-12 py-6 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                <Heart className="w-6 h-6 mr-3 fill-current" />
                Begin Your Journey
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer - Clean white theme */}
      <footer className="bg-white border-t border-gray-200 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-red-50 rounded-full opacity-60 blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-pink-50 rounded-full opacity-60 blur-xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Main Footer Content */}
          <div className="py-16 border-b border-gray-200">
            <div className="grid lg:grid-cols-3 gap-12 items-center">
              {/* Brand Section */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center heart-pulse">
                    <Heart className="w-6 h-6 text-white fill-current" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">zlovr</span>
                </div>
                <p className="text-gray-600 text-base leading-relaxed max-w-sm">
                  Where hearts find their home. Building meaningful connections through technology and care.
                </p>
              </div>

              {/* Quick Links */}
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-gray-900">Quick Links</h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "How It Works",
                    "Safety Center", 
                    "Success Stories",
                    "Contact Us",
                    "Privacy Policy",
                    "Terms of Service"
                  ].map((item) => (
                    <Link
                      key={item}
                      href="#"
                      className="text-gray-600 hover:text-red-600 transition-colors duration-300 text-sm font-medium"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Contact & Social */}
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-gray-900">Connect</h4>
                <div className="space-y-4">
                  {/* Contact Info */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">hello@zlovr.com</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">1-800-ZLOVR</span>
                    </div>
                  </div>
                  
                  {/* Social Links */}
                  <div className="flex space-x-3">
                    {[
                      { icon: Instagram, label: "Instagram" },
                      { icon: Twitter, label: "Twitter" },
                      { icon: Facebook, label: "Facebook" },
                    ].map(({ icon: Icon, label }) => (
                      <Button
                        key={label}
                        size="sm"
                        variant="ghost"
                        className="w-9 h-9 p-0 rounded-lg bg-gray-100 hover:bg-red-50 hover:text-red-600 transition-all duration-300 hover:scale-110"
                      >
                        <Icon className="w-4 h-4 text-gray-600" />
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="py-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} zlovr. All rights reserved.
              </div>
              
              {/* Values Badge */}
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <Heart className="w-3 h-3 text-red-500 fill-current" />
                <span>Safe • Inclusive • Authentic</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
