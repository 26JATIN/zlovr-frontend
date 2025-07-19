"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import {
  Settings,
  Save,
  RefreshCw,
  Shield,
  Bell,
  Mail,
  Smartphone,
  DollarSign,
  Heart,
  Lock,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    // General Settings
    appName: "zlovr",
    appDescription: "Find your perfect match",
    maintenanceMode: false,
    registrationEnabled: true,

    // Matching Algorithm
    maxDistance: 50,
    ageRangeMin: 18,
    ageRangeMax: 65,
    matchingAlgorithm: "compatibility",
    showOnlineStatus: true,

    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    marketingEmails: true,

    // Security
    twoFactorAuth: false,
    phoneVerification: true,
    photoVerification: true,
    backgroundChecks: false,

    // Content Moderation
    autoModeration: true,
    profanityFilter: true,
    imageModeration: true,
    reportThreshold: 3,

    // Premium Features
    premiumPrice: 19.99,
    superLikePrice: 0.99,
    boostPrice: 4.99,
    premiumFeatures: ["unlimited_likes", "see_who_liked", "boost", "super_likes"],
  })

  const [hasChanges, setHasChanges] = useState(false)

  const handleSettingChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
    setHasChanges(true)
  }

  const handleSave = () => {
    // Save settings logic here
    console.log("Saving settings:", settings)
    setHasChanges(false)
  }

  const handleReset = () => {
    // Reset to default settings
    setHasChanges(false)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">App Settings</h1>
          <p className="text-gray-600 mt-1">Configure application settings and preferences</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleReset} disabled={!hasChanges}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button onClick={handleSave} disabled={!hasChanges}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {hasChanges && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <span className="text-yellow-800 font-medium">You have unsaved changes</span>
          </div>
        </div>
      )}

      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>General Settings</span>
          </CardTitle>
          <CardDescription>Basic application configuration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="appName">Application Name</Label>
              <Input
                id="appName"
                value={settings.appName}
                onChange={(e) => handleSettingChange("appName", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="appDescription">Application Description</Label>
              <Input
                id="appDescription"
                value={settings.appDescription}
                onChange={(e) => handleSettingChange("appDescription", e.target.value)}
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Maintenance Mode</Label>
                <p className="text-sm text-gray-500">Temporarily disable the app for maintenance</p>
              </div>
              <Checkbox
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => handleSettingChange("maintenanceMode", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">User Registration</Label>
                <p className="text-sm text-gray-500">Allow new users to register</p>
              </div>
              <Checkbox
                checked={settings.registrationEnabled}
                onCheckedChange={(checked) => handleSettingChange("registrationEnabled", checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Matching Algorithm */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="h-5 w-5" />
            <span>Matching Algorithm</span>
          </CardTitle>
          <CardDescription>Configure how users are matched with each other</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="maxDistance">Maximum Distance (miles)</Label>
              <Input
                id="maxDistance"
                type="number"
                value={settings.maxDistance}
                onChange={(e) => handleSettingChange("maxDistance", Number.parseInt(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ageRangeMin">Minimum Age</Label>
              <Input
                id="ageRangeMin"
                type="number"
                value={settings.ageRangeMin}
                onChange={(e) => handleSettingChange("ageRangeMin", Number.parseInt(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ageRangeMax">Maximum Age</Label>
              <Input
                id="ageRangeMax"
                type="number"
                value={settings.ageRangeMax}
                onChange={(e) => handleSettingChange("ageRangeMax", Number.parseInt(e.target.value))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="matchingAlgorithm">Matching Algorithm</Label>
            <Select
              value={settings.matchingAlgorithm}
              onValueChange={(value) => handleSettingChange("matchingAlgorithm", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="compatibility">Compatibility Based</SelectItem>
                <SelectItem value="proximity">Proximity Based</SelectItem>
                <SelectItem value="activity">Activity Based</SelectItem>
                <SelectItem value="hybrid">Hybrid Algorithm</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Show Online Status</Label>
              <p className="text-sm text-gray-500">Display when users are online</p>
            </div>
            <Checkbox
              checked={settings.showOnlineStatus}
              onCheckedChange={(checked) => handleSettingChange("showOnlineStatus", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Notification Settings</span>
          </CardTitle>
          <CardDescription>Configure notification preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gray-500" />
              <div>
                <Label className="text-base font-medium">Email Notifications</Label>
                <p className="text-sm text-gray-500">Send notifications via email</p>
              </div>
            </div>
            <Checkbox
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Smartphone className="h-5 w-5 text-gray-500" />
              <div>
                <Label className="text-base font-medium">Push Notifications</Label>
                <p className="text-sm text-gray-500">Send push notifications to mobile devices</p>
              </div>
            </div>
            <Checkbox
              checked={settings.pushNotifications}
              onCheckedChange={(checked) => handleSettingChange("pushNotifications", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Smartphone className="h-5 w-5 text-gray-500" />
              <div>
                <Label className="text-base font-medium">SMS Notifications</Label>
                <p className="text-sm text-gray-500">Send notifications via SMS</p>
              </div>
            </div>
            <Checkbox
              checked={settings.smsNotifications}
              onCheckedChange={(checked) => handleSettingChange("smsNotifications", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gray-500" />
              <div>
                <Label className="text-base font-medium">Marketing Emails</Label>
                <p className="text-sm text-gray-500">Send promotional and marketing emails</p>
              </div>
            </div>
            <Checkbox
              checked={settings.marketingEmails}
              onCheckedChange={(checked) => handleSettingChange("marketingEmails", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Security & Safety</span>
          </CardTitle>
          <CardDescription>Configure security and safety features</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Lock className="h-5 w-5 text-gray-500" />
              <div>
                <Label className="text-base font-medium">Two-Factor Authentication</Label>
                <p className="text-sm text-gray-500">Require 2FA for admin accounts</p>
              </div>
            </div>
            <Checkbox
              checked={settings.twoFactorAuth}
              onCheckedChange={(checked) => handleSettingChange("twoFactorAuth", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Smartphone className="h-5 w-5 text-gray-500" />
              <div>
                <Label className="text-base font-medium">Phone Verification</Label>
                <p className="text-sm text-gray-500">Require phone number verification</p>
              </div>
            </div>
            <Checkbox
              checked={settings.phoneVerification}
              onCheckedChange={(checked) => handleSettingChange("phoneVerification", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-gray-500" />
              <div>
                <Label className="text-base font-medium">Photo Verification</Label>
                <p className="text-sm text-gray-500">Require photo verification for profiles</p>
              </div>
            </div>
            <Checkbox
              checked={settings.photoVerification}
              onCheckedChange={(checked) => handleSettingChange("photoVerification", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="h-5 w-5 text-gray-500" />
              <div>
                <Label className="text-base font-medium">Background Checks</Label>
                <p className="text-sm text-gray-500">Enable background check integration</p>
              </div>
            </div>
            <Checkbox
              checked={settings.backgroundChecks}
              onCheckedChange={(checked) => handleSettingChange("backgroundChecks", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Content Moderation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Content Moderation</span>
          </CardTitle>
          <CardDescription>Configure automated content moderation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Auto Moderation</Label>
                <p className="text-sm text-gray-500">Enable automated content moderation</p>
              </div>
              <Checkbox
                checked={settings.autoModeration}
                onCheckedChange={(checked) => handleSettingChange("autoModeration", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Profanity Filter</Label>
                <p className="text-sm text-gray-500">Filter inappropriate language</p>
              </div>
              <Checkbox
                checked={settings.profanityFilter}
                onCheckedChange={(checked) => handleSettingChange("profanityFilter", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Image Moderation</Label>
                <p className="text-sm text-gray-500">Automatically moderate uploaded images</p>
              </div>
              <Checkbox
                checked={settings.imageModeration}
                onCheckedChange={(checked) => handleSettingChange("imageModeration", checked)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reportThreshold">Report Threshold</Label>
            <Input
              id="reportThreshold"
              type="number"
              value={settings.reportThreshold}
              onChange={(e) => handleSettingChange("reportThreshold", Number.parseInt(e.target.value))}
            />
            <p className="text-sm text-gray-500">Number of reports before automatic action</p>
          </div>
        </CardContent>
      </Card>

      {/* Premium Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5" />
            <span>Premium Features</span>
          </CardTitle>
          <CardDescription>Configure premium subscription and pricing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="premiumPrice">Premium Monthly Price ($)</Label>
              <Input
                id="premiumPrice"
                type="number"
                step="0.01"
                value={settings.premiumPrice}
                onChange={(e) => handleSettingChange("premiumPrice", Number.parseFloat(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="superLikePrice">Super Like Price ($)</Label>
              <Input
                id="superLikePrice"
                type="number"
                step="0.01"
                value={settings.superLikePrice}
                onChange={(e) => handleSettingChange("superLikePrice", Number.parseFloat(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="boostPrice">Boost Price ($)</Label>
              <Input
                id="boostPrice"
                type="number"
                step="0.01"
                value={settings.boostPrice}
                onChange={(e) => handleSettingChange("boostPrice", Number.parseFloat(e.target.value))}
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-medium">Premium Features</Label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: "unlimited_likes", label: "Unlimited Likes" },
                { id: "see_who_liked", label: "See Who Liked You" },
                { id: "boost", label: "Profile Boost" },
                { id: "super_likes", label: "Super Likes" },
                { id: "rewind", label: "Rewind Feature" },
                { id: "passport", label: "Location Passport" },
              ].map((feature) => (
                <div key={feature.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={feature.id}
                    checked={settings.premiumFeatures.includes(feature.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        handleSettingChange("premiumFeatures", [...settings.premiumFeatures, feature.id])
                      } else {
                        handleSettingChange(
                          "premiumFeatures",
                          settings.premiumFeatures.filter((f) => f !== feature.id),
                        )
                      }
                    }}
                  />
                  <Label htmlFor={feature.id} className="text-sm">
                    {feature.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
