"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import {
  Bell,
  Settings,
  User,
  Edit,
  Camera,
  ChevronRight,
  Shield,
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
  LogOut,
  Heart,
  Users,
  Baby,
  Briefcase,
  MapPin,
  Save,
  Upload,
  X,
  Star,
  CreditCard,
  MessageCircle,
  ArrowLeft,
} from "lucide-react"
import Image from "next/image"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import { useDatingLayout } from "../layout"
import { useRouter } from "next/navigation"

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
  Meditation: Users,
  Volunteering: Heart,
  Gardening: Mountain,
  Fashion: Palette,
  Networking: Users,
  Writing: Book,
  Podcasts: Headphones,
  Investing: Briefcase,
  Languages: GraduationCap,
  Startups: Code,
  Sustainability: Mountain,
  Wellness: Heart,
}

// Enhanced Profile Header Component
const ProfileHeader = () => {
  const router = useRouter()

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm"
    >
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-slate-800 rounded-xl flex items-center justify-center shadow-sm">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Profile</h1>
              <p className="text-sm text-gray-500 font-medium">Manage your dating profile</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/dating/matches")}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-xl text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200"
            >
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">Matches</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/dating/messages")}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-slate-500 to-slate-600 text-white rounded-xl text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Messages</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200"
            >
              <Settings className="w-5 h-5 text-gray-600" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Enhanced Profile Settings Component
