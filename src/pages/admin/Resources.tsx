import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Youtube, Book, Download, ExternalLink, Play, Plus, Pencil, Eye, ToggleLeft, ToggleRight, Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const AdminResources = () => {
  // State management
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [currentResource, setCurrentResource] = useState<any>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [resourceLink, setResourceLink] = useState<string>("");

  // Sample resources - in a real application, these would come from a database/API
  const [pdfResources, setPdfResources] = useState([
    { id: 1, title: "Brand Style Guide", description: "Complete guide for using your brand assets", size: "2.4 MB", active: true, link: "" },
    { id: 2, title: "Marketing Toolkit", description: "Templates and graphics for your marketing campaigns", size: "5.1 MB", active: true, link: "https://example.com/marketing" },
    { id: 3, title: "Product Photography Guidelines", description: "How to photograph your products for best results", size: "1.8 MB", active: false, link: "" },
    { id: 4, title: "Sales Strategy Playbook", description: "Effective strategies for increasing sales", size: "3.2 MB", active: true, link: "https://example.com/sales" }
  ]);

  const [videoResources, setVideoResources] = useState([
    { id: 1, title: "Introduction to the Platform", duration: "4:32", active: true, link: "https://youtube.com/watch?v=123" },
    { id: 2, title: "Product Upload Tutorial", duration: "7:15", active: true, link: "" },
    { id: 3, title: "Analyzing Your Sales Data", duration: "12:08", active: false, link: "https://vimeo.com/123456" },
    { id: 4, title: "Social Media Integration", duration: "9:45", active: true, link: "" }
  ]);

  const [externalResources, setExternalResources] = useState([
    { id: 1, title: "Industry Trends Report", source: "Fashion Weekly", type: "article", active: true, link: "https://fashionweekly.com/trends" },
    { id: 2, title: "E-commerce Best Practices", source: "Retail Insights", type: "webinar", active: false, link: "" },
    { id: 3, title: "Brand Growth Strategies", source: "Marketing Pros", type: "course", active: true, link: "https://marketingpros.com/courses/brand-growth" },
    { id: 4, title: "Supply Chain Management", source: "Business Daily", type: "article", active: true, link: "" }
  ]);

  // Function to toggle resource active status
  const toggleResourceStatus = (resourceType: string, id: number) => {
    if (resourceType === 'pdf') {
      setPdfResources(pdfResources.map(resource => 
        resource.id === id ? { ...resource, active: !resource.active } : resource
      ));
    } else if (resourceType === 'video') {
      setVideoResources(videoResources.map(resource => 
        resource.id === id ? { ...resource, active: !resource.active } : resource
      ));
    } else if (resourceType === 'external') {
      setExternalResources(externalResources.map(resource => 
        resource.id === id ? { ...resource, active: !resource.active } : resource
      ));
    }
  };

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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl md:text-6xl uppercase font-thin mb-6">Resources Management</h1>
        <Button 
          className="bg-black text-white hover:bg-gray-800"
          onClick={() => setIsAddDialogOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New Resource
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <FileText className="h-5 w-5" />
              PDF Resources
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pdfResources.map((resource) => (
                  <TableRow key={resource.id} className={!resource.active ? "opacity-60" : ""}>
                    <TableCell className="font-medium cursor-pointer" onClick={() => openResourceViewer(resource, 'pdf')}>
                      {resource.title}
                    </TableCell>
                    <TableCell>{resource.size}</TableCell>
                    <TableCell>{resource.active ? "Active" : "Inactive"}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => openResourceViewer(resource, 'pdf')} title="View Resource">
                          <Eye size={16} />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => openResourceEditor(resource, 'pdf')} title="Edit Resource">
                          <Pencil size={16} />
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
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Youtube className="h-5 w-5" />
              Video Tutorials
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {videoResources.map((resource) => (
              <div 
                key={resource.id}
                className={`p-3 border rounded-md hover:border-blue-500 transition-colors hover:shadow-sm ${!resource.active ? "opacity-60" : ""}`}
              >
                <div 
                  className="relative w-full h-32 bg-gray-100 rounded-md mb-2 overflow-hidden cursor-pointer"
                  onClick={() => openResourceViewer(resource, 'video')}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-12 w-12 rounded-full bg-white/80 flex items-center justify-center shadow-sm">
                      <Play size={20} className="text-blue-500 ml-1" />
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
                  <Button variant="link" size="sm" className="text-xs text-blue-500 p-0" onClick={() => openResourceViewer(resource, 'video')}>
                    Watch Now
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        
        <Card className="border border-gray-200 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Book className="h-5 w-5" />
              External Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {externalResources.map((resource) => (
                <div 
                  key={resource.id}
                  className={`p-4 border rounded-md hover:border-blue-500 transition-colors cursor-pointer hover:shadow-sm flex flex-col h-full ${!resource.active ? "opacity-60" : ""}`}
                >
                  <div className="h-10 w-10 bg-black-100 rounded-md flex items-center justify-center mb-3 text-blue-800">
                    {resource.type === 'article' && <FileText />}
                    {resource.type === 'webinar' && <Youtube />}
                    {resource.type === 'course' && <Book />}
                  </div>
                  <h3 className="font-medium">{resource.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">Source: {resource.source}</p>
                  <p className="text-xs text-blue-500 mt-1 capitalize">{resource.type}</p>
                  <div className="mt-auto pt-3 flex justify-between">
                    <Button variant="link" size="sm" className="text-xs flex items-center gap-1 text-blue-600 hover:underline p-0" onClick={() => openResourceViewer(resource, 'external')}>
                      <ExternalLink size={14} />
                      View
                    </Button>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => openResourceEditor(resource, 'external')} title="Edit Resource">
                        <Pencil size={16} />
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
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Resource Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Add New Resource</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="resourceType" className="text-right">Type</label>
              <select id="resourceType" className="col-span-3 p-2 border rounded">
                <option value="">Select resource type</option>
                <option value="pdf">PDF Document</option>
                <option value="video">Video Tutorial</option>
                <option value="external">External Resource</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="title" className="text-right">Title</label>
              <input id="title" className="col-span-3 p-2 border rounded" placeholder="Resource title" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="description" className="text-right">Description</label>
              <textarea id="description" className="col-span-3 p-2 border rounded h-20" placeholder="Resource description" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="file" className="text-right">File</label>
              <div className="col-span-3 border-2 border-dashed border-gray-300 rounded-md p-4">
                <input type="file" id="file" className="hidden" />
                <div className="text-center">
                  <Button type="button" variant="outline" onClick={() => document.getElementById('file')?.click()}>
                    Select File
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">or drag and drop</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right">Share With</label>
              <div className="col-span-3 flex gap-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" /> Brands
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" /> Buyers
                </label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button type="submit" onClick={() => setIsAddDialogOpen(false)}>Add Resource</Button>
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
                  className="col-span-3" 
                  defaultValue={currentResource.title} 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="editDescription" className="text-right">Description</label>
                <Textarea 
                  id="editDescription" 
                  className="col-span-3" 
                  defaultValue={currentResource.description || ''} 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="resourceLink" className="text-right">Resource Link</label>
                <div className="col-span-3 flex items-center">
                  <Link className="mr-2 text-gray-500" size={18} />
                  <Input
                    id="resourceLink"
                    placeholder="https://example.com/resource"
                    value={resourceLink}
                    onChange={(e) => setResourceLink(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="documentUpload" className="text-right">Upload Document</label>
                <div className="col-span-3 border-2 border-dashed border-gray-300 rounded-md p-4">
                  <input 
                    type="file" 
                    id="documentUpload" 
                    className="hidden" 
                    onChange={handleFileChange}
                  />
                  <div className="text-center">
                    {uploadedFile ? (
                      <div className="flex flex-col items-center">
                        <FileText className="h-8 w-8 text-blue-500 mb-2" />
                        <p className="text-sm font-medium">{uploadedFile.name}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-2"
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
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button type="submit" onClick={saveEditedResource}>Save Changes</Button>
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
              <div className="border rounded p-4">
                {currentResource.link ? (
                  <iframe 
                    src={currentResource.link} 
                    className="w-full h-[400px] rounded"
                    title={currentResource.title}
                  ></iframe>
                ) : (
                  <div className="bg-gray-100 h-[400px] rounded flex items-center justify-center">
                    <div className="text-center">
                      <FileText className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-gray-500">PDF Preview</p>
                      <Button className="mt-4">
                        <Download className="mr-2 h-4 w-4" /> Download PDF
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
            {currentResource?.type === 'video' && (
              <div className="border rounded p-4">
                {currentResource.link && currentResource.link.includes('youtube') ? (
                  <iframe 
                    src={currentResource.link.replace('watch?v=', 'embed/')} 
                    className="w-full h-[400px] rounded" 
                    title={currentResource.title}
                    allowFullScreen
                  ></iframe>
                ) : currentResource.link && currentResource.link.includes('vimeo') ? (
                  <iframe 
                    src={currentResource.link.replace('vimeo.com/', 'player.vimeo.com/video/')} 
                    className="w-full h-[400px] rounded"
                    title={currentResource.title}
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div className="bg-gray-100 h-[400px] rounded flex items-center justify-center">
                    <div className="text-center">
                      <Youtube className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-gray-500">Video Player</p>
                      <div className="mt-4 flex justify-center">
                        <Button>
                          <Play className="mr-2 h-4 w-4" /> Play Video
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            {currentResource?.type === 'external' && (
              <div className="border rounded p-4">
                {currentResource.link ? (
                  <div className="w-full h-[400px] rounded bg-gray-50 p-4">
                    <div className="flex justify-between mb-4">
                      <h3 className="font-medium">{currentResource.title}</h3>
                      <Button variant="outline" size="sm" onClick={() => window.open(currentResource.link, '_blank')}>
                        <ExternalLink size={14} className="mr-1" /> Open
                      </Button>
                    </div>
                    <iframe 
                      src={currentResource.link} 
                      className="w-full h-[320px] rounded border"
                      title={currentResource.title}
                    ></iframe>
                  </div>
                ) : (
                  <div className="bg-gray-100 h-[400px] rounded flex items-center justify-center">
                    <div className="text-center">
                      {currentResource.type === 'article' && <FileText className="mx-auto h-12 w-12 text-gray-400" />}
                      {currentResource.type === 'webinar' && <Youtube className="mx-auto h-12 w-12 text-gray-400" />}
                      {currentResource.type === 'course' && <Book className="mx-auto h-12 w-12 text-gray-400" />}
                      <p className="mt-2 text-gray-500">{currentResource.type} from {currentResource.source}</p>
                      <Button className="mt-4">
                        <ExternalLink className="mr-2 h-4 w-4" /> Open External Resource
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
            {currentResource && (
              <div className="mt-4">
                <h3 className="font-semibold">Description:</h3>
                <p className="text-gray-600 mt-2">{currentResource.description || "No description available."}</p>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    Status: <span className={currentResource.active ? "text-green-600 font-medium" : "text-gray-600"}>{currentResource.active ? "Active" : "Inactive"}</span>
                  </p>
                  {currentResource.link && (
                    <p className="text-sm text-gray-500 mt-1">
                      Link: <a href={currentResource.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{currentResource.link}</a>
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>Close</Button>
            <Button variant="outline" onClick={() => {
              setIsViewDialogOpen(false);
              setIsEditDialogOpen(true);
            }}>Edit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminResources;
