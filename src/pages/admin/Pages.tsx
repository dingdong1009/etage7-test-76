
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

const AdminPages = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Page Management</h1>
      
      <Tabs defaultValue="events" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="curated">Curated</TabsTrigger>
        </TabsList>
        
        <TabsContent value="events" className="space-y-4">
          <Card className="p-6 border border-gray-200">
            <h2 className="text-lg font-medium mb-4">Edit Events Page</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="eventsTitle" className="block text-sm font-medium mb-1">
                  Page Title
                </label>
                <input
                  id="eventsTitle"
                  className="w-full border border-gray-300 rounded-none p-2 focus:outline-none focus:ring-2 focus:ring-black"
                  defaultValue="Events"
                />
              </div>
              
              <div>
                <label htmlFor="eventsHero" className="block text-sm font-medium mb-1">
                  Hero Text
                </label>
                <Textarea
                  id="eventsHero"
                  className="h-24 border-gray-300 rounded-none"
                  defaultValue="ETAGE7 hosts exclusive industry events throughout the year, connecting brands with buyers in meaningful ways."
                />
              </div>
              
              <div>
                <label htmlFor="eventsContent" className="block text-sm font-medium mb-1">
                  Page Content
                </label>
                <div className="border border-gray-300 rounded-none p-2 h-64 bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-500 text-center">Placeholder for Rich Text Editor</span>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" className="border-gray-300">
                  Cancel
                </Button>
                <Button className="bg-black text-white border-none hover:underline">
                  Save Changes
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="curated" className="space-y-4">
          <Card className="p-6 border border-gray-200">
            <h2 className="text-lg font-medium mb-4">Edit Curated Page</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="curatedTitle" className="block text-sm font-medium mb-1">
                  Page Title
                </label>
                <input
                  id="curatedTitle"
                  className="w-full border border-gray-300 rounded-none p-2 focus:outline-none focus:ring-2 focus:ring-black"
                  defaultValue="Curated"
                />
              </div>
              
              <div>
                <label htmlFor="curatedHero" className="block text-sm font-medium mb-1">
                  Hero Text
                </label>
                <Textarea
                  id="curatedHero"
                  className="h-24 border-gray-300 rounded-none"
                  defaultValue="Discover our curated selection of premium brands and products."
                />
              </div>
              
              <div>
                <label htmlFor="curatedContent" className="block text-sm font-medium mb-1">
                  Page Content
                </label>
                <div className="border border-gray-300 rounded-none p-2 h-64 bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-500 text-center">Placeholder for Rich Text Editor</span>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" className="border-gray-300">
                  Cancel
                </Button>
                <Button className="bg-black text-white border-none hover:underline">
                  Save Changes
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPages;
