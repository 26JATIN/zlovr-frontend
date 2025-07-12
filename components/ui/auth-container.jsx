import React from "react"
import { motion, AnimatePresence } from "motion/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export const AuthContainer = ({
  mode,
  children,
  infoPanel,
  onSwitchMode,
  switchLabel,
  switchText,
  isLoading = false,
}) => {
  // Check if we're on mobile
  const [isMobile, setIsMobile] = React.useState(false)
  
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 px-4 py-4 md:px-2 md:py-8">
              <div className="w-full max-w-6xl h-screen md:h-[600px] relative overflow-hidden rounded-3xl shadow-2xl bg-white/80 backdrop-blur-sm border-0">
        {/* Info Panel - Hidden on mobile, visible on desktop */}
        <motion.div
          className="hidden md:flex absolute top-0 h-full w-1/2 flex-col justify-center items-center bg-gradient-to-br from-slate-800 to-slate-900 text-white p-8 overflow-y-auto"
          initial={{
            x: mode === "signin" ? "-100%" : "100%",
          }}
          animate={{
            x: mode === "signin" ? "100%" : "0%",
          }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30,
            duration: 0.8 
          }}
        >
          {infoPanel}
        </motion.div>

        {/* Form Container - Full width on mobile, half width on desktop */}
        <motion.div
          className="absolute top-0 h-full w-full md:w-1/2 flex flex-col justify-center p-6 md:p-8 lg:p-12 bg-white/90 overflow-y-auto [&::-webkit-scrollbar]:hidden"
          style={{
            scrollbarWidth: 'none', /* Firefox */
            msOverflowStyle: 'none', /* Internet Explorer 10+ */
          }}
          animate={{
            x: isMobile ? "0%" : (mode === "signin" ? "0%" : "100%"),
            opacity: 1,
            y: 0
          }}
          initial={{ 
            x: isMobile ? "0%" : (mode === "signin" ? "0%" : "0%"),
            opacity: 0, 
            y: 20 
          }}
          transition={{ 
            x: { 
              type: "spring", 
              stiffness: 300, 
              damping: 30, 
              duration: isMobile ? 0 : 0.8
            },
            opacity: { duration: 0.5, ease: "easeOut" },
            y: { duration: 0.5, ease: "easeOut" }
          }}
        >
          {/* Back to Home Button */}
          <div className="mb-8 flex justify-end">
            <Link href="/">
              <Button variant="ghost" className="text-slate-600 hover:text-slate-800 hover:bg-slate-100 text-sm px-4 py-2">
                Back to Home
              </Button>
            </Link>
          </div>
          
          {/* Form Content */}
          <div className="flex-1 flex flex-col justify-center">
            {children}
          </div>
          
          {/* Switch Mode Link */}
          {onSwitchMode && (
            <div className="text-center pt-6">
              <span className="text-slate-600 font-medium">
                {switchText}{" "}
                <button
                  type="button"
                  onClick={onSwitchMode}
                  disabled={isLoading}
                  className="text-slate-800 hover:text-slate-900 font-semibold transition-colors duration-300 hover:underline focus:outline-none"
                >
                  {switchLabel}
                </button>
              </span>
            </div>
          )}
        </motion.div>


      </div>
    </div>
  )
} 