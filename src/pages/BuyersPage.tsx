
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const BuyersPage = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-black text-white py-24 px-4">
        <div className="max-w-[1481px] mx-auto">
          <h1 className="text-3xl md:text-5xl lg:text-7xl uppercase font-thin mb-6">
            DISCOVER THE <br/>
            <span className="font-normal">PERFECT BRANDS</span>
          </h1>
          <p className="max-w-2xl text-lg font-light mb-8">
            Access a curated selection of fashion brands that match your store's aesthetic, customer base, and price points.
          </p>
          <Button className="bg-white text-black hover:bg-gray-100 border-0">
            JOIN AS A BUYER <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Market Context Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-[1481px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="bg-gray-100 h-[400px] flex items-center justify-center order-2 md:order-1">
              <p className="text-center text-gray-400">Buyer Image Placeholder</p>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-2xl md:text-4xl lg:text-5xl uppercase font-thin mb-6">
                THE <span className="font-normal">CHALLENGE</span>
              </h2>
              <p className="mb-6 font-light text-gray-700">
                Professional buyers face significant hurdles in today's fast-evolving fashion landscape:
              </p>
              <ul className="space-y-6 mb-8">
                <li className="flex items-start">
                  <span className="text-gray-400 mr-4 font-bold">01.</span>
                  <span className="text-gray-800">Time-consuming search for new and innovative brands</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-400 mr-4 font-bold">02.</span>
                  <span className="text-gray-800">Limited access to emerging designers and niche brands</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-400 mr-4 font-bold">03.</span>
                  <span className="text-gray-800">Difficulty in assessing brand reliability and product quality</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-400 mr-4 font-bold">04.</span>
                  <span className="text-gray-800">High costs associated with attending multiple trade shows</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 md:py-24 bg-gray-50 px-4">
        <div className="max-w-[1481px] mx-auto">
          <h2 className="text-2xl md:text-4xl lg:text-5xl uppercase font-thin mb-12 text-center">
            WHY <span className="font-normal">ETAGE7</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 md:p-12 border border-gray-100">
              <h3 className="text-lg uppercase font-normal mb-4">AI-POWERED CURATION</h3>
              <p className="text-gray-600 font-light">
                Our AI technology analyzes your store profile and preferences to recommend brands that perfectly match your needs.
              </p>
            </div>
            
            <div className="bg-white p-8 md:p-12 border border-gray-100">
              <h3 className="text-lg uppercase font-normal mb-4">VERIFIED BRANDS</h3>
              <p className="text-gray-600 font-light">
                All brands on our platform undergo a thorough verification process, ensuring quality, reliability, and ethical standards.
              </p>
            </div>
            
            <div className="bg-white p-8 md:p-12 border border-gray-100">
              <h3 className="text-lg uppercase font-normal mb-4">STREAMLINED PROCESS</h3>
              <p className="text-gray-600 font-light">
                Connect directly with brand representatives, request samples, and negotiate terms all in one platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-[1481px] mx-auto">
          <h2 className="text-2xl md:text-4xl lg:text-5xl uppercase font-thin mb-12 text-center">
            MEMBERSHIP <span className="font-normal">BENEFITS</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl md:text-3xl font-normal tracking-tighter mb-6">FOR BUYERS</h3>
              <ul className="space-y-4 mb-10">
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
            <div className="bg-gray-50 p-8 border border-gray-100">
              <h3 className="uppercase font-normal text-xl mb-6">JOIN FOR FREE</h3>
              <p className="font-light text-gray-700 mb-6">
                As a professional buyer, you get complimentary access to our platform, connecting you with brands that match your specific needs.
              </p>
              <Button className="bg-black text-white hover:bg-gray-800">
                APPLY NOW <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-gray-50 px-4">
        <div className="max-w-[1481px] mx-auto">
          <h2 className="text-2xl md:text-4xl lg:text-5xl uppercase font-thin mb-12 text-center">
            BUYER <span className="font-normal">TESTIMONIALS</span>
          </h2>
          
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
      <section className="py-16 md:py-24 bg-black text-white px-4">
        <div className="max-w-[1481px] mx-auto text-center">
          <h2 className="text-2xl md:text-4xl lg:text-5xl uppercase font-thin mb-6">
            START <span className="font-normal">DISCOVERING</span>
          </h2>
          <p className="max-w-2xl mx-auto mb-8 font-light text-gray-300">
            Join ETAGE7 today and revolutionize how you source new brands for your store.
          </p>
          <Button className="bg-white text-black hover:bg-gray-100">
            JOIN AS A BUYER <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default BuyersPage;
