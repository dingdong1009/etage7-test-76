
import { ArrowLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ScrollArea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollIndicator } from "@/components/ScrollIndicator";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useRef } from "react";

const ProductDetails = () => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const currentIndex = useScrollProgress(scrollRef);

  const scrollToImage = (index: number) => {
    if (scrollRef.current) {
      const itemHeight = scrollRef.current.scrollHeight / 5;
      scrollRef.current.scrollTo({
        top: itemHeight * index,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Back Navigation */}
      <div className="fixed top-0 left-0 right-0 z-40 border-gray-100 pl-8 pt-40">
        <div className="container py-1">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className=" font-normal uppercase text-sm flex items-center gap-2 bg-gray-100 text-black hover:bg-black hover:text-white"
          >
            <ArrowLeft size={16} strokeWidth={1} />
            Back to Dashboard
          </Button>
        </div>
      </div>

      <div className="pt-1">
        <div className="flex flex-col lg:flex-row">
          {/* Image Section */}
          <div className="relative w-full lg:w-3/5">
            <ScrollArea ref={scrollRef} className="h-screen">
              <div className="space-y-1">
                {[1, 2, 3, 4, 5].map((index) => (
                  <div 
                    key={index}
                    className="aspect-[3/4] bg-gray-50 flex items-center justify-center"
                  >
                    <span className="text-gray-400 text-sm">Product Image {index}</span>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <ScrollIndicator 
              totalItems={5}
              currentIndex={currentIndex}
              onBubbleClick={scrollToImage}
              className="pl-20 top-1/2 transform -translate-y-1/2"
            />
          </div>

          {/* Product Info Section */}
          <ScrollArea className="w-full lg:w-2/5 pl-8">
            <div className="lg:sticky lg:top-1">
              <h1 className="text-xl font-normal uppercase tracking-tighter">Product Name</h1>
              <p className="text-gray-500 mb-6">€2,400</p>

              {/* Color Selection */}
              <div className="mb-8">
                <h3 className="text-sm uppercase mb-4">Color</h3>
                <div className="flex gap-2">
                  <button className="w-6 h-6 rounded-full bg-black border-2 border-gray-300"></button>
                  <button className="w-6 h-6 rounded-full bg-[#8B4513] border-2 border-transparent"></button>
                  <button className="w-6 h-6 rounded-full bg-[#D3D3D3] border-2 border-transparent"></button>
                </div>
                <div className="mt-8">ready to order</div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 mb-8">
                <Button className="w-full bg-black hover:bg-gray-100 border hover:text-black hover:border text-white font-normal uppercase">
                  Contact Brand
                </Button>
                <Button variant="outline" className="w-full border-gray-300 font-normal uppercase ">
                  Request Samples
                </Button>
                <Button variant="outline" className="w-full border-gray-300 font-normal uppercase">
                  Visit Store
                </Button>
              </div>

              {/* Product Details Accordion */}
            <div className="border-t pt-4">
              <p className="text-lg uppercase">Brand & CO Studio </p>
              <p className="text-gray-700 my-2 font-normal text-sm">The production of the Prada Galleria bag blends industrial precision and the refined accuracy of craftsmanship that can only be performed by hand. The design of this style has a reinterpreted silhouette with an elegant, elongated shape. Giving rise to the definition of “timeless”, the Galleria bag has become a hallmark of the Prada identity.</p>

            </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
