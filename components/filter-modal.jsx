"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogTrigger 
} from "@/components/ui/dialog"
import { Filter, MapPin, Users, Heart, X, Music, Book, Dumbbell, Plane, Coffee, Dog, Gamepad2, Palette, Code, Mountain, Utensils, CameraIcon, Film, Headphones, Briefcase, GraduationCap, User, Baby, Cigarette, Wine, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from "@/lib/utils"

const interestIcons = {
  Hiking: Mountain,
  Photography: CameraIcon,
  Travel: Plane,
  Yoga: Users,
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
  Wellness: Heart
}

export function FilterModal({ onFiltersChange, currentFilters = {}, collapsed = false, isMobile = false }) {
  const [filters, setFilters] = useState({
    ageRange: currentFilters.ageRange || [18, 50],
    distance: currentFilters.distance || 25,
    gender: currentFilters.gender || "all",
    sexualOrientation: currentFilters.sexualOrientation || "all",
    heightRange: currentFilters.heightRange || [60, 84], // inches
    bodyType: currentFilters.bodyType || "all",
    ethnicity: currentFilters.ethnicity || "all",
    education: currentFilters.education || "all",
    occupation: currentFilters.occupation || "",
    religion: currentFilters.religion || "all",
    smoking: currentFilters.smoking || "all",
    drinking: currentFilters.drinking || "all",
    exercise: currentFilters.exercise || "all",
    relationshipGoals: currentFilters.relationshipGoals || "all",
    hasChildren: currentFilters.hasChildren || "all",
    wantsChildren: currentFilters.wantsChildren || "all",
    interests: currentFilters.interests || [],
    onlineOnly: currentFilters.onlineOnly || false,
    verifiedOnly: currentFilters.verifiedOnly || false,
    ...currentFilters
  })

  // Store last applied filters for discard on close
  const [lastAppliedFilters, setLastAppliedFilters] = useState(filters)

  const [isOpen, setIsOpen] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    physical: false,
    lifestyle: false,
    preferences: false,
    interests: false
  })

  // When modal opens, reset filters to last applied
  const handleOpenChange = (open) => {
    setIsOpen(open)
    if (!open) {
      setFilters(lastAppliedFilters)
    }
  }

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
  }

  const handleInterestToggle = (interest) => {
    const newInterests = filters.interests.includes(interest)
      ? filters.interests.filter(i => i !== interest)
      : [...filters.interests, interest]
    handleFilterChange('interests', newInterests)
  }

  const handleApplyFilters = () => {
    onFiltersChange(filters)
    setLastAppliedFilters(filters)
    setIsOpen(false)
  }

  const handleResetFilters = () => {
    const defaultFilters = {
      ageRange: [18, 50],
      distance: 25,
      gender: "all",
      sexualOrientation: "all",
      heightRange: [60, 84],
      bodyType: "all",
      ethnicity: "all",
      education: "all",
      occupation: "",
      religion: "all",
      smoking: "all",
      drinking: "all",
      exercise: "all",
      relationshipGoals: "all",
      hasChildren: "all",
      wantsChildren: "all",
      interests: [],
      onlineOnly: false,
      verifiedOnly: false,
    }
    setFilters(defaultFilters)
    onFiltersChange(defaultFilters)
  }

  const activeFiltersCount = Object.entries(filters).filter(([key, value]) => {
    if (key === 'ageRange') return !(value[0] === 18 && value[1] === 50)
    if (key === 'distance') return value !== 25
    if (key === 'heightRange') return !(value[0] === 60 && value[1] === 84)
    if (Array.isArray(value)) return value.length > 0
    if (typeof value === 'boolean') return value
    if (typeof value === 'string') return value !== 'all' && value !== ''
    return false
  }).length

  const formatHeight = (inches) => {
    const feet = Math.floor(inches / 12)
    const remainingInches = inches % 12
    return `${feet}'${remainingInches}"`
  }

  const FilterSection = ({ title, isExpanded, onToggle, children }) => (
    <div className="border border-gray-200 rounded-lg">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-3 hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-700">{title}</span>
        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      {isExpanded && (
        <div className="p-3 pt-0 border-t border-gray-100">
          {children}
        </div>
      )}
    </div>
  )

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {isMobile ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center space-y-1 sm:space-y-2 p-2 sm:p-3 rounded-2xl transition-all duration-200 text-gray-500 hover:text-gray-700 relative"
          >
            <Filter className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="text-xs font-semibold tracking-tight">Filters</span>
            {activeFiltersCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                {activeFiltersCount}
              </span>
            )}
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "w-full flex items-center rounded-2xl text-left relative",
              collapsed ? "justify-center p-1 mx-auto w-fit" : "p-4",
              "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            )}
          >
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300",
              "bg-gray-100 text-gray-600"
            )}>
              <Filter className="w-5 h-5" />
            </div>
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ 
                opacity: collapsed ? 0 : 1, 
                width: collapsed ? 0 : "auto",
                marginLeft: collapsed ? 0 : 16
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0.4 }}
              className="overflow-hidden flex-1"
            >
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-base truncate">Filters</div>
                <div className="text-sm opacity-70 truncate">Customize search</div>
              </div>
            </motion.div>
            {activeFiltersCount > 0 && (
              <span className={cn(
                "bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold",
                collapsed ? "absolute -top-1 -right-1 w-4 h-4" : "ml-2 w-5 h-5"
              )}>
                {activeFiltersCount}
              </span>
            )}
          </motion.button>
        )}
      </DialogTrigger>
      {isMobile ? (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            >
              <motion.div
                initial={{ y: 64 }}
                animate={{ y: 0 }}
                exit={{ y: 64 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="w-full max-w-lg bg-white rounded-t-3xl shadow-2xl p-0 overflow-y-auto max-h-[90vh] relative"
                onClick={e => e.stopPropagation()}
              >
                {/* Sticky drag handle and header */}
                <div className="sticky top-0 z-10 bg-white rounded-t-3xl pt-3 pb-2 flex flex-col items-center border-b border-gray-100 shadow-sm">
                  <div className="w-12 h-1.5 bg-gray-300 rounded-full mb-2" />
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-lg font-bold text-slate-800">
                      <Filter className="w-5 h-5" />
                      Advanced Filters
                    </DialogTitle>
                  </DialogHeader>
                </div>
                <div className="px-4 pb-2 pt-1 space-y-6 bg-slate-50 rounded-b-3xl">
                  {/* Modernized filter sections */}
                  <div className="space-y-5">
                    {/* Basic Filters */}
                    <div className="rounded-2xl bg-white/90 shadow border border-gray-100 p-4 mb-2">
                      <FilterSection 
                        title="Basic Preferences" 
                        isExpanded={expandedSections.basic}
                        onToggle={() => toggleSection('basic')}
                      >
                        {/* Age Range */}
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">Age Range</Label>
                          <div className="flex items-center gap-3">
                            <Input
                              type="number"
                              min="18"
                              max="100"
                              value={filters.ageRange[0]}
                              onChange={(e) => handleFilterChange('ageRange', [parseInt(e.target.value), filters.ageRange[1]])}
                              className="w-20"
                            />
                            <span className="text-gray-500">to</span>
                            <Input
                              type="number"
                              min="18"
                              max="100"
                              value={filters.ageRange[1]}
                              onChange={(e) => handleFilterChange('ageRange', [filters.ageRange[0], parseInt(e.target.value)])}
                              className="w-20"
                            />
                          </div>
                        </div>

                        {/* Distance */}
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">Distance</Label>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <Input
                              type="number"
                              min="1"
                              max="100"
                              value={filters.distance}
                              onChange={(e) => handleFilterChange('distance', parseInt(e.target.value))}
                              className="w-20"
                            />
                            <span className="text-gray-500">miles</span>
                          </div>
                        </div>

                        {/* Gender */}
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">Gender</Label>
                          <Select value={filters.gender} onValueChange={(value) => handleFilterChange('gender', value)}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All genders</SelectItem>
                              <SelectItem value="man">Men</SelectItem>
                              <SelectItem value="woman">Women</SelectItem>
                              <SelectItem value="non-binary">Non-binary</SelectItem>
                              <SelectItem value="transgender">Transgender</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Sexual Orientation */}
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">Sexual Orientation</Label>
                          <Select value={filters.sexualOrientation} onValueChange={(value) => handleFilterChange('sexualOrientation', value)}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All orientations</SelectItem>
                              <SelectItem value="straight">Straight</SelectItem>
                              <SelectItem value="gay">Gay</SelectItem>
                              <SelectItem value="lesbian">Lesbian</SelectItem>
                              <SelectItem value="bisexual">Bisexual</SelectItem>
                              <SelectItem value="pansexual">Pansexual</SelectItem>
                              <SelectItem value="asexual">Asexual</SelectItem>
                              <SelectItem value="demisexual">Demisexual</SelectItem>
                              <SelectItem value="queer">Queer</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </FilterSection>
                    </div>
                    {/* Physical Attributes */}
                    <div className="rounded-2xl bg-white/90 shadow border border-gray-100 p-4 mb-2">
                      <FilterSection 
                        title="Physical Attributes" 
                        isExpanded={expandedSections.physical}
                        onToggle={() => toggleSection('physical')}
                      >
                        {/* Height Range */}
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">Height Range</Label>
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                              <Input
                                type="number"
                                min="48"
                                max="96"
                                value={filters.heightRange[0]}
                                onChange={(e) => handleFilterChange('heightRange', [parseInt(e.target.value), filters.heightRange[1]])}
                                className="w-20"
                              />
                              <span className="text-xs text-gray-500 mt-1">{formatHeight(filters.heightRange[0])}</span>
                            </div>
                            <span className="text-gray-500">to</span>
                            <div className="flex flex-col">
                              <Input
                                type="number"
                                min="48"
                                max="96"
                                value={filters.heightRange[1]}
                                onChange={(e) => handleFilterChange('heightRange', [filters.heightRange[0], parseInt(e.target.value)])}
                                className="w-20"
                              />
                              <span className="text-xs text-gray-500 mt-1">{formatHeight(filters.heightRange[1])}</span>
                            </div>
                          </div>
                        </div>

                        {/* Body Type */}
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">Body Type</Label>
                          <Select value={filters.bodyType} onValueChange={(value) => handleFilterChange('bodyType', value)}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All body types</SelectItem>
                              <SelectItem value="slim">Slim</SelectItem>
                              <SelectItem value="athletic">Athletic</SelectItem>
                              <SelectItem value="average">Average</SelectItem>
                              <SelectItem value="curvy">Curvy</SelectItem>
                              <SelectItem value="plus-size">Plus size</SelectItem>
                              <SelectItem value="muscular">Muscular</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Ethnicity */}
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">Ethnicity</Label>
                          <Select value={filters.ethnicity} onValueChange={(value) => handleFilterChange('ethnicity', value)}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All ethnicities</SelectItem>
                              <SelectItem value="asian">Asian</SelectItem>
                              <SelectItem value="black">Black/African American</SelectItem>
                              <SelectItem value="hispanic">Hispanic/Latino</SelectItem>
                              <SelectItem value="white">White/Caucasian</SelectItem>
                              <SelectItem value="middle-eastern">Middle Eastern</SelectItem>
                              <SelectItem value="native-american">Native American</SelectItem>
                              <SelectItem value="pacific-islander">Pacific Islander</SelectItem>
                              <SelectItem value="mixed">Mixed/Multiracial</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </FilterSection>
                    </div>
                    {/* Lifestyle */}
                    <div className="rounded-2xl bg-white/90 shadow border border-gray-100 p-4 mb-2">
                      <FilterSection 
                        title="Lifestyle" 
                        isExpanded={expandedSections.lifestyle}
                        onToggle={() => toggleSection('lifestyle')}
                      >
                        {/* Education */}
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">Education</Label>
                          <Select value={filters.education} onValueChange={(value) => handleFilterChange('education', value)}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All education levels</SelectItem>
                              <SelectItem value="high-school">High School</SelectItem>
                              <SelectItem value="some-college">Some College</SelectItem>
                              <SelectItem value="associates">Associate's Degree</SelectItem>
                              <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                              <SelectItem value="masters">Master's Degree</SelectItem>
                              <SelectItem value="phd">PhD/Doctorate</SelectItem>
                              <SelectItem value="trade-school">Trade School</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Religion */}
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">Religion</Label>
                          <Select value={filters.religion} onValueChange={(value) => handleFilterChange('religion', value)}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All religions</SelectItem>
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
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Smoking */}
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">Smoking</Label>
                          <Select value={filters.smoking} onValueChange={(value) => handleFilterChange('smoking', value)}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Any smoking preference</SelectItem>
                              <SelectItem value="never">Never</SelectItem>
                              <SelectItem value="socially">Socially</SelectItem>
                              <SelectItem value="regularly">Regularly</SelectItem>
                              <SelectItem value="trying-to-quit">Trying to quit</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Drinking */}
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">Drinking</Label>
                          <Select value={filters.drinking} onValueChange={(value) => handleFilterChange('drinking', value)}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Any drinking preference</SelectItem>
                              <SelectItem value="never">Never</SelectItem>
                              <SelectItem value="socially">Socially</SelectItem>
                              <SelectItem value="regularly">Regularly</SelectItem>
                              <SelectItem value="occasionally">Occasionally</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Exercise */}
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">Exercise</Label>
                          <Select value={filters.exercise} onValueChange={(value) => handleFilterChange('exercise', value)}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Any exercise level</SelectItem>
                              <SelectItem value="never">Never</SelectItem>
                              <SelectItem value="rarely">Rarely</SelectItem>
                              <SelectItem value="sometimes">Sometimes</SelectItem>
                              <SelectItem value="often">Often</SelectItem>
                              <SelectItem value="daily">Daily</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </FilterSection>
                    </div>
                    {/* Dating Preferences */}
                    <div className="rounded-2xl bg-white/90 shadow border border-gray-100 p-4 mb-2">
                      <FilterSection 
                        title="Dating Preferences" 
                        isExpanded={expandedSections.preferences}
                        onToggle={() => toggleSection('preferences')}
                      >
                        {/* Relationship Goals */}
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">Relationship Goals</Label>
                          <Select value={filters.relationshipGoals} onValueChange={(value) => handleFilterChange('relationshipGoals', value)}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All relationship types</SelectItem>
                              <SelectItem value="long-term">Long-term relationship</SelectItem>
                              <SelectItem value="marriage">Marriage</SelectItem>
                              <SelectItem value="casual">Casual dating</SelectItem>
                              <SelectItem value="friendship">Friendship</SelectItem>
                              <SelectItem value="hookups">Hookups</SelectItem>
                              <SelectItem value="figuring-out">Still figuring it out</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Has Children */}
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">Has Children</Label>
                          <Select value={filters.hasChildren} onValueChange={(value) => handleFilterChange('hasChildren', value)}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Any</SelectItem>
                              <SelectItem value="yes">Has children</SelectItem>
                              <SelectItem value="no">No children</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Wants Children */}
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">Wants Children</Label>
                          <Select value={filters.wantsChildren} onValueChange={(value) => handleFilterChange('wantsChildren', value)}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Any</SelectItem>
                              <SelectItem value="yes">Wants children</SelectItem>
                              <SelectItem value="no">Doesn't want children</SelectItem>
                              <SelectItem value="maybe">Maybe/Open to it</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </FilterSection>
                    </div>
                    {/* Interests */}
                    <div className="rounded-2xl bg-white/90 shadow border border-gray-100 p-4 mb-2">
                      <FilterSection 
                        title="Interests" 
                        isExpanded={expandedSections.interests}
                        onToggle={() => toggleSection('interests')}
                      >
                        <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto pr-2">
                          {Object.entries(interestIcons).map(([interest, IconComponent]) => {
                            const isSelected = filters.interests.includes(interest)
                            return (
                              <motion.button
                                key={interest}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleInterestToggle(interest)}
                                className={cn(
                                  "flex items-center gap-2 p-2 rounded-lg border text-sm transition-all duration-200",
                                  isSelected
                                    ? "border-slate-400 bg-slate-50 text-slate-700"
                                    : "border-gray-200 hover:border-gray-300"
                                )}
                              >
                                <IconComponent className="w-4 h-4 flex-shrink-0" />
                                <span className="truncate">{interest}</span>
                              </motion.button>
                            )
                          })}
                        </div>
                      </FilterSection>
                    </div>
                  </div>
                  {/* Additional Options */}
                  <div className="space-y-3 pt-2 border-t border-gray-200 mt-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="onlineOnly"
                        checked={filters.onlineOnly}
                        onCheckedChange={(checked) => handleFilterChange('onlineOnly', checked)}
                      />
                      <Label htmlFor="onlineOnly" className="text-sm">
                        Online now only
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="verifiedOnly"
                        checked={filters.verifiedOnly}
                        onCheckedChange={(checked) => handleFilterChange('verifiedOnly', checked)}
                      />
                      <Label htmlFor="verifiedOnly" className="text-sm">
                        Verified profiles only
                      </Label>
                    </div>
                  </div>
                </div>
                {/* Sticky footer for actions */}
                <DialogFooter className="sticky bottom-0 z-10 bg-white rounded-b-3xl flex gap-2 pt-4 border-t border-gray-200 px-4 pb-4 shadow-lg">
                  <Button
                    variant="outline"
                    onClick={() => { setFilters(lastAppliedFilters); setIsOpen(false); }}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleApplyFilters}
                    className="flex-1 bg-slate-700 hover:bg-slate-800 text-white font-semibold"
                  >
                    Apply Filters ({activeFiltersCount})
                  </Button>
                </DialogFooter>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Advanced Filters
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Basic Filters */}
            <FilterSection 
              title="Basic Preferences" 
              isExpanded={expandedSections.basic}
              onToggle={() => toggleSection('basic')}
            >
              <div className="space-y-4">
                {/* Age Range */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Age Range</Label>
                  <div className="flex items-center gap-3">
                    <Input
                      type="number"
                      min="18"
                      max="100"
                      value={filters.ageRange[0]}
                      onChange={(e) => handleFilterChange('ageRange', [parseInt(e.target.value), filters.ageRange[1]])}
                      className="w-20"
                    />
                    <span className="text-gray-500">to</span>
                    <Input
                      type="number"
                      min="18"
                      max="100"
                      value={filters.ageRange[1]}
                      onChange={(e) => handleFilterChange('ageRange', [filters.ageRange[0], parseInt(e.target.value)])}
                      className="w-20"
                    />
                  </div>
                </div>

                {/* Distance */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Distance</Label>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <Input
                      type="number"
                      min="1"
                      max="100"
                      value={filters.distance}
                      onChange={(e) => handleFilterChange('distance', parseInt(e.target.value))}
                      className="w-20"
                    />
                    <span className="text-gray-500">miles</span>
                  </div>
                </div>

                {/* Gender */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Gender</Label>
                  <Select value={filters.gender} onValueChange={(value) => handleFilterChange('gender', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All genders</SelectItem>
                      <SelectItem value="man">Men</SelectItem>
                      <SelectItem value="woman">Women</SelectItem>
                      <SelectItem value="non-binary">Non-binary</SelectItem>
                      <SelectItem value="transgender">Transgender</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Sexual Orientation */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Sexual Orientation</Label>
                  <Select value={filters.sexualOrientation} onValueChange={(value) => handleFilterChange('sexualOrientation', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All orientations</SelectItem>
                      <SelectItem value="straight">Straight</SelectItem>
                      <SelectItem value="gay">Gay</SelectItem>
                      <SelectItem value="lesbian">Lesbian</SelectItem>
                      <SelectItem value="bisexual">Bisexual</SelectItem>
                      <SelectItem value="pansexual">Pansexual</SelectItem>
                      <SelectItem value="asexual">Asexual</SelectItem>
                      <SelectItem value="demisexual">Demisexual</SelectItem>
                      <SelectItem value="queer">Queer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </FilterSection>

            {/* Physical Attributes */}
            <FilterSection 
              title="Physical Attributes" 
              isExpanded={expandedSections.physical}
              onToggle={() => toggleSection('physical')}
            >
              <div className="space-y-4">
                {/* Height Range */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Height Range</Label>
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                      <Input
                        type="number"
                        min="48"
                        max="96"
                        value={filters.heightRange[0]}
                        onChange={(e) => handleFilterChange('heightRange', [parseInt(e.target.value), filters.heightRange[1]])}
                        className="w-20"
                      />
                      <span className="text-xs text-gray-500 mt-1">{formatHeight(filters.heightRange[0])}</span>
                    </div>
                    <span className="text-gray-500">to</span>
                    <div className="flex flex-col">
                      <Input
                        type="number"
                        min="48"
                        max="96"
                        value={filters.heightRange[1]}
                        onChange={(e) => handleFilterChange('heightRange', [filters.heightRange[0], parseInt(e.target.value)])}
                        className="w-20"
                      />
                      <span className="text-xs text-gray-500 mt-1">{formatHeight(filters.heightRange[1])}</span>
                    </div>
                  </div>
                </div>

                {/* Body Type */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Body Type</Label>
                  <Select value={filters.bodyType} onValueChange={(value) => handleFilterChange('bodyType', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All body types</SelectItem>
                      <SelectItem value="slim">Slim</SelectItem>
                      <SelectItem value="athletic">Athletic</SelectItem>
                      <SelectItem value="average">Average</SelectItem>
                      <SelectItem value="curvy">Curvy</SelectItem>
                      <SelectItem value="plus-size">Plus size</SelectItem>
                      <SelectItem value="muscular">Muscular</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Ethnicity */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Ethnicity</Label>
                  <Select value={filters.ethnicity} onValueChange={(value) => handleFilterChange('ethnicity', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All ethnicities</SelectItem>
                      <SelectItem value="asian">Asian</SelectItem>
                      <SelectItem value="black">Black/African American</SelectItem>
                      <SelectItem value="hispanic">Hispanic/Latino</SelectItem>
                      <SelectItem value="white">White/Caucasian</SelectItem>
                      <SelectItem value="middle-eastern">Middle Eastern</SelectItem>
                      <SelectItem value="native-american">Native American</SelectItem>
                      <SelectItem value="pacific-islander">Pacific Islander</SelectItem>
                      <SelectItem value="mixed">Mixed/Multiracial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </FilterSection>

            {/* Lifestyle */}
            <FilterSection 
              title="Lifestyle" 
              isExpanded={expandedSections.lifestyle}
              onToggle={() => toggleSection('lifestyle')}
            >
              <div className="space-y-4">
                {/* Education */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Education</Label>
                  <Select value={filters.education} onValueChange={(value) => handleFilterChange('education', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All education levels</SelectItem>
                      <SelectItem value="high-school">High School</SelectItem>
                      <SelectItem value="some-college">Some College</SelectItem>
                      <SelectItem value="associates">Associate's Degree</SelectItem>
                      <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                      <SelectItem value="masters">Master's Degree</SelectItem>
                      <SelectItem value="phd">PhD/Doctorate</SelectItem>
                      <SelectItem value="trade-school">Trade School</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Religion */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Religion</Label>
                  <Select value={filters.religion} onValueChange={(value) => handleFilterChange('religion', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All religions</SelectItem>
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
                    </SelectContent>
                  </Select>
                </div>

                {/* Smoking */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Smoking</Label>
                  <Select value={filters.smoking} onValueChange={(value) => handleFilterChange('smoking', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any smoking preference</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                      <SelectItem value="socially">Socially</SelectItem>
                      <SelectItem value="regularly">Regularly</SelectItem>
                      <SelectItem value="trying-to-quit">Trying to quit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Drinking */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Drinking</Label>
                  <Select value={filters.drinking} onValueChange={(value) => handleFilterChange('drinking', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any drinking preference</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                      <SelectItem value="socially">Socially</SelectItem>
                      <SelectItem value="regularly">Regularly</SelectItem>
                      <SelectItem value="occasionally">Occasionally</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Exercise */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Exercise</Label>
                  <Select value={filters.exercise} onValueChange={(value) => handleFilterChange('exercise', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any exercise level</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                      <SelectItem value="rarely">Rarely</SelectItem>
                      <SelectItem value="sometimes">Sometimes</SelectItem>
                      <SelectItem value="often">Often</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </FilterSection>

            {/* Dating Preferences */}
            <FilterSection 
              title="Dating Preferences" 
              isExpanded={expandedSections.preferences}
              onToggle={() => toggleSection('preferences')}
            >
              <div className="space-y-4">
                {/* Relationship Goals */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Relationship Goals</Label>
                  <Select value={filters.relationshipGoals} onValueChange={(value) => handleFilterChange('relationshipGoals', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All relationship types</SelectItem>
                      <SelectItem value="long-term">Long-term relationship</SelectItem>
                      <SelectItem value="marriage">Marriage</SelectItem>
                      <SelectItem value="casual">Casual dating</SelectItem>
                      <SelectItem value="friendship">Friendship</SelectItem>
                      <SelectItem value="hookups">Hookups</SelectItem>
                      <SelectItem value="figuring-out">Still figuring it out</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Has Children */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Has Children</Label>
                  <Select value={filters.hasChildren} onValueChange={(value) => handleFilterChange('hasChildren', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any</SelectItem>
                      <SelectItem value="yes">Has children</SelectItem>
                      <SelectItem value="no">No children</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Wants Children */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Wants Children</Label>
                  <Select value={filters.wantsChildren} onValueChange={(value) => handleFilterChange('wantsChildren', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any</SelectItem>
                      <SelectItem value="yes">Wants children</SelectItem>
                      <SelectItem value="no">Doesn't want children</SelectItem>
                      <SelectItem value="maybe">Maybe/Open to it</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </FilterSection>

            {/* Interests */}
            <FilterSection 
              title="Interests" 
              isExpanded={expandedSections.interests}
              onToggle={() => toggleSection('interests')}
            >
              <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto pr-2">
                {Object.entries(interestIcons).map(([interest, IconComponent]) => {
                  const isSelected = filters.interests.includes(interest)
                  return (
                    <motion.button
                      key={interest}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleInterestToggle(interest)}
                      className={cn(
                        "flex items-center gap-2 p-2 rounded-lg border text-sm transition-all duration-200",
                        isSelected
                          ? "border-slate-400 bg-slate-50 text-slate-700"
                          : "border-gray-200 hover:border-gray-300"
                      )}
                    >
                      <IconComponent className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{interest}</span>
                    </motion.button>
                  )
                })}
              </div>
            </FilterSection>

            {/* Additional Options */}
            <div className="space-y-3 pt-2 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="onlineOnly"
                  checked={filters.onlineOnly}
                  onCheckedChange={(checked) => handleFilterChange('onlineOnly', checked)}
                />
                <Label htmlFor="onlineOnly" className="text-sm">
                  Online now only
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="verifiedOnly"
                  checked={filters.verifiedOnly}
                  onCheckedChange={(checked) => handleFilterChange('verifiedOnly', checked)}
                />
                <Label htmlFor="verifiedOnly" className="text-sm">
                  Verified profiles only
                </Label>
              </div>
            </div>
          </div>

          <DialogFooter className="flex gap-2 pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={handleResetFilters}
              className="flex-1"
            >
              Reset All
            </Button>
            <Button
              onClick={handleApplyFilters}
              className="flex-1 bg-slate-700 hover:bg-slate-800"
            >
              Apply Filters ({activeFiltersCount})
            </Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  )
}
