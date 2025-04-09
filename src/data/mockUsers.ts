
import { Brand, Buyer, SalesManager } from "@/types/users";

export const brands: Brand[] = [
  { 
    id: 1, 
    name: "Luxury Brands Inc.", 
    status: "active", 
    plan: "Premium", 
    lastActivity: "2 hours ago",
    contactPerson: "John Smith",
    email: "john@luxurybrandsinc.com",
    phone: "+1 (555) 123-4567",
    website: "luxurybrandsinc.com",
    description: "Leading luxury fashion and accessories brand focused on high-end retail market",
    marketSegment: "Luxury Apparel",
    productsCount: 245,
    activeSince: "June 2018",
    avgOrderValue: "$2,500",
    totalSales: "$1.2M"
  },
  { 
    id: 2, 
    name: "Fashion Forward Co.", 
    status: "active", 
    plan: "Professional", 
    lastActivity: "1 day ago",
    contactPerson: "Emily Johnson",
    email: "emily@fashionforward.co",
    phone: "+1 (555) 234-5678",
    website: "fashionforward.co",
    description: "Contemporary fashion brand targeting young professionals",
    marketSegment: "Contemporary Fashion",
    productsCount: 178,
    activeSince: "March 2019",
    avgOrderValue: "$750",
    totalSales: "$890K"
  },
  { 
    id: 3, 
    name: "Elegant Styles Ltd.", 
    status: "pending", 
    plan: "Basic", 
    lastActivity: "3 days ago",
    contactPerson: "Michael Williams",
    email: "michael@elegantstyles.com",
    phone: "+1 (555) 345-6789",
    website: "elegantstyles.com",
    description: "Classic formal wear and evening attire for special occasions",
    marketSegment: "Formal Wear",
    productsCount: 85,
    activeSince: "November 2020",
    avgOrderValue: "$1,200",
    totalSales: "$430K"
  },
  { 
    id: 4, 
    name: "Heritage Designs", 
    status: "active", 
    plan: "Premium", 
    lastActivity: "5 hours ago",
    contactPerson: "Sarah Brown",
    email: "sarah@heritagedesigns.com",
    phone: "+1 (555) 456-7890",
    website: "heritagedesigns.com",
    description: "Traditional and heritage-inspired clothing with modern touches",
    marketSegment: "Heritage Fashion",
    productsCount: 132,
    activeSince: "April 2017",
    avgOrderValue: "$950",
    totalSales: "$1.5M"
  },
  { 
    id: 5, 
    name: "Modern Collections", 
    status: "inactive", 
    plan: "Basic", 
    lastActivity: "2 weeks ago",
    contactPerson: "David Lee",
    email: "david@moderncollections.com",
    phone: "+1 (555) 567-8901",
    website: "moderncollections.com",
    description: "Minimalist modern fashion focusing on sustainable materials",
    marketSegment: "Sustainable Fashion",
    productsCount: 67,
    activeSince: "September 2021",
    avgOrderValue: "$500",
    totalSales: "$210K"
  }
];

export const buyers: Buyer[] = [
  { 
    id: 1, 
    name: "Department Store Group", 
    status: "active", 
    plan: "Enterprise", 
    lastActivity: "1 hour ago",
    contactPerson: "Robert Chen",
    email: "robert@departmentstoregroup.com",
    phone: "+1 (555) 678-9012",
    website: "departmentstoregroup.com",
    description: "National chain of premium department stores operating in major cities",
    marketSegment: "Department Stores",
    storeCount: 35,
    activeSince: "January 2015",
    avgOrderValue: "$45,000",
    annualPurchases: "$12M"
  },
  { 
    id: 2, 
    name: "Boutique Network LLC", 
    status: "active", 
    plan: "Professional", 
    lastActivity: "3 days ago",
    contactPerson: "Amanda Taylor",
    email: "amanda@boutiquenetwork.com",
    phone: "+1 (555) 789-0123",
    website: "boutiquenetwork.com",
    description: "Collective of upscale boutiques specializing in designer fashion",
    marketSegment: "Boutiques",
    storeCount: 12,
    activeSince: "May 2018",
    avgOrderValue: "$15,000",
    annualPurchases: "$2.5M"
  },
  { 
    id: 3, 
    name: "Global Retail Partners", 
    status: "pending", 
    plan: "Premium", 
    lastActivity: "1 week ago",
    contactPerson: "James Wilson",
    email: "james@globalretail.com",
    phone: "+1 (555) 890-1234",
    website: "globalretailpartners.com",
    description: "International retail group with presence in luxury malls worldwide",
    marketSegment: "International Retail",
    storeCount: 28,
    activeSince: "August 2017",
    avgOrderValue: "$32,000",
    annualPurchases: "$8.7M"
  },
  { 
    id: 4, 
    name: "Fashion Outlets Inc.", 
    status: "active", 
    plan: "Enterprise", 
    lastActivity: "12 hours ago",
    contactPerson: "Elizabeth Moore",
    email: "elizabeth@fashionoutlets.com",
    phone: "+1 (555) 901-2345",
    website: "fashionoutlets.com",
    description: "Operator of premium outlet malls featuring designer brands",
    marketSegment: "Outlet Retail",
    storeCount: 18,
    activeSince: "March 2016",
    avgOrderValue: "$28,000",
    annualPurchases: "$6.2M"
  },
  { 
    id: 5, 
    name: "Luxury Retail Alliance", 
    status: "inactive", 
    plan: "Basic", 
    lastActivity: "1 month ago",
    contactPerson: "Thomas Garcia",
    email: "thomas@luxuryretail.org",
    phone: "+1 (555) 012-3456",
    website: "luxuryretailalliance.org",
    description: "Consortium of high-end retailers focused on luxury goods market",
    marketSegment: "Luxury Retail",
    storeCount: 7,
    activeSince: "October 2019",
    avgOrderValue: "$18,000",
    annualPurchases: "$1.4M"
  }
];

