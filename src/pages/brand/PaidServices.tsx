
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, CreditCard, Check, ArrowRight, Package, Bell } from "lucide-react";
import BrandSubscriptions from "./Subscriptions";
import BrandAdditionalServices from "./AdditionalServices";

const PaidServices = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl md:text-5xl uppercase font-light mb-2">PAID SERVICES</h1>
        <p className="text-gray-500 text-lg font-light">Manage your subscriptions and additional services</p>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full space-y-8">
        <div className="border-t border-gray-200">
          <TabsList className="border-b border-gray-200 w-full flex justify-start overflow-x-auto pb-0 mb-6 bg-transparent">
            <TabsTrigger 
              value="overview" 
              className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2 data-[state=active]:shadow-none"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="subscriptions" 
              className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2 data-[state=active]:shadow-none"
            >
              Subscriptions
            </TabsTrigger>
            <TabsTrigger 
              value="additional-services" 
              className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2 data-[state=active]:shadow-none"
            >
              Additional Services
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="space-y-6">
          {/* Current Plan Summary Card */}
          <Card className="border border-gray-200 shadow-none rounded-none">
            <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
              <CardTitle className="text-base font-light">Current Plan & Services</CardTitle>
              <CardDescription>Overview of your active subscriptions and services</CardDescription>
            </CardHeader>
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Current Subscription */}
              <div className="space-y-4">
                <h3 className="text-lg font-light">Active Subscription</h3>
                <div className="p-4 border border-gray-200 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge className="mb-2 bg-black hover:bg-gray-800 text-white font-normal">Professional</Badge>
                      <h4 className="text-xl font-light">$49.99<span className="text-sm font-normal text-gray-500">/month</span></h4>
                    </div>
                    <Button variant="outline" size="sm" className="text-xs border-black text-black hover:bg-gray-50 rounded-none">
                      Manage
                    </Button>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Renews on May 1, 2025</span>
                  </div>
                </div>
              </div>

              {/* Active Services */}
              <div className="space-y-4">
                <h3 className="text-lg font-light">Active Services</h3>
                <div className="p-4 border border-gray-200 space-y-3">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-accent-mint text-gray-800 hover:bg-accent-mint/80 font-normal">Active</Badge>
                        <span className="text-sm">Marketing Campaign</span>
                      </div>
                      <Button variant="outline" size="sm" className="text-xs border-gray-200 hover:bg-gray-50 rounded-none">
                        View
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-accent-mint text-gray-800 hover:bg-accent-mint/80 font-normal">Active</Badge>
                        <span className="text-sm">SEO Optimization</span>
                      </div>
                      <Button variant="outline" size="sm" className="text-xs border-gray-200 hover:bg-gray-50 rounded-none">
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border border-gray-200 shadow-none rounded-none hover:border-black transition-colors">
              <CardContent className="p-6 flex flex-col items-start gap-4">
                <div className="h-10 w-10 rounded-full flex items-center justify-center bg-gray-50">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Update Payment Method</h3>
                  <p className="text-sm text-gray-500">Manage your billing information and payment details</p>
                </div>
                <Button variant="outline" className="mt-auto w-full justify-between border-gray-200 hover:bg-gray-50 rounded-none">
                  Manage Payment <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-none rounded-none hover:border-black transition-colors">
              <CardContent className="p-6 flex flex-col items-start gap-4">
                <div className="h-10 w-10 rounded-full flex items-center justify-center bg-gray-50">
                  <Package className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Compare Plans</h3>
                  <p className="text-sm text-gray-500">Explore different subscription plans and their features</p>
                </div>
                <Button variant="outline" className="mt-auto w-full justify-between border-gray-200 hover:bg-gray-50 rounded-none">
                  View Plans <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-none rounded-none hover:border-black transition-colors">
              <CardContent className="p-6 flex flex-col items-start gap-4">
                <div className="h-10 w-10 rounded-full flex items-center justify-center bg-gray-50">
                  <Bell className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Billing Notifications</h3>
                  <p className="text-sm text-gray-500">Update your billing notification preferences</p>
                </div>
                <Button variant="outline" className="mt-auto w-full justify-between border-gray-200 hover:bg-gray-50 rounded-none">
                  Manage Alerts <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="subscriptions">
          <BrandSubscriptions />
        </TabsContent>

        <TabsContent value="additional-services">
          <BrandAdditionalServices />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaidServices;
