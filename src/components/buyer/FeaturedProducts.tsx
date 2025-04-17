
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface ProductProps {
  id: string;
  name: string;
  category: string;
  subCategory?: string;
  price: string;
  imagePlaceholder: string;
  favorite?: boolean;
  material?: string;
  availability?: string;
  toggleFavorite: (id: string) => void;
}

const FeaturedProducts = ({ toggleFavorite }: { toggleFavorite: (id: string) => void }) => {
  const [featuredProducts] = useState<ProductProps[]>([
    {
      id: "featured-1",
      name: "Signature Collection",
      category: "Dresses",
      subCategory: "Midi",
      price: "780 EUR",
      imagePlaceholder: "380x450",
      favorite: false,
      material: "Silk",
      availability: "In Stock",
    },
    {
      id: "featured-2",
      name: "Essential Piece",
      category: "Tops",
      subCategory: "Blouses",
      price: "520 EUR",
      imagePlaceholder: "380x450",
      favorite: false,
      material: "Cotton",
      availability: "In Stock",
    },
    {
      id: "featured-3",
      name: "Statement Design",
      category: "Bags",
      subCategory: "Clutch",
      price: "890 EUR",
      imagePlaceholder: "380x450",
      favorite: false,
      material: "Leather",
      availability: "In Stock",
    },
    {
      id: "featured-4",
      name: "Season Essential",
      category: "Shoes",
      subCategory: "Heels",
      price: "650 EUR",
      imagePlaceholder: "380x450",
      favorite: false,
      material: "Leather",
      availability: "In Stock",
    },
  ]);

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-light tracking-tighter mb-6">FEATURED THIS WEEK</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Featured Image - spans 1 row, 1 column on mobile, 2 rows and 1 column on desktop */}
        <div className="relative aspect-[4/5] md:row-span-2 bg-gray-100 flex items-center justify-center">
          <div className="text-gray-400">Featured Image 760x900</div>
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <div className="text-center p-6">
              <h3 className="text-white text-2xl md:text-4xl font-light mb-4">NEW ARRIVALS</h3>
              <p className="text-white/90 mb-6">Explore the latest collections from top designers</p>
              <Button className="bg-white text-black hover:bg-gray-100">
                EXPLORE NOW
              </Button>
            </div>
          </div>
        </div>

        {/* 2x2 Grid of Products - will be on the right of the featured image on desktop */}
        {featuredProducts.map((product) => (
          <Card key={product.id} className="border-0 rounded-none overflow-hidden group">
            <CardContent className="p-0">
              <div className="aspect-[4/5] bg-gray-50 flex items-center justify-center relative overflow-hidden">
                <div className="text-gray-400 text-xs">{product.imagePlaceholder}</div>
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-0 right-0 p-3">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 rounded-full bg-white/70 hover:bg-white"
                    onClick={() => toggleFavorite(product.id)}
                  >
                    <Heart 
                      size={16} 
                      className={product.favorite ? "fill-black text-black" : "text-gray-600"}
                    />
                  </Button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 flex justify-between p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <Button className="bg-black text-white text-xs px-3 py-1.5 hover:bg-gray-900">
                    Add to Bag
                  </Button>
                  <Button variant="outline" className="bg-white text-black text-xs px-3 py-1.5">
                    Quick View
                  </Button>
                </div>
              </div>
              <div className="pt-4 px-1 space-y-1">
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  {product.category}{product.subCategory ? ` / ${product.subCategory}` : ''}
                </p>
                <h3 className="font-light text-sm tracking-tight">{product.name}</h3>
                <p className="text-sm">{product.price}</p>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-500">{product.material}</p>
                  <p className={`text-xs ${product.availability === "In Stock" ? "text-gray-500" : "text-gray-400"}`}>
                    {product.availability}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
