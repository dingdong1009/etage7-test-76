
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Upload } from "lucide-react";

const BrandLookbook = () => {
  // Sample lookbook data
  const lookbooks = [
    { id: 1, title: "Spring Collection 2023", images: 12 },
    { id: 2, title: "Summer Essentials", images: 8 },
    { id: 3, title: "Fall Favorites", images: 15 },
    { id: 4, title: "Winter Lookbook", images: 10 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-4xl md:text-6xl uppercase font-thin mb-6">Lookbook</h1>
        <button className="text-xs px-3 py-2 bg-black-500 text-white rounded flex items-center gap-1 w-full sm:w-auto justify-center">
          <Plus size={16} />
          Create New Lookbook
        </button>
      </div>
      
      <Card className="border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Lookbook Collections</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {lookbooks.map((lookbook) => (
              <div key={lookbook.id} className="border rounded-lg overflow-hidden group">
                <div className="h-48 bg-gray-100 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    Lookbook Thumbnail
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="text-white bg-black-500 px-3 py-1 rounded text-sm">
                      View
                    </button>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-medium truncate">{lookbook.title}</h3>
                  <p className="text-sm text-gray-500">{lookbook.images} images</p>
                </div>
              </div>
            ))}
            
            {/* Add new lookbook card */}
            <div className="border border-dashed rounded-lg overflow-hidden h-[168px] flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
              <Upload className="h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">Create New Lookbook</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Latest Images</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="aspect-square bg-gray-100 rounded-md flex items-center justify-center text-gray-400 text-xs">
                Image {i+1}
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-6">
            <button className="px-4 py-2 border rounded text-sm hover:bg-gray-50 transition-colors">
              Load More Images
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BrandLookbook;
