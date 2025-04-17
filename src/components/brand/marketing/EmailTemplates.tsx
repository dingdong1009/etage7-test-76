
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Edit2, Copy, Trash2, FileText } from "lucide-react";
import EmailEditor from "./EmailEditor";

// Mock templates data
const mockTemplates = [
  {
    id: 1,
    name: "Product Launch",
    category: "marketing",
    lastEdited: "2023-04-12",
    previewImage: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Collection Announcement",
    category: "marketing",
    lastEdited: "2023-03-25",
    previewImage: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Seasonal Sale",
    category: "marketing",
    lastEdited: "2023-02-18",
    previewImage: "/placeholder.svg"
  },
  {
    id: 4,
    name: "Product Restock",
    category: "transactional",
    lastEdited: "2023-04-05",
    previewImage: "/placeholder.svg"
  },
  {
    id: 5,
    name: "Order Confirmation",
    category: "transactional",
    lastEdited: "2023-01-15",
    previewImage: "/placeholder.svg"
  },
  {
    id: 6,
    name: "Cart Abandonment Follow-up",
    category: "follow-up",
    lastEdited: "2023-03-30",
    previewImage: "/placeholder.svg"
  },
  {
    id: 7,
    name: "Post-Purchase Follow-up",
    category: "follow-up",
    lastEdited: "2023-02-22",
    previewImage: "/placeholder.svg"
  },
  {
    id: 8,
    name: "VIP Early Access",
    category: "marketing",
    lastEdited: "2023-04-01",
    previewImage: "/placeholder.svg"
  }
];

const EmailTemplates = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState<number | null>(null);
  const [templateName, setTemplateName] = useState("");
  
  const filteredTemplates = mockTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || template.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreateNew = () => {
    setCurrentTemplate(null);
    setTemplateName("");
    setIsEditorOpen(true);
  };

  const handleEditTemplate = (id: number) => {
    const template = mockTemplates.find(t => t.id === id);
    if (template) {
      setCurrentTemplate(id);
      setTemplateName(template.name);
      setIsEditorOpen(true);
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-light">Email Templates</h2>
          <Button 
            className="rounded-none text-xs font-light bg-black text-white hover:bg-gray-800"
            onClick={handleCreateNew}
          >
            <Plus className="mr-2 h-4 w-4" strokeWidth={1} />
            New Template
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="bg-transparent h-9">
              <TabsTrigger 
                value="all" 
                className="text-xs font-light uppercase data-[state=active]:bg-gray-100 rounded-none data-[state=active]:shadow-none px-4"
              >
                All
              </TabsTrigger>
              <TabsTrigger 
                value="marketing" 
                className="text-xs font-light uppercase data-[state=active]:bg-gray-100 rounded-none data-[state=active]:shadow-none px-4"
              >
                Marketing
              </TabsTrigger>
              <TabsTrigger 
                value="transactional" 
                className="text-xs font-light uppercase data-[state=active]:bg-gray-100 rounded-none data-[state=active]:shadow-none px-4"
              >
                Transactional
              </TabsTrigger>
              <TabsTrigger 
                value="follow-up" 
                className="text-xs font-light uppercase data-[state=active]:bg-gray-100 rounded-none data-[state=active]:shadow-none px-4"
              >
                Follow-up
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" strokeWidth={1.5} />
            <Input
              placeholder="Search templates..."
              className="pl-8 rounded-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTemplates.map((template) => (
            <Card 
              key={template.id} 
              className="border border-gray-100 rounded-none shadow-none hover:border-gray-300 transition-colors group"
            >
              <div className="relative">
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  <FileText className="h-12 w-12 text-gray-400" strokeWidth={1} />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Button 
                    variant="secondary" 
                    className="rounded-none text-xs"
                    onClick={() => handleEditTemplate(template.id)}
                  >
                    Edit Template
                  </Button>
                </div>
              </div>
              <CardContent className="pt-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-light text-lg">{template.name}</h3>
                  <Badge className="bg-gray-100 text-gray-800 text-xs rounded-sm uppercase">
                    {template.category}
                  </Badge>
                </div>
                <p className="text-xs text-gray-500">Last edited: {template.lastEdited}</p>
                <div className="flex gap-1 mt-3">
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Edit2 className="h-4 w-4" strokeWidth={1.5} />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Copy className="h-4 w-4" strokeWidth={1.5} />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500">
                    <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Template Editor Dialog */}
      <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
        <DialogContent className="max-w-5xl p-0 rounded-none">
          <DialogHeader className="px-6 pt-6 pb-2">
            <DialogTitle className="text-xl font-light">
              {currentTemplate ? 'Edit Template' : 'Create New Template'}
            </DialogTitle>
          </DialogHeader>
          <div className="px-6 pb-2">
            <div className="space-y-3 py-4">
              <div className="space-y-2">
                <Label htmlFor="template-name" className="text-sm font-light">Template Name</Label>
                <Input 
                  id="template-name" 
                  value={templateName} 
                  onChange={(e) => setTemplateName(e.target.value)} 
                  className="rounded-none"
                  placeholder="e.g. Product Launch"
                />
              </div>
            </div>
            <EmailEditor />
          </div>
          <DialogFooter className="px-6 py-4 border-t border-gray-100">
            <Button 
              variant="outline" 
              onClick={() => setIsEditorOpen(false)}
              className="rounded-none text-xs font-light"
            >
              Cancel
            </Button>
            <Button 
              onClick={() => setIsEditorOpen(false)}
              className="rounded-none text-xs font-light bg-black text-white hover:bg-gray-800"
            >
              Save Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EmailTemplates;
