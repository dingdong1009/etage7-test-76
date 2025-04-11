
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Check, X, Calendar, MessagesSquare, User, Clock, FileText, CircleAlert, PlusCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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

// Schema for the new service form validation
const newServiceSchema = z.object({
  name: z.string().min(3, "Service name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Category is required"),
  price: z.string().min(1, "Price is required"),
  duration: z.string().min(1, "Duration is required"),
  targetUserType: z.enum(["brand", "buyer", "both"]),
  features: z.string().min(1, "At least one feature is required")
});

type NewServiceFormValues = z.infer<typeof newServiceSchema>;

const AdminAdditionalServices = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [isNewServiceDialogOpen, setIsNewServiceDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<ServiceBooking | null>(null);
  
  // Mock data for service bookings
  const mockBookings: ServiceBooking[] = [
    {
      id: "1",
      serviceName: "Market Entry Strategy",
      serviceCategory: "Strategy",
      clientName: "Sophie Martin",
      clientEmail: "sophie@brandexample.com",
      clientCompany: "ACME Fashion",
      preferredDate: "2025-05-15",
      message: "We're looking to expand to the US market and need comprehensive guidance.",
      status: "pending",
      createdAt: "2025-04-08T09:30:00Z",
      userType: "brand"
    },
    {
      id: "2",
      serviceName: "Brand Positioning",
      serviceCategory: "Marketing",
      clientName: "Jean Dupont",
      clientEmail: "jean@luxedecor.com",
      clientCompany: "Luxe Decor",
      preferredDate: "2025-04-20",
      message: "Need help to reposition our brand in the luxury segment.",
      status: "confirmed",
      createdAt: "2025-04-06T14:15:00Z",
      assignedTo: "Alexandre Chen",
      userType: "brand"
    },
    {
      id: "3",
      serviceName: "Trend Forecasting",
      serviceCategory: "Analysis",
      clientName: "Maria Garcia",
      clientEmail: "maria@trendystore.com",
      clientCompany: "Trendy Store",
      preferredDate: "2025-04-25",
      message: "Looking for insights on emerging trends for Fall/Winter 2025.",
      status: "in_progress",
      createdAt: "2025-04-05T11:45:00Z",
      assignedTo: "Elena Dubois",
      userType: "buyer"
    },
    {
      id: "4",
      serviceName: "Curated Brand Discovery",
      serviceCategory: "Curation",
      clientName: "Robert Johnson",
      clientEmail: "robert@selectshop.com",
      clientCompany: "Select Shop",
      preferredDate: "2025-04-30",
      message: "Need help finding unique brands that align with our store's aesthetic.",
      status: "completed",
      createdAt: "2025-03-28T10:00:00Z",
      assignedTo: "Sophie Martin",
      userType: "buyer"
    },
    {
      id: "5",
      serviceName: "Sales Optimization",
      serviceCategory: "Sales",
      clientName: "Carlos Mendez",
      clientEmail: "carlos@urbanwear.com",
      clientCompany: "Urban Wear Co.",
      preferredDate: "2025-05-10",
      message: "Need guidance on improving our sales conversion rates with buyers.",
      status: "cancelled",
      createdAt: "2025-04-02T16:20:00Z",
      userType: "brand"
    }
  ];

  // New service form
  const newServiceForm = useForm<NewServiceFormValues>({
    resolver: zodResolver(newServiceSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      price: "",
      duration: "",
      targetUserType: "both",
      features: ""
    }
  });
  
  // Filter bookings based on active tab
  const filteredBookings = activeTab === "all" 
    ? mockBookings 
    : mockBookings.filter(booking => booking.status === activeTab);
  
  // Form for assigning a consultant
  const assignForm = useForm({
    defaultValues: {
      assignedTo: "",
      scheduledDate: "",
      notes: ""
    }
  });
  
  const handleViewDetails = (booking: ServiceBooking) => {
    setSelectedBooking(booking);
    setIsDetailsOpen(true);
  };
  
  const handleAssign = (booking: ServiceBooking) => {
    setSelectedBooking(booking);
    setIsAssignDialogOpen(true);
  };
  
  const handleAssignSubmit = (data: { assignedTo: string, scheduledDate: string, notes: string }) => {
    console.log("Assigning booking to:", data);
    
    // In a real app, this would update the database
    toast({
      title: "Booking Assigned",
      description: `Booking assigned to ${data.assignedTo}`
    });
    
    setIsAssignDialogOpen(false);
  };
  
  const handleStatusChange = (bookingId: string, newStatus: "confirmed" | "in_progress" | "completed" | "cancelled") => {
    // In a real app, this would update the database
    console.log(`Changing status of booking ${bookingId} to ${newStatus}`);
    
    toast({
      title: "Status Updated",
      description: `Booking status changed to ${newStatus}`
    });
  };

  const handleAddNewService = () => {
    setIsNewServiceDialogOpen(true);
  };

  const handleNewServiceSubmit = (data: NewServiceFormValues) => {
    // In a real app, this would create a new service in the database
    console.log("New service data:", data);

    // Parse features from newline-separated string to array
    const featuresArray = data.features.split('\n').filter(feature => feature.trim() !== '');
    
    toast({
      title: "Service Created",
      description: `New service "${data.name}" has been created successfully.`
    });
    
    newServiceForm.reset();
    setIsNewServiceDialogOpen(false);
  };
  
  // Component for status badge
  const StatusBadge = ({ status }: { status: ServiceBooking["status"] }) => {
    const statusConfig = {
      pending: { color: "bg-yellow-100 text-yellow-800", label: "Pending" },
      confirmed: { color: "bg-blue-100 text-blue-800", label: "Confirmed" },
      in_progress: { color: "bg-purple-100 text-purple-800", label: "In Progress" },
      completed: { color: "bg-green-100 text-green-800", label: "Completed" },
      cancelled: { color: "bg-red-100 text-red-800", label: "Cancelled" }
    };
    
    const { color, label } = statusConfig[status];
    
    return (
      <Badge variant="outline" className={`${color} border-0`}>
        {label}
      </Badge>
    );
  };
  
  // Component for client type badge
  const ClientTypeBadge = ({ type }: { type: "brand" | "buyer" }) => {
    return (
      <Badge variant="outline" className={type === "brand" ? "bg-gray-100 text-gray-800" : "bg-indigo-100 text-indigo-800"}>
        {type === "brand" ? "Brand" : "Buyer"}
      </Badge>
    );
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
        <h1 className="text-3xl md:text-5xl uppercase font-thin">Additional Services Management</h1>
        <div className="flex space-x-4">
          <Button onClick={handleAddNewService}>
            <PlusCircle className="w-4 h-4 mr-2" />
            Add New Service
          </Button>
          <Button variant="outline">
            Export Bookings
          </Button>
        </div>
      </div>
      
      <Card className="mb-6">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Quick Stats</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="text-xs text-yellow-600 mb-1">Pending</div>
            <div className="text-2xl font-semibold">{mockBookings.filter(b => b.status === 'pending').length}</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-xs text-blue-600 mb-1">Confirmed</div>
            <div className="text-2xl font-semibold">{mockBookings.filter(b => b.status === 'confirmed').length}</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-xs text-purple-600 mb-1">In Progress</div>
            <div className="text-2xl font-semibold">{mockBookings.filter(b => b.status === 'in_progress').length}</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-xs text-green-600 mb-1">Completed</div>
            <div className="text-2xl font-semibold">{mockBookings.filter(b => b.status === 'completed').length}</div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-6 mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
          <TabsTrigger value="in_progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-3 text-left">Client</th>
                    <th className="px-6 py-3 text-left">Service</th>
                    <th className="px-6 py-3 text-left">Date Requested</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <div className="font-medium">{booking.clientName}</div>
                          <div className="text-sm text-gray-500">{booking.clientCompany}</div>
                          <div className="mt-1">
                            <ClientTypeBadge type={booking.userType} />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium">{booking.serviceName}</div>
                        <div className="text-sm text-gray-500">{booking.serviceCategory}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium">{new Date(booking.preferredDate).toLocaleDateString()}</div>
                        <div className="text-sm text-gray-500">{new Date(booking.createdAt).toLocaleDateString()}</div>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={booking.status} />
                        {booking.assignedTo && (
                          <div className="text-sm text-gray-600 mt-1">
                            Assigned to: {booking.assignedTo}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewDetails(booking)}>
                            View
                          </Button>
                          {booking.status === "pending" && (
                            <Button size="sm" onClick={() => handleAssign(booking)}>
                              Assign
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
        
        {["pending", "confirmed", "in_progress", "completed", "cancelled"].map(tab => (
          <TabsContent key={tab} value={tab} className="mt-0">
            <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-3 text-left">Client</th>
                      <th className="px-6 py-3 text-left">Service</th>
                      <th className="px-6 py-3 text-left">Date Requested</th>
                      <th className="px-6 py-3 text-left">Status</th>
                      <th className="px-6 py-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredBookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <div className="font-medium">{booking.clientName}</div>
                            <div className="text-sm text-gray-500">{booking.clientCompany}</div>
                            <div className="mt-1">
                              <ClientTypeBadge type={booking.userType} />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium">{booking.serviceName}</div>
                          <div className="text-sm text-gray-500">{booking.serviceCategory}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium">{new Date(booking.preferredDate).toLocaleDateString()}</div>
                          <div className="text-sm text-gray-500">{new Date(booking.createdAt).toLocaleDateString()}</div>
                        </td>
                        <td className="px-6 py-4">
                          <StatusBadge status={booking.status as any} />
                          {booking.assignedTo && (
                            <div className="text-sm text-gray-600 mt-1">
                              Assigned to: {booking.assignedTo}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" onClick={() => handleViewDetails(booking)}>
                              View
                            </Button>
                            {booking.status === "pending" && (
                              <Button size="sm" onClick={() => handleAssign(booking)}>
                                Assign
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
      
      {/* Booking Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
          </DialogHeader>
          
          {selectedBooking && (
            <div className="space-y-4">
              <div className="flex justify-between">
                <StatusBadge status={selectedBooking.status} />
                <ClientTypeBadge type={selectedBooking.userType} />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Service</div>
                  <div className="font-medium">{selectedBooking.serviceName}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Category</div>
                  <div className="font-medium">{selectedBooking.serviceCategory}</div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex items-center mb-2">
                  <User size={16} className="mr-2 text-gray-500" />
                  <span className="font-medium">Client Information</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-500">Name</div>
                    <div>{selectedBooking.clientName}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Company</div>
                    <div>{selectedBooking.clientCompany}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-sm text-gray-500">Email</div>
                    <div>{selectedBooking.clientEmail}</div>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex items-center mb-2">
                  <Calendar size={16} className="mr-2 text-gray-500" />
                  <span className="font-medium">Schedule</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-500">Preferred Date</div>
                    <div>{new Date(selectedBooking.preferredDate).toLocaleDateString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Created</div>
                    <div>{new Date(selectedBooking.createdAt).toLocaleDateString()}</div>
                  </div>
                </div>
              </div>
              
              {selectedBooking.assignedTo && (
                <div className="border-t pt-4">
                  <div className="flex items-center mb-2">
                    <User size={16} className="mr-2 text-gray-500" />
                    <span className="font-medium">Assigned To</span>
                  </div>
                  <div>{selectedBooking.assignedTo}</div>
                </div>
              )}
              
              <div className="border-t pt-4">
                <div className="flex items-center mb-2">
                  <MessagesSquare size={16} className="mr-2 text-gray-500" />
                  <span className="font-medium">Message</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-md text-sm">
                  {selectedBooking.message}
                </div>
              </div>
              
              {selectedBooking.status === 'pending' && (
                <div className="flex justify-between border-t pt-4">
                  <Button variant="outline" onClick={() => handleStatusChange(selectedBooking.id, 'cancelled')}>
                    <X size={16} className="mr-1" /> Cancel
                  </Button>
                  <Button onClick={() => {
                    setIsDetailsOpen(false);
                    handleAssign(selectedBooking);
                  }}>
                    <Check size={16} className="mr-1" /> Assign
                  </Button>
                </div>
              )}
              
              {selectedBooking.status === 'confirmed' && (
                <div className="flex justify-between border-t pt-4">
                  <Button variant="outline" onClick={() => handleStatusChange(selectedBooking.id, 'cancelled')}>
                    <X size={16} className="mr-1" /> Cancel
                  </Button>
                  <Button onClick={() => handleStatusChange(selectedBooking.id, 'in_progress')}>
                    <Clock size={16} className="mr-1" /> Mark In Progress
                  </Button>
                </div>
              )}
              
              {selectedBooking.status === 'in_progress' && (
                <div className="flex justify-end border-t pt-4">
                  <Button onClick={() => handleStatusChange(selectedBooking.id, 'completed')}>
                    <Check size={16} className="mr-1" /> Mark Complete
                  </Button>
                </div>
              )}
            </div>
          )}
          
          <DialogFooter>
            <Button 
              variant="outline"
              onClick={() => setIsDetailsOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Assign Consultant Dialog */}
      <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Assign Consultant</DialogTitle>
          </DialogHeader>
          
          {selectedBooking && (
            <Form {...assignForm}>
              <form onSubmit={assignForm.handleSubmit(handleAssignSubmit)} className="space-y-4">
                <div className="space-y-1">
                  <div className="text-sm font-medium">Service:</div>
                  <div>{selectedBooking.serviceName} ({selectedBooking.serviceCategory})</div>
                </div>
                
                <div className="space-y-1">
                  <div className="text-sm font-medium">Client:</div>
                  <div>{selectedBooking.clientName} - {selectedBooking.clientCompany}</div>
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
                    onClick={() => setIsAssignDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    Confirm Assignment
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          )}
        </DialogContent>
      </Dialog>

      {/* Add New Service Dialog */}
      <Dialog open={isNewServiceDialogOpen} onOpenChange={setIsNewServiceDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Service</DialogTitle>
          </DialogHeader>
          
          <Form {...newServiceForm}>
            <form onSubmit={newServiceForm.handleSubmit(handleNewServiceSubmit)} className="space-y-4">
              <FormField
                control={newServiceForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Brand Positioning" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={newServiceForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe the service in detail..." 
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
                  control={newServiceForm.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Strategy">Strategy</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                          <SelectItem value="Sales">Sales</SelectItem>
                          <SelectItem value="Analysis">Analysis</SelectItem>
                          <SelectItem value="Curation">Curation</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={newServiceForm.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., $1,200+" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={newServiceForm.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 2-3 weeks" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={newServiceForm.control}
                  name="targetUserType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target User Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select user type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="brand">Brand</SelectItem>
                          <SelectItem value="buyer">Buyer</SelectItem>
                          <SelectItem value="both">Both</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={newServiceForm.control}
                name="features"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Features</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter each feature on a separate line" 
                        className="min-h-[100px]" 
                        {...field} 
                      />
                    </FormControl>
                    <p className="text-xs text-gray-500 mt-1">Enter one feature per line</p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter className="flex justify-between items-center mt-6">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsNewServiceDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Create Service
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminAdditionalServices;

