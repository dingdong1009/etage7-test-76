import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const ServicesPage = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
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

      {/* Overview Section */}
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

      {/* Brand Services Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-[1481px] mx-auto">
          <h2 className="text-2xl md:text-4xl uppercase font-thin mb-12 text-center">
            SERVICES FOR <span className="font-normal">BRANDS</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 border border-gray-200">
              <h3 className="uppercase font-normal text-xl mb-4">MARKET ENTRY STRATEGY</h3>
              <p className="font-light mb-4">
                Comprehensive analysis and strategic planning for brands looking to enter new geographic markets.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="font-light text-sm">• Market analysis and opportunity assessment</li>
                <li className="font-light text-sm">• Competitive landscape mapping</li>
                <li className="font-light text-sm">• Distribution channel strategy</li>
                <li className="font-light text-sm">• Pricing and positioning recommendations</li>
              </ul>
            </div>
            
            <div className="bg-white p-8 border border-gray-200">
              <h3 className="uppercase font-normal text-xl mb-4">BRAND POSITIONING</h3>
              <p className="font-light mb-4">
                Refine your brand identity and messaging to resonate with your target audience and stand out in the market.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="font-light text-sm">• Brand identity assessment</li>
                <li className="font-light text-sm">• Target audience analysis</li>
                <li className="font-light text-sm">• Messaging and visual identity refinement</li>
                <li className="font-light text-sm">• Competitive differentiation strategy</li>
              </ul>
            </div>
            
            <div className="bg-white p-8 border border-gray-200">
              <h3 className="uppercase font-normal text-xl mb-4">SALES OPTIMIZATION</h3>
              <p className="font-light mb-4">
                Enhance your sales approach, materials, and processes to increase buyer engagement and conversion.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="font-light text-sm">• Sales collateral development</li>
                <li className="font-light text-sm">• Pricing strategy optimization</li>
                <li className="font-light text-sm">• Buyer presentation coaching</li>
                <li className="font-light text-sm">• Negotiation strategy and support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Buyer Services Section */}
      <section className="py-16 px-4">
        <div className="max-w-[1481px] mx-auto">
          <h2 className="text-2xl md:text-4xl uppercase font-thin mb-12 text-center">
            SERVICES FOR <span className="font-normal">BUYERS</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 border border-gray-200">
              <h3 className="uppercase font-normal text-xl mb-4">TREND FORECASTING</h3>
              <p className="font-light mb-4">
                Stay ahead of market trends with our detailed seasonal forecasts and consumer behavior analysis.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="font-light text-sm">• Seasonal trend reports</li>
                <li className="font-light text-sm">• Color and material forecasting</li>
                <li className="font-light text-sm">• Consumer behavior insights</li>
                <li className="font-light text-sm">• Market-specific trend analysis</li>
              </ul>
            </div>
            
            <div className="bg-white p-8 border border-gray-200">
              <h3 className="uppercase font-normal text-xl mb-4">CURATED BRAND DISCOVERY</h3>
              <p className="font-light mb-4">
                Personalized brand scouting tailored to your store's unique aesthetic, customer base, and price points.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="font-light text-sm">• Custom brand portfolio creation</li>
                <li className="font-light text-sm">• Emerging designer spotlighting</li>
                <li className="font-light text-sm">• Exclusive brand introductions</li>
                <li className="font-light text-sm">• Sample coordination and management</li>
              </ul>
            </div>
            
            <div className="bg-white p-8 border border-gray-200">
              <h3 className="uppercase font-normal text-xl mb-4">BUYING STRATEGY</h3>
              <p className="font-light mb-4">
                Optimize your inventory planning, budget allocation, and merchandise mix for maximum ROI.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="font-light text-sm">• Inventory planning</li>
                <li className="font-light text-sm">• Budget optimization</li>
                <li className="font-light text-sm">• Category mix analysis</li>
                <li className="font-light text-sm">• Seasonal buying calendar development</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
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

      {/* Why Join Section */}
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

      {/* CTA Section */}
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
    </div>
  );
};

export default ServicesPage;
