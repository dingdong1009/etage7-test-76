
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const resetSchema = z.object({
  email: z.string().email("Valid email is required"),
});

type ResetFormValues = z.infer<typeof resetSchema>;

const ResetPasswordPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<ResetFormValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ResetFormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      console.log("Reset password submitted:", data);
      // Placeholder for reset password logic
      setIsSuccess(true);
    } catch (error) {
      setSubmitError("An error occurred. Please try again.");
      console.error("Reset password error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-16 pb-16 px-4">
      <div className="max-w-[500px] mx-auto">
        <h1 className="text-3xl uppercase font-thin mb-8 text-center">
          Reset Password
        </h1>
        
        {isSuccess ? (
          <div className="text-center">
            <div className="p-6 border border-gray-200 mb-6">
              <p className="mb-4">Check your email for instructions.</p>
              <p className="text-sm text-gray-500">
                We've sent a password reset link to your email address. 
                If you don't see it in your inbox, please check your spam folder.
              </p>
            </div>
            <Link to="/login" className="text-black hover:underline">
              Return to login
            </Link>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <p className="text-sm text-gray-600 mb-4">
                Enter your email address below and we'll send you instructions on how to reset your password.
              </p>
              
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
              
              {submitError && (
                <div className="text-red-500 text-sm">{submitError}</div>
              )}
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-black text-white hover:bg-black hover:underline transition-all duration-300"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
              
              <div className="text-center mt-4">
                <Link to="/login" className="text-black hover:underline text-sm">
                  Back to login
                </Link>
              </div>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
