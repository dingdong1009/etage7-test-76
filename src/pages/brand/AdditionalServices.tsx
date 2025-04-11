
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-medium mb-2">Additional Services</h1>
        <p className="text-gray-600">
          Enhance your brand's success with our expert consulting services
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {brandServices.map((service) => (
          <div key={service.id} className="bg-white p-6 rounded-md shadow-sm border border-gray-100 flex flex-col">
            <h2 className="text-xl font-medium mb-2">{service.name}</h2>
            <p className="text-gray-600 mb-4">
              {service.description}
            </p>
            <ul className="space-y-2 mb-6 flex-1">
              {service.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">{service.price}</span>
                <span className="text-sm text-gray-500">{service.duration}</span>
              </div>
              <Button 
                className="w-full" 
                onClick={() => openBookingDialog(service)}
              >
                Book Consultation <Calendar className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Book {selectedService?.name}</DialogTitle>
          </DialogHeader>
          
          <Form {...bookingForm}>
            <form onSubmit={bookingForm.handleSubmit(handleBookingSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={bookingForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" required {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={bookingForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Your email" required {...field} />
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
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your company" required {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={bookingForm.control}
                name="serviceType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Type</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select service" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
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
                    <FormLabel>Preferred Date</FormLabel>
                    <FormControl>
                      <Input type="date" required {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={bookingForm.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Information</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Please share any specific requirements or questions" 
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
                  onClick={() => setIsBookingOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
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
