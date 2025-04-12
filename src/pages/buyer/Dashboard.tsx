
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Heart, Search, SlidersHorizontal } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

// Product interface for type safety
interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  imagePlaceholder: string;
  favorite?: boolean;
}

const Dashboard = () => {
  // Sample product data
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");
  const [sortBy, setSortBy] = useState<string>("Newest");
  const [searchTerm, setSearchTerm] = useState<string>("");
  
  const categories = ["All Categories", "Dresses", "Tops", "Skirts", "Bags", "Shoes"];
  
  // Initialize products
  useEffect(() => {
    const initialProducts = Array(12).fill(null).map((_, index) => ({
      id: `product-${index + 1}`,
      name: `Product ${index + 1}`,
      category: ['Dresses', 'Tops', 'Skirts', 'Bags', 'Shoes'][Math.floor(Math.random() * 5)],
      price: `${Math.floor(Math.random() * 1000) + 500} EUR`,
      imagePlaceholder: `${Math.floor(Math.random() * 200) + 200}x${Math.floor(Math.random() * 100) + 250}`,
      favorite: false
    }));
    
    setProducts(initialProducts);
    setFilteredProducts(initialProducts);
  }, []);
  
  // Filter products based on category and search term
  useEffect(() => {
    let result = [...products];
    
    if (selectedCategory !== "All Categories") {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchLower) || 
        product.category.toLowerCase().includes(searchLower)
      );
    }
    
    // Sort products
    switch (sortBy) {
      case "Price: High to Low":
        result.sort((a, b) => {
          const priceA = parseInt(a.price.split(" ")[0]);
          const priceB = parseInt(b.price.split(" ")[0]);
          return priceB - priceA;
        });
        break;
      case "Price: Low to High":
        result.sort((a, b) => {
          const priceA = parseInt(a.price.split(" ")[0]);
          const priceB = parseInt(b.price.split(" ")[0]);
          return priceA - priceB;
        });
        break;
      case "Newest":
      default:
        // For demo purposes, leave as is (would normally sort by date)
        break;
    }
    
    setFilteredProducts(result);
  }, [selectedCategory, searchTerm, sortBy, products]);
  
  const toggleFavorite = (productId: string) => {
    setProducts(products.map(product => 
      product.id === productId 
        ? { ...product, favorite: !product.favorite } 
        : product
    ));
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-4xl md:text-6xl font-light tracking-tighter">PRODUCTS</h1>
        
        {/* Search and filter section */}
        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-3 py-2 w-full border border-gray-200 focus:outline-none focus:ring-1 focus:ring-black text-sm"
            />
          </div>
          <div className="flex gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="border border-gray-200 hover:bg-gray-50 w-full sm:w-auto">
                  {selectedCategory}
                  <ChevronRight size={16} className="ml-1 rotate-90" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Categories</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {categories.map((category) => (
                  <DropdownMenuItem 
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className="cursor-pointer"
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="border border-gray-200 hover:bg-gray-50 w-full sm:w-auto">
                  <SlidersHorizontal size={14} className="mr-1" />
                  {sortBy}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {["Newest", "Price: High to Low", "Price: Low to High"].map((option) => (
                  <DropdownMenuItem
                    key={option}
                    onClick={() => setSortBy(option)}
                    className="cursor-pointer"
                  >
                    {option}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      
      {/* Product grid with monochrome styling */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Card key={product.id} className="border-0 rounded-none overflow-hidden group">
              <CardContent className="p-0">
                {/* Product image placeholder */}
                <div className="aspect-[3/4] bg-gray-50 flex items-center justify-center relative overflow-hidden">
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
                {/* Product details with monochrome styling */}
                <div className="pt-4 px-1 space-y-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">{product.category}</p>
                  <h3 className="font-light text-sm tracking-tight">{product.name}</h3>
                  <p className="text-sm">{product.price}</p>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full py-12 text-center">
            <p className="text-gray-500">No products found matching your criteria.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSelectedCategory("All Categories");
                setSearchTerm("");
                setSortBy("Newest");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Pagination with monochrome styling */}
      {filteredProducts.length > 0 && (
        <div className="flex justify-center pt-8">
          <div className="flex gap-2">
            {[1, 2, 3].map((page) => (
              <Button 
                key={page} 
                variant={page === 1 ? "default" : "outline"}
                size="sm"
                className={page === 1 
                  ? "bg-black text-white border-black" 
                  : "bg-white border-gray-200 hover:border-gray-400 transition-colors"
                }
              >
                {page}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
