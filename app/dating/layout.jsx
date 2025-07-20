"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { 
  Heart, 
  MessageCircle, 
  Filter, 
  Settings, 
  User, 
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
  Sparkles, 
  Bell,
  LogOut
} from 'lucide-react'
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { FilterModal } from "@/components/filter-modal"
import Image from "next/image"

// Create a context to share header functionality
import { createContext, useContext } from "react"

const DatingLayoutContext = createContext()

export const useDatingLayout = () => {
  const context = useContext(DatingLayoutContext)
  if (!context) {
    throw new Error('useDatingLayout must be used within DatingLayout')
  }
  return context
}

// Enhanced Header Component
const Header = ({ title, onBack, actions, sidebarCollapsed, isMobile }) => {
  return (
    <header 
      className={cn(
        "fixed top-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100/50 shadow-sm transition-all duration-300 ease-in-out",
        !isMobile ? (sidebarCollapsed ? "left-24" : "left-72") : "left-0"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {onBack && (
            <Button
              variant="ghost"
              size="sm"
              className="p-2 sm:p-2.5 hover:bg-gray-100/80 rounded-xl transition-all duration-200 active:scale-95"
              onClick={onBack}
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
            </Button>
          )}

          {title && (
            <h1 className={cn(
              "text-lg sm:text-xl font-semibold text-gray-900 tracking-tight truncate max-w-[200px] sm:max-w-none",
              !onBack && "ml-0"
            )}>
              {title}
            </h1>
          )}

          <div className="flex items-center space-x-1 sm:space-x-2 ml-auto">
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

// Desktop Sidebar Navigation
const DesktopSidebar = ({ activeTab, onTabChange, collapsed, setCollapsed, onFiltersChange, currentFilters }) => {
  const router = useRouter()
  
  const tabs = [
    { id: "discover", icon: Heart, label: "Discover", description: "Find new people", href: "/dating" },
    { id: "matches", icon: Users, label: "Matches", description: "Your connections", href: "/dating/matches" },
    { id: "messages", icon: MessageCircle, label: "Messages", description: "Chat with matches", href: "/dating/messages" },
    { id: "profile", icon: User, label: "Profile", description: "Edit your profile", href: "/dating/profile" },
  ];

  const handleTabClick = (tab) => {
    onTabChange(tab.id)
    router.push(tab.href)
  }

  return (
    <motion.div
      className="fixed left-0 top-0 bottom-0 z-40 hidden lg:block bg-white border-r border-gray-100 shadow-sm"
      initial={{ width: 96 }}
      animate={{ width: collapsed ? 96 : 288 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0.4 }}
      onMouseEnter={() => setCollapsed(false)}
      onMouseLeave={() => setCollapsed(true)}
    >
      <div className="overflow-hidden h-full flex flex-col p-6">
        {/* Logo Section */}
        <div className="flex items-center flex-shrink-0 mb-8 h-10">
          <Image
            src="/heart-logo.png"
            alt="zlovr logo"
            width={40}
            height={40}
            className="w-10 h-10 object-contain flex-shrink-0"
          />
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ 
              opacity: collapsed ? 0 : 1,
              x: collapsed ? -10 : 0,
              width: collapsed ? 0 : "auto"
            }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 25, 
              duration: 0.3,
              delay: collapsed ? 0 : 0.1
            }}
            className="overflow-hidden ml-3"
          >
            <span className="text-2xl font-bold text-gray-900 tracking-tight whitespace-nowrap">zlovr</span>
          </motion.div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 space-y-2 min-h-0">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleTabClick(tab)}
                className={cn(
                  "w-full flex items-center rounded-2xl text-left h-14 transition-all duration-200",
                  collapsed ? "justify-center px-2" : "px-4",
                  isActive && !collapsed
                    ? "bg-gradient-to-r from-slate-50 to-slate-100 text-slate-800 shadow-sm border border-slate-200"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 flex-shrink-0",
                    isActive
                      ? "bg-gradient-to-br from-slate-600 to-slate-800 text-white"
                      : "bg-gray-100 text-gray-600"
                  )}
                >
                  <IconComponent className="w-5 h-5" />
                </div>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ 
                    opacity: collapsed ? 0 : 1,
                    x: collapsed ? -10 : 0,
                    width: collapsed ? 0 : "auto"
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 25, 
                    duration: 0.3,
                    delay: collapsed ? 0 : 0.1
                  }}
                  className="overflow-hidden ml-4 flex-1 min-w-0"
                >
                  <div className="whitespace-nowrap">
                    <div className="font-semibold text-base">{tab.label}</div>
                    <div className="text-sm opacity-70">{tab.description}</div>
                  </div>
                </motion.div>
              </motion.button>
            );
          })}
        </nav>

        {/* Quick Actions - Fixed positioning */}
        <div className="flex-shrink-0 border-t border-gray-100 pt-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: collapsed ? 0 : 1
            }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 25, 
              duration: 0.3,
              delay: collapsed ? 0 : 0.2
            }}
            className="overflow-hidden mb-4"
          >
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Quick Actions</h3>
          </motion.div>
          
          <div className="space-y-2">
            <FilterModal 
              onFiltersChange={onFiltersChange}
              currentFilters={currentFilters}
              collapsed={collapsed}
              isMobile={false}
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                console.log('Sign out clicked')
                router.push('/signin')
              }}
              className={cn(
                "w-full flex items-center rounded-2xl text-left h-14 transition-all duration-200",
                collapsed ? "justify-center px-2" : "px-4",
                "text-red-600 hover:bg-red-50 hover:text-red-700"
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 flex-shrink-0",
                "bg-red-100 text-red-600"
              )}>
                <LogOut className="w-5 h-5" />
              </div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ 
                  opacity: collapsed ? 0 : 1,
                  x: collapsed ? -10 : 0,
                  width: collapsed ? 0 : "auto"
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 400, 
                  damping: 25, 
                  duration: 0.3,
                  delay: collapsed ? 0 : 0.1
                }}
                className="overflow-hidden ml-4 flex-1 min-w-0"
              >
                <div className="whitespace-nowrap">
                  <div className="font-semibold text-base">Sign Out</div>
                  <div className="text-sm opacity-70">Log out of account</div>
                </div>
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Enhanced Bottom Navigation Component (Mobile Only)
const BottomNavigation = ({ activeTab, onTabChange, onFiltersChange, currentFilters }) => {
  const router = useRouter()
  
  const tabs = [
    { id: "discover", icon: Heart, label: "Discover", href: "/dating" },
    { id: "matches", icon: Users, label: "Matches", href: "/dating/matches" },
    { id: "messages", icon: MessageCircle, label: "Messages", href: "/dating/messages" },
    { id: "profile", icon: User, label: "Profile", href: "/dating/profile" },
  ]

  const handleTabClick = (tab) => {
    onTabChange(tab.id)
    router.push(tab.href)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-100/50 shadow-lg z-30 lg:hidden">
      <div className="max-w-md mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-around h-16 sm:h-20">
          {tabs.map((tab) => {
            const IconComponent = tab.icon
            const isActive = activeTab === tab.id
            return (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTabClick(tab)}
                className={cn(
                  "flex flex-col items-center space-y-1 sm:space-y-2 p-2 sm:p-3 rounded-2xl transition-all duration-200",
                  isActive ? "text-slate-700 bg-slate-50" : "text-gray-500 hover:text-gray-700",
                )}
              >
                <IconComponent className={cn("w-5 h-5 sm:w-6 sm:h-6", isActive && "fill-current")} />
                <span className="text-xs font-semibold tracking-tight">{tab.label}</span>
              </motion.button>
            )
          })}
          
          {/* Filter Button */}
          <div className="flex flex-col items-center space-y-1 sm:space-y-2">
            <FilterModal 
              onFiltersChange={onFiltersChange}
              currentFilters={currentFilters}
              collapsed={false}
              isMobile={true}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// Main layout content component
const DatingLayoutContent = ({ children }) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isMobile, setIsMobile] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true)
  const [activeTab, setActiveTab] = useState("discover")
  const [currentFilters, setCurrentFilters] = useState({
    ageRange: [18, 50],
    distance: 25,
    interests: [],
    relationshipType: "all",
    onlineOnly: false,
    verifiedOnly: false,
  })

  // Check if we're in a chat view (has match parameter)
  const isInChat = searchParams?.get("match")

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Update active tab based on pathname
  useEffect(() => {
    if (pathname.includes('/discover')) {
      setActiveTab('discover')
    } else if (pathname.includes('/matches')) {
      setActiveTab('matches')
    } else if (pathname.includes('/messages')) {
      setActiveTab('messages')
    } else if (pathname.includes('/profile')) {
      setActiveTab('profile')
    }
  }, [pathname])

  const handleFiltersChange = (newFilters) => {
    setCurrentFilters(newFilters)
    // Here you would typically apply the filters to your data
    console.log('Filters changed:', newFilters)
  }

  // Dynamic sidebar padding class
  const sidebarPad = !isMobile ? (sidebarCollapsed ? "pl-24" : "pl-72") : ""
  const sidebarPadWithTransition = !isMobile ? `${sidebarPad} transition-all duration-300 ease-in-out` : ""

  const contextValue = {
    Header,
    sidebarCollapsed,
    isMobile,
    activeTab,
    setActiveTab
  }

  return (
    <DatingLayoutContext.Provider value={contextValue}>
      <div className="min-h-screen bg-gray-50">
        <Suspense fallback={null}>
          <DesktopSidebar 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
            collapsed={sidebarCollapsed} 
            setCollapsed={setSidebarCollapsed} 
            onFiltersChange={handleFiltersChange}
            currentFilters={currentFilters}
          />
        </Suspense>
        
        <div className={sidebarPadWithTransition}>
          {children}
        </div>
        
        {/* Only show bottom navigation if not in a chat */}
        {!isInChat && (
          <Suspense fallback={null}>
            <BottomNavigation 
              activeTab={activeTab} 
              onTabChange={setActiveTab} 
              onFiltersChange={handleFiltersChange}
              currentFilters={currentFilters}
            />
          </Suspense>
        )}
      </div>
    </DatingLayoutContext.Provider>
  )
}

export default function DatingLayout({ children }) {
  return (
    <Suspense fallback={null}>
      <DatingLayoutContent children={children} />
    </Suspense>
  )
}
