"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  MoreHorizontal,
  Search,
  Plus,
  User,
  Mail,
  Shield,
  Trash2,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface User {
  id: string
  name: string
  email: string
  organization: string
  role: string
  status: "active" | "inactive" | "suspended"
  lastActive: string
  createdAt: string
}

export default function UsersPage() {
  const { toast } = useToast()
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@acme.com",
      organization: "Acme Corp",
      role: "Admin",
      status: "active",
      lastActive: "2024-05-20",
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@globex.com",
      organization: "Globex Corp",
      role: "Manager",
      status: "active",
      lastActive: "2024-05-19",
      createdAt: "2024-02-01",
    },
    {
      id: "3",
      name: "Bob Wilson",
      email: "bob@initech.com",
      organization: "Initech",
      role: "User",
      status: "inactive",
      lastActive: "2024-05-15",
      createdAt: "2024-02-15",
    },
    {
      id: "4",
      name: "Alice Brown",
      email: "alice@techcorp.com",
      organization: "TechCorp",
      role: "User",
      status: "suspended",
      lastActive: "2024-05-10",
      createdAt: "2024-03-01",
    },
  ])

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id))
    toast({
      title: "User deleted",
      description: "The user has been deleted successfully.",
    })
  }

  const getStatusColor = (status: User["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "inactive":
        return "bg-yellow-500"
      case "suspended":
        return "bg-red-500"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Users</h3>
          <p className="text-sm text-muted-foreground">
            Manage and monitor all users across organizations.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-8"
          />
        </div>
        <Button variant="outline">
          <Shield className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Organization</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>{user.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{user.email}</span>
                  </div>
                </TableCell>
                <TableCell>{user.organization}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={getStatusColor(user.status)}
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(user.lastActive).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(user.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="h-8 w-8 p-0"
                      >
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Edit User
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Reset Password
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 