
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Upload, Edit, Trash2, Image, Grid, LayoutGrid } from "lucide-react";
import { Link } from "react-router-dom";
import LookbookCreator from "@/components/brand/lookbook/LookbookCreator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BrandLookbook = () => {
  const [activeTab, setActiveTab] = useState("collections");
  const [showCreator, setShowCreator] = useState(false);
  const [editingLookbook, setEditingLookbook] = useState<null | { id: number; title: string }>(null);

  // Sample lookbook data
  const lookbooks = [
    { id: 1, title: "Spring Collection 2023", images: 12 },
    { id: 2, title: "Summer Essentials", images: 8 },
    { id: 3, title: "Fall Favorites", images: 15 },
    { id: 4, title: "Winter Lookbook", images: 10 }
  ];

  const handleCreateNew = () => {
    setEditingLookbook(null);
    setShowCreator(true);
    setActiveTab("create");
  };

  const handleEditLookbook = (lookbook: { id: number; title: string }) => {
    setEditingLookbook(lookbook);
    setShowCreator(true);
    setActiveTab("create");
  };

  const handleClose = () => {
    setShowCreator(false);
    setActiveTab("collections");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-4xl md:text-6xl uppercase font-thin mb-6">Lookbook</h1>
        <Button onClick={handleCreateNew} className="w-full sm:w-auto">
          <Plus size={16} />
          Create New Lookbook
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="collections">Collections</TabsTrigger>
          <TabsTrigger value="images">Images Library</TabsTrigger>
          <TabsTrigger value="create" disabled={!showCreator}>
            {editingLookbook ? `Edit: ${editingLookbook.title}` : "Create New"}
          </TabsTrigger>
        </TabsList>

        {/* Collections Tab */}
        <TabsContent value="collections">
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-1xl md:text-2xl uppercase font-thin mb-6">Lookbook Collections</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {lookbooks.map((lookbook) => (
                  <div key={lookbook.id} className="border overflow-hidden group">
                    <div className="h-48 bg-gray-100 relative">
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        Lookbook Thumbnail
                      </div>
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="bg-white hover:bg-gray-100"
                          onClick={() => handleEditLookbook(lookbook)}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="bg-white hover:bg-gray-100"
                          asChild
                        >
                          <Link to={`/brand/lookbook/${lookbook.id}`}>View</Link>
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="bg-white hover:bg-gray-100 text-red-500 hover:text-red-600"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium truncate">{lookbook.title}</h3>
                      <p className="text-sm text-gray-500">{lookbook.images} images</p>
                    </div>
                  </div>
                ))}
                
                {/* Add new lookbook card */}
                <div 
                  className="border border-dashed overflow-hidden h-[168px] flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={handleCreateNew}
                >
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Create New Lookbook</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Images Library Tab */}
        <TabsContent value="images">
          <Card className="border border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-medium">Images Library</CardTitle>
              <Button variant="outline" size="sm">
                <Upload size={16} className="mr-2" />
                Upload Images
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <Button variant="outline" size="sm" className="gap-2">
                  <LayoutGrid size={16} />
                  Grid View
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Grid size={16} />
                  List View
                </Button>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="aspect-square bg-gray-100 flex items-center justify-center text-gray-400 text-xs relative group">
                    Image {i+1}
                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                      <Button size="icon" variant="outline" className="h-7 w-7 bg-white/90 hover:bg-white">
                        <Image size={14} />
                      </Button>
                      <Button size="icon" variant="outline" className="h-7 w-7 bg-white/90 hover:bg-white">
                        <Edit size={14} />
                      </Button>
                      <Button size="icon" variant="outline" className="h-7 w-7 bg-white/90 hover:bg-white text-red-500">
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center mt-6">
                <Button variant="outline" className="text-sm">
                  Load More Images
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Create/Edit Tab */}
        <TabsContent value="create">
          {showCreator && (
            <LookbookCreator 
              lookbook={editingLookbook} 
              onClose={handleClose}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BrandLookbook;
