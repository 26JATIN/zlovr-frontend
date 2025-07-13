"use client"

import { useState } from "react"
import { motion } from "framer-motion"
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
import { 
  Filter, 
  MapPin, 
  Users, 
  Heart, 
  X,
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
  GraduationCap 
} from "lucide-react"
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
}

export function FilterModal({ onFiltersChange, currentFilters = {}, collapsed = false, isMobile = false }) {
  const [filters, setFilters] = useState({
    ageRange: currentFilters.ageRange || [18, 50],
    distance: currentFilters.distance || 25,
    interests: currentFilters.interests || [],
    relationshipType: currentFilters.relationshipType || "all",
    onlineOnly: currentFilters.onlineOnly || false,
    verifiedOnly: currentFilters.verifiedOnly || false,
    ...currentFilters
  })

  const [isOpen, setIsOpen] = useState(false)

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
    setIsOpen(false)
  }

  const handleResetFilters = () => {
    const defaultFilters = {
      ageRange: [18, 50],
      distance: 25,
      interests: [],
      relationshipType: "all",
      onlineOnly: false,
      verifiedOnly: false,
    }
    setFilters(defaultFilters)
    onFiltersChange(defaultFilters)
  }

  const activeFiltersCount = Object.values(filters).filter(value => {
    if (Array.isArray(value)) return value.length > 0
    if (typeof value === 'boolean') return value
    if (typeof value === 'string') return value !== 'all'
    return value !== 25 && !(Array.isArray(value) && value[0] === 18 && value[1] === 50)
  }).length

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {isMobile ? (
          // Mobile bottom navigation style
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
          // Desktop sidebar style
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
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Age Range */}
          <div>
            <Label className="text-sm font-semibold text-gray-700 mb-3 block">
              Age Range
            </Label>
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
            <Label className="text-sm font-semibold text-gray-700 mb-3 block">
              Distance
            </Label>
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

          {/* Relationship Type */}
          <div>
            <Label className="text-sm font-semibold text-gray-700 mb-3 block">
              Looking for
            </Label>
            <Select
              value={filters.relationshipType}
              onValueChange={(value) => handleFilterChange('relationshipType', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All types</SelectItem>
                <SelectItem value="casual">Casual dating</SelectItem>
                <SelectItem value="serious">Serious relationship</SelectItem>
                <SelectItem value="friendship">Friendship</SelectItem>
                <SelectItem value="marriage">Marriage</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Interests */}
          <div>
            <Label className="text-sm font-semibold text-gray-700 mb-3 block">
              Interests
            </Label>
            <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
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
                    <IconComponent className="w-4 h-4" />
                    <span>{interest}</span>
                  </motion.button>
                )
              })}
            </div>
          </div>

          {/* Checkboxes */}
          <div className="space-y-3">
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

        <DialogFooter className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleResetFilters}
            className="flex-1"
          >
            Reset
          </Button>
          <Button
            onClick={handleApplyFilters}
            className="flex-1"
          >
            Apply Filters
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 