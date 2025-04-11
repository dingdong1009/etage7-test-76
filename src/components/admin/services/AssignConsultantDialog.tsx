
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";

interface ServiceBooking {
  id: string;
  serviceName: string;
  serviceCategory: string;
  clientName: string;
  clientEmail: string;
  clientCompany: string;
  preferredDate: string;
  message: string;
  status: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled";
  createdAt: string;
  assignedTo?: string;
  userType: "brand" | "buyer";
}

interface AssignConsultantDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  booking: ServiceBooking | null;
  onAssign: (data: { assignedTo: string; scheduledDate: string; notes: string }) => void;
}

const AssignConsultantDialog: React.FC<AssignConsultantDialogProps> = ({
  isOpen,
  setIsOpen,
  booking,
  onAssign
}) => {
  const assignForm = useForm({
    defaultValues: {
      assignedTo: "",
      scheduledDate: "",
      notes: ""
    }
  });

  if (!booking) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Assign Consultant</DialogTitle>
        </DialogHeader>
        
        <Form {...assignForm}>
          <form onSubmit={assignForm.handleSubmit(onAssign)} className="space-y-4">
            <div className="space-y-1">
              <div className="text-sm font-medium">Service:</div>
              <div>{booking.serviceName} ({booking.serviceCategory})</div>
            </div>
            
            <div className="space-y-1">
              <div className="text-sm font-medium">Client:</div>
              <div>{booking.clientName} - {booking.clientCompany}</div>
            </div>
            
            <FormField
              control={assignForm.control}
              name="assignedTo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assigned Consultant</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select consultant" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Sophie Martin">Sophie Martin</SelectItem>
                      <SelectItem value="Alexandre Chen">Alexandre Chen</SelectItem>
                      <SelectItem value="Elena Dubois">Elena Dubois</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            
            <FormField
              control={assignForm.control}
              name="scheduledDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Scheduled Date</FormLabel>
                  <FormControl>
                    <Input type="date" required {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={assignForm.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Internal Notes</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Add notes for the consultant..." 
                      className="min-h-[100px]" 
                      {...field} 
                    />
                  </FormControl>
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
              <Button type="submit">
                Confirm Assignment
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AssignConsultantDialog;
