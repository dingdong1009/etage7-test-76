
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Youtube, Book, Download, ExternalLink, Play } from "lucide-react";

const BrandResources = () => {
  // Sample resources
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
                className="flex justify-between items-center p-3 border rounded-md hover:border-blue-500 transition-colors cursor-pointer hover:shadow-sm"
              >
                <div>
                  <h3 className="font-medium">{resource.title}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{resource.description}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Size: {resource.size}</p>
                </div>
                <button className="text-xs px-2 py-1 bg-gray-100 rounded flex items-center gap-1">
                  <Download size={14} />
                  Download
                </button>
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
                <h3 className="font-medium">{resource.title}</h3>
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
                  <div className="h-10 w-10 bg-blue-100 rounded-md flex items-center justify-center mb-3 text-blue-800">
                    {resource.type === 'article' && <FileText />}
                    {resource.type === 'webinar' && <Youtube />}
                    {resource.type === 'course' && <Book />}
                  </div>
                  <h3 className="font-medium">{resource.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">Source: {resource.source}</p>
                  <p className="text-xs text-blue-500 mt-1 capitalize">{resource.type}</p>
                  <div className="mt-auto pt-3">
                    <button className="text-xs flex items-center gap-1 text-blue-600 hover:underline">
                      <ExternalLink size={14} />
                      View Resource
                    </button>
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
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Submit Request
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BrandResources;
