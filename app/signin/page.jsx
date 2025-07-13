"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Loader2,
  Heart,
  Github,
  Chrome,
  Sparkles,
  Shield,
  Users,
  Star,
} from "lucide-react"
import Link from "next/link"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import { AuthContainer } from "@/components/ui/auth-container"

export default function AuthPage() {
  const router = useRouter()
  const [mode, setMode] = useState("signin")
  // Sign In State
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [errors, setErrors] = useState({})

  // Sign Up State (minimal for demo)
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [signupErrors, setSignupErrors] = useState({})
  const [showSignupPassword, setShowSignupPassword] = useState(false)
  const [showSignupConfirm, setShowSignupConfirm] = useState(false)

  // Info Panel Content
  const infoPanel = (
    <div className="space-y-8 w-full">
      <div className="flex flex-col items-center space-y-2">
        <Heart className="w-10 h-10 text-pink-400 animate-pulse" />
        <h2 className="text-2xl font-bold text-white">Welcome to zlovr</h2>
        <p className="text-white/80 text-center text-sm">Find your perfect match with advanced AI matching and a safe, vibrant community.</p>
      </div>
      <div className="space-y-4">
        {[
          {
            icon: <Shield className="w-5 h-5 text-blue-300" />,
            title: "Secure & Private",
            desc: "Your data is protected with enterprise-grade security.",
          },
          {
            icon: <Users className="w-5 h-5 text-purple-300" />,
            title: "Smart Matching",
            desc: "AI-powered compatibility for better matches.",
          },
          {
            icon: <Star className="w-5 h-5 text-yellow-300" />,
            title: "Premium Experience",
            desc: "Unlimited features and priority support.",
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
    </div>
  )

  // Sign In Form
  const signInForm = (
    <>
      <CardHeader className="text-center pb-8 pt-4">
        <CardTitle className="text-3xl font-bold text-slate-800 mb-2">Sign In</CardTitle>
        <p className="text-slate-600 font-medium">Sign in to continue your love journey</p>
      </CardHeader>
      <CardContent className="px-0 pb-8">
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            setIsLoading(true)
            await new Promise((r) => setTimeout(r, 1500))
            setIsLoading(false)
            // Redirect to dating page after successful sign in
            router.push("/dating")
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
                value={formData.email}
                onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                className="pl-12 pr-4 py-3 border-2 rounded-xl"
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-700 font-medium">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData((p) => ({ ...p, password: e.target.value }))}
                className="pl-12 pr-12 py-3 border-2 rounded-xl"
                disabled={isLoading}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 h-auto text-slate-400 hover:text-slate-600"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="rememberMe"
                checked={formData.rememberMe}
                onCheckedChange={(checked) => setFormData((p) => ({ ...p, rememberMe: checked }))}
                disabled={isLoading}
                className="border-slate-300 data-[state=checked]:bg-slate-700 data-[state=checked]:border-slate-700"
              />
              <Label htmlFor="rememberMe" className="text-slate-600 font-medium cursor-pointer">Remember me</Label>
            </div>
            <Link href="/forgot-password" className="text-slate-600 hover:text-slate-800 font-medium transition-colors duration-300">Forgot password?</Link>
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-slate-950 text-white py-3 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:transform-none"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Signing in...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5" />
                <span>Sign In</span>
              </div>
            )}
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-500 font-medium">Or continue with</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              variant="outline"
              disabled={isLoading}
              className="py-3 border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-xl font-medium transition-all duration-300"
            >
              <Chrome className="w-5 h-5 mr-2" />
              Google
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={isLoading}
              className="py-3 border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-xl font-medium transition-all duration-300"
            >
              <Github className="w-5 h-5 mr-2" />
              GitHub
            </Button>
          </div>
        </form>
      </CardContent>
    </>
  )

  // Sign Up Form (minimal, for demo)
  const signUpForm = (
    <>
      <CardHeader className="text-center pb-8 pt-4">
        <CardTitle className="text-3xl font-bold text-slate-800 mb-2">Sign Up</CardTitle>
        <p className="text-slate-600 font-medium">Create your account and start your journey</p>
      </CardHeader>
      <CardContent className="px-0 pb-8">
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            setIsLoading(true)
            await new Promise((r) => setTimeout(r, 1500))
            setIsLoading(false)
          }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <Label htmlFor="signup-email" className="text-slate-700 font-medium">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                id="signup-email"
                type="email"
                placeholder="Enter your email"
                value={signupData.email}
                onChange={(e) => setSignupData((p) => ({ ...p, email: e.target.value }))}
                className="pl-12 pr-4 py-3 border-2 rounded-xl"
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-password" className="text-slate-700 font-medium">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                id="signup-password"
                type={showSignupPassword ? "text" : "password"}
                placeholder="Create a password"
                value={signupData.password}
                onChange={(e) => setSignupData((p) => ({ ...p, password: e.target.value }))}
                className="pl-12 pr-12 py-3 border-2 rounded-xl"
                disabled={isLoading}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowSignupPassword((v) => !v)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 h-auto text-slate-400 hover:text-slate-600"
                disabled={isLoading}
              >
                {showSignupPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-confirm" className="text-slate-700 font-medium">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                id="signup-confirm"
                type={showSignupConfirm ? "text" : "password"}
                placeholder="Confirm your password"
                value={signupData.confirmPassword}
                onChange={(e) => setSignupData((p) => ({ ...p, confirmPassword: e.target.value }))}
                className="pl-12 pr-12 py-3 border-2 rounded-xl"
                disabled={isLoading}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowSignupConfirm((v) => !v)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 h-auto text-slate-400 hover:text-slate-600"
                disabled={isLoading}
              >
                {showSignupConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-slate-950 text-white py-3 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:transform-none"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Signing up...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5" />
                <span>Sign Up</span>
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </>
  )

  return (
    <AuthContainer
      mode="signin"
      infoPanel={infoPanel}
      onSwitchMode={() => {
        // Add a longer delay to show the animation
        setTimeout(() => {
          router.push("/signup")
        }, 800)
      }}
      switchLabel="Sign up here"
      switchText="Don't have an account?"
      isLoading={isLoading}
    >
      <Card className="bg-transparent border-0 shadow-none">
        {signInForm}
      </Card>
    </AuthContainer>
  )
} 