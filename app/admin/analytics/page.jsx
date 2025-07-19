"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Heart,
  DollarSign,
  Smartphone,
  Monitor,
  Globe,
  Clock,
  Target,
} from "lucide-react"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d")

  const overviewStats = [
    {
      title: "Total Revenue",
      value: "$127,450",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      description: "Monthly recurring revenue",
    },
    {
      title: "Active Users",
      value: "8,923",
      change: "+8.2%",
      trend: "up",
      icon: Users,
      description: "Daily active users",
    },
    {
      title: "Match Success Rate",
      value: "73.4%",
      change: "+5.1%",
      trend: "up",
      icon: Heart,
      description: "Successful matches",
    },
    {
      title: "Avg. Session Time",
      value: "24m 32s",
      change: "-2.3%",
      trend: "down",
      icon: Clock,
      description: "Average session duration",
    },
  ]

  const userDemographics = [
    { ageGroup: "18-24", percentage: 28, count: 3584, color: "bg-blue-500" },
    { ageGroup: "25-34", percentage: 42, count: 5387, color: "bg-purple-500" },
    { ageGroup: "35-44", percentage: 20, count: 2569, color: "bg-pink-500" },
    { ageGroup: "45-54", percentage: 8, count: 1026, color: "bg-orange-500" },
    { ageGroup: "55+", percentage: 2, count: 257, color: "bg-gray-500" },
  ]

  const genderDistribution = [
    { gender: "Female", percentage: 52, count: 6680, color: "bg-pink-500" },
    { gender: "Male", percentage: 46, count: 5909, color: "bg-blue-500" },
    { gender: "Non-binary", percentage: 2, count: 257, color: "bg-purple-500" },
  ]

  const deviceStats = [
    { device: "Mobile", percentage: 78, count: 10019, icon: Smartphone },
    { device: "Desktop", percentage: 20, count: 2569, icon: Monitor },
    { device: "Tablet", percentage: 2, count: 257, icon: Globe },
  ]

  const topLocations = [
    { city: "New York", users: 2847, matches: 1423, revenue: "$12,450" },
    { city: "Los Angeles", users: 2156, matches: 1078, revenue: "$9,230" },
    { city: "Chicago", users: 1923, matches: 962, revenue: "$8,150" },
    { city: "Houston", users: 1654, matches: 827, revenue: "$7,890" },
    { city: "Phoenix", users: 1432, matches: 716, revenue: "$6,540" },
  ]

  const engagementMetrics = [
    { metric: "Daily Messages", value: "28,394", change: "+15.3%", trend: "up" },
    { metric: "Profile Views", value: "156,789", change: "+8.7%", trend: "up" },
    { metric: "Likes Given", value: "89,234", change: "+12.1%", trend: "up" },
    { metric: "Super Likes", value: "4,567", change: "+23.4%", trend: "up" },
    { metric: "Profile Completions", value: "2,345", change: "-3.2%", trend: "down" },
    { metric: "Photo Uploads", value: "12,678", change: "+18.9%", trend: "up" },
  ]

  const revenueBreakdown = [
    { source: "Premium Subscriptions", amount: "$89,450", percentage: 70.2 },
    { source: "Super Likes", amount: "$23,120", percentage: 18.1 },
    { source: "Boosts", amount: "$14,880", percentage: 11.7 },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1">Comprehensive insights into app performance and user behavior</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant={timeRange === "7d" ? "default" : "outline"} size="sm" onClick={() => setTimeRange("7d")}>
            7 Days
          </Button>
          <Button variant={timeRange === "30d" ? "default" : "outline"} size="sm" onClick={() => setTimeRange("30d")}>
            30 Days
          </Button>
          <Button variant={timeRange === "90d" ? "default" : "outline"} size="sm" onClick={() => setTimeRange("90d")}>
            90 Days
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat) => {
          const IconComponent = stat.icon
          return (
            <Card key={stat.title} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <IconComponent className="h-5 w-5 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="flex items-center space-x-2 mt-2">
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                  <span className={`text-sm font-medium ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500">vs last period</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Demographics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>User Demographics</span>
            </CardTitle>
            <CardDescription>Age distribution of active users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userDemographics.map((demo) => (
                <div key={demo.ageGroup} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{
                        backgroundColor:
                          demo.color.replace("bg-", "").replace("-500", "") === "blue"
                            ? "#3b82f6"
                            : demo.color.replace("bg-", "").replace("-500", "") === "purple"
                              ? "#8b5cf6"
                              : demo.color.replace("bg-", "").replace("-500", "") === "pink"
                                ? "#ec4899"
                                : demo.color.replace("bg-", "").replace("-500", "") === "orange"
                                  ? "#f97316"
                                  : "#6b7280",
                      }}
                    ></div>
                    <span className="text-sm font-medium text-gray-900">{demo.ageGroup}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className={`h-2 rounded-full ${demo.color}`} style={{ width: `${demo.percentage}%` }}></div>
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">{demo.percentage}%</span>
                    <span className="text-sm text-gray-500 w-16 text-right">{demo.count.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Gender Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Gender Distribution</span>
            </CardTitle>
            <CardDescription>Gender breakdown of user base</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {genderDistribution.map((gender) => (
                <div key={gender.gender} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{
                        backgroundColor:
                          gender.color.replace("bg-", "").replace("-500", "") === "pink"
                            ? "#ec4899"
                            : gender.color.replace("bg-", "").replace("-500", "") === "blue"
                              ? "#3b82f6"
                              : "#8b5cf6",
                      }}
                    ></div>
                    <span className="text-sm font-medium text-gray-900">{gender.gender}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${gender.color}`}
                        style={{ width: `${gender.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">{gender.percentage}%</span>
                    <span className="text-sm text-gray-500 w-16 text-right">{gender.count.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Device Usage & Engagement */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
              {deviceStats.map((device) => {
                const IconComponent = device.icon
                return (
                  <div key={device.device} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-gray-100">
                        <IconComponent className="h-4 w-4 text-gray-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{device.device}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="h-2 rounded-full bg-blue-500" style={{ width: `${device.percentage}%` }}></div>
                      </div>
                      <span className="text-sm text-gray-600 w-12 text-right">{device.percentage}%</span>
                      <span className="text-sm text-gray-500 w-16 text-right">{device.count.toLocaleString()}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Engagement Metrics</span>
            </CardTitle>
            <CardDescription>User activity and engagement levels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {engagementMetrics.map((metric) => (
                <div key={metric.metric} className="text-center p-3 rounded-lg border">
                  <div className="text-lg font-bold text-gray-900">{metric.value}</div>
                  <div className="text-sm text-gray-600 mb-2">{metric.metric}</div>
                  <div className="flex items-center justify-center space-x-1">
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
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue & Locations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5" />
              <span>Revenue Breakdown</span>
            </CardTitle>
            <CardDescription>Revenue sources and distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {revenueBreakdown.map((source) => (
                <div key={source.source} className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <div className="font-medium text-gray-900">{source.source}</div>
                    <div className="text-sm text-gray-500">{source.percentage}% of total</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">{source.amount}</div>
                    <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                      <div className="h-2 rounded-full bg-green-500" style={{ width: `${source.percentage}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <span>Top Locations</span>
            </CardTitle>
            <CardDescription>Cities with highest user activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topLocations.map((location, index) => (
                <div key={location.city} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline" className="w-8 h-8 rounded-full p-0 flex items-center justify-center">
                      {index + 1}
                    </Badge>
                    <div>
                      <div className="font-medium text-gray-900">{location.city}</div>
                      <div className="text-sm text-gray-500">{location.users.toLocaleString()} users</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{location.revenue}</div>
                    <div className="text-xs text-gray-500">{location.matches} matches</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
