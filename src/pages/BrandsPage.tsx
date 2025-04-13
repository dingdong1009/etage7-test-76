
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const BrandsPage = () => {
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
              EXPAND YOUR BRAND'S<br/>
              <span className="font-normal">GLOBAL REACH</span>
            </h1>
            <p className="text-lg md:text-xl font-light text-gray-300 mb-12 max-w-2xl">
              Connect with professional buyers from around the world and grow your fashion brand's presence in key markets.
            </p>
            <Button className="bg-white text-black border-0 hover:bg-gray-900 text-base py-6 px-8">
              JOIN AS A BRAND <ArrowRight className="ml-2 h-4 w-4" strokeWidth={1} />
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
          <ChevronDown size={24} className="animate-bounce" />
        </button>
      </section>

      {/* Challenge Section */}
      <section id="challenge" className="py-28 bg-gray-50">
        <div className="container-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-light tracking-tighter mb-8">
                THE <span className="font-normal">CHALLENGE</span>
              </h2>
              <p className="text-gray-700 mb-8 font-light">
                In today's saturated fashion market, brands face unprecedented challenges:
              </p>
              <ul className="space-y-6">
                <li className="flex items-start">
                  <span className="text-2xl font-light text-gray-400 mr-4">01</span>
                  <span className="text-lg">Difficulty accessing international buyers and new markets</span>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl font-light text-gray-400 mr-4">02</span>
                  <span className="text-lg">High costs of traditional sales channels and trade shows</span>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl font-light text-gray-400 mr-4">03</span>
                  <span className="text-lg">Limited visibility among key decision-makers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl font-light text-gray-400 mr-4">04</span>
                  <span className="text-lg">Complex market entry requirements and local regulations</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-200 h-[500px] flex items-center justify-center">
              <p className="text-center text-gray-400">Brand Image Placeholder</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-28">
        <div className="container-lg">
          <h2 className="text-3xl md:text-4xl font-light tracking-tighter mb-16 text-center">
            WHY <span className="font-normal">ETAGE7</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-10 border border-gray-100 hover:border-gray-300 transition-all">
              <h3 className="uppercase font-light text-2xl mb-6">DIRECT ACCESS</h3>
              <p className="font-light text-gray-700">
                Connect directly with professional buyers from department stores, boutiques, and online retailers across key global markets.
              </p>
            </div>
            
            <div className="p-10 border border-gray-100 hover:border-gray-300 transition-all">
              <h3 className="uppercase font-light text-2xl mb-6">AI MATCHMAKING</h3>
              <p className="font-light text-gray-700">
                Our AI-powered platform matches your brand with buyers who specifically look for your aesthetic, price point, and product category.
              </p>
            </div>
            
            <div className="p-10 border border-gray-100 hover:border-gray-300 transition-all">
              <h3 className="uppercase font-light text-2xl mb-6">MARKET INSIGHTS</h3>
              <p className="font-light text-gray-700">
                Gain valuable data on market trends, buyer preferences, and competitive landscape to inform your strategy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Section */}
      <section className="py-28 bg-gray-50">
        <div className="container-lg">
          <h2 className="text-3xl md:text-4xl font-light tracking-tighter mb-16 text-center">
            MEMBERSHIP <span className="font-normal">OPTIONS</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="p-12 border border-gray-200 hover:border-gray-300 transition-all bg-white">
              <h3 className="uppercase font-light text-2xl mb-4">6-MONTH ACCESS</h3>
              <p className="text-3xl font-light mb-10">170,000 ₽</p>
              <ul className="space-y-4 mb-12">
                <li className="flex items-center font-light">
                  <span className="mr-3 text-gray-400">—</span>
                  Full platform access
                </li>
                <li className="flex items-center font-light">
                  <span className="mr-3 text-gray-400">—</span>
                  Direct messaging with buyers
                </li>
                <li className="flex items-center font-light">
                  <span className="mr-3 text-gray-400">—</span>
                  Brand profile customization
                </li>
                <li className="flex items-center font-light">
                  <span className="mr-3 text-gray-400">—</span>
                  Basic analytics dashboard
                </li>
              </ul>
              <Button className="w-full bg-black text-white hover:bg-gray-900 py-6">
                SELECT PLAN
              </Button>
            </div>
            
            <div className="p-12 bg-black text-white border border-black hover:bg-gray-900 transition-all">
              <h3 className="uppercase font-light text-2xl mb-4">12-MONTH ACCESS</h3>
              <p className="text-3xl font-light mb-10">280,000 ₽</p>
              <ul className="space-y-4 mb-12">
                <li className="flex items-center font-light">
                  <span className="mr-3 text-gray-400">—</span>
                  All features from 6-month plan
                </li>
                <li className="flex items-center font-light">
                  <span className="mr-3 text-gray-400">—</span>
                  Priority listing in search results
                </li>
                <li className="flex items-center font-light">
                  <span className="mr-3 text-gray-400">—</span>
                  Advanced market analytics
                </li>
                <li className="flex items-center font-light">
                  <span className="mr-3 text-gray-400">—</span>
                  Consultation session (2 hours)
                </li>
              </ul>
              <Button className="w-full bg-white text-black hover:bg-gray-100 py-6">
                SELECT PLAN
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-28">
        <div className="container-lg">
          <h2 className="text-3xl md:text-4xl font-light tracking-tighter mb-16 text-center">
            SUCCESS <span className="font-normal">STORIES</span>
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <blockquote className="text-center mb-8">
              <p className="text-2xl font-light italic mb-10 leading-relaxed">
                "ETAGE7 opened doors to boutiques in markets we had never accessed before. Within three months, we secured partnerships with five new retailers."
              </p>
              <cite className="font-normal uppercase text-sm">— MARIA KUZNETSOVA, FOUNDER, LUMINA CLOTHING</cite>
            </blockquote>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28 bg-black text-white">
        <div className="container-lg text-center">
          <h2 className="text-3xl md:text-4xl font-light tracking-tighter mb-8">
            READY TO <span className="font-normal">EXPAND YOUR REACH?</span>
          </h2>
          <p className="max-w-2xl mx-auto mb-12 font-light text-gray-300 text-lg">
            Join ETAGE7 today and connect with professional buyers looking for brands like yours.
          </p>
          <Button className="bg-white text-black hover:bg-gray-100 py-6 px-10 text-base">
            JOIN AS A BRAND <ArrowRight className="ml-2 h-4 w-4" strokeWidth={1} />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default BrandsPage;
