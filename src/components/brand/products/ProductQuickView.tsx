
import { useState } from "react";
import { X, ArrowLeft, ArrowRight } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Product, ColorOption } from "../../../types/product";

interface ProductQuickViewProps {
  product: Product;
  colorOptions: ColorOption[];
  open: boolean;
  onClose: () => void;
}

export const ProductQuickView = ({
  product,
  colorOptions,
  open,
  onClose
}: ProductQuickViewProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Mock images for demonstration purposes
  const productImages = product.images || [
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg"
  ];

  const handlePrevImage = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? productImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prev => 
      prev === productImages.length - 1 ? 0 : prev + 1
    );
  };

  const colorHex = colorOptions.find(c => c.name === product.color)?.hex || "#000000";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 rounded-none border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image Section */}
          <div className="relative bg-gray-50 flex items-center justify-center h-[500px]">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-4 right-4 h-8 w-8 bg-white/80 hover:bg-white z-10"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
            
            <img 
              src={productImages[currentImageIndex]} 
              alt={product.name} 
              className="max-h-full max-w-full object-contain"
            />
            
            {productImages.length > 1 && (
              <>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 bg-white/80 hover:bg-white"
                  onClick={handlePrevImage}
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 bg-white/80 hover:bg-white"
                  onClick={handleNextImage}
                >
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </>
            )}
            
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {productImages.map((_, idx) => (
                <button 
                  key={idx}
                  className={`h-2 w-2 rounded-full ${
                    idx === currentImageIndex ? 'bg-black' : 'bg-gray-300'
                  }`}
                  onClick={() => setCurrentImageIndex(idx)}
                />
              ))}
            </div>
          </div>
          
          {/* Product Info Section */}
          <div className="p-8 flex flex-col">
            <div className="flex-1">
              <h2 className="text-2xl font-light tracking-tighter uppercase mb-2">{product.name}</h2>
              <div className="flex items-center gap-2 mb-4">
                <p className="text-xs font-light text-gray-500">SKU: {product.sku}</p>
                <span className="text-gray-300">|</span>
                <p className="text-xs font-light text-gray-500">{product.category}</p>
              </div>
              
              <div className="mb-6">
                <p className="text-xl font-light mb-2">${product.price.toFixed(2)}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div 
                    className="h-4 w-4 rounded-full" 
                    style={{ backgroundColor: colorHex }} 
                  />
                  <span className="text-sm font-light">{product.color}</span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mb-6">
                <h3 className="text-sm font-medium uppercase mb-2">Description</h3>
                <p className="text-sm font-light text-gray-700">{product.description}</p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-sm font-medium uppercase mb-2">Materials</h3>
                <p className="text-sm font-light text-gray-700">{product.materials}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-xs font-medium uppercase mb-1">Season</h3>
                  <p className="text-sm font-light">{product.season}</p>
                </div>
                <div>
                  <h3 className="text-xs font-medium uppercase mb-1">Status</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {product.status === 'active' ? 'Active' : 'Draft'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 border-t border-gray-200 pt-4">
              <Button className="w-full bg-black hover:bg-gray-800 text-white" size="lg">
                View Full Details
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
