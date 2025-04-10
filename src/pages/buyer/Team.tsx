
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserPlus, Edit, Trash2, Search, Mail, Phone } from "lucide-react";

// Team member interface for type safety
interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: "Active" | "Pending" | "Inactive";
  joinDate: string;
}

const Team = () => {
  // Sample team members data
  const [teamMembers] = useState<TeamMember[]>([
    { id: "1", name: "Sophie Martin", email: "sophie@fashionstore.com", phone: "+1 (555) 123-4567", role: "Owner", status: "Active", joinDate: "Jan 15, 2023" },
    { id: "2", name: "Jean Dupont", email: "jean@fashionstore.com", phone: "+1 (555) 234-5678", role: "Buyer", status: "Active", joinDate: "Mar 22, 2023" },
    { id: "3", name: "Amelia Chen", email: "amelia@fashionstore.com", phone: "+1 (555) 345-6789", role: "Buyer Assistant", status: "Active", joinDate: "Jun 10, 2023" },
    { id: "4", name: "Lucas Bernard", email: "lucas@fashionstore.com", phone: "+1 (555) 456-7890", role: "Merchandiser", status: "Active", joinDate: "Sep 05, 2023" },
    { id: "5", name: "Emma Wilson", email: "emma@fashionstore.com", phone: "+1 (555) 567-8901", role: "Buyer", status: "Pending", joinDate: "Apr 01, 2024" }
  ]);

  const [activeTab, setActiveTab] = useState("members");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-4xl md:text-6xl uppercase font-thin mb-6">Team</h1>
        <Button 
          onClick={() => setActiveTab("invite")} 
          className="bg-black hover:bg-gray-800 text-white"
        >
          <UserPlus size={16} className="mr-2" />
          Add Team Member
        </Button>
      </div>
      
      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="members">Team Members</TabsTrigger>
          <TabsTrigger value="invite">Invite New Member</TabsTrigger>
        </TabsList>
        
        <TabsContent value="members">
          <Card className="border border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-1xl md:text-2xl uppercase font-thin mb-6">Team Members</CardTitle>
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search" 
                  placeholder="Search team members..." 
                  className="w-full rounded-md border border-gray-200 pl-8 py-2 text-sm outline-none focus:border-blue-500"
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teamMembers.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell className="font-medium">{member.name}</TableCell>
                        <TableCell>{member.role}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="flex items-center gap-1 text-sm">
                              <Mail size={14} /> {member.email}
                            </span>
                            <span className="flex items-center gap-1 text-sm text-gray-500">
                              <Phone size={14} /> {member.phone}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            className={`${
                              member.status === "Active" ? "bg-green-100 text-green-800" : 
                              member.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                              "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {member.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-1">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8" 
                              title="Edit team member"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8" 
                              title="Delete team member"
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="invite">
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-1xl md:text-2xl uppercase font-thin mb-6">Invite New Member</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <Input 
                      type="text" 
                      className="w-full p-2 border border-gray-200 rounded"
                      placeholder="Enter full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <Input 
                      type="email" 
                      className="w-full p-2 border border-gray-200 rounded"
                      placeholder="Enter email address"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <Input 
                      type="tel" 
                      className="w-full p-2 border border-gray-200 rounded"
                      placeholder="Enter phone number"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Role
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="owner">Owner</SelectItem>
                        <SelectItem value="buyer">Buyer</SelectItem>
                        <SelectItem value="assistant">Buyer Assistant</SelectItem>
                        <SelectItem value="merchandiser">Merchandiser</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit" className="bg-black hover:bg-gray-800 text-white">
                    Send Invitation
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Team;
