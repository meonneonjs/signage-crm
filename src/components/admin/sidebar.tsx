"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  Building2,
  Settings,
  BarChart3,
  Shield,
  Bell,
  HelpCircle,
  LogOut,
} from "lucide-react"

const navigation = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Organizations",
    href: "/admin/organizations",
    icon: Building2,
  },
  {
    name: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    name: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    name: "Security",
    href: "/admin/security",
    icon: Shield,
  },
  {
    name: "Notifications",
    href: "/admin/notifications",
    icon: Bell,
  },
  {
    name: "Support",
    href: "/admin/support",
    icon: HelpCircle,
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex w-64 flex-col bg-card">
      <div className="flex h-16 items-center border-b px-4">
        <Link href="/admin" className="flex items-center space-x-2">
          <span className="text-xl font-bold">AtellierCRM Admin</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>
      <div className="border-t p-4">
        <button
          onClick={() => {
            // Handle sign out
            window.location.href = "/auth/signout"
          }}
          className="flex w-full items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  )
} 