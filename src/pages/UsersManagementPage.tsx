
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tables } from "@/integrations/supabase/types";

type UserProfile = Tables["profiles"]["Row"];

const inviteSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  role: z.enum(["sales_manager", "brand", "buyer"]),
});

type InviteFormValues = z.infer<typeof inviteSchema>;

const UsersManagementPage = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [pendingUsers, setPendingUsers] = useState<UserProfile[]>([]);
  const [approvedUsers, setApprovedUsers] = useState<UserProfile[]>([]);
  const [rejectedUsers, setRejectedUsers] = useState<UserProfile[]>([]);
  const [inviteOpen, setInviteOpen] = useState(false);

  const form = useForm<InviteFormValues>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      email: "",
      role: "brand",
    },
  });

  // Check if user is admin or sales manager
  useEffect(() => {
    if (profile) {
      if (profile.role !== "admin" && profile.role !== "sales_manager") {
        navigate("/");
      }
    }
  }, [profile, navigate]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (data) {
        setPendingUsers(data.filter(user => user.approval_status === "pending"));
        setApprovedUsers(data.filter(user => user.approval_status === "approved"));
        setRejectedUsers(data.filter(user => user.approval_status === "rejected"));
      }
    } catch (error: any) {
      console.error("Error fetching users:", error);
      toast({
        title: "Error",
        description: "Failed to load users",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUsers();
    }
  }, [user]);

  const handleUpdateStatus = async (userId: string, status: "approved" | "rejected") => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ approval_status: status })
        .eq("id", userId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `User ${status} successfully`,
      });

      fetchUsers();
    } catch (error: any) {
      console.error("Error updating user:", error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleInviteSubmit = async (data: InviteFormValues) => {
    if (!user) return;
    
    try {
      // Create invitation record
      const { error } = await supabase
        .from("invitations")
        .insert({
          email: data.email,
          role: data.role,
          inviter_id: user.id,
          status: "pending",
        });

      if (error) throw error;

      toast({
        title: "Invitation sent",
        description: `Invitation sent to ${data.email}`,
      });

      setInviteOpen(false);
      form.reset();
    } catch (error: any) {
      console.error("Error sending invitation:", error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (!profile || (profile.role !== "admin" && profile.role !== "sales_manager")) {
    return null;
  }

  return (
    <div className="p-6 max-w-[1481px] mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl uppercase font-thin">
          <span className="font-normal">USER</span> MANAGEMENT
        </h1>
        
        <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
          <DialogTrigger asChild>
            <Button className="bg-black hover:bg-gray-800">INVITE USER</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-xl uppercase font-thin">
                <span className="font-normal">INVITE</span> USER
              </DialogTitle>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleInviteSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="user@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <div className="flex gap-2">
                        {profile.role === "admin" && (
                          <Button
                            type="button"
                            variant={field.value === "sales_manager" ? "default" : "outline"}
                            className={field.value === "sales_manager" ? "bg-black" : ""}
                            onClick={() => field.onChange("sales_manager")}
                          >
                            SALES MANAGER
                          </Button>
                        )}
                        <Button
                          type="button"
                          variant={field.value === "brand" ? "default" : "outline"}
                          className={field.value === "brand" ? "bg-black" : ""}
                          onClick={() => field.onChange("brand")}
                        >
                          BRAND
                        </Button>
                        <Button
                          type="button"
                          variant={field.value === "buyer" ? "default" : "outline"}
                          className={field.value === "buyer" ? "bg-black" : ""}
                          onClick={() => field.onChange("buyer")}
                        >
                          BUYER
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button type="submit" className="bg-black hover:bg-gray-800">SEND INVITATION</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="space-y-8">
        {/* Pending Users */}
        <div>
          <h2 className="text-xl uppercase font-thin mb-4">
            <span className="font-normal">PENDING</span> APPROVALS
          </h2>
          
          {pendingUsers.length === 0 ? (
            <p className="font-light">No pending users to approve.</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Registered</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.full_name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.company_name || "-"}</TableCell>
                      <TableCell className="uppercase">{user.role}</TableCell>
                      <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            className="bg-black hover:bg-gray-800"
                            onClick={() => handleUpdateStatus(user.id, "approved")}
                          >
                            APPROVE
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleUpdateStatus(user.id, "rejected")}
                          >
                            REJECT
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
        
        {/* Approved Users */}
        <div>
          <h2 className="text-xl uppercase font-thin mb-4">
            <span className="font-normal">APPROVED</span> USERS
          </h2>
          
          {approvedUsers.length === 0 ? (
            <p className="font-light">No approved users.</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Approved Since</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {approvedUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.full_name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.company_name || "-"}</TableCell>
                      <TableCell className="uppercase">{user.role}</TableCell>
                      <TableCell>{new Date(user.updated_at).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersManagementPage;
