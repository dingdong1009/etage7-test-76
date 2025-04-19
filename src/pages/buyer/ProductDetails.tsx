import { ArrowLeft, ChevronLeft, SquareArrowOutUpRight, BookmarkCheck, CalendarDays, Percent, Medal } from "lucide-react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";

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
      <div className="fixed top-0 left-0 right-0 z-40 border-gray-100 pl-8 pt-40">
        <div className="container py-1">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className=" font-normal uppercase text-sm flex items-center gap-2 bg-black border text-white hover:bg-gray-100 hover:text-black"
          >
            <ChevronLeft size={16} strokeWidth={1} />
            Back to Dashboard
          </Button>
        </div>
      </div>

      <div className="pt-1">
        <div className="flex flex-col lg:flex-row">
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

          <ScrollArea className="w-full lg:w-2/5 pl-8">
            <div className="lg:sticky lg:top-10">
              <h1 className="text-xl font-normal uppercase tracking-tighter">Product Name</h1>
              <p className="text-gray-500 mb-6">€2,400 / Wholesale price</p>

              <div className="mb-8">
                <h3 className="text-sm font-normal uppercase mb-2">Color</h3>
                <div className="flex gap-2">
                  <button className="w-6 h-6 rounded-full bg-black border-2 border-gray-300"></button>
                  <button className="w-6 h-6 rounded-full bg-[#8B4513] border-2 border-transparent"></button>
                  <button className="w-6 h-6 rounded-full bg-[#D3D3D3] border-2 border-transparent"></button>
                </div>
                <div className="mt-8">
                  <h3 className="text-sm font-normal uppercase mb-2">Size Guide</h3>
                  <Table className="border-y border-gray-100">
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-normal text-xs uppercase">IT/FR</TableCell>
                        <TableCell className="text-xs">36</TableCell>
                        <TableCell className="text-xs">38</TableCell>
                        <TableCell className="text-xs text-gray-200">40</TableCell>
                        <TableCell className="text-xs">42</TableCell>
                        <TableCell className="text-xs text-gray-200">44</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-normal text-xs uppercase">UK</TableCell>
                        <TableCell className="text-xs">4</TableCell>
                        <TableCell className="text-xs">6</TableCell>
                        <TableCell className="text-xs text-gray-200">8</TableCell>
                        <TableCell className="text-xs">10</TableCell>
                        <TableCell className="text-xs text-gray-200">12</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-normal text-xs uppercase">US</TableCell>
                        <TableCell className="text-xs ">2</TableCell>
                        <TableCell className="text-xs">4</TableCell>
                        <TableCell className="text-xs text-gray-200">6</TableCell>
                        <TableCell className="text-xs">8</TableCell>
                        <TableCell className="text-xs text-gray-200">10</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                <div className="my-12 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <BookmarkCheck className="h-6 w-6 text-black" />
                    <span className="text-xs uppercase">In Stock</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <CalendarDays className="h-6 w-6 text-gray-300" />
                    <span className="text-xs uppercase text-gray-300">Pre-Order</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Percent className="h-6 w-6 text-black" />
                    <span className="text-xs uppercase">Commission</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Medal className="h-6 w-6 text-gray-300" />
                    <span className="text-xs uppercase text-gray-300">Exclusivity</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <Button className="w-full bg-black hover:bg-gray-100 border hover:text-black hover:border text-white font-normal uppercase">
                  Start an Order
                </Button>
                <Button variant="outline" className="w-full border-gray-300 font-normal uppercase ">
                  Contact Brand
                </Button>
                <Button variant="outline" className="w-full border-gray-300 font-normal uppercase">
                  Request for Samples
                </Button>
              </div>

              <div className="border- pt-4">
                <p className="text-lg uppercase">Brand & CO Studio</p> 
                <p className="text-gray-700 my-2 font-normal text-sm">The production of the Prada Galleria bag blends industrial precision and the refined accuracy of craftsmanship that can only be performed by hand. The design of this style has a reinterpreted silhouette with an elegant, elongated shape. Giving rise to the definition of "timeless", the Galleria bag has become a hallmark of the Prada identity.</p>

                <div className="mt-6">
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-light text-xs uppercase py-2">Materials</TableCell>
                        <TableCell className="text-xs py-2">70% Silk, 30% Cotton</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-light text-xs uppercase py-2">Origin</TableCell>
                        <TableCell className="text-xs py-2">Italy</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-light text-xs uppercase py-2">Care Instructions</TableCell>
                        <TableCell className="text-xs py-2">Dry clean only</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-light text-xs uppercase py-2">Season</TableCell>
                        <TableCell className="text-xs py-2">Spring/Summer 2025</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-light text-xs uppercase py-2">Weight</TableCell>
                        <TableCell className="text-xs py-2">0.5 kg</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-light text-xs uppercase py-2">Dimensions</TableCell>
                        <TableCell className="text-xs py-2">30 x 20 x 10 cm</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-light text-xs uppercase py-2">Size Guide</TableCell>
                        <TableCell className="text-xs py-2">S (36), M (38), L (40)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-light text-xs uppercase py-2">Lead Time</TableCell>
                        <TableCell className="text-xs py-2">30 days</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-light text-xs uppercase py-2">MOQ</TableCell>
                        <TableCell className="text-xs py-2">20</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-light text-xs uppercase py-2 border-b">Bulk Pricing</TableCell>
                        <TableCell className="text-xs py-2 border-b">Yes</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
