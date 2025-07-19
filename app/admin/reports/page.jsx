"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Flag,
  Search,
  Filter,
  Eye,
  CheckCircle,
  X,
  AlertTriangle,
  Clock,
  FileText,
  ImageIcon,
  MessageSquare,
  User,
  Calendar,
  TrendingUp,
} from "lucide-react"

export default function ReportsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const reportStats = [
    {
      title: "Total Reports",
      value: "247",
      change: "+8.2%",
      icon: Flag,
      color: "blue",
    },
    {
      title: "Pending Review",
      value: "23",
      change: "+12.5%",
      icon: Clock,
      color: "orange",
    },
    {
      title: "Under Investigation",
      value: "8",
      change: "-5.1%",
      icon: AlertTriangle,
      color: "yellow",
    },
    {
      title: "Resolved",
      value: "216",
      change: "+15.3%",
      icon: CheckCircle,
      color: "green",
    },
  ]

  const reports = [
    {
      id: 1,
      reportedUser: {
        name: "John Smith",
        avatar: "/placeholder.svg?height=40&width=40&text=JS",
        id: "user_123",
      },
      reportedBy: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40&text=SJ",
        id: "user_456",
      },
      category: "inappropriate_content",
      reason: "Inappropriate photos in profile",
      description:
        "User has uploaded photos that violate community guidelines. Multiple inappropriate images visible in profile gallery.",
      status: "pending",
      priority: "high",
      createdAt: "2024-01-20T10:30:00Z",
      evidence: ["photo1.jpg", "photo2.jpg"],
      assignedTo: null,
    },
    {
      id: 2,
      reportedUser: {
        name: "Mike Chen",
        avatar: "/placeholder.svg?height=40&width=40&text=MC",
        id: "user_789",
      },
      reportedBy: {
        name: "Emma Wilson",
        avatar: "/placeholder.svg?height=40&width=40&text=EW",
        id: "user_101",
      },
      category: "harassment",
      reason: "Sending inappropriate messages",
      description: "User has been sending unwanted and inappropriate messages despite being asked to stop.",
      status: "investigating",
      priority: "urgent",
      createdAt: "2024-01-19T15:45:00Z",
      evidence: ["screenshot1.png", "screenshot2.png", "screenshot3.png"],
      assignedTo: "Admin User",
    },
    {
      id: 3,
      reportedUser: {
        name: "Alex Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40&text=AR",
        id: "user_202",
      },
      reportedBy: {
        name: "Lisa Park",
        avatar: "/placeholder.svg?height=40&width=40&text=LP",
        id: "user_303",
      },
      category: "fake_profile",
      reason: "Suspected fake profile",
      description:
        "Profile appears to be using stolen photos and false information. Multiple users have reported similar concerns.",
      status: "resolved",
      priority: "medium",
      createdAt: "2024-01-18T09:15:00Z",
      evidence: ["comparison.jpg"],
      assignedTo: "Admin User",
      resolution: "Profile suspended after investigation confirmed fake identity",
    },
    {
      id: 4,
      reportedUser: {
        name: "David Kim",
        avatar: "/placeholder.svg?height=40&width=40&text=DK",
        id: "user_404",
      },
      reportedBy: {
        name: "Jennifer Lee",
        avatar: "/placeholder.svg?height=40&width=40&text=JL",
        id: "user_505",
      },
      category: "spam",
      reason: "Spam messages and promotional content",
      description: "User is sending promotional messages and spam content to multiple users.",
      status: "pending",
      priority: "low",
      createdAt: "2024-01-17T14:20:00Z",
      evidence: ["spam_messages.png"],
      assignedTo: null,
    },
  ]

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "investigating":
        return <Badge className="bg-blue-100 text-blue-800">Investigating</Badge>
      case "resolved":
        return <Badge className="bg-green-100 text-green-800">Resolved</Badge>
      case "dismissed":
        return <Badge className="bg-gray-100 text-gray-800">Dismissed</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "urgent":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Urgent</Badge>
      case "high":
        return <Badge className="bg-orange-100 text-orange-800 border-orange-200">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Medium</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Low</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case "inappropriate_content":
        return <ImageIcon className="h-4 w-4" />
      case "harassment":
        return <MessageSquare className="h-4 w-4" />
      case "fake_profile":
        return <User className="h-4 w-4" />
      case "spam":
        return <FileText className="h-4 w-4" />
      default:
        return <Flag className="h-4 w-4" />
    }
  }

  const getStatColor = (color) => {
    switch (color) {
      case "blue":
        return "text-blue-600 bg-blue-100"
      case "orange":
        return "text-orange-600 bg-orange-100"
      case "yellow":
        return "text-yellow-600 bg-yellow-100"
      case "green":
        return "text-green-600 bg-green-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.reportedUser.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reportedBy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reason.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || report.status === statusFilter
    const matchesPriority = priorityFilter === "all" || report.priority === priorityFilter
    const matchesCategory = categoryFilter === "all" || report.category === categoryFilter

    return matchesSearch && matchesStatus && matchesPriority && matchesCategory
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Moderation</h1>
          <p className="text-gray-600 mt-1">Review and manage user reports and content moderation</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">Export Reports</Button>
          <Button>
            <Flag className="h-4 w-4 mr-2" />
            Create Report
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reportStats.map((stat) => {
          const IconComponent = stat.icon
          return (
            <Card key={stat.title} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg ${getStatColor(stat.color)}`}>
                  <IconComponent className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="flex items-center space-x-2 mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium text-green-600">{stat.change}</span>
                  <span className="text-sm text-gray-500">vs last month</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filters & Search</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="investigating">Investigating</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="dismissed">Dismissed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="inappropriate_content">Inappropriate Content</SelectItem>
                <SelectItem value="harassment">Harassment</SelectItem>
                <SelectItem value="fake_profile">Fake Profile</SelectItem>
                <SelectItem value="spam">Spam</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Reports ({filteredReports.length})</span>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                Bulk Actions
              </Button>
            </div>
          </CardTitle>
          <CardDescription>Detailed view of all user reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {filteredReports.map((report) => (
              <div key={report.id} className="border rounded-lg p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      {getCategoryIcon(report.category)}
                      <span className="font-medium text-gray-900">Report #{report.id}</span>
                    </div>
                    {getPriorityBadge(report.priority)}
                    {getStatusBadge(report.status)}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    {report.status === "pending" && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-green-600 hover:text-green-700 bg-transparent"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                          <X className="h-4 w-4 mr-2" />
                          Dismiss
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Reported User */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Reported User</h4>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={report.reportedUser.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {report.reportedUser.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900">{report.reportedUser.name}</p>
                        <p className="text-sm text-gray-500">ID: {report.reportedUser.id}</p>
                      </div>
                    </div>
                  </div>

                  {/* Reporter */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Reported By</h4>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={report.reportedBy.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {report.reportedBy.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900">{report.reportedBy.name}</p>
                        <p className="text-sm text-gray-500">ID: {report.reportedBy.id}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Report Details</h4>
                  <p className="font-medium text-gray-900 mb-2">{report.reason}</p>
                  <p className="text-gray-600 text-sm">{report.description}</p>
                </div>

                {report.evidence && report.evidence.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Evidence ({report.evidence.length})</h4>
                    <div className="flex items-center space-x-2">
                      {report.evidence.map((evidence, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {evidence}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(report.createdAt)}</span>
                    </div>
                    {report.assignedTo && (
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>Assigned to: {report.assignedTo}</span>
                      </div>
                    )}
                  </div>
                  {report.status === "resolved" && report.resolution && (
                    <div className="text-sm text-green-600 font-medium">✓ {report.resolution}</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredReports.length === 0 && (
            <div className="text-center py-12">
              <Flag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
