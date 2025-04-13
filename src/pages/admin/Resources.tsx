import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Globe, Search, Download, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const AdminResources = () => {
  // State for dialogs and filtering
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [currentResource, setCurrentResource] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Sample resources data (replace with actual data fetching)
  const internalResources = [{
    id: 1,
    title: "Internal Guide",
    type: "Guide",
    createdAt: "2024-01-01"
  }, {
    id: 2,
    title: "Internal Training",
    type: "Training",
    createdAt: "2024-02-15"
  }, {
    id: 3,
    title: "Internal Policy",
    type: "Policy",
    createdAt: "2024-03-10"
  }];

  const externalResources = [{
    id: 1,
    title: "External Article",
    source: "TechCrunch",
    createdAt: "2024-01-20"
  }, {
    id: 2,
    title: "External Webinar",
    source: "Forbes",
    createdAt: "2024-02-28"
  }, {
    id: 3,
    title: "External Report",
    source: "Gartner",
    createdAt: "2024-03-05"
  }];

  const handleViewItem = (id: number) => {
    console.log(`View resource with id: ${id}`);
  };

  const handleEditItem = (id: number) => {
    console.log(`Edit resource with id: ${id}`);
  };

  const handleDeleteItem = (id: number) => {
    console.log(`Delete resource with id: ${id}`);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-4xl md:text-6xl font-light tracking-tighter uppercase">Resources</h1>
        
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
      </div>
      
      <Tabs defaultValue="internal" className="w-full">
        <TabsList className="border-b border-gray-200 w-full flex justify-start overflow-x-auto pb-0 mb-6">
          <TabsTrigger value="internal" className="text-sm font-light data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2">
            Internal Resources
          </TabsTrigger>
          <TabsTrigger value="external" className="text-sm font-light data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2">
            External Resources
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="internal" className="mt-0">
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Internal Resources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {internalResources.map((resource) => (
                    <TableRow key={resource.id}>
                      <TableCell>{resource.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{resource.type}</Badge>
                      </TableCell>
                      <TableCell>{resource.createdAt}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleViewItem(resource.id)}
                        >
                          <Globe className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleEditItem(resource.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDeleteItem(resource.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="external" className="mt-0">
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Globe className="h-5 w-5" />
                External Resources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {externalResources.map((resource) => (
                    <TableRow key={resource.id}>
                      <TableCell>{resource.title}</TableCell>
                      <TableCell>{resource.source}</TableCell>
                      <TableCell>{resource.createdAt}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleViewItem(resource.id)}
                        >
                          <Globe className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleEditItem(resource.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDeleteItem(resource.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminResources;
