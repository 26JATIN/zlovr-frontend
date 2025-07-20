"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  Users,
  Flag,
  BarChart3,
  Settings,
  Shield,
  HeadphonesIcon,
  DollarSign,
  FileText,
  Menu,
  X,
  LogOut,
  Bell,
  Search,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { Suspense } from "react"
import Image from "next/image"

const navigation = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
    badge: null,
    description: "Overview & stats",
  },
  {
    name: "Users",
    href: "/admin/users",
    icon: Users,
    badge: "2.4k",
    description: "Manage users",
  },
  {
    name: "Reports",
    href: "/admin/reports",
    icon: Flag,
    badge: "12",
    description: "User reports",
  },
  {
    name: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
    badge: null,
    description: "App insights",
  },
  {
    name: "Content",
    href: "/admin/content",
    icon: FileText,
    badge: null,
    description: "App content",
  },
  {
    name: "Moderation",
    href: "/admin/moderation",
    icon: Shield,
    badge: "8",
    description: "Content review",
  },
  {
    name: "Support",
    href: "/admin/support",
    icon: HeadphonesIcon,
    badge: "5",
    description: "Help tickets",
  },
  {
    name: "Revenue",
    href: "/admin/revenue",
    icon: DollarSign,
    badge: null,
    description: "Monetization",
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
    badge: null,
    description: "App settings",
  },
]

