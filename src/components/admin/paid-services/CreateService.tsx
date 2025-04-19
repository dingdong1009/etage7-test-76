
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CreditCard, Package, MessageSquare, BarChart, Calendar } from "lucide-react";

const subscriptionFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  price: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: "Price must be a positive number.",
  }),
  features: z.string().min(5, { message: "Enter at least one feature, one per line." }),
  frequency: z.enum(["monthly", "semi-annual", "annual", "one-time"]),
  autoRenewal: z.boolean().default(true),
  maxUsers: z.string().refine((val) => !isNaN(parseInt(val)) && parseInt(val) > 0, {
    message: "Maximum users must be a positive number.",
  }),
  trialDays: z.string().optional(),
  status: z.enum(["active", "inactive", "draft"]).default("draft"),
});

const consultingFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  price: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: "Price must be a positive number.",
  }),
  features: z.string().min(5, { message: "Enter at least one feature, one per line." }),
  duration: z.string().refine((val) => !isNaN(parseInt(val)) && parseInt(val) > 0, {
    message: "Duration must be a positive number of hours.",
  }),
  consultantCount: z.string().refine((val) => !isNaN(parseInt(val)) && parseInt(val) > 0, {
    message: "Consultant count must be a positive number.",
  }),
  availability: z.array(z.string()).min(1, { message: "Select at least one day of availability." }),
  status: z.enum(["active", "inactive", "draft"]).default("draft"),
});

const advertisementFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  price: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: "Price must be a positive number.",
  }),
  features: z.string().min(5, { message: "Enter at least one feature, one per line." }),
  placement: z.enum(["homepage", "search", "dashboard", "curated"]),
  duration: z.string().refine((val) => !isNaN(parseInt(val)) && parseInt(val) > 0, {
    message: "Duration must be a positive number of days.",
  }),
  frequency: z.enum(["monthly", "semi-annual", "annual", "one-time"]),
  autoRenewal: z.boolean().default(false),
  status: z.enum(["active", "inactive", "draft"]).default("draft"),
});

const days = [
  { id: "monday", label: "Monday" },
  { id: "tuesday", label: "Tuesday" },
  { id: "wednesday", label: "Wednesday" },
  { id: "thursday", label: "Thursday" },
  { id: "friday", label: "Friday" },
  { id: "saturday", label: "Saturday" },
  { id: "sunday", label: "Sunday" },
];

