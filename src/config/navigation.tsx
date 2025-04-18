import { LayoutDashboard, Package, ShoppingCart, Megaphone, MessageSquare, Settings, Users, Building, CreditCard, Calendar } from "lucide-react"

export const mainNav = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Curated",
    href: "/curated",
  },
  {
    title: "Contact",
    href: "/contact",
    disabled: true,
  },
]

export const adminNav = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Paid Services",
    href: "/admin/paid-services",
    icon: CreditCard,
  },
  {
    title: "Agenda",
    href: "/admin/agenda",
    icon: Calendar,
  },
  {
    title: "Administration",
    href: "/admin/administration",
    icon: Settings,
  },
]
