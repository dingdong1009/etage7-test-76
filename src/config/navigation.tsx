import { LayoutDashboard, Package, ShoppingCart, Megaphone, MessageSquare, Settings, Users, Building, HelpCircle, FileText, UserPlus, CheckCircle, XCircle, AlertTriangle, Star, Home, Plus, ListChecks, UserCog, CreditCard, Mail, Bell, Lock, BarChart, LineChart, PieChart, KanbanSquare, File, Folder, Calendar, ClipboardList, CheckCheck, UserRound, GraduationCap, Book, Briefcase, Lightbulb, ShieldCheck, Heart, Award, Flag, TrendingUp, Globe2, Cloud, Server, Database, Code, Terminal, Puzzle, Layers, GitBranch, Share2, Archive, Download, Upload, RefreshCw, Search, Filter, Edit, Trash2, Copy, Move, Link2, Unlink2, ZoomIn, ZoomOut, RotateCw, RotateCcw, Crop, ImageIcon, Type, Bold, Italic, Underline, Strikethrough, List, ListOrdered, ListUnordered, AlignLeft, AlignCenter, AlignRight, AlignJustify, Indent, Outdent, Code2, Quote, Blockquote, Table2, Columns, Rows, MergeCells, SplitCells, InsertRowAbove, InsertRowBelow, InsertColumnLeft, InsertColumnRight, DeleteRow, DeleteColumn, FormatPaint, ClearFormatting, SelectAll, Deselect, Cut, ClipboardCopy, ClipboardPaste, ClipboardCheck, ClipboardX, ClipboardList as ClipboardListIcon, CheckCheck as CheckCheckIcon, UserRound as UserRoundIcon, GraduationCap as GraduationCapIcon, Book as BookIcon, Briefcase as BriefcaseIcon, Lightbulb as LightbulbIcon, ShieldCheck as ShieldCheckIcon, Heart as HeartIcon, Award as AwardIcon, Flag as FlagIcon, TrendingUp as TrendingUpIcon, Globe2 as Globe2Icon, Cloud as CloudIcon, Server as ServerIcon, Database as DatabaseIcon, Code as CodeIcon, Terminal as TerminalIcon, Puzzle as PuzzleIcon, Layers as LayersIcon, GitBranch as GitBranchIcon, Share2 as Share2Icon, Archive as ArchiveIcon, Download as DownloadIcon, Upload as UploadIcon, RefreshCw as RefreshCwIcon, Search as SearchIcon, Filter as FilterIcon, Edit as EditIcon, Trash2 as Trash2Icon, Copy as CopyIcon, Move as MoveIcon, Link2 as Link2Icon, Unlink2 as Unlink2Icon, ZoomIn as ZoomInIcon, ZoomOut as ZoomOutIcon, RotateCw as RotateCwIcon, RotateCcw as RotateCcwIcon, Crop as CropIcon, ImageIcon as ImageIconIcon, Type as TypeIcon, Bold as BoldIcon, Italic as ItalicIcon, Underline as UnderlineIcon, Strikethrough as StrikethroughIcon, List as ListIcon, ListOrdered as ListOrderedIcon, ListUnordered as ListUnorderedIcon, AlignLeft as AlignLeftIcon, AlignCenter as AlignCenterIcon, AlignRight as AlignRightIcon, AlignJustify as AlignJustifyIcon, Indent as IndentIcon, Outdent as OutdentIcon, Code2 as Code2Icon, Quote as QuoteIcon, Blockquote as BlockquoteIcon, Table2 as Table2Icon, Columns as ColumnsIcon, Rows as RowsIcon, MergeCells as MergeCellsIcon, SplitCells as SplitCellsIcon, InsertRowAbove as InsertRowAboveIcon, InsertRowBelow as InsertRowBelowIcon, InsertColumnLeft as InsertColumnLeftIcon, InsertColumnRight as InsertColumnRightIcon, DeleteRow as DeleteRowIcon, DeleteColumn as DeleteColumnIcon, FormatPaint as FormatPaintIcon, ClearFormatting as ClearFormattingIcon, SelectAll as SelectAllIcon, Deselect as DeselectIcon, Cut as CutIcon, ClipboardCopy as ClipboardCopyIcon, ClipboardPaste as ClipboardPasteIcon, ClipboardCheck as ClipboardCheckIcon, ClipboardX as ClipboardXIcon } from "lucide-react"

import { Icons } from "@/components/icons"

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
  {
    title: "Settings",
    href: "/brand/settings",
    icon: Settings,
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
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Brands",
    href: "/admin/brands",
    icon: Building,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

