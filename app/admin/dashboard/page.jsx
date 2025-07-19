"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users,
  Heart,
  MessageCircle,
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Clock,
  MapPin,
  Shield,
  Flag,
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
      color: "blue",
    },
    {
      title: "Active Matches",
      value: "3,421",
      change: "+8.2%",
      trend: "up",
      icon: Heart,
      color: "pink",
    },
    {
      title: "Messages Today",
      value: "28,394",
      change: "+15.3%",
      trend: "up",
      icon: MessageCircle,
      color: "green",
    },
    {
      title: "Revenue (MTD)",
      value: "$24,680",
      change: "-2.1%",
      trend: "down",
      icon: DollarSign,
      color: "yellow",
    },
  ]

  const recentActivity = [
    {
      id: 1,
      type: "user_signup",
      user: "Sarah Johnson",
      avatar: "/placeholder.svg?height=32&width=32&text=SJ",
      action: "signed up",
      time: "2 minutes ago",
      status: "success",
    },
    {
      id: 2,
      type: "report",
      user: "Mike Chen",
      avatar: "/placeholder.svg?height=32&width=32&text=MC",
      action: "reported inappropriate content",
      time: "5 minutes ago",
      status: "warning",
    },
    {
      id: 3,
      type: "match",
      user: "Emma Wilson",
      avatar: "/placeholder.svg?height=32&width=32&text=EW",
      action: "got a new match",
      time: "8 minutes ago",
      status: "success",
    },
    {
      id: 4,
      type: "payment",
      user: "David Brown",
      avatar: "/placeholder.svg?height=32&width=32&text=DB",
      action: "upgraded to premium",
      time: "12 minutes ago",
      status: "success",
    },
    {
      id: 5,
      type: "verification",
      user: "Lisa Garcia",
      avatar: "/placeholder.svg?height=32&width=32&text=LG",
      action: "submitted verification photos",
      time: "15 minutes ago",
      status: "pending",
    },
  ]

  const pendingActions = [
    {
      id: 1,
      type: "Photo Review",
      count: 23,
      priority: "high",
      description: "Profile photos pending approval",
    },
    {
      id: 2,
      type: "User Reports",
      count: 8,
      priority: "high",
      description: "Reports requiring investigation",
    },
    {
      id: 3,
      type: "Verification",
      count: 45,
      priority: "medium",
      description: "Identity verification requests",
    },
    {
      id: 4,
      type: "Support Tickets",
      count: 12,
      priority: "medium",
      description: "Customer support requests",
    },
  ]

  const topLocations = [
    { city: "New York", users: 2847, matches: 1234 },
    { city: "Los Angeles", users: 2156, matches: 987 },
    { city: "Chicago", users: 1834, matches: 756 },
    { city: "Houston", users: 1567, matches: 623 },
    { city: "Phoenix", users: 1234, matches: 534 },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "success":
        return "text-green-600 bg-green-50"
      case "warning":
        return "text-yellow-600 bg-yellow-50"
      case "pending":
        return "text-blue-600 bg-blue-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
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
                  <span className="text-sm text-gray-500">vs last {timeRange}</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
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
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {activity.user} {activity.action}
                    </p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                  <Badge className={`${getStatusColor(activity.status)} border-0`}>{activity.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Actions */}
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
              {pendingActions.map((action) => (
                <div
                  key={action.id}
                  className="p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{action.type}</h4>
                    <Badge className={getPriorityColor(action.priority)}>{action.priority}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{action.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">{action.count}</span>
                    <Button size="sm" variant="outline">
                      Review
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {topLocations.map((location, index) => (
              <div
                key={location.city}
                className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{location.city}</h4>
                  <Badge variant="outline">#{index + 1}</Badge>
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
                </div>
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
            <Button className="h-20 flex-col space-y-2 bg-transparent" variant="outline">
              <Users className="h-6 w-6" />
              <span>Manage Users</span>
            </Button>
            <Button className="h-20 flex-col space-y-2 bg-transparent" variant="outline">
              <Flag className="h-6 w-6" />
              <span>Review Reports</span>
            </Button>
            <Button className="h-20 flex-col space-y-2 bg-transparent" variant="outline">
              <Shield className="h-6 w-6" />
              <span>Moderation</span>
            </Button>
            <Button className="h-20 flex-col space-y-2 bg-transparent" variant="outline">
              <DollarSign className="h-6 w-6" />
              <span>Revenue</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
