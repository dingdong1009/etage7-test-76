
import { ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const Index = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen bg-black text-white flex items-center">
        <div className="container-lg">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tighter mb-6">
              CONNECTING<br/>
              <span className="font-normal">FASHION BRANDS & BUYERS</span>
            </h1>
            <p className="text-lg md:text-xl font-light text-gray-300 mb-12 max-w-2xl">
              ETAGE7 is the premium platform that brings together fashion brands and professional buyers, 
              revolutionizing how the industry connects and conducts business.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Button asChild className="btn btn-primary text-base">
                <Link to="/brands">
                  FOR BRANDS <ArrowRight className="ml-2 h-4 w-4" strokeWidth={1.5} />
                </Link>
              </Button>
              <Button asChild className="btn btn-secondary text-base">
                <Link to="/buyers">
                  FOR BUYERS <ArrowRight className="ml-2 h-4 w-4" strokeWidth={1.5} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <button 
          onClick={() => scrollToSection('platform')}
          className={`absolute left-1/2 -translate-x-1/2 bottom-10 p-3 transition-opacity duration-500 ${
            scrolled ? 'opacity-0' : 'opacity-100'
          }`}
          aria-label="Scroll to learn more"
        >
          <ChevronDown size={24} className="animate-bounce" />
        </button>
      </section>

      {/* Platform Overview */}
      <section id="platform" className="py-24 md:py-32 bg-gray-50">
        <div className="container-lg">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light tracking-tighter mb-6">
              THE <span className="font-normal">PLATFORM</span>
            </h2>
            <p className="text-gray-700">
              ETAGE7 combines technology, industry expertise, and personalized service to create 
              a new standard for fashion industry connections.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 md:p-12">
              <h3 className="text-lg uppercase font-normal mb-4">AI MATCHMAKING</h3>
              <p className="text-gray-600">
                Our artificial intelligence analyzes brand profiles and buyer preferences to create 
                perfect matches based on aesthetics, price points, and business requirements.
              </p>
            </div>
            
            <div className="bg-white p-8 md:p-12">
              <h3 className="text-lg uppercase font-normal mb-4">VERIFIED MEMBERS</h3>
              <p className="text-gray-600">
                Every brand and buyer on our platform undergoes a thorough verification process, 
                ensuring that you're connecting with legitimate, professional partners.
              </p>
            </div>
            
            <div className="bg-white p-8 md:p-12">
              <h3 className="text-lg uppercase font-normal mb-4">EXPERT CONSULTING</h3>
              <p className="text-gray-600">
                Beyond the platform, our team of industry experts provides personalized consulting 
                services for both brands and buyers seeking to optimize their business strategies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* For Brands & Buyers Section */}
      <section className="py-24 md:py-32">
        <div className="container-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
            <div>
              <h3 className="text-2xl md:text-3xl font-normal tracking-tighter mb-6">FOR BRANDS</h3>
              <p className="text-gray-600 mb-8">
                Expand your reach to professional buyers from key markets around the world. 
                Our platform provides direct access to qualified buyers looking for brands like yours.
              </p>
              <ul className="space-y-4 mb-10">
                <li className="flex items-start">
                  <span className="text-gray-400 mr-2">—</span>
                  <span className="text-gray-800">Connect with verified professional buyers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-400 mr-2">—</span>
                  <span className="text-gray-800">Showcase your brand to a targeted audience</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-400 mr-2">—</span>
                  <span className="text-gray-800">Receive market insights and expert guidance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-400 mr-2">—</span>
                  <span className="text-gray-800">Streamline your sales process</span>
                </li>
              </ul>
              <Button asChild className="btn btn-outline">
                <Link to="/brands">
                  DISCOVER MORE <ArrowRight className="ml-2 h-4 w-4" strokeWidth={1.5} />
                </Link>
              </Button>
            </div>
            
            <div>
              <h3 className="text-2xl md:text-3xl font-normal tracking-tighter mb-6">FOR BUYERS</h3>
              <p className="text-gray-600 mb-8">
                Discover new brands that perfectly match your store's aesthetic and customer base. 
                Our AI-powered platform curates options specifically for your needs.
              </p>
              <ul className="space-y-4 mb-10">
                <li className="flex items-start">
                  <span className="text-gray-400 mr-2">—</span>
                  <span className="text-gray-800">Access a curated selection of verified brands</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-400 mr-2">—</span>
                  <span className="text-gray-800">Save time with AI-powered brand matching</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-400 mr-2">—</span>
                  <span className="text-gray-800">Connect directly with brand representatives</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-400 mr-2">—</span>
                  <span className="text-gray-800">Receive trend forecasting and buying guidance</span>
                </li>
              </ul>
              <Button asChild className="btn btn-outline">
                <Link to="/buyers">
                  DISCOVER MORE <ArrowRight className="ml-2 h-4 w-4" strokeWidth={1.5} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 md:py-32 bg-gray-50">
        <div className="container-lg">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light tracking-tighter mb-6">
              OUR <span className="font-normal">SERVICES</span>
            </h2>
            <p className="text-gray-700 mb-10">
              Beyond our digital platform, we offer specialized consulting services for both brands and buyers.
            </p>
            <Button asChild className="btn btn-primary">
              <Link to="/services">
                VIEW ALL SERVICES <ArrowRight className="ml-2 h-4 w-4" strokeWidth={1.5} />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 mt-20">
            <div>
              <h3 className="text-xl uppercase font-normal mb-6">BRAND SERVICES</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-gray-400 mr-2">—</span>
                  <span className="text-gray-800">Market entry strategy</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-400 mr-2">—</span>
                  <span className="text-gray-800">Brand positioning</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-400 mr-2">—</span>
                  <span className="text-gray-800">Sales optimization</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-400 mr-2">—</span>
                  <span className="text-gray-800">Buyer relationship management</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl uppercase font-normal mb-6">BUYER SERVICES</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-gray-400 mr-2">—</span>
                  <span className="text-gray-800">Trend forecasting</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-400 mr-2">—</span>
                  <span className="text-gray-800">Curated brand discovery</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-400 mr-2">—</span>
                  <span className="text-gray-800">Buying strategy</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-400 mr-2">—</span>
                  <span className="text-gray-800">Inventory optimization</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-black text-white">
        <div className="container-lg text-center">
          <h2 className="text-3xl md:text-4xl font-light tracking-tighter mb-6">
            JOIN THE <span className="font-normal">REVOLUTION</span>
          </h2>
          <p className="max-w-2xl mx-auto mb-12 text-gray-300">
            Whether you're a brand looking to expand your market reach or a buyer seeking the perfect brand 
            partners, ETAGE7 is designed to transform how you do business.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button asChild className="bg-white text-black hover:bg-gray-100 btn">
              <Link to="/brands">
                FOR BRANDS <ArrowRight className="ml-2 h-4 w-4" strokeWidth={1.5} />
              </Link>
            </Button>
            <Button asChild className="bg-transparent text-white border border-white hover:bg-white/10 btn">
              <Link to="/buyers">
                FOR BUYERS <ArrowRight className="ml-2 h-4 w-4" strokeWidth={1.5} />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
