import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Check, ChevronDown, ChevronUp, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PricingTable, PricingPlan } from "@/components/PricingTable";
const Index = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [showBuyerInfo, setShowBuyerInfo] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isBuyerAnimating, setIsBuyerAnimating] = useState(false);
  const brandContentRef = useRef<HTMLDivElement>(null);
  const buyerContentRef = useRef<HTMLDivElement>(null);
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
    features: ["6 months unlimited access", "Individual newsletter to all buyers (1X)", "Promotion on social media (1X)", "Advanced tools to manage products", "And many other features"],
    buttonText: "Subscribe 6-Month",
    highlight: false
  }, {
    name: "12-MONTH",
    price: "₽ 270'000",
    features: ["All of 6-Month package", "Save ₽ 70'000"],
    buttonText: "Subscribe 12-Month",
    highlight: true
  }];
  const togglePricing = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    if (!showPricing) {
      if (brandContentRef.current) {
        brandContentRef.current.classList.add('animate-slide-out-left');
        setTimeout(() => {
          setShowPricing(true);
          setTimeout(() => {
            if (brandContentRef.current) {
              brandContentRef.current.classList.remove('animate-slide-out-left');
              brandContentRef.current.classList.add('animate-slide-in-right');
              setTimeout(() => {
                if (brandContentRef.current) {
                  brandContentRef.current.classList.remove('animate-slide-in-right');
                  setIsAnimating(false);
                }
              }, 500);
            }
          }, 500);
        }, 500);
      }
    } else {
      if (brandContentRef.current) {
        brandContentRef.current.classList.add('animate-slide-out-right');
        setTimeout(() => {
          setShowPricing(false);
          setTimeout(() => {
            if (brandContentRef.current) {
              brandContentRef.current.classList.remove('animate-slide-out-right');
              brandContentRef.current.classList.add('animate-slide-in-left');
              setTimeout(() => {
                if (brandContentRef.current) {
                  brandContentRef.current.classList.remove('animate-slide-in-left');
                  setIsAnimating(false);
                }
              }, 500);
            }
          }, 50);
        }, 500);
      }
    }
  };
  const toggleBuyerInfo = () => {
    if (isBuyerAnimating) return;
    setIsBuyerAnimating(true);
    if (!showBuyerInfo) {
      if (buyerContentRef.current) {
        buyerContentRef.current.classList.add('animate-slide-out-left');
        setTimeout(() => {
          setShowBuyerInfo(true);
          setTimeout(() => {
            if (buyerContentRef.current) {
              buyerContentRef.current.classList.remove('animate-slide-out-left');
              buyerContentRef.current.classList.add('animate-slide-in-right');
              setTimeout(() => {
                if (buyerContentRef.current) {
                  buyerContentRef.current.classList.remove('animate-slide-in-right');
                  setIsBuyerAnimating(false);
                }
              }, 500);
            }
          }, 500);
        }, 500);
      }
    } else {
      if (buyerContentRef.current) {
        buyerContentRef.current.classList.add('animate-slide-out-right');
        setTimeout(() => {
          setShowBuyerInfo(false);
          setTimeout(() => {
            if (buyerContentRef.current) {
              buyerContentRef.current.classList.remove('animate-slide-out-right');
              buyerContentRef.current.classList.add('animate-slide-in-left');
              setTimeout(() => {
                if (buyerContentRef.current) {
                  buyerContentRef.current.classList.remove('animate-slide-in-left');
                  setIsBuyerAnimating(false);
                }
              }, 500);
            }
          }, 50);
        }, 500);
      }
    }
  };
  return <div className="w-full">
      <section id="hero" className="relative h-screen bg-black text-white flex items-center">
        <div className="container-lg">
          <div className="max-w-3xl">
            <h1 className="text-4xl uppercase md:text-5xl lg:text-7xl font-light tracking-tighter mb-6">
            Celebrate<br />
              <span className="font-normal">craftmanship's most meaningful alliances</span>
            </h1>
            <p className="text-lg md:text-xl font-light text-gray-300 mb-12 max-w-2xl">
            ÉTAGE7 was born from passion for the stories and the dreams woven into every design, where creativity meets opportunity. We have built a house to celebrate artistry and craftmanship. And we believe every collaboration could become your next masterpiece.
            </p>
          </div> 
        </div>
        
        <button onClick={() => scrollToSection('brand')} className={`absolute left-1/2 -translate-x-1/2 bottom-10 p-3 transition-opacity duration-500 flex flex-col items-center ${scrolled ? 'opacity-0' : 'opacity-100'}`} aria-label="Scroll to learn more">
          <span className="text-sm mb-2 text-grey animate-bounce">For Brands</span> 
          <ChevronDown size={24} className="animate-bounce" />
        </button>
      </section>

      <section id="brand" className="relative h-screen bg-white text-black flex items-center overflow-hidden">
        <div className="container-lg">
          <div className="max-w-3xl" ref={brandContentRef}>
            {!showPricing ? <>
                <p className="text-lg md:text-xl font-light bg-black text-white mb-12 max-w-2xl uppercase pl-4">For Brands</p>
                <h1 className="text-4xl md:text-5xl uppercase lg:text-7xl font-light tracking-tighter mb-6">
                  Celebrate<br />
                  <span className="font-normal uppercase">uniqueness & opportunities</span>
                </h1>
                
                <p className="text-lg md:text-xl font-light text-black-100 mb-12 max-w-2xl">
                  Your designs are more than collections—they are chapters of a story waiting to be shared. At ETAGE7, we celebrate your creativity by providing you essential tools that empowers your products finding their places in the heart of those who value your craftmanship.
                </p>
                
                <div className="mb-12">
                  <Button onClick={togglePricing} disabled={isAnimating} className="bg-black text-white border-0 hover:bg-gray-800 text-base py-6 px-8">
                  Discover Pricing 
                  <ChevronRight className={`ml-2 h-5 w-5 transform transition-transform duration-500 ${showPricing ? 'rotate-90' : ''}`} />
                  </Button>
                </div>
              </> : <div>
                <div className="mb-12">
                <p className="text-lg md:text-xl font-light bg-black text-white mb-12 max-w-2xl uppercase pl-4">Pricing</p>

                  <button onClick={togglePricing} disabled={isAnimating} className="flex items-center text-lg md:text-xl font-light hover:underline transition-all focus:outline-none mb-8">
                    <ChevronRight className={`ml-2 h-5 w-5 transform rotate-180 transition-transform duration-300`} /> BACK
                  </button>
                   
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
                    {pricingPlans.map((plan, index) => <PricingTable key={index} plan={plan} />)}
                  </div>
                </div>
              </div>} 
          </div>
        </div>
        <button onClick={() => scrollToSection('buyer')} className={`absolute left-1/2 -translate-x-1/2 bottom-10 p-3 transition-opacity duration-500 flex flex-col items-center ${scrolled ? 'opacity-100' : 'opacity-0'}`} aria-label="Scroll to learn more">
          <span className="text-sm mb-2 text-black animate-bounce">For Buyers</span>
          <ChevronDown size={24} className="text-black animate-bounce" />
        </button> 
      </section>

      <section id="buyer" className="relative h-screen bg-white text-black flex items-center overflow-hidden">
        <div className="container-lg">
          <div className="max-w-3xl" ref={buyerContentRef}>
            {!showBuyerInfo ? <>
                <p className="text-lg md:text-xl font-light bg-black text-white mb-12 max-w-2xl uppercase pl-4">For Buyers</p>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-light uppercase tracking-tighter mb-6">
                  Discover<br />
                  <span className="font-normal uppercase">the extraordinary</span>
                </h1>
                
                <p className="text-lg md:text-xl font-light text-black-100 mb-12 max-w-2xl animate-fade-in">
                  As a tastemaker, you seek the exceptional—designs that captivate and inspire. ETAGE7 is your gateway to a curated world of fashion's finest, where every brand is chosen for its story and soul. Explore collections with intuitive tools, connect effortlessly with creators, and build partnerships that redefine your offerings. From exclusive events to personalized recommendations, we empower you to discover the next iconic name in fashion with elegance and ease.
                </p>
                
                <Button onClick={toggleBuyerInfo} className="bg-black text-white border-0 hover:bg-gray-800 text-base py-6 px-8">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" strokeWidth={1} />
                </Button>
              </> : <div>
                <div className="mb-12">
                  <p className="text-lg md:text-xl font-light bg-black text-white mb-12 max-w-2xl uppercase pl-4">For Buyers</p>
                  
                  <button onClick={toggleBuyerInfo} disabled={isBuyerAnimating} className="flex items-center text-lg md:text-xl font-light hover:underline transition-all focus:outline-none mb-8">
                    <ChevronRight className={`ml-2 h-5 w-5 transform rotate-180 transition-transform duration-300`} /> BACK
                  </button>
                  
                  <div className="max-w-3xl">
                    <p className="text-lg md:text-xl font-light text-black-100 mb-12 max-w-2xl">
                    ÉTAGE7 represents aspirational premium and luxury brands, catering to a discerning clientele who value rarity and prestige and maintain an aura of exclusivity.</p>
                    <ul className="space-y-4 mb-8 flex-grow">
                    <li className="flex items-start">
                      <div className="mr-3 mt-1 space-y-2">
                      <Check size={16} strokeWidth={1} /> 
                      <Check size={16} strokeWidth={1} />  
                      <Check size={16} strokeWidth={1} /> 
                      <Check size={16} strokeWidth={1} /> 
                      <Check size={16} strokeWidth={1} /> 
                      </div>
                      <span className="font-light">Access to categories Woman, Man, Kids, Home, and Beatuty
                      <p>Access exclusive brands and products</p>
                      <p>AI powered search to find perfect match</p>
                      <p>Receive alerts when new brands are added</p>
                      <p>Invitation to Premiere pop-up showroom</p>
                      <p>Possibility to manage orders directly from the platform</p>
                      </span>
                    </li>
                    </ul>
                    <Button asChild className="bg-black text-white border-0 hover:bg-gray-800 text-base py-6 px-8">
                      <Link to="/curated">
                        Discover Our Brands <ArrowRight className="ml-2 h-4 w-4" strokeWidth={1} />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>}
          </div>
        </div>
        
        <button onClick={() => scrollToSection('platform')} className={`absolute left-1/2 -translate-x-1/2 bottom-10 p-3 transition-opacity duration-500 flex flex-col items-center ${scrolled ? 'opacity-100' : 'opacity-0'}`} aria-label="Scroll to learn more">
          <span className="text-sm mb-2 text-black animate-bounce">Discover The Platform</span>
          <ChevronDown size={24} className="text-black animate-bounce" />
        </button> 
      </section>

      <section id="platform" className="relative h-screen bg-white text-black flex items-center">
        <div className="container-lg">
          <div className="max-w-3xl">
          <p className="text-lg md:text-xl font-light bg-black text-white mb-12 max-w-2xl uppercase">The Platform</p>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tighter uppercase mb-6">
              Begin<br />
              <span className="font-normal uppercase">your journey</span>
            </h1>
            <p className="text-lg md:text-xl font-light text-black-100 mb-12 max-w-2xl">ÉTAGE7 is more than a platform—it embraces to honor your place in fashion's story. With a seamless interface as intuitive as a perfectly cut dress, either you are wholesalers, professional buyers, or multi-brand showroom owners, we invite you to join a movement where every connection is a work of art. We've combined technology with a creative touch to provide curated matches,. Register today and become part of a community that cherishes the beauty of design.</p>
          </div>
        </div> 
        
        <button onClick={() => scrollToSection('services')} className={`absolute left-1/2 -translate-x-1/2 bottom-10 p-3 transition-opacity duration-500 flex flex-col items-center ${scrolled ? 'opacity-100' : 'opacity-0'}`} aria-label="Scroll to learn more">
          <span className="text-sm mb-2 text-black animate-bounce">Consulting Services</span>
          <ChevronDown size={24} className="text-black animate-bounce" /> 
        </button> 
      </section> 

      <section id="services" className="relative h-screen bg-white text-black flex items-center">
        <div className="container-lg">
          <div className="max-w-3xl">
          <p className="text-lg md:text-xl font-light bg-black text-white mb-12 max-w-2xl uppercase">Consulting Services</p>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tighter mb-6">
              CONNECTING<br />
              <span className="font-normal">FASHION BRANDS & BUYERS</span> 
            </h1>
            <p className="text-lg md:text-xl font-light text-black-100 mb-12 max-w-2xl">ETAGE7 offers tailored consulting services (excluded from the subscriptions plan) for both brands and buyers to help navigate the dynamic fashion industry on topics such as: Brand Identity Development, Collection Development Consulting, Marketing &amp; Campaign Strategy, Trend-Based Buying Guidance, etc. Start the conversation with our team of experts and see how we can help.</p>
          </div>
        </div> 
        
        <button onClick={() => scrollToSection('hero')} className={`absolute left-1/2 -translate-x-1/2 bottom-10 p-3 transition-opacity duration-500 flex flex-col items-center ${scrolled ? 'opacity-100' : 'opacity-0'}`} aria-label="Scroll to learn more">
          <span className="text-sm mb-2 text-black animate-bounce">Navigate Back Up</span>
          <ChevronUp size={24} className="text-black animate-bounce" />
        </button> 
      </section>

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