
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Youtube, Book, Download, ExternalLink, Play, Search, Filter, ArrowUpDown, Eye, Edit, ToggleRight, ToggleLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

const Resources = () => {
  // State for dialogs and filtering
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentResource, setCurrentResource] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [resourceLink, setResourceLink] = useState<string>("");
  const [activeTab, setActiveTab] = useState("all");
  const [filterVisible, setFilterVisible] = useState(false);

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
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-medium mb-2">Resources</h1>
        <p className="text-muted-foreground text-sm">
          Manage and organize brand resources, guides, and educational materials.
        </p>
      </div>

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
            value="request" 
            className="data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none rounded-none px-6 py-2"
          >
            Resource Requests
          </TabsTrigger>
        </TabsList>

        <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center pb-4 border-b border-gray-200 mt-4">
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
                <div>
                  <label className="text-sm font-medium mb-1 block">Status</label>
                  <select className="w-full p-2 border rounded-md border-gray-200">
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <Button variant="outline" className="border-gray-200 mr-2">Clear</Button>
                <Button className="bg-black text-white hover:bg-gray-800">Apply Filters</Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        <TabsContent value="all" className="mt-6 space-y-6">
          <Card className="border-gray-200">
            <CardHeader className="border-b border-gray-100 pb-3">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <FileText className="h-5 w-5" />
                PDF Documents
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40%]">Document Title <ArrowUpDown className="h-4 w-4 inline ml-1" /></TableHead>
                    <TableHead className="w-[20%]">Category</TableHead>
                    <TableHead className="w-[15%]">Size</TableHead>
                    <TableHead className="w-[10%]">Status</TableHead>
                    <TableHead className="text-right w-[15%]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPdfResources.length > 0 ? (
                    filteredPdfResources.map((resource) => (
                      <TableRow 
                        key={resource.id} 
                        className={!resource.active ? "opacity-60" : ""}
                      >
                        <TableCell>
                          <div className="font-medium">{resource.title}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{resource.description}</div>
                        </TableCell>
                        <TableCell className="capitalize">{resource.category}</TableCell>
                        <TableCell>{resource.size}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 text-xs rounded ${resource.active ? "bg-gray-100" : "bg-gray-50"}`}>
                            {resource.active ? "Active" : "Inactive"}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" onClick={() => openResourceViewer(resource, 'pdf')} title="View">
                              <Eye size={16} />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => openResourceEditor(resource, 'pdf')} title="Edit">
                              <Edit size={16} />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => toggleResourceStatus('pdf', resource.id)} 
                              title={resource.active ? "Deactivate" : "Activate"}
                            >
                              {resource.active ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                        No PDF resources found matching your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <Card className="border-gray-200">
            <CardHeader className="border-b border-gray-100 pb-3">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Youtube className="h-5 w-5" />
                Video Tutorials
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40%]">Video Title <ArrowUpDown className="h-4 w-4 inline ml-1" /></TableHead>
                    <TableHead className="w-[20%]">Category</TableHead>
                    <TableHead className="w-[15%]">Duration</TableHead>
                    <TableHead className="w-[10%]">Status</TableHead>
                    <TableHead className="text-right w-[15%]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVideoResources.length > 0 ? (
                    filteredVideoResources.map((resource) => (
                      <TableRow 
                        key={resource.id} 
                        className={!resource.active ? "opacity-60" : ""}
                      >
                        <TableCell>
                          <div className="font-medium">{resource.title}</div>
                        </TableCell>
                        <TableCell className="capitalize">{resource.category}</TableCell>
                        <TableCell>{resource.duration}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 text-xs rounded ${resource.active ? "bg-gray-100" : "bg-gray-50"}`}>
                            {resource.active ? "Active" : "Inactive"}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" onClick={() => openResourceViewer(resource, 'video')} title="View">
                              <Eye size={16} />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => openResourceEditor(resource, 'video')} title="Edit">
                              <Edit size={16} />
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
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                        No video resources found matching your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <Card className="border-gray-200">
            <CardHeader className="border-b border-gray-100 pb-3">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Book className="h-5 w-5" />
                External Resources
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[35%]">Title <ArrowUpDown className="h-4 w-4 inline ml-1" /></TableHead>
                    <TableHead className="w-[20%]">Source</TableHead>
                    <TableHead className="w-[15%]">Type</TableHead>
                    <TableHead className="w-[10%]">Category</TableHead>
                    <TableHead className="w-[10%]">Status</TableHead>
                    <TableHead className="text-right w-[10%]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredExternalResources.length > 0 ? (
                    filteredExternalResources.map((resource) => (
                      <TableRow 
                        key={resource.id} 
                        className={!resource.active ? "opacity-60" : ""}
                      >
                        <TableCell>
                          <div className="font-medium">{resource.title}</div>
                        </TableCell>
                        <TableCell>{resource.source}</TableCell>
                        <TableCell className="capitalize">{resource.type}</TableCell>
                        <TableCell className="capitalize">{resource.category}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 text-xs rounded ${resource.active ? "bg-gray-100" : "bg-gray-50"}`}>
                            {resource.active ? "Active" : "Inactive"}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" onClick={() => openResourceViewer(resource, 'external')} title="View">
                              <Eye size={16} />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => openResourceEditor(resource, 'external')} title="Edit">
                              <Edit size={16} />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => toggleResourceStatus('external', resource.id)} 
                              title={resource.active ? "Deactivate" : "Activate"}
                            >
                              {resource.active ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                        No external resources found matching your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents" className="mt-6">
          <Card className="border-gray-200">
            <CardHeader className="border-b border-gray-100 pb-3">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <FileText className="h-5 w-5" />
                PDF Documents
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40%]">Document Title <ArrowUpDown className="h-4 w-4 inline ml-1" /></TableHead>
                    <TableHead className="w-[20%]">Category</TableHead>
                    <TableHead className="w-[15%]">Size</TableHead>
                    <TableHead className="w-[10%]">Status</TableHead>
                    <TableHead className="text-right w-[15%]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPdfResources.length > 0 ? (
                    filteredPdfResources.map((resource) => (
                      <TableRow 
                        key={resource.id} 
                        className={!resource.active ? "opacity-60" : ""}
                      >
                        <TableCell>
                          <div className="font-medium">{resource.title}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{resource.description}</div>
                        </TableCell>
                        <TableCell className="capitalize">{resource.category}</TableCell>
                        <TableCell>{resource.size}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 text-xs rounded ${resource.active ? "bg-gray-100" : "bg-gray-50"}`}>
                            {resource.active ? "Active" : "Inactive"}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" onClick={() => openResourceViewer(resource, 'pdf')} title="View">
                              <Eye size={16} />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => openResourceEditor(resource, 'pdf')} title="Edit">
                              <Edit size={16} />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => toggleResourceStatus('pdf', resource.id)} 
                              title={resource.active ? "Deactivate" : "Activate"}
                            >
                              {resource.active ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                        No PDF resources found matching your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="videos" className="mt-6">
          <Card className="border-gray-200">
            <CardHeader className="border-b border-gray-100 pb-3">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Youtube className="h-5 w-5" />
                Video Tutorials
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40%]">Video Title <ArrowUpDown className="h-4 w-4 inline ml-1" /></TableHead>
                    <TableHead className="w-[20%]">Category</TableHead>
                    <TableHead className="w-[15%]">Duration</TableHead>
                    <TableHead className="w-[10%]">Status</TableHead>
                    <TableHead className="text-right w-[15%]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVideoResources.length > 0 ? (
                    filteredVideoResources.map((resource) => (
                      <TableRow 
                        key={resource.id} 
                        className={!resource.active ? "opacity-60" : ""}
                      >
                        <TableCell>
                          <div className="font-medium">{resource.title}</div>
                        </TableCell>
                        <TableCell className="capitalize">{resource.category}</TableCell>
                        <TableCell>{resource.duration}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 text-xs rounded ${resource.active ? "bg-gray-100" : "bg-gray-50"}`}>
                            {resource.active ? "Active" : "Inactive"}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" onClick={() => openResourceViewer(resource, 'video')} title="View">
                              <Eye size={16} />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => openResourceEditor(resource, 'video')} title="Edit">
                              <Edit size={16} />
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
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                        No video resources found matching your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="external" className="mt-6">
          <Card className="border-gray-200">
            <CardHeader className="border-b border-gray-100 pb-3">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Book className="h-5 w-5" />
                External Resources
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[35%]">Title <ArrowUpDown className="h-4 w-4 inline ml-1" /></TableHead>
                    <TableHead className="w-[20%]">Source</TableHead>
                    <TableHead className="w-[15%]">Type</TableHead>
                    <TableHead className="w-[10%]">Category</TableHead>
                    <TableHead className="w-[10%]">Status</TableHead>
                    <TableHead className="text-right w-[10%]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredExternalResources.length > 0 ? (
                    filteredExternalResources.map((resource) => (
                      <TableRow 
                        key={resource.id} 
                        className={!resource.active ? "opacity-60" : ""}
                      >
                        <TableCell>
                          <div className="font-medium">{resource.title}</div>
                        </TableCell>
                        <TableCell>{resource.source}</TableCell>
                        <TableCell className="capitalize">{resource.type}</TableCell>
                        <TableCell className="capitalize">{resource.category}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 text-xs rounded ${resource.active ? "bg-gray-100" : "bg-gray-50"}`}>
                            {resource.active ? "Active" : "Inactive"}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" onClick={() => openResourceViewer(resource, 'external')} title="View">
                              <Eye size={16} />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => openResourceEditor(resource, 'external')} title="Edit">
                              <Edit size={16} />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => toggleResourceStatus('external', resource.id)} 
                              title={resource.active ? "Deactivate" : "Activate"}
                            >
                              {resource.active ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                        No external resources found matching your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="request" className="mt-6">
          <Card className="border-gray-200">
            <CardHeader className="border-b border-gray-100 pb-3">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                Resource Requests
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[30%]">Request Title</TableHead>
                    <TableHead className="w-[20%]">Requested By</TableHead>
                    <TableHead className="w-[15%]">Resource Type</TableHead>
                    <TableHead className="w-[15%]">Priority</TableHead>
                    <TableHead className="w-[10%]">Status</TableHead>
                    <TableHead className="text-right w-[10%]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Product Photography Guide Request</div>
                    </TableCell>
                    <TableCell>Brand XYZ</TableCell>
                    <TableCell>Guide</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 text-xs rounded bg-gray-100">
                        High
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="px-2 py-1 text-xs rounded bg-gray-100">
                        Pending
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" className="border-gray-200">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Video Tutorial on Season Changeover</div>
                    </TableCell>
                    <TableCell>Department Store Inc.</TableCell>
                    <TableCell>Video</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 text-xs rounded bg-gray-100">
                        Medium
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="px-2 py-1 text-xs rounded bg-gray-50">
                        In Progress
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" className="border-gray-200">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
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
                  <dt className="text-sm font-medium">Status:</dt>
                  <dd className="text-sm">
                    <span className={`inline-flex items-center ${currentResource.active ? "text-green-600" : "text-gray-600"}`}>
                      {currentResource.active ? <ToggleRight className="mr-1 h-4 w-4" /> : <ToggleLeft className="mr-1 h-4 w-4" />}
                      {currentResource.active ? "Active" : "Inactive"}
                    </span>
                  </dd>
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

export default Resources;
