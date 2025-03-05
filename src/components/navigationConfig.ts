import {
  BarChart3,
  Box,
  Building2,
  Calendar,
  CircleDollarSign,
  Cog,
  FileText,
  Home,
  LayoutDashboard,
  MessageSquare,
  Settings,
  ShoppingCart,
  Users,
  Wrench,
} from "lucide-react";

export const navigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Production",
    icon: Box,
    items: [
      {
        title: "Orders",
        href: "/dashboard/production/orders",
        icon: ShoppingCart,
      },
      {
        title: "Maintenance",
        href: "/dashboard/production/maintenance",
        icon: Wrench,
      },
      {
        title: "Calendar",
        href: "/dashboard/production/calendar",
        icon: Calendar,
      },
    ],
  },
  {
    title: "Sales",
    icon: CircleDollarSign,
    items: [
      {
        title: "Customers",
        href: "/dashboard/sales/customers",
        icon: Users,
      },
      {
        title: "Quotes",
        href: "/dashboard/sales/quotes",
        icon: FileText,
      },
      {
        title: "Invoices",
        href: "/dashboard/sales/invoices",
        icon: FileText,
      },
    ],
  },
  {
    title: "Analytics",
    icon: BarChart3,
    items: [
      {
        title: "Reports",
        href: "/dashboard/analytics/reports",
        icon: FileText,
      },
      {
        title: "Insights",
        href: "/dashboard/analytics/insights",
        icon: BarChart3,
      },
    ],
  },
  {
    title: "Communication",
    icon: MessageSquare,
    items: [
      {
        title: "Messages",
        href: "/dashboard/communication/messages",
        icon: MessageSquare,
      },
      {
        title: "Notifications",
        href: "/dashboard/communication/notifications",
        icon: MessageSquare,
      },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    items: [
      {
        title: "General",
        href: "/dashboard/settings/general",
        icon: Cog,
      },
      {
        title: "Company",
        href: "/dashboard/settings/company",
        icon: Building2,
      },
      {
        title: "Team",
        href: "/dashboard/settings/team",
        icon: Users,
      },
    ],
  },
]; 