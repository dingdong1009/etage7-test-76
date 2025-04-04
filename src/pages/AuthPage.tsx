
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { RegistrationSuccess } from "@/components/auth/RegistrationSuccess";
import { Loader2 } from "lucide-react";

// Form schema for login
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

// Form schema for registration
const registerSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  phone: z.string().optional(),
  companyName: z.string().min(2, { message: "Company name is required" }),
  description: z.string().optional(),
  role: z.enum(["brand", "buyer"], { message: "Please select a role" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

const AuthPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Login form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Register form
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
      phone: "",
      companyName: "",
      description: "",
      role: "brand",
    },
  });

  // Handle login submit
  const onLoginSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      // Check if user profile exists and is approved
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (profileError) {
        toast({
          title: "Error",
          description: "Failed to retrieve user profile",
          variant: "destructive",
        });
        return;
      }

      if (profileData.approval_status !== 'approved' && profileData.role !== 'admin' && profileData.role !== 'sales_manager') {
        toast({
          title: "Account Pending Approval",
          description: "Your account is pending approval. Please check back later.",
          variant: "destructive",
        });
        // Sign out since the user is not approved
        await supabase.auth.signOut();
        return;
      }

      toast({
        title: "Success",
        description: "Logged in successfully",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle register submit
  const onRegisterSubmit = async (values: RegisterFormValues) => {
    setIsLoading(true);
    try {
      // Register the user
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            full_name: values.fullName,
          },
        },
      });

      if (error) {
        toast({
          title: "Registration Error",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      if (data.user) {
        // Create profile entry
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            email: values.email,
            full_name: values.fullName,
            phone: values.phone || null,
            company_name: values.companyName,
            description: values.description || null,
            role: values.role,
            approval_status: 'pending'
          });

        if (profileError) {
          toast({
            title: "Profile Creation Error",
            description: profileError.message,
            variant: "destructive",
          });
          return;
        }

        setShowSuccessMessage(true);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (showSuccessMessage) {
    return <RegistrationSuccess />;
  }

  return (
    <div className="flex min-h-screen w-full justify-center items-center px-4 py-12">
      <div className="w-full max-w-md">
        <h1 className="text-3xl uppercase font-normal text-center mb-8">PLATFORM ACCESS</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="login">LOGIN</TabsTrigger>
            <TabsTrigger value="register">REGISTER</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>EMAIL</FormLabel>
                      <FormControl>
                        <Input placeholder="your@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PASSWORD</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full mt-6" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      LOGGING IN...
                    </>
                  ) : (
                    "LOGIN"
                  )}
                </Button>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="register">
            <Form {...registerForm}>
              <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FormField
                      control={registerForm.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel>I AM A</FormLabel>
                          <div className="flex space-x-2">
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
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <FormField
                  control={registerForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>EMAIL</FormLabel>
                      <FormControl>
                        <Input placeholder="your@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={registerForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PASSWORD</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={registerForm.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>FULL NAME</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={registerForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PHONE NUMBER</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 234 567 890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={registerForm.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>COMPANY NAME</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Company Ltd." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={registerForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>DESCRIPTION</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about your company or brand..." 
                          className="min-h-[120px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full mt-6" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      REGISTERING...
                    </>
                  ) : (
                    "REGISTER"
                  )}
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AuthPage;
