
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Heart, Search, SlidersHorizontal, ArrowRight, X } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

// Product interface for type safety
interface Product {
  id: string;
  name: string;
  category: string;
  subCategory?: string;
  price: string;
  imagePlaceholder: string;
  favorite?: boolean;
  material?: string;
  availability?: string;
}

// Categories and subcategories
const categoryData = {
  "Dresses": ["Midi", "Maxi", "Mini", "Evening"],
  "Tops": ["T-shirts", "Blouses", "Shirts", "Sweaters"],
  "Skirts": ["A-line", "Pleated", "Pencil", "Wrap"],
  "Bags": ["Crossbody", "Tote", "Clutch", "Backpack"],
  "Shoes": ["Heels", "Flats", "Boots", "Sneakers"]
};

// Material options
const materialOptions = ["Cotton", "Silk", "Leather", "Linen", "Denim", "Wool"];

const Dashboard = () => {
  // Sample product data
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  
  // UI states
  const [sortBy, setSortBy] = useState<string>("Newest");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(false);
  const [showSubcategories, setShowSubcategories] = useState<boolean>(false);
  const [isAiAssistEnabled, setIsAiAssistEnabled] = useState<boolean>(false);
  const [aiResults, setAiResults] = useState<string | null>(null);
  
  const categories = ["All Categories", "Dresses", "Tops", "Skirts", "Bags", "Shoes"];
  
  // Initialize products
  useEffect(() => {
    const initialProducts = Array(12).fill(null).map((_, index) => {
      const categoryIndex = Math.floor(Math.random() * 5);
      const category = ['Dresses', 'Tops', 'Skirts', 'Bags', 'Shoes'][categoryIndex];
      const subCategories = categoryData[category as keyof typeof categoryData] || [];
      const subCategory = subCategories[Math.floor(Math.random() * subCategories.length)];
      
      return {
        id: `product-${index + 1}`,
        name: `Product ${index + 1}`,
        category,
        subCategory,
        price: `${Math.floor(Math.random() * 1000) + 500} EUR`,
        imagePlaceholder: `${Math.floor(Math.random() * 200) + 200}x${Math.floor(Math.random() * 100) + 250}`,
        favorite: false,
        material: materialOptions[Math.floor(Math.random() * materialOptions.length)],
        availability: Math.random() > 0.2 ? "In Stock" : "Out of Stock"
      };
    });
    
    setProducts(initialProducts);
    setFilteredProducts(initialProducts);
  }, []);
  
  // Filter products based on all criteria
  useEffect(() => {
    let result = [...products];
    
    // Category filter
    if (selectedCategory !== "All Categories") {
      result = result.filter(product => product.category === selectedCategory);
      
      // Subcategory filter
      if (selectedSubCategory) {
        result = result.filter(product => product.subCategory === selectedSubCategory);
      }
    }
    
    // Material filter
    if (selectedMaterials.length > 0) {
      result = result.filter(product => 
        product.material && selectedMaterials.includes(product.material)
      );
    }
    
    // Price range filter
    result = result.filter(product => {
      const price = parseInt(product.price.split(" ")[0]);
      return price >= priceRange[0] && price <= priceRange[1];
    });
    
    // Availability filter
    if (inStockOnly) {
      result = result.filter(product => product.availability === "In Stock");
    }
    
    // Search term filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchLower) || 
        product.category.toLowerCase().includes(searchLower) ||
        (product.subCategory && product.subCategory.toLowerCase().includes(searchLower))
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
    
    // Simulate AI assistance when enabled
    if (isAiAssistEnabled && result.length > 0) {
      const aiSuggestion = "Based on your preferences, we recommend exploring our Midi Dresses collection in Silk material, which are trending this season.";
      setAiResults(aiSuggestion);
    } else {
      setAiResults(null);
    }
  }, [selectedCategory, selectedSubCategory, selectedMaterials, priceRange, inStockOnly, searchTerm, sortBy, products, isAiAssistEnabled]);
  
  const toggleFavorite = (productId: string) => {
    setProducts(products.map(product => 
      product.id === productId 
        ? { ...product, favorite: !product.favorite } 
        : product
    ));
  };
  
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubCategory("");
    
    if (category !== "All Categories") {
      setShowSubcategories(true);
    } else {
      setShowSubcategories(false);
    }
  };
  
  const handleSubCategorySelect = (subCategory: string) => {
    setSelectedSubCategory(subCategory);
  };
  
  const toggleMaterial = (material: string) => {
    if (selectedMaterials.includes(material)) {
      setSelectedMaterials(selectedMaterials.filter(m => m !== material));
    } else {
      setSelectedMaterials([...selectedMaterials, material]);
    }
  };
  
  const resetFilters = () => {
    setSelectedCategory("All Categories");
    setSelectedSubCategory("");
    setSelectedMaterials([]);
    setPriceRange([0, 1000]);
    setInStockOnly(false);
    setSearchTerm("");
    setSortBy("Newest");
    setShowSubcategories(false);
    setIsAiAssistEnabled(false);
    setAiResults(null);
  };

  return (
    <div className="space-y-6">
  
      <section className="bg-black text-white py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-5xl uppercase font-light mb-6">
            ADDITIONAL SERVICES
          </h1>
          <p className="max-w-2xl text-lg font-light mb-8">
            Specialized consulting services to enhance your buying strategy and store curation
          </p>
          <Button className="bg-white text-black border-0 hover:bg-gray-100">
            EXPLORE SERVICES <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div> 
      </section>

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
                    onClick={() => handleCategorySelect(category)}
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

            <Button 
              variant="outline" 
              size="sm" 
              className={`border ${showAdvancedFilters ? 'bg-gray-50 border-gray-300' : 'border-gray-200'} hover:bg-gray-50 w-full sm:w-auto`}
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            >
              Advanced
              <ChevronRight size={16} className={`ml-1 transition-transform duration-200 ${showAdvancedFilters ? 'rotate-90' : ''}`} />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Advanced Filter Section */}
      {showAdvancedFilters && (
        <Card className="border border-gray-200 overflow-hidden transition-all duration-300 animate-fade-in">
          <CardContent className="p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-light uppercase tracking-wide">Advanced Filters</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowAdvancedFilters(false)}
                className="h-8 w-8 p-0"
              >
                <X size={16} />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {/* Categories & Subcategories */}
                <div className="space-y-2">
                  <h4 className="text-sm uppercase text-gray-500 font-medium">Categories</h4>
                  {showSubcategories ? (
                    <>
                      <div className="flex items-center mb-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-xs px-2 py-1 h-auto"
                          onClick={() => {
                            setShowSubcategories(false);
                            setSelectedSubCategory("");
                          }}
                        >
                          <ChevronRight size={14} className="rotate-180 mr-1" />
                          Back to Categories
                        </Button>
                        <span className="ml-2 text-sm font-light">{selectedCategory}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {categoryData[selectedCategory as keyof typeof categoryData]?.map((subCategory) => (
                          <Button 
                            key={subCategory}
                            variant={selectedSubCategory === subCategory ? "black" : "outline"}
                            size="sm"
                            className="justify-start text-sm"
                            onClick={() => handleSubCategorySelect(subCategory)}
                          >
                            {subCategory}
                          </Button>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      {categories.filter(c => c !== "All Categories").map((category) => (
                        <Button 
                          key={category}
                          variant={selectedCategory === category ? "black" : "outline"}
                          size="sm"
                          className="justify-start text-sm"
                          onClick={() => handleCategorySelect(category)}
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Materials */}
                <div className="space-y-2">
                  <h4 className="text-sm uppercase text-gray-500 font-medium">Materials</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {materialOptions.map((material) => (
                      <Button 
                        key={material}
                        variant={selectedMaterials.includes(material) ? "black" : "outline"}
                        size="sm"
                        className="justify-start text-sm"
                        onClick={() => toggleMaterial(material)}
                      >
                        {material}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {/* Price Range */}
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <h4 className="text-sm uppercase text-gray-500 font-medium">Price Range</h4>
                    <span className="text-sm font-light">
                      {priceRange[0]} - {priceRange[1]} EUR
                    </span>
                  </div>
                  <Slider
                    defaultValue={[0, 1000]}
                    min={0}
                    max={1000}
                    step={50}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="py-4"
                  />
                </div>

                {/* Availability */}
                <div className="flex items-center justify-between">
                  <Label htmlFor="in-stock" className="text-sm uppercase text-gray-500 font-medium">
                    In Stock Only
                  </Label>
                  <Switch
                    id="in-stock"
                    checked={inStockOnly}
                    onCheckedChange={setInStockOnly}
                  />
                </div>

                {/* AI Assistance */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="ai-assist" className="text-sm uppercase text-gray-500 font-medium">
                      AI Shopping Assistant
                    </Label>
                    <Switch
                      id="ai-assist"
                      checked={isAiAssistEnabled}
                      onCheckedChange={setIsAiAssistEnabled}
                    />
                  </div>
                  <p className="text-xs text-gray-500">Enable AI to help you find the best products based on your preferences</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between mt-6">
              <Button 
                variant="outline"
                size="sm"
                onClick={resetFilters}
              >
                Reset Filters
              </Button>
              <Button
                variant="black"
                size="sm"
                onClick={() => setShowAdvancedFilters(false)}
              >
                Apply Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* AI Assistance Results */}
      {aiResults && (
        <div className="bg-gray-50 border border-gray-200 p-4 rounded-none mb-4 animate-fade-in">
          <div className="flex items-start gap-3">
            <div className="bg-black text-white p-2 rounded-none">
              <SlidersHorizontal size={16} />
            </div>
            <div>
              <h4 className="font-medium text-sm mb-1">AI Shopping Assistant</h4>
              <p className="text-sm text-gray-600">{aiResults}</p>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="ml-auto h-6 w-6 p-0"
              onClick={() => {
                setAiResults(null);
                setIsAiAssistEnabled(false);
              }}
            >
              <X size={14} />
            </Button>
          </div>
        </div>
      )}

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
          ))
        ) : (
          <div className="col-span-full py-12 text-center">
            <p className="text-gray-500">No products found matching your criteria.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={resetFilters}
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
