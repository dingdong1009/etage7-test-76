
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Youtube, Book, Download, ExternalLink, Play, Search, Plus, Pencil, Eye, ToggleLeft, ToggleRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const AdminResources = () => {
  // State for dialogs and filtering
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentResource, setCurrentResource] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [resourceLink, setResourceLink] = useState<string>("");

  // Sample resources
  const [pdfResources, setPdfResources] = useState([
    { id: 1, title: "Brand Style Guide", description: "Complete guide for using your brand assets", size: "2.4 MB", link: "", category: "guide", active: true },
    { id: 2, title: "Marketing Toolkit", description: "Templates and graphics for your marketing campaigns", size: "5.1 MB", link: "https://example.com/marketing.pdf", category: "toolkit", active: true },
    { id: 3, title: "Product Photography Guidelines", description: "How to photograph your products for best results", size: "1.8 MB", link: "", category: "guide", active: false },
    { id: 4, title: "Sales Strategy Playbook", description: "Effective strategies for increasing sales", size: "3.2 MB", link: "https://example.com/sales.pdf", category: "playbook", active: true }
  ]);

  const [videoResources, setVideoResources] = useState([
    { id: 1, title: "Introduction to the Platform", duration: "4:32", link: "https://youtube.com/watch?v=example1", category: "tutorial", active: true },
    { id: 2, title: "Product Upload Tutorial", duration: "7:15", link: "", category: "tutorial", active: true },
    { id: 3, title: "Analyzing Your Sales Data", duration: "12:08", link: "https://vimeo.com/example3", category: "analysis", active: false },
    { id: 4, title: "Social Media Integration", duration: "9:45", link: "", category: "tips", active: true }
  ]);

  const [externalResources, setExternalResources] = useState([
    { id: 1, title: "Industry Trends Report", source: "Fashion Weekly", type: "article", link: "https://fashionweekly.com/trends", category: "trends", active: true },
    { id: 2, title: "E-commerce Best Practices", source: "Retail Insights", type: "webinar", link: "", category: "management", active: false },
    { id: 3, title: "Brand Growth Strategies", source: "Marketing Pros", type: "course", link: "https://marketingpros.com/courses/growth", category: "growth", active: true },
    { id: 4, title: "Supply Chain Management", source: "Business Daily", type: "article", link: "https://businessdaily.com/inventory", category: "supply", active: true }
  ]);

  // Function to open resource viewer
  const openResourceViewer = (resource: any, type: string) => {
    setCurrentResource({ ...resource, type });
    setIsViewDialogOpen(true);
  };

  // Function to open resource editor
  const openResourceEditor = (resource: any, type: string) => {
    setCurrentResource({ ...resource, type });
    setResourceLink(resource.link || "");
    setUploadedFile(null);
    setIsEditDialogOpen(true);
  };

  // Function to handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
      toast.success(`File selected: ${e.target.files[0].name}`);
    }
  };

  // Function to toggle resource active status
  const toggleResourceStatus = (resourceType: string, id: number) => {
    if (resourceType === 'pdf') {
      setPdfResources(pdfResources.map(resource => 
        resource.id === id ? { ...resource, active: !resource.active } : resource
      ));
      toast.success("Resource status updated");
    } else if (resourceType === 'video') {
      setVideoResources(videoResources.map(resource => 
        resource.id === id ? { ...resource, active: !resource.active } : resource
      ));
      toast.success("Resource status updated");
    } else if (resourceType === 'external') {
      setExternalResources(externalResources.map(resource => 
        resource.id === id ? { ...resource, active: !resource.active } : resource
      ));
      toast.success("Resource status updated");
    }
  };

  // Function to save edited resource
  const saveEditedResource = () => {
    if (!currentResource) return;

    const updatedResource = {
      ...currentResource,
      link: resourceLink
    };

    if (uploadedFile) {
      // In a real app, this would upload the file to a server
      updatedResource.size = `${(uploadedFile.size / (1024 * 1024)).toFixed(1)} MB`;
      toast.success(`File "${uploadedFile.name}" would be uploaded in a real application`);
    }

    if (currentResource.type === 'pdf') {
      setPdfResources(pdfResources.map(resource => 
        resource.id === currentResource.id ? updatedResource : resource
      ));
    } else if (currentResource.type === 'video') {
      setVideoResources(videoResources.map(resource => 
        resource.id === currentResource.id ? updatedResource : resource
      ));
    } else if (currentResource.type === 'external') {
      setExternalResources(externalResources.map(resource => 
        resource.id === currentResource.id ? updatedResource : resource
      ));
    }

    toast.success("Resource updated successfully");
    setIsEditDialogOpen(false);
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
        <h1 className="text-4xl md:text-6xl font-light tracking-tighter uppercase">Resources Management</h1>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
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
          <Button 
            className="bg-black text-white hover:bg-gray-800"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Button>
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
            Resource Requests
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
                      className={`flex justify-between items-center p-3 border rounded-none hover:border-black transition-colors hover:shadow-sm cursor-pointer group ${!resource.active ? "opacity-60" : ""}`}
                      onClick={() => openResourceViewer(resource, 'pdf')}
                    >
                      <div>
                        <h3 className="font-medium">{resource.title}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">{resource.description}</p>
                        <p className="text-xs text-gray-400 mt-0.5">Size: {resource.size}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); openResourceEditor(resource, 'pdf')}} title="Edit Resource">
                          <Pencil size={16} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={(e) => { e.stopPropagation(); toggleResourceStatus('pdf', resource.id)}} 
                          title={resource.active ? "Deactivate" : "Activate"}
                        >
                          {resource.active ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                        </Button>
                        <Button variant="outline" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity border-black">
                          <Download size={14} className="mr-1" />
                          Download
                        </Button>
                      </div>
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
                      className={`p-3 border rounded-none hover:border-black transition-colors hover:shadow-sm group ${!resource.active ? "opacity-60" : ""}`}
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
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">{resource.title}</h3>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" onClick={() => openResourceEditor(resource, 'video')} title="Edit Resource">
                            <Pencil size={16} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => toggleResourceStatus('video', resource.id)}
                            title={resource.active ? "Deactivate" : "Activate"}
                          >
                            {resource.active ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                          </Button>
                        </div>
                      </div>
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
                        className={`p-4 border rounded-none hover:border-black transition-colors cursor-pointer hover:shadow-sm flex flex-col h-full group ${!resource.active ? "opacity-60" : ""}`}
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
                        <div className="mt-auto pt-3 flex justify-between">
                          <Button 
                            variant="link" 
                            size="sm" 
                            className="text-xs flex items-center gap-1 text-black hover:underline p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <ExternalLink size={14} />
                            View Resource
                          </Button>
                          <div className="flex gap-1">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={(e) => { e.stopPropagation(); openResourceEditor(resource, 'external')}}
                              title="Edit Resource"
                            >
                              <Pencil size={16} />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={(e) => { e.stopPropagation(); toggleResourceStatus('external', resource.id)}} 
                              title={resource.active ? "Deactivate" : "Activate"}
                            >
                              {resource.active ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                            </Button>
                          </div>
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
                    className={`flex justify-between items-center p-3 border rounded-none hover:border-black transition-colors hover:shadow-sm cursor-pointer group ${!resource.active ? "opacity-60" : ""}`}
                    onClick={() => openResourceViewer(resource, 'pdf')}
                  >
                    <div>
                      <h3 className="font-medium">{resource.title}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">{resource.description}</p>
                      <p className="text-xs text-gray-400 mt-0.5">Size: {resource.size}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); openResourceEditor(resource, 'pdf')}} title="Edit Resource">
                        <Pencil size={16} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => { e.stopPropagation(); toggleResourceStatus('pdf', resource.id)}} 
                        title={resource.active ? "Deactivate" : "Activate"}
                      >
                        {resource.active ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                      </Button>
                      <Button variant="outline" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity border-black">
                        <Download size={14} className="mr-1" />
                        Download
                      </Button>
                    </div>
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
                      className={`p-3 border rounded-none hover:border-black transition-colors hover:shadow-sm group ${!resource.active ? "opacity-60" : ""}`}
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
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">{resource.title}</h3>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" onClick={() => openResourceEditor(resource, 'video')} title="Edit Resource">
                            <Pencil size={16} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => toggleResourceStatus('video', resource.id)}
                            title={resource.active ? "Deactivate" : "Activate"}
                          >
                            {resource.active ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                          </Button>
                        </div>
                      </div>
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
                      className={`p-4 border rounded-none hover:border-black transition-colors cursor-pointer hover:shadow-sm flex flex-col h-full group ${!resource.active ? "opacity-60" : ""}`}
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
                      <div className="mt-auto pt-3 flex justify-between">
                        <Button 
                          variant="link" 
                          size="sm" 
                          className="text-xs flex items-center gap-1 text-black hover:underline p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <ExternalLink size={14} />
                          View Resource
                        </Button>
                        <div className="flex gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={(e) => { e.stopPropagation(); openResourceEditor(resource, 'external')}}
                            title="Edit Resource"
                          >
                            <Pencil size={16} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={(e) => { e.stopPropagation(); toggleResourceStatus('external', resource.id)}} 
                            title={resource.active ? "Deactivate" : "Activate"}
                          >
                            {resource.active ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                          </Button>
                        </div>
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
              <CardTitle className="text-lg font-medium">Resource Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Example request items */}
                <div className="border rounded-none p-4 hover:border-black transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Product Photography Guide Request</h3>
                      <p className="text-sm text-gray-500 mt-1">Requested by: Brand XYZ</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs py-0.5 px-2 bg-accent-yellow text-gray-800">High Priority</span>
                        <span className="text-xs py-0.5 px-2 bg-accent-blue text-gray-800">Guide</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-black">
                      View Details
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600 mt-4 border-t pt-4">
                    We need updated product photography guidelines that include information on our new branding.
                  </p>
                </div>
                
                <div className="border rounded-none p-4 hover:border-black transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Video Tutorial on Season Changeover</h3>
                      <p className="text-sm text-gray-500 mt-1">Requested by: Department Store Inc.</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs py-0.5 px-2 bg-accent-mint text-gray-800">Medium Priority</span>
                        <span className="text-xs py-0.5 px-2 bg-accent-blue text-gray-800">Video</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-black">
                      View Details
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600 mt-4 border-t pt-4">
                    Could you create a video showing how to properly handle season inventory changeover in the platform?
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Add Resource Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Add New Resource</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="resourceType" className="text-right">Type</label>
              <select id="resourceType" className="col-span-3 p-2 border rounded-none border-gray-200">
                <option value="">Select resource type</option>
                <option value="pdf">PDF Document</option>
                <option value="video">Video Tutorial</option>
                <option value="external">External Resource</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="title" className="text-right">Title</label>
              <Input id="title" className="col-span-3 border-gray-200" placeholder="Resource title" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="description" className="text-right">Description</label>
              <textarea id="description" className="col-span-3 p-2 border border-gray-200 rounded-none h-20" placeholder="Resource description" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="documentUpload" className="text-right">Upload File</label>
              <div className="col-span-3 border-2 border-dashed border-gray-300 rounded-none p-4">
                <input 
                  type="file" 
                  id="documentUpload" 
                  className="hidden" 
                  onChange={handleFileChange}
                />
                <div className="text-center">
                  {uploadedFile ? (
                    <div className="flex flex-col items-center">
                      <FileText className="h-8 w-8 text-gray-500 mb-2" />
                      <p className="text-sm font-medium">{uploadedFile.name}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-2 border-gray-200"
                        onClick={() => document.getElementById('documentUpload')?.click()}
                      >
                        Change File
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="border-gray-200"
                        onClick={() => document.getElementById('documentUpload')?.click()}
                      >
                        Select File
                      </Button>
                      <p className="text-xs text-gray-500 mt-2">or drag and drop</p>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right">Share With</label>
              <div className="col-span-3 flex gap-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked /> Brands
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked /> Buyers
                </label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" className="border-gray-200" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button type="submit" className="bg-black text-white hover:bg-gray-800" onClick={() => {
              toast.success("Resource added successfully");
              setIsAddDialogOpen(false);
            }}>
              Add Resource
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Resource Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Edit Resource</DialogTitle>
          </DialogHeader>
          {currentResource && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="editTitle" className="text-right">Title</label>
                <Input 
                  id="editTitle" 
                  className="col-span-3 border-gray-200" 
                  defaultValue={currentResource.title} 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="editDescription" className="text-right">Description</label>
                <textarea 
                  id="editDescription" 
                  className="col-span-3 p-2 border border-gray-200 rounded-none h-20" 
                  defaultValue={currentResource.description || ''} 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="resourceLink" className="text-right">Resource Link</label>
                <Input
                  id="resourceLink"
                  className="col-span-3 border-gray-200"
                  placeholder="https://example.com/resource"
                  value={resourceLink}
                  onChange={(e) => setResourceLink(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="documentUpload" className="text-right">Upload Document</label>
                <div className="col-span-3 border-2 border-dashed border-gray-300 rounded-none p-4">
                  <input 
                    type="file" 
                    id="documentUpload" 
                    className="hidden" 
                    onChange={handleFileChange}
                  />
                  <div className="text-center">
                    {uploadedFile ? (
                      <div className="flex flex-col items-center">
                        <FileText className="h-8 w-8 text-gray-500 mb-2" />
                        <p className="text-sm font-medium">{uploadedFile.name}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-2 border-gray-200"
                          onClick={() => document.getElementById('documentUpload')?.click()}
                        >
                          Change File
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Button 
                          type="button" 
                          variant="outline"
                          className="border-gray-200"
                          onClick={() => document.getElementById('documentUpload')?.click()}
                        >
                          Select File
                        </Button>
                        <p className="text-xs text-gray-500 mt-2">or drag and drop</p>
                        {currentResource?.size && (
                          <p className="text-xs text-gray-500 mt-1">
                            Current file size: {currentResource.size}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right">Status</label>
                <div className="col-span-3">
                  <label className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      checked={currentResource.active} 
                      onChange={() => setCurrentResource({...currentResource, active: !currentResource.active})}
                    /> Active
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right">Share With</label>
                <div className="col-span-3 flex gap-4">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked /> Brands
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked /> Buyers
                  </label>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" className="border-gray-200" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button type="submit" className="bg-black text-white hover:bg-gray-800" onClick={saveEditedResource}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
              <div className="mt-4">
                <h3 className="font-medium">Details:</h3>
                <p className="text-gray-600 mt-2">{currentResource.description || "No description available."}</p>
                {currentResource.category && (
                  <p className="text-xs text-gray-500 mt-2">Category: {currentResource.category}</p>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  Status: <span className={currentResource.active ? "text-green-600 font-medium" : "text-gray-600"}>{currentResource.active ? "Active" : "Inactive"}</span>
                </p>
                {currentResource.link && (
                  <p className="text-sm text-gray-500 mt-2">
                    Link: <a href={currentResource.link} target="_blank" rel="noopener noreferrer" className="text-black hover:underline">{currentResource.link}</a>
                  </p>
                )}
              </div>
            )}
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" className="border-gray-200" onClick={() => setIsViewDialogOpen(false)}>Close</Button>
            <Button 
              variant="outline" 
              className="border-black" 
              onClick={() => {
                setIsViewDialogOpen(false);
                setTimeout(() => openResourceEditor(currentResource, currentResource.type), 100);
              }}
            >
              Edit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminResources;
