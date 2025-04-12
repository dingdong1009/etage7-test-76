
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
  id: number;
  name: string;
  description: string;
  price: string;
  duration: string;
  category: string;
}

interface BookingFormValues {
  name: string;
  email: string;
  companyName: string;
  serviceType: string;
  date: string;
  message: string;
}

const ServicesPage = () => {
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

  const brandServices = [
    {
      id: 1,
      name: "Market Entry Strategy",
      description: "Comprehensive analysis and strategic planning for brands looking to enter new geographic markets.",
      price: "$1,500+",
      duration: "2-4 weeks",
      category: "Strategy"
    },
    {
      id: 2,
      name: "Brand Positioning",
      description: "Refine your brand identity and messaging to resonate with your target audience and stand out in the market.",
      price: "$1,200+",
      duration: "2-3 weeks",
      category: "Marketing"
    },
    {
      id: 3,
      name: "Sales Optimization",
      description: "Enhance your sales approach, materials, and processes to increase buyer engagement and conversion.",
      price: "$950+",
      duration: "1-2 weeks",
      category: "Sales"
    }
  ];

  const buyerServices = [
    {
      id: 4,
      name: "Trend Forecasting",
      description: "Stay ahead of market trends with our detailed seasonal forecasts and consumer behavior analysis.",
      price: "$800+",
      duration: "1 week",
      category: "Analysis"
    },
    {
      id: 5,
      name: "Curated Brand Discovery",
      description: "Personalized brand scouting tailored to your store's unique aesthetic, customer base, and price points.",
      price: "$1,100+",
      duration: "2 weeks",
      category: "Curation"
    },
    {
      id: 6,
      name: "Buying Strategy",
      description: "Optimize your inventory planning, budget allocation, and merchandise mix for maximum ROI.",
      price: "$1,300+",
      duration: "2-3 weeks",
      category: "Strategy"
    }
  ];

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
      <section className="bg-black text-white py-24 px-4">
        <div className="max-w-[1481px] mx-auto">
          <h1 className="text-3xl md:text-5xl uppercase font-thin mb-6">
            TAILORED <br/>
            <span className="font-normal">CONSULTING SERVICES</span>
          </h1>
          <p className="max-w-2xl text-lg font-light mb-8">
            Expert guidance for brands and buyers navigating the complex fashion industry landscape.
          </p>
          <Button className="bg-white text-black border-0 hover:bg-gray-100">
            EXPLORE SERVICES <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-[1481px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl md:text-4xl uppercase font-thin mb-6">
              BEYOND <span className="font-normal">THE PLATFORM</span>
            </h2>
            <p className="font-light">
              At ETAGE7, we combine our digital marketplace with personalized consulting services 
              to address the unique challenges facing fashion brands and buyers in today's competitive landscape.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-gray-50 p-8">
              <h3 className="uppercase font-normal text-xl mb-6">FOR BRANDS</h3>
              <p className="font-light mb-6">
                Our consulting services help fashion brands define their market positioning, 
                optimize their sales strategy, and successfully enter new markets.
              </p>
              <Button className="bg-black text-white hover:bg-gray-800">
                BRAND SERVICES <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="bg-gray-50 p-8">
              <h3 className="uppercase font-normal text-xl mb-6">FOR BUYERS</h3>
              <p className="font-light mb-6">
                Professional buyers benefit from our expertise in trend forecasting, 
                inventory planning, and curated brand discovery to enhance their product selection.
              </p>
              <Button className="bg-black text-white hover:bg-gray-800">
                BUYER SERVICES <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-[1481px] mx-auto">
          <h2 className="text-2xl md:text-4xl uppercase font-thin mb-12 text-center">
            SERVICES FOR <span className="font-normal">BRANDS</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {brandServices.map((service) => (
              <div key={service.id} className="bg-white p-8 border border-gray-200 flex flex-col">
                <h3 className="uppercase font-normal text-xl mb-4">{service.name}</h3>
                <p className="font-light mb-4">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="font-light text-sm">• Market analysis and opportunity assessment</li>
                  <li className="font-light text-sm">• Competitive landscape mapping</li>
                  <li className="font-light text-sm">• Distribution channel strategy</li>
                  <li className="font-light text-sm">• Pricing and positioning recommendations</li>
                </ul>
                <div className="mt-auto">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-medium">{service.price}</span>
                    <span className="text-sm text-gray-500">{service.duration}</span>
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

      <section className="py-16 px-4">
        <div className="max-w-[1481px] mx-auto">
          <h2 className="text-2xl md:text-4xl uppercase font-thin mb-12 text-center">
            SERVICES FOR <span className="font-normal">BUYERS</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {buyerServices.map((service) => (
              <div key={service.id} className="bg-white p-8 border border-gray-200 flex flex-col">
                <h3 className="uppercase font-normal text-xl mb-4">{service.name}</h3>
                <p className="font-light mb-4">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="font-light text-sm">• Personalized consulting</li>
                  <li className="font-light text-sm">• Data-driven insights</li>
                  <li className="font-light text-sm">• Industry expert guidance</li>
                  <li className="font-light text-sm">• Ongoing support</li>
                </ul>
                <div className="mt-auto">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-medium">{service.price}</span>
                    <span className="text-sm text-gray-500">{service.duration}</span>
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

      <section className="py-16 px-4 bg-white">
        <div className="max-w-[1481px] mx-auto">
          <h2 className="text-2xl md:text-4xl uppercase font-thin mb-12 text-center">
            MEET <span className="font-normal">OUR TEAM</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-48 h-48 bg-gray-100 mb-4 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=500&auto=format&fit=crop" 
                  alt="Sophie Martin" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="uppercase font-normal text-xl mb-2">SOPHIE MARTIN</h3>
              <p className="font-light text-center mb-2">Founder & CEO</p>
              <p className="font-light text-sm text-center max-w-xs">
                Former fashion buyer with 15+ years of experience at leading luxury retailers in Paris and New York.
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-48 h-48 bg-gray-100 mb-4 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500&auto=format&fit=crop" 
                  alt="Alexandre Chen" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="uppercase font-normal text-xl mb-2">ALEXANDRE CHEN</h3>
              <p className="font-light text-center mb-2">Brand Relations Director</p>
              <p className="font-light text-sm text-center max-w-xs">
                Specialized in emerging designer development with a background in fashion business consulting.
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-48 h-48 bg-gray-100 mb-4 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=500&auto=format&fit=crop" 
                  alt="Elena Dubois" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="uppercase font-normal text-xl mb-2">ELENA DUBOIS</h3>
              <p className="font-light text-center mb-2">Buyer Relations Manager</p>
              <p className="font-light text-sm text-center max-w-xs">
                Expert in retail operations and merchandising with experience at international department stores.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-black text-white">
        <div className="max-w-[1481px] mx-auto">
          <h2 className="text-2xl md:text-4xl uppercase font-thin mb-12 text-center">
            WHY JOIN <span className="font-normal">ETAGE7</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div>
              <h3 className="uppercase font-normal text-xl mb-6">BRANDS BENEFIT FROM</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="mr-4 font-bold">→</span>
                  <span className="font-light">Direct access to qualified professional buyers</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-4 font-bold">→</span>
                  <span className="font-light">Reduced acquisition costs compared to trade shows</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-4 font-bold">→</span>
                  <span className="font-light">Expert guidance on market entry and expansion</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-4 font-bold">→</span>
                  <span className="font-light">Enhanced brand visibility in targeted markets</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-4 font-bold">→</span>
                  <span className="font-light">Streamlined buyer communication and follow-up</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="uppercase font-normal text-xl mb-6">BUYERS BENEFIT FROM</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="mr-4 font-bold">→</span>
                  <span className="font-light">AI-powered brand discovery tailored to their needs</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-4 font-bold">→</span>
                  <span className="font-light">Exclusive access to emerging and niche brands</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-4 font-bold">→</span>
                  <span className="font-light">Time and cost savings in brand sourcing</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-4 font-bold">→</span>
                  <span className="font-light">Advanced trend forecasting and market insights</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-4 font-bold">→</span>
                  <span className="font-light">Personalized support from industry experts</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-[1481px] mx-auto text-center">
          <h2 className="text-2xl md:text-4xl uppercase font-thin mb-6">
            READY TO <span className="font-normal">GET STARTED?</span>
          </h2>
          <p className="max-w-2xl mx-auto mb-8 font-light">
            Contact our team to discuss how our platform and consulting services can help you achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-black text-white hover:bg-gray-800">
              FOR BRANDS <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button className="bg-white text-black border border-black hover:bg-gray-100">
              FOR BUYERS <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
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
                        {[...brandServices, ...buyerServices].map((service) => (
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

export default ServicesPage;
