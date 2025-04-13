
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventsManagement from "./components/EventsManagement";
import CuratedStoriesManagement from "./components/CuratedStoriesManagement";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileText, ArrowRight, Search, Eye, Edit, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for pages
const mockPages = [
  { id: 1, title: "Home Page", status: "published", lastUpdated: "2023-10-15", type: "static", author: "Admin User" },
  { id: 2, title: "About Us", status: "published", lastUpdated: "2023-09-20", type: "static", author: "Admin User" },
  { id: 3, title: "Contact Page", status: "draft", lastUpdated: "2023-10-18", type: "static", author: "Content Editor" },
  { id: 4, title: "Blog Landing", status: "published", lastUpdated: "2023-10-10", type: "dynamic", author: "Admin User" },
  { id: 5, title: "Privacy Policy", status: "review", lastUpdated: "2023-10-05", type: "static", author: "Legal Team" },
  { id: 6, title: "Terms of Service", status: "published", lastUpdated: "2023-09-15", type: "static", author: "Legal Team" },
  { id: 7, title: "FAQ Page", status: "draft", lastUpdated: "2023-10-20", type: "dynamic", author: "Content Editor" },
  { id: 8, title: "Team Page", status: "published", lastUpdated: "2023-09-10", type: "static", author: "HR Team" },
];

const AdminPages = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("list");
  const [selectedPage, setSelectedPage] = useState(null);
  
  // Filter pages based on status and search query
  const filteredPages = mockPages
    .filter(page => statusFilter === "all" || page.status === statusFilter)
    .filter(page => 
      searchQuery === "" || 
      page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
  const handleAddPage = () => {
    setViewMode("add");
    setSelectedPage(null);
  };

  const handleViewPage = (pageId) => {
    setViewMode("view");
    const page = mockPages.find(page => page.id === pageId);
    setSelectedPage(page);
  };

  const handleEditPage = (pageId) => {
    setViewMode("edit");
    const page = mockPages.find(page => page.id === pageId);
    setSelectedPage(page);
  };
  
  const handleGoBack = () => {
    setViewMode("list");
  };
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tighter uppercase mb-6">
          PAGE MANAGEMENT
        </h1>
        
        <div className="flex flex-wrap gap-4 mt-4 lg:mt-0">
          <Button 
            className="bg-black text-white border-none hover:bg-gray-800 text-xs font-light"
            onClick={handleAddPage}
          >
            <PlusCircle className="w-4 h-4 mr-2" strokeWidth={1} />
            Add New Page
          </Button>
          <Button variant="outline" className="border-gray-200 hover:bg-gray-100 text-xs font-light">
            <FileText className="w-4 h-4 mr-2" strokeWidth={1} />
            View All Pages
          </Button>
        </div>
      </div>
      
      <Card className="border border-gray-200 shadow-none">
        <CardHeader>
          <CardTitle className="text-2xl font-light">Page Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs 
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="general" className="text-sm">GENERAL PAGES</TabsTrigger>
              <TabsTrigger value="events" className="text-sm">EVENTS</TabsTrigger>
              <TabsTrigger value="curated" className="text-sm">CURATED STORIES</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="space-y-4">
              {viewMode === "list" && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
                    <div className="relative w-full max-w-sm">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        type="search"
                        placeholder="Search pages..."
                        className="pl-9 bg-white border-gray-200"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center space-x-3">
                      <Select
                        value={statusFilter}
                        onValueChange={(value) => setStatusFilter(value)}
                      >
                        <SelectTrigger className="w-[150px] border-gray-200 bg-white text-sm">
                          <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="all">All Statuses</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="review">In Review</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button className="bg-black hover:bg-gray-800 text-white text-sm admin-button-primary" onClick={handleAddPage}>
                        <Plus className="mr-1 h-4 w-4" /> Add Page
                      </Button>
                    </div>
                  </div>
                  
                  <Card className="border border-gray-200 shadow-none rounded-lg">
                    <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
                      <CardTitle className="text-lg font-medium text-gray-900">
                        Site Pages ({filteredPages.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow className="hover:bg-transparent bg-gray-50">
                              <TableHead className="w-[80px] font-medium text-gray-600 text-sm">ID</TableHead>
                              <TableHead className="font-medium text-gray-600 text-sm">Title</TableHead>
                              <TableHead className="font-medium text-gray-600 text-sm">Type</TableHead>
                              <TableHead className="font-medium text-gray-600 text-sm">Author</TableHead>
                              <TableHead className="font-medium text-gray-600 text-sm">Status</TableHead>
                              <TableHead className="font-medium text-gray-600 text-sm">Last Updated</TableHead>
                              <TableHead className="text-right font-medium text-gray-600 text-sm">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredPages.length === 0 ? (
                              <TableRow>
                                <TableCell colSpan={7} className="text-center py-10 text-gray-500">
                                  No pages found with the current filters
                                </TableCell>
                              </TableRow>
                            ) : (
                              filteredPages.map((page) => (
                                <TableRow key={page.id} className="border-t border-gray-100 hover:bg-gray-50/50">
                                  <TableCell className="font-medium">{page.id}</TableCell>
                                  <TableCell>{page.title}</TableCell>
                                  <TableCell>{page.type}</TableCell>
                                  <TableCell>{page.author}</TableCell>
                                  <TableCell>
                                    <Badge 
                                      variant="outline"
                                      className={`
                                        ${page.status === "published" ? "bg-accent-mint text-gray-800 border-accent-mint" :
                                          page.status === "review" ? "bg-accent-yellow text-gray-800 border-accent-yellow" :
                                          "bg-gray-100 text-gray-700 border-gray-200"}
                                        text-xs font-medium px-2 py-0.5
                                      `}
                                    >
                                      {page.status}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>{page.lastUpdated}</TableCell>
                                  <TableCell className="flex justify-end space-x-2">
                                    <Button 
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8 p-0 hover:bg-gray-100"
                                      onClick={() => handleViewPage(page.id)}
                                      title="View"
                                    >
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button 
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8 p-0 hover:bg-gray-100"
                                      onClick={() => handleEditPage(page.id)}
                                      title="Edit"
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="events" className="mt-0">
              <Card className="border border-gray-200 shadow-none rounded-none">
                <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
                  <CardTitle className="text-base font-light text-gray-900">
                    Events Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {/* Events Management Section */}
                  <EventsManagement availableBrands={["Brand One", "Brand Two", "Brand Three", "Brand Four", "Brand Five"]} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="curated" className="mt-0">
              <Card className="border border-gray-200 shadow-none rounded-none">
                <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
                  <CardTitle className="text-base font-light text-gray-900">
                    Curated Stories Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {/* Curated Stories Management Section */}
                  <CuratedStoriesManagement availableBrands={["Brand One", "Brand Two", "Brand Three", "Brand Four", "Brand Five"]} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="mt-8 text-center">
        <h3 className="text-xl font-light mb-4">Need help managing your pages?</h3>
        <p className="mb-6 max-w-2xl mx-auto text-gray-600 text-sm font-light">
          Our comprehensive guides and tutorials will help you optimize your page management strategy.
        </p>
        <Button variant="outline" className="border-black text-black hover:bg-gray-100 text-xs font-light">
          View Page Management Guides <ArrowRight className="ml-2 h-4 w-4" strokeWidth={1} />
        </Button>
      </div>
    </div>
  );
};

export default AdminPages;
