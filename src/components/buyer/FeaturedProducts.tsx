
import React from "react";
import { Heart } from "lucide-react";

interface ProductProps {
  id: string;
  name: string;
  category: string;
  price: string;
  favorite: boolean;
  onToggleFavorite: (id: string) => void;
}

interface FeaturedProductsProps {
  products: ProductProps[];
}

const FeaturedProducts = ({ products = [] }: FeaturedProductsProps) => {
  // Select only the first 4 products to display
  const displayProducts = products.slice(0, 4);
  
  // Use a placeholder image for the static image
  const staticImage = "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?q=80&auto=format";

  return (
    <div className="w-full mb-8">
      <h2 className="text-1xl md:text-2xl uppercase font-thin mb-4">Featured Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Static image - left column */}
        <div className="bg-gray-100 h-full min-h-[400px] md:col-span-1 rounded-md overflow-hidden">
          <img 
            src={staticImage} 
            alt="Featured collection" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Featured products - right column */}
        <div className="md:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
            {displayProducts.map((product) => (
              <div key={product.id} className="border border-gray-200 p-4 rounded-md bg-white h-[180px] relative flex flex-col justify-between">
                <div>
                  <h3 className="font-medium text-sm">{product.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{product.category}</p>
                </div>
                
                <div className="flex justify-between items-center mt-2">
                  <span className="font-bold text-sm">{product.price}</span>
                  <button 
                    onClick={() => product.onToggleFavorite(product.id)} 
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <Heart 
                      size={16} 
                      className={product.favorite ? "fill-black text-black" : "text-gray-400"} 
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
