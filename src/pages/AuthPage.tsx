
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().optional(),
  companyName: z.string().min(2, "Company name is required"),
  description: z.string().optional(),
  role: z.enum(["brand", "buyer"]),
});

const resetPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;
type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

const AuthPage = () => {
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [showResetPassword, setShowResetPassword] = useState(false);

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      phone: "",
      companyName: "",
      description: "",
      role: "brand",
    },
  });

  const resetPasswordForm = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onLoginSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    try {
      await signIn(data.email, data.password);
      
      // Check if user is approved
      const { data: profileData, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("email", data.email)
        .single();
      
      if (error) {
        throw error;
      }

      if (profileData && profileData.approval_status === "pending") {
        toast({
          title: "Account pending approval",
          description: "Your account is pending approval by an administrator.",
        });
      } else if (profileData && profileData.approval_status === "rejected") {
        toast({
          title: "Account rejected",
          description: "Your account registration has been rejected.",
          variant: "destructive",
        });
        // Sign out if rejected
        await supabase.auth.signOut();
      } else {
        navigate("/");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: error.message || "An error occurred during login",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const onRegisterSubmit = async (data: RegisterFormValues) => {
    setLoading(true);
    setRegisterError(null);
    
    try {
      console.log("Registration data:", data);
      
      // Register the user with the updated signUp function
      await signUp(data.email, data.password, {
        full_name: data.fullName,
        phone: data.phone || null,
        company_name: data.companyName,
        description: data.description || null,
        role: data.role,
      });

      // Navigate to success page
      navigate("/registration-success");
    } catch (error: any) {
      console.error("Registration error:", error);
      setRegisterError(error.message || "An error occurred during registration");
      toast({
        title: "Registration failed",
        description: error.message || "An error occurred during registration",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const onResetPasswordSubmit = async (data: ResetPasswordFormValues) => {
    setLoading(true);
    try {
      // Instead of sending a reset link, we'll send a one-time code
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: undefined, // Don't use redirectTo for code-based flow
      });
      
      if (error) {
        throw error;
      }
      
      // Navigate to the password reset page with the email
      navigate(`/password-reset?email=${encodeURIComponent(data.email)}`);
      
      toast({
        title: "Code sent",
        description: "Check your email for the password reset code",
      });
    } catch (error: any) {
      console.error("Password reset error:", error);
      toast({
        title: "Password reset failed",
        description: error.message || "An error occurred during password reset",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-16">
      <div className="w-full max-w-md">
        <h1 className="text-3xl uppercase font-thin mb-8 text-center">
          <span className="font-normal">ETAGE7</span> PLATFORM
        </h1>
        
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="login">LOGIN</TabsTrigger>
            <TabsTrigger value="register">REGISTER</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            {!showResetPassword ? (
              <>
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Your email" {...field} />
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
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Your password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full bg-black hover:bg-gray-800" disabled={loading}>
                      {loading ? "LOGGING IN..." : "LOGIN"}
                    </Button>
                  </form>
                </Form>
                
                <div className="mt-4 text-center">
                  <button 
                    type="button" 
                    onClick={() => setShowResetPassword(true)}
                    className="text-sm text-gray-600 hover:underline focus:outline-none"
                  >
                    Forgot your password?
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="mb-4">
                  <h2 className="text-xl font-thin mb-2">Reset Your Password</h2>
                  <p className="text-sm text-gray-600">
                    Enter your email and we'll send you a link to reset your password.
                  </p>
                </div>
                
                <Form {...resetPasswordForm}>
                  <form onSubmit={resetPasswordForm.handleSubmit(onResetPasswordSubmit)} className="space-y-4">
                    <FormField
                      control={resetPasswordForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Your email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex gap-2">
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => setShowResetPassword(false)}
                      >
                        BACK
                      </Button>
                      <Button 
                        type="submit" 
                        className="flex-1 bg-black hover:bg-gray-800" 
                        disabled={loading}
                      >
                        {loading ? "SENDING..." : "SEND RESET LINK"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </>
            )}
          </TabsContent>
          
          <TabsContent value="register">
            <Form {...registerForm}>
              <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                {registerError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 p-3 text-sm">
                    {registerError}
                  </div>
                )}
                
                <FormField
                  control={registerForm.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Register as</FormLabel>
                      <div className="flex gap-4">
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
                
                <FormField
                  control={registerForm.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={registerForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Your email" {...field} />
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
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Create a password" {...field} />
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
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Your phone number" {...field} />
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
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your company name" {...field} />
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
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Brief description of your company" 
                          className="resize-none" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full bg-black hover:bg-gray-800" disabled={loading}>
                  {loading ? "REGISTERING..." : "REGISTER"}
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
