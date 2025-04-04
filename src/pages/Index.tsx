
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-black text-white py-36 px-4">
        <div className="max-w-[1481px] mx-auto">
          <h1 className="text-4xl md:text-6xl uppercase font-thin mb-6">
            CONNECTING <br/>
            <span className="font-normal">FASHION BRANDS & BUYERS</span>
          </h1>
          <p className="max-w-2xl text-xl font-light mb-12">
            ETAGE7 is the premium platform that brings together fashion brands and professional buyers, 
            revolutionizing how the industry connects and conducts business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="bg-white text-black border-0 hover:bg-gray-100">
              <Link to="/brands">
                FOR BRANDS <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild className="bg-transparent text-white border border-white hover:bg-white/10">
              <Link to="/buyers">
                FOR BUYERS <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Platform Overview */}
      <section className="py-16 px-4">
        <div className="max-w-[1481px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl md:text-4xl uppercase font-thin mb-6">
              THE <span className="font-normal">PLATFORM</span>
            </h2>
            <p className="font-light">
              ETAGE7 combines technology, industry expertise, and personalized service to create 
              a new standard for fashion industry connections.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 border border-gray-200">
              <h3 className="uppercase font-normal text-xl mb-4">AI MATCHMAKING</h3>
              <p className="font-light">
                Our artificial intelligence analyzes brand profiles and buyer preferences to create 
                perfect matches based on aesthetics, price points, and business requirements.
              </p>
            </div>
            
            <div className="bg-white p-8 border border-gray-200">
              <h3 className="uppercase font-normal text-xl mb-4">VERIFIED MEMBERS</h3>
              <p className="font-light">
                Every brand and buyer on our platform undergoes a thorough verification process, 
                ensuring that you're connecting with legitimate, professional partners.
              </p>
            </div>
            
            <div className="bg-white p-8 border border-gray-200">
              <h3 className="uppercase font-normal text-xl mb-4">EXPERT CONSULTING</h3>
              <p className="font-light">
                Beyond the platform, our team of industry experts provides personalized consulting 
                services for both brands and buyers seeking to optimize their business strategies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* For Brands & Buyers Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-[1481px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 border border-gray-200">
              <h3 className="uppercase font-normal text-xl mb-4">FOR BRANDS</h3>
              <p className="font-light mb-6">
                Expand your reach to professional buyers from key markets around the world. 
                Our platform provides direct access to qualified buyers looking for brands like yours.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="font-light">• Connect with verified professional buyers</li>
                <li className="font-light">• Showcase your brand to a targeted audience</li>
                <li className="font-light">• Receive market insights and expert guidance</li>
                <li className="font-light">• Streamline your sales process</li>
              </ul>
              <Button asChild className="bg-black text-white hover:bg-gray-800">
                <Link to="/brands">
                  LEARN MORE <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="bg-white p-8 border border-gray-200">
              <h3 className="uppercase font-normal text-xl mb-4">FOR BUYERS</h3>
              <p className="font-light mb-6">
                Discover new brands that perfectly match your store's aesthetic and customer base. 
                Our AI-powered platform curates options specifically for your needs.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="font-light">• Access a curated selection of verified brands</li>
                <li className="font-light">• Save time with AI-powered brand matching</li>
                <li className="font-light">• Connect directly with brand representatives</li>
                <li className="font-light">• Receive trend forecasting and buying guidance</li>
              </ul>
              <Button asChild className="bg-black text-white hover:bg-gray-800">
                <Link to="/buyers">
                  LEARN MORE <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4">
        <div className="max-w-[1481px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl md:text-4xl uppercase font-thin mb-6">
              OUR <span className="font-normal">SERVICES</span>
            </h2>
            <p className="font-light mb-8">
              Beyond our digital platform, we offer specialized consulting services for both brands and buyers.
            </p>
            <Button asChild className="bg-black text-white hover:bg-gray-800">
              <Link to="/services">
                VIEW ALL SERVICES <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-gray-50 p-8">
              <h3 className="uppercase font-normal text-xl mb-4">BRAND SERVICES</h3>
              <ul className="space-y-3 mb-6">
                <li className="font-light">• Market entry strategy</li>
                <li className="font-light">• Brand positioning</li>
                <li className="font-light">• Sales optimization</li>
                <li className="font-light">• Buyer relationship management</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-8">
              <h3 className="uppercase font-normal text-xl mb-4">BUYER SERVICES</h3>
              <ul className="space-y-3 mb-6">
                <li className="font-light">• Trend forecasting</li>
                <li className="font-light">• Curated brand discovery</li>
                <li className="font-light">• Buying strategy</li>
                <li className="font-light">• Inventory optimization</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-black text-white">
        <div className="max-w-[1481px] mx-auto text-center">
          <h2 className="text-2xl md:text-4xl uppercase font-thin mb-6">
            JOIN THE <span className="font-normal">REVOLUTION</span>
          </h2>
          <p className="max-w-2xl mx-auto mb-8 font-light">
            Whether you're a brand looking to expand your market reach or a buyer seeking the perfect brand 
            partners, ETAGE7 is designed to transform how you do business.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild className="bg-white text-black hover:bg-gray-100">
              <Link to="/brands">
                FOR BRANDS <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild className="bg-transparent text-white border border-white hover:bg-white/10">
              <Link to="/buyers">
                FOR BUYERS <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
