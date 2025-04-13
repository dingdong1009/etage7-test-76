
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, FileText, ArrowRight, Search, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Import components
import ServiceStats from "@/components/admin/services/ServiceStats";
import BookingTable from "@/components/admin/services/BookingTable";
import BookingDetailsDialog from "@/components/admin/services/BookingDetailsDialog";
import AssignConsultantDialog from "@/components/admin/services/AssignConsultantDialog";
import NewServiceDialog from "@/components/admin/services/NewServiceDialog";
import { ServiceBooking, AssignmentData } from "@/types/services";
import type { NewServiceFormValues } from "@/components/admin/services/NewServiceDialog";

const AdminAdditionalServices = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("bookings");
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [isNewServiceDialogOpen, setIsNewServiceDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<ServiceBooking | null>(null);
  const [bookingFilter, setBookingFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
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
  
  // Filter bookings based on active filter and search term
  const filteredBookings = mockBookings
    .filter(booking => bookingFilter === "all" ? true : booking.status === bookingFilter)
    .filter(booking => {
      if (!searchTerm) return true;
      const searchLower = searchTerm.toLowerCase();
      return (
        booking.clientName.toLowerCase().includes(searchLower) ||
        booking.clientCompany.toLowerCase().includes(searchLower) ||
        booking.serviceName.toLowerCase().includes(searchLower)
      );
    });
  
  const handleViewDetails = (booking: ServiceBooking) => {
    setSelectedBooking(booking);
    setIsDetailsOpen(true);
  };
  
  const handleAssign = (booking: ServiceBooking) => {
    setSelectedBooking(booking);
    setIsAssignDialogOpen(true);
  };
  
  const handleAssignSubmit = (data: AssignmentData) => {
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
    
    setIsNewServiceDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tighter uppercase mb-6">
        ADDITIONAL SERVICES
      </h1>
      
      <Tabs defaultValue="bookings" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-between items-center mb-6">
          <TabsList className="bg-transparent border-b border-gray-200 w-auto">
            <TabsTrigger 
              value="bookings" 
              className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2 data-[state=active]:shadow-none"
            >
              Bookings
            </TabsTrigger>
            <TabsTrigger 
              value="services" 
              className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2 data-[state=active]:shadow-none"
            >
              Services
            </TabsTrigger>
          </TabsList>
          
          {activeTab === "bookings" ? (
            <Button 
              className="bg-black text-white border-none hover:bg-gray-800 text-xs font-light rounded-none"
              onClick={() => setActiveTab("services")}
            >
              <PlusCircle className="w-4 h-4 mr-2" strokeWidth={1} />
              Manage Services
            </Button>
          ) : (
            <Button 
              className="bg-black text-white border-none hover:bg-gray-800 text-xs font-light rounded-none"
              onClick={handleAddNewService}
            >
              <PlusCircle className="w-4 h-4 mr-2" strokeWidth={1} />
              Add New Service
            </Button>
          )}
        </div>
        
        <TabsContent value="bookings" className="mt-0 space-y-6">
          <ServiceStats bookings={mockBookings} />
          
          <Card className="border border-gray-200 shadow-none rounded-none">
            <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <CardTitle className="text-base font-light text-gray-900">
                  Service Bookings
                </CardTitle>
                <div className="flex flex-wrap gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search bookings..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-9 text-xs rounded-none border-gray-200 w-[200px]"
                    />
                  </div>
                  <Select value={bookingFilter} onValueChange={setBookingFilter}>
                    <SelectTrigger className="h-9 text-xs rounded-none border-gray-200 w-[150px]">
                      <div className="flex items-center">
                        <Filter className="h-3.5 w-3.5 mr-2 text-gray-500" strokeWidth={1.5} />
                        <SelectValue placeholder="Filter status" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button 
                    variant="outline"
                    className="h-9 border-gray-200 hover:bg-gray-100 text-xs font-light rounded-none"
                  >
                    <FileText className="w-3.5 h-3.5 mr-2" strokeWidth={1.5} />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <BookingTable 
                bookings={filteredBookings} 
                onViewDetails={handleViewDetails} 
                onAssign={handleAssign} 
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="services" className="mt-0 space-y-6">
          <Card className="border border-gray-200 shadow-none rounded-none overflow-hidden">
            <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <CardTitle className="text-base font-light text-gray-900">
                  Available Services
                </CardTitle>
                <div className="flex flex-wrap gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search services..."
                      className="pl-10 h-9 text-xs rounded-none border-gray-200 w-[200px]"
                    />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="h-9 text-xs rounded-none border-gray-200 w-[150px]">
                      <div className="flex items-center">
                        <Filter className="h-3.5 w-3.5 mr-2 text-gray-500" strokeWidth={1.5} />
                        <SelectValue placeholder="Filter category" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="strategy">Strategy</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="analysis">Analysis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <p className="text-sm text-gray-500">
                  Manage the services available to brands and buyers. Add, edit or remove services as needed.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Sample service cards - these would be generated from actual data */}
                  <Card className="border border-gray-200 shadow-none rounded-none">
                    <CardHeader className="p-4">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-base font-medium">Market Entry Strategy</CardTitle>
                        <div className="px-2 py-0.5 text-xs bg-accent-mint text-gray-800 rounded-sm">Strategy</div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-gray-600 mb-4">Comprehensive analysis and strategic planning for brands looking to enter new geographic markets.</p>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">$1,500+</span>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-none">
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-none">
                            <PlusCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border border-gray-200 shadow-none rounded-none">
                    <CardHeader className="p-4">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-base font-medium">Brand Positioning</CardTitle>
                        <div className="px-2 py-0.5 text-xs bg-soft-orange text-gray-800 rounded-sm">Marketing</div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-gray-600 mb-4">Refine your brand identity and messaging to resonate with your target audience and stand out in the market.</p>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">$1,200+</span>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-none">
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-none">
                            <PlusCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border border-gray-200 shadow-none rounded-none">
                    <CardHeader className="p-4">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-base font-medium">Sales Optimization</CardTitle>
                        <div className="px-2 py-0.5 text-xs bg-soft-blue text-gray-800 rounded-sm">Sales</div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-gray-600 mb-4">Enhance your sales approach, materials, and processes to increase buyer engagement and conversion.</p>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">$950+</span>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-none">
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-none">
                            <PlusCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 text-center">
        <h3 className="text-xl font-light mb-4">Need help with additional services?</h3>
        <p className="mb-6 max-w-2xl mx-auto text-gray-600 text-sm font-light">
          Check out our comprehensive guides and documentation to learn more about managing additional services.
        </p>
        <Button variant="outline" className="border-black text-black hover:bg-gray-100 text-xs font-light rounded-none">
          View Service Management Guides <ArrowRight className="ml-2 h-4 w-4" strokeWidth={1} />
        </Button>
      </div>
      
      {/* Dialogs */}
      <BookingDetailsDialog 
        isOpen={isDetailsOpen}
        setIsOpen={setIsDetailsOpen}
        booking={selectedBooking}
        onAssign={handleAssign}
        onStatusChange={handleStatusChange}
      />
      
      <AssignConsultantDialog 
        isOpen={isAssignDialogOpen}
        setIsOpen={setIsAssignDialogOpen}
        booking={selectedBooking}
        onAssign={handleAssignSubmit}
      />

      <NewServiceDialog 
        isOpen={isNewServiceDialogOpen}
        setIsOpen={setIsNewServiceDialogOpen}
        onSubmit={handleNewServiceSubmit}
      />
    </div>
  );
};

export default AdminAdditionalServices;
