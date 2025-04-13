
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Plus, Search, Trash2, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface ContractTemplate {
  id: number;
  name: string;
  status: string;
  visibleTo: string;
  language: string;
  createdAt: string;
  lastUpdated: string;
}

interface ContractTemplateListProps {
  templates: ContractTemplate[];
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  visibilityFilter: string;
  setVisibilityFilter: (value: string) => void;
  handleAddTemplate: () => void;
  handleViewTemplate: (templateId: number) => void;
  handleEditTemplate: (templateId: number) => void;
  handleDeleteTemplate: (templateId: number) => void;
}

const ContractTemplateList = ({
  templates,
  statusFilter,
  setStatusFilter,
  visibilityFilter,
  setVisibilityFilter,
  handleAddTemplate,
  handleViewTemplate,
  handleEditTemplate,
  handleDeleteTemplate
}: ContractTemplateListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredTemplates = templates
    .filter(template => statusFilter === "all" || template.status === statusFilter)
    .filter(template => visibilityFilter === "all" || template.visibleTo === visibilityFilter || 
            (visibilityFilter === "both" && template.visibleTo === "both"))
    .filter(template => 
      searchQuery === "" || 
      template.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search templates..."
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
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          
          <Select
            value={visibilityFilter}
            onValueChange={(value) => setVisibilityFilter(value)}
          >
            <SelectTrigger className="w-[150px] border-gray-200 bg-white text-sm">
              <SelectValue placeholder="Filter by visibility" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="all">All Users</SelectItem>
              <SelectItem value="brand">Brands Only</SelectItem>
              <SelectItem value="buyer">Buyers Only</SelectItem>
              <SelectItem value="both">Both</SelectItem>
            </SelectContent>
          </Select>
          
          <Button className="bg-black hover:bg-gray-800 text-white text-sm" onClick={handleAddTemplate}>
            <Plus className="mr-1 h-4 w-4" /> Add Template
          </Button>
        </div>
      </div>
      
      <Card className="border border-gray-200 shadow-none rounded-lg">
        <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
          <CardTitle className="text-lg font-medium text-gray-900">
            Contract Templates ({filteredTemplates.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent bg-gray-50">
                  <TableHead className="w-[80px] font-medium text-gray-600 text-sm">ID</TableHead>
                  <TableHead className="font-medium text-gray-600 text-sm">Name</TableHead>
                  <TableHead className="font-medium text-gray-600 text-sm">Status</TableHead>
                  <TableHead className="font-medium text-gray-600 text-sm">Visible To</TableHead>
                  <TableHead className="font-medium text-gray-600 text-sm">Language</TableHead>
                  <TableHead className="font-medium text-gray-600 text-sm">Last Updated</TableHead>
                  <TableHead className="text-right font-medium text-gray-600 text-sm">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTemplates.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10 text-gray-500">
                      No templates found with the current filters
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTemplates.map((template) => (
                    <TableRow key={template.id} className="border-t border-gray-100 hover:bg-gray-50/50">
                      <TableCell className="font-medium">{template.id}</TableCell>
                      <TableCell>{template.name}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline"
                          className={`
                            ${template.status === "active" ? "bg-accent-mint text-gray-800 border-accent-mint" : 
                              "bg-gray-100 text-gray-700 border-gray-200"}
                            text-xs font-medium px-2 py-0.5
                          `}
                        >
                          {template.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline"
                          className={`
                            ${template.visibleTo === "brand" ? "bg-pink-50 text-pink-800 border-pink-100" : 
                              template.visibleTo === "buyer" ? "bg-blue-50 text-blue-800 border-blue-100" : 
                              "bg-purple-50 text-purple-800 border-purple-100"}
                            text-xs font-medium px-2 py-0.5
                          `}
                        >
                          {template.visibleTo === "brand" ? "Brand" : 
                           template.visibleTo === "buyer" ? "Buyer" : "Both"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Globe className="h-3 w-3 mr-1 text-gray-500" />
                          <span>{template.language}</span>
                        </div>
                      </TableCell>
                      <TableCell>{template.lastUpdated}</TableCell>
                      <TableCell className="flex justify-end space-x-2">
                        <Button 
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 p-0 hover:bg-gray-100"
                          onClick={() => handleViewTemplate(template.id)}
                          title="View"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 p-0 hover:bg-gray-100"
                          onClick={() => handleEditTemplate(template.id)}
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 p-0 hover:bg-gray-100"
                          onClick={() => handleDeleteTemplate(template.id)}
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
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
  );
};

export default ContractTemplateList;
