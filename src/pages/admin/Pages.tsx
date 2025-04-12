
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventsManagement from "./components/EventsManagement";
import CuratedStoriesManagement from "./components/CuratedStoriesManagement";

const AdminPages = () => {
  // Available brands (in a real app, this would come from the database)
  const availableBrands = ["Brand One", "Brand Two", "Brand Three", "Brand Four", "Brand Five"];
  
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="admin-title">Page Management</h1>
      
      <Tabs defaultValue="events" className="w-full">
        <TabsList className="mb-6 space-x-2">
          <TabsTrigger value="events" className="px-6 py-2">Events</TabsTrigger>
          <TabsTrigger value="curated" className="px-6 py-2">Curated</TabsTrigger>
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
    </div>
  );
};

export default AdminPages;
