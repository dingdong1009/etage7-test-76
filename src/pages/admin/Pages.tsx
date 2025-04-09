
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventsManagement from "./components/EventsManagement";
import CuratedStoriesManagement from "./components/CuratedStoriesManagement";

const AdminPages = () => {
  // Available brands (in a real app, this would come from the database)
  const availableBrands = ["Brand One", "Brand Two", "Brand Three", "Brand Four", "Brand Five"];
  
  return (
    <div className="space-y-6">
      <h1 className="text-4xl md:text-6xl uppercase font-thin mb-6">Page Management</h1>
      
      <Tabs defaultValue="events" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="curated">Curated</TabsTrigger>
        </TabsList>
        
        <TabsContent value="events" className="space-y-4">  
          {/* Events Management Section */}
          <EventsManagement availableBrands={availableBrands} />
        </TabsContent>
        
        <TabsContent value="curated" className="space-y-4">
          {/* Curated Stories Management Section */}
          <CuratedStoriesManagement availableBrands={availableBrands} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPages;
