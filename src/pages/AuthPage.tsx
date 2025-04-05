import { useState, useEffect } from "react";
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
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";

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
  const { signIn, signUp, user, profile, isLoading: authLoading, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [redirectAttempted, setRedirectAttempted] = useState(false);
  const [redirectError, setRedirectError] = useState<string | null>(null);
  const [navigationAttempts, setNavigationAttempts] = useState(0);

  useEffect(() => {
    if (authLoading) {
      console.log("Auth context is still loading...");
      return;
    }

    console.log("Auth page useEffect - User:", user?.id);
    console.log("Auth page useEffect - Profile:", profile);
    console.log("Auth page useEffect - Auth Loading:", authLoading);
    console.log("Auth page useEffect - Navigation attempts:", navigationAttempts);
    
    if (navigationAttempts < 10) {
      if (user && profile) {
        console.log("Redirecting user with role:", profile.role, "and status:", profile.approval_status);
        setRedirectError(null);
        
        try {
          if (profile.approval_status === "pending") {
            console.log("Redirecting to registration success page");
            navigate("/registration-success");
          } else if (profile.approval_status === "approved") {
            if (profile.role === "brand") {
              console.log("Redirecting to brand dashboard");
              navigate("/brand-dashboard");
            } else if (profile.role === "buyer") {
              console.log("Redirecting to buyer dashboard");
              navigate("/buyer-dashboard");
            } else if (profile.role === "admin" || profile.role === "sales_manager") {
              console.log("Redirecting to manage users page");
              navigate("/manage-users");
            } else {
              console.log("Unknown role, redirecting to home");
              navigate("/");
            }
          } else {
            console.log("User not approved, no redirection");
          }
          setRedirectAttempted(true);
        } catch (error) {
          console.error("Navigation error:", error);
          setRedirectError("Failed to navigate. Please use the manual navigation buttons below.");
          setNavigationAttempts(prev => prev + 1);
        }
      } else if (user && !profile && !authLoading) {
        console.log("User exists but profile not loaded yet, refreshing profile");
        refreshProfile();
        setNavigationAttempts(prev => prev + 1);
      } else {
        console.log("No user or profile yet, staying on auth page");
      }
    } else {
      console.log("Maximum navigation attempts reached, showing manual navigation UI");
    }
  }, [user, profile, navigate, authLoading, refreshProfile, navigationAttempts]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    
    if (user && !redirectAttempted && !authLoading && navigationAttempts < 5) {
      timeoutId = setTimeout(() => {
        console.log("Forced navigation check running...");
        if (user && profile) {
          console.log("Profile found in timeout, navigating...");
          try {
            if (profile.approval_status === "approved") {
              if (profile.role === "brand") navigate("/brand-dashboard");
              else if (profile.role === "buyer") navigate("/buyer-dashboard");
              else if (profile.role === "admin" || profile.role === "sales_manager") navigate("/manage-users");
              else navigate("/");
            } else if (profile.approval_status === "pending") {
              navigate("/registration-success");
            }
          } catch (error) {
            console.error("Timeout navigation error:", error);
          }
        } else {
          console.log("No profile in timeout, refreshing...");
          refreshProfile();
        }
      }, 2000);
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [user, profile, redirectAttempted, authLoading, navigate, refreshProfile, navigationAttempts]);

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
    setRedirectAttempted(false);
    setRedirectError(null);
    setNavigationAttempts(0);
    try {
      console.log("Login attempt for:", data.email);
      await signIn(data.email, data.password);
    } catch (error: any) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const onRegisterSubmit = async (data: RegisterFormValues) => {
    setLoading(true);
    setRegisterError(null);
    
    try {
      console.log("Registration data:", data);
      
      await signUp(data.email, data.password, {
        full_name: data.fullName,
        phone: data.phone || null,
        company_name: data.companyName,
        description: data.description || null,
        role: data.role,
      });

      navigate("/registration-success");
    } catch (error: any) {
      console.error("Registration error:", error);
      setRegisterError(error.message || "An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  const onResetPasswordSubmit = async (data: ResetPasswordFormValues) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${window.location.origin}/password-reset`,
      });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Password reset email sent",
        description: "Check your email for the password reset link",
      });
      
      setShowResetPassword(false);
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

  const navigateToDashboard = () => {
    if (!profile) {
      toast({
        title: "Cannot navigate",
        description: "Your profile isn't loaded yet.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (profile.role === "brand") {
        navigate("/brand-dashboard", { replace: true });
      } else if (profile.role === "buyer") {
        navigate("/buyer-dashboard", { replace: true });
      } else if (profile.role === "admin" || profile.role === "sales_manager") {
        navigate("/manage-users", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error("Manual navigation error:", error);
      toast({
        title: "Navigation failed",
        description: "Could not navigate to dashboard. Please try again.",
        variant: "destructive",
      });
    }
  };

  const forceRefreshAndNavigate = () => {
    setNavigationAttempts(0);
    refreshProfile();
    toast({
      title: "Retrying navigation",
      description: "Refreshing your profile information..."
    });
    
    setTimeout(() => {
      if (profile) {
        navigateToDashboard();
      }
    }, 1000);
  };

  if (authLoading && user) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4 py-16">
        <div className="w-full max-w-md text-center space-y-4">
          <h1 className="text-3xl uppercase font-thin mb-4">
            <span className="font-normal">LOADING</span> PROFILE
          </h1>
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <p className="text-gray-500 mt-4">Verifying your credentials...</p>
        </div>
      </div>
    );
  }

  if (user && (redirectError || navigationAttempts >= 5)) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4 py-16">
        <div className="w-full max-w-md text-center space-y-6">
          <div className="flex justify-center">
            <AlertCircle className="h-16 w-16 text-yellow-500" />
          </div>
          <h1 className="text-3xl uppercase font-thin">
            <span className="font-normal">NAVIGATION</span> ISSUE
          </h1>
          <p className="text-gray-600 mb-6">
            You're logged in{profile ? ` as ${profile.full_name} (${profile.role})` : ''}, but we couldn't automatically redirect you to your dashboard.
          </p>
          <div className="space-y-4">
            <Button onClick={navigateToDashboard} className="w-full bg-black hover:bg-gray-800">
              GO TO DASHBOARD
            </Button>
            <Button onClick={forceRefreshAndNavigate} variant="outline" className="w-full">
              RETRY CONNECTION
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
