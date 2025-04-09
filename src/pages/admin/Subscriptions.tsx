import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PencilIcon, Trash2Icon, PlusCircleIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";

const AdminSubscriptions = () => {
  // State for dialogs
  const [isNewPlanDialogOpen, setIsNewPlanDialogOpen] = useState(false);
  const [isNewServiceDialogOpen, setIsNewServiceDialogOpen] = useState(false);
  const [subscriptionPlans, setSubscriptionPlans] = useState([
    { id: 1, name: "Basic", price: "$99/month", features: ["Feature 1", "Feature 2"], active: true },
    { id: 2, name: "Premium", price: "$199/month", features: ["Feature 1", "Feature 2", "Feature 3"], active: true },
    { id: 3, name: "Enterprise", price: "$499/month", features: ["All Features", "Priority Support"], active: true },
  ]);

  const [additionalServices, setAdditionalServices] = useState([
    { id: 1, name: "Premium Support", price: "$50/month", description: "24/7 priority support" },
    { id: 2, name: "Custom Development", price: "$120/hour", description: "Custom feature development" },
    { id: 3, name: "Consulting", price: "$200/hour", description: "Strategic business consulting" },
  ]);

  // Create form for new plan
  const planForm = useForm({
    defaultValues: {
      name: "",
      price: "",
      feature1: "",
      feature2: "",
    },
  });

  // Create form for new service
  const serviceForm = useForm({
    defaultValues: {
      name: "",
      price: "",
      description: "",
    },
  });

  const handleAddPlan = (data) => {
    const newPlan = {
      id: subscriptionPlans.length + 1,
      name: data.name,
      price: data.price,
      features: [data.feature1, data.feature2].filter(Boolean),
      active: true,
    };
    
    setSubscriptionPlans([...subscriptionPlans, newPlan]);
    toast({
      title: "Success",
      description: "Subscription plan added successfully",
    });
    planForm.reset();
    setIsNewPlanDialogOpen(false);
  };

  const handleAddService = (data) => {
    const newService = {
      id: additionalServices.length + 1,
      name: data.name,
      price: data.price,
      description: data.description,
    };
    
    setAdditionalServices([...additionalServices, newService]);
    toast({
      title: "Success",
      description: "Service added successfully",
    });
    serviceForm.reset();
    setIsNewServiceDialogOpen(false);
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
              onClick={() => setIsNewPlanDialogOpen(true)}
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
              onClick={() => setIsNewServiceDialogOpen(true)}
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
                  <TableHead className="font-medium text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {additionalServices.map((service) => (
                  <TableRow key={service.id} className="border-t border-gray-200">
                    <TableCell className="font-medium">{service.name}</TableCell>
                    <TableCell>{service.price}</TableCell>
                    <TableCell>{service.description}</TableCell>
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

      {/* New Plan Dialog */}
      <Dialog open={isNewPlanDialogOpen} onOpenChange={setIsNewPlanDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Subscription Plan</DialogTitle>
          </DialogHeader>
          <Form {...planForm}>
            <form onSubmit={planForm.handleSubmit(handleAddPlan)} className="space-y-4">
              <FormField
                control={planForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plan Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Pro Plan" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={planForm.control}
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
                control={planForm.control}
                name="feature1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Feature 1</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Unlimited Projects" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={planForm.control}
                name="feature2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Feature 2</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Premium Support" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsNewPlanDialogOpen(false)}>Cancel</Button>
                <Button type="submit">Add Plan</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* New Service Dialog */}
      <Dialog open={isNewServiceDialogOpen} onOpenChange={setIsNewServiceDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Service</DialogTitle>
          </DialogHeader>
          <Form {...serviceForm}>
            <form onSubmit={serviceForm.handleSubmit(handleAddService)} className="space-y-4">
              <FormField
                control={serviceForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Premium Support" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={serviceForm.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. $50/month" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={serviceForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 24/7 priority support" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsNewServiceDialogOpen(false)}>Cancel</Button>
                <Button type="submit">Add Service</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminSubscriptions;