// Desktop Sidebar Navigation
const DesktopSidebar = ({ collapsed, setCollapsed, pathname }) => {
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
              width: collapsed ? 0 : "auto",
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
              duration: 0.3,
              delay: collapsed ? 0 : 0.1,
            }}
            className="overflow-hidden ml-3"
          >
            <span className="text-2xl font-bold text-gray-900 tracking-tight whitespace-nowrap">Admin</span>
          </motion.div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 min-h-0 overflow-y-auto">
          {navigation.map((item) => {
            const IconComponent = item.icon
            const isActive = pathname === item.href
            return (
              <motion.div key={item.name}>
                <Link href={item.href}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "w-full flex items-center rounded-2xl text-left h-14 transition-all duration-200",
                      collapsed ? "justify-center px-2" : "px-4",
                      isActive && !collapsed
                        ? "bg-gradient-to-r from-slate-50 to-slate-100 text-slate-800 shadow-sm border border-slate-200"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                    )}
                  >
                    <div
                      className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 flex-shrink-0 relative",
                        isActive
                          ? "bg-gradient-to-br from-slate-600 to-slate-800 text-white"
                          : "bg-gray-100 text-gray-600",
                      )}
                    >
                      <IconComponent className="w-5 h-5" />
                      {item.badge && (
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-red-500 text-white border-2 border-white">
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{
                        opacity: collapsed ? 0 : 1,
                        x: collapsed ? -10 : 0,
                        width: collapsed ? 0 : "auto",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                        duration: 0.3,
                        delay: collapsed ? 0 : 0.1,
                      }}
                      className="overflow-hidden ml-4 flex-1 min-w-0"
                    >
                      <div className="whitespace-nowrap">
                        <div className="font-semibold text-base">{item.name}</div>
                        <div className="text-sm opacity-70">{item.description}</div>
                      </div>
                    </motion.div>
                  </motion.div>
                </Link>
              </motion.div>
            )
          })}
        </nav>

        {/* Admin Profile - Fixed positioning */}
        <div className="flex-shrink-0 border-t border-gray-100 pt-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: collapsed ? 0 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
              duration: 0.3,
              delay: collapsed ? 0 : 0.2,
            }}
            className="overflow-hidden mb-4"
          >
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
              Admin Panel
            </h3>
          </motion.div>

          <div className="space-y-2">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "w-full flex items-center rounded-2xl text-left h-14 transition-all duration-200",
                collapsed ? "justify-center px-2" : "px-4",
                "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
              )}
            >
              <Avatar
                className={cn("transition-all duration-300 flex-shrink-0", collapsed ? "h-10 w-10" : "h-10 w-10")}
              >
                <AvatarImage src="/placeholder.svg?height=40&width=40&text=Admin" />
                <AvatarFallback className="bg-slate-100 text-slate-600">AD</AvatarFallback>
              </Avatar>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{
                  opacity: collapsed ? 0 : 1,
                  x: collapsed ? -10 : 0,
                  width: collapsed ? 0 : "auto",
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                  duration: 0.3,
                  delay: collapsed ? 0 : 0.1,
                }}
                className="overflow-hidden ml-4 flex-1 min-w-0"
              >
                <div className="whitespace-nowrap">
                  <div className="font-semibold text-base">Admin User</div>
                  <div className="text-sm opacity-70">admin@zlovr.com</div>
                </div>
              </motion.div>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "w-full flex items-center rounded-2xl text-left h-14 transition-all duration-200",
                collapsed ? "justify-center px-2" : "px-4",
                "text-red-600 hover:bg-red-50 hover:text-red-700",
              )}
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 flex-shrink-0",
                  "bg-red-100 text-red-600",
                )}
              >
                <LogOut className="w-5 h-5" />
              </div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{
                  opacity: collapsed ? 0 : 1,
                  x: collapsed ? -10 : 0,
                  width: collapsed ? 0 : "auto",
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                  duration: 0.3,
                  delay: collapsed ? 0 : 0.1,
                }}
                className="overflow-hidden ml-4 flex-1 min-w-0"
              >
                <div className="whitespace-nowrap">
                  <div className="font-semibold text-base">Sign Out</div>
                  <div className="text-sm opacity-70">Log out of admin</div>
                </div>
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Mobile Sidebar
const MobileSidebar = ({ sidebarOpen, setSidebarOpen, pathname }) => {
  return (
    <AnimatePresence>
      {sidebarOpen && (
        <>
          {/* Mobile sidebar overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />

          {/* Mobile Sidebar */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-2xl lg:hidden"
          >
            <div className="h-full flex flex-col">
              {/* Mobile header */}
              <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-white">
                <div className="flex items-center space-x-3">
                  <Image
                    src="/heart-logo.png"
                    alt="zlovr logo"
                    width={32}
                    height={32}
                    className="w-8 h-8 object-contain"
                  />
                  <span className="text-xl font-bold text-gray-900">zlovr Admin</span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Mobile Navigation */}
              <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto bg-white">
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "flex items-center justify-between px-4 py-4 rounded-xl text-sm font-medium transition-colors",
                        isActive
                          ? "bg-gradient-to-r from-slate-50 to-slate-100 text-slate-800 shadow-sm border border-slate-200"
                          : "text-gray-700 hover:bg-gray-100",
                      )}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center relative",
                            isActive
                              ? "bg-gradient-to-br from-slate-600 to-slate-800 text-white"
                              : "bg-gray-100 text-gray-600",
                          )}
                        >
                          <item.icon className="h-5 w-5" />
                          {item.badge && (
                            <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs bg-red-500 text-white border-2 border-white">
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-base">{item.name}</div>
                          <div className="text-sm opacity-70">{item.description}</div>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </nav>

              {/* Mobile Admin profile */}
              <div className="p-6 border-t border-gray-200 bg-white">
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder.svg?height=48&width=48&text=Admin" />
                    <AvatarFallback className="bg-slate-100 text-slate-600">AD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-semibold text-gray-900 truncate">Admin User</p>
                    <p className="text-sm text-gray-500 truncate">admin@zlovr.com</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="w-full justify-start text-red-600 hover:bg-red-50 h-12">
                  <LogOut className="h-5 w-5 mr-3" />
                  <span className="font-semibold">Sign out</span>
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Header Component
const Header = ({ sidebarCollapsed, isMobile, setSidebarOpen }) => {
  return (
    <header
      className={cn(
        "fixed top-0 right-0 z-30 bg-white/95 backdrop-blur-xl border-b border-gray-100/50 shadow-sm transition-all duration-300 ease-in-out",
        !isMobile ? (sidebarCollapsed ? "left-24" : "left-72") : "left-0",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden p-2 hover:bg-gray-100/80 rounded-xl transition-all duration-200"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>

            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search users, reports..."
                className="pl-10 w-80 bg-gray-50/50 border-gray-200/50 focus:bg-white transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="relative p-2 hover:bg-gray-100/80 rounded-xl transition-all duration-200"
            >
              <Bell className="h-5 w-5 text-gray-700" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-red-500 text-white border-2 border-white">
                3
              </Badge>
            </Button>

            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32&text=Admin" />
              <AvatarFallback className="bg-slate-100 text-slate-600 text-xs">AD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  )
}

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (sidebarOpen && isMobile) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [sidebarOpen, isMobile])

  // Dynamic sidebar padding class
  const sidebarPad = !isMobile ? (sidebarCollapsed ? "pl-24" : "pl-72") : ""
  const sidebarPadWithTransition = !isMobile ? `${sidebarPad} transition-all duration-300 ease-in-out` : ""

  return (
    <Suspense fallback={null}>
      <div className="min-h-screen bg-gray-50">
        <DesktopSidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} pathname={pathname} />

        <MobileSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} pathname={pathname} />

        <div className={sidebarPadWithTransition}>
          <Header sidebarCollapsed={sidebarCollapsed} isMobile={isMobile} setSidebarOpen={setSidebarOpen} />

          {/* Page content with proper top padding */}
          <main className="pt-16 lg:pt-18 p-6">{children}</main>
        </div>
      </div>
    </Suspense>
  )
}
