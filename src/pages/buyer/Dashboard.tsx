
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Heart, Search, SlidersHorizontal, ArrowRight, X, FilterX, ChevronUp } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";

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
  season?: string;
  color?: string;
  size?: string;
  brand?: string;
  sustainableCert?: string[];
  minimumOrder?: number;
  leadTime?: string;
  shippingFrom?: string;
  exclusivity?: boolean;
}

const categoryData = {
  "Dresses": ["Midi", "Maxi", "Mini", "Evening"],
  "Tops": ["T-shirts", "Blouses", "Shirts", "Sweaters"],
  "Skirts": ["A-line", "Pleated", "Pencil", "Wrap"],
  "Bags": ["Crossbody", "Tote", "Clutch", "Backpack"],
  "Shoes": ["Heels", "Flats", "Boots", "Sneakers"]
};

const materialOptions = ["Cotton", "Silk", "Leather", "Linen", "Denim", "Wool"];

const seasonOptions = ["Spring/Summer 2025", "Fall/Winter 2024", "Resort 2025", "Pre-Fall 2024"];
const colorOptions = ["Black", "White", "Navy", "Beige", "Red", "Green", "Blue", "Pink", "Purple", "Yellow", "Orange", "Brown"];
const sizeOptions = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "One Size"];
const sustainabilityCertOptions = ["GOTS Certified", "Organic", "Fair Trade", "Recycled Materials", "B Corp", "Carbon Neutral"];
const leadTimeOptions = ["2-4 weeks", "1-2 months", "2-3 months", "3+ months"];
const shippingFromOptions = ["Europe", "Asia", "North America", "South America", "Africa", "Australia"];

const Dashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  
  const [selectedSeasons, setSelectedSeasons] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCertifications, setSelectedCertifications] = useState<string[]>([]);
  const [minOrderRange, setMinOrderRange] = useState<number[]>([0, 100]);
  const [selectedLeadTimes, setSelectedLeadTimes] = useState<string[]>([]);
  const [selectedShippingOrigins, setSelectedShippingOrigins] = useState<string[]>([]);
  const [exclusivityOnly, setExclusivityOnly] = useState<boolean>(false);
  
  const [sortBy, setSortBy] = useState<string>("Newest");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(true);
  const [showSubcategories, setShowSubcategories] = useState<boolean>(false);
  const [isAiAssistEnabled, setIsAiAssistEnabled] = useState<boolean>(false);
  const [aiResults, setAiResults] = useState<string | null>(null);
  const [activeFilterTab, setActiveFilterTab] = useState<string>("categories");
  
  const [isAiSearchEnabled, setIsAiSearchEnabled] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchPlaceholder, setSearchPlaceholder] = useState<string>("Search products...");
  
  const categories = ["All Categories", "Dresses", "Tops", "Skirts", "Bags", "Shoes"];
  
  useEffect(() => {
    const initialProducts = Array(12).fill(null).map((_, index) => {
      const categoryIndex = Math.floor(Math.random() * 5);
      const category = ['Dresses', 'Tops', 'Skirts', 'Bags', 'Shoes'][categoryIndex];
      const subCategories = categoryData[category as keyof typeof categoryData] || [];
      const subCategory = subCategories[Math.floor(Math.random() * subCategories.length)];
      const season = seasonOptions[Math.floor(Math.random() * seasonOptions.length)];
      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      const size = sizeOptions[Math.floor(Math.random() * sizeOptions.length)];
      const brand = `Brand ${Math.floor(Math.random() * 10) + 1}`;
      const sustainableCert = Math.random() > 0.5 ? 
        [sustainabilityCertOptions[Math.floor(Math.random() * sustainabilityCertOptions.length)]] : 
        [];
      const minimumOrder = Math.floor(Math.random() * 50) + 5;
      const leadTime = leadTimeOptions[Math.floor(Math.random() * leadTimeOptions.length)];
      const shippingFrom = shippingFromOptions[Math.floor(Math.random() * shippingFromOptions.length)];
      const exclusivity = Math.random() > 0.8;
      
      return {
        id: `product-${index + 1}`,
        name: `Product ${index + 1}`,
        category,
        subCategory,
        price: `${Math.floor(Math.random() * 1000) + 500} EUR`,
        imagePlaceholder: `${Math.floor(Math.random() * 200) + 200}x${Math.floor(Math.random() * 100) + 250}`,
        favorite: false,
        material: materialOptions[Math.floor(Math.random() * materialOptions.length)],
        availability: Math.random() > 0.2 ? "In Stock" : "Out of Stock",
        season,
        color,
        size,
        brand,
        sustainableCert,
        minimumOrder,
        leadTime,
        shippingFrom,
        exclusivity
      };
    });
    
    setProducts(initialProducts);
    setFilteredProducts(initialProducts);
  }, []);
  
  useEffect(() => {
    let result = [...products];
    
    if (selectedCategory !== "All Categories") {
      result = result.filter(product => product.category === selectedCategory);
      
      if (selectedSubCategory) {
        result = result.filter(product => product.subCategory === selectedSubCategory);
      }
    }
    
    if (selectedMaterials.length > 0) {
      result = result.filter(product => 
        product.material && selectedMaterials.includes(product.material)
      );
    }
    
    result = result.filter(product => {
      const price = parseInt(product.price.split(" ")[0]);
      return price >= priceRange[0] && price <= priceRange[1];
    });
    
    if (inStockOnly) {
      result = result.filter(product => product.availability === "In Stock");
    }
    
    if (selectedSeasons.length > 0) {
      result = result.filter(product => 
        product.season && selectedSeasons.includes(product.season)
      );
    }
    
    if (selectedColors.length > 0) {
      result = result.filter(product => 
        product.color && selectedColors.includes(product.color)
      );
    }
    
    if (selectedSizes.length > 0) {
      result = result.filter(product => 
        product.size && selectedSizes.includes(product.size)
      );
    }
    
    if (selectedBrands.length > 0) {
      result = result.filter(product => 
        product.brand && selectedBrands.includes(product.brand)
      );
    }
    
    if (selectedCertifications.length > 0) {
      result = result.filter(product => 
        product.sustainableCert && 
        product.sustainableCert.some(cert => selectedCertifications.includes(cert))
      );
    }
    
    result = result.filter(product => {
      return product.minimumOrder && 
        product.minimumOrder >= minOrderRange[0] && 
        product.minimumOrder <= minOrderRange[1];
    });
    
    if (selectedLeadTimes.length > 0) {
      result = result.filter(product => 
        product.leadTime && selectedLeadTimes.includes(product.leadTime)
      );
    }
    
    if (selectedShippingOrigins.length > 0) {
      result = result.filter(product => 
        product.shippingFrom && selectedShippingOrigins.includes(product.shippingFrom)
      );
    }
    
    if (exclusivityOnly) {
      result = result.filter(product => product.exclusivity === true);
    }
    
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchLower) || 
        product.category.toLowerCase().includes(searchLower) ||
        (product.subCategory && product.subCategory.toLowerCase().includes(searchLower)) ||
        (product.brand && product.brand.toLowerCase().includes(searchLower))
      );
    }
    
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
        break;
    }
    
    setFilteredProducts(result);
    
    if (isAiAssistEnabled && result.length > 0) {
      let aiSuggestion = "Based on your preferences, we recommend exploring ";
      
      if (selectedCategory !== "All Categories") {
        aiSuggestion += `${selectedCategory}`;
        if (selectedSubCategory) {
          aiSuggestion += ` in ${selectedSubCategory} style`;
        }
      } else if (selectedMaterials.length > 0) {
        aiSuggestion += `items in ${selectedMaterials.join(" or ")} material`;
      } else if (selectedColors.length > 0) {
        aiSuggestion += `items in ${selectedColors.join(" or ")} color`;
      } else if (selectedSeasons.length > 0) {
        aiSuggestion += `items from ${selectedSeasons[0]} collection`;
      } else {
        aiSuggestion += "our trending items with fast shipping options";
      }
      
      aiSuggestion += ". These items are popular with buyers with similar preferences.";
      setAiResults(aiSuggestion);
    } else {
      setAiResults(null);
    }
  }, [
    selectedCategory, selectedSubCategory, selectedMaterials, priceRange, inStockOnly,
    selectedSeasons, selectedColors, selectedSizes, selectedBrands, selectedCertifications,
    minOrderRange, selectedLeadTimes, selectedShippingOrigins, exclusivityOnly,
    searchTerm, sortBy, products, isAiAssistEnabled
  ]);
  
  const toggleFilterOption = (option: string, currentSelection: string[], setSelection: (selection: string[]) => void) => {
    if (currentSelection.includes(option)) {
      setSelection(currentSelection.filter(item => item !== option));
    } else {
      setSelection([...currentSelection, option]);
    }
  };
  
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
      setActiveFilterTab("subcategories");
    } else {
      setShowSubcategories(false);
      setActiveFilterTab("categories");
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
    setSelectedSeasons([]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setSelectedBrands([]);
    setSelectedCertifications([]);
    setMinOrderRange([0, 100]);
    setSelectedLeadTimes([]);
    setSelectedShippingOrigins([]);
    setExclusivityOnly(false);
    setSearchTerm("");
    setSortBy("Newest");
    setShowSubcategories(false);
    setActiveFilterTab("categories");
    setIsAiAssistEnabled(false);
    setAiResults(null);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (selectedCategory !== "All Categories") count++;
    if (selectedSubCategory) count++;
    count += selectedMaterials.length;
    if (inStockOnly) count++;
    count += selectedSeasons.length;
    count += selectedColors.length;
    count += selectedSizes.length;
    count += selectedBrands.length;
    count += selectedCertifications.length;
    if (priceRange[0] > 0 || priceRange[1] < 1000) count++;
    if (minOrderRange[0] > 0 || minOrderRange[1] < 100) count++;
    count += selectedLeadTimes.length;
    count += selectedShippingOrigins.length;
    if (exclusivityOnly) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (isAiSearchEnabled && value.length > 2) {
      setIsSearching(true);
      setTimeout(() => {
        setIsSearching(false);
      }, 500);
    }
  };

  const toggleAiSearch = () => {
    const newState = !isAiSearchEnabled;
    setIsAiSearchEnabled(newState);
    setSearchPlaceholder(newState ? "Ask AI about products..." : "Search products...");
  };

  return (
    <div className="space-y-6">
      <section className="bg-black text-white py-24 px-4 transition-all duration-300 ease-in-out hover:h-[781px] group">
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
        
        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
          <div className="relative flex-grow">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${isSearching ? 'text-black animate-pulse' : 'text-gray-400'}`} />
            <input 
              type="text" 
              placeholder={searchPlaceholder} 
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 pr-3 py-3 w-full border border-gray-200 focus:outline-none focus:ring-1 focus:ring-black text-sm"
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
              className={`border ${showAdvancedFilters ? 'bg-gray-50 border-gray-300' : 'border-gray-200'} hover:bg-gray-50 w-full sm:w-auto relative`}
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            >
              {showAdvancedFilters ? 'Hide Filters' : 'Show Filters'}
              {activeFiltersCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gray-800 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {activeFiltersCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
      
      <Collapsible open={showAdvancedFilters} onOpenChange={setShowAdvancedFilters} className="w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-light uppercase tracking-wide">Advanced Filters</h3>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              {showAdvancedFilters ? <ChevronUp size={16} /> : <ChevronRight size={16} />}
            </Button>
          </CollapsibleTrigger>
        </div>
        
        <CollapsibleContent className="w-full">
          <Card className="border border-gray-200 overflow-hidden transition-all duration-300 animate-fade-in">
            <CardContent className="p-5">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="relative flex-grow">
                    <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${isSearching ? 'text-black animate-pulse' : 'text-gray-400'}`} />
                    <input 
                      type="text" 
                      placeholder={searchPlaceholder} 
                      value={searchTerm}
                      onChange={handleSearch}
                      className="pl-10 pr-3 py-3 w-full border border-gray-200 focus:outline-none focus:ring-1 focus:ring-black text-sm"
                    />
                  </div>
                  <div className="flex items-center gap-2 whitespace-nowrap">
                    <Switch 
                      id="ai-search"
                      checked={isAiSearchEnabled}
                      onCheckedChange={toggleAiSearch}
                    />
                    <Label htmlFor="ai-search" className="text-sm text-gray-600">AI Search</Label>
                  </div>
                </div>
                {isAiSearchEnabled && (
                  <p className="text-xs text-gray-500 ml-1">Ask questions like "Show me cotton dresses with fast shipping" or "Find blue items under 200 EUR"</p>
                )}
              </div>

              <div className="border-b border-gray-200 mb-4">
                <div className="flex space-x-4 overflow-x-auto pb-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`px-3 py-1 h-auto rounded-none ${activeFilterTab === 'categories' ? 'border-b-2 border-black' : ''}`}
                    onClick={() => {
                      setActiveFilterTab('categories');
                      setShowSubcategories(false);
                    }}
                  >
                    Categories
                  </Button>
                  {showSubcategories && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={`px-3 py-1 h-auto rounded-none ${activeFilterTab === 'subcategories' ? 'border-b-2 border-black' : ''}`}
                      onClick={() => setActiveFilterTab('subcategories')}
                    >
                      Subcategories
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`px-3 py-1 h-auto rounded-none ${activeFilterTab === 'materials' ? 'border-b-2 border-black' : ''}`}
                    onClick={() => setActiveFilterTab('materials')}
                  >
                    Materials
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`px-3 py-1 h-auto rounded-none ${activeFilterTab === 'collections' ? 'border-b-2 border-black' : ''}`}
                    onClick={() => setActiveFilterTab('collections')}
                  >
                    Collections
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`px-3 py-1 h-auto rounded-none ${activeFilterTab === 'specifications' ? 'border-b-2 border-black' : ''}`}
                    onClick={() => setActiveFilterTab('specifications')}
                  >
                    Specifications
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`px-3 py-1 h-auto rounded-none ${activeFilterTab === 'commercial' ? 'border-b-2 border-black' : ''}`}
                    onClick={() => setActiveFilterTab('commercial')}
                  >
                    Commercial Terms
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`px-3 py-1 h-auto rounded-none ${activeFilterTab === 'ai' ? 'border-b-2 border-black' : ''}`}
                    onClick={() => setActiveFilterTab('ai')}
                  >
                    AI Assistant
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  {activeFilterTab === 'categories' && (
                    <div className="space-y-4">
                      <h4 className="text-sm uppercase text-gray-500 font-medium">Categories</h4>
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
                    </div>
                  )}

                  {activeFilterTab === 'subcategories' && selectedCategory !== "All Categories" && (
                    <div className="space-y-4">
                      <div className="flex items-center mb-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-xs px-2 py-1 h-auto"
                          onClick={() => {
                            setShowSubcategories(false);
                            setActiveFilterTab("categories");
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
                    </div>
                  )}

                  {activeFilterTab === 'materials' && (
                    <div className="space-y-4">
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
                  )}

                  {activeFilterTab === 'collections' && (
                    <div className="space-y-4">
                      <h4 className="text-sm uppercase text-gray-500 font-medium">Season</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {seasonOptions.map((season) => (
                          <div key={season} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`season-${season}`}
                              checked={selectedSeasons.includes(season)}
                              onCheckedChange={() => toggleFilterOption(season, selectedSeasons, setSelectedSeasons)}
                            />
                            <Label 
                              htmlFor={`season-${season}`}
                              className="text-sm font-light cursor-pointer"
                            >
                              {season}
                            </Label>
                          </div>
                        ))}
                      </div>
                      
                      <h4 className="text-sm uppercase text-gray-500 font-medium pt-4">Colors</h4>
                      <div className="grid grid-cols-3 gap-2">
                        {colorOptions.map((color) => (
                          <div key={color} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`color-${color}`}
                              checked={selectedColors.includes(color)}
                              onCheckedChange={() => toggleFilterOption(color, selectedColors, setSelectedColors)}
                            />
                            <Label 
                              htmlFor={`color-${color}`}
                              className="text-sm font-light cursor-pointer"
                            >
                              {color}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeFilterTab === 'specifications' && (
                    <div className="space-y-4">
                      <h4 className="text-sm uppercase text-gray-500 font-medium">Sizes</h4>
                      <div className="grid grid-cols-4 gap-2">
                        {sizeOptions.map((size) => (
                          <Button 
                            key={size}
                            variant={selectedSizes.includes(size) ? "black" : "outline"}
                            size="sm"
                            className="justify-center text-sm"
                            onClick={() => toggleFilterOption(size, selectedSizes, setSelectedSizes)}
                          >
                            {size}
                          </Button>
                        ))}
                      </div>
                      
                      <h4 className="text-sm uppercase text-gray-500 font-medium pt-4">Sustainability</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {sustainabilityCertOptions.map((cert) => (
                          <div key={cert} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`cert-${cert}`}
                              checked={selectedCertifications.includes(cert)}
                              onCheckedChange={() => toggleFilterOption(cert, selectedCertifications, setSelectedCertifications)}
                            />
                            <Label 
                              htmlFor={`cert-${cert}`}
                              className="text-sm font-light cursor-pointer"
                            >
                              {cert}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeFilterTab === 'commercial' && (
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm uppercase text-gray-500 font-medium mb-3">Minimum Order Quantity</h4>
                        <div className="flex justify-between text-sm font-light">
                          <span>{minOrderRange[0]} units</span>
                          <span>{minOrderRange[1]} units</span>
                        </div>
                        <Slider
                          defaultValue={[0, 100]}
                          min={0}
                          max={100}
                          step={5}
                          value={minOrderRange}
                          onValueChange={setMinOrderRange}
                          className="py-4"
                        />
                      </div>
                      
                      <div>
                        <h4 className="text-sm uppercase text-gray-500 font-medium mb-3">Lead Time</h4>
                        <div className="grid grid-cols-1 gap-2">
                          {leadTimeOptions.map((leadTime) => (
                            <div key={leadTime} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`leadtime-${leadTime}`}
                                checked={selectedLeadTimes.includes(leadTime)}
                                onCheckedChange={() => toggleFilterOption(leadTime, selectedLeadTimes, setSelectedLeadTimes)}
                              />
                              <Label 
                                htmlFor={`leadtime-${leadTime}`}
                                className="text-sm font-light cursor-pointer"
                              >
                                {leadTime}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="exclusivity" className="text-sm uppercase text-gray-500 font-medium">
                            Exclusivity Available
                          </Label>
                          <Switch
                            id="exclusivity"
                            checked={exclusivityOnly}
                            onCheckedChange={setExclusivityOnly}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Only show products with exclusivity options</p>
                      </div>
                    </div>
                  )}

                  {activeFilterTab === 'ai' && (
                    <div className="space-y-4">
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
                        <p className="text-xs text-gray-500 mb-4">Enable AI to help you find the best products based on your preferences and buying history</p>
                        
                        {isAiAssistEnabled && (
                          <div className="bg-gray-50 border border-gray-200 p-4 rounded-none mb-4">
                            <p className="text-sm font-light">The AI assistant will analyze your filters, past purchases, and current market trends to suggest the most relevant products for your store.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
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

                  <div className="space-y-2">
                    <h4 className="text-sm uppercase text-gray-500 font-medium">Shipping From</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {shippingFromOptions.map((region) => (
                        <div key={region} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`region-${region}`}
                            checked={selectedShippingOrigins.includes(region)}
                            onCheckedChange={() => toggleFilterOption(region, selectedShippingOrigins, setSelectedShippingOrigins)}
                          />
                          <Label 
                            htmlFor={`region-${region}`}
                            className="text-sm font-light cursor-pointer"
                          >
                            {region}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

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
                  
                  {activeFiltersCount > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-sm uppercase text-gray-500 font-medium">Applied Filters</h4>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={resetFilters}
                          className="h-8 text-xs text-gray-500 hover:text-black flex items-center gap-1"
                        >
                          <FilterX size={14} />
                          Clear All
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedCategory !== "All Categories" && (
                          <div className="bg-gray-100 px-2 py-1 text-xs flex items-center gap-1">
                            <span>Category: {selectedCategory}</span>
                            <X 
                              size={12} 
                              className="cursor-pointer"
                              onClick={() => setSelectedCategory("All Categories")}
                            />
                          </div>
                        )}
                        {selectedSubCategory && (
                          <div className="bg-gray-100 px-2 py-1 text-xs flex items-center gap-1">
                            <span>Subcategory: {selectedSubCategory}</span>
                            <X 
                              size={12} 
                              className="cursor-pointer"
                              onClick={() => setSelectedSubCategory("")}
                            />
                          </div>
                        )}
                        {selectedMaterials.map(material => (
                          <div key={material} className="bg-gray-100 px-2 py-1 text-xs flex items-center gap-1">
                            <span>Material: {material}</span>
                            <X 
                              size={12} 
                              className="cursor-pointer"
                              onClick={() => toggleMaterial(material)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

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
                  onClick={() => {
                    // Keep filters open but apply them
                  }}
                >
                  Apply Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>
      
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Card key={product.id} className="border-0 rounded-none overflow-hidden group">
              <CardContent className="p-0">
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
