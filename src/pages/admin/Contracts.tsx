
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Wand } from "lucide-react";

const AdminContracts = () => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState<number | null>(null);

  const contractTemplates = [
    { id: 1, name: "Basic Agreement", type: "Brand Agreement", status: "active" },
    { id: 2, name: "Premium Agreement", type: "Buyer Agreement", status: "active" },
    { id: 3, name: "Enterprise Agreement", type: "Partnership Agreement", status: "inactive" },
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

  return (
    <div className="space-y-6">
      <h1 className="text-4xl md:text-6xl uppercase font-thin mb-6">Contract Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 border border-gray-200">
          <h2 className="text-lg font-medium mb-4">New Contract Template</h2>
          <form className="space-y-4">
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
                <SelectContent>
                  <SelectItem value="brand">Brand Agreement</SelectItem>
                  <SelectItem value="buyer">Buyer Agreement</SelectItem>
                  <SelectItem value="partnership">Partnership Agreement</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label htmlFor="language" className="block text-sm font-medium mb-1">
                Language
              </label>
              <Select>
                <SelectTrigger className="w-full border-gray-300 rounded-none">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
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
              <Button className="bg-black text-white border-none hover:underline">
                Save Template
              </Button>
              <Button variant="outline" className="border-gray-300 hover:bg-gray-50">
                <Wand className="mr-2 h-4 w-4" />
                Generate with AI
              </Button>
            </div>
          </form>
        </Card>
        
        <div>
          <Card className="border border-gray-200">
            <h2 className="text-lg font-medium p-6 pb-4">Existing Templates</h2>
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-medium">Name</TableHead>
                  <TableHead className="font-medium">Type</TableHead>
                  <TableHead className="font-medium">Status</TableHead>
                  <TableHead className="font-medium text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contractTemplates.map((template) => (
                  <TableRow key={template.id} className="border-t border-gray-200">
                    <TableCell>{template.name}</TableCell>
                    <TableCell>{template.type}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        template.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {template.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-gray-200"
                        onClick={() => handleEdit(template.id)}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-gray-200 text-red-600 hover:text-red-700"
                        onClick={() => handleDelete(template.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Contract Template</DialogTitle>
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
              <Select defaultValue={contractTemplates.find(c => c.id === selectedContract)?.type.toLowerCase().replace(' ', '')}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="brand">Brand Agreement</SelectItem>
                  <SelectItem value="buyer">Buyer Agreement</SelectItem>
                  <SelectItem value="partnership">Partnership Agreement</SelectItem>
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
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
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
