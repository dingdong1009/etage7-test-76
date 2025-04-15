import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, FileText, ArrowRight, Eye, Edit, Trash2, Calendar, MapPin, CheckCircle, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import EventsManagement from "./components/EventsManagement";
import CuratedStoriesManagement from "./components/CuratedStoriesManagement";

// Sample data for events
const events = [{
  id: 1,
  title: "Spring Fashion Show 2025",
  status: "active",
  location: "New York",
  date: "2025-05-15",
  createdAt: "2025-01-10"
}, {
  id: 2,
  title: "Summer Collection Launch",
  status: "active",
  location: "Paris",
  date: "2025-06-20",
  createdAt: "2025-02-05"
}, {
  id: 3,
  title: "Designer Meetup",
  status: "inactive",
  location: "Milan",
  date: "2025-07-10",
  createdAt: "2025-03-15"
}, {
  id: 4,
  title: "Fashion Week Preview",
  status: "pending",
  location: "London",
  date: "2025-08-05",
  createdAt: "2025-04-01"
}];

// Sample data for curated stories
const curatedStories = [{
  id: 1,
  title: "The Evolution of Sustainable Fashion",
  status: "active",
  author: "Emma Johnson",
  createdAt: "2025-02-12",
  featured: true
}, {
  id: 2,
  title: "Designer Spotlight: The Next Generation",
  status: "active",
  author: "Michael Smith",
  createdAt: "2025-03-05",
  featured: false
}, {
  id: 3,
  title: "Trends to Watch in 2026",
  status: "pending",
  author: "Sophia Chen",
  createdAt: "2025-03-20",
  featured: true
}, {
  id: 4,
  title: "Fashion Tech: Innovations Changing the Industry",
  status: "inactive",
  author: "David Wilson",
  createdAt: "2025-04-02",
  featured: false
}];

