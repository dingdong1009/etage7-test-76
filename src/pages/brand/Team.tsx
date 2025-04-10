
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Mail, Phone } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const BrandTeam = () => {
  // Sample team data
  const teamMembers = [
    { 
      id: 1, 
      name: "Alex Johnson", 
      role: "Brand Manager", 
      email: "alex@example.com", 
      phone: "+1 (555) 123-4567",
      status: "active" 
    },
    { 
      id: 2, 
      name: "Maria Garcia", 
      role: "Product Designer", 
      email: "maria@example.com", 
      phone: "+1 (555) 234-5678",
      status: "active" 
    },
    { 
      id: 3, 
      name: "David Kim", 
      role: "Marketing Specialist", 
      email: "david@example.com", 
      phone: "+1 (555) 345-6789",
      status: "active" 
    },
    { 
      id: 4, 
      name: "Sara Lopez", 
      role: "Content Creator", 
      email: "sara@example.com", 
      phone: "+1 (555) 456-7890",
      status: "inactive" 
    }
  ];

  const [activeTab, setActiveTab] = useState("members");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-4xl md:text-6xl uppercase font-thin mb-6">Team</h1>
        <Button 
          onClick={() => setActiveTab("invite")} 
          className="text-xs px-3 py-2 bg-black text-white rounded flex items-center gap-1 w-full sm:w-auto justify-center"
        >
          <Plus size={16} />
          Add Team Member
        </Button>
      </div>
      
      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
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
                              member.status === "active" ? "bg-green-100 text-green-800" : 
                              "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {member.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button variant="outline" size="sm" className="text-xs px-2 py-1">Edit</Button>
                          <Button variant="outline" size="sm" className="text-xs px-2 py-1 bg-red-50 text-red-800 hover:bg-red-100">
                            Remove
                          </Button>
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
              <CardTitle className="text-lg font-medium">Invite New Member</CardTitle>
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
                      Role
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manager">Brand Manager</SelectItem>
                        <SelectItem value="designer">Product Designer</SelectItem>
                        <SelectItem value="marketing">Marketing Specialist</SelectItem>
                        <SelectItem value="content">Content Creator</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Access Level
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select access level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="editor">Editor</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit" className="px-4 py-2 bg-black text-white rounded hover:bg-black-600">
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

export default BrandTeam;
