"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Flag,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  Ban,
  MessageSquare,
  ImageIcon,
  User,
  MoreHorizontal,
} from "lucide-react"

export default function ReportsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const reportStats = [
    {
      title: "Total Reports",
      value: "247",
      change: "+12 this week",
      icon: Flag,
      color: "blue",
    },
    {
      title: "Pending Review",
      value: "23",
      change: "Needs attention",
      icon: Clock,
      color: "yellow",
    },
    {
      title: "Under Investigation",
      value: "8",
      change: "In progress",
      icon: AlertTriangle,
      color: "orange",
    },
    {
      title: "Resolved",
      value: "216",
      change: "87.4% resolution rate",
      icon: CheckCircle,
      color: "green",
    },
  ]

  const reports = [
    {
      id: 1,
      type: "inappropriate_content",
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
      reason: "Inappropriate photos in profile",
      description:
        "User has uploaded photos that violate community guidelines. Multiple inappropriate images visible in profile gallery.",
      status: "pending",
      priority: "high",
      createdAt: "2024-01-20T10:30:00Z",
      evidence: ["photo1.jpg", "photo2.jpg"],
      category: "Content Violation",
    },
    {
      id: 2,
      type: "harassment",
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
      reason: "Harassment and inappropriate messages",
      description: "User sent multiple inappropriate and harassing messages despite being asked to stop.",
      status: "investigating",
      priority: "high",
      createdAt: "2024-01-19T15:45:00Z",
      evidence: ["message_thread.png"],
      category: "Harassment",
    },
    {
      id: 3,
      type: "fake_profile",
      reportedUser: {
        name: "Lisa Garcia",
        avatar: "/placeholder.svg?height=40&width=40&text=LG",
        id: "user_202",
      },
      reportedBy: {
        name: "David Brown",
        avatar: "/placeholder.svg?height=40&width=40&text=DB",
        id: "user_303",
      },
      reason: "Suspected fake profile",
      description:
        "Profile appears to be using stolen photos from social media. Multiple reverse image search matches found.",
      status: "resolved",
      priority: "medium",
      createdAt: "2024-01-18T09:15:00Z",
      evidence: ["reverse_search.png", "original_photos.jpg"],
      category: "Identity Fraud",
    },
    {
      id: 4,
      type: "spam",
      reportedUser: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40&text=AJ",
        id: "user_404",
      },
      reportedBy: {
        name: "Maria Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40&text=MR",
        id: "user_505",
      },
      reason: "Spam and promotional content",
      description: "User is sending promotional messages and trying to redirect to external websites.",
      status: "pending",
      priority: "low",
      createdAt: "2024-01-17T14:20:00Z",
      evidence: ["spam_messages.png"],
      category: "Spam",
    },
    {
      id: 5,
      type: "underage",
      reportedUser: {
        name: "Taylor Swift",
        avatar: "/placeholder.svg?height=40&width=40&text=TS",
        id: "user_606",
      },
      reportedBy: {
        name: "Anonymous",
        avatar: "/placeholder.svg?height=40&width=40&text=AN",
        id: "user_anon",
      },
      reason: "Suspected underage user",
      description: "Profile indicates user may be under 18 years old based on photos and profile information.",
      status: "investigating",
      priority: "high",
      createdAt: "2024-01-16T11:00:00Z",
      evidence: ["profile_screenshot.png"],
      category: "Age Verification",
    },
  ]

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>
      case "investigating":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Investigating</Badge>
      case "resolved":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Resolved</Badge>
      case "dismissed":
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Dismissed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800 border-red-200">High</Badge>
      case "medium":
        return <Badge className="bg-orange-100 text-orange-800 border-orange-200">Medium</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Low</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case "inappropriate_content":
        return <ImageIcon className="h-4 w-4" />
      case "harassment":
        return <MessageSquare className="h-4 w-4" />
      case "fake_profile":
        return <User className="h-4 w-4" />
      case "spam":
        return <Flag className="h-4 w-4" />
      case "underage":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Flag className="h-4 w-4" />
    }
  }

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.reportedUser.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || report.status === statusFilter
    const matchesType = typeFilter === "all" || report.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Moderation</h1>
          <p className="text-gray-600 mt-1">Review and manage user reports and content violations</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filters
          </Button>
          <Button size="sm">
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

      {/* Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle>User Reports</CardTitle>
          <CardDescription>Review and investigate user-submitted reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search reports..."
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
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="investigating">Investigating</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="dismissed">Dismissed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="inappropriate_content">Inappropriate Content</SelectItem>
                <SelectItem value="harassment">Harassment</SelectItem>
                <SelectItem value="fake_profile">Fake Profile</SelectItem>
                <SelectItem value="spam">Spam</SelectItem>
                <SelectItem value="underage">Underage</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Reports List */}
          <div className="space-y-4">
            {filteredReports.map((report) => (
              <div
                key={report.id}
                className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 rounded-lg">{getTypeIcon(report.type)}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{report.category}</h3>
                      <p className="text-sm text-gray-600">Report #{report.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(report.status)}
                    {getPriorityBadge(report.priority)}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  {/* Reported User */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Reported User</h4>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
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
                        <p className="text-sm text-gray-600">ID: {report.reportedUser.id}</p>
                      </div>
                    </div>
                  </div>

                  {/* Reporter */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Reported By</h4>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
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
                        <p className="text-sm text-gray-600">ID: {report.reportedBy.id}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Report Details */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Report Details</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="font-medium text-gray-900 mb-1">{report.reason}</p>
                    <p className="text-sm text-gray-600 mb-3">{report.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Reported on {formatDate(report.createdAt)}</span>
                      {report.evidence.length > 0 && (
                        <span>
                          {report.evidence.length} evidence file{report.evidence.length > 1 ? "s" : ""}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    {report.evidence.length > 0 && (
                      <Button variant="outline" size="sm">
                        <ImageIcon className="h-4 w-4 mr-2" />
                        View Evidence
                      </Button>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    {report.status === "pending" && (
                      <>
                        <Button variant="outline" size="sm">
                          <XCircle className="h-4 w-4 mr-2" />
                          Dismiss
                        </Button>
                        <Button size="sm">
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          Investigate
                        </Button>
                      </>
                    )}
                    {report.status === "investigating" && (
                      <>
                        <Button variant="outline" size="sm">
                          <Ban className="h-4 w-4 mr-2" />
                          Take Action
                        </Button>
                        <Button size="sm">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Resolve
                        </Button>
                      </>
                    )}
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t">
            <p className="text-sm text-gray-600">
              Showing {filteredReports.length} of {reports.length} reports
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
