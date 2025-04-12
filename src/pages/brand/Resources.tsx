
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Youtube, Book, Download, ExternalLink, Play, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BrandResources = () => {
  // State for dialogs and filtering
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [currentResource, setCurrentResource] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

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
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-4xl md:text-6xl font-light tracking-tighter uppercase">Resources</h1>
        
        <div className="relative w-full md:w-64 lg:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            type="text"
            placeholder="Search resources..."
            className="pl-10 border-gray-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="border-b border-gray-200 w-full flex justify-start overflow-x-auto pb-0 mb-6">
          <TabsTrigger value="all" className="text-sm font-light data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2">
            All Resources
          </TabsTrigger>
          <TabsTrigger value="documents" className="text-sm font-light data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2">
            Documents
          </TabsTrigger>
          <TabsTrigger value="videos" className="text-sm font-light data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2">
            Videos
          </TabsTrigger>
          <TabsTrigger value="external" className="text-sm font-light data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2">
            External Resources
          </TabsTrigger>
          <TabsTrigger value="request" className="text-sm font-light data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2">
            Request Custom
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Documents Card */}
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  PDF Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredPdfResources.length > 0 ? (
                  filteredPdfResources.map((resource) => (
                    <div 
                      key={resource.id}
                      className="flex justify-between items-center p-3 border rounded-none hover:border-black transition-colors hover:shadow-sm cursor-pointer group"
                      onClick={() => openResourceViewer(resource, 'pdf')}
                    >
                      <div>
                        <h3 className="font-medium">{resource.title}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">{resource.description}</p>
                        <p className="text-xs text-gray-400 mt-0.5">Size: {resource.size}</p>
                      </div>
                      <Button variant="outline" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity border-black">
                        <Download size={14} className="mr-1" />
                        Download
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 p-3">No PDF resources found matching your search.</p>
                )}
              </CardContent>
            </Card>
            
            {/* Videos Card */}
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <Youtube className="h-5 w-5" />
                  Video Tutorials
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredVideoResources.length > 0 ? (
                  filteredVideoResources.map((resource) => (
                    <div 
                      key={resource.id}
                      className="p-3 border rounded-none hover:border-black transition-colors hover:shadow-sm group"
                    >
                      <div 
                        className="relative w-full h-32 bg-gray-100 mb-2 overflow-hidden cursor-pointer"
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
                  <p className="text-sm text-gray-500 p-3">No video resources found matching your search.</p>
                )}
              </CardContent>
            </Card>
            
            {/* External Resources Card */}
            <Card className="border border-gray-200 md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <Book className="h-5 w-5" />
                  External Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                    <p className="text-sm text-gray-500 p-3 col-span-full">No external resources found matching your search.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="documents" className="mt-0">
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <FileText className="h-5 w-5" />
                PDF Resources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredPdfResources.length > 0 ? (
                filteredPdfResources.map((resource) => (
                  <div 
                    key={resource.id}
                    className="flex justify-between items-center p-3 border rounded-none hover:border-black transition-colors hover:shadow-sm cursor-pointer group"
                    onClick={() => openResourceViewer(resource, 'pdf')}
                  >
                    <div>
                      <h3 className="font-medium">{resource.title}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">{resource.description}</p>
                      <p className="text-xs text-gray-400 mt-0.5">Size: {resource.size}</p>
                    </div>
                    <Button variant="outline" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity border-black">
                      <Download size={14} className="mr-1" />
                      Download
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 p-3">No PDF resources found matching your search.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="videos" className="mt-0">
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Youtube className="h-5 w-5" />
                Video Tutorials
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                  <p className="text-sm text-gray-500 p-3 col-span-full">No video resources found matching your search.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="external" className="mt-0">
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Book className="h-5 w-5" />
                External Resources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
                  <p className="text-sm text-gray-500 p-3 col-span-full">No external resources found matching your search.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="request" className="mt-0">
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Request Custom Resources</CardTitle>
            </CardHeader>
            <CardContent>
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
                  <Button type="submit" variant="black">
                    Submit Request
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* View Resource Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[725px] max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>{currentResource?.title}</DialogTitle>
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
                      <Button className="mt-4" variant="black">
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
                        <Button variant="black">
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
                      <Button variant="black" className="mt-4">
                        <ExternalLink className="mr-2 h-4 w-4" /> Open External Resource
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
            {currentResource && (
              <div className="mt-4">
                <h3 className="font-medium">Details:</h3>
                <p className="text-gray-600 mt-2">{currentResource.description || "No description available."}</p>
                {currentResource.category && (
                  <p className="text-xs text-gray-500 mt-2">Category: {currentResource.category}</p>
                )}
                {currentResource.link && (
                  <p className="text-sm text-gray-500 mt-2">
                    Link: <a href={currentResource.link} target="_blank" rel="noopener noreferrer" className="text-black hover:underline">{currentResource.link}</a>
                  </p>
                )}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" className="border-black" onClick={() => setIsViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BrandResources;
