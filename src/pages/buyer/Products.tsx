
import { useState } from "react";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductCard } from "@/components/buyer/products/ProductCard";
import { ProductQuickView } from "@/components/buyer/products/ProductQuickView";
import { Product, ColorOption, ProductQuickViewData } from "@/types/product";

const BuyerProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [seasonFilter, setSeasonFilter] = useState("");
  const [quickViewData, setQuickViewData] = useState<ProductQuickViewData>({
    isOpen: false,
    product: null
  });

  // Sample products data - in a real app this would come from an API
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Silk Blend Tailored Blazer",
      sku: "BL-2025-SLK",
      category: "Outerwear",
      season: "Spring/Summer 2025",
      color: "Navy Blue",
      price: 289.99,
      status: "active",
      releaseDate: "2025-03-15",
      description: "Luxurious silk blend blazer with modern tailoring and subtle texture. Perfect for formal occasions or elevated casual looks. Features structured shoulders and a tailored fit.",
      materials: "70% Silk, 30% Cotton",
      imageUrl: "https://via.placeholder.com/600x800?text=Blazer"
    },
    {
      id: 2,
      name: "Cashmere Wool Cardigan",
      sku: "CW-2025-CSM",
      category: "Tops",
      season: "Fall/Winter 2024",
      color: "Burgundy",
      price: 199.99,
      status: "draft",
      releaseDate: "2024-08-30",
      description: "Premium cashmere wool cardigan with ribbed cuffs and hem. Luxuriously soft and warm, perfect for layering during colder months.",
      materials: "85% Cashmere, 15% Wool",
      imageUrl: "https://via.placeholder.com/600x800?text=Cardigan"
    },
    {
      id: 3,
      name: "Leather Crossbody Bag",
      sku: "LB-2025-CRS",
      category: "Accessories",
      season: "Resort 2025",
      color: "Tan",
      price: 349.99,
      status: "active",
      releaseDate: "2025-01-10",
      description: "Artisanal leather crossbody with adjustable strap and distinctive hardware. Handcrafted from premium full-grain leather that develops a beautiful patina over time.",
      materials: "100% Full-grain Leather",
      imageUrl: "https://via.placeholder.com/600x800?text=Leather+Bag"
    },
    {
      id: 4,
      name: "Linen Button-Up Shirt",
      sku: "LS-2025-BTN",
      category: "Tops",
      season: "Spring/Summer 2025",
      color: "Soft Blue",
      price: 129.99,
      status: "active",
      releaseDate: "2025-02-20",
      description: "Breathable linen button-up shirt with relaxed fit and minimal styling. Perfect for warm weather with its lightweight, natural fabric.",
      materials: "100% Organic Linen",
      imageUrl: "https://via.placeholder.com/600x800?text=Linen+Shirt"
    },
    {
      id: 5,
      name: "Merino Wool Scarf",
      sku: "MW-2024-SCF",
      category: "Accessories",
      season: "Fall/Winter 2024",
      color: "Soft Green",
      price: 89.99,
      status: "active",
      releaseDate: "2024-09-15",
      description: "Ultra-soft merino wool scarf with fringed edges. Provides exceptional warmth without bulk, and resists odors naturally.",
      materials: "100% Merino Wool",
      imageUrl: "https://via.placeholder.com/600x800?text=Wool+Scarf"
    },
    {
      id: 6,
      name: "Tailored Wool Trousers",
      sku: "TW-2024-TRS",
      category: "Bottoms",
      season: "Fall/Winter 2024",
      color: "Charcoal Gray",
      price: 179.99,
      status: "active",
      releaseDate: "2024-09-30",
      description: "Classic tailored wool trousers with side adjusters and cuffed hems. Features a contemporary slim fit with enough room for comfort.",
      materials: "80% Wool, 20% Polyester",
      imageUrl: "https://via.placeholder.com/600x800?text=Wool+Trousers"
    }
  ]);

  const colorOptions: ColorOption[] = [
    { name: "Neutral Gray", hex: "#8E9196" },
    { name: "Navy Blue", hex: "#1E3A8A" },
    { name: "Burgundy", hex: "#9F1239" },
    { name: "Tan", hex: "#D4A76A" },
    { name: "Soft Blue", hex: "#D3E4FD" },
    { name: "Soft Green", hex: "#F2FCE2" },
    { name: "Charcoal Gray", hex: "#403E43" },
  ];

  // Filter products based on search query and filters
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter ? product.category === categoryFilter : true;
    const matchesSeason = seasonFilter ? product.season === seasonFilter : true;
    
    // Only show active products
    const isActive = product.status === "active";
    
    return matchesSearch && matchesCategory && matchesSeason && isActive;
  });

  // Get unique categories and seasons for filters
  const categories = [...new Set(products.map(product => product.category))];
  const seasons = [...new Set(products.map(product => product.season))];

  const handleQuickView = (product: Product) => {
    setQuickViewData({
      isOpen: true,
      product
    });
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl md:text-5xl uppercase font-light mb-6">
        DISCOVER <span className="font-normal">PRODUCTS</span>
      </h1>
      
      {/* Filters Section */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search products" 
            className="pl-10 border-gray-200 focus-visible:ring-0 focus-visible:border-black"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[150px] border-gray-200">
              <div className="flex items-center text-sm">
                <Filter className="mr-2 h-3.5 w-3.5" />
                <span>{categoryFilter || "Category"}</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={seasonFilter} onValueChange={setSeasonFilter}>
            <SelectTrigger className="w-[180px] border-gray-200">
              <div className="flex items-center text-sm">
                <SlidersHorizontal className="mr-2 h-3.5 w-3.5" />
                <span>{seasonFilter || "Season"}</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Seasons</SelectItem>
              {seasons.map((season) => (
                <SelectItem key={season} value={season}>{season}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">No products found matching your criteria.</p>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              colorOptions={colorOptions}
              onQuickView={handleQuickView}
            />
          ))
        )}
      </div>
      
      {/* Quick View Dialog */}
      <ProductQuickView 
        open={quickViewData.isOpen}
        onOpenChange={(open) => setQuickViewData(prev => ({ ...prev, isOpen: open }))}
        product={quickViewData.product}
        colorOptions={colorOptions}
      />
    </div>
  );
};

export default BuyerProducts;