const CreateService = () => {
  const [serviceType, setServiceType] = useState("subscription");
  
  const subscriptionForm = useForm<z.infer<typeof subscriptionFormSchema>>({
    resolver: zodResolver(subscriptionFormSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      features: "",
      frequency: "monthly",
      autoRenewal: true,
      maxUsers: "",
      trialDays: "",
      status: "draft",
    },
  });
  
  const consultingForm = useForm<z.infer<typeof consultingFormSchema>>({
    resolver: zodResolver(consultingFormSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      features: "",
      duration: "",
      consultantCount: "",
      availability: [],
      status: "draft",
    },
  });
  
  const advertisementForm = useForm<z.infer<typeof advertisementFormSchema>>({
    resolver: zodResolver(advertisementFormSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      features: "",
      placement: "homepage",
      duration: "30",
      frequency: "monthly",
      autoRenewal: false,
      status: "draft",
    },
  });
  
  const onSubscriptionSubmit = (data: z.infer<typeof subscriptionFormSchema>) => {
    console.log("Subscription data:", data);
    // Handle form submission
    // TODO: Submit data to API
    alert("Subscription service created successfully!");
  };
  
  const onConsultingSubmit = (data: z.infer<typeof consultingFormSchema>) => {
    console.log("Consulting data:", data);
    // Handle form submission
    // TODO: Submit data to API
    alert("Consulting service created successfully!");
  };
  
  const onAdvertisementSubmit = (data: z.infer<typeof advertisementFormSchema>) => {
    console.log("Advertisement data:", data);
    // Handle form submission
    // TODO: Submit data to API
    alert("Advertisement service created successfully!");
  };
  
  return (
    <div className="space-y-4 pt-3">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-normal uppercase tracking-tighter">RCreate New Paid Service</h2>
      </div>
      <Card className="border border-gray-200 shadow-none rounded-lg">
        <CardContent className="p-6">
          <Tabs 
            defaultValue="subscription" 
            value={serviceType} 
            onValueChange={setServiceType}
            className="w-full"
          >
            <TabsList className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-transparent h-auto p-0">
              <TabsTrigger 
                value="subscription" 
                className="border bg-white data-[state=active]:border-black border-gray-200 rounded-lg flex items-center gap-3 h-auto py-4 px-4 data-[state=active]:bg-gray-200"
              >
                <div className="h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Subscription</div>
                  <div className="text-xs text-gray-500">Recurring payment plans</div>
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="consulting" 
                className="border bg-white data-[state=active]:border-black border-gray-200 rounded-lg flex items-center gap-3 h-auto py-4 px-4 data-[state=active]:bg-gray-200"
              >
                <div className="h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Consulting</div>
                  <div className="text-xs text-gray-500">Professional services</div>
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="advertisement" 
                className="border bg-white data-[state=active]:border-black border-gray-200 rounded-lg flex items-center gap-3 h-auto py-4 px-4 data-[state=active]:bg-gray-200"
              >
                <div className="h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center">
                  <BarChart className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Advertisement</div>
                  <div className="text-xs text-gray-500">Promotional placements</div>
                </div>
              </TabsTrigger>
            </TabsList>
            
            <div className="mt-8">
              <TabsContent value="subscription">
                <Form {...subscriptionForm}>
                  <form onSubmit={subscriptionForm.handleSubmit(onSubscriptionSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={subscriptionForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subscription Name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Basic Plan" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={subscriptionForm.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₽</span>
                                <Input type="text" placeholder="29.99" className="pl-8" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={subscriptionForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe what the subscription includes..." 
                              className="min-h-[100px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={subscriptionForm.control}
                      name="features"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Features</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="One feature per line..."
                              className="min-h-[100px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Enter one feature per line. These will be displayed as bullet points.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={subscriptionForm.control}
                        name="frequency"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Billing Frequency</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="monthly" />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">
                                    Monthly
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="semi-annual" />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">
                                    Semi-Annual
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="annual" />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">
                                    Annual
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="one-time" />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">
                                    One-time payment
                                  </FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="space-y-6">
                        <FormField
                          control={subscriptionForm.control}
                          name="maxUsers"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Maximum Users</FormLabel>
                              <FormControl>
                                <Input type="text" placeholder="e.g. 10" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={subscriptionForm.control}
                          name="trialDays"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Trial Period (Days)</FormLabel>
                              <FormControl>
                                <Input type="text" placeholder="e.g. 14" {...field} />
                              </FormControl>
                              <FormDescription>
                                Leave empty for no trial period
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={subscriptionForm.control}
                        name="autoRenewal"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Automatic Renewal
                              </FormLabel>
                              <FormDescription>
                                Automatically renew subscription when period ends
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={subscriptionForm.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="draft">Draft</SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <Button className="bg-black hover:bg-gray-100 border hover:text-black hover:border text-white font-normal uppercase" type="submit">Create Subscription</Button>
                    </div>
                  </form>
                </Form>
              </TabsContent>
              
              <TabsContent value="consulting">
                <Form {...consultingForm}>
                  <form onSubmit={consultingForm.handleSubmit(onConsultingSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={consultingForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Service Name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Brand Strategy Consultation" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={consultingForm.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₽</span>
                                <Input type="text" placeholder="299.00" className="pl-8" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={consultingForm.control}
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
                    
                    <FormField
                      control={consultingForm.control}
                      name="features"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Deliverables</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="One deliverable per line..."
                              className="min-h-[100px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Enter one deliverable per line. These will be displayed as bullet points.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={consultingForm.control}
                        name="duration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Duration (Hours)</FormLabel>
                            <FormControl>
                              <Input type="text" placeholder="e.g. 10" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={consultingForm.control}
                        name="consultantCount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Number of Consultants</FormLabel>
                            <FormControl>
                              <Input type="text" placeholder="e.g. 2" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={consultingForm.control}
                      name="availability"
                      render={({ field }) => (
                        <FormItem>
                          <div className="mb-4">
                            <FormLabel className="text-base">Availability</FormLabel>
                            <FormDescription>
                              Select days when this service is available
                            </FormDescription>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {days.map((day) => (
                              <FormItem
                                key={day.id}
                                className="flex flex-row items-center space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(day.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, day.id])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== day.id
                                            )
                                          )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">
                                  {day.label}
                                </FormLabel>
                              </FormItem>
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={consultingForm.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="draft">Draft</SelectItem>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-end">
                      <Button className="bg-black hover:bg-gray-100 border hover:text-black hover:border text-white font-normal uppercase" type="submit">Create Consulting Service</Button>
                    </div>
                  </form>
                </Form>
              </TabsContent>
              
              <TabsContent value="advertisement">
                <Form {...advertisementForm}>
                  <form onSubmit={advertisementForm.handleSubmit(onAdvertisementSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={advertisementForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Advertisement Name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Homepage Banner" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={advertisementForm.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₽</span>
                                <Input type="text" placeholder="499.00" className="pl-8" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={advertisementForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe what the advertisement includes..." 
                              className="min-h-[100px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={advertisementForm.control}
                      name="features"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Features</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="One feature per line..."
                              className="min-h-[100px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Enter one feature per line. These will be displayed as bullet points.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={advertisementForm.control}
                        name="placement"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Placement</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select placement" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="homepage">Homepage</SelectItem>
                                <SelectItem value="search">Search Results</SelectItem>
                                <SelectItem value="dashboard">User Dashboard</SelectItem>
                                <SelectItem value="curated">Curated Section</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={advertisementForm.control}
                        name="duration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Duration (Days)</FormLabel>
                            <FormControl>
                              <Input type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={advertisementForm.control}
                        name="frequency"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Billing Frequency</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="monthly" />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">
                                    Monthly
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="semi-annual" />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">
                                    Semi-Annual
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="annual" />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">
                                    Annual
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="one-time" />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">
                                    One-time payment
                                  </FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="space-y-6">
                        <FormField
                          control={advertisementForm.control}
                          name="autoRenewal"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                  Automatic Renewal
                                </FormLabel>
                                <FormDescription>
                                  Automatically renew when period ends
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={advertisementForm.control}
                          name="status"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Status</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="draft">Draft</SelectItem>
                                  <SelectItem value="active">Active</SelectItem>
                                  <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button className="bg-black hover:bg-gray-100 border hover:text-black hover:border text-white font-normal uppercase" type="submit">Create Advertisement</Button>
                    </div>
                  </form>
                </Form>
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateService;
