
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ContractTemplateList from "@/components/admin/contracts/ContractTemplateList";
import CreateContractForm from "@/components/admin/contracts/CreateContractForm";
import { useToast } from "@/hooks/use-toast";

const ContractsPage = () => {
  const [activeTab, setActiveTab] = useState("templates");
  const [statusFilter, setStatusFilter] = useState("all");
  const [visibilityFilter, setVisibilityFilter] = useState("all");
  const { toast } = useToast();

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  // This would typically come from an API call
  const contractTemplates = [
    {
      id: 1,
      name: "Standard Sales Agreement",
      status: "active",
      visibleTo: "both",
      language: "EN",
      createdAt: "2023-09-15",
      lastUpdated: "2024-02-20"
    },
    {
      id: 2,
      name: "Partnership Contract (RU)",
      status: "active",
      visibleTo: "brand",
      language: "RU",
      createdAt: "2023-10-05",
      lastUpdated: "2023-12-10"
    },
    {
      id: 3,
      name: "Brand Representation Agreement",
      status: "inactive",
      visibleTo: "brand",
      language: "EN",
      createdAt: "2023-08-22",
      lastUpdated: "2023-11-30"
    },
    {
      id: 4,
      name: "Buyer Terms and Conditions",
      status: "active",
      visibleTo: "buyer",
      language: "EN",
      createdAt: "2023-07-18",
      lastUpdated: "2024-01-15"
    },
    {
      id: 5,
      name: "Договор купли-продажи",
      status: "active",
      visibleTo: "both",
      language: "RU",
      createdAt: "2023-11-02",
      lastUpdated: "2024-03-05"
    },
    {
      id: 6,
      name: "International Distribution Contract",
      status: "inactive",
      visibleTo: "buyer",
      language: "EN",
      createdAt: "2024-01-10",
      lastUpdated: "2024-01-10"
    },
  ];

  const handleViewTemplate = (templateId: number) => {
    // View template logic
    toast({
      title: "Viewing template",
      description: `Opening template ID: ${templateId}`,
    });
  };

  const handleEditTemplate = (templateId: number) => {
    // Edit template logic
    toast({
      title: "Editing template",
      description: `Now editing template ID: ${templateId}`,
    });
  };

  const handleDeleteTemplate = (templateId: number) => {
    // Delete template logic
    toast({
      title: "Template deleted",
      description: `Template ID: ${templateId} has been deleted`,
    });
  };

  const handleAddTemplate = () => {
    setActiveTab("create");
  };

  const handleCreateContract = (data: any) => {
    // Create contract logic
    console.log("Creating contract with data:", data);
    toast({
      title: "Contract created",
      description: `New ${data.type} contract created in ${data.language}`,
    });
  };

  return (
    <div className="container mx-auto p-4 animate-fade-in">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-thin tracking-tighter uppercase mb-2">Contract Management</h1>
          <p className="text-gray-500 text-sm">
            Create and manage contract templates for brands and buyers
          </p>
        </div>

        <Tabs defaultValue="templates" value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="templates" className="text-sm">Templates</TabsTrigger>
            <TabsTrigger value="create" className="text-sm">Create New Contract</TabsTrigger>
          </TabsList>
          
          <TabsContent value="templates" className="space-y-4">
            <ContractTemplateList
              templates={contractTemplates}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              visibilityFilter={visibilityFilter}
              setVisibilityFilter={setVisibilityFilter}
              handleAddTemplate={handleAddTemplate}
              handleViewTemplate={handleViewTemplate}
              handleEditTemplate={handleEditTemplate}
              handleDeleteTemplate={handleDeleteTemplate}
            />
          </TabsContent>
          
          <TabsContent value="create">
            <CreateContractForm onSubmit={handleCreateContract} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ContractsPage;
