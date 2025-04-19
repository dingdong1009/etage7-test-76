
import React from "react";
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Minus, Plus } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface ProductDetailsProps {
  isDialog?: boolean;
  onClose?: () => void;
  productId?: string;  // Make sure we accept productId as a prop
}

const ProductDetails = ({ isDialog, onClose, productId }: ProductDetailsProps) => {
  // Use either the passed-in productId or get it from URL params
  const { productId: urlProductId } = useParams();
  const activeProductId = productId || urlProductId;
  const [quantity, setQuantity] = React.useState(1);
  const [selectedImage, setSelectedImage] = React.useState(0);

  // Mock product data - in a real app, this would come from an API
  const product = {
    id: activeProductId,
    name: "Sample Product",
    price: "€1,500",
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
      "300x400", // Placeholder dimensions for demo
      "300x400",
      "300x400",
      "300x400",
    ],
    colors: ["Black", "White", "Navy"],
  };

  const incrementQuantity = () => setQuantity(prev => Math.min(prev + 1, 10));
  const decrementQuantity = () => setQuantity(prev => Math.max(prev - 1, 1));

  const content = (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
      <div className="space-y-4">
        <div className="aspect-[3/4] bg-gray-50 relative">
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
            {product.images[selectedImage]}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {product.images.map((img, index) => (
            <button
              key={index}
              className={`aspect-square bg-gray-50 relative ${
                selectedImage === index ? 'ring-1 ring-black' : ''
              }`}
              onClick={() => setSelectedImage(index)}
            >
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs">
                {img}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 lg:px-8 space-y-8">
        <div>
          <h1 className="text-2xl font-light mb-2">{product.name}</h1>
          <p className="text-xl">{product.price}</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm text-gray-600 uppercase">Color</p>
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
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray-600 uppercase">Quantity</p>
            <div className="flex items-center gap-4 w-32">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={decrementQuantity}
                disabled={quantity <= 1}
                className="h-8 w-8"
              >
                <Minus size={16} />
              </Button>
              <span className="flex-1 text-center">{quantity}</span>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={incrementQuantity}
                disabled={quantity >= 10}
                className="h-8 w-8"
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button className="flex-1 bg-black hover:bg-gray-900">
              Add to Cart
            </Button>
            <Button variant="outline" size="icon">
              <Heart size={20} />
            </Button>
          </div>
        </div>

        <div className="space-y-8 pt-8 border-t">
          <div>
            <h2 className="text-sm uppercase tracking-wide mb-4">Description</h2>
            <p className="text-sm leading-relaxed text-gray-600">
              {product.description}
            </p>
          </div>

          <div>
            <h2 className="text-sm uppercase tracking-wide mb-4">Details</h2>
            <ul className="text-sm space-y-2 text-gray-600">
              {product.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm uppercase tracking-wide mb-4">Materials</h2>
            <p className="text-sm text-gray-600">{product.materials}</p>
          </div>
        </div>
      </div>
    </div>
  );

  if (isDialog) {
    return (
      <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto">
        {content}
      </DialogContent>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {content}
    </div>
  );
};

export default ProductDetails;
