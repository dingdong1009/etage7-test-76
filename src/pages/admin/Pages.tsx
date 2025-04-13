
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2, Search, PlusCircle, Calendar, MapPin, Clock, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import EventsManagement from "./components/EventsManagement";
import CuratedStoriesManagement from "./components/CuratedStoriesManagement";

// Mock data for demonstration purposes
const events = [
  {
    id: 1,
    title: "Fashion Week Paris",
    status: "active",
    location: "Paris, France",
    date: "2023-10-01",
    description: "Annual fashion showcase featuring top designers",
    lastUpdated: "2023-09-15"
  },
  {
    id: 2,
    title: "Designer Showcase",
    status: "active",
    location: "New York, USA",
    date: "2023-11-12",
    description: "Exclusive preview of upcoming collections",
    lastUpdated: "2023-09-20"
  },
  {
    id: 3,
    title: "Sustainable Fashion Summit",
    status: "pending",
    location: "Milan, Italy",
    date: "2024-01-15",
    description: "Conference on sustainable practices in fashion",
    lastUpdated: "2023-09-18"
  },
  {
    id: 4,
    title: "Summer Collection Launch",
    status: "inactive",
    location: "London, UK",
    date: "2024-04-05",
    description: "Launch event for summer collection",
    lastUpdated: "2023-09-10"
  },
  {
    id: 5,
    title: "Industry Networking Night",
    status: "active",
    location: "Tokyo, Japan",
    date: "2023-12-08",
    description: "Networking event for fashion professionals",
    lastUpdated: "2023-09-25"
  }
];

const curatedStories = [
  {
    id: 1,
    title: "The Evolution of Sustainable Fashion",
    status: "active",
    creationDate: "2023-09-10",
    author: "Jane Smith",
    category: "Sustainability",
    lastUpdated: "2023-09-15"
  },
  {
    id: 2,
    title: "Emerging Designers to Watch",
    status: "active",
    creationDate: "2023-09-12",
    author: "Michael Chen",
    category: "Industry Trends",
    lastUpdated: "2023-09-20"
  },
  {
    id: 3,
    title: "Fashion Tech Revolution",
    status: "pending",
    creationDate: "2023-09-18",
    author: "Sarah Johnson",
    category: "Technology",
    lastUpdated: "2023-09-19"
  },
  {
    id: 4,
    title: "Historical Influence in Modern Design",
    status: "inactive",
    creationDate: "2023-08-30",
    author: "Robert Williams",
    category: "Design History",
    lastUpdated: "2023-09-05"
  },
  {
    id: 5,
    title: "Artisanal Craftsmanship in Luxury Brands",
    status: "active",
    creationDate: "2023-09-05",
    author: "Elena Rodriguez",
    category: "Craftsmanship",
    lastUpdated: "2023-09-22"
  }
];

