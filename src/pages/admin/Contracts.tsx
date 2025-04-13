
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wand, Pencil, Trash, FileText, Download, ExternalLink, Search, Plus, Eye } from "lucide-react";

const AdminContracts = () => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState<any>(null);

  const contractTemplates = [
    { id: 1, name: "Basic Agreement", type: "Brand Agreement", status: "active", lastUpdated: "Apr 1, 2025" },
    { id: 2, name: "Premium Agreement", type: "Buyer Agreement", status: "active", lastUpdated: "Mar 28, 2025" },
    { id: 3, name: "Enterprise Agreement", type: "Partnership Agreement", status: "inactive", lastUpdated: "Mar 15, 2025" },
    { id: 4, name: "Custom Brand Contract", type: "Brand Agreement", status: "draft", lastUpdated: "Apr 10, 2025" },
    { id: 5, name: "Seasonal Collection Agreement", type: "Buyer Agreement", status: "active", lastUpdated: "Apr 8, 2025" },
  ];

  const handleEdit = (id: number) => {
    setSelectedContract(id);
    setEditDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setSelectedContract(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    console.log(`Deleting contract with ID: ${selectedContract}`);
    setDeleteDialogOpen(false);
    // Actual delete functionality would go here
  };

  const handleView = (template: any) => {
    setCurrentTemplate(template);
    setViewDialogOpen(true);
  };

  // Filter templates based on search query and status
  const filterTemplates = (templates: any[], query: string, status: string) => {
    return templates.filter(template => {
      const matchesQuery = !query || 
        template.name.toLowerCase().includes(query.toLowerCase()) || 
        template.type.toLowerCase().includes(query.toLowerCase());
      
      const matchesStatus = status === "all" || template.status === status;
      
      return matchesQuery && matchesStatus;
    });
  };

  const filteredTemplates = filterTemplates(contractTemplates, searchQuery, statusFilter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tighter uppercase mb-6">Contract Management</h1>
        
        <div className="relative w-full md:w-64 lg:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            type="text"
            placeholder="Search contracts..."
            className="pl-10 border-gray-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="border-b border-gray-200 w-full flex justify-start overflow-x-auto pb-0 mb-6">
          <TabsTrigger value="all" className="text-sm font-light data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2">
            All Templates
          </TabsTrigger>
          <TabsTrigger value="brand" className="text-sm font-light data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2">
            Brand Contracts
          </TabsTrigger>
          <TabsTrigger value="buyer" className="text-sm font-light data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2">
            Buyer Contracts
          </TabsTrigger>
          <TabsTrigger value="partnership" className="text-sm font-light data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2">
            Partnership Contracts
          </TabsTrigger>
          <TabsTrigger value="create" className="text-sm font-light data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2">
            Create New
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          <Card className="border border-gray-200">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-gray-100">
              <CardTitle className="text-xl md:text-2xl font-light mb-6">
                Contract Templates
              </CardTitle>
              <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                <Select
                  value={statusFilter}
                  onValueChange={(value) => setStatusFilter(value)}
                >
                  <SelectTrigger className="w-[150px] border-gray-200 bg-white text-sm">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="bg-black hover:bg-gray-800 text-white text-sm">
                  <Plus className="mr-1 h-4 w-4" /> Add Template
                </Button>
                <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-50 text-sm">Export</Button>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-medium text-gray-600 text-sm">Name</TableHead>
                      <TableHead className="font-medium text-gray-600 text-sm">Type</TableHead>
                      <TableHead className="font-medium text-gray-600 text-sm">Status</TableHead>
                      <TableHead className="font-medium text-gray-600 text-sm">Last Updated</TableHead>
                      <TableHead className="text-right font-medium text-gray-600 text-sm">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTemplates.map((template) => (
                      <TableRow key={template.id} className="border-t border-gray-100 hover:bg-gray-50">
                        <TableCell className="font-medium">{template.name}</TableCell>
                        <TableCell>{template.type}</TableCell>
                        <TableCell>
                          <Badge 
                            className={`
                              ${template.status === "active" ? "bg-accent-mint text-gray-800" :
                                template.status === "draft" ? "bg-accent-yellow text-gray-800" :
                                "bg-gray-100 text-gray-800"}
                              text-xs font-medium px-2 py-0.5
                            `}
                          >
                            {template.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{template.lastUpdated}</TableCell>
                        <TableCell className="flex justify-end space-x-2">
                          <Button 
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 p-0 hover:bg-gray-100"
                            onClick={() => handleView(template)}
                            title="View"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 p-0 hover:bg-gray-100"
                            onClick={() => handleEdit(template.id)}
                            title="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 p-0 hover:bg-gray-100 text-red-600"
                            onClick={() => handleDelete(template.id)}
                            title="Delete"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="brand" className="mt-0">
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl font-light">
                Brand Contract Templates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-medium text-gray-600 text-sm">Name</TableHead>
                      <TableHead className="font-medium text-gray-600 text-sm">Status</TableHead>
                      <TableHead className="font-medium text-gray-600 text-sm">Last Updated</TableHead>
                      <TableHead className="text-right font-medium text-gray-600 text-sm">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contractTemplates
                      .filter(template => template.type === "Brand Agreement")
                      .map((template) => (
                        <TableRow key={template.id} className="border-t border-gray-100 hover:bg-gray-50">
                          <TableCell className="font-medium">{template.name}</TableCell>
                          <TableCell>
                            <Badge 
                              className={`
                                ${template.status === "active" ? "bg-accent-mint text-gray-800" :
                                  template.status === "draft" ? "bg-accent-yellow text-gray-800" :
                                  "bg-gray-100 text-gray-800"}
                                text-xs font-medium px-2 py-0.5
                              `}
                            >
                              {template.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{template.lastUpdated}</TableCell>
                          <TableCell className="flex justify-end space-x-2">
                            <Button 
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 p-0 hover:bg-gray-100"
                              onClick={() => handleView(template)}
                              title="View"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 p-0 hover:bg-gray-100"
                              onClick={() => handleEdit(template.id)}
                              title="Edit"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 p-0 hover:bg-gray-100 text-red-600"
                              onClick={() => handleDelete(template.id)}
                              title="Delete"
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="buyer" className="mt-0">
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl font-light">
                Buyer Contract Templates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-medium text-gray-600 text-sm">Name</TableHead>
                      <TableHead className="font-medium text-gray-600 text-sm">Status</TableHead>
                      <TableHead className="font-medium text-gray-600 text-sm">Last Updated</TableHead>
                      <TableHead className="text-right font-medium text-gray-600 text-sm">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contractTemplates
                      .filter(template => template.type === "Buyer Agreement")
                      .map((template) => (
                        <TableRow key={template.id} className="border-t border-gray-100 hover:bg-gray-50">
                          <TableCell className="font-medium">{template.name}</TableCell>
                          <TableCell>
                            <Badge 
                              className={`
                                ${template.status === "active" ? "bg-accent-mint text-gray-800" :
                                  template.status === "draft" ? "bg-accent-yellow text-gray-800" :
                                  "bg-gray-100 text-gray-800"}
                                text-xs font-medium px-2 py-0.5
                              `}
                            >
                              {template.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{template.lastUpdated}</TableCell>
                          <TableCell className="flex justify-end space-x-2">
                            <Button 
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 p-0 hover:bg-gray-100"
                              onClick={() => handleView(template)}
                              title="View"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 p-0 hover:bg-gray-100"
                              onClick={() => handleEdit(template.id)}
                              title="Edit"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 p-0 hover:bg-gray-100 text-red-600"
                              onClick={() => handleDelete(template.id)}
                              title="Delete"
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="partnership" className="mt-0">
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl font-light">
                Partnership Contract Templates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-medium text-gray-600 text-sm">Name</TableHead>
                      <TableHead className="font-medium text-gray-600 text-sm">Status</TableHead>
                      <TableHead className="font-medium text-gray-600 text-sm">Last Updated</TableHead>
                      <TableHead className="text-right font-medium text-gray-600 text-sm">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contractTemplates
                      .filter(template => template.type === "Partnership Agreement")
                      .map((template) => (
                        <TableRow key={template.id} className="border-t border-gray-100 hover:bg-gray-50">
                          <TableCell className="font-medium">{template.name}</TableCell>
                          <TableCell>
                            <Badge 
                              className={`
                                ${template.status === "active" ? "bg-accent-mint text-gray-800" :
                                  template.status === "draft" ? "bg-accent-yellow text-gray-800" :
                                  "bg-gray-100 text-gray-800"}
                                text-xs font-medium px-2 py-0.5
                              `}
                            >
                              {template.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{template.lastUpdated}</TableCell>
                          <TableCell className="flex justify-end space-x-2">
                            <Button 
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 p-0 hover:bg-gray-100"
                              onClick={() => handleView(template)}
                              title="View"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 p-0 hover:bg-gray-100"
                              onClick={() => handleEdit(template.id)}
                              title="Edit"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 p-0 hover:bg-gray-100 text-red-600"
                              onClick={() => handleDelete(template.id)}
                              title="Delete"
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="create" className="mt-0">
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl font-light">New Contract Template</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="templateName" className="block text-sm font-medium mb-1">
                      Template Name
                    </label>
                    <Input
                      id="templateName"
                      placeholder="Enter template name"
                      className="w-full border-gray-300 rounded-none"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="templateType" className="block text-sm font-medium mb-1">
                      Template Type
                    </label>
                    <Select>
                      <SelectTrigger className="w-full border-gray-300 rounded-none">
                        <SelectValue placeholder="Select template type" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="brand">Brand Agreement</SelectItem>
                        <SelectItem value="buyer">Buyer Agreement</SelectItem>
                        <SelectItem value="partnership">Partnership Agreement</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="language" className="block text-sm font-medium mb-1">
                    Language
                  </label>
                  <Select>
                    <SelectTrigger className="w-full border-gray-300 rounded-none">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="russian">Russian</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label htmlFor="content" className="block text-sm font-medium mb-1">
                    Content
                  </label>
                  <Textarea
                    id="content"
                    placeholder="Enter contract template content"
                    className="h-64 border-gray-300 rounded-none"
                  />
                </div>
                
                <div className="flex space-x-2">
                  <Button className="bg-black text-white border-none">
                    Save Template
                  </Button>
                  <Button variant="outline" className="border-gray-300 hover:bg-black hover:text-white">
                    <Wand className="mr-2 h-4 w-4" />
                    Generate with AI
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="text-1xl md:text-2xl uppercase font-thin mb-6">Edit Contract Template</DialogTitle>
            <DialogDescription>
              Make changes to the contract template here.
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4 pt-4">
            <div>
              <label htmlFor="edit-name" className="block text-sm font-medium mb-1">
                Template Name
              </label>
              <Input id="edit-name" defaultValue={contractTemplates.find(c => c.id === selectedContract)?.name} />
            </div>
            <div>
              <label htmlFor="edit-type" className="block text-sm font-medium mb-1">
                Template Type
              </label>
              <Select defaultValue={contractTemplates.find(c => c.id === selectedContract)?.type.toLowerCase().replace(' ', '-')}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="brand-agreement">Brand Agreement</SelectItem>
                  <SelectItem value="buyer-agreement">Buyer Agreement</SelectItem>
                  <SelectItem value="partnership-agreement">Partnership Agreement</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="edit-status" className="block text-sm font-medium mb-1">
                Status
              </label>
              <Select defaultValue={contractTemplates.find(c => c.id === selectedContract)?.status}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="edit-content" className="block text-sm font-medium mb-1">
                Content
              </label>
              <Textarea id="edit-content" className="h-48" defaultValue="Contract template content..." />
            </div>
          </form>
          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>Cancel</Button>
            <Button className="bg-black text-white">Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-[725px] max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>{currentTemplate?.name}</DialogTitle>
          </DialogHeader>
          <div className="py-4 overflow-y-auto">
            <div className="border rounded-none p-4">
              <div className="bg-gray-50 h-[400px] p-6 overflow-auto">
                <h2 className="text-xl font-medium mb-4">{currentTemplate?.name}</h2>
                <p className="mb-4 text-sm text-gray-600">This is a preview of the {currentTemplate?.type} template.</p>
                <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim.</p>
                <p className="text-sm mt-4">Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio. Proin quis tortor orci. Etiam at risus et justo dignissim congue.</p>
                <h3 className="text-lg font-medium mt-6 mb-2">Terms and Conditions</h3>
                <ul className="list-disc pl-5 text-sm">
                  <li className="mb-1">All services described in this agreement will be delivered as specified.</li>
                  <li className="mb-1">Payment terms are net 30 days from date of invoice.</li>
                  <li className="mb-1">This agreement is valid for the period specified unless terminated by either party.</li>
                </ul>
              </div>
            </div>
            {currentTemplate && (
              <div className="mt-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Details:</h3>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-gray-300"
                  >
                    <Download size={14} className="mr-1" /> Download PDF
                  </Button>
                </div>
                <div className="mt-4 space-y-2">
                  <p className="text-sm flex justify-between">
                    <span className="text-gray-600">Type:</span> 
                    <span className="font-medium">{currentTemplate.type}</span>
                  </p>
                  <p className="text-sm flex justify-between">
                    <span className="text-gray-600">Status:</span> 
                    <Badge 
                      className={`
                        ${currentTemplate.status === "active" ? "bg-accent-mint text-gray-800" :
                          currentTemplate.status === "draft" ? "bg-accent-yellow text-gray-800" :
                          "bg-gray-100 text-gray-800"}
                        text-xs font-medium px-2 py-0.5
                      `}
                    >
                      {currentTemplate.status}
                    </Badge>
                  </p>
                  <p className="text-sm flex justify-between">
                    <span className="text-gray-600">Last Updated:</span>
                    <span>{currentTemplate.lastUpdated}</span>
                  </p>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" className="border-gray-300" onClick={() => setViewDialogOpen(false)}>Close</Button>
            <Button className="bg-black text-white" onClick={() => {
              setViewDialogOpen(false);
              handleEdit(currentTemplate?.id);
            }}>Edit Template</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the contract template. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 text-white hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminContracts;
