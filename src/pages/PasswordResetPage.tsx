
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const verifyCodeSchema = z.object({
  code: z.string().length(6, "Verification code must be 6 digits"),
});

const resetPasswordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type VerifyCodeFormValues = z.infer<typeof verifyCodeSchema>;
type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

const PasswordResetPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [codeVerified, setCodeVerified] = useState(false);
  const email = searchParams.get("email") || "";

  const verifyCodeForm = useForm<VerifyCodeFormValues>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: {
      code: "",
    },
  });

  const resetPasswordForm = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onVerifyCodeSubmit = async (data: VerifyCodeFormValues) => {
    if (!email) {
      toast({
        title: "Error",
        description: "Email address is missing. Please go back to the login page.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Verify the code with Supabase
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: data.code,
        type: "recovery",
      });

      if (error) {
        throw error;
      }

      setCodeVerified(true);
      toast({
        title: "Code verified",
        description: "Please set your new password.",
      });
    } catch (error: any) {
      console.error("Code verification error:", error);
      toast({
        title: "Verification failed",
        description: error.message || "Invalid or expired code",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const onResetPasswordSubmit = async (data: ResetPasswordFormValues) => {
    setLoading(true);
    try {
      // Update password with Supabase
      const { error } = await supabase.auth.updateUser({
        password: data.password,
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Password updated",
        description: "Your password has been reset successfully.",
      });

      // Redirect to login page after short delay
      setTimeout(() => {
        navigate("/auth");
      }, 2000);
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

  if (!email) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-16">
        <div className="w-full max-w-md text-center">
          <h1 className="text-3xl uppercase font-thin mb-6">
            <span className="font-normal">INVALID</span> RESET REQUEST
          </h1>
          <p className="mb-6">
            The reset request is missing required information. Please go back and try again.
          </p>
          <Button asChild className="bg-black hover:bg-gray-800">
            <a href="/auth">RETURN TO LOGIN</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-16">
      <div className="w-full max-w-md">
        <h1 className="text-3xl uppercase font-thin mb-8 text-center">
          <span className="font-normal">RESET</span> PASSWORD
        </h1>
        
        {!codeVerified ? (
          <div>
            <p className="text-center mb-6">
              Enter the 6-digit code sent to {email}
            </p>
            
            <Form {...verifyCodeForm}>
              <form onSubmit={verifyCodeForm.handleSubmit(onVerifyCodeSubmit)} className="space-y-6">
                <FormField
                  control={verifyCodeForm.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem className="mx-auto flex flex-col items-center">
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
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
                    onClick={() => navigate("/auth")}
                  >
                    BACK
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-1 bg-black hover:bg-gray-800" 
                    disabled={loading}
                  >
                    {loading ? "VERIFYING..." : "VERIFY CODE"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        ) : (
          <div>
            <p className="text-center mb-6">
              Create a new password for your account
            </p>
            
            <Form {...resetPasswordForm}>
              <form onSubmit={resetPasswordForm.handleSubmit(onResetPasswordSubmit)} className="space-y-4">
                <FormField
                  control={resetPasswordForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter new password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={resetPasswordForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Confirm new password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-black hover:bg-gray-800 mt-2" 
                  disabled={loading}
                >
                  {loading ? "UPDATING..." : "UPDATE PASSWORD"}
                </Button>
              </form>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordResetPage;
