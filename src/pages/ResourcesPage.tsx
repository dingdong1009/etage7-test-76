
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, FileText, Youtube, Book, Download, ExternalLink, Play, Search, Filter, Plus, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ResourcesPage = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterVisible, setFilterVisible] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [currentResource, setCurrentResource] = useState<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Sample resources
  const pdfResources = [
    { id: 1, title: "Brand Style Guide", description: "Complete guide for using your brand assets", size: "2.4 MB", link: "", category: "guide" },
    { id: 2, title: "Marketing Toolkit", description: "Templates and graphics for your marketing campaigns", size: "5.1 MB", link: "https://example.com/marketing.pdf", category: "toolkit" },
    { id: 3, title: "Product Photography Guidelines", description: "How to photograph your products for best results", size: "1.8 MB", link: "", category: "guide" },
    { id: 4, title: "Sales Strategy Playbook", description: "Effective strategies for increasing sales", size: "3.2 MB", link: "https://example.com/sales.pdf", category: "playbook" }
  ];

  const videoResources = [
    { id: 1, title: "Introduction to the Platform", duration: "4:32", link: "https://youtube.com/watch?v=example1", category: "tutorial" },
    { id: 2, title: "Product Upload Tutorial", duration: "7:15", link: "", category: "tutorial" },
    { id: 3, title: "Analyzing Your Sales Data", duration: "12:08", link: "https://vimeo.com/example3", category: "analysis" },
    { id: 4, title: "Social Media Integration", duration: "9:45", link: "", category: "tips" }
  ];

  const externalResources = [
    { id: 1, title: "Industry Trends Report", source: "Fashion Weekly", type: "article", link: "https://fashionweekly.com/trends", category: "trends" },
    { id: 2, title: "E-commerce Best Practices", source: "Retail Insights", type: "webinar", link: "", category: "management" },
    { id: 3, title: "Brand Growth Strategies", source: "Marketing Pros", type: "course", link: "https://marketingpros.com/courses/growth", category: "growth" },
    { id: 4, title: "Supply Chain Management", source: "Business Daily", type: "article", link: "https://businessdaily.com/inventory", category: "supply" }
  ];

  // Function to open resource viewer
  const openResourceViewer = (resource: any, type: string) => {
    setCurrentResource({ ...resource, type });
    setIsViewDialogOpen(true);
  };

  // Filter resources based on search query
  const filterResources = (resources: any[], query: string) => {
    if (!query) return resources;
    const lowerQuery = query.toLowerCase();
    return resources.filter(resource => 
      resource.title.toLowerCase().includes(lowerQuery) || 
      (resource.description && resource.description.toLowerCase().includes(lowerQuery)) ||
      (resource.category && resource.category.toLowerCase().includes(lowerQuery))
    );
  };

  const filteredPdfResources = filterResources(pdfResources, searchQuery);
  const filteredVideoResources = filterResources(videoResources, searchQuery);
  const filteredExternalResources = filterResources(externalResources, searchQuery);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen bg-black text-white flex items-center">
        <div className="container-lg">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tighter mb-6">
              INDUSTRY<br/>
              <span className="font-normal">RESOURCES</span>
            </h1>
            <p className="text-lg md:text-xl font-light text-gray-300 mb-12 max-w-2xl">
              Valuable insights and tools for fashion brands and buyers.
            </p>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <button 
          onClick={() => scrollToSection('resources-section')}
          className={`absolute left-1/2 -translate-x-1/2 bottom-10 p-3 transition-opacity duration-500 ${
            scrolled ? 'opacity-0' : 'opacity-100'
          }`}
          aria-label="Scroll to learn more"
        >
          <ChevronDown size={24} className="animate-bounce" />
        </button>
      </section>

      {/* Resources Section - Redesigned to match Contract Management */}
      <section id="resources-section" className="py-16 px-4">
        <div className="max-w-[1481px] mx-auto">
          <h2 className="text-2xl md:text-4xl uppercase font-thin mb-12">
            EXPLORE OUR <span className="font-normal">RESOURCES</span>
          </h2>
          
          {/* Search and Filters Bar */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center pb-6 border-b border-gray-200 mb-8">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-[300px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  type="text"
                  placeholder="Search resources..."
                  className="pl-10 border-gray-200 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button 
                variant="outline" 
                size="icon" 
                className="border-gray-200"
                onClick={() => setFilterVisible(!filterVisible)}
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            <Link to="/brand/resources/new">
              <Button className="bg-black text-white hover:bg-gray-800">
                <Plus size={16} className="mr-2" />
                Add Resource
              </Button>
            </Link>
          </div>
          
          {/* Filters panel - conditionally rendered */}
          {filterVisible && (
            <Card className="border-gray-200 mb-6">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Resource Type</label>
                    <select className="w-full p-2 border rounded-md border-gray-200">
                      <option value="all">All Types</option>
                      <option value="pdf">Documents</option>
                      <option value="video">Videos</option>
                      <option value="external">External</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Category</label>
                    <select className="w-full p-2 border rounded-md border-gray-200">
                      <option value="all">All Categories</option>
                      <option value="guide">Guides</option>
                      <option value="tutorial">Tutorials</option>
                      <option value="toolkit">Toolkits</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <Button className="bg-black text-white hover:bg-gray-800 w-full">Apply Filters</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Tabs Navigation */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-transparent border-b border-gray-200 rounded-none w-full flex justify-start overflow-x-auto pb-0">
              <TabsTrigger 
                value="all" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none rounded-none px-6 py-2"
              >
                All Resources
              </TabsTrigger>
              <TabsTrigger 
                value="documents" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none rounded-none px-6 py-2"
              >
                Documents
              </TabsTrigger>
              <TabsTrigger 
                value="videos" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none rounded-none px-6 py-2"
              >
                Videos
              </TabsTrigger>
              <TabsTrigger 
                value="external" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none rounded-none px-6 py-2"
              >
                External Resources
              </TabsTrigger>
              <TabsTrigger 
                value="uploads" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none rounded-none px-6 py-2"
              >
                My Uploads
              </TabsTrigger>
              <TabsTrigger 
                value="request" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none rounded-none px-6 py-2"
              >
                Request Custom
              </TabsTrigger>
            </TabsList>
            
            {/* All Resources Tab */}
            <TabsContent value="all" className="mt-6 space-y-6">
              {/* Documents Section */}
              <Card className="border-gray-200">
                <CardHeader className="border-b border-gray-100 pb-3 flex flex-row items-center justify-between">
                  <CardTitle className="text-lg font-medium flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    PDF Documents
                  </CardTitle>
                  <Link to="/brand/resources/documents">
                    <Button variant="link" className="text-black text-sm font-light">
                      View all <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[45%]">Document Title</TableHead>
                        <TableHead className="w-[20%]">Category</TableHead>
                        <TableHead className="w-[15%]">Size</TableHead>
                        <TableHead className="text-right w-[20%]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPdfResources.length > 0 ? (
                        filteredPdfResources.map((resource) => (
                          <TableRow key={resource.id}>
                            <TableCell>
                              <div className="font-medium">{resource.title}</div>
                              <div className="text-xs text-gray-500 mt-0.5">{resource.description}</div>
                            </TableCell>
                            <TableCell className="capitalize">{resource.category}</TableCell>
                            <TableCell>{resource.size}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="border-gray-200"
                                  onClick={() => openResourceViewer(resource, 'pdf')}
                                >
                                  View
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="border-gray-200"
                                >
                                  <Download size={14} className="mr-1" />
                                  Download
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                            No PDF resources found matching your search.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              {/* Videos Section */}
              <Card className="border-gray-200">
                <CardHeader className="border-b border-gray-100 pb-3 flex flex-row items-center justify-between">
                  <CardTitle className="text-lg font-medium flex items-center gap-2">
                    <Youtube className="h-5 w-5" />
                    Video Tutorials
                  </CardTitle>
                  <Link to="/brand/resources/videos">
                    <Button variant="link" className="text-black text-sm font-light">
                      View all <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                    {filteredVideoResources.length > 0 ? (
                      filteredVideoResources.map((resource) => (
                        <div 
                          key={resource.id}
                          className="p-3 border rounded-none hover:border-black transition-colors hover:shadow-sm group"
                        >
                          <div 
                            className="relative w-full h-40 bg-gray-100 mb-2 overflow-hidden cursor-pointer"
                            onClick={() => openResourceViewer(resource, 'video')}
                          >
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="h-12 w-12 rounded-full bg-white/80 flex items-center justify-center shadow-sm group-hover:bg-white transition-colors">
                                <Play size={20} className="text-black ml-1" />
                              </div>
                            </div>
                          </div>
                          <h3 className="font-medium">{resource.title}</h3>
                          <div className="flex justify-between items-center mt-1">
                            <p className="text-xs text-gray-500">{resource.duration}</p>
                            <Button 
                              variant="link" 
                              size="sm" 
                              className="text-xs text-black p-0"
                              onClick={() => openResourceViewer(resource, 'video')}
                            >
                              Watch Now
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-3 text-center py-6 text-gray-500">
                        No video resources found matching your search.
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              {/* External Resources Section */}
              <Card className="border-gray-200">
                <CardHeader className="border-b border-gray-100 pb-3 flex flex-row items-center justify-between">
                  <CardTitle className="text-lg font-medium flex items-center gap-2">
                    <Book className="h-5 w-5" />
                    External Resources
                  </CardTitle>
                  <Link to="/brand/resources/external">
                    <Button variant="link" className="text-black text-sm font-light">
                      View all <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-2">
                    {filteredExternalResources.length > 0 ? (
                      filteredExternalResources.map((resource) => (
                        <div 
                          key={resource.id}
                          className="p-4 border rounded-none hover:border-black transition-colors cursor-pointer hover:shadow-sm flex flex-col h-full group"
                          onClick={() => openResourceViewer(resource, 'external')}
                        >
                          <div className="h-10 w-10 rounded-none bg-gray-100 flex items-center justify-center mb-3 text-black">
                            {resource.type === 'article' && <FileText size={18} />}
                            {resource.type === 'webinar' && <Youtube size={18} />}
                            {resource.type === 'course' && <Book size={18} />}
                          </div>
                          <h3 className="font-medium">{resource.title}</h3>
                          <p className="text-xs text-gray-500 mt-1">Source: {resource.source}</p>
                          <p className="text-xs text-black mt-1 capitalize">{resource.type}</p>
                          <div className="mt-auto pt-3">
                            <Button 
                              variant="link" 
                              size="sm" 
                              className="text-xs flex items-center gap-1 text-black hover:underline p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <ExternalLink size={14} />
                              View Resource
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-4 text-center py-6 text-gray-500">
                        No external resources found matching your search.
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Documents Tab */}
            <TabsContent value="documents" className="mt-6">
              <Card className="border-gray-200">
                <CardHeader className="border-b border-gray-100 pb-3 flex flex-row items-center justify-between">
                  <CardTitle className="text-lg font-medium flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    PDF Documents
                  </CardTitle>
                  <Button variant="outline" size="sm" className="border-black">
                    <Upload size={14} className="mr-2" />
                    Upload Document
                  </Button>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[45%]">Document Title</TableHead>
                        <TableHead className="w-[20%]">Category</TableHead>
                        <TableHead className="w-[15%]">Size</TableHead>
                        <TableHead className="text-right w-[20%]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPdfResources.length > 0 ? (
                        filteredPdfResources.map((resource) => (
                          <TableRow key={resource.id}>
                            <TableCell>
                              <div className="font-medium">{resource.title}</div>
                              <div className="text-xs text-gray-500 mt-0.5">{resource.description}</div>
                            </TableCell>
                            <TableCell className="capitalize">{resource.category}</TableCell>
                            <TableCell>{resource.size}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="border-gray-200"
                                  onClick={() => openResourceViewer(resource, 'pdf')}
                                >
                                  View
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="border-gray-200"
                                >
                                  <Download size={14} className="mr-1" />
                                  Download
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                            No PDF resources found matching your search.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Videos Tab */}
            <TabsContent value="videos" className="mt-6">
              <Card className="border-gray-200">
                <CardHeader className="border-b border-gray-100 pb-3 flex flex-row items-center justify-between">
                  <CardTitle className="text-lg font-medium flex items-center gap-2">
                    <Youtube className="h-5 w-5" />
                    Video Tutorials
                  </CardTitle>
                  <Button variant="outline" size="sm" className="border-black">
                    <Upload size={14} className="mr-2" />
                    Upload Video
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                    {filteredVideoResources.length > 0 ? (
                      filteredVideoResources.map((resource) => (
                        <div 
                          key={resource.id}
                          className="p-3 border rounded-none hover:border-black transition-colors hover:shadow-sm group"
                        >
                          <div 
                            className="relative w-full h-40 bg-gray-100 mb-2 overflow-hidden cursor-pointer"
                            onClick={() => openResourceViewer(resource, 'video')}
                          >
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="h-12 w-12 rounded-full bg-white/80 flex items-center justify-center shadow-sm group-hover:bg-white transition-colors">
                                <Play size={20} className="text-black ml-1" />
                              </div>
                            </div>
                          </div>
                          <h3 className="font-medium">{resource.title}</h3>
                          <div className="flex justify-between items-center mt-1">
                            <p className="text-xs text-gray-500">{resource.duration}</p>
                            <Button 
                              variant="link" 
                              size="sm" 
                              className="text-xs text-black p-0"
                              onClick={() => openResourceViewer(resource, 'video')}
                            >
                              Watch Now
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-3 text-center py-6 text-gray-500">
                        No video resources found matching your search.
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* External Resources Tab */}
            <TabsContent value="external" className="mt-6">
              <Card className="border-gray-200">
                <CardHeader className="border-b border-gray-100 pb-3 flex flex-row items-center justify-between">
                  <CardTitle className="text-lg font-medium flex items-center gap-2">
                    <Book className="h-5 w-5" />
                    External Resources
                  </CardTitle>
                  <Button variant="outline" size="sm" className="border-black">
                    <Plus size={14} className="mr-2" />
                    Add External Link
                  </Button>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[35%]">Title</TableHead>
                        <TableHead className="w-[20%]">Source</TableHead>
                        <TableHead className="w-[15%]">Type</TableHead>
                        <TableHead className="w-[15%]">Category</TableHead>
                        <TableHead className="text-right w-[15%]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredExternalResources.length > 0 ? (
                        filteredExternalResources.map((resource) => (
                          <TableRow key={resource.id}>
                            <TableCell>
                              <div className="font-medium">{resource.title}</div>
                            </TableCell>
                            <TableCell>{resource.source}</TableCell>
                            <TableCell className="capitalize">{resource.type}</TableCell>
                            <TableCell className="capitalize">{resource.category}</TableCell>
                            <TableCell className="text-right">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="border-gray-200"
                                onClick={() => openResourceViewer(resource, 'external')}
                              >
                                <ExternalLink size={14} className="mr-1" />
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                            No external resources found matching your search.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* My Uploads Tab */}
            <TabsContent value="uploads" className="mt-6">
              <Card className="border-gray-200">
                <CardHeader className="border-b border-gray-100 pb-3 flex flex-row items-center justify-between">
                  <CardTitle className="text-lg font-medium flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    My Uploaded Resources
                  </CardTitle>
                  <Button variant="outline" size="sm" className="border-black">
                    <Upload size={14} className="mr-2" />
                    Upload New
                  </Button>
                </CardHeader>
                <CardContent className="py-8 text-center">
                  <div className="max-w-md mx-auto">
                    <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Uploads Yet</h3>
                    <p className="text-gray-500 mb-6">
                      You haven't uploaded any resources yet. Upload documents, videos, or other materials to share with your team.
                    </p>
                    <Button className="bg-black text-white hover:bg-gray-800">
                      <Upload size={16} className="mr-2" />
                      Upload Your First Resource
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Request Custom Tab */}
            <TabsContent value="request" className="mt-6">
              <Card className="border-gray-200">
                <CardHeader className="border-b border-gray-100 pb-3">
                  <CardTitle className="text-lg font-medium">Request Custom Resources</CardTitle>
                  <CardDescription>
                    Need specific resources for your brand? Submit a custom request and our team will help you create it.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Resource Type
                        </label>
                        <select className="w-full p-2 border border-gray-200 rounded-none focus:outline-none focus:border-black">
                          <option value="">Select resource type</option>
                          <option value="guide">Brand Guide</option>
                          <option value="template">Marketing Template</option>
                          <option value="tutorial">Video Tutorial</option>
                          <option value="custom">Custom Request</option>
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Priority Level
                        </label>
                        <select className="w-full p-2 border border-gray-200 rounded-none focus:outline-none focus:border-black">
                          <option value="low">Low - Within 2 weeks</option>
                          <option value="medium">Medium - Within 1 week</option>
                          <option value="high">High - Within 3 days</option>
                          <option value="urgent">Urgent - Within 24 hours</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Description of Request
                      </label>
                      <textarea 
                        className="w-full p-2 border border-gray-200 rounded-none focus:outline-none focus:border-black h-32"
                        placeholder="Please describe what you're looking for in detail..."
                      ></textarea>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Additional Context or Examples
                      </label>
                      <textarea 
                        className="w-full p-2 border border-gray-200 rounded-none focus:outline-none focus:border-black h-24"
                        placeholder="Provide any examples or additional context that might help us create your resource..."
                      ></textarea>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button type="submit" className="bg-black text-white hover:bg-gray-800">
                        Submit Request
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-[1481px] mx-auto text-center">
          <h2 className="text-2xl md:text-4xl uppercase font-thin mb-6">
            STAY <span className="font-normal">INFORMED</span>
          </h2>
          <p className="max-w-2xl mx-auto mb-8 font-light text-gray-600">
            Subscribe to our newsletter for the latest industry resources, market reports, 
            and educational content delivered straight to your inbox.
          </p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="px-4 py-2 border border-gray-300 rounded-none focus:outline-none focus:border-black flex-grow"
            />
            <Button className="bg-black text-white hover:bg-gray-800 whitespace-nowrap">
              SUBSCRIBE
            </Button>
          </div>
        </div>
      </section>
      
      {/* View Resource Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[725px] max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="text-lg font-medium">{currentResource?.title || "Resource Details"}</DialogTitle>
          </DialogHeader>
          <div className="py-4 overflow-y-auto">
            {currentResource?.type === 'pdf' && (
              <div className="border rounded-none p-4">
                {currentResource.link ? (
                  <iframe 
                    src={currentResource.link} 
                    className="w-full h-[400px] rounded-none"
                    title={currentResource.title}
                  ></iframe>
                ) : (
                  <div className="bg-gray-50 h-[400px] flex items-center justify-center">
                    <div className="text-center">
                      <FileText className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-gray-500">PDF Preview</p>
                      <Button className="mt-4 bg-black text-white hover:bg-gray-800">
                        <Download className="mr-2 h-4 w-4" /> Download PDF
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
            {currentResource?.type === 'video' && (
              <div className="border rounded-none p-4">
                {currentResource.link && currentResource.link.includes('youtube') ? (
                  <iframe 
                    src={currentResource.link.replace('watch?v=', 'embed/')} 
                    className="w-full h-[400px] rounded-none" 
                    title={currentResource.title}
                    allowFullScreen
                  ></iframe>
                ) : currentResource.link && currentResource.link.includes('vimeo') ? (
                  <iframe 
                    src={currentResource.link.replace('vimeo.com/', 'player.vimeo.com/video/')} 
                    className="w-full h-[400px] rounded-none"
                    title={currentResource.title}
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div className="bg-gray-50 h-[400px] flex items-center justify-center">
                    <div className="text-center">
                      <Youtube className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-gray-500">Video Player</p>
                      <div className="mt-4 flex justify-center">
                        <Button className="bg-black text-white hover:bg-gray-800">
                          <Play className="mr-2 h-4 w-4" /> Play Video
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            {currentResource?.type === 'external' && (
              <div className="border rounded-none p-4">
                {currentResource.link ? (
                  <div className="w-full h-[400px] rounded-none bg-gray-50 p-4">
                    <div className="flex justify-between mb-4">
                      <h3 className="font-medium">{currentResource.title}</h3>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-black"
                        onClick={() => window.open(currentResource.link, '_blank')}
                      >
                        <ExternalLink size={14} className="mr-1" /> Open
                      </Button>
                    </div>
                    <iframe 
                      src={currentResource.link} 
                      className="w-full h-[320px] rounded-none border border-gray-200"
                      title={currentResource.title}
                    ></iframe>
                  </div>
                ) : (
                  <div className="bg-gray-50 h-[400px] flex items-center justify-center">
                    <div className="text-center">
                      {currentResource.type === 'article' && <FileText className="mx-auto h-12 w-12 text-gray-400" />}
                      {currentResource.type === 'webinar' && <Youtube className="mx-auto h-12 w-12 text-gray-400" />}
                      {currentResource.type === 'course' && <Book className="mx-auto h-12 w-12 text-gray-400" />}
                      <p className="mt-2 text-gray-500">{currentResource.type} from {currentResource.source}</p>
                      <Button className="mt-4 bg-black text-white hover:bg-gray-800">
                        <ExternalLink className="mr-2 h-4 w-4" /> Open External Resource
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
            {currentResource && (
              <div className="mt-4 border-t border-gray-100 pt-4">
                <dl className="grid grid-cols-2 gap-x-4 gap-y-4">
                  {currentResource.description && (
                    <>
                      <dt className="text-sm font-medium">Description:</dt>
                      <dd className="text-sm text-gray-600">{currentResource.description}</dd>
                    </>
                  )}
                  {currentResource.category && (
                    <>
                      <dt className="text-sm font-medium">Category:</dt>
                      <dd className="text-sm text-gray-600 capitalize">{currentResource.category}</dd>
                    </>
                  )}
                  {currentResource.link && (
                    <>
                      <dt className="text-sm font-medium">Link:</dt>
                      <dd className="text-sm text-gray-600 truncate">
                        <a href={currentResource.link} target="_blank" rel="noopener noreferrer" className="text-black hover:underline">
                          {currentResource.link}
                        </a>
                      </dd>
                    </>
                  )}
                  {currentResource.size && (
                    <>
                      <dt className="text-sm font-medium">Size:</dt>
                      <dd className="text-sm text-gray-600">{currentResource.size}</dd>
                    </>
                  )}
                  {currentResource.duration && (
                    <>
                      <dt className="text-sm font-medium">Duration:</dt>
                      <dd className="text-sm text-gray-600">{currentResource.duration}</dd>
                    </>
                  )}
                  {currentResource.source && (
                    <>
                      <dt className="text-sm font-medium">Source:</dt>
                      <dd className="text-sm text-gray-600">{currentResource.source}</dd>
                    </>
                  )}
                </dl>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" className="border-gray-200" onClick={() => setIsViewDialogOpen(false)}>Close</Button>
            {currentResource?.type === 'pdf' && (
              <Button variant="black" className="bg-black text-white hover:bg-gray-800">
                <Download className="mr-2 h-4 w-4" /> Download
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResourcesPage;
