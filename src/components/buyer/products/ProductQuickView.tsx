
import { useState } from "react";
import { X, ChevronRight, ChevronLeft, Heart, Share2, ShoppingBag } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Product, ColorOption } from "@/types/product";

interface ProductQuickViewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
  colorOptions: ColorOption[];
}

export const ProductQuickView = ({ 
  open, 
  onOpenChange, 
  product, 
  colorOptions 
}: ProductQuickViewProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  if (!product) return null;
  
  // Placeholder images for demo
  const productImages = [
    product.imageUrl || "https://via.placeholder.com/600x800?text=Product+Image",
    ...(product.additionalImages || [
      "https://via.placeholder.com/600x800?text=Additional+Image+1",
      "https://via.placeholder.com/600x800?text=Additional+Image+2"
    ])
  ];

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => 
      prev === 0 ? productImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => 
      prev === productImages.length - 1 ? 0 : prev + 1
    );
  };

  const colorHex = colorOptions.find(c => c.name === product.color)?.hex || "#000000";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl p-0 rounded-none border border-gray-200 overflow-hidden">
        <div className="relative flex flex-col lg:flex-row w-full h-full">
          {/* Product Image */}
          <div className="w-full lg:w-3/5 bg-gray-50 relative">
            <div className="relative aspect-[3/4] w-full">
              <img 
                src={productImages[currentImageIndex]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              {/* Image navigation */}
              <div className="absolute inset-0 flex justify-between items-center px-4">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-10 w-10 rounded-full bg-white/80 hover:bg-white" 
                  onClick={handlePrevImage}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-10 w-10 rounded-full bg-white/80 hover:bg-white" 
                  onClick={handleNextImage}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>
              
              {/* Image pagination indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {productImages.map((_, i) => (
                  <button 
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === currentImageIndex ? 'bg-black' : 'bg-gray-400'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(i);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Product Details */}
          <div className="w-full lg:w-2/5 p-6 flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-light mb-1">{product.name}</h2>
                <p className="text-sm text-gray-500 font-light">{product.sku}</p>
              </div>
              <DialogClose className="h-8 w-8 flex items-center justify-center">
                <X className="h-4 w-4" />
              </DialogClose>
            </div>
            
            <div className="mb-6">
              <div className="text-2xl font-light mb-1">${product.price.toFixed(2)}</div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm font-light">Color:</span>
                <div className="flex items-center gap-2">
                  <div 
                    className="h-4 w-4 rounded-full" 
                    style={{ backgroundColor: colorHex }} 
                  />
                  <span className="text-sm">{product.color}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 font-light">{product.description}</p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <span className="text-sm font-light block mb-1">Category:</span>
                <span className="text-sm">{product.category}</span>
              </div>
              <div>
                <span className="text-sm font-light block mb-1">Season:</span>
                <span className="text-sm">{product.season}</span>
              </div>
              <div>
                <span className="text-sm font-light block mb-1">Materials:</span>
                <span className="text-sm">{product.materials}</span>
              </div>
              <div>
                <span className="text-sm font-light block mb-1">Release Date:</span>
                <span className="text-sm">
                  {new Date(product.releaseDate).toLocaleDateString()}
                </span>
              </div>
            </div>
            
            <div className="mt-auto space-y-4">
              <Button className="w-full bg-black text-white hover:bg-gray-800">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Order Sample
              </Button>
              
              <div className="flex gap-4">
                <Button variant="outline" className="flex-1 border-gray-200">
                  <Heart className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" className="flex-1 border-gray-200">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
