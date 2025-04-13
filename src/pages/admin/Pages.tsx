
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2, Search, PlusCircle, Calendar, MapPin, Clock, FileText, Layout, Layers, PenSquare, Save, Image, Type, FileInput } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import EventsManagement from "./components/EventsManagement";
import CuratedStoriesManagement from "./components/CuratedStoriesManagement";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";

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
  const [pageEditorOpen, setPageEditorOpen] = useState(false);
  const [newPageDialogOpen, setNewPageDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("blank");
  const [currentEditorView, setCurrentEditorView] = useState("design");
  const [pagePreview, setPagePreview] = useState(false);
  
  // New page data state
  const [newPageData, setNewPageData] = useState({
    title: "",
    slug: "",
    description: "",
    template: "blank",
    status: "draft"
  });
  
  const form = useForm({
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      template: "blank",
      status: "draft"
    }
  });
  
  const availableBrands = ["Brand One", "Brand Two", "Brand Three", "Brand Four", "Brand Five"];
  
  const pageTemplates = [
    { id: "blank", name: "Blank Page", description: "Start with a clean slate" },
    { id: "landing", name: "Landing Page", description: "Perfect for product launches" },
    { id: "about", name: "About Page", description: "Share your story and mission" },
    { id: "contact", name: "Contact Page", description: "Help visitors get in touch" },
    { id: "gallery", name: "Gallery Page", description: "Showcase your portfolio or products" }
  ];
  
  const filteredEvents = events
    .filter(event => statusFilter === "all" || event.status === statusFilter)
    .filter(event => 
      searchQuery === "" || 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
  const filteredStories = curatedStories
    .filter(story => statusFilter === "all" || story.status === statusFilter)
    .filter(story => 
      searchQuery === "" || 
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
  const handleViewItem = (type, id) => {
    console.log(`View ${type} with ID: ${id}`);
  };

  const handleEditItem = (type, id) => {
    console.log(`Edit ${type} with ID: ${id}`);
  };

  const handleDeleteItem = (type, id) => {
    console.log(`Delete ${type} with ID: ${id}`);
    toast.success(`${type} has been deleted`);
  };

  const handleAddNewPage = () => {
    setNewPageDialogOpen(true);
  };
  
  const createNewPage = (data) => {
    console.log("Creating new page with data:", data);
    setNewPageDialogOpen(false);
    
    // Simulate page creation
    toast.success("New page created successfully", {
      description: `Page "${data.title}" has been created as a ${data.status}.`
    });
    
    // Open the page editor with the new page data
    setNewPageData(data);
    launchPageEditor();
  };
  
  const launchPageEditor = () => {
    console.log("Launching page editor");
    setPageEditorOpen(true);
    toast.success("Page editor launched successfully", {
      description: "You can now edit your page content and design."
    });
  };
  
  const handleSavePage = (saveType) => {
    // Simulate saving page
    if (saveType === 'draft') {
      toast.success("Page saved as draft", {
        description: "Your changes have been saved as a draft."
      });
    } else {
      toast.success("Page published successfully", {
        description: "Your page is now live and visible to users."
      });
    }
    setPageEditorOpen(false);
  };
  
  const handleAddElement = (elementType) => {
    toast.success(`${elementType} added to page`, {
      description: `A new ${elementType.toLowerCase()} has been added to your page.`
    });
  };
  
  const handlePreviewToggle = () => {
    setPagePreview(!pagePreview);
    toast.info(pagePreview ? "Exited preview mode" : "Preview mode activated");
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
                <div className="flex justify-center mb-6">
                  <div className="bg-gray-50 p-4 rounded-full">
                    <PenSquare className="h-12 w-12 text-gray-700" strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="text-xl font-light mb-4">Advanced Page Editor</h3>
                <p className="text-gray-500 mb-6 max-w-lg mx-auto">Create and design new pages with a rich set of tools and customization options. Use our drag-and-drop builder to create visually stunning pages.</p>
                <Button className="bg-black hover:bg-gray-800 text-white" onClick={launchPageEditor}>
                  <Layout className="h-4 w-4 mr-2" strokeWidth={1.5} />
                  Launch Page Editor
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* New Page Dialog */}
      <Dialog open={newPageDialogOpen} onOpenChange={setNewPageDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-light">Create New Page</DialogTitle>
            <DialogDescription>
              Fill in the details below to create a new page for your website.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(createNewPage)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Page Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter page title" required {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL Slug</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="page-url-slug" 
                        required 
                        {...field} 
                        onChange={(e) => {
                          // Auto-generate slug from title - convert spaces to dashes and lowercase
                          const value = e.target.value || "";
                          field.onChange(value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""));
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Page Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter a brief description of this page" 
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="template"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Page Template</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a template" />
                        </SelectTrigger>
                        <SelectContent>
                          {pageTemplates.map((template) => (
                            <SelectItem key={template.id} value={template.id}>
                              {template.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Initial Status</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                          <SelectItem value="scheduled">Scheduled</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setNewPageDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-black hover:bg-gray-800 text-white">
                  Create Page & Open Editor
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Page Editor Dialog */}
      <Dialog open={pageEditorOpen} onOpenChange={setPageEditorOpen}>
        <DialogContent className="max-w-5xl w-[90vw]">
          <DialogHeader>
            <DialogTitle className="text-xl font-light">
              {newPageData.title || "Advanced Page Editor"}
            </DialogTitle>
            <DialogDescription>
              {newPageData.description || "Design and customize your page using our powerful editor."}
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4">
            <div className="flex space-x-3">
              <Button 
                variant={currentEditorView === "design" ? "black" : "outline"} 
                size="sm"
                onClick={() => setCurrentEditorView("design")}
              >
                <Layout className="w-4 h-4 mr-1" strokeWidth={1.5} />
                Design
              </Button>
              <Button 
                variant={currentEditorView === "content" ? "black" : "outline"} 
                size="sm"
                onClick={() => setCurrentEditorView("content")}
              >
                <Type className="w-4 h-4 mr-1" strokeWidth={1.5} />
                Content
              </Button>
              <Button 
                variant={currentEditorView === "media" ? "black" : "outline"} 
                size="sm"
                onClick={() => setCurrentEditorView("media")}
              >
                <Image className="w-4 h-4 mr-1" strokeWidth={1.5} />
                Media
              </Button>
              <Button 
                variant={currentEditorView === "settings" ? "black" : "outline"} 
                size="sm"
                onClick={() => setCurrentEditorView("settings")}
              >
                <FileInput className="w-4 h-4 mr-1" strokeWidth={1.5} />
                Settings
              </Button>
            </div>
            
            <Button 
              variant={pagePreview ? "black" : "outline"} 
              size="sm"
              onClick={handlePreviewToggle}
            >
              <Eye className="w-4 h-4 mr-1" strokeWidth={1.5} />
              {pagePreview ? "Exit Preview" : "Preview"}
            </Button>
          </div>
          
          <div className="grid grid-cols-5 gap-4 h-[60vh]">
            {/* Left sidebar - elements */}
            <div className="col-span-1 border-r border-gray-200 pr-4 overflow-y-auto">
              <h3 className="font-medium text-sm mb-3">Elements</h3>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  size="sm"
                  onClick={() => handleAddElement("Heading")}
                >
                  <Type className="w-4 h-4 mr-2" strokeWidth={1.5} />
                  Heading
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  size="sm"
                  onClick={() => handleAddElement("Paragraph")}
                >
                  <Type className="w-4 h-4 mr-2" strokeWidth={1.5} />
                  Paragraph
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  size="sm"
                  onClick={() => handleAddElement("Image")}
                >
                  <Image className="w-4 h-4 mr-2" strokeWidth={1.5} />
                  Image
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  size="sm"
                  onClick={() => handleAddElement("Button")}
                >
                  <Layout className="w-4 h-4 mr-2" strokeWidth={1.5} />
                  Button
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  size="sm"
                  onClick={() => handleAddElement("Gallery")}
                >
                  <Image className="w-4 h-4 mr-2" strokeWidth={1.5} />
                  Gallery
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  size="sm"
                  onClick={() => handleAddElement("Form")}
                >
                  <FileInput className="w-4 h-4 mr-2" strokeWidth={1.5} />
                  Form
                </Button>
              </div>
              
              <h3 className="font-medium text-sm mb-3 mt-6">Sections</h3>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  size="sm"
                  onClick={() => handleAddElement("Hero Section")}
                >
                  <Layout className="w-4 h-4 mr-2" strokeWidth={1.5} />
                  Hero Section
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  size="sm"
                  onClick={() => handleAddElement("Feature Section")}
                >
                  <Layout className="w-4 h-4 mr-2" strokeWidth={1.5} />
                  Feature Section
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  size="sm"
                  onClick={() => handleAddElement("Text Column Section")}
                >
                  <Layout className="w-4 h-4 mr-2" strokeWidth={1.5} />
                  Text Columns
                </Button>
              </div>
            </div>
            
            {/* Main editor area */}
            <div className="col-span-3 border rounded-md bg-white overflow-y-auto">
              {pagePreview ? (
                <div className="p-6">
                  <h1 className="text-3xl font-bold mb-4">{newPageData.title || "Page Title"}</h1>
                  <p className="mb-6">This is a preview of your page. The content will appear here.</p>
                  
                  <div className="border border-dashed border-gray-300 p-8 mb-6 rounded-md text-center text-gray-500">
                    Hero Section Placeholder
                  </div>
                  
                  <h2 className="text-2xl font-semibold mb-3">Section Heading</h2>
                  <p className="mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="border border-dashed border-gray-300 p-8 rounded-md text-center text-gray-500">
                      Image Placeholder
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-2">Feature Heading</h3>
                      <p>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</p>
                      <Button className="mt-4">Learn More</Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-6">
                  <Layers className="h-12 w-12 text-gray-400 mb-4" strokeWidth={1} />
                  <h3 className="text-lg font-medium mb-2">Page Editor Canvas</h3>
                  <p className="text-gray-500 mb-6 max-w-md">Drag elements from the sidebar and drop them here to build your page. Click on any element to edit its properties.</p>
                  <Button 
                    variant="outline"
                    onClick={() => handleAddElement("Hero Section")}
                  >
                    Add Hero Section
                  </Button>
                </div>
              )}
            </div>
            
            {/* Right sidebar - properties */}
            <div className="col-span-1 border-l border-gray-200 pl-4 overflow-y-auto">
              <h3 className="font-medium text-sm mb-3">Properties</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="elementTitle" className="text-xs">Element Title</Label>
                  <Input id="elementTitle" placeholder="Title" className="text-sm" />
                </div>
                
                <div>
                  <Label htmlFor="elementText" className="text-xs">Text Content</Label>
                  <Textarea id="elementText" placeholder="Enter content..." className="text-sm min-h-[100px]" />
                </div>
                
                <div>
                  <Label className="text-xs">Alignment</Label>
                  <div className="flex space-x-2 mt-1">
                    <Button variant="outline" size="sm" className="w-10">L</Button>
                    <Button variant="outline" size="sm" className="w-10">C</Button>
                    <Button variant="outline" size="sm" className="w-10">R</Button>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="spacing" className="text-xs">Spacing</Label>
                  <Input id="spacing" type="number" defaultValue="16" className="text-sm" />
                </div>
                
                <div>
                  <Label className="text-xs">Background</Label>
                  <div className="grid grid-cols-4 gap-2 mt-1">
                    <div className="h-6 w-full bg-white border border-gray-200 rounded cursor-pointer"></div>
                    <div className="h-6 w-full bg-gray-100 border border-gray-200 rounded cursor-pointer"></div>
                    <div className="h-6 w-full bg-gray-200 border border-gray-200 rounded cursor-pointer"></div>
                    <div className="h-6 w-full bg-black border border-gray-200 rounded cursor-pointer"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter className="flex justify-between items-center">
            <div>
              <Button variant="outline" className="mr-2" onClick={handlePreviewToggle}>
                Preview
              </Button>
              <Button variant="outline" className="border-gray-300" onClick={() => handleSavePage('draft')}>
                <Save className="w-4 h-4 mr-1" strokeWidth={1.5} />
                Save Draft
              </Button>
            </div>
            <Button className="bg-black hover:bg-gray-800 text-white" onClick={() => handleSavePage('publish')}>
              Publish Page
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
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
