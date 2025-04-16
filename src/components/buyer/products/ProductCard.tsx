
import { useState } from "react";
import { Eye, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product, ColorOption } from "@/types/product";

interface ProductCardProps {
  product: Product;
  colorOptions: ColorOption[];
  onQuickView: (product: Product) => void;
}

export const ProductCard = ({ product, colorOptions, onQuickView }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const colorHex = colorOptions.find(c => c.name === product.color)?.hex || "#000000";
  
  // Placeholder image
  const imageUrl = product.imageUrl || "https://via.placeholder.com/300x400?text=Product+Image";

  return (
    <div 
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="aspect-[3/4] w-full overflow-hidden bg-gray-100">
        <img
          src={imageUrl}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      
      {/* Quick View Button - Appears on Hover */}
      <div className={`absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'} pointer-events-none`}>
        <Button 
          variant="secondary" 
          className="pointer-events-auto bg-white hover:bg-gray-100"
          onClick={() => onQuickView(product)}
        >
          <Eye className="h-4 w-4 mr-2" />
          Quick View
        </Button>
      </div>
      
      {/* Wishlist Button */}
      <Button 
        variant="ghost" 
        size="icon" 
        className={`absolute top-2 right-2 h-8 w-8 rounded-full bg-white shadow-sm transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
      >
        <Heart className="h-4 w-4" />
      </Button>
      
      {/* Product Details */}
      <div className="mt-3">
        <h3 className="text-sm font-light">{product.name}</h3>
        <div className="flex items-center justify-between mt-1">
          <p className="text-sm font-medium">${product.price.toFixed(2)}</p>
          <div className="flex items-center gap-1">
            <div 
              className="h-3 w-3 rounded-full" 
              style={{ backgroundColor: colorHex }} 
              title={product.color}
            />
            <span className="text-xs text-gray-500">{product.category}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
