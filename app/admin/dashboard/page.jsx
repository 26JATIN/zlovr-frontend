"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users,
  Heart,
  MessageCircle,
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  Eye,
  UserCheck,
  Flag,
  Shield,
} from "lucide-react"

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState("7d")

  const stats = [
    {
      title: "Total Users",
      value: "12,847",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      description: "Active users this month",
    },
    {
      title: "Matches Made",
      value: "3,421",
      change: "+8.2%",
      trend: "up",
      icon: Heart,
      description: "Successful matches today",
    },
    {
      title: "Messages Sent",
      value: "28,394",
      change: "+15.3%",
      trend: "up",
      icon: MessageCircle,
      description: "Messages in last 24h",
    },
    {
      title: "Revenue",
      value: "$24,580",
      change: "-2.1%",
      trend: "down",
      icon: DollarSign,
      description: "Monthly recurring revenue",
    },
  ]

  const recentActivity = [
    {
      id: 1,
      user: "Sarah Johnson",
      action: "Created new profile",
      time: "2 minutes ago",
      avatar: "/placeholder.svg?height=32&width=32&text=SJ",
      type: "user",
    },
    {
      id: 2,
      user: "Mike Chen",
      action: "Reported inappropriate content",
      time: "5 minutes ago",
      avatar: "/placeholder.svg?height=32&width=32&text=MC",
      type: "report",
    },
    {
      id: 3,
      user: "Emma Wilson",
      action: "Upgraded to Premium",
      time: "12 minutes ago",
      avatar: "/placeholder.svg?height=32&width=32&text=EW",
      type: "premium",
    },
    {
      id: 4,
      user: "Alex Rodriguez",
      action: "Completed profile verification",
      time: "18 minutes ago",
      avatar: "/placeholder.svg?height=32&width=32&text=AR",
      type: "verification",
    },
    {
      id: 5,
      user: "Lisa Park",
      action: "Sent first message",
      time: "25 minutes ago",
      avatar: "/placeholder.svg?height=32&width=32&text=LP",
      type: "message",
    },
  ]

  const pendingActions = [
    {
      id: 1,
      title: "Photo Verification Requests",
      count: 23,
      priority: "high",
      icon: UserCheck,
    },
    {
      id: 2,
      title: "User Reports to Review",
      count: 8,
      priority: "urgent",
      icon: Flag,
    },
    {
      id: 3,
      title: "Content Moderation Queue",
      count: 15,
      priority: "medium",
      icon: Shield,
    },
    {
      id: 4,
      title: "Support Tickets",
      count: 5,
      priority: "low",
      icon: AlertTriangle,
    },
  ]

  const topLocations = [
    { city: "New York", users: 2847, growth: "+12%" },
    { city: "Los Angeles", users: 2156, growth: "+8%" },
    { city: "Chicago", users: 1923, growth: "+15%" },
    { city: "Houston", users: 1654, growth: "+5%" },
    { city: "Phoenix", users: 1432, growth: "+18%" },
  ]

  const getActionIcon = (type) => {
    switch (type) {
      case "user":
        return <Users className="h-4 w-4 text-blue-500" />
      case "report":
        return <Flag className="h-4 w-4 text-red-500" />
      case "premium":
        return <DollarSign className="h-4 w-4 text-green-500" />
      case "verification":
        return <CheckCircle className="h-4 w-4 text-purple-500" />
      case "message":
        return <MessageCircle className="h-4 w-4 text-orange-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with zlovr today.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant={timeRange === "24h" ? "default" : "outline"} size="sm" onClick={() => setTimeRange("24h")}>
            24h
          </Button>
          <Button variant={timeRange === "7d" ? "default" : "outline"} size="sm" onClick={() => setTimeRange("7d")}>
            7d
          </Button>
          <Button variant={timeRange === "30d" ? "default" : "outline"} size="sm" onClick={() => setTimeRange("30d")}>
            30d
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Recent Activity</span>
              </CardTitle>
              <CardDescription>Latest user actions and system events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={activity.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {activity.user
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium text-gray-900 truncate">{activity.user}</p>
                        {getActionIcon(activity.type)}
                      </div>
                      <p className="text-sm text-gray-600">{activity.action}</p>
                    </div>
                    <div className="text-xs text-gray-500">{activity.time}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t">
                <Button variant="outline" className="w-full bg-transparent">
                  <Eye className="h-4 w-4 mr-2" />
                  View All Activity
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Actions */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5" />
                <span>Pending Actions</span>
              </CardTitle>
              <CardDescription>Items requiring your attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingActions.map((action) => {
                  const IconComponent = action.icon
                  return (
                    <div key={action.id} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-gray-100">
                          <IconComponent className="h-4 w-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{action.title}</p>
                          <Badge className={`text-xs ${getPriorityColor(action.priority)}`}>{action.priority}</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">{action.count}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="mt-4 pt-4 border-t">
                <Button className="w-full">Review All Pending</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Top Locations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span>Top Locations</span>
          </CardTitle>
          <CardDescription>Cities with the most active users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {topLocations.map((location, index) => (
              <div key={location.city} className="text-center p-4 rounded-lg border hover:shadow-md transition-shadow">
                <div className="text-2xl font-bold text-gray-900">{location.users.toLocaleString()}</div>
                <div className="text-sm font-medium text-gray-700 mt-1">{location.city}</div>
                <div className="flex items-center justify-center space-x-1 mt-2">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-600 font-medium">{location.growth}</span>
                </div>
                <Badge variant="outline" className="mt-2">
                  #{index + 1}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
              <Users className="h-6 w-6" />
              <span className="text-sm">Manage Users</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
              <Flag className="h-6 w-6" />
              <span className="text-sm">Review Reports</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
              <Shield className="h-6 w-6" />
              <span className="text-sm">Content Moderation</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
              <DollarSign className="h-6 w-6" />
              <span className="text-sm">Revenue Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