const AdminPages = () => {
  const [activeTab, setActiveTab] = useState("events-list");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("list");
  
  // Available brands (in a real app, this would come from the database)
  const availableBrands = ["Brand One", "Brand Two", "Brand Three", "Brand Four", "Brand Five"];
  
  // Filter events based on search query and status
  const filteredEvents = events
    .filter(event => statusFilter === "all" || event.status === statusFilter)
    .filter(event => 
      searchQuery === "" || 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
  // Filter curated stories based on search query and status
  const filteredStories = curatedStories
    .filter(story => statusFilter === "all" || story.status === statusFilter)
    .filter(story => 
      searchQuery === "" || 
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
  const handleViewItem = (type, id) => {
    console.log(`View ${type} with ID: ${id}`);
    // Implementation for viewing items would go here
  };

  const handleEditItem = (type, id) => {
    console.log(`Edit ${type} with ID: ${id}`);
    // Implementation for editing items would go here
  };

  const handleDeleteItem = (type, id) => {
    console.log(`Delete ${type} with ID: ${id}`);
    // Implementation for deleting items would go here
  };

  const handleAddNewPage = () => {
    console.log("Add new page");
    // Implementation for adding a new page would go here
  };
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tighter uppercase mb-6">
          PAGE MANAGEMENT
        </h1>
        
        <div className="flex flex-wrap gap-4 mt-4 lg:mt-0">
          <Button 
            className="bg-black text-white border-none hover:bg-gray-800 text-xs font-light"
            onClick={handleAddNewPage}
          >
            <PlusCircle className="w-4 h-4 mr-2" strokeWidth={1} />
            Add New Page
          </Button>
          <Button variant="outline" className="border-gray-200 hover:bg-gray-100 text-xs font-light">
            <FileText className="w-4 h-4 mr-2" strokeWidth={1} />
            View All Pages
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="events-list" className="w-full" onValueChange={(value) => setActiveTab(value)}>
        <div className="border-t border-gray-200 mb-6">
          <TabsList className="border-b border-gray-200 w-full flex justify-start overflow-x-auto pb-0 mb-6 bg-transparent">
            <TabsTrigger 
              value="events-list" 
              className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2 data-[state=active]:shadow-none"
            >
              Events List
            </TabsTrigger>
            <TabsTrigger 
              value="stories-list" 
              className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2 data-[state=active]:shadow-none"
            >
              Curated Stories List
            </TabsTrigger>
            <TabsTrigger 
              value="create-content"
              className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2 data-[state=active]:shadow-none"
            >
              Create Content
            </TabsTrigger>
            <TabsTrigger 
              value="new-page"
              className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2 data-[state=active]:shadow-none"
            >
              Advanced Page Editor
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="events-list">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search events..."
                  className="pl-9 bg-white border-gray-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-3">
                <Select
                  value={statusFilter}
                  onValueChange={(value) => setStatusFilter(value)}
                >
                  <SelectTrigger className="w-[150px] border-gray-200 bg-white text-sm">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  className="bg-black hover:bg-gray-800 text-white text-sm"
                  onClick={() => setActiveTab("create-content")}
                >
                  <PlusCircle className="mr-1 h-4 w-4" /> Add Event
                </Button>
              </div>
            </div>
            
            <Card className="border border-gray-200 shadow-none rounded-lg">
              <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
                <CardTitle className="text-lg font-medium text-gray-900">
                  Events ({filteredEvents.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent bg-gray-50">
                        <TableHead className="w-[80px] font-medium text-gray-600 text-sm">ID</TableHead>
                        <TableHead className="font-medium text-gray-600 text-sm">Title</TableHead>
                        <TableHead className="font-medium text-gray-600 text-sm">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" strokeWidth={1.5} /> Location
                          </div>
                        </TableHead>
                        <TableHead className="font-medium text-gray-600 text-sm">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" strokeWidth={1.5} /> Date
                          </div>
                        </TableHead>
                        <TableHead className="font-medium text-gray-600 text-sm">Status</TableHead>
                        <TableHead className="font-medium text-gray-600 text-sm">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" strokeWidth={1.5} /> Last Updated
                          </div>
                        </TableHead>
                        <TableHead className="text-right font-medium text-gray-600 text-sm">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredEvents.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-10 text-gray-500">
                            No events found with the current filters
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredEvents.map((event) => (
                          <TableRow key={event.id} className="border-t border-gray-100 hover:bg-gray-50/50">
                            <TableCell className="font-medium">{event.id}</TableCell>
                            <TableCell>{event.title}</TableCell>
                            <TableCell>{event.location}</TableCell>
                            <TableCell>{event.date}</TableCell>
                            <TableCell>
                              <Badge 
                                variant="outline"
                                className={`
                                  ${event.status === "active" ? "bg-accent-mint text-gray-800 border-accent-mint" :
                                    event.status === "pending" ? "bg-accent-yellow text-gray-800 border-accent-yellow" :
                                    "bg-gray-100 text-gray-700 border-gray-200"}
                                  text-xs font-medium px-2 py-0.5
                                `}
                              >
                                {event.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{event.lastUpdated}</TableCell>
                            <TableCell className="flex justify-end space-x-2">
                              <Button 
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 p-0 hover:bg-gray-100"
                                onClick={() => handleViewItem("event", event.id)}
                                title="View"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 p-0 hover:bg-gray-100"
                                onClick={() => handleEditItem("event", event.id)}
                                title="Edit"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 p-0 hover:bg-gray-100"
                                onClick={() => handleDeleteItem("event", event.id)}
                                title="Delete"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="stories-list">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search stories..."
                  className="pl-9 bg-white border-gray-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-3">
                <Select
                  value={statusFilter}
                  onValueChange={(value) => setStatusFilter(value)}
                >
                  <SelectTrigger className="w-[150px] border-gray-200 bg-white text-sm">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  className="bg-black hover:bg-gray-800 text-white text-sm"
                  onClick={() => setActiveTab("create-content")}
                >
                  <PlusCircle className="mr-1 h-4 w-4" /> Add Story
                </Button>
              </div>
            </div>
            
            <Card className="border border-gray-200 shadow-none rounded-lg">
              <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
                <CardTitle className="text-lg font-medium text-gray-900">
                  Curated Stories ({filteredStories.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent bg-gray-50">
                        <TableHead className="w-[80px] font-medium text-gray-600 text-sm">ID</TableHead>
                        <TableHead className="font-medium text-gray-600 text-sm">Title</TableHead>
                        <TableHead className="font-medium text-gray-600 text-sm">Author</TableHead>
                        <TableHead className="font-medium text-gray-600 text-sm">Category</TableHead>
                        <TableHead className="font-medium text-gray-600 text-sm">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" strokeWidth={1.5} /> Creation Date
                          </div>
                        </TableHead>
                        <TableHead className="font-medium text-gray-600 text-sm">Status</TableHead>
                        <TableHead className="text-right font-medium text-gray-600 text-sm">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStories.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-10 text-gray-500">
                            No stories found with the current filters
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredStories.map((story) => (
                          <TableRow key={story.id} className="border-t border-gray-100 hover:bg-gray-50/50">
                            <TableCell className="font-medium">{story.id}</TableCell>
                            <TableCell>{story.title}</TableCell>
                            <TableCell>{story.author}</TableCell>
                            <TableCell>{story.category}</TableCell>
                            <TableCell>{story.creationDate}</TableCell>
                            <TableCell>
                              <Badge 
                                variant="outline"
                                className={`
                                  ${story.status === "active" ? "bg-accent-mint text-gray-800 border-accent-mint" :
                                    story.status === "pending" ? "bg-accent-yellow text-gray-800 border-accent-yellow" :
                                    "bg-gray-100 text-gray-700 border-gray-200"}
                                  text-xs font-medium px-2 py-0.5
                                `}
                              >
                                {story.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="flex justify-end space-x-2">
                              <Button 
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 p-0 hover:bg-gray-100"
                                onClick={() => handleViewItem("story", story.id)}
                                title="View"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 p-0 hover:bg-gray-100"
                                onClick={() => handleEditItem("story", story.id)}
                                title="Edit"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 p-0 hover:bg-gray-100"
                                onClick={() => handleDeleteItem("story", story.id)}
                                title="Delete"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="create-content">
          <Card className="border border-gray-200 shadow-none rounded-none">
            <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
              <CardTitle className="text-base font-light text-gray-900">
                Create New Content
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <Tabs defaultValue="event" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="event" className="text-sm">Create Event</TabsTrigger>
                  <TabsTrigger value="story" className="text-sm">Create Curated Story</TabsTrigger>
                </TabsList>
                
                <TabsContent value="event" className="space-y-6">
                  <EventsManagement availableBrands={availableBrands} />
                </TabsContent>
                
                <TabsContent value="story" className="space-y-6">
                  <CuratedStoriesManagement availableBrands={availableBrands} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="new-page">
          <Card className="border border-gray-200 shadow-none rounded-none">
            <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
              <CardTitle className="text-base font-light text-gray-900">
                Advanced Page Editor
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-center py-10">
                <h3 className="text-xl font-light mb-4">Advanced Page Editor</h3>
                <p className="text-gray-500 mb-6">Create and design new pages with a rich set of tools and customization options</p>
                <Button className="bg-black hover:bg-gray-800 text-white">
                  Launch Page Editor
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-8 text-center">
        <h3 className="text-xl font-light mb-4">Need help managing your pages?</h3>
        <p className="mb-6 max-w-2xl mx-auto text-gray-600 text-sm font-light">
          Our comprehensive guides and tutorials will help you optimize your page management strategy.
        </p>
        <Button variant="outline" className="border-black text-black hover:bg-gray-100 text-xs font-light">
          View Page Management Guides
        </Button>
      </div>
    </div>
  );
};

export default AdminPages;
