
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CheckCircle2, XCircle, UserPlus, Loader2 } from "lucide-react";

type UserProfile = {
  id: string;
  email: string;
  full_name: string;
  role: string;
  company_name: string | null;
  phone: string | null;
  description: string | null;
  approval_status: string;
  created_at: string;
};

// Invitation form schema
const inviteSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  role: z.enum(["brand", "buyer", "sales_manager"], { 
    message: "Please select a valid role" 
  }),
});

type InviteFormValues = z.infer<typeof inviteSchema>;

const UsersManagementPage = () => {
  const [pendingUsers, setPendingUsers] = useState<UserProfile[]>([]);
  const [approvedUsers, setApprovedUsers] = useState<UserProfile[]>([]);
  const [rejectedUsers, setRejectedUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { profile } = useAuth();
  const { toast } = useToast();

  const inviteForm = useForm<InviteFormValues>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      email: "",
      role: "brand",
    },
  });

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      // Different query based on role
      let query = supabase.from("profiles").select("*");
      
      // If sales manager, only show users they invited
      if (profile?.role === "sales_manager") {
        query = query.eq("inviter_id", profile.id);
      }
      
      const { data, error } = await query;
      
      if (error) {
        throw error;
      }
      
      if (data) {
        setPendingUsers(data.filter(user => user.approval_status === "pending"));
        setApprovedUsers(data.filter(user => user.approval_status === "approved"));
        setRejectedUsers(data.filter(user => user.approval_status === "rejected"));
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [profile]);

  const handleStatusChange = async (userId: string, status: "approved" | "rejected") => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ approval_status: status })
        .eq("id", userId);

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: `User ${status === "approved" ? "approved" : "rejected"} successfully`,
      });
      
      fetchUsers();
    } catch (error) {
      console.error("Error updating user status:", error);
      toast({
        title: "Error",
        description: "Failed to update user status",
        variant: "destructive",
      });
    }
  };

  const handleInvite = async (values: InviteFormValues) => {
    if (!profile) return;
    
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from("invitations")
        .insert({
          email: values.email,
          role: values.role,
          inviter_id: profile.id,
          status: "pending"
        });

      if (error) {
        if (error.code === "23505") { // Unique violation
          toast({
            title: "Error",
            description: "This email has already been invited",
            variant: "destructive",
          });
        } else {
          throw error;
        }
        return;
      }

      toast({
        title: "Success",
        description: "Invitation sent successfully",
      });
      
      inviteForm.reset();
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error sending invitation:", error);
      toast({
        title: "Error",
        description: "Failed to send invitation",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const UserList = ({ users, showActions = false }: { users: UserProfile[], showActions?: boolean }) => (
    <div className="mt-4">
      {users.length === 0 ? (
        <p className="text-center font-light py-8">No users found</p>
      ) : (
        <div className="divide-y">
          {users.map((user) => (
            <div key={user.id} className="py-4 flex justify-between items-center">
              <div>
                <p className="font-medium">{user.full_name}</p>
                <p className="text-sm font-light">{user.email}</p>
                <p className="text-sm font-light">
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)} • {user.company_name}
                </p>
              </div>
              {showActions && (
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleStatusChange(user.id, "approved")}
                    variant="outline"
                    size="sm"
                    className="flex gap-1"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Approve
                  </Button>
                  <Button
                    onClick={() => handleStatusChange(user.id, "rejected")}
                    variant="outline"
                    size="sm"
                    className="flex gap-1"
                  >
                    <XCircle className="h-4 w-4" />
                    Reject
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl uppercase font-normal">USER MANAGEMENT</h1>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex gap-2">
              <UserPlus className="h-4 w-4" />
              INVITE USER
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-xl uppercase font-normal mb-4">INVITE USER</DialogTitle>
            </DialogHeader>
            
            <Form {...inviteForm}>
              <form onSubmit={inviteForm.handleSubmit(handleInvite)} className="space-y-4">
                <FormField
                  control={inviteForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>EMAIL</FormLabel>
                      <FormControl>
                        <Input placeholder="user@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={inviteForm.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ROLE</FormLabel>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant={field.value === "brand" ? "default" : "outline"}
                          className="flex-1"
                          onClick={() => field.onChange("brand")}
                        >
                          BRAND
                        </Button>
                        <Button
                          type="button"
                          variant={field.value === "buyer" ? "default" : "outline"}
                          className="flex-1"
                          onClick={() => field.onChange("buyer")}
                        >
                          BUYER
                        </Button>
                        {profile?.role === "admin" && (
                          <Button
                            type="button"
                            variant={field.value === "sales_manager" ? "default" : "outline"}
                            className="flex-1"
                            onClick={() => field.onChange("sales_manager")}
                          >
                            SALES
                          </Button>
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      SENDING...
                    </>
                  ) : (
                    "SEND INVITATION"
                  )}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="pending" className="uppercase">
            Pending ({pendingUsers.length})
          </TabsTrigger>
          <TabsTrigger value="approved" className="uppercase">
            Approved ({approvedUsers.length})
          </TabsTrigger>
          <TabsTrigger value="rejected" className="uppercase">
            Rejected ({rejectedUsers.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <UserList users={pendingUsers} showActions={true} />
        </TabsContent>

        <TabsContent value="approved">
          <UserList users={approvedUsers} />
        </TabsContent>

        <TabsContent value="rejected">
          <UserList users={rejectedUsers} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UsersManagementPage;
