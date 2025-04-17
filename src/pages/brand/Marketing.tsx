
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BuyerInsights from "@/components/brand/marketing/BuyerInsights";
import EmailCampaigns from "@/components/brand/marketing/EmailCampaigns";
import FollowUps from "@/components/brand/marketing/FollowUps";
import CreditsInfo from "@/components/brand/marketing/CreditsInfo";

const Marketing = () => {
  const [activeTab, setActiveTab] = useState("insights");

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-1">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tighter uppercase">MARKETING</h1>
        <p className="text-sm font-light text-gray-600 max-w-2xl">
          Connect with your buyers through targeted communications and gain insights into their engagement with your brand.
        </p>
      </div>

      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="border-b border-gray-100">
          <TabsList className="bg-transparent p-0 h-auto mb-[-1px]">
            <TabsTrigger 
              value="insights" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none data-[state=active]:rounded-none data-[state=active]:bg-transparent px-4 py-2 h-auto text-xs uppercase font-light"
            >
              Buyer Insights
            </TabsTrigger>
            <TabsTrigger 
              value="campaigns" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none data-[state=active]:rounded-none data-[state=active]:bg-transparent px-4 py-2 h-auto text-xs uppercase font-light"
            >
              Email Campaigns
            </TabsTrigger>
            <TabsTrigger 
              value="followups" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none data-[state=active]:rounded-none data-[state=active]:bg-transparent px-4 py-2 h-auto text-xs uppercase font-light"
            >
              Follow-ups
            </TabsTrigger>
            <TabsTrigger 
              value="credits" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none data-[state=active]:rounded-none data-[state=active]:bg-transparent px-4 py-2 h-auto text-xs uppercase font-light"
            >
              Credits
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="insights" className="mt-6">
          <BuyerInsights />
        </TabsContent>
        
        <TabsContent value="campaigns" className="mt-6">
          <EmailCampaigns />
        </TabsContent>
        
        <TabsContent value="followups" className="mt-6">
          <FollowUps />
        </TabsContent>
        
        <TabsContent value="credits" className="mt-6">
          <CreditsInfo />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Marketing;
