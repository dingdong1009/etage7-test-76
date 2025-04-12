
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const BuyersPage = () => {
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
      <section className="relative h-[80vh] bg-black text-white flex items-center">
        <div className="container-lg">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tighter mb-6">
              DISCOVER THE<br/>
              <span className="font-normal">PERFECT BRANDS</span>
            </h1>
            <p className="text-lg md:text-xl font-light text-gray-300 mb-12 max-w-2xl">
              Access a curated selection of fashion brands that match your store's aesthetic, customer base, and price points.
            </p>
            <Button asChild className="btn btn-primary text-base bg-white text-black hover:bg-gray-100 border-0">
              <Link to="/register?type=buyer">
                JOIN AS A BUYER <ArrowRight className="ml-2 h-4 w-4" strokeWidth={1.5} />
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <button 
          onClick={() => scrollToSection('challenge')}
          className={`absolute left-1/2 -translate-x-1/2 bottom-10 p-3 transition-opacity duration-500 ${
            scrolled ? 'opacity-0' : 'opacity-100'
          }`}
          aria-label="Scroll to learn more"
        >
          <ChevronDown size={24} className="animate-bounce text-white" />
        </button>
      </section>

      {/* Market Context Section */}
      <section id="challenge" className="py-24 md:py-32">
        <div className="container-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="bg-gray-100 h-[400px] flex items-center justify-center order-2 md:order-1">
              <p className="text-center text-gray-400">Buyer Image Placeholder</p>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl font-light tracking-tighter mb-6">
                THE <span className="font-normal">CHALLENGE</span>
              </h2>
              <p className="mb-8 font-light text-gray-700">
                Professional buyers face significant hurdles in today's fast-evolving fashion landscape:
              </p>
              <ul className="space-y-6 mb-8">
                <li className="flex items-start">
                  <span className="text-gray-400 mr-4 font-normal">01.</span>
                  <span className="text-gray-800">Time-consuming search for new and innovative brands</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-400 mr-4 font-normal">02.</span>
                  <span className="text-gray-800">Limited access to emerging designers and niche brands</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-400 mr-4 font-normal">03.</span>
                  <span className="text-gray-800">Difficulty in assessing brand reliability and product quality</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-400 mr-4 font-normal">04.</span>
                  <span className="text-gray-800">High costs associated with attending multiple trade shows</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24 md:py-32 bg-gray-50">
        <div className="container-lg">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light tracking-tighter mb-6">
              WHY <span className="font-normal">ETAGE7</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 md:p-12 border border-gray-200">
              <h3 className="text-lg uppercase font-normal mb-4">AI-POWERED CURATION</h3>
              <p className="text-gray-600 font-light">
                Our AI technology analyzes your store profile and preferences to recommend brands that perfectly match your needs.
              </p>
            </div>
            
            <div className="bg-white p-8 md:p-12 border border-gray-200">
              <h3 className="text-lg uppercase font-normal mb-4">VERIFIED BRANDS</h3>
              <p className="text-gray-600 font-light">
                All brands on our platform undergo a thorough verification process to ensure quality, reliability, and ethical standards.
              </p>
            </div>
            
            <div className="bg-white p-8 md:p-12 border border-gray-200">
              <h3 className="text-lg uppercase font-normal mb-4">STREAMLINED PROCESS</h3>
              <p className="text-gray-600 font-light">
                Connect directly with brand representatives, request samples, and negotiate terms all in one platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 md:py-32">
        <div className="container-lg">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light tracking-tighter mb-6">
              MEMBERSHIP <span className="font-normal">BENEFITS</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl uppercase font-normal mb-6">FOR BUYERS</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-gray-400 mr-4">—</span>
                  <span className="text-gray-800 font-light">Free access to the entire platform</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-400 mr-4">—</span>
                  <span className="text-gray-800 font-light">Personalized brand recommendations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-400 mr-4">—</span>
                  <span className="text-gray-800 font-light">Direct communication with brand representatives</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-400 mr-4">—</span>
                  <span className="text-gray-800 font-light">Early access to new collections</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-400 mr-4">—</span>
                  <span className="text-gray-800 font-light">Invitations to exclusive virtual and physical showrooms</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 p-8 md:p-12">
              <h3 className="text-xl uppercase font-normal mb-6">JOIN FOR FREE</h3>
              <p className="text-gray-700 mb-8 font-light">
                As a professional buyer, you get complimentary access to our platform, connecting you with brands that match your specific needs.
              </p>
              <Button asChild className="bg-black text-white hover:bg-gray-800">
                <Link to="/register?type=buyer">
                  APPLY NOW <ArrowRight className="ml-2 h-4 w-4" strokeWidth={1.5} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 md:py-32 bg-gray-50">
        <div className="container-lg">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light tracking-tighter mb-6">
              BUYER <span className="font-normal">TESTIMONIALS</span>
            </h2>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <blockquote className="text-center mb-8">
              <p className="text-xl font-light italic mb-6">
                "ETAGE7 completely transformed how we source new brands. The AI-powered recommendations are remarkably accurate to our store's aesthetic, and we've discovered fantastic brands we would have never found otherwise."
              </p>
              <cite className="font-normal uppercase">— JEAN DUPONT, BUYER, LE CONCEPT PARIS</cite>
            </blockquote>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-black text-white">
        <div className="container-lg text-center">
          <h2 className="text-3xl md:text-4xl font-light tracking-tighter mb-6">
            START <span className="font-normal">DISCOVERING</span>
          </h2>
          <p className="max-w-2xl mx-auto mb-12 text-gray-300 font-light">
            Join ETAGE7 today and revolutionize how you source new brands for your store.
          </p>
          <Button asChild className="bg-white text-black hover:bg-gray-100 btn">
            <Link to="/register?type=buyer">
              JOIN AS A BUYER <ArrowRight className="ml-2 h-4 w-4" strokeWidth={1.5} />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default BuyersPage;
