import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ScrollArea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ProductDetails = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Back Navigation */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-100 pt-28">
        <div className="container py-1">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="text-sm flex items-center gap-2 bg-black text-white hover:bg-gray-200 hover:text-black"
          >
            <ArrowLeft size={16} strokeWidth={1} />
            Back to Dashboard
          </Button>
        </div>
      </div>

      <div className="pt-1">
        <div className="flex flex-col lg:flex-row">
          {/* Image Section */}
          <ScrollArea className="w-full lg:w-3/5 h-screen">
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

          {/* Product Info Section */}
          <ScrollArea className="w-full lg:w-2/5 p-8 lg:p-12">
            <div className="lg:sticky lg:top-16">
              <h1 className="text-2xl font-light mb-2">Product Name</h1>
              <p className="text-gray-500 mb-6">€2,400</p>

              {/* Color Selection */}
              <div className="mb-8">
                <h3 className="text-sm uppercase mb-4">Color</h3>
                <div className="flex gap-2">
                  <button className="w-6 h-6 rounded-full bg-black border-2 border-gray-300"></button>
                  <button className="w-6 h-6 rounded-full bg-[#8B4513] border-2 border-transparent"></button>
                  <button className="w-6 h-6 rounded-full bg-[#D3D3D3] border-2 border-transparent"></button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 mb-8">
                <Button className="w-full bg-black text-white hover:bg-gray-900">
                  Contact Brand
                </Button>
                <Button variant="outline" className="w-full border-gray-300">
                  Request Samples
                </Button>
                <Button variant="outline" className="w-full border-gray-300">
                  Visit Store
                </Button>
              </div>

              {/* Product Details Accordion */}
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="description" className="border-t border-gray-200">
                  <AccordionTrigger className="text-sm hover:no-underline">
                    Description
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600">
                    This iconic bag is made of fine leather and features the brand's signature details.
                    Perfect for everyday use, it combines elegance with functionality.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="details" className="border-t border-gray-200">
                  <AccordionTrigger className="text-sm hover:no-underline">
                    Product Details
                  </AccordionTrigger>
                  <AccordionContent className="text-sm">
                    <ul className="space-y-2 text-gray-600">
                      <li>Material: Premium leather</li>
                      <li>Dimensions: W36 x H24 x D17 cm</li>
                      <li>Made in Italy</li>
                      <li>Style ID: 1BA457_2CYS_F0009</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="shipping" className="border-t border-gray-200">
                  <AccordionTrigger className="text-sm hover:no-underline">
                    Shipping & Returns
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600">
                    Free shipping worldwide. Returns accepted within 14 days of delivery.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
