
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Check, ArrowRight, Search, Filter } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  category: string;
  features: string[];
}

interface BookingFormValues {
  name: string;
  email: string;
  companyName: string;
  serviceType: string;
  date: string;
  message: string;
}

const brandServices: Service[] = [
  {
    id: "1",
    name: "Market Entry Strategy",
    description: "Comprehensive analysis and strategic planning for brands looking to enter new geographic markets.",
    price: "$1,500+",
    duration: "2-4 weeks",
    category: "Strategy",
    features: [
      "Market analysis and opportunity assessment",
      "Competitive landscape mapping",
      "Distribution channel strategy",
      "Pricing and positioning recommendations"
    ]
  },
  {
    id: "2",
    name: "Brand Positioning",
    description: "Refine your brand identity and messaging to resonate with your target audience and stand out in the market.",
    price: "$1,200+",
    duration: "2-3 weeks",
    category: "Marketing",
    features: [
      "Brand identity assessment",
      "Target audience analysis",
      "Competitive differentiation strategy",
      "Messaging framework development"
    ]
  },
  {
    id: "3",
    name: "Sales Optimization",
    description: "Enhance your sales approach, materials, and processes to increase buyer engagement and conversion.",
    price: "$950+",
    duration: "1-2 weeks",
    category: "Sales",
    features: [
      "Sales funnel analysis",
      "Pitch deck optimization",
      "Buyer engagement strategies",
      "Follow-up process development"
    ]
  }
];

