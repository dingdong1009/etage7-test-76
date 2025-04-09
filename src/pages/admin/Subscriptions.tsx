
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PencilIcon, Trash2Icon, PlusCircleIcon, CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const AdminSubscriptions = () => {
  // State for dialogs
  const [isNewPlanDialogOpen, setIsNewPlanDialogOpen] = useState(false);
  const [isNewServiceDialogOpen, setIsNewServiceDialogOpen] = useState(false);
  const [subscriptionPlans, setSubscriptionPlans] = useState([
    { id: 1, name: "Basic", price: "$99/month", features: ["Feature 1", "Feature 2"], active: true, duration: "Monthly", renewable: true, type: "plan" },
    { id: 2, name: "Premium", price: "$199/month", features: ["Feature 1", "Feature 2", "Feature 3"], active: true, duration: "Annual", renewable: true, type: "plan" },
    { id: 3, name: "Enterprise", price: "$499/month", features: ["All Features", "Priority Support"], active: true, duration: "Annual", renewable: true, type: "plan" },
  ]);

  const [additionalServices, setAdditionalServices] = useState([
    { id: 1, name: "Premium Support", price: "$50/month", description: "24/7 priority support", active: true, duration: "Monthly", renewable: true, type: "service" },
    { id: 2, name: "Custom Development", price: "$120/hour", description: "Custom feature development", active: true, duration: "Per hour", renewable: false, type: "service" },
    { id: 3, name: "Consulting", price: "$200/hour", description: "Strategic business consulting", active: true, duration: "Per hour", renewable: false, type: "service" },
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

  const handleAddItem = (data) => {
    const features = data.features.split('\n').filter(Boolean);
    
    if (data.type === "plan") {
      const newPlan = {
        id: subscriptionPlans.length + 1,
        name: data.name,
        price: data.price,
        features: features,
        active: data.active,
        duration: data.duration,
        renewable: data.renewable,
        type: "plan"
      };
      
      setSubscriptionPlans([...subscriptionPlans, newPlan]);
      toast({
        title: "Success",
        description: "Subscription plan added successfully",
      });
      setIsNewPlanDialogOpen(false);
    } else {
      const newService = {
        id: additionalServices.length + 1,
        name: data.name,
        price: data.price,
        description: data.description || features.join(', '),
        active: data.active,
        duration: data.duration,
        renewable: data.renewable,
        type: "service"
      };
      
      setAdditionalServices([...additionalServices, newService]);
      toast({
        title: "Success",
        description: "Service added successfully",
      });
      setIsNewServiceDialogOpen(false);
    }
    
    itemForm.reset();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-4xl md:text-6xl uppercase font-thin mb-6">Subscription Management</h1>

      <Tabs defaultValue="plans" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="plans">Subscription Plans</TabsTrigger>
          <TabsTrigger value="additional">Additional Services</TabsTrigger>
        </TabsList>

        <TabsContent value="plans" className="space-y-4">
          <div className="flex justify-end mb-4">
            <Button 
              className="bg-black text-white border-none hover:underline"
              onClick={() => {
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
                setIsNewPlanDialogOpen(true);
              }}
            >
              <PlusCircleIcon className="w-4 h-4 mr-2" />
              Add New Plan
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {subscriptionPlans.map((plan) => (
              <Card key={plan.id} className="p-6 border border-gray-200">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <div className={`px-2 py-1 text-xs rounded-sm ${plan.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {plan.active ? 'Active' : 'Inactive'}
                  </div>
                </div>
                <div className="text-2xl font-bold mt-2">{plan.price}</div>
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <CalendarIcon className="w-4 h-4 mr-1" />
                  <span>{plan.duration} {plan.renewable ? '• Renewable' : '• Non-renewable'}</span>
                </div>
                <ul className="mt-4 space-y-2">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <span className="mr-2">•</span> {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex gap-2">
                  <Button variant="outline" size="icon" className="border-gray-200 h-8 w-8">
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="border-gray-200 text-red-600 hover:text-red-700 h-8 w-8">
                    <Trash2Icon className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="additional" className="space-y-4">
          <div className="flex justify-end mb-4">
            <Button 
              className="bg-black text-white border-none hover:underline"
              onClick={() => {
                itemForm.reset({
                  name: "",
                  price: "",
                  features: "",
                  description: "",
                  active: true,
                  duration: "Per hour",
                  renewable: false,
                  type: "service"
                });
                setIsNewServiceDialogOpen(true);
              }}
            >
              <PlusCircleIcon className="w-4 h-4 mr-2" />
              Add New Service
            </Button>
          </div>

          <div className="rounded-none border border-gray-200 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-medium">Service Name</TableHead>
                  <TableHead className="font-medium">Price</TableHead>
                  <TableHead className="font-medium">Description</TableHead>
                  <TableHead className="font-medium">Duration</TableHead>
                  <TableHead className="font-medium w-24 text-center">Status</TableHead>
                  <TableHead className="font-medium text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {additionalServices.map((service) => (
                  <TableRow key={service.id} className="border-t border-gray-200">
                    <TableCell className="font-medium">{service.name}</TableCell>
                    <TableCell>{service.price}</TableCell>
                    <TableCell>{service.description}</TableCell>
                    <TableCell>
                      {service.duration} {service.renewable ? '• Renewable' : '• Non-renewable'}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className={`inline-block px-2 py-1 text-xs rounded-full ${service.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {service.active ? 'Active' : 'Inactive'}
                      </div>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="icon" className="border-gray-200 h-8 w-8">
                        <PencilIcon className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="border-gray-200 text-red-600 hover:text-red-700 h-8 w-8">
                        <Trash2Icon className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      {/* Unified Item Dialog */}
      <Dialog 
        open={isNewPlanDialogOpen || isNewServiceDialogOpen} 
        onOpenChange={(open) => {
          if (!open) {
            setIsNewPlanDialogOpen(false);
            setIsNewServiceDialogOpen(false);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {itemForm.watch("type") === "plan" ? "Add New Subscription Plan" : "Add New Service"}
            </DialogTitle>
          </DialogHeader>
          <Form {...itemForm}>
            <form onSubmit={itemForm.handleSubmit(handleAddItem)} className="space-y-4">
              <FormField
                control={itemForm.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Item Type</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-row space-x-4"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="plan" />
                          </FormControl>
                          <FormLabel className="font-normal">Subscription Plan</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="service" />
                          </FormControl>
                          <FormLabel className="font-normal">Additional Service</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={itemForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder={field.value === "plan" ? "e.g. Pro Plan" : "e.g. Premium Support"} {...field} />
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
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. $99/month" {...field} />
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
                    <FormLabel>{itemForm.watch("type") === "plan" ? "Features" : "Details"}</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder={itemForm.watch("type") === "plan" 
                          ? "Add features (one per line)" 
                          : "Add service details (one per line)"
                        }
                        className="min-h-[80px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
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
                    <FormLabel>Duration</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
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

              <div className="flex space-x-4">
                <FormField
                  control={itemForm.control}
                  name="renewable"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">Renewable</FormLabel>
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
                        />
                      </FormControl>
                      <FormLabel className="font-normal">Active</FormLabel>
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setIsNewPlanDialogOpen(false);
                    setIsNewServiceDialogOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {itemForm.watch("type") === "plan" ? "Add Plan" : "Add Service"}
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