export const salesManagers: SalesManager[] = [
  {
    id: 1,
    name: "James Wilson",
    status: "active",
    email: "james.wilson@company.com",
    phone: "+1 (555) 123-4567",
    startDate: "January 15, 2019",
    yearsInCompany: 4,
    salaryPerMonth: "$6,500",
    totalCommissions: "$124,500",
    ytdCommissions: "$32,800",
    commissionRate: "5.2%",
    commissionHistory: [
      { rate: "5.2%", effectiveDate: "January 1, 2023", notes: "Annual review increase" },
      { rate: "4.8%", effectiveDate: "January 1, 2022", notes: "Performance adjustment" },
      { rate: "4.5%", effectiveDate: "January 15, 2019", notes: "Initial rate" }
    ]
  },
  {
    id: 2,
    name: "Sarah Johnson",
    status: "active",
    email: "sarah.johnson@company.com",
    phone: "+1 (555) 234-5678",
    startDate: "March 22, 2020",
    yearsInCompany: 3,
    salaryPerMonth: "$5,800",
    totalCommissions: "$98,700",
    ytdCommissions: "$28,400",
    commissionRate: "4.8%",
    commissionHistory: [
      { rate: "4.8%", effectiveDate: "April 1, 2023", notes: "Performance adjustment" },
      { rate: "4.5%", effectiveDate: "March 22, 2020", notes: "Initial rate" }
    ]
  },
  {
    id: 3,
    name: "Michael Brown",
    status: "inactive",
    email: "michael.brown@company.com",
    phone: "+1 (555) 345-6789",
    startDate: "June 10, 2018",
    yearsInCompany: 5,
    salaryPerMonth: "$7,200",
    totalCommissions: "$156,800",
    ytdCommissions: "$16,500",
    commissionRate: "5.5%",
    commissionHistory: [
      { rate: "5.5%", effectiveDate: "July 1, 2022", notes: "Performance bonus increase" },
      { rate: "5.0%", effectiveDate: "July 1, 2020", notes: "Merit increase" },
      { rate: "4.8%", effectiveDate: "June 10, 2018", notes: "Initial rate" }
    ]
  },
  {
    id: 4,
    name: "Emily Davis",
    status: "pending",
    email: "emily.davis@company.com",
    phone: "+1 (555) 456-7890",
    startDate: "November 5, 2021",
    yearsInCompany: 2,
    salaryPerMonth: "$5,500",
    totalCommissions: "$62,400",
    ytdCommissions: "$21,700",
    commissionRate: "4.5%",
    commissionHistory: [
      { rate: "4.5%", effectiveDate: "November 5, 2021", notes: "Initial rate" }
    ]
  },
  {
    id: 5,
    name: "Robert Lee",
    status: "active",
    email: "robert.lee@company.com",
    phone: "+1 (555) 567-8901",
    startDate: "August 17, 2017",
    yearsInCompany: 6,
    salaryPerMonth: "$8,000",
    totalCommissions: "$215,600",
    ytdCommissions: "$38,900",
    commissionRate: "6.0%",
    commissionHistory: [
      { rate: "6.0%", effectiveDate: "September 1, 2023", notes: "Senior role adjustment" },
      { rate: "5.5%", effectiveDate: "September 1, 2021", notes: "Team lead promotion" },
      { rate: "5.0%", effectiveDate: "September 1, 2019", notes: "Merit increase" },
      { rate: "4.8%", effectiveDate: "August 17, 2017", notes: "Initial rate" }
    ]
  }
];
