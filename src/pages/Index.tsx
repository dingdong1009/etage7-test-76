import { ArrowRight, ChevronDown, ChevronUp, ChevronRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { PricingTable, PricingPlan } from "@/components/PricingTable";
const Index = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [showBuyerInfo, setShowBuyerInfo] = useState(false);
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
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  const pricingPlans: PricingPlan[] = [{
    name: "6-MONTH",
    price: "₽ 170'000",
    features: ["6 months unlimited access", "Unlimited product listing", "Lookbook & Order features", "Store-front", "And many other features"],
    buttonText: "Purchase Standard",
    highlight: false
  }, {
    name: "12-MONTH",
    price: "₽ 280'000",
    features: ["12 months unlimited access", "Unlimited product listing", "Lookbook & Order features", "Store-front", "And many other features"],
    buttonText: "Purchase Premium",
    highlight: true
  }];
  const togglePricing = () => {
    setShowPricing(!showPricing);
  };
  const toggleBuyerInfo = () => {
    setShowBuyerInfo(!showBuyerInfo);
  };
  return <div className="w-full">
      {/* Hero Section */}
      <section id="hero" className="relative h-screen bg-black text-white flex items-center">
        <div className="container-lg">
          <div className="max-w-3xl">
          <p className="text-lg md:text-xl font-light bg-black text-white mb-12 max-w-2xl uppercase">For Brands</p>
            <h1 className="text-4xl uppercase md:text-5xl lg:text-7xl font-light tracking-tighter mb-6">
            Celebrate<br />
              <span className="font-normal">craftmanship's most meaningful alliances</span>
            </h1>
            <p className="text-lg md:text-xl font-light text-gray-300 mb-12 max-w-2xl">
            ÉTAGE7 was born from passion for the stories and the dreams woven into every design, where creativity meets opportunity. We have built a house to celebrate artistry and craftmanship. And we believe every collaboration could become your next masterpiece.
            </p>
          </div> 
        </div>
        
        {/* Scroll indicator */}
        <button onClick={() => scrollToSection('brand')} className={`absolute left-1/2 -translate-x-1/2 bottom-10 p-3 transition-opacity duration-500 flex flex-col items-center ${scrolled ? 'opacity-0' : 'opacity-100'}`} aria-label="Scroll to learn more">
          <span className="text-sm mb-2 text-grey animate-bounce">For Brands</span> 
          <ChevronDown size={24} className="animate-bounce" />
        </button>
      </section>


      {/* Brands Section */}
      <section id="brand" className="relative h-screen bg-white text-black flex items-center">
        <div className="container-lg">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl uppercase lg:text-7xl font-light tracking-tighter mb-6">
             Brands: Celebrate<br />
              <span className="font-normal uppercase">your uniqueness & opportunities</span>
            </h1>
            
            {/* Brand description text - visible only when pricing is not shown */}
            {!showPricing && <p className="text-lg md:text-xl font-light text-black-100 mb-12 max-w-2xl animate-fade-in">
                Your designs are more than collections—they are chapters of a story waiting to be shared. At ETAGE7, we celebrate your creativity by providing you essential tools that empowers your products finding their places in the heart of those who value your craftmanship.
              </p>}
            
            {/* Pricing section */}
            <div className="mb-12">
              <button onClick={togglePricing} className="flex items-center text-lg md:text-xl font-light hover:underline transition-all focus:outline-none">
                Discover Pricing {showPricing ? '-' : '+'} 
                <ChevronRight className={`ml-2 h-5 w-5 transform transition-transform duration-300 ${showPricing ? 'rotate-90' : ''}`} />
              </button>
              
              {showPricing && <div className="mt-8 animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
                    {pricingPlans.map((plan, index) => <PricingTable key={index} plan={plan} />)}
                  </div>
                </div>}
            </div>
            
            {/* Removed the "JOIN AS A BRAND" button */}
          </div>
        </div>
        
        {/* Scroll indicator */}
        <button onClick={() => scrollToSection('buyer')} className={`absolute left-1/2 -translate-x-1/2 bottom-10 p-3 transition-opacity duration-500 flex flex-col items-center ${scrolled ? 'opacity-100' : 'opacity-0'}`} aria-label="Scroll to learn more">
          <span className="text-sm mb-2 text-black animate-bounce">For Buyers</span>
          <ChevronDown size={24} className="text-black animate-bounce" />
        </button> 
      </section>

      {/* Buyer Section */}
      <section id="buyer" className="relative h-screen bg-white text-black flex items-center">
        <div className="container-lg">
          <div className="max-w-3xl">
          <p className="text-lg md:text-xl font-light bg-black text-white mb-12 max-w-2xl uppercase">For Buyers</p>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tighter mb-6">
              CONNECTING<br />
              <span className="font-normal">FASHION BRANDS & BUYERS</span>
            </h1>
            
            {/* Buyer description text - visible only when buyer info is not shown */}
            {!showBuyerInfo && <p className="text-lg md:text-xl font-light text-black-100 mb-12 max-w-2xl animate-fade-in">As a tastemaker, you seek the exceptional—designs that captivate and inspire. ETAGE7 is your gateway to a curated world of fashion’s finest, where every brand is chosen for its story and soul. Explore collections with intuitive tools, connect effortlessly with creators, and build partnerships that redefine your offerings. From exclusive events to personalized recommendations, we empower you to discover the next iconic name in fashion with elegance and ease.</p>}
            
            {/* New buyer info - visible only when button is clicked */}
            {showBuyerInfo && <p className="text-lg md:text-xl font-light text-black-100 mb-12 max-w-2xl animate-fade-in">
                blablalblablal bal balbal bal b balbal balba lbal ba b
              </p>}
            
            <Button onClick={toggleBuyerInfo} className="bg-white text-black border-0 hover:bg-gray-100 text-base py-6 px-8">
              JOIN AS A BUYER <ArrowRight className="ml-2 h-4 w-4" strokeWidth={1} />
            </Button>
          </div>
        </div> 
        
        {/* Scroll indicator */}
        <button onClick={() => scrollToSection('platform')} className={`absolute left-1/2 -translate-x-1/2 bottom-10 p-3 transition-opacity duration-500 flex flex-col items-center ${scrolled ? 'opacity-100' : 'opacity-0'}`} aria-label="Scroll to learn more">
          <span className="text-sm mb-2 text-black animate-bounce">The Platform</span>
          <ChevronDown size={24} className="text-black animate-bounce" />
        </button> 
      </section>


            {/* Platform Section */}
            <section id="platform" className="relative h-screen bg-white text-black flex items-center">
        <div className="container-lg">
          <div className="max-w-3xl">
          <p className="text-lg md:text-xl font-light bg-black text-white mb-12 max-w-2xl uppercase">The Platform</p>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tighter mb-6">
              CONNECTING<br />
              <span className="font-normal">FASHION BRANDS & BUYERS</span>
            </h1>
            <p className="text-lg md:text-xl font-light text-black-100 mb-12 max-w-2xl">ÉTAGE7 is more than a platform—it embraces to honor your place in fashion’s story. With a seamless interface as intuitive as a perfectly cut dress, either you are wholesalers, professional buyers, or multi-brand showroom owners, we invite you to join a movement where every connection is a work of art. Register today to explore curated matches, unlock creative tools, and become part of a community that cherishes the beauty of design.</p>
          </div>
        </div> 
        
        {/* Scroll indicator */}
        <button onClick={() => scrollToSection('services')} className={`absolute left-1/2 -translate-x-1/2 bottom-10 p-3 transition-opacity duration-500 flex flex-col items-center ${scrolled ? 'opacity-100' : 'opacity-0'}`} aria-label="Scroll to learn more">
          <span className="text-sm mb-2 text-black animate-bounce">Consulting Services</span>
          <ChevronDown size={24} className="text-black animate-bounce" /> 
        </button> 
      </section>


      {/* Additional services Section */}
      <section id="services" className="relative h-screen bg-white text-black flex items-center">
        <div className="container-lg">
          <div className="max-w-3xl">
          <p className="text-lg md:text-xl font-light bg-black text-white mb-12 max-w-2xl uppercase">Consulting Services</p>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tighter mb-6">
              CONNECTING<br />
              <span className="font-normal">FASHION BRANDS & BUYERS</span> 
            </h1>
            <p className="text-lg md:text-xl font-light text-black-100 mb-12 max-w-2xl">ETAGE7 offers tailored consulting services (excluded from the subscriptions plan) for both brands and buyers to help them navigate the dynamic fashion industry on topics such as: Brand Identity Development, Collection Development Consulting, Marketing &amp; Campaign Strategy, Trend-Based Buying Guidance, etc.
Start the conversation with our team of experts.</p>
          </div>
        </div> 
        
        {/* Scroll indicator */}
        <button onClick={() => scrollToSection('hero')} className={`absolute left-1/2 -translate-x-1/2 bottom-10 p-3 transition-opacity duration-500 flex flex-col items-center ${scrolled ? 'opacity-100' : 'opacity-0'}`} aria-label="Scroll to learn more">
          <span className="text-sm mb-2 text-black animate-bounce">Navigate Back Up</span>
          <ChevronUp size={24} className="text-black animate-bounce" />
        </button> 
      </section>











      {/* Platform Overview */}
      <section id="kjsdhkjs" className="py-24 md:py-32 bg-white">
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
      <section className="py-24 border-t md:py-32">
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
                  DISCOVER MORE <ArrowRight className="ml-2 h-4 w-4" strokeWidth={1} />
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
                  DISCOVER MORE <ArrowRight className="ml-2 h-4 w-4" strokeWidth={1} />
                </Link>
              </Button>
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
                FOR BRANDS <ArrowRight className="ml-2 h-4 w-4" strokeWidth={1} />
              </Link>
            </Button>
            <Button asChild className="bg-transparent text-white border border-white hover:bg-white/10 btn">
              <Link to="/buyers">
                FOR BUYERS <ArrowRight className="ml-2 h-4 w-4" strokeWidth={1} />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>;
};
export default Index;