"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Bell, Search, User, Settings } from "lucide-react"
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function Header() {
  const { data: session } = useSession()
  const [notifications] = useState([
    {
      id: 1,
      title: "New Organization Signup",
      description: "Acme Corp has signed up for AtellierCRM",
      time: "5 minutes ago",
      read: false,
    },
    {
      id: 2,
      title: "System Update",
      description: "Scheduled maintenance in 2 hours",
      time: "1 hour ago",
      read: false,
    },
  ])

  return (
    <header className="flex h-16 items-center justify-between border-b px-6">
      <div className="flex flex-1 items-center space-x-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search organizations, users, or settings..."
            className="pl-8"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notifications.some((n) => !n.read) && (
                <Badge
                  variant="destructive"
                  className="absolute -right-1 -top-1 h-4 w-4 rounded-full p-0 text-[10px]"
                >
                  {notifications.filter((n) => !n.read).length}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className="flex flex-col items-start space-y-1"
              >
                <div className="flex w-full items-center justify-between">
                  <p className="font-medium">{notification.title}</p>
                  <span className="text-xs text-muted-foreground">
                    {notification.time}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {notification.description}
                </p>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="w-full text-center">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={session?.user?.image || ""}
                  alt={session?.user?.name || ""}
                />
                <AvatarFallback>
                  {session?.user?.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("") || "U"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                window.location.href = "/auth/signout"
              }}
            >
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
} 