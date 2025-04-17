import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Upload, Edit, Trash2, Image, Grid, LayoutGrid, Search, Filter } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import LookbookCreator from "@/components/brand/lookbook/LookbookCreator";
import { Link } from "react-router-dom";

const LookbookContent = () => {
  const [activeTab, setActiveTab] = useState("collections");
  const [showCreator, setShowCreator] = useState(false);
  const [editingLookbook, setEditingLookbook] = useState<null | { id: number; title: string }>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState("all");

  // Sample lookbook data
  const lookbooks = [
    { id: 1, title: "Spring Collection 2023", images: 12, status: "Published", date: "2023-03-15" },
    { id: 2, title: "Summer Essentials", images: 8, status: "Draft", date: "2023-04-20" },
    { id: 3, title: "Fall Favorites", images: 15, status: "Published", date: "2023-08-05" },
    { id: 4, title: "Winter Lookbook", images: 10, status: "Draft", date: "2023-11-10" }
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

  const filteredLookbooks = lookbooks.filter(lookbook => {
    const matchesSearch = lookbook.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterValue === "all" || 
                         (filterValue === "published" && lookbook.status === "Published") ||
                         (filterValue === "draft" && lookbook.status === "Draft");
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="border-b border-gray-200 w-full flex justify-start overflow-x-auto pb-0 mb-6 bg-transparent">
          <TabsTrigger 
            value="collections" 
            className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2 data-[state=active]:shadow-none"
          >
            Collections
          </TabsTrigger>
          <TabsTrigger 
            value="images" 
            className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2 data-[state=active]:shadow-none"
          >
            Images Library
          </TabsTrigger>
          <TabsTrigger 
            value="create" 
            disabled={!showCreator}
            className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2 data-[state=active]:shadow-none"
          >
            {editingLookbook ? `Edit: ${editingLookbook.title}` : "Create New"}
          </TabsTrigger>
        </TabsList>
        
        {/* Collections Tab */}
        <TabsContent value="collections">
          <Card className="border border-gray-200 shadow-none rounded-none">
            <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <CardTitle className="text-base font-light text-gray-900">
                  Lookbook Collections
                </CardTitle>
                <div className="flex flex-wrap gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search collections..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 h-9 text-xs rounded-none border-gray-200 w-[200px]"
                    />
                  </div>
                  <Select value={filterValue} onValueChange={setFilterValue}>
                    <SelectTrigger className="h-9 text-xs rounded-none border-gray-200 w-[150px]">
                      <div className="flex items-center">
                        <Filter className="h-3.5 w-3.5 mr-2 text-gray-500" strokeWidth={1} />
                        <SelectValue placeholder="Filter status" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={handleCreateNew} className="h-9 rounded-none text-xs font-light">
                    <Plus size={16} className="mr-1" />
                    Create New Lookbook
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-[40px]">#</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Images</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLookbooks.map((lookbook, index) => (
                    <TableRow key={lookbook.id} className="hover:bg-gray-50/50">
                      <TableCell className="font-light text-gray-500">{index + 1}</TableCell>
                      <TableCell>{lookbook.title}</TableCell>
                      <TableCell>{lookbook.images} images</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 text-xs rounded-sm ${
                          lookbook.status === 'Published' ? 'bg-accent-mint text-gray-800' : 'bg-soft-orange text-gray-800'
                        }`}>
                          {lookbook.status}
                        </span>
                      </TableCell>
                      <TableCell>{lookbook.date}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline"
                            size="sm" 
                            className="h-8 w-8 p-0 rounded-none"
                            onClick={() => handleEditLookbook(lookbook)}
                          >
                            <Edit size={14} />
                          </Button>
                          <Button 
                            variant="outline"
                            size="sm" 
                            className="h-8 w-8 p-0 rounded-none"
                            asChild
                          >
                            <Link to={`/brand/lookbook/${lookbook.id}`}>
                              <Image size={14} />
                            </Link>
                          </Button>
                          <Button 
                            variant="outline"
                            size="sm" 
                            className="h-8 w-8 p-0 rounded-none text-red-500 hover:text-red-600"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredLookbooks.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="h-32 text-center">
                        No lookbooks found matching your search
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Images Library Tab */}
        <TabsContent value="images">
          <Card className="border border-gray-200 shadow-none rounded-none">
            <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
              <div className="flex flex-row items-center justify-between">
                <CardTitle className="text-base font-light text-gray-900">
                  Images Library
                </CardTitle>
                <Button variant="outline" size="sm" className="rounded-none text-xs font-light">
                  <Upload size={16} className="mr-2" />
                  Upload Images
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex gap-4 mb-4">
                <Button variant="outline" size="sm" className="gap-2 rounded-none">
                  <LayoutGrid size={16} />
                  Grid View
                </Button>
                <Button variant="outline" size="sm" className="gap-2 rounded-none">
                  <Grid size={16} />
                  List View
                </Button>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="aspect-square bg-gray-100 flex items-center justify-center text-gray-400 text-xs relative group">
                    Image {i+1}
                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                      <Button size="icon" variant="outline" className="h-7 w-7 bg-white/90 hover:bg-white rounded-none">
                        <Image size={14} />
                      </Button>
                      <Button size="icon" variant="outline" className="h-7 w-7 bg-white/90 hover:bg-white rounded-none">
                        <Edit size={14} />
                      </Button>
                      <Button size="icon" variant="outline" className="h-7 w-7 bg-white/90 hover:bg-white rounded-none text-red-500">
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center mt-6">
                <Button variant="outline" className="text-sm rounded-none">
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

export default LookbookContent;
