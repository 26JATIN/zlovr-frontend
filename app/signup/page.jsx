"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Loader2,
  Heart,
  Shield,
  Users,
  Star,
  ArrowLeft,
  ArrowRight,
  MapPin,
  Calendar,
  Briefcase,
  Camera,
  Plus,
  X,
  Check,
  Save,
} from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"
import { AuthContainer } from "@/components/ui/auth-container"

const STEPS = [
  { id: 1, title: "Account", description: "Create your account" },
  { id: 2, title: "Basic Info", description: "Tell us about yourself" },
  { id: 3, title: "Details", description: "More about you" },
  { id: 4, title: "Lifestyle", description: "Your lifestyle" },
  { id: 5, title: "Preferences", description: "Dating preferences" },
  { id: 6, title: "Profile", description: "Complete your profile" },
]

const STORAGE_KEY = "zlovr_signup_data"

// Step 1: Account Creation
function AccountStep({ formData, updateFormData, errors, showPassword, setShowPassword, showConfirmPassword, setShowConfirmPassword }) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-slate-700 font-medium">
          Email Address
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => updateFormData("email", e.target.value)}
            className={cn("pl-12 pr-4 py-3 border-2 rounded-xl", errors.email && "border-red-500")}
          />
        </div>
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-slate-700 font-medium">
          Phone Number
        </Label>
        <Input
          id="phone"
          type="tel"
          placeholder="Enter your phone number"
          value={formData.phone}
          onChange={(e) => updateFormData("phone", e.target.value)}
          className={cn("py-3 border-2 rounded-xl", errors.phone && "border-red-500")}
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-slate-700 font-medium">
          Password
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
            value={formData.password}
            onChange={(e) => updateFormData("password", e.target.value)}
            className={cn("pl-12 pr-12 py-3 border-2 rounded-xl", errors.password && "border-red-500")}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 h-auto text-slate-400 hover:text-slate-600"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
        </div>
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-slate-700 font-medium">
          Confirm Password
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={(e) => updateFormData("confirmPassword", e.target.value)}
            className={cn("pl-12 pr-12 py-3 border-2 rounded-xl", errors.confirmPassword && "border-red-500")}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 h-auto text-slate-400 hover:text-slate-600"
          >
            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
        </div>
        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
      </div>
    </div>
  )
}

