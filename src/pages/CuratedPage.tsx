
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";

const CuratedPage = () => {
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
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tighter uppercase mb-6">
              Upcoming<br/>
              <span className="font-normal uppercase">Curated Contents</span>
            </h1>
            <p className="text-lg md:text-xl font-light text-gray-300 mb-12 max-w-2xl">
            Valuable insights and tools for fashion brands and buyers.
            </p>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <button 
          onClick={() => scrollToSection('content')}
          className={`absolute left-1/2 -translate-x-1/2 bottom-10 p-3 transition-opacity duration-500 ${
            scrolled ? 'opacity-0' : 'opacity-100'
          }`}
          aria-label="Scroll to learn more"
        >
          <ChevronDown size={24} className="animate-bounce" />
        </button>
      </section>

      {/* Content Section */}
      <section id="content" className="py-28 px-4">
        <div className="max-w-[1481px] mx-auto">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-light tracking-tighter mb-8">
              CURATED <span className="font-normal">COLLECTIONS</span>
            </h2>
            <p className="text-lg font-light text-gray-700 mb-12">
              Our advanced AI system is being trained to understand your specific requirements 
              and match you with brands that perfectly align with your business needs.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
              <div className="p-10 border border-gray-100 hover:border-gray-300 transition-all">
                <h3 className="uppercase font-light text-2xl mb-6">FOR BRANDS</h3>
                <p className="font-light text-gray-700 mb-8">
                  Get your products in front of the perfect audience. Our AI will match your brand with buyers 
                  who are specifically looking for your unique style and offerings.
                </p>
                <Button className="bg-black text-white hover:bg-gray-900">
                  LEARN MORE <ArrowRight className="ml-2 h-4 w-4" strokeWidth={1} />
                </Button>
              </div>
              
              <div className="p-10 border border-gray-100 hover:border-gray-300 transition-all">
                <h3 className="uppercase font-light text-2xl mb-6">FOR BUYERS</h3>
                <p className="font-light text-gray-700 mb-8">
                  Discover brands that perfectly match your store's aesthetic and customer preferences.
                  Save time and focus on what matters most.
                </p>
                <Button className="bg-black text-white hover:bg-gray-900">
                  LEARN MORE <ArrowRight className="ml-2 h-4 w-4" strokeWidth={1} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-24 md:py-32 bg-black text-white">
        <div className="container-lg text-center">
          <h2 className="text-3xl md:text-4xl font-light tracking-tighter mb-6">
            STAY <span className="font-normal">INFORMED</span>
          </h2>
          <p className="max-w-2xl mx-auto mb-12 text-gray-300 font-light">
            Subscribe to our newsletter to be the first to know when our AI-powered
            curation platform launches.
          </p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="px-4 py-2 border border-gray-700 bg-transparent rounded-none flex-grow"
            />
            <Button className="bg-white text-black hover:bg-gray-100 whitespace-nowrap">
              SUBSCRIBE
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CuratedPage;