const BrandAdditionalServices = () => {
  const { toast } = useToast();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("available");
  
  const bookingForm = useForm<BookingFormValues>({
    defaultValues: {
      name: "",
      email: "",
      companyName: "",
      serviceType: "",
      date: "",
      message: ""
    }
  });

  // Filter services based on search term and category
  const filteredServices = brandServices.filter(service => {
    const matchesSearch = !searchTerm || 
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || service.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const openBookingDialog = (service: Service) => {
    setSelectedService(service);
    bookingForm.setValue("serviceType", service.name);
    setIsBookingOpen(true);
  };

  const handleBookingSubmit = (data: BookingFormValues) => {
    console.log("Booking submitted:", data);
    
    toast({
      title: "Booking Request Submitted",
      description: "We'll contact you shortly to confirm your booking."
    });
    
    setIsBookingOpen(false);
    bookingForm.reset();
  };

  const mockBookings = [
    {
      id: "b1",
      service: "Market Entry Strategy",
      date: "2025-05-20",
      status: "Scheduled",
      consultant: "Sarah Johnson"
    },
    {
      id: "b2",
      service: "Brand Positioning",
      date: "2025-06-02",
      status: "Pending",
      consultant: "Awaiting assignment"
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-4xl md:text-5xl uppercase font-light mb-6">ADDITIONAL SERVICES</h1>
      
      <Tabs defaultValue="available" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="border-t border-gray-200 mb-6">
          <TabsList className="border-b border-gray-200 w-full flex justify-start overflow-x-auto pb-0 mb-6 bg-transparent">
            <TabsTrigger 
              value="available" 
              className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2 data-[state=active]:shadow-none"
            >
              Available Services
            </TabsTrigger>
            <TabsTrigger 
              value="bookings" 
              className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2 data-[state=active]:shadow-none"
            >
              My Bookings
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="available" className="mt-0 space-y-6">
          <Card className="border border-gray-200 shadow-none rounded-none">
            <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <CardTitle className="text-base font-light text-gray-900">
                  Available Services
                </CardTitle>
                <div className="flex flex-wrap gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search services..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-9 text-xs rounded-none border-gray-200 w-[200px]"
                    />
                  </div>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="h-9 text-xs rounded-none border-gray-200 w-[150px]">
                      <div className="flex items-center">
                        <Filter className="h-3.5 w-3.5 mr-2 text-gray-500" strokeWidth={1} />
                        <SelectValue placeholder="Filter category" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Strategy">Strategy</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Sales">Sales</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredServices.map((service) => (
                  <div key={service.id} className="bg-white p-6 rounded-none border border-gray-100 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="text-xl font-light">{service.name}</h2>
                      <div className={`px-2 py-0.5 text-xs rounded-sm ${
                        service.category === "Strategy" ? "bg-accent-mint" : 
                        service.category === "Marketing" ? "bg-soft-orange" : 
                        "bg-soft-blue"
                      } text-gray-800`}>
                        {service.category}
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4 text-sm">
                      {service.description}
                    </p>
                    <ul className="space-y-2 mb-6 flex-1">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-4 w-4 text-gray-500 mr-2 flex-shrink-0 mt-0.5" strokeWidth={1} />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-4 border-t border-gray-100">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-medium">{service.price}</span>
                        <span className="text-sm text-gray-500">{service.duration}</span>
                      </div>
                      <Button 
                        className="w-full bg-black text-white hover:bg-gray-800 rounded-none text-xs font-light" 
                        onClick={() => openBookingDialog(service)}
                      >
                        Book Consultation <Calendar className="ml-2 h-4 w-4" strokeWidth={1} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookings" className="mt-0 space-y-6">
          <Card className="border border-gray-200 shadow-none rounded-none">
            <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
              <div className="flex justify-between items-center">
                <CardTitle className="text-base font-light text-gray-900">
                  My Service Bookings
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/50">
                      <th className="text-left font-light py-3 px-4">Service</th>
                      <th className="text-left font-light py-3 px-4">Date</th>
                      <th className="text-left font-light py-3 px-4">Status</th>
                      <th className="text-left font-light py-3 px-4">Consultant</th>
                      <th className="text-right font-light py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockBookings.map((booking) => (
                      <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">{booking.service}</td>
                        <td className="py-3 px-4">{booking.date}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 text-xs ${
                            booking.status === "Scheduled" 
                              ? "bg-accent-mint text-gray-800" 
                              : "bg-soft-orange text-gray-800"
                          } rounded-sm`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">{booking.consultant}</td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="outline" size="sm" className="h-8 rounded-none border-gray-200 text-xs">
                            View Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                    {mockBookings.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-gray-500">
                          No bookings found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {activeTab === "available" && (
        <div className="mt-8 text-center">
          <h3 className="text-xl font-light mb-4">Looking for something specific?</h3>
          <p className="mb-6 max-w-2xl mx-auto text-gray-600 text-sm">
            If you don't see a service that meets your needs, contact us for a custom solution tailored to your brand.
          </p>
          <Button variant="outline" className="border-black text-black hover:bg-gray-100 text-xs font-light rounded-none">
            Contact Us For Custom Services <ArrowRight className="ml-2 h-4 w-4" strokeWidth={1} />
          </Button>
        </div>
      )}

      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="rounded-none sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-light">Book {selectedService?.name}</DialogTitle>
          </DialogHeader>
          
          <Form {...bookingForm}>
            <form onSubmit={bookingForm.handleSubmit(handleBookingSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={bookingForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-light">Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" required {...field} className="rounded-none border-gray-200" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={bookingForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-light">Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Your email" required {...field} className="rounded-none border-gray-200" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={bookingForm.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-light">Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your company" required {...field} className="rounded-none border-gray-200" />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={bookingForm.control}
                name="serviceType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-light">Service Type</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="rounded-none border-gray-200">
                          <SelectValue placeholder="Select service" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-none">
                        {brandServices.map((service) => (
                          <SelectItem key={service.id} value={service.name}>
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
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-light">Preferred Date</FormLabel>
                    <FormControl>
                      <Input type="date" required {...field} className="rounded-none border-gray-200" />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={bookingForm.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-light">Additional Information</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Please share any specific requirements or questions" 
                        className="min-h-[100px] rounded-none border-gray-200" 
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
                  onClick={() => setIsBookingOpen(false)}
                  className="rounded-none border-gray-200 text-xs font-light"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="rounded-none bg-black text-white hover:bg-gray-800 text-xs font-light"
                >
                  Submit Booking Request
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BrandAdditionalServices;