// Step 2: Basic Information
function BasicInfoStep({ formData, updateFormData, errors }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-slate-700 font-medium">
            First Name
          </Label>
          <Input
            id="firstName"
            placeholder="First name"
            value={formData.firstName}
            onChange={(e) => updateFormData("firstName", e.target.value)}
            className={cn("py-3 border-2 rounded-xl", errors.firstName && "border-red-500")}
          />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-slate-700 font-medium">
            Last Name
          </Label>
          <Input
            id="lastName"
            placeholder="Last name"
            value={formData.lastName}
            onChange={(e) => updateFormData("lastName", e.target.value)}
            className={cn("py-3 border-2 rounded-xl", errors.lastName && "border-red-500")}
          />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="dateOfBirth" className="text-slate-700 font-medium">
          Date of Birth
        </Label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            id="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
            className={cn("pl-12 py-3 border-2 rounded-xl", errors.dateOfBirth && "border-red-500")}
          />
        </div>
        {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>}
      </div>

      <div className="space-y-2">
        <Label className="text-slate-700 font-medium">Gender</Label>
        <Select value={formData.gender} onValueChange={(value) => updateFormData("gender", value)}>
          <SelectTrigger className={cn("py-3 border-2 rounded-xl", errors.gender && "border-red-500")}>
            <SelectValue placeholder="Select your gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="man">Man</SelectItem>
            <SelectItem value="woman">Woman</SelectItem>
            <SelectItem value="non-binary">Non-binary</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
      </div>

      <div className="space-y-2">
        <Label className="text-slate-700 font-medium">Sexual Orientation</Label>
        <Select
          value={formData.sexualOrientation}
          onValueChange={(value) => updateFormData("sexualOrientation", value)}
        >
          <SelectTrigger className={cn("py-3 border-2 rounded-xl", errors.sexualOrientation && "border-red-500")}>
            <SelectValue placeholder="Select your orientation" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="straight">Straight</SelectItem>
            <SelectItem value="gay">Gay</SelectItem>
            <SelectItem value="lesbian">Lesbian</SelectItem>
            <SelectItem value="bisexual">Bisexual</SelectItem>
            <SelectItem value="pansexual">Pansexual</SelectItem>
            <SelectItem value="asexual">Asexual</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        {errors.sexualOrientation && <p className="text-red-500 text-sm">{errors.sexualOrientation}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="location" className="text-slate-700 font-medium">
          Location
        </Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            id="location"
            placeholder="City, State"
            value={formData.location}
            onChange={(e) => updateFormData("location", e.target.value)}
            className={cn("pl-12 py-3 border-2 rounded-xl", errors.location && "border-red-500")}
          />
        </div>
        {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
      </div>
    </div>
  )
}

// Step 3: Physical Details
function DetailsStep({ formData, updateFormData, errors }) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label className="text-slate-700 font-medium">Height</Label>
        <Select value={formData.height} onValueChange={(value) => updateFormData("height", value)}>
          <SelectTrigger className={cn("py-3 border-2 rounded-xl", errors.height && "border-red-500")}>
            <SelectValue placeholder="Select your height" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 24 }, (_, i) => {
              const feet = Math.floor((i + 48) / 12)
              const inches = (i + 48) % 12
              const height = `${feet}'${inches}"`
              return (
                <SelectItem key={height} value={height}>
                  {height}
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
        {errors.height && <p className="text-red-500 text-sm">{errors.height}</p>}
      </div>

      <div className="space-y-2">
        <Label className="text-slate-700 font-medium">Body Type</Label>
        <Select value={formData.bodyType} onValueChange={(value) => updateFormData("bodyType", value)}>
          <SelectTrigger className={cn("py-3 border-2 rounded-xl", errors.bodyType && "border-red-500")}>
            <SelectValue placeholder="Select your body type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="slim">Slim</SelectItem>
            <SelectItem value="athletic">Athletic</SelectItem>
            <SelectItem value="average">Average</SelectItem>
            <SelectItem value="curvy">Curvy</SelectItem>
            <SelectItem value="heavyset">Heavyset</SelectItem>
            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
          </SelectContent>
        </Select>
        {errors.bodyType && <p className="text-red-500 text-sm">{errors.bodyType}</p>}
      </div>

      <div className="space-y-2">
        <Label className="text-slate-700 font-medium">Ethnicity</Label>
        <Select value={formData.ethnicity} onValueChange={(value) => updateFormData("ethnicity", value)}>
          <SelectTrigger className={cn("py-3 border-2 rounded-xl", errors.ethnicity && "border-red-500")}>
            <SelectValue placeholder="Select your ethnicity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asian">Asian</SelectItem>
            <SelectItem value="black">Black/African American</SelectItem>
            <SelectItem value="hispanic">Hispanic/Latino</SelectItem>
            <SelectItem value="white">White/Caucasian</SelectItem>
            <SelectItem value="native-american">Native American</SelectItem>
            <SelectItem value="pacific-islander">Pacific Islander</SelectItem>
            <SelectItem value="mixed">Mixed</SelectItem>
            <SelectItem value="other">Other</SelectItem>
            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
          </SelectContent>
        </Select>
        {errors.ethnicity && <p className="text-red-500 text-sm">{errors.ethnicity}</p>}
      </div>

      <div className="space-y-2">
        <Label className="text-slate-700 font-medium">Do you have children?</Label>
        <Select value={formData.children} onValueChange={(value) => updateFormData("children", value)}>
          <SelectTrigger className="py-3 border-2 rounded-xl">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="no">No</SelectItem>
            <SelectItem value="yes-living-with-me">Yes, living with me</SelectItem>
            <SelectItem value="yes-not-living-with-me">Yes, not living with me</SelectItem>
            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-slate-700 font-medium">Do you want children?</Label>
        <Select value={formData.wantChildren} onValueChange={(value) => updateFormData("wantChildren", value)}>
          <SelectTrigger className="py-3 border-2 rounded-xl">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="yes">Yes</SelectItem>
            <SelectItem value="no">No</SelectItem>
            <SelectItem value="maybe">Maybe</SelectItem>
            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

// Step 4: Lifestyle
function LifestyleStep({ formData, updateFormData, errors }) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label className="text-slate-700 font-medium">Education</Label>
        <Select value={formData.education} onValueChange={(value) => updateFormData("education", value)}>
          <SelectTrigger className={cn("py-3 border-2 rounded-xl", errors.education && "border-red-500")}>
            <SelectValue placeholder="Select your education level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="high-school">High School</SelectItem>
            <SelectItem value="some-college">Some College</SelectItem>
            <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
            <SelectItem value="masters">Master's Degree</SelectItem>
            <SelectItem value="phd">PhD/Doctorate</SelectItem>
            <SelectItem value="trade-school">Trade School</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        {errors.education && <p className="text-red-500 text-sm">{errors.education}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="occupation" className="text-slate-700 font-medium">
          Occupation
        </Label>
        <div className="relative">
          <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            id="occupation"
            placeholder="Your job title"
            value={formData.occupation}
            onChange={(e) => updateFormData("occupation", e.target.value)}
            className={cn("pl-12 py-3 border-2 rounded-xl", errors.occupation && "border-red-500")}
          />
        </div>
        {errors.occupation && <p className="text-red-500 text-sm">{errors.occupation}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="company" className="text-slate-700 font-medium">
          Company (Optional)
        </Label>
        <Input
          id="company"
          placeholder="Where do you work?"
          value={formData.company}
          onChange={(e) => updateFormData("company", e.target.value)}
          className="py-3 border-2 rounded-xl"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-slate-700 font-medium">Religion</Label>
        <Select value={formData.religion} onValueChange={(value) => updateFormData("religion", value)}>
          <SelectTrigger className="py-3 border-2 rounded-xl">
            <SelectValue placeholder="Select your religion" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="christian">Christian</SelectItem>
            <SelectItem value="catholic">Catholic</SelectItem>
            <SelectItem value="jewish">Jewish</SelectItem>
            <SelectItem value="muslim">Muslim</SelectItem>
            <SelectItem value="hindu">Hindu</SelectItem>
            <SelectItem value="buddhist">Buddhist</SelectItem>
            <SelectItem value="atheist">Atheist</SelectItem>
            <SelectItem value="agnostic">Agnostic</SelectItem>
            <SelectItem value="spiritual">Spiritual</SelectItem>
            <SelectItem value="other">Other</SelectItem>
            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-slate-700 font-medium">Smoking</Label>
          <Select value={formData.smoking} onValueChange={(value) => updateFormData("smoking", value)}>
            <SelectTrigger className="py-3 border-2 rounded-xl">
              <SelectValue placeholder="Smoking habits" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="never">Never</SelectItem>
              <SelectItem value="socially">Socially</SelectItem>
              <SelectItem value="regularly">Regularly</SelectItem>
              <SelectItem value="trying-to-quit">Trying to quit</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-slate-700 font-medium">Drinking</Label>
          <Select value={formData.drinking} onValueChange={(value) => updateFormData("drinking", value)}>
            <SelectTrigger className="py-3 border-2 rounded-xl">
              <SelectValue placeholder="Drinking habits" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="never">Never</SelectItem>
              <SelectItem value="socially">Socially</SelectItem>
              <SelectItem value="regularly">Regularly</SelectItem>
              <SelectItem value="rarely">Rarely</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-slate-700 font-medium">Exercise</Label>
        <Select value={formData.exercise} onValueChange={(value) => updateFormData("exercise", value)}>
          <SelectTrigger className="py-3 border-2 rounded-xl">
            <SelectValue placeholder="Exercise habits" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="few-times-week">Few times a week</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="rarely">Rarely</SelectItem>
            <SelectItem value="never">Never</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

// Step 5: Dating Preferences
function PreferencesStep({ formData, updateFormData, errors }) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label className="text-slate-700 font-medium">What are you looking for?</Label>
        <Select value={formData.lookingFor} onValueChange={(value) => updateFormData("lookingFor", value)}>
          <SelectTrigger className={cn("py-3 border-2 rounded-xl", errors.lookingFor && "border-red-500")}>
            <SelectValue placeholder="Select relationship type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="long-term">Long-term relationship</SelectItem>
            <SelectItem value="short-term">Short-term relationship</SelectItem>
            <SelectItem value="casual">Casual dating</SelectItem>
            <SelectItem value="friends">Friends</SelectItem>
            <SelectItem value="not-sure">Not sure yet</SelectItem>
          </SelectContent>
        </Select>
        {errors.lookingFor && <p className="text-red-500 text-sm">{errors.lookingFor}</p>}
      </div>

      <div className="space-y-2">
        <Label className="text-slate-700 font-medium">Age Range</Label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm text-slate-600">Min Age</Label>
            <Select value={formData.ageRangeMin} onValueChange={(value) => updateFormData("ageRangeMin", value)}>
              <SelectTrigger className="py-3 border-2 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 63 }, (_, i) => (
                  <SelectItem key={i + 18} value={String(i + 18)}>
                    {i + 18}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-sm text-slate-600">Max Age</Label>
            <Select value={formData.ageRangeMax} onValueChange={(value) => updateFormData("ageRangeMax", value)}>
              <SelectTrigger className="py-3 border-2 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 63 }, (_, i) => (
                  <SelectItem key={i + 18} value={String(i + 18)}>
                    {i + 18}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-slate-700 font-medium">Maximum Distance</Label>
        <Select value={formData.maxDistance} onValueChange={(value) => updateFormData("maxDistance", value)}>
          <SelectTrigger className="py-3 border-2 rounded-xl">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5 miles</SelectItem>
            <SelectItem value="10">10 miles</SelectItem>
            <SelectItem value="25">25 miles</SelectItem>
            <SelectItem value="50">50 miles</SelectItem>
            <SelectItem value="100">100 miles</SelectItem>
            <SelectItem value="unlimited">Unlimited</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

// Step 6: Profile Creation
function ProfileStep({ formData, updateFormData, errors, addInterest, removeInterest, commonInterests }) {
  return (
    <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
      <div className="space-y-2">
        <Label htmlFor="bio" className="text-slate-700 font-medium">
          About Me
        </Label>
        <textarea
          id="bio"
          placeholder="Tell others about yourself... What makes you unique? What are you passionate about?"
          value={formData.bio}
          onChange={(e) => updateFormData("bio", e.target.value)}
          className={cn(
            "w-full p-3 border-2 rounded-xl resize-none h-32 text-sm",
            "focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent",
            errors.bio && "border-red-500",
          )}
          maxLength={500}
        />
        <div className="flex justify-between text-xs text-slate-500">
          <span>{errors.bio && <span className="text-red-500">{errors.bio}</span>}</span>
          <span>{formData.bio.length}/500</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-slate-700 font-medium">Interests</Label>
        <p className="text-sm text-slate-600">Select at least 3 interests</p>
        <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2 border rounded-xl bg-slate-50">
          {commonInterests.map((interest) => (
            <button
              key={interest}
              type="button"
              onClick={() => (formData.interests.includes(interest) ? removeInterest(interest) : addInterest(interest))}
              className={cn(
                "px-3 py-1 rounded-full text-sm border-2 transition-all flex items-center gap-1",
                formData.interests.includes(interest)
                  ? "bg-slate-700 text-white border-slate-700"
                  : "bg-white text-slate-700 border-slate-300 hover:border-slate-500",
              )}
            >
              {interest}
              {formData.interests.includes(interest) && <X className="w-3 h-3" />}
            </button>
          ))}
        </div>
        {errors.interests && <p className="text-red-500 text-sm">{errors.interests}</p>}
        <p className="text-xs text-slate-500">Selected: {formData.interests.length}</p>
      </div>

      <div className="space-y-2">
        <Label className="text-slate-700 font-medium">Photos</Label>
        <p className="text-sm text-slate-600">Add at least one photo to get started</p>
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="aspect-square border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              {index === 0 ? (
                <div className="text-center">
                  <Camera className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-xs text-slate-500">Main Photo</p>
                </div>
              ) : (
                <Plus className="w-8 h-8 text-slate-400" />
              )}
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500">Tip: Use high-quality photos that show your face clearly</p>
      </div>
    </div>
  )
}

export default function SignUpPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [autoSaveStatus, setAutoSaveStatus] = useState("")

  // Form data state
  const [formData, setFormData] = useState({
    // Step 1: Account
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",

    // Step 2: Basic Info
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    sexualOrientation: "",
    location: "",

    // Step 3: Details
    height: "",
    bodyType: "",
    ethnicity: "",
    children: "",
    wantChildren: "",

    // Step 4: Lifestyle
    education: "",
    occupation: "",
    company: "",
    religion: "",
    smoking: "",
    drinking: "",
    exercise: "",

    // Step 5: Preferences
    lookingFor: "",
    ageRangeMin: "18",
    ageRangeMax: "35",
    maxDistance: "25",
    dealBreakers: [],

    // Step 6: Profile
    bio: "",
    interests: [],
    photos: [],
  })

  const [errors, setErrors] = useState({})

  // Load saved data on component mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY)
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        setFormData(parsedData.formData || formData)
        setCurrentStep(parsedData.currentStep || 1)
        setAutoSaveStatus("Loaded saved progress")
        setTimeout(() => setAutoSaveStatus(""), 2000)
      } catch (error) {
        console.error("Error loading saved data:", error)
      }
    }
  }, [])

  // Auto-save functionality
  const autoSave = useCallback(() => {
    try {
      const dataToSave = {
        formData,
        currentStep,
        timestamp: new Date().toISOString(),
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
      setAutoSaveStatus("Saved")
      setTimeout(() => setAutoSaveStatus(""), 1500)
    } catch (error) {
      console.error("Error saving data:", error)
      setAutoSaveStatus("Save failed")
      setTimeout(() => setAutoSaveStatus(""), 2000)
    }
  }, [formData, currentStep])

  // Auto-save on form data changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      autoSave()
    }, 1000) // Save 1 second after last change

    return () => clearTimeout(timeoutId)
  }, [formData, autoSave])

  const updateFormData = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    setErrors((prev) => {
      if (prev[field]) {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      }
      return prev
    })
  }, [])

  const validateStep = (step) => {
    const newErrors = {}

    switch (step) {
      case 1:
        if (!formData.email) newErrors.email = "Email is required"
        if (!formData.password) newErrors.password = "Password is required"
        if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = "Passwords don't match"
        }
        if (!formData.phone) newErrors.phone = "Phone number is required"
        break
      case 2:
        if (!formData.firstName) newErrors.firstName = "First name is required"
        if (!formData.lastName) newErrors.lastName = "Last name is required"
        if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required"
        if (!formData.gender) newErrors.gender = "Gender is required"
        if (!formData.sexualOrientation) newErrors.sexualOrientation = "Sexual orientation is required"
        if (!formData.location) newErrors.location = "Location is required"
        break
      case 3:
        if (!formData.height) newErrors.height = "Height is required"
        if (!formData.bodyType) newErrors.bodyType = "Body type is required"
        if (!formData.ethnicity) newErrors.ethnicity = "Ethnicity is required"
        break
      case 4:
        if (!formData.education) newErrors.education = "Education is required"
        if (!formData.occupation) newErrors.occupation = "Occupation is required"
        break
      case 5:
        if (!formData.lookingFor) newErrors.lookingFor = "Please specify what you're looking for"
        break
      case 6:
        if (!formData.bio) newErrors.bio = "Bio is required"
        if (formData.interests.length < 3) newErrors.interests = "Select at least 3 interests"
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length))
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (validateStep(currentStep)) {
      setIsLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setIsLoading(false)
      // Clear saved data on successful submission
      localStorage.removeItem(STORAGE_KEY)
      // Redirect to dating page or success page
      router.push("/dating")
    }
  }

  const addInterest = (interest) => {
    if (!formData.interests.includes(interest)) {
      updateFormData("interests", [...formData.interests, interest])
    }
  }

  const removeInterest = (interest) => {
    updateFormData(
      "interests",
      formData.interests.filter((i) => i !== interest),
    )
  }

  const commonInterests = [
    "Travel",
    "Music",
    "Movies",
    "Sports",
    "Cooking",
    "Reading",
    "Photography",
    "Fitness",
    "Art",
    "Dancing",
    "Gaming",
    "Hiking",
    "Yoga",
    "Wine",
    "Coffee",
    "Fashion",
    "Technology",
    "Animals",
    "Nature",
    "Comedy",
    "Theater",
    "Museums",
  ]

  // Info Panel Content
  const infoPanel = (
    <div className="space-y-8 w-full">
      <div className="flex flex-col items-center space-y-2">
        <Heart className="w-10 h-10 text-pink-400 animate-pulse" />
        <h2 className="text-2xl font-bold text-white">Join zlovr</h2>
        <p className="text-white/80 text-center text-sm">
          Step {currentStep} of {STEPS.length}: {STEPS[currentStep - 1]?.description}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-white/60">
          <span>Progress</span>
          <span>{Math.round((currentStep / STEPS.length) * 100)}%</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-pink-400 to-purple-400 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Auto-save status */}
      {autoSaveStatus && (
        <div className="flex items-center justify-center space-x-2 text-xs text-white/70">
          <Save className="w-3 h-3" />
          <span>{autoSaveStatus}</span>
        </div>
      )}

      <div className="space-y-4">
        {[
          {
            icon: <Shield className="w-5 h-5 text-blue-300" />,
            title: "Safe & Secure",
            desc: "Your privacy is our top priority with advanced security.",
          },
          {
            icon: <Users className="w-5 h-5 text-purple-300" />,
            title: "Smart Matching",
            desc: "AI-powered compatibility for better connections.",
          },
          {
            icon: <Star className="w-5 h-5 text-yellow-300" />,
            title: "Premium Features",
            desc: "Unlimited likes, boosts, and priority support.",
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

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <AccountStep formData={formData} updateFormData={updateFormData} errors={errors} showPassword={showPassword} setShowPassword={setShowPassword} showConfirmPassword={showConfirmPassword} setShowConfirmPassword={setShowConfirmPassword} />
      case 2:
        return <BasicInfoStep formData={formData} updateFormData={updateFormData} errors={errors} />
      case 3:
        return <DetailsStep formData={formData} updateFormData={updateFormData} errors={errors} />
      case 4:
        return <LifestyleStep formData={formData} updateFormData={updateFormData} errors={errors} />
      case 5:
        return <PreferencesStep formData={formData} updateFormData={updateFormData} errors={errors} />
      case 6:
        return <ProfileStep formData={formData} updateFormData={updateFormData} errors={errors} addInterest={addInterest} removeInterest={removeInterest} commonInterests={commonInterests} />
      default:
        return <AccountStep formData={formData} updateFormData={updateFormData} errors={errors} showPassword={showPassword} setShowPassword={setShowPassword} showConfirmPassword={showConfirmPassword} setShowConfirmPassword={setShowConfirmPassword} />
    }
  }

  return (
    <AuthContainer
      mode="signup"
      infoPanel={infoPanel}
      onSwitchMode={() => router.push("/signin")}
      switchLabel="Sign in here"
      switchText="Already have an account?"
      isLoading={isLoading}
    >
      <Card className="bg-transparent border-0 shadow-none">
        <CardHeader className="text-center pb-6 pt-4">
          <CardTitle className="text-3xl font-bold text-slate-800 mb-2">{STEPS[currentStep - 1]?.title}</CardTitle>
          <p className="text-slate-600 font-medium">{STEPS[currentStep - 1]?.description}</p>
        </CardHeader>

        <CardContent className="px-0 pb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderCurrentStep()}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-transparent"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>

            {currentStep === STEPS.length ? (
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-slate-950 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Check className="w-5 h-5" />
                    <span>Complete Sign Up</span>
                  </div>
                )}
              </Button>
            ) : (
              <Button
                type="button"
                onClick={nextStep}
                className="bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-slate-950 text-white flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </AuthContainer>
  )
}
