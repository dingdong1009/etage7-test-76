
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Bell, 
  Calendar, 
  Megaphone, 
  Store, 
  Users, 
  Wrench,
  RefreshCw, 
  Trash,
  Mail
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminAnnouncements = () => {
  const [selectedType, setSelectedType] = useState("general");
  
  const pastAnnouncements = [
    { 
      id: 1, 
      content: "New features launched for brand profiles!", 
      date: "2023-12-15", 
      audience: "All Users",
      type: "update" 
    },
    { 
      id: 2, 
      content: "Maintenance scheduled for next weekend.", 
      date: "2023-11-30", 
      audience: "Admin Only",
      type: "maintenance" 
    },
    { 
      id: 3, 
      content: "Welcome CHANEL to our platform! Top luxury brand now available.", 
      date: "2023-10-20", 
      audience: "All Users",
      type: "brand" 
    },
    { 
      id: 4, 
      content: "January 2024 Fashion Trends Newsletter - Explore the latest collections!", 
      date: "2024-01-05", 
      audience: "All Users",
      type: "newsletter" 
    },
  ];
  
  const getAnnouncementIcon = (type) => {
    switch(type) {
      case "brand":
        return <Store className="h-4 w-4 text-blue-600" />;
      case "newsletter":
        return <Mail className="h-4 w-4 text-purple-600" />;
      case "maintenance":
        return <Wrench className="h-4 w-4 text-orange-600" />;
      case "update":
        return <Bell className="h-4 w-4 text-green-600" />;
      default:
        return <Megaphone className="h-4 w-4 text-gray-600" />;
    }
  };

  const getAnnouncementTemplate = () => {
    switch(selectedType) {
      case "brand":
        return "We're excited to announce that [Brand Name] has joined the ETAGE7 platform! Explore their collection now.";
      case "newsletter":
        return "ETAGE7 Monthly Newsletter - [Month] [Year]\n\nKey Highlights:\n- [Highlight 1]\n- [Highlight 2]\n- [Highlight 3]\n\nRead more on our blog.";
      case "maintenance":
        return "Scheduled maintenance: ETAGE7 platform will be unavailable on [Date] from [Time] to [Time] UTC. We apologize for any inconvenience.";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-4xl md:text-6xl uppercase font-thin mb-6">Announcements</h1>
      
      <Card className="p-6 border border-gray-200">
        <h2 className="text-lg font-medium mb-4">Create New Announcement</h2>
        
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <Button
              variant={selectedType === "general" ? "default" : "outline"}
              className={selectedType === "general" ? "bg-black text-white" : ""}
              onClick={() => setSelectedType("general")}
            >
              <Megaphone className="mr-2 h-4 w-4" />
              General
            </Button>
            <Button
              variant={selectedType === "brand" ? "default" : "outline"}
              className={selectedType === "brand" ? "bg-blue-600 text-white" : ""}
              onClick={() => setSelectedType("brand")}
            >
              <Store className="mr-2 h-4 w-4" />
              New Brand
            </Button>
            <Button
              variant={selectedType === "newsletter" ? "default" : "outline"}
              className={selectedType === "newsletter" ? "bg-purple-600 text-white" : ""}
              onClick={() => setSelectedType("newsletter")}
            >
              <Mail className="mr-2 h-4 w-4" />
              Newsletter
            </Button>
            <Button
              variant={selectedType === "maintenance" ? "default" : "outline"}
              className={selectedType === "maintenance" ? "bg-orange-600 text-white" : ""}
              onClick={() => setSelectedType("maintenance")}
            >
              <Wrench className="mr-2 h-4 w-4" />
              Maintenance
            </Button>
          </div>
          
          {selectedType !== "general" && (
            <div>
              <label className="block text-sm font-medium mb-1">
                Title
              </label>
              <Input 
                placeholder="Enter announcement title"
                className="border-gray-300 rounded-none"
              />
            </div>
          )}
          
          <div>
            <label htmlFor="announcementContent" className="block text-sm font-medium mb-1">
              Announcement Content
            </label>
            <Textarea
              id="announcementContent"
              placeholder="Enter your announcement here"
              className="h-32 border-gray-300 rounded-none"
              defaultValue={getAnnouncementTemplate()}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="audience" className="block text-sm font-medium mb-1">
                Audience
              </label>
              <Select defaultValue="all">
                <SelectTrigger className="border-gray-300 rounded-none">
                  <SelectValue placeholder="Select audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="brands">Brands Only</SelectItem>
                  <SelectItem value="buyers">Buyers Only</SelectItem>
                  <SelectItem value="admin">Admin Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label htmlFor="duration" className="block text-sm font-medium mb-1">
                Duration
              </label>
              <Select defaultValue="7">
                <SelectTrigger className="border-gray-300 rounded-none">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Day</SelectItem>
                  <SelectItem value="7">7 Days</SelectItem>
                  <SelectItem value="14">14 Days</SelectItem>
                  <SelectItem value="30">30 Days</SelectItem>
                  <SelectItem value="permanent">Permanent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Switch id="urgentSwitch" />
              <Label htmlFor="urgentSwitch">Mark as Urgent</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch id="scheduleSwitch" />
              <Label htmlFor="scheduleSwitch">Schedule for Later</Label>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button className="bg-black text-white border-none hover:underline">
              {selectedType === "newsletter" ? "Send Newsletter" : "Send Announcement"}
            </Button>
          </div>
        </form>
      </Card>
      
      <Card className="border border-gray-200">
        <Tabs defaultValue="all" className="w-full">
          <div className="p-6 pb-0 flex justify-between items-center">
            <h2 className="text-lg font-medium">Past Announcements</h2>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="brands">Brands</TabsTrigger>
              <TabsTrigger value="newsletters">Newsletters</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-medium">Type</TableHead>
                  <TableHead className="font-medium">Content</TableHead>
                  <TableHead className="font-medium">Date</TableHead>
                  <TableHead className="font-medium">Audience</TableHead>
                  <TableHead className="font-medium text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pastAnnouncements.map((announcement) => (
                  <TableRow key={announcement.id} className="border-t border-gray-200">
                    <TableCell>
                      {getAnnouncementIcon(announcement.type)}
                    </TableCell>
                    <TableCell className="max-w-md truncate">{announcement.content}</TableCell>
                    <TableCell>{announcement.date}</TableCell>
                    <TableCell>{announcement.audience}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button 
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 p-0"
                        title="Resend"
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 p-0"
                        title="Delete"
                      >
                        <Trash className="h-4 w-4 text-red-600" />
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
                  <TableHead className="font-medium">Type</TableHead>
                  <TableHead className="font-medium">Content</TableHead>
                  <TableHead className="font-medium">Date</TableHead>
                  <TableHead className="font-medium">Audience</TableHead>
                  <TableHead className="font-medium text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pastAnnouncements.filter(a => a.type === "brand").map((announcement) => (
                  <TableRow key={announcement.id} className="border-t border-gray-200">
                    <TableCell>
                      {getAnnouncementIcon(announcement.type)}
                    </TableCell>
                    <TableCell className="max-w-md truncate">{announcement.content}</TableCell>
                    <TableCell>{announcement.date}</TableCell>
                    <TableCell>{announcement.audience}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button 
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 p-0"
                        title="Resend"
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 p-0"
                        title="Delete"
                      >
                        <Trash className="h-4 w-4 text-red-600" />
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
                  <TableHead className="font-medium">Type</TableHead>
                  <TableHead className="font-medium">Content</TableHead>
                  <TableHead className="font-medium">Date</TableHead>
                  <TableHead className="font-medium">Audience</TableHead>
                  <TableHead className="font-medium text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pastAnnouncements.filter(a => a.type === "newsletter").map((announcement) => (
                  <TableRow key={announcement.id} className="border-t border-gray-200">
                    <TableCell>
                      {getAnnouncementIcon(announcement.type)}
                    </TableCell>
                    <TableCell className="max-w-md truncate">{announcement.content}</TableCell>
                    <TableCell>{announcement.date}</TableCell>
                    <TableCell>{announcement.audience}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button 
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 p-0"
                        title="Resend"
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 p-0"
                        title="Delete"
                      >
                        <Trash className="h-4 w-4 text-red-600" />
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
                  <TableHead className="font-medium">Type</TableHead>
                  <TableHead className="font-medium">Content</TableHead>
                  <TableHead className="font-medium">Date</TableHead>
                  <TableHead className="font-medium">Audience</TableHead>
                  <TableHead className="font-medium text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pastAnnouncements.filter(a => a.type === "maintenance").map((announcement) => (
                  <TableRow key={announcement.id} className="border-t border-gray-200">
                    <TableCell>
                      {getAnnouncementIcon(announcement.type)}
                    </TableCell>
                    <TableCell className="max-w-md truncate">{announcement.content}</TableCell>
                    <TableCell>{announcement.date}</TableCell>
                    <TableCell>{announcement.audience}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button 
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 p-0"
                        title="Resend"
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 p-0"
                        title="Delete"
                      >
                        <Trash className="h-4 w-4 text-red-600" />
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
