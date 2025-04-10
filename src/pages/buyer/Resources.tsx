
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Youtube, Book, Download, ExternalLink, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

const BuyerResources = () => {
  // State for dialogs
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [currentResource, setCurrentResource] = useState<any>(null);

  // Sample resources
  const pdfResources = [
    { id: 1, title: "Buyer's Guide", description: "Complete guide for using the buyer platform", size: "2.4 MB" },
    { id: 2, title: "Ordering Toolkit", description: "Templates and guides for your ordering process", size: "5.1 MB" },
    { id: 3, title: "Product Selection Guidelines", description: "How to select products for your store", size: "1.8 MB" },
    { id: 4, title: "Merchandising Playbook", description: "Effective strategies for merchandising", size: "3.2 MB" }
  ];

  const videoResources = [
    { id: 1, title: "Introduction to the Buyer Platform", duration: "4:32" },
    { id: 2, title: "Order Placement Tutorial", duration: "7:15" },
    { id: 3, title: "Analyzing Your Inventory Data", duration: "12:08" },
    { id: 4, title: "Visual Merchandising Tips", duration: "9:45" }
  ];

  const externalResources = [
    { id: 1, title: "Retail Trends Report", source: "Fashion Weekly", type: "article" },
    { id: 2, title: "Store Management Best Practices", source: "Retail Insights", type: "webinar" },
    { id: 3, title: "Buyer Growth Strategies", source: "Marketing Pros", type: "course" },
    { id: 4, title: "Inventory Management", source: "Business Daily", type: "article" }
  ];

  // Function to open resource viewer
  const openResourceViewer = (resource: any, type: string) => {
    setCurrentResource({ ...resource, type });
    setIsViewDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-4xl md:text-6xl uppercase font-thin mb-6">Resources</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <FileText className="h-5 w-5" />
              PDF Resources
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pdfResources.map((resource) => (
              <div 
                key={resource.id}
                className="flex justify-between items-center p-3 border rounded-md hover:border-blue-500 transition-colors hover:shadow-sm cursor-pointer"
                onClick={() => openResourceViewer(resource, 'pdf')}
              >
                <div>
                  <h3 className="font-medium">{resource.title}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{resource.description}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Size: {resource.size}</p>
                </div>
                <Button variant="ghost" size="sm" className="px-2 py-1 bg-gray-100 rounded flex items-center gap-1">
                  <Download size={14} />
                  Download
                </Button>
              </div>
            ))}
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
                className="p-3 border rounded-md hover:border-blue-500 transition-colors hover:shadow-sm"
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
                <h3 className="font-medium">{resource.title}</h3>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-xs text-gray-500">{resource.duration}</p>
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="text-xs text-blue-500 p-0"
                    onClick={() => openResourceViewer(resource, 'video')}
                  >
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
                  className="p-4 border rounded-md hover:border-blue-500 transition-colors cursor-pointer hover:shadow-sm flex flex-col h-full"
                  onClick={() => openResourceViewer(resource, 'external')}
                >
                  <div className="h-10 w-10 bg-black-100 rounded-md flex items-center justify-center mb-3 text-blue-800">
                    {resource.type === 'article' && <FileText />}
                    {resource.type === 'webinar' && <Youtube />}
                    {resource.type === 'course' && <Book />}
                  </div>
                  <h3 className="font-medium">{resource.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">Source: {resource.source}</p>
                  <p className="text-xs text-blue-500 mt-1 capitalize">{resource.type}</p>
                  <div className="mt-auto pt-3">
                    <Button variant="link" size="sm" className="text-xs flex items-center gap-1 text-blue-600 hover:underline p-0">
                      <ExternalLink size={14} />
                      View Resource
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="border border-gray-200 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Request Custom Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Resource Type
                </label>
                <select className="w-full p-2 border border-gray-200 rounded">
                  <option value="">Select resource type</option>
                  <option value="guide">Product Guide</option>
                  <option value="template">Marketing Template</option>
                  <option value="tutorial">Video Tutorial</option>
                  <option value="custom">Custom Request</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description of Request
                </label>
                <textarea 
                  className="w-full p-2 border border-gray-200 rounded h-24"
                  placeholder="Please describe what you're looking for..."
                ></textarea>
              </div>
              
              <div className="flex justify-end">
                <Button type="submit" className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
                  Submit Request
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      
      {/* View Resource Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[725px] max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>{currentResource?.title}</DialogTitle>
          </DialogHeader>
          <div className="py-4 overflow-y-auto">
            {currentResource?.type === 'pdf' && (
              <div className="border rounded p-4">
                <div className="bg-gray-100 h-[400px] rounded flex items-center justify-center">
                  <div className="text-center">
                    <FileText className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-gray-500">PDF Preview</p>
                    <Button className="mt-4">
                      <Download className="mr-2 h-4 w-4" /> Download PDF
                    </Button>
                  </div>
                </div>
              </div>
            )}
            {currentResource?.type === 'video' && (
              <div className="border rounded p-4">
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
              </div>
            )}
            {currentResource?.type === 'external' && (
              <div className="border rounded p-4">
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
              </div>
            )}
            {currentResource && (
              <div className="mt-4">
                <h3 className="font-semibold">Description:</h3>
                <p className="text-gray-600 mt-2">{currentResource.description || "No description available."}</p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BuyerResources;
