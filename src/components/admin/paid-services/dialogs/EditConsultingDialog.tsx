
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import type { ConsultingService } from "@/types/services/paidServices";

const consultingSchema = z.object({
  name: z.string().min(3, "Service name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.string().min(1, "Price is required"),
  duration: z.string().min(1, "Duration is required"),
  consultantCount: z.string().min(1, "Number of consultants is required"),
  features: z.string().min(1, "At least one feature is required"),
  availability: z.string().min(1, "Availability information is required")
});

type ConsultingFormValues = z.infer<typeof consultingSchema>;

interface EditConsultingDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  service?: ConsultingService;
  onSubmit: (data: ConsultingFormValues) => void;
}

const EditConsultingDialog: React.FC<EditConsultingDialogProps> = ({
  isOpen,
  setIsOpen,
  service,
  onSubmit
}) => {
  const form = useForm<ConsultingFormValues>({
    resolver: zodResolver(consultingSchema),
    defaultValues: {
      name: service?.name || "",
      description: service?.description || "",
      price: service?.price.toString() || "",
      duration: service?.duration.toString() || "",
      consultantCount: service?.consultantCount.toString() || "",
      features: service?.features.join("\n") || "",
      availability: service?.availability.join("\n") || ""
    }
  });

  const handleSubmit = (data: ConsultingFormValues) => {
    onSubmit(data);
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {service ? "Edit Consulting Service" : "Create Consulting Service"}
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Strategic Planning Session" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe the consulting service..." 
                      className="min-h-[100px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 499.99" type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration (Hours)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 2" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="consultantCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Consultants</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 2" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="features"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Features</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter each feature on a new line" 
                      className="min-h-[100px]" 
                      {...field} 
                    />
                  </FormControl>
                  <p className="text-xs text-gray-500 mt-1">Enter one feature per line</p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="availability"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Availability</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter available days/times (one per line)" 
                      className="min-h-[100px]" 
                      {...field} 
                    />
                  </FormControl>
                  <p className="text-xs text-gray-500 mt-1">Enter each availability slot on a new line</p>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter className="flex justify-between items-center mt-6">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-black hover:bg-gray-800">
                {service ? "Update Service" : "Create Service"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditConsultingDialog;
