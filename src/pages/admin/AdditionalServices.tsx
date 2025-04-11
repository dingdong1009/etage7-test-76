
import { useState } from "react";
import { Plus, Calendar, Search, Filter, Check, X, Edit2, Trash2, Info, Clock } from "lucide-react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

// Types
type ServiceStatus = "scheduled" | "completed" | "canceled" | "pending";

interface ServiceProvider {
  id: number;
  name: string;
  specialization: string;
  availability: string;
  rating: number;
}

interface Service {
  id: number;
  name: string;
  description: string;
  price: string;
  duration: string;
  category: string;
  active: boolean;
}

interface ServiceBooking {
  id: number;
  clientName: string;
  clientType: "brand" | "buyer";
  clientId: number;
  serviceId: number;
  serviceName: string;
  providerId: number | null;
  providerName: string | null;
  date: string;
  time: string;
  status: ServiceStatus;
  notes: string;
}

// Utility function to format the date for display
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Get status badge color
const getStatusBadge = (status: ServiceStatus) => {
  switch(status) {
    case "scheduled":
      return "bg-blue-100 text-blue-800";
    case "completed":
      return "bg-green-100 text-green-800";
    case "canceled":
      return "bg-red-100 text-red-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const AdditionalServices = () => {
  // State management
  const [activeTab, setActiveTab] = useState<string>("services");
  const [serviceDialog, setServiceDialog] = useState<boolean>(false);
  const [bookingDialog, setBookingDialog] = useState<boolean>(false);
  const [providerDialog, setProviderDialog] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentItemId, setCurrentItemId] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // Mock data
  const [services, setServices] = useState<Service[]>([
    { id: 1, name: "Style Consultation", description: "One-on-one consultation with a fashion expert", price: "$250/hour", duration: "1 hour", category: "Styling", active: true },
    { id: 2, name: "Collection Review", description: "Review of your brand's collection", price: "$500", duration: "3 hours", category: "Consultation", active: true },
    { id: 3, name: "Market Analysis", description: "Detailed analysis of current market trends", price: "$1500", duration: "1 week", category: "Analysis", active: true },
    { id: 4, name: "Visual Merchandising", description: "Expert guidance on store layout and displays", price: "$800", duration: "4 hours", category: "Retail", active: false },
    { id: 5, name: "Social Media Strategy", description: "Develop a fashion-focused social media plan", price: "$1200", duration: "2 days", category: "Marketing", active: true },
  ]);

  const [bookings, setBookings] = useState<ServiceBooking[]>([
    { id: 1, clientName: "LVMH", clientType: "brand", clientId: 101, serviceId: 1, serviceName: "Style Consultation", providerId: 1, providerName: "Emma Thompson", date: "2024-05-20", time: "10:00", status: "scheduled", notes: "Initial consultation for summer collection" },
    { id: 2, clientName: "Nordstrom", clientType: "buyer", clientId: 201, serviceId: 3, serviceName: "Market Analysis", providerId: 3, providerName: "James Wilson", date: "2024-05-15", time: "14:00", status: "completed", notes: "Follow-up on previous analysis" },
    { id: 3, clientName: "Zara", clientType: "brand", clientId: 102, serviceId: 2, serviceName: "Collection Review", providerId: 2, providerName: "Sophie Garcia", date: "2024-05-25", time: "11:30", status: "pending", notes: "Review of fall collection" },
    { id: 4, clientName: "Selfridges", clientType: "buyer", clientId: 202, serviceId: 5, serviceName: "Social Media Strategy", providerId: 1, providerName: "Emma Thompson", date: "2024-05-18", time: "09:00", status: "canceled", notes: "Client requested cancellation" },
    { id: 5, clientName: "H&M", clientType: "brand", clientId: 103, serviceId: 4, serviceName: "Visual Merchandising", providerId: 4, providerName: "Michael Chen", date: "2024-06-01", time: "13:00", status: "scheduled", notes: "Store renovation project" }
  ]);

  const [providers, setProviders] = useState<ServiceProvider[]>([
    { id: 1, name: "Emma Thompson", specialization: "Styling, Social Media", availability: "Mon-Thu", rating: 4.9 },
    { id: 2, name: "Sophie Garcia", specialization: "Collection Reviews, Design", availability: "Tue-Fri", rating: 4.7 },
    { id: 3, name: "James Wilson", specialization: "Market Analysis, Trends", availability: "Mon-Wed", rating: 4.8 },
    { id: 4, name: "Michael Chen", specialization: "Visual Merchandising, Retail", availability: "Wed-Sat", rating: 4.6 }
  ]);

  // Form for services
  const serviceForm = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      duration: "",
      category: "Styling",
      active: true
    }
  });

  // Form for bookings
  const bookingForm = useForm({
    defaultValues: {
      clientName: "",
      clientType: "brand",
      clientId: 0,
      serviceId: 0,
      providerId: 0,
      date: "",
      time: "",
      status: "pending",
      notes: ""
    }
  });

  // Form for providers
  const providerForm = useForm({
    defaultValues: {
      name: "",
      specialization: "",
      availability: "",
      rating: 5.0
    }
  });

  // Handlers for services
  const handleAddService = () => {
    serviceForm.reset({
      name: "",
      description: "",
      price: "",
      duration: "",
      category: "Styling",
      active: true
    });
    setIsEditing(false);
    setCurrentItemId(null);
    setServiceDialog(true);
  };

  const handleEditService = (service: Service) => {
    serviceForm.reset({
      name: service.name,
      description: service.description,
      price: service.price,
      duration: service.duration,
      category: service.category,
      active: service.active
    });
    setIsEditing(true);
    setCurrentItemId(service.id);
    setServiceDialog(true);
  };

  const handleDeleteService = (id: number) => {
    setServices(services.filter(service => service.id !== id));
    toast({
      title: "Success",
      description: "Service deleted successfully"
    });
  };

  const handleSubmitService = (data) => {
    if (isEditing && currentItemId) {
      setServices(services.map(service => 
        service.id === currentItemId ? { ...service, ...data } : service
      ));
      toast({
        title: "Success",
        description: "Service updated successfully"
      });
    } else {
      const newService = {
        id: services.length > 0 ? Math.max(...services.map(s => s.id)) + 1 : 1,
        ...data
      };
      setServices([...services, newService]);
      toast({
        title: "Success",
        description: "Service added successfully"
      });
    }
    setServiceDialog(false);
  };

  // Handlers for bookings
  const handleAddBooking = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedDate = tomorrow.toISOString().split('T')[0];

    bookingForm.reset({
      clientName: "",
      clientType: "brand",
      clientId: 0,
      serviceId: services[0]?.id || 0,
      providerId: providers[0]?.id || 0,
      date: formattedDate,
      time: "10:00",
      status: "pending",
      notes: ""
    });
    setIsEditing(false);
    setCurrentItemId(null);
    setBookingDialog(true);
  };

  const handleEditBooking = (booking: ServiceBooking) => {
    bookingForm.reset({
      clientName: booking.clientName,
      clientType: booking.clientType,
      clientId: booking.clientId,
      serviceId: booking.serviceId,
      providerId: booking.providerId || 0,
      date: booking.date,
      time: booking.time,
      status: booking.status,
      notes: booking.notes
    });
    setIsEditing(true);
    setCurrentItemId(booking.id);
    setBookingDialog(true);
  };

  const handleDeleteBooking = (id: number) => {
    setBookings(bookings.filter(booking => booking.id !== id));
    toast({
      title: "Success",
      description: "Booking deleted successfully"
    });
  };

  const handleSubmitBooking = (data) => {
    // Find selected service name
    const selectedService = services.find(s => s.id === Number(data.serviceId));
    const selectedProvider = providers.find(p => p.id === Number(data.providerId));

    if (isEditing && currentItemId) {
      setBookings(bookings.map(booking => 
        booking.id === currentItemId ? { 
          ...booking, 
          ...data,
          serviceName: selectedService?.name || "Unknown",
          providerName: selectedProvider?.name || null
        } : booking
      ));
      toast({
        title: "Success",
        description: "Booking updated successfully"
      });
    } else {
      const newBooking = {
        id: bookings.length > 0 ? Math.max(...bookings.map(b => b.id)) + 1 : 1,
        ...data,
        serviceName: selectedService?.name || "Unknown",
        providerName: selectedProvider?.name || null
      };
      setBookings([...bookings, newBooking]);
      toast({
        title: "Success",
        description: "Booking added successfully"
      });
    }
    setBookingDialog(false);
  };

  // Handlers for providers
  const handleAddProvider = () => {
    providerForm.reset({
      name: "",
      specialization: "",
      availability: "",
      rating: 5.0
    });
    setIsEditing(false);
    setCurrentItemId(null);
    setProviderDialog(true);
  };

  const handleEditProvider = (provider: ServiceProvider) => {
    providerForm.reset({
      name: provider.name,
      specialization: provider.specialization,
      availability: provider.availability,
      rating: provider.rating
    });
    setIsEditing(true);
    setCurrentItemId(provider.id);
    setProviderDialog(true);
  };

  const handleDeleteProvider = (id: number) => {
    setProviders(providers.filter(provider => provider.id !== id));
    toast({
      title: "Success",
      description: "Provider deleted successfully"
    });
  };

  const handleSubmitProvider = (data) => {
    if (isEditing && currentItemId) {
      setProviders(providers.map(provider => 
        provider.id === currentItemId ? { ...provider, ...data } : provider
      ));
      toast({
        title: "Success",
        description: "Provider updated successfully"
      });
    } else {
      const newProvider = {
        id: providers.length > 0 ? Math.max(...providers.map(p => p.id)) + 1 : 1,
        ...data
      };
      setProviders([...providers, newProvider]);
      toast({
        title: "Success",
        description: "Provider added successfully"
      });
    }
    setProviderDialog(false);
  };

  // Filtered bookings based on status and search
  const filteredBookings = bookings.filter(booking => {
    const matchesStatus = filterStatus === "all" || booking.status === filterStatus;
    const matchesSearch = booking.clientName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          booking.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (booking.providerName && booking.providerName.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-4xl md:text-6xl uppercase font-thin mb-6">Additional Services</h1>
      
      <Tabs defaultValue="bookings" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="services">Available Services</TabsTrigger>
          <TabsTrigger value="providers">Service Providers</TabsTrigger>
        </TabsList>
        
        {/* Bookings Tab */}
        <TabsContent value="bookings" className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
            <div className="flex flex-col md:flex-row gap-2 md:items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Search bookings..." 
                  className="pl-10 w-full md:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="canceled">Canceled</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              className="bg-black text-white border-none"
              onClick={handleAddBooking}
            >
              <Plus className="w-4 h-4 mr-2" />
              New Booking
            </Button>
          </div>
          
          <div className="rounded-none border border-gray-200 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-medium">Client</TableHead>
                  <TableHead className="font-medium">Service</TableHead>
                  <TableHead className="font-medium">Provider</TableHead>
                  <TableHead className="font-medium">Date & Time</TableHead>
                  <TableHead className="font-medium w-28 text-center">Status</TableHead>
                  <TableHead className="font-medium text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      No bookings found. Add a new booking to get started.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredBookings.map((booking) => (
                    <TableRow key={booking.id} className="border-t border-gray-200">
                      <TableCell>
                        <div className="font-medium">{booking.clientName}</div>
                        <div className="text-sm text-gray-500">{booking.clientType === "brand" ? "Brand" : "Buyer"}</div>
                      </TableCell>
                      <TableCell>{booking.serviceName}</TableCell>
                      <TableCell>{booking.providerName || "-"}</TableCell>
                      <TableCell>
                        <div>{formatDate(booking.date)}</div>
                        <div className="text-sm text-gray-500">{booking.time}</div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusBadge(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </div>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                className="border-gray-200 h-8 w-8"
                                onClick={() => handleEditBooking(booking)}
                              >
                                <Edit2 className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Edit Booking</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                className="border-gray-200 text-red-600 hover:text-red-700 h-8 w-8"
                                onClick={() => handleDeleteBooking(booking.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Delete Booking</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        {/* Services Tab */}
        <TabsContent value="services" className="space-y-4">
          <div className="flex justify-end mb-4">
            <Button 
              className="bg-black text-white border-none"
              onClick={handleAddService}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Service
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => (
              <Card key={service.id} className="overflow-hidden border border-gray-200">
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold">{service.name}</h3>
                      <div className={`px-2 py-1 text-xs rounded-sm ${service.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {service.active ? 'Active' : 'Inactive'}
                      </div>
                    </div>
                    
                    <div className="text-2xl font-bold mt-2">{service.price}</div>
                    
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{service.duration}</span>
                    </div>
                    
                    <p className="mt-4 text-gray-600">{service.description}</p>
                    
                    <div className="mt-3">
                      <Badge variant="secondary" className="bg-gray-100 hover:bg-gray-200 text-gray-800">
                        {service.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-gray-300"
                      onClick={() => handleEditService(service)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="outline"
                      size="sm"
                      className="border-gray-300 text-red-600 hover:text-red-700"
                      onClick={() => handleDeleteService(service.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {services.length === 0 && (
              <div className="col-span-3 text-center py-12 border border-dashed border-gray-300 rounded-lg">
                <p className="text-gray-500">No services found. Add a new service to get started.</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        {/* Providers Tab */}
        <TabsContent value="providers" className="space-y-4">
          <div className="flex justify-end mb-4">
            <Button 
              className="bg-black text-white border-none"
              onClick={handleAddProvider}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Provider
            </Button>
          </div>

          <div className="rounded-none border border-gray-200 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-medium">Name</TableHead>
                  <TableHead className="font-medium">Specialization</TableHead>
                  <TableHead className="font-medium">Availability</TableHead>
                  <TableHead className="font-medium">Rating</TableHead>
                  <TableHead className="font-medium text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {providers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                      No service providers found. Add a new provider to get started.
                    </TableCell>
                  </TableRow>
                ) : (
                  providers.map((provider) => (
                    <TableRow key={provider.id} className="border-t border-gray-200">
                      <TableCell className="font-medium">{provider.name}</TableCell>
                      <TableCell>{provider.specialization}</TableCell>
                      <TableCell>{provider.availability}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {provider.rating.toFixed(1)}
                          <span className="ml-1 text-yellow-500">★</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="border-gray-200 h-8 w-8"
                          onClick={() => handleEditProvider(provider)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="border-gray-200 text-red-600 hover:text-red-700 h-8 w-8"
                          onClick={() => handleDeleteProvider(provider.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add/Edit Service Dialog */}
      <Dialog 
        open={serviceDialog} 
        onOpenChange={setServiceDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Edit Service" : "Add New Service"}
            </DialogTitle>
          </DialogHeader>
          <Form {...serviceForm}>
            <form onSubmit={serviceForm.handleSubmit(handleSubmitService)} className="space-y-4">
              <FormField
                control={serviceForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Style Consultation" {...field} />
                    </FormControl>
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
                      <Textarea placeholder="Describe the service..." className="min-h-[80px]" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <div className="flex gap-4">
                <FormField
                  control={serviceForm.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. $250/hour" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={serviceForm.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Duration</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 1 hour" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={serviceForm.control}
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
                        <SelectItem value="Styling">Styling</SelectItem>
                        <SelectItem value="Consultation">Consultation</SelectItem>
                        <SelectItem value="Analysis">Analysis</SelectItem>
                        <SelectItem value="Retail">Retail</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={serviceForm.control}
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

              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setServiceDialog(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {isEditing ? "Save Changes" : "Add Service"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Booking Dialog */}
      <Dialog 
        open={bookingDialog} 
        onOpenChange={setBookingDialog}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Edit Booking" : "New Service Booking"}
            </DialogTitle>
          </DialogHeader>
          <Form {...bookingForm}>
            <form onSubmit={bookingForm.handleSubmit(handleSubmitBooking)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={bookingForm.control}
                  name="clientName"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Client Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Client name" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={bookingForm.control}
                  name="clientType"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Client Type</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-x-4"
                        >
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="brand" />
                            </FormControl>
                            <FormLabel className="font-normal">Brand</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="buyer" />
                            </FormControl>
                            <FormLabel className="font-normal">Buyer</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={bookingForm.control}
                  name="clientId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client ID</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value) || 0)} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={bookingForm.control}
                  name="serviceId"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Service</FormLabel>
                      <Select 
                        onValueChange={(value) => field.onChange(parseInt(value))} 
                        defaultValue={field.value.toString()}
                        value={field.value.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {services.filter(s => s.active).map((service) => (
                            <SelectItem key={service.id} value={service.id.toString()}>
                              {service.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={bookingForm.control}
                  name="providerId"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Provider</FormLabel>
                      <Select 
                        onValueChange={(value) => field.onChange(parseInt(value))} 
                        defaultValue={field.value.toString()}
                        value={field.value.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select provider" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {providers.map((provider) => (
                            <SelectItem key={provider.id} value={provider.id.toString()}>
                              {provider.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={bookingForm.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={bookingForm.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={bookingForm.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="scheduled">Scheduled</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="canceled">Canceled</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={bookingForm.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Additional notes..." {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setBookingDialog(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {isEditing ? "Update Booking" : "Create Booking"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Provider Dialog */}
      <Dialog 
        open={providerDialog} 
        onOpenChange={setProviderDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Edit Provider" : "Add New Provider"}
            </DialogTitle>
          </DialogHeader>
          <Form {...providerForm}>
            <form onSubmit={providerForm.handleSubmit(handleSubmitProvider)} className="space-y-4">
              <FormField
                control={providerForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Provider name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={providerForm.control}
                name="specialization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specializations</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Styling, Marketing" {...field} />
                    </FormControl>
                    <FormDescription>
                      Separate multiple specializations with commas
                    </FormDescription>
                  </FormItem>
                )}
              />
              
              <FormField
                control={providerForm.control}
                name="availability"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Availability</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Mon-Fri" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={providerForm.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating (1-5)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="1" 
                        max="5" 
                        step="0.1" 
                        {...field} 
                        onChange={e => field.onChange(parseFloat(e.target.value) || 5)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setProviderDialog(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {isEditing ? "Save Changes" : "Add Provider"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdditionalServices;

