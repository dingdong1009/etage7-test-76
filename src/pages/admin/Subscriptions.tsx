
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EditIcon, Trash2Icon, PlusCircleIcon, CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const AdminSubscriptions = () => {
  // State for dialogs
  const [isItemDialogOpen, setIsItemDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItemId, setCurrentItemId] = useState<number | null>(null);
  
  // Sample data
  const [subscriptionPlans, setSubscriptionPlans] = useState([
    { id: 1, name: "Basic", price: "$99/month", features: ["Feature 1", "Feature 2"], active: true, duration: "Monthly", renewable: true, type: "plan" },
    { id: 2, name: "Premium", price: "$199/month", features: ["Feature 1", "Feature 2", "Feature 3"], active: true, duration: "Annual", renewable: true, type: "plan" },
    { id: 3, name: "Enterprise", price: "$499/month", features: ["All Features", "Priority Support"], active: true, duration: "Annual", renewable: true, type: "plan" },
  ]);

  // Create unified form with shared fields
  const itemForm = useForm({
    defaultValues: {
      name: "",
      price: "",
      features: "",
      description: "",
      active: true,
      duration: "Monthly",
      renewable: true,
      type: "plan"
    },
  });

  // Open dialog for adding a new item
  const handleAddNew = () => {
    itemForm.reset({
      name: "",
      price: "",
      features: "",
      description: "",
      active: true,
      duration: "Monthly",
      renewable: true,
      type: "plan"
    });
    setIsEditing(false);
    setCurrentItemId(null);
    setIsItemDialogOpen(true);
  };

  // Open dialog for editing an existing item
  const handleEdit = (item) => {
    let featureText = "";
    
    if (item.features) {
      featureText = item.features.join('\n');
    }
    
    itemForm.reset({
      name: item.name,
      price: item.price,
      features: featureText,
      active: item.active,
      duration: item.duration,
      renewable: item.renewable,
      type: "plan"
    });
    
    setIsEditing(true);
    setCurrentItemId(item.id);
    setIsItemDialogOpen(true);
  };

  const handleDeleteItem = (itemId) => {
    setSubscriptionPlans(subscriptionPlans.filter(plan => plan.id !== itemId));
    toast({
      title: "Success",
      description: "Subscription plan deleted successfully",
    });
  };

  const handleSubmitItem = (data) => {
    const features = data.features.split('\n').filter(Boolean);
    
    const newItem = {
      id: isEditing ? currentItemId : subscriptionPlans.length + 1,
      name: data.name,
      price: data.price,
      features: features,
      active: data.active,
      duration: data.duration,
      renewable: data.renewable,
      type: "plan"
    };
    
    if (isEditing) {
      setSubscriptionPlans(subscriptionPlans.map(plan => 
        plan.id === currentItemId ? newItem : plan
      ));
      toast({
        title: "Success",
        description: "Subscription plan updated successfully",
      });
    } else {
      setSubscriptionPlans([...subscriptionPlans, newItem]);
      toast({
        title: "Success",
        description: "Subscription plan added successfully",
      });
    }
    
    setIsItemDialogOpen(false);
    itemForm.reset();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tighter uppercase mb-6">SUBSCRIPTION MANAGEMENT</h1>

      <div className="flex justify-end mb-4">
        <Button 
          className="bg-black text-white border-none hover:bg-gray-800 text-xs font-light rounded-none"
          onClick={handleAddNew}
        >
          <PlusCircleIcon className="w-4 h-4 mr-2" strokeWidth={1} />
          Add New Plan
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {subscriptionPlans.map((plan) => (
          <Card key={plan.id} className="p-6 border border-gray-200 shadow-none rounded-none hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-light">{plan.name}</h3>
              <div className={`px-2 py-1 text-xs rounded-sm ${plan.active ? 'bg-accent-mint text-gray-800' : 'bg-gray-100 text-gray-800'}`}>
                {plan.active ? 'Active' : 'Inactive'}
              </div>
            </div>
            <div className="text-2xl font-light mt-2">{plan.price}</div>
            <div className="flex items-center mt-2 text-xs text-gray-500">
              <CalendarIcon className="w-4 h-4 mr-1" strokeWidth={1} />
              <span>{plan.duration} {plan.renewable ? '• Renewable' : '• Non-renewable'}</span>
            </div>
            <ul className="mt-4 space-y-2">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center text-sm font-light">
                  <span className="mr-2">•</span> {feature}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                className="border-gray-200 h-8 w-8 rounded-none hover:bg-gray-100"
                onClick={() => handleEdit(plan)}
              >
                <EditIcon className="h-4 w-4" strokeWidth={1} />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="border-gray-200 text-red-600 hover:text-red-700 h-8 w-8 rounded-none hover:bg-gray-100"
                onClick={() => handleDeleteItem(plan.id)}
              >
                <Trash2Icon className="h-4 w-4" strokeWidth={1} />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Item Dialog */}
      <Dialog 
        open={isItemDialogOpen} 
        onOpenChange={(open) => {
          if (!open) {
            setIsItemDialogOpen(false);
          }
        }}
      >
        <DialogContent className="rounded-none">
          <DialogHeader>
            <DialogTitle className="text-xl font-light tracking-tight">
              {isEditing ? "Edit Subscription Plan" : "Add New Subscription Plan"}
            </DialogTitle>
          </DialogHeader>
          <Form {...itemForm}>
            <form onSubmit={itemForm.handleSubmit(handleSubmitItem)} className="space-y-4">
              <FormField
                control={itemForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-light">Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Pro Plan"
                        {...field}
                        className="rounded-none border-gray-200" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={itemForm.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-light">Price</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g. $99/month" 
                        {...field}
                        className="rounded-none border-gray-200" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={itemForm.control}
                name="features"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-light">Features</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Add features (one per line)"
                        className="min-h-[80px] rounded-none border-gray-200"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription className="text-xs font-light">
                      Enter each feature on a new line
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={itemForm.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-light">Duration</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="rounded-none border-gray-200">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-none">
                        <SelectItem value="Monthly">Monthly</SelectItem>
                        <SelectItem value="Annual">Annual</SelectItem>
                        <SelectItem value="One-time">One-time</SelectItem>
                        <SelectItem value="Per hour">Per hour</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex space-x-8">
                <FormField
                  control={itemForm.control}
                  name="renewable"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="rounded-full"
                        />
                      </FormControl>
                      <FormLabel className="font-light text-sm">Renewable</FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={itemForm.control}
                  name="active"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="rounded-full"
                        />
                      </FormControl>
                      <FormLabel className="font-light text-sm">Active</FormLabel>
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsItemDialogOpen(false)}
                  className="rounded-none border-gray-200 text-xs font-light"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="rounded-none bg-black text-white hover:bg-gray-800 text-xs font-light"
                >
                  {isEditing ? "Save Changes" : "Add Plan"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminSubscriptions;
