
import React from "react";
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Store, Mail, Package } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ProductDetailsProps {
  isDialog?: boolean;
  onClose?: () => void;
  productId?: string;
}

const ProductDetails = ({ isDialog, onClose, productId }: ProductDetailsProps) => {
  const { productId: urlProductId } = useParams();
  const activeProductId = productId || urlProductId;
  const [quantity, setQuantity] = React.useState(1);
  const [isFollowing, setIsFollowing] = React.useState(false);

  // Mock product data - in a real app, this would come from an API
  const product = {
    id: activeProductId,
    name: "Sample Product",
    price: "€1,500",
    sku: "SKU123456",
    category: "Accessories",
    season: "Spring/Summer 2024",
    status: "In Stock",
    releaseDate: "2024-05-01",
    description: "Elegant and timeless design crafted with premium materials.",
    details: [
      "Made in Italy",
      "Height: 20 cm",
      "Width: 30 cm",
      "Depth: 15 cm",
      "Detachable shoulder strap",
      "Snap closure",
      "Metal hardware",
    ],
    materials: "Premium calf leather",
    images: [
      "300x400",
      "300x400",
      "300x400",
      "300x400",
      "300x400",
      "300x400",
    ],
    colors: ["Black", "White", "Navy"],
  };

  const content = (
    <div className="flex min-h-[80vh]">
      {/* Scrollable Image Section */}
      <div className="w-1/2 relative">
        <div className="absolute top-4 right-4 z-10">
          <Button 
            variant="outline" 
            size="icon" 
            className="bg-white/80 backdrop-blur-sm hover:bg-white"
            onClick={() => setIsFollowing(!isFollowing)}
          >
            <Heart 
              size={20} 
              className={isFollowing ? "fill-black" : ""}
            />
          </Button>
        </div>
        <div className="h-full overflow-y-auto scrollbar-none">
          {product.images.map((img, index) => (
            <div 
              key={index}
              className="aspect-[3/4] bg-gray-50 relative mb-2 last:mb-0"
            >
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                {img}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Content Section */}
      <div className="w-1/2 sticky top-0 h-screen overflow-y-auto px-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl font-light mb-2">{product.name}</h1>
            <p className="text-xl">{product.price}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button className="flex-1 bg-black hover:bg-gray-900">
              Add to Cart
            </Button>
            <Button variant="outline" className="flex gap-2" onClick={() => window.location.href="/brand-store"}>
              <Store size={20} />
              Visit Store
            </Button>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="flex-1 flex gap-2">
              <Mail size={20} />
              Contact Brand
            </Button>
            <Button variant="outline" className="flex-1 flex gap-2">
              <Package size={20} />
              Request Samples
            </Button>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="description">
              <AccordionTrigger className="text-sm uppercase tracking-wide">
                Description
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-sm leading-relaxed text-gray-600">
                  {product.description}
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="details">
              <AccordionTrigger className="text-sm uppercase tracking-wide">
                Details
              </AccordionTrigger>
              <AccordionContent>
                <ul className="text-sm space-y-2 text-gray-600">
                  {product.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="materials">
              <AccordionTrigger className="text-sm uppercase tracking-wide">
                Materials
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-gray-600">{product.materials}</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="specifications">
              <AccordionTrigger className="text-sm uppercase tracking-wide">
                Specifications
              </AccordionTrigger>
              <AccordionContent>
                <dl className="text-sm grid grid-cols-2 gap-2 text-gray-600">
                  <dt className="font-medium">SKU</dt>
                  <dd>{product.sku}</dd>
                  <dt className="font-medium">Category</dt>
                  <dd>{product.category}</dd>
                  <dt className="font-medium">Season</dt>
                  <dd>{product.season}</dd>
                  <dt className="font-medium">Status</dt>
                  <dd>{product.status}</dd>
                  <dt className="font-medium">Release Date</dt>
                  <dd>{product.releaseDate}</dd>
                </dl>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="colors">
              <AccordionTrigger className="text-sm uppercase tracking-wide">
                Available Colors
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className="w-8 h-8 border border-gray-200 hover:border-gray-400"
                    >
                      <span className="sr-only">{color}</span>
                    </button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );

  if (isDialog) {
    return (
      <DialogContent className="max-w-4xl h-[90vh] overflow-hidden p-0">
        {content}
      </DialogContent>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12">
      {content}
    </div>
  );
};

export default ProductDetails;