const ProfileSettings = ({ onBack }) => {
  const { Header, sidebarCollapsed, isMobile } = useDatingLayout()
  const [profile, setProfile] = useState({
    // Basic Information
    firstName: "John",
    lastName: "Doe",
    dateOfBirth: "1995-06-15",
    gender: "man",
    sexualOrientation: "straight",
    location: "San Francisco, CA",

    // Physical Details
    height: 72, // inches
    bodyType: "athletic",
    ethnicity: "white",

    // Lifestyle
    education: "bachelors",
    occupation: "Software Engineer",
    company: "Tech Corp",
    religion: "agnostic",
    smoking: "never",
    drinking: "socially",
    exercise: "often",

    // Family
    hasChildren: "no",
    wantsChildren: "maybe",

    // Dating Preferences
    relationshipGoals: "long-term",
    ageRangePreference: [25, 35],
    maxDistance: 25,

    // Profile
    bio: "Software engineer who loves hiking and photography. Always up for trying new restaurants and exploring the city!",
    interests: ["Technology", "Hiking", "Photography", "Travel", "Coffee", "Fitness"],

    // Photos
    photos: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      null,
      null,
      null,
      null,
      null,
    ],
  })

  const [activeSection, setActiveSection] = useState("basic")
  const [isSaving, setIsSaving] = useState(false)

  const updateProfile = useCallback((key, value) => {
    setProfile((prev) => ({ ...prev, [key]: value }))
  }, [])

  const handleInterestToggle = (interest) => {
    const newInterests = profile.interests.includes(interest)
      ? profile.interests.filter((i) => i !== interest)
      : [...profile.interests, interest]
    updateProfile("interests", newInterests)
  }

  const handlePhotoUpload = (index) => {
    // Simulate photo upload
    const newPhotos = [...profile.photos]
    newPhotos[index] =
      `https://images.unsplash.com/photo-${Math.random().toString(36).substr(2, 9)}?w=400&h=400&fit=crop`
    updateProfile("photos", newPhotos)
  }

  const handlePhotoRemove = (index) => {
    const newPhotos = [...profile.photos]
    newPhotos[index] = null
    updateProfile("photos", newPhotos)
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    // Show success message or redirect
  }

  const formatHeight = (inches) => {
    const feet = Math.floor(inches / 12)
    const remainingInches = inches % 12
    return `${feet}'${remainingInches}"`
  }

  const calculateAge = (dateOfBirth) => {
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  const sections = [
    { id: "basic", label: "Basic Info", icon: User },
    { id: "physical", label: "Physical", icon: Dumbbell },
    { id: "lifestyle", label: "Lifestyle", icon: Coffee },
    { id: "family", label: "Family", icon: Baby },
    { id: "dating", label: "Dating", icon: Heart },
    { id: "profile", label: "Profile", icon: Edit },
    { id: "photos", label: "Photos", icon: Camera },
    { id: "plans", label: "Plans", icon: CreditCard },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm"
      >
        <div className="flex items-center justify-between p-4 sm:p-6">
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </motion.button>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-slate-800 rounded-xl flex items-center justify-center shadow-sm">
                <Edit className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Edit Profile</h1>
                <p className="text-sm text-gray-500 font-medium">Update your dating information</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="pt-4 pb-32 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
          {/* Section Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <Card className="p-4 bg-white shadow-sm border border-gray-100 rounded-2xl">
              <h3 className="font-bold mb-4 text-gray-900">Edit Sections</h3>
              <div className="space-y-1">
                {sections.map((section) => {
                  const IconComponent = section.icon
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={cn(
                        "w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 text-left",
                        activeSection === section.id
                          ? "bg-slate-100 text-slate-700 font-medium"
                          : "hover:bg-gray-50 text-gray-600",
                      )}
                    >
                      <IconComponent className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm">{section.label}</span>
                    </button>
                  )
                })}
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <Card className="p-6 md:p-8 bg-white shadow-sm border border-gray-100 rounded-2xl">
              {/* Basic Information */}
              {activeSection === "basic" && (
                <div className="space-y-6">
                  <h3 className="font-bold text-xl text-gray-900">Basic Information</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">First Name</Label>
                      <Input
                        value={profile.firstName}
                        onChange={(e) => updateProfile("firstName", e.target.value)}
                        className="border-gray-200 focus:border-slate-400 rounded-xl"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">Last Name</Label>
                      <Input
                        value={profile.lastName}
                        onChange={(e) => updateProfile("lastName", e.target.value)}
                        className="border-gray-200 focus:border-slate-400 rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">Date of Birth</Label>
                    <Input
                      type="date"
                      value={profile.dateOfBirth}
                      onChange={(e) => updateProfile("dateOfBirth", e.target.value)}
                      className="border-gray-200 focus:border-slate-400 rounded-xl"
                    />
                    <p className="text-xs text-gray-500 mt-1">Age: {calculateAge(profile.dateOfBirth)}</p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">Gender</Label>
                    <Select value={profile.gender} onValueChange={(value) => updateProfile("gender", value)}>
                      <SelectTrigger className="border-gray-200 focus:border-slate-400 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="man">Man</SelectItem>
                        <SelectItem value="woman">Woman</SelectItem>
                        <SelectItem value="non-binary">Non-binary</SelectItem>
                        <SelectItem value="transgender">Transgender</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">Sexual Orientation</Label>
                    <Select
                      value={profile.sexualOrientation}
                      onValueChange={(value) => updateProfile("sexualOrientation", value)}
                    >
                      <SelectTrigger className="border-gray-200 focus:border-slate-400 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="straight">Straight</SelectItem>
                        <SelectItem value="gay">Gay</SelectItem>
                        <SelectItem value="lesbian">Lesbian</SelectItem>
                        <SelectItem value="bisexual">Bisexual</SelectItem>
                        <SelectItem value="pansexual">Pansexual</SelectItem>
                        <SelectItem value="asexual">Asexual</SelectItem>
                        <SelectItem value="demisexual">Demisexual</SelectItem>
                        <SelectItem value="queer">Queer</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        value={profile.location}
                        onChange={(e) => updateProfile("location", e.target.value)}
                        className="border-gray-200 focus:border-slate-400 rounded-xl pl-10"
                        placeholder="City, State"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Physical Details */}
              {activeSection === "physical" && (
                <div className="space-y-6">
                  <h3 className="font-bold text-xl text-gray-900">Physical Details</h3>

                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">Height</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        min="48"
                        max="96"
                        value={profile.height}
                        onChange={(e) => updateProfile("height", Number.parseInt(e.target.value))}
                        className="border-gray-200 focus:border-slate-400 rounded-xl w-24"
                      />
                      <span className="text-gray-500">inches ({formatHeight(profile.height)})</span>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">Body Type</Label>
                    <Select value={profile.bodyType} onValueChange={(value) => updateProfile("bodyType", value)}>
                      <SelectTrigger className="border-gray-200 focus:border-slate-400 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="slim">Slim</SelectItem>
                        <SelectItem value="athletic">Athletic</SelectItem>
                        <SelectItem value="average">Average</SelectItem>
                        <SelectItem value="curvy">Curvy</SelectItem>
                        <SelectItem value="plus-size">Plus size</SelectItem>
                        <SelectItem value="muscular">Muscular</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">Ethnicity</Label>
                    <Select value={profile.ethnicity} onValueChange={(value) => updateProfile("ethnicity", value)}>
                      <SelectTrigger className="border-gray-200 focus:border-slate-400 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asian">Asian</SelectItem>
                        <SelectItem value="black">Black/African American</SelectItem>
                        <SelectItem value="hispanic">Hispanic/Latino</SelectItem>
                        <SelectItem value="white">White/Caucasian</SelectItem>
                        <SelectItem value="middle-eastern">Middle Eastern</SelectItem>
                        <SelectItem value="native-american">Native American</SelectItem>
                        <SelectItem value="pacific-islander">Pacific Islander</SelectItem>
                        <SelectItem value="mixed">Mixed/Multiracial</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Lifestyle */}
              {activeSection === "lifestyle" && (
                <div className="space-y-6">
                  <h3 className="font-bold text-xl text-gray-900">Lifestyle</h3>

                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">Education</Label>
                    <Select value={profile.education} onValueChange={(value) => updateProfile("education", value)}>
                      <SelectTrigger className="border-gray-200 focus:border-slate-400 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high-school">High School</SelectItem>
                        <SelectItem value="some-college">Some College</SelectItem>
                        <SelectItem value="associates">Associate's Degree</SelectItem>
                        <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                        <SelectItem value="masters">Master's Degree</SelectItem>
                        <SelectItem value="phd">PhD/Doctorate</SelectItem>
                        <SelectItem value="trade-school">Trade School</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">Occupation</Label>
                      <Input
                        value={profile.occupation}
                        onChange={(e) => updateProfile("occupation", e.target.value)}
                        className="border-gray-200 focus:border-slate-400 rounded-xl"
                        placeholder="Job title"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">Company</Label>
                      <Input
                        value={profile.company}
                        onChange={(e) => updateProfile("company", e.target.value)}
                        className="border-gray-200 focus:border-slate-400 rounded-xl"
                        placeholder="Company name"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">Religion</Label>
                    <Select value={profile.religion} onValueChange={(value) => updateProfile("religion", value)}>
                      <SelectTrigger className="border-gray-200 focus:border-slate-400 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="christian">Christian</SelectItem>
                        <SelectItem value="catholic">Catholic</SelectItem>
                        <SelectItem value="jewish">Jewish</SelectItem>
                        <SelectItem value="muslim">Muslim</SelectItem>
                        <SelectItem value="hindu">Hindu</SelectItem>
                        <SelectItem value="buddhist">Buddhist</SelectItem>
                        <SelectItem value="sikh">Sikh</SelectItem>
                        <SelectItem value="spiritual">Spiritual</SelectItem>
                        <SelectItem value="agnostic">Agnostic</SelectItem>
                        <SelectItem value="atheist">Atheist</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">Smoking</Label>
                      <Select value={profile.smoking} onValueChange={(value) => updateProfile("smoking", value)}>
                        <SelectTrigger className="border-gray-200 focus:border-slate-400 rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="never">Never</SelectItem>
                          <SelectItem value="socially">Socially</SelectItem>
                          <SelectItem value="regularly">Regularly</SelectItem>
                          <SelectItem value="trying-to-quit">Trying to quit</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">Drinking</Label>
                      <Select value={profile.drinking} onValueChange={(value) => updateProfile("drinking", value)}>
                        <SelectTrigger className="border-gray-200 focus:border-slate-400 rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="never">Never</SelectItem>
                          <SelectItem value="socially">Socially</SelectItem>
                          <SelectItem value="regularly">Regularly</SelectItem>
                          <SelectItem value="occasionally">Occasionally</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">Exercise</Label>
                      <Select value={profile.exercise} onValueChange={(value) => updateProfile("exercise", value)}>
                        <SelectTrigger className="border-gray-200 focus:border-slate-400 rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="never">Never</SelectItem>
                          <SelectItem value="rarely">Rarely</SelectItem>
                          <SelectItem value="sometimes">Sometimes</SelectItem>
                          <SelectItem value="often">Often</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {/* Family */}
              {activeSection === "family" && (
                <div className="space-y-6">
                  <h3 className="font-bold text-xl text-gray-900">Family</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">Do you have children?</Label>
                      <Select
                        value={profile.hasChildren}
                        onValueChange={(value) => updateProfile("hasChildren", value)}
                      >
                        <SelectTrigger className="border-gray-200 focus:border-slate-400 rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                          <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">Do you want children?</Label>
                      <Select
                        value={profile.wantsChildren}
                        onValueChange={(value) => updateProfile("wantsChildren", value)}
                      >
                        <SelectTrigger className="border-gray-200 focus:border-slate-400 rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                          <SelectItem value="maybe">Maybe/Open to it</SelectItem>
                          <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {/* Dating Preferences */}
              {activeSection === "dating" && (
                <div className="space-y-6">
                  <h3 className="font-bold text-xl text-gray-900">Dating Preferences</h3>

                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">Relationship Goals</Label>
                    <Select
                      value={profile.relationshipGoals}
                      onValueChange={(value) => updateProfile("relationshipGoals", value)}
                    >
                      <SelectTrigger className="border-gray-200 focus:border-slate-400 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="long-term">Long-term relationship</SelectItem>
                        <SelectItem value="marriage">Marriage</SelectItem>
                        <SelectItem value="casual">Casual dating</SelectItem>
                        <SelectItem value="friendship">Friendship</SelectItem>
                        <SelectItem value="hookups">Hookups</SelectItem>
                        <SelectItem value="figuring-out">Still figuring it out</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">Age Range Preference</Label>
                    <div className="flex items-center gap-3">
                      <Input
                        type="number"
                        min="18"
                        max="100"
                        value={profile.ageRangePreference[0]}
                        onChange={(e) =>
                          updateProfile("ageRangePreference", [
                            Number.parseInt(e.target.value),
                            profile.ageRangePreference[1],
                          ])
                        }
                        className="w-20 border-gray-200 focus:border-slate-400 rounded-xl"
                      />
                      <span className="text-gray-500">to</span>
                      <Input
                        type="number"
                        min="18"
                        max="100"
                        value={profile.ageRangePreference[1]}
                        onChange={(e) =>
                          updateProfile("ageRangePreference", [
                            profile.ageRangePreference[0],
                            Number.parseInt(e.target.value),
                          ])
                        }
                        className="w-20 border-gray-200 focus:border-slate-400 rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">Maximum Distance</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        min="1"
                        max="100"
                        value={profile.maxDistance}
                        onChange={(e) => updateProfile("maxDistance", Number.parseInt(e.target.value))}
                        className="w-24 border-gray-200 focus:border-slate-400 rounded-xl"
                      />
                      <span className="text-gray-500">miles</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Profile */}
              {activeSection === "profile" && (
                <div className="space-y-6">
                  <h3 className="font-bold text-xl text-gray-900">Profile Details</h3>

                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">Bio</Label>
                    <textarea
                      value={profile.bio}
                      onChange={(e) => updateProfile("bio", e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-xl resize-none h-32 focus:border-slate-400 focus:outline-none transition-all duration-200"
                      placeholder="Tell people about yourself..."
                      maxLength={500}
                    />
                    <p className="text-xs text-gray-500 mt-1">{profile.bio.length}/500 characters</p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-4 block">Interests</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-80 overflow-y-auto pr-2">
                      {Object.entries(interestIcons).map(([interest, IconComponent]) => {
                        const isSelected = profile.interests.includes(interest)
                        return (
                          <motion.button
                            key={interest}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleInterestToggle(interest)}
                            className={cn(
                              "flex items-center space-x-2 p-3 rounded-xl border-2 transition-all duration-200",
                              isSelected
                                ? "border-slate-400 bg-slate-50 text-slate-700 shadow-sm"
                                : "border-gray-200 hover:border-slate-300",
                            )}
                          >
                            <IconComponent className="w-4 h-4 flex-shrink-0" />
                            <span className="text-sm font-medium truncate">{interest}</span>
                          </motion.button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Photos */}
              {activeSection === "photos" && (
                <div className="space-y-6">
                  <h3 className="font-bold text-xl text-gray-900">Photos</h3>
                  <p className="text-gray-600">Add up to 6 photos to showcase your personality</p>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {profile.photos.map((photo, index) => (
                      <div key={index} className="aspect-square relative">
                        {photo ? (
                          <div className="relative w-full h-full">
                            <Image
                              src={photo || "/placeholder.svg"}
                              alt={`Profile photo ${index + 1}`}
                              fill
                              className="object-cover rounded-2xl"
                            />
                            <button
                              onClick={() => handlePhotoRemove(index)}
                              className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                            {index === 0 && (
                              <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                                Main
                              </div>
                            )}
                          </div>
                        ) : (
                          <button
                            onClick={() => handlePhotoUpload(index)}
                            className="w-full h-full bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 hover:border-slate-400 transition-all duration-200 flex flex-col items-center justify-center"
                          >
                            <Upload className="w-6 h-6 text-gray-400 mb-2" />
                            <span className="text-sm text-gray-500">Add Photo</span>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Plans Section */}
              {activeSection === "plans" && (
                <div className="space-y-6">
                  <h3 className="font-bold text-xl text-gray-900 mb-2">Choose Your Plan</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Example plans */}
                    <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl shadow p-6 flex flex-col items-center text-center">
                      <Star className="w-8 h-8 text-yellow-400 mb-2" />
                      <h4 className="font-bold text-lg mb-1">Free</h4>
                      <p className="text-gray-500 mb-4 text-sm">Basic features to get you started</p>
                      <ul className="text-gray-700 text-sm mb-6 space-y-1">
                        <li>✔️ Swipe & Match</li>
                        <li>✔️ 1 Super Like per week</li>
                        <li>✔️ Basic Filters</li>
                      </ul>
                      <Button className="w-full rounded-xl" disabled>Current Plan</Button>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
                      <Star className="w-8 h-8 text-blue-500 mb-2" />
                      <h4 className="font-bold text-lg mb-1">Plus</h4>
                      <p className="text-gray-500 mb-4 text-sm">Unlock more features and visibility</p>
                      <ul className="text-gray-700 text-sm mb-6 space-y-1">
                        <li>✔️ Unlimited Likes</li>
                        <li>✔️ 5 Super Likes per week</li>
                        <li>✔️ Advanced Filters</li>
                        <li>✔️ See Who Liked You</li>
                      </ul>
                      <Button className="w-full rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold">Upgrade</Button>
                    </div>
                    <div className="bg-gradient-to-br from-yellow-50 to-white border border-yellow-200 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
                      <Star className="w-8 h-8 text-yellow-500 mb-2" />
                      <h4 className="font-bold text-lg mb-1">Premium</h4>
                      <p className="text-gray-500 mb-4 text-sm">All features, top priority, and more</p>
                      <ul className="text-gray-700 text-sm mb-6 space-y-1">
                        <li>✔️ Unlimited Likes</li>
                        <li>✔️ 10 Super Likes per week</li>
                        <li>✔️ See Who Liked You</li>
                        <li>✔️ Boost Profile</li>
                        <li>✔️ Priority Support</li>
                      </ul>
                      <Button className="w-full rounded-xl bg-yellow-400 hover:bg-yellow-500 text-white font-semibold">Go Premium</Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Save Button */}
              <div className="pt-6 border-t border-gray-200">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="w-full py-4 rounded-xl font-semibold bg-gradient-to-br from-slate-700 to-slate-900 hover:from-slate-800 hover:to-slate-950 text-white shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    {isSaving ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </motion.div>
              </div>
            </Card>
          </div>
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
      <ProfileHeader />
      <div className="pt-4 pb-32 px-4 sm:px-6">
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

              {/* Sign Out Button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => {
                  // Handle sign out logic here
                  console.log("Sign out clicked from profile")
                  window.location.href = "/signin"
                }}
                className="flex items-center justify-between w-full p-3 sm:p-4 md:p-5 hover:bg-red-50 rounded-xl sm:rounded-2xl transition-all duration-200 border-t border-gray-100 mt-4"
              >
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <LogOut className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0" />
                  <span className="text-red-600 font-medium text-sm sm:text-base">Sign Out</span>
                </div>
                <ChevronRight className="w-4 h-4 text-red-400 flex-shrink-0" />
              </motion.button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
