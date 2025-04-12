
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventsManagement from "./components/EventsManagement";
import CuratedStoriesManagement from "./components/CuratedStoriesManagement";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileText, ArrowRight } from "lucide-react";

const AdminPages = () => {
  // Available brands (in a real app, this would come from the database)
  const availableBrands = ["Brand One", "Brand Two", "Brand Three", "Brand Four", "Brand Five"];
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-4xl md:text-6xl uppercase font-thin">
          PAGE <span className="font-normal">MANAGEMENT</span>
        </h1>
        
        <div className="flex flex-wrap gap-4 mt-4 lg:mt-0">
          <Button 
            className="admin-button-primary"
            onClick={() => console.log("Add new page")}
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Add New Page
          </Button>
          <Button variant="outline" className="admin-button-outline">
            <FileText className="w-4 h-4 mr-2" />
            View All Pages
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="events" className="w-full">
        <TabsList className="border-b border-gray-200 w-full flex justify-start overflow-x-auto pb-0 mb-6">
          <TabsTrigger 
            value="events" 
            className="text-sm font-light data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2"
          >
            Events
          </TabsTrigger>
          <TabsTrigger 
            value="curated" 
            className="text-sm font-light data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2"
          >
            Curated Stories
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="events" className="mt-0">
          <Card className="border border-gray-200 shadow-none rounded-lg">
            <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
              <CardTitle className="text-lg font-medium text-gray-900">
                Events Management
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {/* Events Management Section */}
              <EventsManagement availableBrands={availableBrands} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="curated" className="mt-0">
          <Card className="border border-gray-200 shadow-none rounded-lg">
            <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
              <CardTitle className="text-lg font-medium text-gray-900">
                Curated Stories Management
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {/* Curated Stories Management Section */}
              <CuratedStoriesManagement availableBrands={availableBrands} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-8 text-center">
        <h3 className="text-xl font-medium mb-4">Need help managing your pages?</h3>
        <p className="mb-6 max-w-2xl mx-auto text-gray-600">
          Our comprehensive guides and tutorials will help you optimize your page management strategy.
        </p>
        <Button variant="outline" className="border-black text-black hover:bg-gray-100">
          View Page Management Guides <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default AdminPages;
