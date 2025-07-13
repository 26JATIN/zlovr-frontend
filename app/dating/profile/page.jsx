"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Bell,
  Settings,
  User,
  Edit,
  Camera,
  ChevronRight,
  Shield,
  Sparkles,
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
  GraduationCap,
  ArrowLeft,
} from "lucide-react"
import Image from "next/image"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

// Interest icons mapping
const interestIcons = {
  Hiking: Mountain,
  Photography: CameraIcon,
  Travel: Plane,
  Yoga: User,
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

// Enhanced Header Component
const Header = ({ title, onBack, actions }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-18">
          <div className="flex items-center space-x-2 sm:space-x-3">
            {onBack && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="p-1.5 sm:p-2 hover:bg-gray-100/80 rounded-xl transition-all duration-200 active:scale-95 -ml-1"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
              </Button>
            )}
            <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-xl bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center shadow-lg">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
            </div>
            <span className="text-base sm:text-lg md:text-xl font-bold text-gray-900 tracking-tight">zlovr</span>
          </div>

          {title && (
            <h1 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 tracking-tight truncate max-w-[120px] xs:max-w-[150px] sm:max-w-[200px] md:max-w-none">
              {title}
            </h1>
          )}

          <div className="flex items-center space-x-1 sm:space-x-2">
            {actions || (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1.5 sm:p-2 md:p-2.5 hover:bg-gray-100/80 rounded-xl transition-all duration-200 active:scale-95"
                >
                  <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1.5 sm:p-2 md:p-2.5 hover:bg-gray-100/80 rounded-xl transition-all duration-200 active:scale-95"
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

// Enhanced Profile Settings Component
const ProfileSettings = ({ onBack }) => {
  const [profile, setProfile] = useState({
    name: "John",
    age: 28,
    bio: "Software engineer who loves hiking and photography",
    job: "Software Engineer",
    education: "Stanford University",
    height: "6'0\"",
    interests: ["Technology", "Hiking", "Photography", "Travel"],
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Edit Profile" onBack={onBack} />

      <div className="pt-14 sm:pt-16 lg:pt-18 pb-20 sm:pb-24 px-3 sm:px-4 md:px-6 max-w-2xl mx-auto">
        <div className="space-y-6 sm:space-y-8">
          {/* Enhanced Profile Photos */}
          <Card className="p-4 sm:p-6 md:p-8 bg-white shadow-sm border border-gray-100 rounded-2xl sm:rounded-3xl">
            <h3 className="font-bold mb-4 sm:mb-6 text-gray-900 tracking-tight text-lg sm:text-xl">Photos</h3>
            <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="aspect-square bg-gray-50 rounded-xl sm:rounded-2xl md:rounded-3xl flex items-center justify-center border-2 border-dashed border-gray-200 hover:border-slate-400 transition-all duration-200 cursor-pointer"
                >
                  {index === 1 ? (
                    <Image
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
                      alt="Profile"
                      width={200}
                      height={200}
                      className="w-full h-full object-cover rounded-xl sm:rounded-2xl md:rounded-3xl"
                    />
                  ) : (
                    <Camera className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-gray-400" />
                  )}
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Enhanced Basic Info */}
          <Card className="p-4 sm:p-6 md:p-8 bg-white shadow-sm border border-gray-100 rounded-2xl sm:rounded-3xl">
            <h3 className="font-bold mb-4 sm:mb-6 text-gray-900 tracking-tight text-lg sm:text-xl">Basic Information</h3>
            <div className="space-y-4 sm:space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Name</label>
                <Input
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="border-gray-200 focus:border-slate-400 rounded-xl font-medium"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Age</label>
                <Input
                  type="number"
                  value={profile.age}
                  onChange={(e) => setProfile({ ...profile, age: Number.parseInt(e.target.value) })}
                  className="border-gray-200 focus:border-slate-400 rounded-xl font-medium"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Bio</label>
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-xl resize-none h-20 sm:h-24 focus:border-slate-400 focus:outline-none transition-all duration-200 font-medium"
                  placeholder="Tell us about yourself..."
                />
              </div>
            </div>
          </Card>

          {/* Enhanced Work & Education */}
          <Card className="p-4 sm:p-6 md:p-8 bg-white shadow-sm border border-gray-100 rounded-2xl sm:rounded-3xl">
            <h3 className="font-bold mb-4 sm:mb-6 text-gray-900 tracking-tight text-lg sm:text-xl">Work & Education</h3>
            <div className="space-y-4 sm:space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Job Title</label>
                <Input
                  value={profile.job}
                  onChange={(e) => setProfile({ ...profile, job: e.target.value })}
                  className="border-gray-200 focus:border-slate-400 rounded-xl font-medium"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Education</label>
                <Input
                  value={profile.education}
                  onChange={(e) => setProfile({ ...profile, education: e.target.value })}
                  className="border-gray-200 focus:border-slate-400 rounded-xl font-medium"
                />
              </div>
            </div>
          </Card>

          {/* Enhanced Interests */}
          <Card className="p-4 sm:p-6 md:p-8 bg-white shadow-sm border border-gray-100 rounded-2xl sm:rounded-3xl">
            <h3 className="font-bold mb-4 sm:mb-6 text-gray-900 tracking-tight text-lg sm:text-xl">Interests</h3>
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3">
              {Object.keys(interestIcons).map((interest) => {
                const IconComponent = interestIcons[interest]
                const isSelected = profile.interests.includes(interest)
                return (
                  <motion.button
                    key={interest}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      if (isSelected) {
                        setProfile({
                          ...profile,
                          interests: profile.interests.filter((i) => i !== interest),
                        })
                      } else {
                        setProfile({
                          ...profile,
                          interests: [...profile.interests, interest],
                        })
                      }
                    }}
                    className={cn(
                      "flex items-center space-x-2 sm:space-x-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all duration-200",
                      isSelected
                        ? "border-slate-400 bg-slate-50 text-slate-700 shadow-sm"
                        : "border-gray-200 hover:border-slate-300",
                    )}
                  >
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    <span className="text-sm font-medium truncate">{interest}</span>
                  </motion.button>
                )
              })}
            </div>
          </Card>

          {/* Enhanced Save Button */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button className="w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold bg-gradient-to-br from-slate-700 to-slate-900 hover:from-slate-800 hover:to-slate-950 text-white shadow-xl hover:shadow-2xl transition-all duration-300">
              Save Changes
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default function ProfilePage() {
  const [showEditProfile, setShowEditProfile] = useState(false)

  if (showEditProfile) {
    return <ProfileSettings onBack={() => setShowEditProfile(false)} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Profile" />
      <div className="pt-14 sm:pt-16 lg:pt-18 pb-24 sm:pb-32 px-3 sm:px-4 md:px-6">
        <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8">
          {/* Enhanced Profile Preview */}
          <Card className="p-4 sm:p-6 md:p-8 bg-white shadow-sm border border-gray-100 rounded-2xl sm:rounded-3xl">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-6 sm:mb-8">
              <Avatar className="w-16 h-16 sm:w-20 sm:h-20 ring-2 ring-gray-100 mx-auto sm:mx-0">
                <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" />
                <AvatarFallback className="bg-gray-100 text-gray-600 font-semibold">JD</AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">John, 28</h2>
                <p className="text-gray-600 font-medium text-sm sm:text-base">Software Engineer</p>
                <p className="text-xs sm:text-sm text-gray-500 font-medium">Stanford University</p>
              </div>
            </div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={() => setShowEditProfile(true)}
                className="w-full rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 hover:from-slate-800 hover:to-slate-950 text-white font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 py-3 sm:py-4"
                variant="default"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </motion.div>
          </Card>

          {/* Enhanced Settings */}
          <Card className="p-4 sm:p-6 md:p-8 bg-white shadow-sm border border-gray-100 rounded-2xl sm:rounded-3xl">
            <h3 className="font-bold mb-4 sm:mb-6 text-gray-900 tracking-tight text-lg sm:text-xl">Settings</h3>
            <div className="space-y-2 sm:space-y-3">
              {[
                { icon: Bell, label: "Notifications" },
                { icon: Shield, label: "Privacy" },
                { icon: Settings, label: "Account Settings" },
              ].map((item, index) => (
                <motion.button
                  key={item.label}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="flex items-center justify-between w-full p-3 sm:p-4 md:p-5 hover:bg-gray-50 rounded-xl sm:rounded-2xl transition-all duration-200"
                >
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 flex-shrink-0" />
                    <span className="text-gray-900 font-medium text-sm sm:text-base">{item.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                </motion.button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
