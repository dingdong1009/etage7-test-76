
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const BrandsPage = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-black text-white py-24 px-4">
        <div className="max-w-[1481px] mx-auto">
          <h1 className="text-3xl md:text-5xl uppercase font-thin mb-6">
            EXPAND YOUR BRAND'S <br/>
            <span className="font-normal">GLOBAL REACH</span>
          </h1>
          <p className="max-w-2xl text-lg font-light mb-8">
            Connect with professional buyers from around the world and grow your fashion brand's presence in key markets.
          </p>
          <Button className="bg-white text-black border-0 hover:bg-gray-100">
            JOIN AS A BRAND <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Market Context Section */}
      <section className="py-16 px-4">
        <div className="max-w-[1481px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-4xl uppercase font-thin mb-6">
                THE <span className="font-normal">CHALLENGE</span>
              </h2>
              <p className="mb-4 font-light">
                In today's saturated fashion market, brands face unprecedented challenges:
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <span className="mr-2 font-bold">01.</span>
                  <span>Difficulty accessing international buyers and new markets</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 font-bold">02.</span>
                  <span>High costs of traditional sales channels and trade shows</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 font-bold">03.</span>
                  <span>Limited visibility among key decision-makers</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 font-bold">04.</span>
                  <span>Complex market entry requirements and local regulations</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-100 h-[400px] flex items-center justify-center">
              <p className="text-center text-gray-400">Brand Image Placeholder</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-[1481px] mx-auto">
          <h2 className="text-2xl md:text-4xl uppercase font-thin mb-12 text-center">
            WHY <span className="font-normal">ETAGE7</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 border border-gray-200">
              <h3 className="uppercase font-normal text-xl mb-4">DIRECT ACCESS</h3>
              <p className="font-light">
                Connect directly with professional buyers from department stores, boutiques, and online retailers across key global markets.
              </p>
            </div>
            
            <div className="bg-white p-8 border border-gray-200">
              <h3 className="uppercase font-normal text-xl mb-4">AI MATCHMAKING</h3>
              <p className="font-light">
                Our AI-powered platform matches your brand with buyers who specifically look for your aesthetic, price point, and product category.
              </p>
            </div>
            
            <div className="bg-white p-8 border border-gray-200">
              <h3 className="uppercase font-normal text-xl mb-4">MARKET INSIGHTS</h3>
              <p className="font-light">
                Gain valuable data on market trends, buyer preferences, and competitive landscape to inform your strategy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Section */}
      <section className="py-16 px-4">
        <div className="max-w-[1481px] mx-auto">
          <h2 className="text-2xl md:text-4xl uppercase font-thin mb-8 text-center">
            MEMBERSHIP <span className="font-normal">OPTIONS</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="border border-gray-200 p-8">
              <h3 className="uppercase font-normal text-xl mb-2">6-MONTH ACCESS</h3>
              <p className="text-2xl font-light mb-6">170,000 ₽</p>
              <ul className="space-y-3 mb-8">
                <li className="font-light">Full platform access</li>
                <li className="font-light">Direct messaging with buyers</li>
                <li className="font-light">Brand profile customization</li>
                <li className="font-light">Basic analytics dashboard</li>
              </ul>
              <Button className="w-full bg-black text-white hover:bg-gray-800">
                SELECT PLAN
              </Button>
            </div>
            
            <div className="border border-black p-8 bg-black text-white">
              <h3 className="uppercase font-normal text-xl mb-2">12-MONTH ACCESS</h3>
              <p className="text-2xl font-light mb-6">280,000 ₽</p>
              <ul className="space-y-3 mb-8">
                <li className="font-light">All features from 6-month plan</li>
                <li className="font-light">Priority listing in search results</li>
                <li className="font-light">Advanced market analytics</li>
                <li className="font-light">Consultation session (2 hours)</li>
              </ul>
              <Button className="w-full bg-white text-black hover:bg-gray-100">
                SELECT PLAN
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-[1481px] mx-auto">
          <h2 className="text-2xl md:text-4xl uppercase font-thin mb-12 text-center">
            SUCCESS <span className="font-normal">STORIES</span>
          </h2>
          
          <div className="max-w-3xl mx-auto">
            <blockquote className="text-center mb-8">
              <p className="text-xl font-light italic mb-6">
                "ETAGE7 opened doors to boutiques in markets we had never accessed before. Within three months, we secured partnerships with five new retailers."
              </p>
              <cite className="font-normal uppercase">— MARIA KUZNETSOVA, FOUNDER, LUMINA CLOTHING</cite>
            </blockquote>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-[1481px] mx-auto text-center">
          <h2 className="text-2xl md:text-4xl uppercase font-thin mb-6">
            READY TO <span className="font-normal">EXPAND YOUR REACH?</span>
          </h2>
          <p className="max-w-2xl mx-auto mb-8 font-light">
            Join ETAGE7 today and connect with professional buyers looking for brands like yours.
          </p>
          <Button className="bg-black text-white hover:bg-gray-800">
            JOIN AS A BRAND <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default BrandsPage;
