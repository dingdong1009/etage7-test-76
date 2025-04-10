
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Youtube, Book, Download, ExternalLink, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminResources = () => {
  // Sample resources - in a real application, these would come from a database/API
  const pdfResources = [
    { id: 1, title: "Brand Style Guide", description: "Complete guide for using your brand assets", size: "2.4 MB" },
    { id: 2, title: "Marketing Toolkit", description: "Templates and graphics for your marketing campaigns", size: "5.1 MB" },
    { id: 3, title: "Product Photography Guidelines", description: "How to photograph your products for best results", size: "1.8 MB" },
    { id: 4, title: "Sales Strategy Playbook", description: "Effective strategies for increasing sales", size: "3.2 MB" }
  ];

  const videoResources = [
    { id: 1, title: "Introduction to the Platform", duration: "4:32" },
    { id: 2, title: "Product Upload Tutorial", duration: "7:15" },
    { id: 3, title: "Analyzing Your Sales Data", duration: "12:08" },
    { id: 4, title: "Social Media Integration", duration: "9:45" }
  ];

  const externalResources = [
    { id: 1, title: "Industry Trends Report", source: "Fashion Weekly", type: "article" },
    { id: 2, title: "E-commerce Best Practices", source: "Retail Insights", type: "webinar" },
    { id: 3, title: "Brand Growth Strategies", source: "Marketing Pros", type: "course" },
    { id: 4, title: "Supply Chain Management", source: "Business Daily", type: "article" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl md:text-6xl uppercase font-thin mb-6">Resources Management</h1>
        <Button className="bg-black text-white hover:bg-gray-800">
          Add New Resource
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
            {pdfResources.map((resource) => (
              <div 
                key={resource.id}
                className="flex justify-between items-center p-3 border rounded-md hover:border-blue-500 transition-colors cursor-pointer hover:shadow-sm"
              >
                <div>
                  <h3 className="font-medium">{resource.title}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{resource.description}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Size: {resource.size}</p>
                </div>
                <div className="flex gap-2">
                  <button className="text-xs px-2 py-1 bg-gray-100 rounded flex items-center gap-1">
                    <Download size={14} />
                    Download
                  </button>
                  <button className="text-xs px-2 py-1 bg-gray-100 rounded flex items-center gap-1">
                    Edit
                  </button>
                  <button className="text-xs px-2 py-1 bg-red-50 text-red-500 rounded flex items-center gap-1">
                    Delete
                  </button>
                </div>
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
                className="p-3 border rounded-md hover:border-blue-500 transition-colors cursor-pointer hover:shadow-sm"
              >
                <div className="relative w-full h-32 bg-gray-100 rounded-md mb-2 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-12 w-12 rounded-full bg-white/80 flex items-center justify-center shadow-sm">
                      <Play size={20} className="text-blue-500 ml-1" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{resource.title}</h3>
                  <div className="flex gap-2">
                    <button className="text-xs px-2 py-1 bg-gray-100 rounded">
                      Edit
                    </button>
                    <button className="text-xs px-2 py-1 bg-red-50 text-red-500 rounded">
                      Delete
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-xs text-gray-500">{resource.duration}</p>
                  <button className="text-xs text-blue-500">Watch Now</button>
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
                    <button className="text-xs flex items-center gap-1 text-blue-600 hover:underline">
                      <ExternalLink size={14} />
                      View Resource
                    </button>
                    <div className="flex gap-1">
                      <button className="text-xs px-2 py-1 bg-gray-100 rounded">
                        Edit
                      </button>
                      <button className="text-xs px-2 py-1 bg-red-50 text-red-500 rounded">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="border border-gray-200 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Add New Resource</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Resource Type
                </label>
                <select className="w-full p-2 border border-gray-200 rounded">
                  <option value="">Select resource type</option>
                  <option value="pdf">PDF Document</option>
                  <option value="video">Video Tutorial</option>
                  <option value="external">External Resource</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input 
                  type="text"
                  className="w-full p-2 border border-gray-200 rounded"
                  placeholder="Resource title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea 
                  className="w-full p-2 border border-gray-200 rounded h-24"
                  placeholder="Resource description..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  File Upload
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
                  <p className="text-sm text-gray-500">Drag and drop your file here, or click to browse</p>
                  <input type="file" className="hidden" id="fileUpload" />
                  <button 
                    type="button" 
                    className="mt-2 px-4 py-2 bg-gray-100 rounded text-sm"
                    onClick={() => document.getElementById('fileUpload')?.click()}
                  >
                    Browse Files
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Share With
                </label>
                <div className="flex gap-4 mt-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="shareBrands" className="mr-2" />
                    <label htmlFor="shareBrands">Brands</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="shareBuyers" className="mr-2" />
                    <label htmlFor="shareBuyers">Buyers</label>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button type="submit" className="px-4 py-2 bg-black text-white rounded hover:bg-black-600">
                  Add Resource
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminResources;
