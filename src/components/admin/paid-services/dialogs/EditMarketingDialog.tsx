
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import type { CreditPackage } from "@/types/mockData";

const marketingCreditSchema = z.object({
  name: z.string().min(3, "Package name must be at least 3 characters"),
  credits: z.string().min(1, "Credits amount is required"),
  price: z.string().min(1, "Price is required"),
});

type MarketingFormValues = z.infer<typeof marketingCreditSchema>;

interface EditMarketingDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  package?: CreditPackage;
  onSubmit: (data: MarketingFormValues) => void;
}

const EditMarketingDialog: React.FC<EditMarketingDialogProps> = ({
  isOpen,
  setIsOpen,
  package: creditPackage,
  onSubmit
}) => {
  const form = useForm<MarketingFormValues>({
    resolver: zodResolver(marketingCreditSchema),
    defaultValues: {
      name: creditPackage?.name || "",
      credits: creditPackage?.credits.toString() || "",
      price: creditPackage?.price.toString() || "",
    }
  });

  const handleSubmit = (data: MarketingFormValues) => {
    onSubmit(data);
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {creditPackage ? "Edit Credit Package" : "Create Credit Package"}
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Package Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Silver Package" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="credits"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Credits</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 100" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price ($)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 49.99" type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <DialogFooter className="flex justify-between items-center mt-6">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-black hover:bg-gray-800">
                {creditPackage ? "Update Package" : "Create Package"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditMarketingDialog;
