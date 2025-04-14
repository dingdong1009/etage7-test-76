import React, { useState } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Mail, Phone, Edit, Trash2, Filter, Download, UploadCloud } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const BrandTeam = () => {
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
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState("all");

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          member.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterValue === "all" || 
                          (filterValue === "active" && member.status === "active") ||
                          (filterValue === "inactive" && member.status === "inactive");
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-4xl md:text-6xl uppercase font-thin mb-6">Team</h1>
      
      <div className="border-t border-gray-200 mb-6"></div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="border-b border-gray-200 w-full flex justify-start overflow-x-auto pb-0 mb-6 bg-transparent">
          <TabsTrigger 
            value="members" 
            className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2 data-[state=active]:shadow-none"
          >
            Team Members
          </TabsTrigger>
          <TabsTrigger 
            value="invite" 
            className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2 data-[state=active]:shadow-none"
          >
            Invite New Member
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="members">
          <Card className="border border-gray-200 shadow-none rounded-none">
            <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <CardTitle className="text-base font-light text-gray-900">
                  Team Members
                </CardTitle>
                <div className="flex flex-wrap gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search team members..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 h-9 text-xs rounded-none border-gray-200 w-[200px]"
                    />
                  </div>
                  <Select value={filterValue} onValueChange={setFilterValue}>
                    <SelectTrigger className="h-9 text-xs rounded-none border-gray-200 w-[150px]">
                      <div className="flex items-center">
                        <Filter className="h-3.5 w-3.5 mr-2 text-gray-500" strokeWidth={1} />
                        <SelectValue placeholder="Filter status" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={() => setActiveTab("invite")} className="h-9 rounded-none text-xs font-light">
                    <Plus size={16} className="mr-1" />
                    Add Team Member
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-[40px]">#</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.map((member, index) => (
                    <TableRow key={member.id} className="hover:bg-gray-50/50">
                      <TableCell className="font-light text-gray-500">{index + 1}</TableCell>
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
                            member.status === "active" ? "bg-accent-mint text-gray-800" : 
                            "bg-soft-orange text-gray-800"
                          }`}
                        >
                          {member.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline"
                            size="sm" 
                            className="h-8 w-8 p-0 rounded-none"
                          >
                            <Edit size={14} />
                          </Button>
                          <Button 
                            variant="outline"
                            size="sm" 
                            className="h-8 w-8 p-0 rounded-none text-red-500 hover:text-red-600"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredMembers.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="h-32 text-center">
                        No team members found matching your search
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <div className="mt-6 flex justify-end gap-3">
            <Button variant="outline" size="sm" className="rounded-none text-xs font-light gap-2">
              <Download size={14} />
              Export Team List
            </Button>
            <Button variant="outline" size="sm" className="rounded-none text-xs font-light gap-2">
              <UploadCloud size={14} />
              Import Team Members
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="invite">
          <Card className="border border-gray-200 shadow-none rounded-none">
            <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
              <CardTitle className="text-base font-light text-gray-900">
                Invite New Team Member
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <Input 
                      type="text" 
                      className="rounded-none border-gray-200 focus:border-black focus:ring-0"
                      placeholder="Enter full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <Input 
                      type="email" 
                      className="rounded-none border-gray-200 focus:border-black focus:ring-0"
                      placeholder="Enter email address"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <Input 
                      type="tel" 
                      className="rounded-none border-gray-200 focus:border-black focus:ring-0"
                      placeholder="Enter phone number"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Role
                    </label>
                    <Select>
                      <SelectTrigger className="rounded-none border-gray-200 focus:ring-0 focus:border-black">
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
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-sm font-medium mb-3">Permissions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <Checkbox 
                        id="products" 
                        className="border-gray-500 data-[state=checked]:bg-gray-800 data-[state=checked]:text-white" 
                      />
                      <label htmlFor="products" className="text-sm text-gray-700">Products Management</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox 
                        id="orders" 
                        className="border-gray-500 data-[state=checked]:bg-gray-800 data-[state=checked]:text-white" 
                      />
                      <label htmlFor="orders" className="text-sm text-gray-700">Orders Management</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox 
                        id="lookbook" 
                        className="border-gray-500 data-[state=checked]:bg-gray-800 data-[state=checked]:text-white" 
                      />
                      <label htmlFor="lookbook" className="text-sm text-gray-700">Lookbook Management</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox 
                        id="messages" 
                        className="border-gray-500 data-[state=checked]:bg-gray-800 data-[state=checked]:text-white" 
                      />
                      <label htmlFor="messages" className="text-sm text-gray-700">Messages Access</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox 
                        id="settings" 
                        className="border-gray-500 data-[state=checked]:bg-gray-800 data-[state=checked]:text-white" 
                      />
                      <label htmlFor="settings" className="text-sm text-gray-700">Settings Access</label>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit" className="rounded-none">
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