const AdminPages = () => {
  // State management
  const [activeTab, setActiveTab] = useState("events");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [contentType, setContentType] = useState("event"); // For create tab: "event" or "story"

  // Filter functions
  const filteredEvents = events.filter(event => (statusFilter === "all" || event.status === statusFilter) && (searchQuery === "" || event.title.toLowerCase().includes(searchQuery.toLowerCase()) || event.location.toLowerCase().includes(searchQuery.toLowerCase())));
  const filteredStories = curatedStories.filter(story => (statusFilter === "all" || story.status === statusFilter) && (searchQuery === "" || story.title.toLowerCase().includes(searchQuery.toLowerCase()) || story.author.toLowerCase().includes(searchQuery.toLowerCase())));

  // Event handlers
  const handleViewItem = (type, id) => {
    console.log(`View ${type} with id: ${id}`);
  };
  const handleEditItem = (type, id) => {
    console.log(`Edit ${type} with id: ${id}`);
  };
  const handleDeleteItem = (type, id) => {
    console.log(`Delete ${type} with id: ${id}`);
  };
  const handleAddNewPage = () => {
    console.log("Add new page");
    setActiveTab("create");
  };
  const handleAddNewEvent = () => {
    setActiveTab("create");
    setContentType("event");
  };
  const handleAddNewStory = () => {
    setActiveTab("create");
    setContentType("story");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tighter uppercase mb-6">
          PAGE MANAGEMENT
        </h1>
      </div>
      
      <Tabs defaultValue="events" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="border-b border-t border-gray-200 w-full flex justify-start overflow-x-auto pb-0 mb-6 bg-transparent">
          <TabsTrigger value="events" className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2 data-[state=active]:shadow-none">
            Events
          </TabsTrigger>
          <TabsTrigger value="curated" className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2 data-[state=active]:shadow-none">
            Curated Stories
          </TabsTrigger>
          <TabsTrigger value="create" className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2 data-[state=active]:shadow-none">
            Create Content
          </TabsTrigger>
        </TabsList>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
          <div className="relative w-full max-w-sm">
            <Input 
              type="search" 
              placeholder="Search events..." 
              className="pl-9 bg-white border-gray-200" 
              value={searchQuery} 
              onChange={e => setSearchQuery(e.target.value)} 
            />
            <FileText className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          </div>
          <div className="flex items-center space-x-3">
            <Select value={statusFilter} onValueChange={value => setStatusFilter(value)}>
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
              onClick={handleAddNewEvent}
            >
              <PlusCircle className="mr-1 h-4 w-4" strokeWidth={1} /> Add Event
            </Button>
          </div>
        </div>
        
        <TabsContent value="events" className="mt-0">
          <Card className="border border-gray-200 shadow-none rounded-none">
            <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
              <CardTitle className="text-base font-light text-gray-900">
                Events Management
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent bg-gray-50">
                      <TableHead className="w-[80px] font-medium text-gray-600 text-sm">ID</TableHead>
                      <TableHead className="font-medium text-gray-600 text-sm">Title</TableHead>
                      <TableHead className="font-medium text-gray-600 text-sm">Status</TableHead>
                      <TableHead className="font-medium text-gray-600 text-sm">Location</TableHead>
                      <TableHead className="font-medium text-gray-600 text-sm">Date</TableHead>
                      <TableHead className="text-right font-medium text-gray-600 text-sm">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEvents.length === 0 ? <TableRow>
                        <TableCell colSpan={6} className="text-center py-10 text-gray-500">
                          No events found with the current filters
                        </TableCell>
                      </TableRow> : filteredEvents.map(event => <TableRow key={event.id} className="border-t border-gray-100 hover:bg-gray-50/50">
                        <TableCell className="font-medium">{event.id}</TableCell>
                        <TableCell>{event.title}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={`
                              ${event.status === "active" ? "bg-accent-mint text-gray-800 border-accent-mint" : event.status === "pending" ? "bg-accent-yellow text-gray-800 border-accent-yellow" : "bg-gray-100 text-gray-700 border-gray-200"}
                              text-xs font-medium px-2 py-0.5
                            `}>
                            {event.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <MapPin className="h-3.5 w-3.5 text-gray-500 mr-1" strokeWidth={1} />
                            {event.location}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Calendar className="h-3.5 w-3.5 text-gray-500 mr-1" strokeWidth={1} />
                            {event.date}
                          </div>
                        </TableCell>
                        <TableCell className="flex justify-end space-x-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8 p-0 hover:bg-gray-100" onClick={() => handleViewItem("event", event.id)} title="View">
                            <Eye className="h-4 w-4" strokeWidth={1} />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 p-0 hover:bg-gray-100" onClick={() => handleEditItem("event", event.id)} title="Edit">
                            <Edit className="h-4 w-4" strokeWidth={1} />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 p-0 hover:bg-gray-100" onClick={() => handleDeleteItem("event", event.id)} title="Delete">
                            <Trash2 className="h-4 w-4" strokeWidth={1} />
                          </Button>
                        </TableCell>
                      </TableRow>)}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="curated" className="mt-0">
          <Card className="border border-gray-200 shadow-none rounded-none">
            <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
              <CardTitle className="text-base font-light text-gray-900">
                Curated Stories Management
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent bg-gray-50">
                      <TableHead className="w-[80px] font-medium text-gray-600 text-sm">ID</TableHead>
                      <TableHead className="font-medium text-gray-600 text-sm">Title</TableHead>
                      <TableHead className="font-medium text-gray-600 text-sm">Status</TableHead>
                      <TableHead className="font-medium text-gray-600 text-sm">Author</TableHead>
                      <TableHead className="font-medium text-gray-600 text-sm">Created At</TableHead>
                      <TableHead className="text-right font-medium text-gray-600 text-sm">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStories.length === 0 ? <TableRow>
                        <TableCell colSpan={6} className="text-center py-10 text-gray-500">
                          No stories found with the current filters
                        </TableCell>
                      </TableRow> : filteredStories.map(story => <TableRow key={story.id} className="border-t border-gray-100 hover:bg-gray-50/50">
                        <TableCell className="font-medium">{story.id}</TableCell>
                        <TableCell>{story.title}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={`
                              ${story.status === "active" ? "bg-accent-mint text-gray-800 border-accent-mint" : story.status === "pending" ? "bg-accent-yellow text-gray-800 border-accent-yellow" : "bg-gray-100 text-gray-700 border-gray-200"}
                              text-xs font-medium px-2 py-0.5
                            `}>
                            {story.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{story.author}</TableCell>
                        <TableCell>{story.createdAt}</TableCell>
                        <TableCell className="flex justify-end space-x-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8 p-0 hover:bg-gray-100" onClick={() => handleViewItem("story", story.id)} title="View">
                            <Eye className="h-4 w-4" strokeWidth={1} />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 p-0 hover:bg-gray-100" onClick={() => handleEditItem("story", story.id)} title="Edit">
                            <Edit className="h-4 w-4" strokeWidth={1} />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 p-0 hover:bg-gray-100" onClick={() => handleDeleteItem("story", story.id)} title="Delete">
                            <Trash2 className="h-4 w-4" strokeWidth={1} />
                          </Button>
                        </TableCell>
                      </TableRow>)}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create" className="mt-0">
          <Card className="border border-gray-200 shadow-none rounded-none">
            <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
              <CardTitle className="text-base font-light text-gray-900">
                Create New Content
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-8">
                <div className="mb-6">
                  <div className="flex space-x-4 mb-6">
                    <Button onClick={() => setContentType("event")} variant={contentType === "event" ? "black" : "outline"} className={contentType === "event" ? "" : "border-gray-200"}>
                      <Calendar className="mr-2 h-4 w-4" strokeWidth={1} />
                      Event
                    </Button>
                    <Button onClick={() => setContentType("story")} variant={contentType === "story" ? "black" : "outline"} className={contentType === "story" ? "" : "border-gray-200"}>
                      <FileText className="mr-2 h-4 w-4" strokeWidth={1} />
                      Curated Story
                    </Button>
                    <Button onClick={() => setContentType("page")} variant={contentType === "page" ? "black" : "outline"} className={contentType === "page" ? "" : "border-gray-200"}>
                      <PlusCircle className="mr-2 h-4 w-4" strokeWidth={1} />
                      Custom Page
                    </Button>
                  </div>
                  
                  {contentType === "event" && <div className="space-y-6">
                      <h3 className="text-xl font-light">Create New Event</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-sm font-light text-gray-700">Event Title</label>
                            <Input placeholder="Enter event title" className="border-gray-200" />
                          </div>
                          
                          <div className="space-y-2">
                            <label className="text-sm font-light text-gray-700">Location</label>
                            <Input placeholder="Enter event location" className="border-gray-200" />
                          </div>
                          
                          <div className="space-y-2">
                            <label className="text-sm font-light text-gray-700">Date</label>
                            <Input type="date" className="border-gray-200" />
                          </div>
                          
                          <div className="space-y-2">
                            <label className="text-sm font-light text-gray-700">Status</label>
                            <Select defaultValue="active">
                              <SelectTrigger className="border-gray-200">
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-sm font-light text-gray-700">Description</label>
                            <textarea className="w-full h-40 border border-gray-200 rounded-md p-2 text-sm" placeholder="Enter event description"></textarea>
                          </div>
                          
                          <div className="space-y-2">
                            <label className="text-sm font-light text-gray-700">Featured Image</label>
                            <div className="border border-dashed border-gray-200 rounded-md p-6 text-center">
                              <p className="text-sm text-gray-500">Drop your image here or click to upload</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-4 justify-end">
                        <Button variant="outline" className="border-gray-200">Cancel</Button>
                        <Button className="bg-black text-white hover:bg-gray-800">
                          Create Event
                        </Button>
                      </div>
                    </div>}
                  
                  {contentType === "story" && <div className="space-y-6">
                      <h3 className="text-xl font-light">Create New Curated Story</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-sm font-light text-gray-700">Story Title</label>
                            <Input placeholder="Enter story title" className="border-gray-200" />
                          </div>
                          
                          <div className="space-y-2">
                            <label className="text-sm font-light text-gray-700">Author</label>
                            <Input placeholder="Enter author name" className="border-gray-200" />
                          </div>
                          
                          <div className="space-y-2">
                            <label className="text-sm font-light text-gray-700">Status</label>
                            <Select defaultValue="active">
                              <SelectTrigger className="border-gray-200">
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="flex items-center space-x-2 mt-4">
                            <input type="checkbox" id="featured" className="rounded border-gray-200" />
                            <label htmlFor="featured" className="text-sm">Featured Story</label>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-sm font-light text-gray-700">Content</label>
                            <textarea className="w-full h-40 border border-gray-200 rounded-md p-2 text-sm" placeholder="Write your story content here..."></textarea>
                          </div>
                          
                          <div className="space-y-2">
                            <label className="text-sm font-light text-gray-700">Cover Image</label>
                            <div className="border border-dashed border-gray-200 rounded-md p-6 text-center">
                              <p className="text-sm text-gray-500">Drop your image here or click to upload</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-4 justify-end">
                        <Button variant="outline" className="border-gray-200">Cancel</Button>
                        <Button className="bg-black text-white hover:bg-gray-800">
                          Create Story
                        </Button>
                      </div>
                    </div>}
                  
                  {contentType === "page" && <div className="space-y-6">
                      <h3 className="text-xl font-light">Create Custom Page</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-sm font-light text-gray-700">Page Title</label>
                            <Input placeholder="Enter page title" className="border-gray-200" />
                          </div>
                          
                          <div className="space-y-2">
                            <label className="text-sm font-light text-gray-700">URL Slug</label>
                            <Input placeholder="Enter URL slug" className="border-gray-200" />
                          </div>
                          
                          <div className="space-y-2">
                            <label className="text-sm font-light text-gray-700">Page Template</label>
                            <Select defaultValue="standard">
                              <SelectTrigger className="border-gray-200">
                                <SelectValue placeholder="Select template" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="standard">Standard Page</SelectItem>
                                <SelectItem value="landing">Landing Page</SelectItem>
                                <SelectItem value="gallery">Gallery</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-sm font-light text-gray-700">Meta Description</label>
                            <Input placeholder="Enter meta description" className="border-gray-200" />
                          </div>
                          
                          <div className="space-y-2">
                            <label className="text-sm font-light text-gray-700">Featured Image</label>
                            <div className="border border-dashed border-gray-200 rounded-md p-6 text-center">
                              <p className="text-sm text-gray-500">Drop your image here or click to upload</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-4 justify-end">
                        <Button variant="outline" className="border-gray-200">Cancel</Button>
                        <Button className="bg-black text-white hover:bg-gray-800">
                          Create Page
                        </Button>
                      </div>
                    </div>}
                </div>
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
          View Page Management Guides <ArrowRight className="ml-2 h-4 w-4" strokeWidth={1} />
        </Button>
      </div>
    </div>
  );
};

export default AdminPages;
