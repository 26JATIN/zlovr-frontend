"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  Search,
  Download,
  MoreHorizontal,
  Eye,
  Ban,
  CheckCircle,
  Mail,
  MapPin,
  Heart,
  MessageCircle,
  Shield,
  Crown,
} from "lucide-react"

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [verificationFilter, setVerificationFilter] = useState("all")

  const userStats = [
    {
      title: "Total Users",
      value: "12,847",
      change: "+234 this week",
      icon: Users,
      color: "blue",
    },
    {
      title: "Active Users",
      value: "8,923",
      change: "69.4% of total",
      icon: CheckCircle,
      color: "green",
    },
    {
      title: "Premium Users",
      value: "1,456",
      change: "11.3% of total",
      icon: Crown,
      color: "yellow",
    },
    {
      title: "Suspended",
      value: "89",
      change: "-12 this week",
      icon: Ban,
      color: "red",
    },
  ]

  const users = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 123-4567",
      avatar: "/placeholder.svg?height=40&width=40&text=SJ",
      age: 28,
      location: "New York, NY",
      joinDate: "2024-01-15",
      status: "active",
      verified: true,
      premium: true,
      matches: 45,
      messages: 234,
      reports: 0,
      lastActive: "2 hours ago",
    },
    {
      id: 2,
      name: "Mike Chen",
      email: "mike.chen@email.com",
      phone: "+1 (555) 234-5678",
      avatar: "/placeholder.svg?height=40&width=40&text=MC",
      age: 32,
      location: "Los Angeles, CA",
      joinDate: "2024-02-03",
      status: "active",
      verified: true,
      premium: false,
      matches: 23,
      messages: 156,
      reports: 1,
      lastActive: "1 day ago",
    },
    {
      id: 3,
      name: "Emma Wilson",
      email: "emma.wilson@email.com",
      phone: "+1 (555) 345-6789",
      avatar: "/placeholder.svg?height=40&width=40&text=EW",
      age: 25,
      location: "Chicago, IL",
      joinDate: "2024-01-28",
      status: "inactive",
      verified: false,
      premium: false,
      matches: 12,
      messages: 67,
      reports: 0,
      lastActive: "1 week ago",
    },
    {
      id: 4,
      name: "David Brown",
      email: "david.brown@email.com",
      phone: "+1 (555) 456-7890",
      avatar: "/placeholder.svg?height=40&width=40&text=DB",
      age: 29,
      location: "Houston, TX",
      joinDate: "2024-02-10",
      status: "suspended",
      verified: true,
      premium: true,
      matches: 67,
      messages: 345,
      reports: 3,
      lastActive: "3 days ago",
    },
    {
      id: 5,
      name: "Lisa Garcia",
      email: "lisa.garcia@email.com",
      phone: "+1 (555) 567-8901",
      avatar: "/placeholder.svg?height=40&width=40&text=LG",
      age: 31,
      location: "Phoenix, AZ",
      joinDate: "2024-01-20",
      status: "active",
      verified: false,
      premium: false,
      matches: 34,
      messages: 189,
      reports: 0,
      lastActive: "5 minutes ago",
    },
  ]

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Inactive</Badge>
      case "suspended":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Suspended</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    const matchesVerification =
      verificationFilter === "all" ||
      (verificationFilter === "verified" && user.verified) ||
      (verificationFilter === "unverified" && !user.verified)

    return matchesSearch && matchesStatus && matchesVerification
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">Manage and monitor all registered users</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Users className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {userStats.map((stat) => {
          const IconComponent = stat.icon
          return (
            <Card key={stat.title} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <IconComponent className="h-5 w-5 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>Search and filter through all registered users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            <Select value={verificationFilter} onValueChange={setVerificationFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Verification" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="unverified">Unverified</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto">
            <div className="min-w-full">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 rounded-t-lg border-b font-medium text-sm text-gray-600">
                <div className="col-span-3">User</div>
                <div className="col-span-2">Contact</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2">Activity</div>
                <div className="col-span-2">Stats</div>
                <div className="col-span-1">Actions</div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <div key={user.id} className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50 transition-colors">
                    {/* User Info */}
                    <div className="col-span-3 flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-gray-500">{user.age} years</span>
                          {user.verified && <Shield className="h-3 w-3 text-blue-500" />}
                          {user.premium && <Crown className="h-3 w-3 text-yellow-500" />}
                        </div>
                      </div>
                    </div>

                    {/* Contact */}
                    <div className="col-span-2 space-y-1">
                      <div className="flex items-center space-x-1 text-xs text-gray-600">
                        <Mail className="h-3 w-3" />
                        <span className="truncate">{user.email}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-gray-600">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{user.location}</span>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="col-span-2 space-y-2">
                      {getStatusBadge(user.status)}
                      <div className="text-xs text-gray-500">Joined {new Date(user.joinDate).toLocaleDateString()}</div>
                    </div>

                    {/* Activity */}
                    <div className="col-span-2 space-y-1">
                      <div className="text-xs text-gray-600">Last active: {user.lastActive}</div>
                      {user.reports > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {user.reports} report{user.reports > 1 ? "s" : ""}
                        </Badge>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="col-span-2 space-y-1">
                      <div className="flex items-center space-x-1 text-xs text-gray-600">
                        <Heart className="h-3 w-3" />
                        <span>{user.matches} matches</span>
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-gray-600">
                        <MessageCircle className="h-3 w-3" />
                        <span>{user.messages} messages</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="col-span-1 flex items-center space-x-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t">
            <p className="text-sm text-gray-600">
              Showing {filteredUsers.length} of {users.length} users
            </p>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
