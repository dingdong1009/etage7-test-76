
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Subscriptions from "@/components/admin/paid-services/Subscriptions";
import ConsultingServices from "@/components/admin/paid-services/ConsultingServices";
import MarketingCredits from "@/components/admin/paid-services/MarketingCredits";
import Advertisements from "@/components/admin/paid-services/Advertisements";
import EMarketing from "@/components/admin/paid-services/EMarketing";
import CreateService from "@/components/admin/paid-services/CreateService";

const PaidServices = () => {
  const [activeTab, setActiveTab] = useState("subscriptions");

  const handleAddNewService = (serviceType: string) => {
    setActiveTab("create");
    // The CreateService component will receive this value to pre-select the service type
    localStorage.setItem("selectedServiceType", serviceType);
  };

  return (
    <div className="space-y-6 pt-5">
      <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tighter uppercase mb-6">PAID SERVICES</h1>

      <div className="pt-10">
        <Tabs defaultValue="subscriptions" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="border-b border-gray-200 w-full flex justify-start overflow-x-auto pb-0 mb-6 bg-transparent">
              <TabsTrigger 
                value="subscriptions" 
                className="text-xs font-normal uppercase border-r border-white data-[state=active]:bg-black data-[state=active]:text-white rounded-none hover:bg-black hover:text-white px-6 py-2 data-[state=active]:shadow-none data-[state=active]:border-r data-[state=active]:border-white"
                >
                Subscriptions
              </TabsTrigger>
              <TabsTrigger 
                value="consulting" 
                className="text-xs font-normal uppercase border-x border-white data-[state=active]:bg-black data-[state=active]:text-white rounded-none hover:bg-black hover:text-white px-6 py-2 data-[state=active]:shadow-none data-[state=active]:border-x data-[state=active]:border-white"
                >
                Consulting Services
              </TabsTrigger>
              <TabsTrigger 
                value="marketing" 
                className="text-xs font-normal uppercase border-x border-white data-[state=active]:bg-black data-[state=active]:text-white rounded-none hover:bg-black hover:text-white px-6 py-2 data-[state=active]:shadow-none data-[state=active]:border-x data-[state=active]:border-white"
                >
                Marketing Credits
              </TabsTrigger>
              <TabsTrigger 
                value="advertisement" 
                className="text-xs font-normal uppercase border-x border-white data-[state=active]:bg-black data-[state=active]:text-white rounded-none hover:bg-black hover:text-white px-6 py-2 data-[state=active]:shadow-none data-[state=active]:border-x data-[state=active]:border-white"
                >
                Advertisement
              </TabsTrigger>
              <TabsTrigger 
                value="emarketing" 
                className="text-xs font-normal uppercase border-x border-white data-[state=active]:bg-black data-[state=active]:text-white rounded-none hover:bg-black hover:text-white px-6 py-2 data-[state=active]:shadow-none data-[state=active]:border-x data-[state=active]:border-white"
                >
                eMarketing
              </TabsTrigger>
              <TabsTrigger 
                value="create" 
                className="text-xs font-normal uppercase border-l border-white data-[state=active]:bg-black data-[state=active]:text-white rounded-none hover:bg-black hover:text-white px-6 py-2 data-[state=active]:shadow-none data-[state=active]:border-l data-[state=active]:border-white"
                >
                Create New Service
              </TabsTrigger>
            </TabsList>

          <TabsContent value="subscriptions">
            <Subscriptions onAddClick={() => handleAddNewService("subscription")} />
          </TabsContent>
          
          <TabsContent value="consulting">
            <ConsultingServices onAddClick={() => handleAddNewService("consulting")} />
          </TabsContent>
          
          <TabsContent value="marketing">
            <MarketingCredits />
          </TabsContent>
          
          <TabsContent value="advertisement">
            <Advertisements onAddClick={() => handleAddNewService("advertisement")} />
          </TabsContent>
          
          <TabsContent value="emarketing">
            <EMarketing />
          </TabsContent>
          
          <TabsContent value="create">
            <CreateService />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PaidServices;
