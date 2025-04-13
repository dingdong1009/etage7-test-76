
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
import { Wand, Edit, Trash2, Eye, Download, Search, Plus, Globe, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Define template interface
interface ContractTemplate {
  id: number;
  name: string;
  type: string;
  status: "active" | "draft" | "inactive";
  language: "english" | "russian";
  lastUpdated: string;
  visibleTo: "buyers" | "brands" | "both";
  content?: string;
}

const AdminContracts = () => {
  const [viewMode, setViewMode] = useState<"list" | "create">("list");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<ContractTemplate | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [visibilityFilter, setVisibilityFilter] = useState("all");
  const [languageFilter, setLanguageFilter] = useState("all");
  const [isGenerating, setIsGenerating] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [templateType, setTemplateType] = useState("");
  const [templateLanguage, setTemplateLanguage] = useState("");
  const [templateVisibility, setTemplateVisibility] = useState("");
  const [templateContent, setTemplateContent] = useState("");
  const { toast } = useToast();

  // Sample data for contract templates
  const contractTemplates: ContractTemplate[] = [
    { 
      id: 1, 
      name: "Basic Sales Agreement", 
      type: "Sales Contract", 
      status: "active", 
      language: "english", 
      lastUpdated: "Apr 1, 2025",
      visibleTo: "both" 
    },
    { 
      id: 2, 
      name: "Premium Brand Partnership", 
      type: "Brand Agreement", 
      status: "active", 
      language: "english", 
      lastUpdated: "Mar 28, 2025",
      visibleTo: "brands" 
    },
    { 
      id: 3, 
      name: "Соглашение о покупке", 
      type: "Buyer Agreement", 
      status: "draft", 
      language: "russian", 
      lastUpdated: "Mar 15, 2025",
      visibleTo: "buyers" 
    },
    { 
      id: 4, 
      name: "Договор о партнерстве", 
      type: "Partnership Contract", 
      status: "inactive", 
      language: "russian", 
      lastUpdated: "Apr 10, 2025",
      visibleTo: "both" 
    },
    { 
      id: 5, 
      name: "Seasonal Collection Agreement", 
      type: "Brand Agreement", 
      status: "active", 
      language: "english", 
      lastUpdated: "Apr 8, 2025",
      visibleTo: "brands" 
    },
  ];

  const handleEdit = (template: ContractTemplate) => {
    setSelectedTemplate(template);
    setEditDialogOpen(true);
  };

  const handleDelete = (template: ContractTemplate) => {
    setSelectedTemplate(template);
    setDeleteDialogOpen(true);
  };

  const handleView = (template: ContractTemplate) => {
    setSelectedTemplate(template);
    setViewDialogOpen(true);
  };

  const confirmDelete = () => {
    console.log(`Deleting contract with ID: ${selectedTemplate?.id}`);
    setDeleteDialogOpen(false);
    // Actual delete functionality would go here
  };

  // Filter templates based on search query, status, visibility, and language
  const filterTemplates = () => {
    return contractTemplates.filter(template => {
      const matchesQuery = !searchQuery || 
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        template.type.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || template.status === statusFilter;
      
      const matchesVisibility = visibilityFilter === "all" || 
        template.visibleTo === visibilityFilter || 
        (visibilityFilter === "buyers" && template.visibleTo === "both") ||
        (visibilityFilter === "brands" && template.visibleTo === "both");
      
      const matchesLanguage = languageFilter === "all" || template.language === languageFilter;
      
      return matchesQuery && matchesStatus && matchesVisibility && matchesLanguage;
    });
  };

  const filteredTemplates = filterTemplates();

  const handleAiGenerate = async () => {
    // Validation checks
    if (!templateType || !templateLanguage) {
      toast({
        title: "Missing information",
        description: "Please select a contract type and language before generating",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      console.log("AI generation requested");
      // In a real implementation, this would call an API endpoint
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay

      const legalFramework = templateLanguage === "russian" ? "Russian Commercial Law" : "International Trade Law";
      const generatedContent = `
# ${templateType} - ${templateLanguage.toUpperCase()}

## LEGAL FRAMEWORK: ${legalFramework}

### PREAMBLE
This agreement ("Agreement") is entered into as of the Effective Date by and between the parties.

### DEFINITIONS
1. "Effective Date" means the date on which this Agreement is signed by all parties.
2. "Goods" means the products described in the applicable purchase order.
3. "Services" means the services described in the applicable statement of work.

### TERMS AND CONDITIONS
1. The Seller agrees to provide the Goods and/or Services in accordance with this Agreement.
2. Payment shall be made within thirty (30) days of receipt of a valid invoice.
3. All deliveries shall be made in accordance with the delivery schedule agreed upon by the parties.

### GOVERNING LAW
This Agreement shall be governed by and construed in accordance with the laws of 
${templateLanguage === "russian" ? "the Russian Federation" : "the jurisdiction specified in the applicable purchase order"}.

### DISPUTE RESOLUTION
Any dispute arising out of or in connection with this Agreement shall be resolved through 
${templateLanguage === "russian" ? "arbitration at the International Commercial Arbitration Court at the Chamber of Commerce and Industry of the Russian Federation" : "arbitration in accordance with the rules of the International Chamber of Commerce"}.
      `;

      setTemplateContent(generatedContent);
      
      toast({
        title: "Contract generated",
        description: "AI has created a contract template based on your selections",
      });
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "There was an error generating the contract",
        variant: "destructive",
      });
      console.error("Error generating contract:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tighter uppercase mb-6">CONTRACT MANAGEMENT</h1>
      
      <Tabs defaultValue="list" className="w-full">
        <div className="border-t border-gray-200 mb-6">
          <TabsList className="border-b border-gray-200 w-full flex justify-start overflow-x-auto pb-0 mb-6 bg-transparent">
            <TabsTrigger 
              value="list" 
              className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2 data-[state=active]:shadow-none"
              onClick={() => setViewMode("list")}
            >
              Contract Templates
            </TabsTrigger>
            <TabsTrigger 
              value="create" 
              className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2 data-[state=active]:shadow-none"
              onClick={() => setViewMode("create")}
            >
              Create New Contract
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="list" className="mt-0">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search contracts..."
                className="pl-9 bg-white border-gray-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Select
                value={statusFilter}
                onValueChange={(value) => setStatusFilter(value)}
              >
                <SelectTrigger className="w-[140px] border-gray-200 bg-white text-sm">
                  <SelectValue placeholder="Filter status" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={visibilityFilter}
                onValueChange={(value) => setVisibilityFilter(value)}
              >
                <SelectTrigger className="w-[140px] border-gray-200 bg-white text-sm">
                  <SelectValue placeholder="Filter visibility" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">All Visibility</SelectItem>
                  <SelectItem value="buyers">Buyers</SelectItem>
                  <SelectItem value="brands">Brands</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={languageFilter}
                onValueChange={(value) => setLanguageFilter(value)}
              >
                <SelectTrigger className="w-[140px] border-gray-200 bg-white text-sm">
                  <SelectValue placeholder="Filter language" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">All Languages</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="russian">Russian</SelectItem>
                </SelectContent>
              </Select>

              <Button className="bg-black hover:bg-gray-800 text-white text-sm" onClick={() => setViewMode("create")}>
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
                      <TableHead className="w-[250px] font-medium text-gray-600 text-sm">Name</TableHead>
                      <TableHead className="font-medium text-gray-600 text-sm">Type</TableHead>
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
                          No contract templates found with the current filters
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredTemplates.map((template) => (
                        <TableRow key={template.id} className="border-t border-gray-100 hover:bg-gray-50/50">
                          <TableCell className="font-medium">{template.name}</TableCell>
                          <TableCell>{template.type}</TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline"
                              className={`
                                ${template.status === "active" ? "bg-accent-mint text-gray-800 border-accent-mint" :
                                  template.status === "draft" ? "bg-accent-yellow text-gray-800 border-accent-yellow" :
                                  "bg-gray-100 text-gray-700 border-gray-200"}
                                text-xs font-medium px-2 py-0.5
                              `}
                            >
                              {template.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200 text-xs font-medium px-2 py-0.5">
                              {template.visibleTo === "both" ? "Buyers & Brands" : 
                               template.visibleTo === "buyers" ? "Buyers Only" : 
                               "Brands Only"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Globe className="h-4 w-4 mr-2 text-gray-500" />
                              {template.language === "english" ? "English" : "Russian"}
                            </div>
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
                              onClick={() => handleEdit(template)}
                              title="Edit"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 p-0 hover:bg-gray-100 text-red-600"
                              onClick={() => handleDelete(template)}
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
        </TabsContent>
        
        <TabsContent value="create" className="mt-0">
          <Card className="border border-gray-200 shadow-none rounded-lg">
            <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
              <CardTitle className="text-lg font-medium text-gray-900">Create New Contract Template</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="templateName" className="block text-sm font-medium mb-1">
                      Template Name
                    </label>
                    <Input
                      id="templateName"
                      placeholder="Enter template name"
                      className="w-full border-gray-200"
                      value={templateName}
                      onChange={(e) => setTemplateName(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="templateType" className="block text-sm font-medium mb-1">
                      Contract Type
                    </label>
                    <Select value={templateType} onValueChange={setTemplateType}>
                      <SelectTrigger className="w-full border-gray-200">
                        <SelectValue placeholder="Select contract type" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="sales">Sales Contract</SelectItem>
                        <SelectItem value="partnership">Partnership Contract</SelectItem>
                        <SelectItem value="brand">Brand Agreement</SelectItem>
                        <SelectItem value="buyer">Buyer Agreement</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="language" className="block text-sm font-medium mb-1">
                      Language
                    </label>
                    <Select value={templateLanguage} onValueChange={setTemplateLanguage}>
                      <SelectTrigger className="w-full border-gray-200">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="russian">Russian</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label htmlFor="visibleTo" className="block text-sm font-medium mb-1">
                      Visible To
                    </label>
                    <Select value={templateVisibility} onValueChange={setTemplateVisibility}>
                      <SelectTrigger className="w-full border-gray-200">
                        <SelectValue placeholder="Select visibility" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="buyers">Buyers Only</SelectItem>
                        <SelectItem value="brands">Brands Only</SelectItem>
                        <SelectItem value="both">Buyers & Brands</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="content" className="block text-sm font-medium mb-1">
                    Contract Content
                  </label>
                  <Textarea
                    id="content"
                    placeholder="Enter contract template content or click 'Generate with AI' to create content automatically"
                    className="h-64 border-gray-200"
                    value={templateContent}
                    onChange={(e) => setTemplateContent(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-3">
                  <Button className="bg-black hover:bg-gray-800 text-white">
                    Save Template
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-gray-200 hover:bg-gray-50"
                    onClick={(e) => {
                      e.preventDefault();
                      handleAiGenerate();
                    }}
                    disabled={isGenerating}
                  >
                    <Wand className="mr-2 h-4 w-4" />
                    {isGenerating ? "Generating..." : "Generate with AI"}
                  </Button>
                </div>

                <div className="bg-gray-50 p-4 rounded border border-gray-200">
                  <h3 className="font-medium mb-2">AI Contract Assistant</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Our specialized AI can help draft contracts based on both Russian Law and International Law standards. 
                    Choose your contract type, language, and click "Generate with AI" to create a professional contract template.
                  </p>
                  <div className="flex items-center text-xs text-gray-500">
                    <FileText className="h-4 w-4 mr-1" />
                    Available expertise: Russian Commercial Law, International Trade Law, CISG Standards
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* View Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-[725px] max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-xl font-light">{selectedTemplate?.name}</DialogTitle>
            <DialogDescription>
              {selectedTemplate?.type} | {selectedTemplate?.language === "english" ? "English" : "Russian"}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 overflow-y-auto max-h-[calc(90vh-200px)]">
            <div className="border rounded p-4">
              <div className="bg-gray-50 p-6 overflow-auto min-h-[300px]">
                <h2 className="text-xl font-medium mb-4">{selectedTemplate?.name}</h2>
                <p className="mb-4 text-sm text-gray-600">This is a preview of the {selectedTemplate?.type} template.</p>
                <p className="text-sm">
                  {selectedTemplate?.language === "english" 
                    ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim." 
                    : "Лорем ипсум долор сит амет, цонсецтетур адиписцинг элит. Нуллам ин дуи маурис. Вивамус хендрерит арцу сед ерат моллис вехицула. Сед ауцтор нецуе еу теллус рхонцус ут елеифенд нибх портитор."}
                </p>
                <p className="text-sm mt-4">
                  {selectedTemplate?.language === "english"
                    ? "Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio. Proin quis tortor orci. Etiam at risus et justo dignissim congue."
                    : "Суспендиссе дицтум феугиат нисл ут дапибус. Маурис иацулис порттитор посуере. Праесент ид метус масса, ут бландит одио. Проин цуис тортор орци. Этиам ат рисус ет юсто дигниссим цонгуе."}
                </p>
                <h3 className="text-lg font-medium mt-6 mb-2">
                  {selectedTemplate?.language === "english" ? "Terms and Conditions" : "Условия и положения"}
                </h3>
                <ul className="list-disc pl-5 text-sm">
                  <li className="mb-1">{selectedTemplate?.language === "english" 
                    ? "All services described in this agreement will be delivered as specified."
                    : "Все услуги, описанные в настоящем соглашении, будут оказаны в соответствии с указанными условиями."}</li>
                  <li className="mb-1">{selectedTemplate?.language === "english" 
                    ? "Payment terms are net 30 days from date of invoice."
                    : "Условия оплаты - 30 дней с даты выставления счета."}</li>
                  <li className="mb-1">{selectedTemplate?.language === "english" 
                    ? "This agreement is valid for the period specified unless terminated by either party."
                    : "Настоящее соглашение действительно в течение указанного периода, если оно не будет расторгнуто любой из сторон."}</li>
                </ul>
              </div>
            </div>
            
            {selectedTemplate && (
              <div className="mt-4 space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Details:</h3>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-gray-200"
                  >
                    <Download size={14} className="mr-1" /> Download PDF
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm flex justify-between">
                      <span className="text-gray-600">Type:</span> 
                      <span className="font-medium">{selectedTemplate.type}</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm flex justify-between">
                      <span className="text-gray-600">Status:</span> 
                      <Badge 
                        className={`
                          ${selectedTemplate.status === "active" ? "bg-accent-mint text-gray-800" :
                            selectedTemplate.status === "draft" ? "bg-accent-yellow text-gray-800" :
                            "bg-gray-100 text-gray-800"}
                          text-xs font-medium px-2 py-0.5
                        `}
                      >
                        {selectedTemplate.status}
                      </Badge>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm flex justify-between">
                      <span className="text-gray-600">Visible To:</span>
                      <span>{selectedTemplate.visibleTo === "both" ? "Buyers & Brands" : 
                              selectedTemplate.visibleTo === "buyers" ? "Buyers Only" : 
                              "Brands Only"}</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm flex justify-between">
                      <span className="text-gray-600">Last Updated:</span>
                      <span>{selectedTemplate.lastUpdated}</span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div> 
          <DialogFooter className="gap-2">
            <Button variant="outline" className="border-gray-200" onClick={() => setViewDialogOpen(false)}>
              Close
            </Button>
            <Button 
              className="bg-black text-white" 
              onClick={() => {
                setViewDialogOpen(false);
                if (selectedTemplate) handleEdit(selectedTemplate);
              }}
            >
              Edit Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-xl font-light uppercase mb-6">Edit Contract Template</DialogTitle>
          </DialogHeader>
          <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="edit-name" className="block text-sm font-medium mb-1">
                    Template Name
                  </label>
                  <Input id="edit-name" defaultValue={selectedTemplate?.name} className="border-gray-200" />
                </div>
                
                <div>
                  <label htmlFor="edit-type" className="block text-sm font-medium mb-1">
                    Contract Type
                  </label>
                  <Select defaultValue={selectedTemplate?.type?.toLowerCase().replace(' ', '-')}>
                    <SelectTrigger className="border-gray-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="sales-contract">Sales Contract</SelectItem>
                      <SelectItem value="partnership-contract">Partnership Contract</SelectItem>
                      <SelectItem value="brand-agreement">Brand Agreement</SelectItem>
                      <SelectItem value="buyer-agreement">Buyer Agreement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="edit-status" className="block text-sm font-medium mb-1">
                    Status
                  </label>
                  <Select defaultValue={selectedTemplate?.status}>
                    <SelectTrigger className="border-gray-200">
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
                  <label htmlFor="edit-visibleTo" className="block text-sm font-medium mb-1">
                    Visible To
                  </label>
                  <Select defaultValue={selectedTemplate?.visibleTo}>
                    <SelectTrigger className="border-gray-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="buyers">Buyers Only</SelectItem>
                      <SelectItem value="brands">Brands Only</SelectItem>
                      <SelectItem value="both">Buyers & Brands</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <label htmlFor="edit-language" className="block text-sm font-medium mb-1">
                  Language
                </label>
                <Select defaultValue={selectedTemplate?.language}>
                  <SelectTrigger className="border-gray-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="russian">Russian</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label htmlFor="edit-content" className="block text-sm font-medium mb-1">
                  Content
                </label>
                <Textarea 
                  id="edit-content" 
                  className="h-48 border-gray-200" 
                  defaultValue="Contract template content..." 
                />
              </div>
              
              <div className="flex gap-3 pt-2">
                <Button variant="outline" onClick={() => setEditDialogOpen(false)} className="border-gray-200">
                  Cancel
                </Button>
                <Button className="bg-black text-white">
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the contract template "{selectedTemplate?.name}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-200">Cancel</AlertDialogCancel>
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
