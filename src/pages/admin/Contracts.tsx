
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const AdminContracts = () => {
  const contractTemplates = [
    { id: 1, name: "Basic Agreement", type: "Brand Agreement" },
    { id: 2, name: "Premium Agreement", type: "Buyer Agreement" },
    { id: 3, name: "Enterprise Agreement", type: "Partnership Agreement" },
  ];

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
              <select
                id="templateType"
                className="w-full border border-gray-300 rounded-none p-2 focus:outline-none focus:ring-2 focus:ring-black"
                defaultValue=""
              >
                <option value="" disabled>Select template type</option>
                <option value="brand">Brand Agreement</option>
                <option value="buyer">Buyer Agreement</option>
                <option value="partnership">Partnership Agreement</option>
              </select>
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
            
            <Button className="bg-black text-white border-none hover:underline">
              Save Template
            </Button>
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
                  <TableHead className="font-medium text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contractTemplates.map((template) => (
                  <TableRow key={template.id} className="border-t border-gray-200">
                    <TableCell>{template.name}</TableCell>
                    <TableCell>{template.type}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="sm" className="border-gray-200">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="border-gray-200 text-red-600 hover:text-red-700">
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
    </div>
  );
};

export default AdminContracts;
