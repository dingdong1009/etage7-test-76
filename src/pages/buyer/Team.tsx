
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  Search, 
  Mail, 
  Phone, 
  Edit, 
  Trash2, 
  Eye, 
  Download as DownloadIcon, 
  UploadCloud as UploadCloudIcon, 
  Settings2 
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

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
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { id: "1", name: "Sophie Martin", email: "sophie@fashionstore.com", phone: "+1 (555) 123-4567", role: "Owner", status: "Active", joinDate: "Jan 15, 2023" },
    { id: "2", name: "Jean Dupont", email: "jean@fashionstore.com", phone: "+1 (555) 234-5678", role: "Buyer", status: "Active", joinDate: "Mar 22, 2023" },
    { id: "3", name: "Amelia Chen", email: "amelia@fashionstore.com", phone: "+1 (555) 345-6789", role: "Buyer Assistant", status: "Active", joinDate: "Jun 10, 2023" },
    { id: "4", name: "Lucas Bernard", email: "lucas@fashionstore.com", phone: "+1 (555) 456-7890", role: "Merchandiser", status: "Active", joinDate: "Sep 05, 2023" },
    { id: "5", name: "Emma Wilson", email: "emma@fashionstore.com", phone: "+1 (555) 567-8901", role: "Buyer", status: "Pending", joinDate: "Apr 01, 2024" }
  ]);

  const [activeTab, setActiveTab] = useState("members");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState("all");
  const [viewMember, setViewMember] = useState<TeamMember | null>(null);
  const [editMember, setEditMember] = useState<TeamMember | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; memberId: string | null }>({
    isOpen: false,
    memberId: null
  });
  const { toast } = useToast();

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          member.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterValue === "all" || 
                          (filterValue === "Active" && member.status === "Active") ||
                          (filterValue === "Inactive" && member.status === "Inactive") ||
                          (filterValue === "Pending" && member.status === "Pending");
    return matchesSearch && matchesFilter;
  });

  // View team member details
  const handleViewMember = (member: TeamMember) => {
    setViewMember(member);
  };

  // Edit team member
  const handleEditMember = (member: TeamMember) => {
    setEditMember(member);
  };

  // Open delete confirmation
  const handleDeleteConfirmation = (memberId: string) => {
    setDeleteConfirmation({ isOpen: true, memberId });
  };

  // Delete team member
  const handleDeleteMember = () => {
    if (deleteConfirmation.memberId) {
      setTeamMembers(prevMembers => 
        prevMembers.filter(member => member.id !== deleteConfirmation.memberId)
      );
      setDeleteConfirmation({ isOpen: false, memberId: null });
      
      toast({
        title: "Team member removed",
        description: "The team member has been successfully removed.",
        variant: "default",
      });
    }
  };

  // Handle member settings
  const handleMemberSettings = (member: TeamMember) => {
    toast({
      title: "Settings accessed",
      description: `Configuring settings for ${member.name}`,
      variant: "default",
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tighter uppercase mb-6">Team Management</h1>      
      <Tabs defaultValue="members" className="w-full">
      <div className="border-t border-gray-200 mb-6">
        <TabsList className="border-b border-gray-200 w-full flex justify-start overflow-x-auto pb-0 mb-6 bg-transparent">
          <TabsTrigger
            value="members" 
            className="text-xs font-normal uppercase data-[state=active]:border-b-2 data-[state=active]:border-black px-6 py-2 data-[state=active]:shadow-none"
          >
            Team Members
          </TabsTrigger>
          <TabsTrigger 
            value="invite" 
            className="text-xs font-normal uppercase data-[state=active]:border-b-2 data-[state=active]:border-black px-6 py-2 data-[state=active]:shadow-none"
          >
            Invite New Member
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="members" className="mt-0">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
        <div className="relative w-full max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input placeholder="Search team members..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 border-gray-200 bg-gray-50/50" />
        </div>

        <div className="flex flex-wrap items-center gap-3">
        <Select value={filterValue} onValueChange={setFilterValue}>
          <SelectTrigger className="w-[150px] border-gray-200 bg-white text-sm">
            <SelectValue placeholder="Filter status" />
          </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          
            <Button variant="outline" size="sm" className="rounded-none text-xs font-light gap-2">
              <DownloadIcon size={14} />
              Export Team List
            </Button>

              <Button onClick={() => setActiveTab("invite")} className="h-9 rounded-none text-xs font-light">
                <Plus size={16} className="mr-1" /> Add Team Member
             </Button>
        </div>
      </div>
      </TabsContent>

      <TabsContent value="members">
          <Card className="border border-gray-200 shadow-none rounded-none overflow-hidden">
            <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <CardTitle className="text-lg font-normal flex items-center uppercase gap-2">
                  Team Members 
                  <span className="text-sm text-gray-500 ml-2">({filteredMembers.length})</span>
                </CardTitle>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent uppercase">
                    <TableHead className="w-[40px] font-normal text-gray-600 text-sm">ID</TableHead>
                    <TableHead className="font-normal text-gray-600 text-sm">Name</TableHead>
                    <TableHead className="font-normal text-gray-600 text-sm">Role</TableHead>
                    <TableHead className="font-normal text-gray-600 text-sm">Contact</TableHead>
                    <TableHead className="font-normal text-gray-600 text-sm">Status</TableHead>
                    <TableHead className="font-normal text-gray-600 text-sm text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.map((member, index) => (
                    <TableRow key={member.id} className="hover:bg-gray-50/50">
                      <TableCell className="font-light text-gray-500">{index + 1}</TableCell>
                      <TableCell className="font-normal">{member.name}</TableCell>
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
                            member.status === "Active" ? "bg-accent-mint font-normal text-gray-800" : 
                            member.status === "Pending" ? "bg-accent-yellow font-normal text-gray-800" :
                            "bg-gray-100 text-white"
                          }`}
                        >
                          {member.status.toLowerCase()}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2"> 
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 rounded-none text-black-500 hover:text-black hover:border"
                          onClick={() => handleViewMember(member)}
                        >
                          <Eye size={14} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 rounded-none text-black-500 hover:text-black hover:border"
                            onClick={() => handleMemberSettings(member)}
                          >
                            <Settings2 size={14} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 rounded-none hover:border"
                            onClick={() => handleDeleteConfirmation(member.id)}
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
        </TabsContent>
        
        <TabsContent value="invite">
          <Card className="border border-gray-200 shadow-none rounded-none overflow-hidden">
            <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
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
                        <SelectItem value="owner">Owner</SelectItem>
                        <SelectItem value="buyer">Buyer</SelectItem>
                        <SelectItem value="assistant">Buyer Assistant</SelectItem>
                        <SelectItem value="merchandiser">Merchandiser</SelectItem>
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
                        id="collections" 
                        className="border-gray-500 data-[state=checked]:bg-gray-800 data-[state=checked]:text-white" 
                      />
                      <label htmlFor="collections" className="text-sm text-gray-700">Collections Management</label>
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

      {/* View Team Member Dialog */}
      <Dialog open={viewMember !== null} onOpenChange={(open) => !open && setViewMember(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Team Member Details</DialogTitle>
            <DialogDescription>
              Detailed information about this team member.
            </DialogDescription>
          </DialogHeader>
          
          {viewMember && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Name</h3>
                  <p className="mt-1">{viewMember.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Role</h3>
                  <p className="mt-1">{viewMember.role}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p className="mt-1">{viewMember.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                  <p className="mt-1">{viewMember.phone}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Join Date</h3>
                  <p className="mt-1">{viewMember.joinDate}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  <Badge 
                    className={`mt-1 ${
                      viewMember.status === "Active" ? "bg-accent-mint font-normal text-gray-800" : 
                      viewMember.status === "Pending" ? "bg-accent-yellow font-normal text-gray-800" :
                      "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {viewMember.status.toLowerCase()}
                  </Badge>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter className="sm:justify-end">
            <Button 
              variant="outline" 
              className="rounded-none"
              onClick={() => setViewMember(null)}
            >
              Close
            </Button>
            <Button 
              className="rounded-none"
              onClick={() => {
                if (viewMember) {
                  setViewMember(null);
                  handleEditMember(viewMember);
                }
              }}
            >
              Edit Member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Team Member Dialog */}
      <Dialog open={editMember !== null} onOpenChange={(open) => !open && setEditMember(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Team Member</DialogTitle>
            <DialogDescription>
              Update information for this team member.
            </DialogDescription>
          </DialogHeader>
          
          {editMember && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Name</label>
                  <Input 
                    className="mt-1 rounded-none border-gray-200" 
                    value={editMember.name}
                    onChange={(e) => setEditMember({...editMember, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <Input 
                    className="mt-1 rounded-none border-gray-200" 
                    value={editMember.email}
                    onChange={(e) => setEditMember({...editMember, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Phone</label>
                  <Input 
                    className="mt-1 rounded-none border-gray-200" 
                    value={editMember.phone}
                    onChange={(e) => setEditMember({...editMember, phone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Role</label>
                  <Select 
                    value={editMember.role} 
                    onValueChange={(value) => setEditMember({...editMember, role: value})}
                  >
                    <SelectTrigger className="rounded-none border-gray-200">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Owner">Owner</SelectItem>
                      <SelectItem value="Buyer">Buyer</SelectItem>
                      <SelectItem value="Buyer Assistant">Buyer Assistant</SelectItem>
                      <SelectItem value="Merchandiser">Merchandiser</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Status</label>
                  <Select 
                    value={editMember.status} 
                    onValueChange={(value: "Active" | "Pending" | "Inactive") => setEditMember({...editMember, status: value})}
                  >
                    <SelectTrigger className="rounded-none border-gray-200">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter className="sm:justify-end">
            <Button 
              variant="outline" 
              className="rounded-none"
              onClick={() => setEditMember(null)}
            >
              Cancel
            </Button>
            <Button 
              className="rounded-none"
              onClick={() => {
                if (editMember) {
                  setTeamMembers(prevMembers => 
                    prevMembers.map(member => 
                      member.id === editMember.id ? editMember : member
                    )
                  );
                  setEditMember(null);
                  toast({
                    title: "Team member updated",
                    description: "The team member has been successfully updated.",
                    variant: "default",
                  });
                }
              }}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog 
        open={deleteConfirmation.isOpen} 
        onOpenChange={(open) => !open && setDeleteConfirmation({ isOpen: false, memberId: null })}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this team member? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter className="sm:justify-end">
            <Button 
              variant="outline" 
              className="rounded-none"
              onClick={() => setDeleteConfirmation({ isOpen: false, memberId: null })}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive"
              className="rounded-none"
              onClick={handleDeleteMember}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Team;
