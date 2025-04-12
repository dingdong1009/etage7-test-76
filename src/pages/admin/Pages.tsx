
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventsManagement from "./components/EventsManagement";
import CuratedStoriesManagement from "./components/CuratedStoriesManagement";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminPages = () => {
  // Available brands (in a real app, this would come from the database)
  const availableBrands = ["Brand One", "Brand Two", "Brand Three", "Brand Four", "Brand Five"];
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
        <h1 className="text-4xl md:text-6xl font-light tracking-tighter uppercase">Page Management</h1>
      </div>
      
      <Card className="border border-gray-200 shadow-none rounded-lg overflow-hidden">
        <CardHeader className="bg-gray-50/80 px-6 py-5 border-b border-gray-100">
          <CardTitle className="text-lg font-medium text-gray-900">
            Website Content Pages
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="events" className="w-full">
            <TabsList className="mb-6 inline-flex space-x-2 bg-transparent p-0">
              <TabsTrigger 
                value="events" 
                className="px-5 py-2 data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow-none border border-gray-200 rounded-none text-sm"
              >
                Events
              </TabsTrigger>
              <TabsTrigger 
                value="curated" 
                className="px-5 py-2 data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow-none border border-gray-200 rounded-none text-sm"
              >
                Curated Stories
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="events" className="space-y-6 pt-2">  
              {/* Events Management Section */}
              <EventsManagement availableBrands={availableBrands} />
            </TabsContent>
            
            <TabsContent value="curated" className="space-y-6 pt-2">
              {/* Curated Stories Management Section */}
              <CuratedStoriesManagement availableBrands={availableBrands} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPages;
