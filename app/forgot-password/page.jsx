"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Mail,
  Loader2,
  Heart,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Shield,
  Users,
  Star,
} from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"
import { AuthContainer } from "@/components/ui/auth-container"
import { useRouter } from "next/navigation"

export default function AuthPage() {
  const router = useRouter()
  // Forgot Password State
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  // Info Panel Content
  const infoPanel = (
    <div className="space-y-8 w-full">
      <div className="flex flex-col items-center space-y-2">
        <Shield className="w-10 h-10 text-blue-400 animate-pulse" />
        <h2 className="text-2xl font-bold text-white">Secure Password Recovery</h2>
        <p className="text-white/80 text-center text-sm">Don't worry! We'll help you get back to finding love safely and securely.</p>
      </div>
      <div className="space-y-4">
        {[
          {
            icon: <Shield className="w-5 h-5 text-blue-300" />,
            title: "Secure Reset Process",
            desc: "All password reset links are encrypted and expire after 1 hour.",
          },
          {
            icon: <Mail className="w-5 h-5 text-green-300" />,
            title: "Email Verification",
            desc: "We only send reset links to verified email addresses.",
          },
          {
            icon: <Heart className="w-5 h-5 text-pink-300" />,
            title: "Account Protection",
            desc: "Your account is protected with industry-standard security.",
          },
        ].map((f) => (
          <div key={f.title} className="flex items-center space-x-3">
            <div>{f.icon}</div>
            <div>
              <div className="font-semibold text-white">{f.title}</div>
              <div className="text-xs text-white/70">{f.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white/10 rounded-xl p-4 border border-white/20">
        <h4 className="font-semibold text-white mb-3">Security Tips</h4>
        <div className="space-y-2 text-xs text-white/80">
          <div className="flex items-start space-x-2">
            <div className="w-1 h-1 bg-white rounded-full mt-2 flex-shrink-0"></div>
            <span>Never share your password reset link with anyone</span>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-1 h-1 bg-white rounded-full mt-2 flex-shrink-0"></div>
            <span>Use a strong, unique password for your account</span>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-1 h-1 bg-white rounded-full mt-2 flex-shrink-0"></div>
            <span>Enable two-factor authentication for extra security</span>
          </div>
        </div>
      </div>
    </div>
  )

  // Forgot Password Form
  const forgotPasswordForm = (
    <>
      <CardHeader className="text-center pb-8 pt-4">
        <CardTitle className="text-3xl font-bold text-slate-800 mb-2">Reset Password</CardTitle>
        <p className="text-slate-600 font-medium">Enter your email to receive reset instructions</p>
      </CardHeader>
      <CardContent className="px-0 pb-8">
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              onSubmit={async (e) => {
                e.preventDefault()
                if (!email) {
                  setError("Please enter your email address")
                  return
                }
                if (!/\S+@\S+\.\S+/.test(email)) {
                  setError("Please enter a valid email address")
                  return
                }
                setError("")
                setIsLoading(true)
                await new Promise((r) => setTimeout(r, 2000))
                setIsLoading(false)
                setIsSuccess(true)
              }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700 font-medium">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (error) setError("")
                    }}
                    className={cn(
                      "pl-12 pr-4 py-3 border-2 rounded-xl",
                      error ? "border-red-300 focus:border-red-500 focus:ring-red-200" : "border-slate-200 hover:border-slate-300"
                    )}
                    disabled={isLoading}
                  />
                </div>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-2 text-red-500 text-sm font-medium"
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                  </motion.div>
                )}
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-slate-950 text-white py-3 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sending...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5" />
                    <span>Send Reset Link</span>
                  </div>
                )}
              </Button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center space-y-6"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-lg"
              >
                <CheckCircle className="w-10 h-10 text-white" />
              </motion.div>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-slate-800">Check Your Email</h3>
                <p className="text-slate-600 font-medium leading-relaxed">
                  We've sent password reset instructions to{" "}
                  <span className="font-semibold text-slate-800">{email}</span>
                </p>
                <p className="text-slate-500 text-sm">
                  If you don't see the email, check your spam folder or try again.
                </p>
              </div>

              <div className="space-y-4 pt-4">
                <Button
                  onClick={() => {
                    setIsSuccess(false)
                    setEmail("")
                  }}
                  className="w-full bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-slate-950 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                >
                  Send Another Email
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </>
  )

  return (
    <AuthContainer
      mode="forgot"
      infoPanel={infoPanel}
      onSwitchMode={() => {
        // Add a delay to show the animation
        setTimeout(() => {
          router.push("/signin")
        }, 800)
      }}
      switchLabel="Sign in here"
      switchText="Remember your password?"
      isLoading={isLoading}
    >
      <Card className="bg-transparent border-0 shadow-none">
        {forgotPasswordForm}
      </Card>
    </AuthContainer>
  )
} 