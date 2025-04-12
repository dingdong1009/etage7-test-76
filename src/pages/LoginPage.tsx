
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().email("Valid email is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      console.log("Login submitted:", data);
      // Placeholder for login logic
    } catch (error) {
      setSubmitError("Invalid email or password. Please try again.");
      console.error("Login error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-16 pb-16 px-4">
      <div className="max-w-[500px] mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tighter mb-6">
          Sign In
        </h1>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" className="border-0 border-b border-gray-300 rounded-none focus:border-black" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" className="border-0 border-b border-gray-300 rounded-none focus:border-black" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="text-right">
              <Link to="/reset-password" className="text-sm text-black hover:underline">
                Forgot password?
              </Link>
            </div>
            
            {submitError && (
              <div className="text-red-500 text-sm">{submitError}</div>
            )}
            
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-black text-white hover:bg-black hover:underline transition-all duration-300"
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>
            
            <div className="text-center mt-4">
              <p className="text-sm">
                Don't have an account?{" "}
                <Link to="/register" className="text-black hover:underline">
                  Register
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
