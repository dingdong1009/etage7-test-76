
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import Subscriptions from "@/components/admin/paid-services/Subscriptions";
import ConsultingServices from "@/components/admin/paid-services/ConsultingServices";
import MarketingCredits from "@/components/admin/paid-services/MarketingCredits";
import Advertisements from "@/components/admin/paid-services/Advertisements";
import EMarketing from "@/components/admin/paid-services/EMarketing";
import CreateService from "@/components/admin/paid-services/CreateService";

const PaidServices = () => {
  const [activeTab, setActiveTab] = useState("subscriptions");

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tighter uppercase mb-6">PAID SERVICES</h1>
        <p className="text-lg text-gray-600 mb-8">Manage subscriptions and additional services offered on the platform.</p>
      </div>

      <Card className="border border-gray-200 shadow-none rounded-none">
        <Tabs defaultValue="subscriptions" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="border-b border-gray-200">
            <TabsList className="bg-transparent w-full justify-start overflow-x-auto">
              <TabsTrigger 
                value="subscriptions" 
                className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-4 data-[state=active]:shadow-none"
              >
                Subscriptions
              </TabsTrigger>
              <TabsTrigger 
                value="consulting" 
                className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-4 data-[state=active]:shadow-none"
              >
                Consulting Services
              </TabsTrigger>
              <TabsTrigger 
                value="marketing" 
                className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-4 data-[state=active]:shadow-none"
              >
                Marketing Credits
              </TabsTrigger>
              <TabsTrigger 
                value="advertisement" 
                className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-4 data-[state=active]:shadow-none"
              >
                Advertisement
              </TabsTrigger>
              <TabsTrigger 
                value="emarketing" 
                className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-4 data-[state=active]:shadow-none"
              >
                eMarketing
              </TabsTrigger>
              <TabsTrigger 
                value="create" 
                className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-4 data-[state=active]:shadow-none"
              >
                Create New Service
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="subscriptions" className="p-6">
            <Subscriptions />
          </TabsContent>
          
          <TabsContent value="consulting" className="p-6">
            <ConsultingServices />
          </TabsContent>
          
          <TabsContent value="marketing" className="p-6">
            <MarketingCredits />
          </TabsContent>
          
          <TabsContent value="advertisement" className="p-6">
            <Advertisements />
          </TabsContent>
          
          <TabsContent value="emarketing" className="p-6">
            <EMarketing />
          </TabsContent>
          
          <TabsContent value="create" className="p-6">
            <CreateService />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default PaidServices;
