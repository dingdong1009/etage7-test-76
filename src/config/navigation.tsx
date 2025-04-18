import { LayoutDashboard, Package, ShoppingCart, Megaphone, MessageSquare, Building, CreditCard, Calendar } from "lucide-react"

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

export const sellerNav = [
  {
    title: "Overview",
    href: "/seller/overview",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    href: "/seller/products",
    icon: Package,
  },
  {
    title: "Orders",
    href: "/seller/orders",
    icon: ShoppingCart,
  },
  {
    title: "Messages",
    href: "/seller/messages",
    icon: MessageSquare,
  },
  {
    title: "Settings",
    href: "/seller/settings",
    icon: Settings,
  },
]

export const brandNav = [
  {
    title: "Dashboard",
    href: "/brand/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    href: "/brand/products",
    icon: Package,
  },
  {
    title: "Orders",
    href: "/brand/orders",
    icon: ShoppingCart,
  },
  {
    title: "Marketing",
    href: "/brand/marketing",
    icon: Megaphone,
  },
  {
    title: "Messages",
    href: "/brand/messages",
    icon: MessageSquare,
  },
];

export const buyerNav = [
  {
    title: "Dashboard",
    href: "/buyer/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Brands",
    href: "/buyer/brands",
    icon: Building,
  },
  {
    title: "Orders",
    href: "/buyer/orders",
    icon: ShoppingCart,
  },
  {
    title: "Messages",
    href: "/buyer/messages",
    icon: MessageSquare,
  },
  {
    title: "Settings",
    href: "/buyer/settings",
    icon: Settings,
  },
]

export const adminNav = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
    tooltip: "Admin dashboard overview"
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
    tooltip: "Manage users"
  },
  {
    title: "Paid Services",
    href: "/admin/paid-services",
    icon: CreditCard,
    tooltip: "Manage paid services"
  },
  {
    title: "Agenda",
    href: "/admin/agenda",
    icon: Calendar,
    tooltip: "View and manage agenda"
  },
  {
    title: "Administration",
    href: "/admin/administration",
    icon: Settings,
    tooltip: "System administration"
  }
]
