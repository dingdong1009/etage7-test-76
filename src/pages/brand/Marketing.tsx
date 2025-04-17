
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info, Mail, Users, ShoppingCart, Eye, CreditCard } from "lucide-react";
import BrandInsights from "@/components/brand/marketing/BrandInsights";
import EmailCampaigns from "@/components/brand/marketing/EmailCampaigns";
import EmailTemplates from "@/components/brand/marketing/EmailTemplates";
import CreditSystem from "@/components/brand/marketing/CreditSystem";

const Marketing = () => {
  const [activeTab, setActiveTab] = useState<string>("insights");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tighter uppercase mb-6">
          MARKETING
        </h1>
        <Button 
          className="bg-black text-white hover:bg-gray-800 text-xs font-light rounded-none"
          onClick={() => setActiveTab("campaigns")}
        >
          <Mail className="mr-2 h-4 w-4" strokeWidth={1} />
          New Campaign
        </Button>
      </div>

      <Tabs defaultValue="insights" value={activeTab} onValueChange={setActiveTab}>
        <div className="border-t border-gray-200 mb-6">
          <TabsList className="border-b border-gray-200 w-full flex justify-start overflow-x-auto pb-0 mb-6 bg-transparent">
            <TabsTrigger 
              value="insights" 
              className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2 data-[state=active]:shadow-none"
            >
              Buyer Insights
            </TabsTrigger>
            <TabsTrigger 
              value="campaigns" 
              className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2 data-[state=active]:shadow-none"
            >
              Email Campaigns
            </TabsTrigger>
            <TabsTrigger 
              value="templates" 
              className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2 data-[state=active]:shadow-none"
            >
              Email Templates
            </TabsTrigger>
            <TabsTrigger 
              value="credits" 
              className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2 data-[state=active]:shadow-none"
            >
              Email Credits
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="insights" className="animate-fade-in">
          <BrandInsights />
        </TabsContent>

        <TabsContent value="campaigns" className="animate-fade-in">
          <EmailCampaigns />
        </TabsContent>

        <TabsContent value="templates" className="animate-fade-in">
          <EmailTemplates />
        </TabsContent>

        <TabsContent value="credits" className="animate-fade-in">
          <CreditSystem />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Marketing;
