"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Globe, Shield, Bell, DollarSign, Heart, ImageIcon, Save, RefreshCw } from "lucide-react"

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
    dailyLikeLimit: 100,

    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    marketingEmails: true,

    // Security & Safety
    photoVerification: true,
    identityVerification: false,
    twoFactorAuth: false,
    autoModeration: true,
    reportThreshold: 3,

    // Content Moderation
    autoPhotoReview: true,
    profanityFilter: true,
    spamDetection: true,
    maxPhotosPerProfile: 6,
    minPhotoResolution: "800x600",

    // Premium Features
    premiumPrice: 19.99,
    premiumDuration: "monthly",
    freeTrialDays: 7,
    premiumFeatures: {
      unlimitedLikes: true,
      superLikes: true,
      boosts: true,
      readReceipts: true,
      undoSwipes: true,
    },
  })

  const handleSettingChange = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handlePremiumFeatureChange = (feature, value) => {
    setSettings((prev) => ({
      ...prev,
      premiumFeatures: {
        ...prev.premiumFeatures,
        [feature]: value,
      },
    }))
  }

  const handleSave = () => {
    console.log("Saving settings:", settings)
    // Here you would typically save to your backend
  }

  const handleReset = () => {
    console.log("Resetting settings to defaults")
    // Reset to default values
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">App Settings</h1>
          <p className="text-gray-600 mt-1">Configure application settings and preferences</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleReset}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset to Defaults
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <span>General Settings</span>
            </CardTitle>
            <CardDescription>Basic application configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="appName">Application Name</Label>
              <Input
                id="appName"
                value={settings.appName}
                onChange={(e) => handleSettingChange("appName", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="appDescription">App Description</Label>
              <Input
                id="appDescription"
                value={settings.appDescription}
                onChange={(e) => handleSettingChange("appDescription", e.target.value)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Maintenance Mode</Label>
                <p className="text-sm text-gray-600">Temporarily disable app access</p>
              </div>
              <Switch
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => handleSettingChange("maintenanceMode", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>User Registration</Label>
                <p className="text-sm text-gray-600">Allow new user signups</p>
              </div>
              <Switch
                checked={settings.registrationEnabled}
                onCheckedChange={(checked) => handleSettingChange("registrationEnabled", checked)}
              />
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
            <CardDescription>Configure how users are matched</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="maxDistance">Maximum Distance (km)</Label>
              <Input
                id="maxDistance"
                type="number"
                value={settings.maxDistance}
                onChange={(e) => handleSettingChange("maxDistance", Number.parseInt(e.target.value))}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ageRangeMin">Min Age</Label>
                <Input
                  id="ageRangeMin"
                  type="number"
                  value={settings.ageRangeMin}
                  onChange={(e) => handleSettingChange("ageRangeMin", Number.parseInt(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ageRangeMax">Max Age</Label>
                <Input
                  id="ageRangeMax"
                  type="number"
                  value={settings.ageRangeMax}
                  onChange={(e) => handleSettingChange("ageRangeMax", Number.parseInt(e.target.value))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="matchingAlgorithm">Algorithm Type</Label>
              <Select
                value={settings.matchingAlgorithm}
                onValueChange={(value) => handleSettingChange("matchingAlgorithm", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="compatibility">Compatibility Based</SelectItem>
                  <SelectItem value="location">Location Based</SelectItem>
                  <SelectItem value="activity">Activity Based</SelectItem>
                  <SelectItem value="hybrid">Hybrid Algorithm</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dailyLikeLimit">Daily Like Limit</Label>
              <Input
                id="dailyLikeLimit"
                type="number"
                value={settings.dailyLikeLimit}
                onChange={(e) => handleSettingChange("dailyLikeLimit", Number.parseInt(e.target.value))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Notifications</span>
            </CardTitle>
            <CardDescription>Configure notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-gray-600">Send email notifications to users</p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Push Notifications</Label>
                <p className="text-sm text-gray-600">Send mobile push notifications</p>
              </div>
              <Switch
                checked={settings.pushNotifications}
                onCheckedChange={(checked) => handleSettingChange("pushNotifications", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>SMS Notifications</Label>
                <p className="text-sm text-gray-600">Send SMS text messages</p>
              </div>
              <Switch
                checked={settings.smsNotifications}
                onCheckedChange={(checked) => handleSettingChange("smsNotifications", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Marketing Emails</Label>
                <p className="text-sm text-gray-600">Send promotional content</p>
              </div>
              <Switch
                checked={settings.marketingEmails}
                onCheckedChange={(checked) => handleSettingChange("marketingEmails", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security & Safety */}
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
              <div className="space-y-0.5">
                <Label>Photo Verification</Label>
                <p className="text-sm text-gray-600">Require photo verification for profiles</p>
              </div>
              <Switch
                checked={settings.photoVerification}
                onCheckedChange={(checked) => handleSettingChange("photoVerification", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Identity Verification</Label>
                <p className="text-sm text-gray-600">Require government ID verification</p>
              </div>
              <Switch
                checked={settings.identityVerification}
                onCheckedChange={(checked) => handleSettingChange("identityVerification", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-gray-600">Require 2FA for user accounts</p>
              </div>
              <Switch
                checked={settings.twoFactorAuth}
                onCheckedChange={(checked) => handleSettingChange("twoFactorAuth", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto Moderation</Label>
                <p className="text-sm text-gray-600">Automatically moderate content</p>
              </div>
              <Switch
                checked={settings.autoModeration}
                onCheckedChange={(checked) => handleSettingChange("autoModeration", checked)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reportThreshold">Report Threshold</Label>
              <Input
                id="reportThreshold"
                type="number"
                value={settings.reportThreshold}
                onChange={(e) => handleSettingChange("reportThreshold", Number.parseInt(e.target.value))}
              />
              <p className="text-sm text-gray-600">Number of reports before auto-suspension</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Moderation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ImageIcon className="h-5 w-5" />
            <span>Content Moderation</span>
          </CardTitle>
          <CardDescription>Configure content moderation and filtering</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto Photo Review</Label>
                  <p className="text-sm text-gray-600">Automatically review uploaded photos</p>
                </div>
                <Switch
                  checked={settings.autoPhotoReview}
                  onCheckedChange={(checked) => handleSettingChange("autoPhotoReview", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Profanity Filter</Label>
                  <p className="text-sm text-gray-600">Filter inappropriate language</p>
                </div>
                <Switch
                  checked={settings.profanityFilter}
                  onCheckedChange={(checked) => handleSettingChange("profanityFilter", checked)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Spam Detection</Label>
                  <p className="text-sm text-gray-600">Detect and prevent spam content</p>
                </div>
                <Switch
                  checked={settings.spamDetection}
                  onCheckedChange={(checked) => handleSettingChange("spamDetection", checked)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxPhotos">Max Photos per Profile</Label>
                <Input
                  id="maxPhotos"
                  type="number"
                  value={settings.maxPhotosPerProfile}
                  onChange={(e) => handleSettingChange("maxPhotosPerProfile", Number.parseInt(e.target.value))}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="minResolution">Min Photo Resolution</Label>
                <Select
                  value={settings.minPhotoResolution}
                  onValueChange={(value) => handleSettingChange("minPhotoResolution", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="640x480">640x480</SelectItem>
                    <SelectItem value="800x600">800x600</SelectItem>
                    <SelectItem value="1024x768">1024x768</SelectItem>
                    <SelectItem value="1280x720">1280x720</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Premium Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5" />
            <span>Premium Subscription</span>
          </CardTitle>
          <CardDescription>Configure premium features and pricing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="premiumPrice">Premium Price ($)</Label>
                <Input
                  id="premiumPrice"
                  type="number"
                  step="0.01"
                  value={settings.premiumPrice}
                  onChange={(e) => handleSettingChange("premiumPrice", Number.parseFloat(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="premiumDuration">Billing Period</Label>
                <Select
                  value={settings.premiumDuration}
                  onValueChange={(value) => handleSettingChange("premiumDuration", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="freeTrialDays">Free Trial Days</Label>
                <Input
                  id="freeTrialDays"
                  type="number"
                  value={settings.freeTrialDays}
                  onChange={(e) => handleSettingChange("freeTrialDays", Number.parseInt(e.target.value))}
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label>Premium Features</Label>
              <div className="space-y-3">
                {Object.entries(settings.premiumFeatures).map(([feature, enabled]) => (
                  <div key={feature} className="flex items-center justify-between">
                    <Label className="capitalize">{feature.replace(/([A-Z])/g, " $1").trim()}</Label>
                    <Switch
                      checked={enabled}
                      onCheckedChange={(checked) => handlePremiumFeatureChange(feature, checked)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
