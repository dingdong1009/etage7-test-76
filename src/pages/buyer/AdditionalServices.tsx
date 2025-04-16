import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Check, ArrowRight } from "lucide-react";
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

const buyerServices: Service[] = [
  {
    id: "4",
    name: "Trend Forecasting",
    description: "Stay ahead of market trends with our detailed seasonal forecasts and consumer behavior analysis.",
    price: "$800+",
    duration: "1 week",
    category: "Analysis",
    features: [
      "Seasonal trend predictions",
      "Consumer behavior insights",
      "Category performance analysis",
      "Emerging brands spotlight"
    ]
  },
  {
    id: "5",
    name: "Curated Brand Discovery",
    description: "Personalized brand scouting tailored to your store's unique aesthetic, customer base, and price points.",
    price: "$1,100+",
    duration: "2 weeks",
    category: "Curation",
    features: [
      "Personalized brand matching",
      "Collection preview access",
      "Introduction facilitation",
      "Assortment planning support"
    ]
  },
  {
    id: "6",
    name: "Buying Strategy",
    description: "Optimize your inventory planning, budget allocation, and merchandise mix for maximum ROI.",
    price: "$1,300+",
    duration: "2-3 weeks",
    category: "Strategy",
    features: [
      "Budget allocation optimization",
      "Category performance analysis",
      "Inventory planning support",
      "Markdown strategy development"
    ]
  }
];

const BuyerAdditionalServices = () => {
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
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-black text-white py-24 px-4 -mx-4 md:-mx-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-5xl uppercase font-light mb-6">
            ADDITIONAL<br/>
            <span className="font-normal">SERVICES</span>
          </h1>
          <p className="max-w-2xl text-lg font-light mb-8">
            Specialized consulting services to enhance your buying strategy and store curation
          </p>
          <Button className="bg-white text-black border-0 hover:bg-gray-100">
            EXPLORE SERVICES <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-16">
        <div>
          <h2 className="text-2xl md:text-4xl uppercase font-light mb-12">
            OUR <span className="font-normal">CONSULTING SERVICES</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {buyerServices.map((service) => (
              <div 
                key={service.id} 
                className="bg-white p-6 md:p-8 border border-gray-200 hover:shadow-md transition-shadow flex flex-col group"
              >
                <h3 className="text-xl font-normal mb-3">{service.name}</h3>
                <p className="text-gray-600 mb-6 font-light">
                  {service.description}
                </p>
                <ul className="space-y-3 mb-8 flex-1">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-black mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm font-light">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-medium">{service.price}</span>
                    <span className="text-sm text-gray-500 font-light">{service.duration}</span>
                  </div>
                  <Button 
                    className="w-full bg-black text-white hover:bg-gray-800" 
                    onClick={() => openBookingDialog(service)}
                  >
                    Book Consultation <Calendar className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-16 bg-gray-50 -mx-4 md:-mx-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl uppercase font-light mb-6">
            NEED <span className="font-normal">ASSISTANCE?</span>
          </h2>
          <p className="max-w-2xl mx-auto mb-8 font-light text-gray-600">
            Our team of fashion industry experts is here to help you find the right services
            for your specific needs.
          </p>
          <Button className="bg-black text-white hover:bg-gray-800">
            CONTACT US <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

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
                        <Input placeholder="Your name" required {...field} className="focus:ring-0 focus:border-black" />
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
                        <Input type="email" placeholder="Your email" required {...field} className="focus:ring-0 focus:border-black" />
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
                    <FormLabel>Store/Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your store or company" required {...field} className="focus:ring-0 focus:border-black" />
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
                        <SelectTrigger className="focus:ring-0 focus:border-black">
                          <SelectValue placeholder="Select service" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {buyerServices.map((service) => (
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
                      <Input type="date" required {...field} className="focus:ring-0 focus:border-black" />
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
                        className="min-h-[100px] focus:ring-0 focus:border-black" 
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
                  className="border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-black text-white hover:bg-gray-800">
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

export default BuyerAdditionalServices;
