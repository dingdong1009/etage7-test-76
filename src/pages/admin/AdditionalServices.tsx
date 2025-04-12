
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  
  // Filter bookings based on active tab
  const filteredBookings = activeTab === "all" 
    ? mockBookings 
    : mockBookings.filter(booking => booking.status === activeTab);
  
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
    <div className="animate-fade-in">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
        <h1 className="admin-title">Additional Services Management</h1>
        <div className="flex flex-wrap gap-4 mt-4 lg:mt-0">
          <Button 
            className="admin-button-primary"
            onClick={handleAddNewService}
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Add New Service
          </Button>
          <Button 
            variant="outline"
            className="admin-button-outline"
          >
            Export Bookings
          </Button>
        </div>
      </div>
      
      <ServiceStats bookings={mockBookings} />
      
      <Tabs defaultValue="all" className="w-full mt-8" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
          <TabsTrigger value="in_progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
        
        {["all", "pending", "confirmed", "in_progress", "completed", "cancelled"].map(tab => (
          <TabsContent key={tab} value={tab} className="mt-0">
            <BookingTable 
              bookings={filteredBookings} 
              onViewDetails={handleViewDetails} 
              onAssign={handleAssign} 
            />
          </TabsContent>
        ))}
      </Tabs>
      
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
