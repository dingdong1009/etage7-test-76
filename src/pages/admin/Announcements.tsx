
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { 
  Bell, 
  Calendar, 
  Megaphone, 
  Store, 
  Users, 
  Wrench,
  RefreshCw, 
  Trash,
  Mail,
  PenTool,
  Eye,
  Send,
  ChevronDown,
  User,
  Building,
  BookOpen,
  CalendarDays,
  CheckCircle
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { toast } from "sonner";
import RichTextEditor from "./components/RichTextEditor";

type AnnouncementType = "general" | "brand" | "newsletter" | "maintenance" | "update";

interface AnnouncementFormData {
  title: string;
  content: string;
  audience: string;
  duration: string;
  isUrgent: boolean;
  isScheduled: boolean;
  scheduledDate?: string;
}

interface Announcement {
  id: number;
  title?: string;
  content: string; 
  date: string;
  audience: string;
  type: AnnouncementType;
  urgent?: boolean;
}

const AdminAnnouncements = () => {
  const [selectedType, setSelectedType] = useState<AnnouncementType>("general");
  const [showSchedule, setShowSchedule] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  
  const form = useForm<AnnouncementFormData>({
    defaultValues: {
      title: "",
      content: "",
      audience: "all",
      duration: "7",
      isUrgent: false,
      isScheduled: false,
      scheduledDate: "",
    }
  });

  const pastAnnouncements: Announcement[] = [
    { 
      id: 1, 
      title: "Platform Update",
      content: "New features launched for brand profiles!", 
      date: "2023-12-15", 
      audience: "All Users",
      type: "update",
      urgent: false
    },
    { 
      id: 2, 
      title: "Scheduled Maintenance",
      content: "Maintenance scheduled for next weekend.", 
      date: "2023-11-30", 
      audience: "Admin Only",
      type: "maintenance",
      urgent: true
    },
    { 
      id: 3, 
      title: "New Brand Onboarding",
      content: "Welcome CHANEL to our platform! Top luxury brand now available.", 
      date: "2023-10-20", 
      audience: "All Users",
      type: "brand",
      urgent: false
    },
    { 
      id: 4, 
      title: "January Fashion Trends",
      content: "January 2024 Fashion Trends Newsletter - Explore the latest collections!", 
      date: "2024-01-05", 
      audience: "All Users",
      type: "newsletter",
      urgent: false
    },
  ];

  const audienceOptions = [
    { label: "All Users", value: "all" },
    { label: "Brands Only", value: "brands" },
    { label: "Buyers Only", value: "buyers" },
    { label: "Admin Only", value: "admin" }
  ];
  
  const durationOptions = [
    { label: "1 Day", value: "1" },
    { label: "7 Days", value: "7" },
    { label: "14 Days", value: "14" },
    { label: "30 Days", value: "30" },
    { label: "Permanent", value: "permanent" }
  ];
  
  const getAnnouncementIcon = (type: AnnouncementType, className = "h-5 w-5") => {
    switch(type) {
      case "brand":
        return <Store className={`${className} text-blue-600`} />;
      case "newsletter":
        return <Mail className={`${className} text-purple-600`} />;
      case "maintenance":
        return <Wrench className={`${className} text-orange-600`} />;
      case "update":
        return <Bell className={`${className} text-green-600`} />;
      default:
        return <Megaphone className={`${className} text-gray-600`} />;
    }
  };

  const getAnnouncementTypeColor = (type: AnnouncementType) => {
    switch(type) {
      case "brand": return "bg-blue-50 text-blue-700 border-blue-200";
      case "newsletter": return "bg-purple-50 text-purple-700 border-purple-200";
      case "maintenance": return "bg-orange-50 text-orange-700 border-orange-200";
      case "update": return "bg-green-50 text-green-700 border-green-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getAnnouncementTemplate = () => {
    switch(selectedType) {
      case "brand":
        return "We're excited to announce that [Brand Name] has joined the ETAGE7 platform! \n\nExplore their collection now at etage7.com/brands/[brand-name]";
      case "newsletter":
        return "ETAGE7 Monthly Newsletter - [Month] [Year]\n\nKey Highlights:\n- [Highlight 1]\n- [Highlight 2]\n- [Highlight 3]\n\nRead more on our blog at etage7.com/blog";
      case "maintenance":
        return "Scheduled maintenance: ETAGE7 platform will be unavailable on [Date] from [Time] to [Time] UTC. \n\nWe apologize for any inconvenience.";
      case "update":
        return "We've updated our platform with new features!\n\n- [Feature 1]\n- [Feature 2]\n- [Feature 3]\n\nLogin to explore the changes.";
      default:
        return "";
    }
  };

  const handleTypeChange = (type: AnnouncementType) => {
    setSelectedType(type);
    const template = getAnnouncementTemplate();
    form.setValue("content", template);
    
    // Set appropriate title based on type
    switch(type) {
      case "brand":
        form.setValue("title", "New Brand Available");
        break;
      case "newsletter":
        form.setValue("title", `ETAGE7 ${format(new Date(), 'MMMM yyyy')} Newsletter`);
        break;
      case "maintenance":
        form.setValue("title", "Scheduled Platform Maintenance");
        break;
      case "update":
        form.setValue("title", "Platform Update - New Features");
        break;
      default:
        form.setValue("title", "");
        break;
    }
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    // Mock image upload - in a real app, you would upload to a server
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTimeout(() => {
          // Simulate server delay
          resolve(reader.result as string);
        }, 500);
      };
      reader.readAsDataURL(file);
    });
  };

  const onSubmit = (data: AnnouncementFormData) => {
    const actionText = data.isScheduled ? "scheduled" : "sent";
    const timeInfo = data.isScheduled ? 
      ` for ${data.scheduledDate}` : 
      "";
      
    toast.success(`Announcement ${actionText}${timeInfo}!`, {
      description: `"${data.title}" will be delivered to ${audienceOptions.find(o => o.value === data.audience)?.label}`
    });

    // Reset form after submission
    form.reset({
      title: "",
      content: "",
      audience: "all",
      duration: "7",
      isUrgent: false,
      isScheduled: false,
      scheduledDate: "",
    });
    setPreviewMode(false);
    setShowSchedule(false);
  };

  const resendAnnouncement = (announcement: Announcement) => {
    toast.success("Announcement queued for resending", {
      description: `"${announcement.title}" will be resent to ${announcement.audience}`
    });
  };

  const deleteAnnouncement = (announcement: Announcement) => {
    toast.success("Announcement deleted", {
      description: `"${announcement.title}" has been removed from the history`
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl md:text-5xl uppercase font-thin">Announcements</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2" onClick={() => setPreviewMode(!previewMode)}>
            {previewMode ? <PenTool size={16} /> : <Eye size={16} />}
            {previewMode ? "Edit Mode" : "Preview Mode"}
          </Button>
        </div>
      </div>
      
      <Card className="border border-gray-200 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-white pb-2">
          <CardTitle className="text-xl flex items-center gap-2">
            <Megaphone className="h-5 w-5" />
            Create New Announcement
          </CardTitle>
          <CardDescription>
            Craft and send announcements to your platform users
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Announcement Type Selector */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-600">Announcement Type</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  <Button
                    type="button"
                    variant={selectedType === "general" ? "default" : "outline"}
                    className={`gap-2 ${selectedType === "general" ? "bg-gray-900 text-white" : ""}`}
                    onClick={() => handleTypeChange("general")}
                  >
                    <Megaphone className="h-4 w-4" />
                    <span>General</span>
                  </Button>
                  <Button
                    type="button"
                    variant={selectedType === "brand" ? "default" : "outline"}
                    className={`gap-2 ${selectedType === "brand" ? "bg-blue-600 text-white" : ""}`}
                    onClick={() => handleTypeChange("brand")}
                  >
                    <Store className="h-4 w-4" />
                    <span>Brand</span>
                  </Button>
                  <Button
                    type="button"
                    variant={selectedType === "newsletter" ? "default" : "outline"}
                    className={`gap-2 ${selectedType === "newsletter" ? "bg-purple-600 text-white" : ""}`}
                    onClick={() => handleTypeChange("newsletter")}
                  >
                    <Mail className="h-4 w-4" />
                    <span>Newsletter</span>
                  </Button>
                  <Button
                    type="button"
                    variant={selectedType === "maintenance" ? "default" : "outline"}
                    className={`gap-2 ${selectedType === "maintenance" ? "bg-orange-600 text-white" : ""}`}
                    onClick={() => handleTypeChange("maintenance")}
                  >
                    <Wrench className="h-4 w-4" />
                    <span>Maintenance</span>
                  </Button>
                  <Button
                    type="button"
                    variant={selectedType === "update" ? "default" : "outline"}
                    className={`gap-2 ${selectedType === "update" ? "bg-green-600 text-white" : ""}`}
                    onClick={() => handleTypeChange("update")}
                  >
                    <Bell className="h-4 w-4" />
                    <span>Update</span>
                  </Button>
                </div>
              </div>

              {previewMode ? (
                <div className="p-6 border rounded-md">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getAnnouncementIcon(selectedType)}
                      <h3 className="font-semibold">{form.watch("title")}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">{format(new Date(), 'PPP')}</span>
                      {form.watch("isUrgent") && (
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">Urgent</span>
                      )}
                    </div>
                  </div>
                  <div className="announcement-content" dangerouslySetInnerHTML={{ __html: form.watch("content") }}></div>
                  <div className="mt-4 text-xs text-gray-500">
                    Visible to: {audienceOptions.find(o => o.value === form.watch("audience"))?.label || "All Users"}
                  </div>
                </div>
              ) : (
                <>
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter announcement title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content</FormLabel>
                        <FormControl>
                          <RichTextEditor
                            value={field.value}
                            onChange={field.onChange}
                            onImageUpload={handleImageUpload}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="audience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Audience</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select audience" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {audienceOptions.map(option => (
                                <SelectItem key={option.value} value={option.value}>
                                  <div className="flex items-center gap-2">
                                    {option.value === "all" ? <Users size={14} /> : 
                                     option.value === "brands" ? <Building size={14} /> :
                                     option.value === "buyers" ? <User size={14} /> :
                                     <User size={14} />}
                                    {option.label}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Duration</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select duration" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {durationOptions.map(option => (
                                <SelectItem key={option.value} value={option.value}>
                                  <div className="flex items-center gap-2">
                                    {option.value === "permanent" ? <CheckCircle size={14} /> : <CalendarDays size={14} />}
                                    {option.label}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="isUrgent"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                          <div className="space-y-0.5">
                            <FormLabel>Mark as Urgent</FormLabel>
                            <div className="text-sm text-muted-foreground">
                              Will be highlighted for users
                            </div>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="isScheduled"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                          <div className="space-y-0.5">
                            <FormLabel>Schedule for Later</FormLabel>
                            <div className="text-sm text-muted-foreground">
                              Select date and time
                            </div>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={(value) => {
                                field.onChange(value);
                                setShowSchedule(value);
                              }}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {showSchedule && (
                    <FormField
                      control={form.control}
                      name="scheduledDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Schedule Date & Time</FormLabel>
                          <FormControl>
                            <Input 
                              type="datetime-local" 
                              {...field} 
                              min={format(new Date(), "yyyy-MM-dd'T'HH:mm")}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </>
              )}

              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  className={`gap-2 ${
                    selectedType === "brand" ? "bg-blue-600" :
                    selectedType === "newsletter" ? "bg-purple-600" : 
                    selectedType === "maintenance" ? "bg-orange-600" :
                    selectedType === "update" ? "bg-green-600" : 
                    "bg-gray-900"
                  }`}
                >
                  <Send className="h-4 w-4" />
                  {form.watch("isScheduled") ? "Schedule" : "Send Now"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <Card className="border border-gray-200 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-white pb-2">
          <CardTitle className="text-xl flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Announcement History
          </CardTitle>
          <CardDescription>
            Past announcements sent to your platform users
          </CardDescription>
        </CardHeader>
        
        <Tabs defaultValue="all" className="w-full">
          <div className="px-6 pt-2 border-b">
            <TabsList className="grid grid-cols-5">
              <TabsTrigger value="all" className="flex items-center gap-1">
                <Megaphone className="h-4 w-4" />
                <span className="hidden md:inline">All</span>
              </TabsTrigger>
              <TabsTrigger value="brands" className="flex items-center gap-1">
                <Store className="h-4 w-4" />
                <span className="hidden md:inline">Brands</span>
              </TabsTrigger>
              <TabsTrigger value="newsletters" className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                <span className="hidden md:inline">Newsletters</span>
              </TabsTrigger>
              <TabsTrigger value="maintenance" className="flex items-center gap-1">
                <Wrench className="h-4 w-4" />
                <span className="hidden md:inline">Maintenance</span>
              </TabsTrigger>
              <TabsTrigger value="updates" className="flex items-center gap-1">
                <Bell className="h-4 w-4" />
                <span className="hidden md:inline">Updates</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="w-12"></TableHead>
                  <TableHead className="font-medium w-1/3">Title / Content</TableHead>
                  <TableHead className="font-medium">Date</TableHead>
                  <TableHead className="font-medium">Audience</TableHead>
                  <TableHead className="font-medium text-right w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pastAnnouncements.map((announcement) => (
                  <TableRow key={announcement.id} className="border-t border-gray-200">
                    <TableCell className="pl-4">
                      {getAnnouncementIcon(announcement.type, "h-5 w-5")}
                    </TableCell>
                    <TableCell className="max-w-md">
                      <div className="font-medium">{announcement.title}</div>
                      <div className="text-sm text-gray-500 truncate">{announcement.content}</div>
                      {announcement.urgent && (
                        <span className="inline-block mt-1 text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
                          Urgent
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-gray-500" />
                        {announcement.date}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        announcement.audience === "All Users" 
                          ? "bg-green-50 text-green-700" 
                          : "bg-blue-50 text-blue-700"
                      }`}>
                        {announcement.audience}
                      </span>
                    </TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        title="Resend"
                        onClick={() => resendAnnouncement(announcement)}
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        title="Delete"
                        onClick={() => deleteAnnouncement(announcement)}
                      >
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="brands">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="w-12"></TableHead>
                  <TableHead className="font-medium w-1/3">Title / Content</TableHead>
                  <TableHead className="font-medium">Date</TableHead>
                  <TableHead className="font-medium">Audience</TableHead>
                  <TableHead className="font-medium text-right w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pastAnnouncements
                  .filter(a => a.type === "brand")
                  .map((announcement) => (
                    <TableRow key={announcement.id} className="border-t border-gray-200">
                      <TableCell className="pl-4">
                        {getAnnouncementIcon(announcement.type, "h-5 w-5")}
                      </TableCell>
                      <TableCell className="max-w-md">
                        <div className="font-medium">{announcement.title}</div>
                        <div className="text-sm text-gray-500 truncate">{announcement.content}</div>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-gray-500" />
                          {announcement.date}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          announcement.audience === "All Users" 
                            ? "bg-green-50 text-green-700" 
                            : "bg-blue-50 text-blue-700"
                        }`}>
                          {announcement.audience}
                        </span>
                      </TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          title="Resend"
                          onClick={() => resendAnnouncement(announcement)}
                        >
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          title="Delete"
                          onClick={() => deleteAnnouncement(announcement)}
                        >
                          <Trash className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="newsletters">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="w-12"></TableHead>
                  <TableHead className="font-medium w-1/3">Title / Content</TableHead>
                  <TableHead className="font-medium">Date</TableHead>
                  <TableHead className="font-medium">Audience</TableHead>
                  <TableHead className="font-medium text-right w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pastAnnouncements
                  .filter(a => a.type === "newsletter")
                  .map((announcement) => (
                    <TableRow key={announcement.id} className="border-t border-gray-200">
                      <TableCell className="pl-4">
                        {getAnnouncementIcon(announcement.type, "h-5 w-5")}
                      </TableCell>
                      <TableCell className="max-w-md">
                        <div className="font-medium">{announcement.title}</div>
                        <div className="text-sm text-gray-500 truncate">{announcement.content}</div>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-gray-500" />
                          {announcement.date}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          announcement.audience === "All Users" 
                            ? "bg-green-50 text-green-700" 
                            : "bg-blue-50 text-blue-700"
                        }`}>
                          {announcement.audience}
                        </span>
                      </TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          title="Resend"
                          onClick={() => resendAnnouncement(announcement)}
                        >
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          title="Delete"
                          onClick={() => deleteAnnouncement(announcement)}
                        >
                          <Trash className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="maintenance">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="w-12"></TableHead>
                  <TableHead className="font-medium w-1/3">Title / Content</TableHead>
                  <TableHead className="font-medium">Date</TableHead>
                  <TableHead className="font-medium">Audience</TableHead>
                  <TableHead className="font-medium text-right w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pastAnnouncements
                  .filter(a => a.type === "maintenance")
                  .map((announcement) => (
                    <TableRow key={announcement.id} className="border-t border-gray-200">
                      <TableCell className="pl-4">
                        {getAnnouncementIcon(announcement.type, "h-5 w-5")}
                      </TableCell>
                      <TableCell className="max-w-md">
                        <div className="font-medium">{announcement.title}</div>
                        <div className="text-sm text-gray-500 truncate">{announcement.content}</div>
                        {announcement.urgent && (
                          <span className="inline-block mt-1 text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
                            Urgent
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-gray-500" />
                          {announcement.date}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          announcement.audience === "All Users" 
                            ? "bg-green-50 text-green-700" 
                            : "bg-blue-50 text-blue-700"
                        }`}>
                          {announcement.audience}
                        </span>
                      </TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          title="Resend"
                          onClick={() => resendAnnouncement(announcement)}
                        >
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          title="Delete"
                          onClick={() => deleteAnnouncement(announcement)}
                        >
                          <Trash className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="updates">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="w-12"></TableHead>
                  <TableHead className="font-medium w-1/3">Title / Content</TableHead>
                  <TableHead className="font-medium">Date</TableHead>
                  <TableHead className="font-medium">Audience</TableHead>
                  <TableHead className="font-medium text-right w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pastAnnouncements
                  .filter(a => a.type === "update")
                  .map((announcement) => (
                    <TableRow key={announcement.id} className="border-t border-gray-200">
                      <TableCell className="pl-4">
                        {getAnnouncementIcon(announcement.type, "h-5 w-5")}
                      </TableCell>
                      <TableCell className="max-w-md">
                        <div className="font-medium">{announcement.title}</div>
                        <div className="text-sm text-gray-500 truncate">{announcement.content}</div>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-gray-500" />
                          {announcement.date}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          announcement.audience === "All Users" 
                            ? "bg-green-50 text-green-700" 
                            : "bg-blue-50 text-blue-700"
                        }`}>
                          {announcement.audience}
                        </span>
                      </TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          title="Resend"
                          onClick={() => resendAnnouncement(announcement)}
                        >
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          title="Delete"
                          onClick={() => deleteAnnouncement(announcement)}
                        >
                          <Trash className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default AdminAnnouncements;
