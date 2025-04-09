
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const AdminAnnouncements = () => {
  const pastAnnouncements = [
    { id: 1, content: "New features launched for brand profiles!", date: "2023-12-15", audience: "All Users" },
    { id: 2, content: "Maintenance scheduled for next weekend.", date: "2023-11-30", audience: "Admin Only" },
    { id: 3, content: "Welcome to our new platform design!", date: "2023-10-20", audience: "All Users" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-4xl md:text-6xl uppercase font-thin mb-6">Announcements</h1>
      
      <Card className="p-6 border border-gray-200">
        <h2 className="text-lg font-medium mb-4">Create New Announcement</h2>
        
        <form className="space-y-4">
          <div>
            <label htmlFor="announcementContent" className="block text-sm font-medium mb-1">
              Announcement Content
            </label>
            <Textarea
              id="announcementContent"
              placeholder="Enter your announcement here"
              className="h-32 border-gray-300 rounded-none"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="audience" className="block text-sm font-medium mb-1">
                Audience
              </label>
              <select
                id="audience"
                className="w-full border border-gray-300 rounded-none p-2 focus:outline-none focus:ring-2 focus:ring-black"
                defaultValue="all"
              >
                <option value="all">All Users</option>
                <option value="brands">Brands Only</option>
                <option value="buyers">Buyers Only</option>
                <option value="admin">Admin Only</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="duration" className="block text-sm font-medium mb-1">
                Duration
              </label>
              <select
                id="duration"
                className="w-full border border-gray-300 rounded-none p-2 focus:outline-none focus:ring-2 focus:ring-black"
                defaultValue="7"
              >
                <option value="1">1 Day</option>
                <option value="7">7 Days</option>
                <option value="14">14 Days</option>
                <option value="30">30 Days</option>
                <option value="permanent">Permanent</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch id="urgentSwitch" />
            <Label htmlFor="urgentSwitch">Mark as Urgent</Label>
          </div>
          
          <div className="flex justify-end">
            <Button className="bg-black text-white border-none hover:underline">
              Send Announcement
            </Button>
          </div>
        </form>
      </Card>
      
      <Card className="border border-gray-200">
        <h2 className="text-lg font-medium p-6 pb-4">Past Announcements</h2>
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-medium">Content</TableHead>
              <TableHead className="font-medium">Date</TableHead>
              <TableHead className="font-medium">Audience</TableHead>
              <TableHead className="font-medium text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pastAnnouncements.map((announcement) => (
              <TableRow key={announcement.id} className="border-t border-gray-200">
                <TableCell className="max-w-md truncate">{announcement.content}</TableCell>
                <TableCell>{announcement.date}</TableCell>
                <TableCell>{announcement.audience}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="outline" size="sm" className="border-gray-200">
                    Resend
                  </Button>
                  <Button variant="outline" size="sm" className="border-gray-200 text-red-600 hover:text-red-700">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default AdminAnnouncements;
