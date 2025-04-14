import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Youtube, Book, Download, ExternalLink, Play, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const BrandResources = () => {
  // State for dialogs and filtering
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [currentResource, setCurrentResource] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [filterVisible, setFilterVisible] = useState(false);

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
    <div className="space-y-6">
      {/* Page header */}
      <h1 className="text-4xl md:text-6xl uppercase font-thin mb-6">Resources</h1>
      
      {/* Search and actions bar */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center pb-4 border-b border-gray-200">
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
      
      {/* Main content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="border-t border-gray-200 mb-6">
          <TabsList className="border-b border-gray-200 w-full flex justify-start overflow-x-auto pb-0 mb-6 bg-transparent">
            <TabsTrigger 
              value="all" 
              className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2 data-[state=active]:shadow-none"
            >
              All Resources
            </TabsTrigger>
            <TabsTrigger 
              value="documents" 
              className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2 data-[state=active]:shadow-none"
            >
              Documents
            </TabsTrigger>
            <TabsTrigger 
              value="videos" 
              className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2 data-[state=active]:shadow-none"
            >
              Videos
            </TabsTrigger>
            <TabsTrigger 
              value="external" 
              className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2 data-[state=active]:shadow-none"
            >
              External Resources
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="all" className="mt-0 space-y-6">
          {/* Documents Section */}
          <Card className="border border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-1xl md:text-2xl uppercase font-thin">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  PDF Documents
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
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
          <Card className="border border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-1xl md:text-2xl uppercase font-thin">
                <div className="flex items-center gap-2">
                  <Youtube className="h-5 w-5" />
                  Video Tutorials
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="w-[50%]">Video Title</TableHead>
                    <TableHead className="w-[20%]">Category</TableHead>
                    <TableHead className="w-[15%]">Duration</TableHead>
                    <TableHead className="text-right w-[15%]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVideoResources.length > 0 ? (
                    filteredVideoResources.map((resource) => (
                      <TableRow key={resource.id}>
                        <TableCell>
                          <div className="font-medium">{resource.title}</div>
                        </TableCell>
                        <TableCell className="capitalize">{resource.category}</TableCell>
                        <TableCell>{resource.duration}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-gray-200"
                            onClick={() => openResourceViewer(resource, 'video')}
                          >
                            <Play size={14} className="mr-1" />
                            Watch
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                        No video resources found matching your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          {/* External Resources Section */}
          <Card className="border border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-1xl md:text-2xl uppercase font-thin">
                <div className="flex items-center gap-2">
                  <Book className="h-5 w-5" />
                  External Resources
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
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
        
        <TabsContent value="documents" className="mt-0">
          <Card className="border border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-1xl md:text-2xl uppercase font-thin">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  PDF Documents
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
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
        
        <TabsContent value="videos" className="mt-0">
          <Card className="border border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-1xl md:text-2xl uppercase font-thin">
                <div className="flex items-center gap-2">
                  <Youtube className="h-5 w-5" />
                  Video Tutorials
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="w-[50%]">Video Title</TableHead>
                    <TableHead className="w-[20%]">Category</TableHead>
                    <TableHead className="w-[15%]">Duration</TableHead>
                    <TableHead className="text-right w-[15%]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVideoResources.length > 0 ? (
                    filteredVideoResources.map((resource) => (
                      <TableRow key={resource.id}>
                        <TableCell>
                          <div className="font-medium">{resource.title}</div>
                        </TableCell>
                        <TableCell className="capitalize">{resource.category}</TableCell>
                        <TableCell>{resource.duration}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-gray-200"
                            onClick={() => openResourceViewer(resource, 'video')}
                          >
                            <Play size={14} className="mr-1" />
                            Watch
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                        No video resources found matching your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="external" className="mt-0">
          <Card className="border border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-1xl md:text-2xl uppercase font-thin">
                <div className="flex items-center gap-2">
                  <Book className="h-5 w-5" />
                  External Resources
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
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
      </Tabs>
      
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

export default BrandResources;
