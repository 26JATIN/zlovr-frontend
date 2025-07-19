"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Heart,
  MessageCircle,
  DollarSign,
  Globe,
  Smartphone,
  Monitor,
  Clock,
  MapPin,
} from "lucide-react"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7d")
  const [metric, setMetric] = useState("users")

  const overviewStats = [
    {
      title: "Total Users",
      value: "12,847",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      description: "Registered users",
    },
    {
      title: "Daily Active Users",
      value: "8,923",
      change: "+8.2%",
      trend: "up",
      icon: Clock,
      description: "Users active today",
    },
    {
      title: "Total Matches",
      value: "45,672",
      change: "+15.3%",
      trend: "up",
      icon: Heart,
      description: "Successful matches",
    },
    {
      title: "Messages Sent",
      value: "234,891",
      change: "+22.1%",
      trend: "up",
      icon: MessageCircle,
      description: "Messages exchanged",
    },
  ]

  const demographics = [
    { age: "18-24", male: 1234, female: 1456, percentage: 21 },
    { age: "25-29", male: 2345, female: 2678, percentage: 39 },
    { age: "30-34", male: 1876, female: 1654, percentage: 27 },
    { age: "35-39", male: 987, female: 876, percentage: 14 },
    { age: "40+", male: 543, female: 432, percentage: 8 },
  ]

  const deviceStats = [
    { device: "Mobile", users: 9876, percentage: 76.8 },
    { device: "Desktop", users: 2341, percentage: 18.2 },
    { device: "Tablet", users: 630, percentage: 4.9 },
  ]

  const locationStats = [
    { city: "New York", users: 2847, matches: 1234, growth: "+12%" },
    { city: "Los Angeles", users: 2156, matches: 987, growth: "+8%" },
    { city: "Chicago", users: 1834, matches: 756, growth: "+15%" },
    { city: "Houston", users: 1567, matches: 623, growth: "+5%" },
    { city: "Phoenix", users: 1234, matches: 534, growth: "+18%" },
    { city: "Philadelphia", users: 1098, matches: 445, growth: "+7%" },
  ]

  const engagementMetrics = [
    {
      metric: "Average Session Duration",
      value: "12m 34s",
      change: "+2.3%",
      trend: "up",
    },
    {
      metric: "Messages per Match",
      value: "8.7",
      change: "+5.1%",
      trend: "up",
    },
    {
      metric: "Profile Completion Rate",
      value: "78.4%",
      change: "-1.2%",
      trend: "down",
    },
    {
      metric: "Photo Upload Rate",
      value: "92.1%",
      change: "+3.4%",
      trend: "up",
    },
  ]

  const revenueMetrics = [
    {
      title: "Monthly Revenue",
      value: "$24,680",
      change: "+18.5%",
      trend: "up",
      description: "Premium subscriptions",
    },
    {
      title: "Premium Users",
      value: "1,456",
      change: "+12.3%",
      trend: "up",
      description: "11.3% of total users",
    },
    {
      title: "Conversion Rate",
      value: "3.2%",
      change: "+0.8%",
      trend: "up",
      description: "Free to premium",
    },
    {
      title: "ARPU",
      value: "$16.95",
      change: "+5.2%",
      trend: "up",
      description: "Average revenue per user",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1">Comprehensive insights into app performance and user behavior</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">24 Hours</SelectItem>
              <SelectItem value="7d">7 Days</SelectItem>
              <SelectItem value="30d">30 Days</SelectItem>
              <SelectItem value="90d">90 Days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat) => {
          const IconComponent = stat.icon
          return (
            <Card key={stat.title} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <IconComponent className="h-5 w-5 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="flex items-center space-x-1 mt-1">
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                  <span className={`text-sm font-medium ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                    {stat.change}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Demographics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>User Demographics</span>
            </CardTitle>
            <CardDescription>Age and gender distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {demographics.map((demo) => (
                <div key={demo.age} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">{demo.age} years</span>
                    <span className="text-sm text-gray-600">{demo.percentage}%</span>
                  </div>
                  <div className="flex space-x-2">
                    <div className="flex-1">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Male</span>
                        <span>{demo.male.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${(demo.male / (demo.male + demo.female)) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Female</span>
                        <span>{demo.female.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-pink-500 h-2 rounded-full"
                          style={{ width: `${(demo.female / (demo.male + demo.female)) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Device Usage */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Smartphone className="h-5 w-5" />
              <span>Device Usage</span>
            </CardTitle>
            <CardDescription>How users access the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deviceStats.map((device) => (
                <div
                  key={device.device}
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-200"
                >
                  <div className="flex items-center space-x-3">
                    {device.device === "Mobile" && <Smartphone className="h-5 w-5 text-blue-500" />}
                    {device.device === "Desktop" && <Monitor className="h-5 w-5 text-green-500" />}
                    {device.device === "Tablet" && <Globe className="h-5 w-5 text-purple-500" />}
                    <div>
                      <p className="font-medium text-gray-900">{device.device}</p>
                      <p className="text-sm text-gray-600">{device.users.toLocaleString()} users</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">{device.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Location Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span>Geographic Distribution</span>
          </CardTitle>
          <CardDescription>User distribution by city</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {locationStats.map((location) => (
              <div
                key={location.city}
                className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{location.city}</h4>
                  <Badge variant="outline" className="text-green-600 border-green-200">
                    {location.growth}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Users:</span>
                    <span className="font-medium">{location.users.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Matches:</span>
                    <span className="font-medium">{location.matches.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Match Rate:</span>
                    <span className="font-medium">{((location.matches / location.users) * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Engagement Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Engagement Metrics</span>
            </CardTitle>
            <CardDescription>User interaction and engagement data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {engagementMetrics.map((metric) => (
                <div key={metric.metric} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div>
                    <p className="font-medium text-gray-900">{metric.metric}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      {metric.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                      <span
                        className={`text-sm font-medium ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}
                      >
                        {metric.change}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Revenue Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5" />
              <span>Revenue Analytics</span>
            </CardTitle>
            <CardDescription>Monetization and subscription metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {revenueMetrics.map((metric) => (
                <div key={metric.title} className="p-3 rounded-lg border border-gray-200">
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-xl font-bold text-gray-900 mt-1">{metric.value}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    {metric.trend === "up" ? (
                      <TrendingUp className="h-3 w-3 text-green-500" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-500" />
                    )}
                    <span
                      className={`text-xs font-medium ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}
                    >
                      {metric.change}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{metric.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
