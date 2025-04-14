
import { useState, useEffect } from "react";
import { 
  FileText, 
  Image, 
  Package, 
  Palette, 
  Tag, 
  Truck,
  RussianRuble,
  Plus,
  Trash2,
  Check,
  Calendar,
  Handshake,
  Video,
  Globe,
  Save
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { ColorOption } from "../../../types/product";

interface ProductFormTabsProps {
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  colorOptions: ColorOption[];
}

interface BulkTier {
  id: string;
  minQuantity: string;
  discountPercent: string;
}

// Define subcategories by main category
const subcategoriesByCategory: Record<string, string[]> = {
  "woman": [
    "Dresses", "Tops", "T-shirts", "Sweaters", "Cardigans",
    "Shirts", "Blazers", "Coats", "Jackets", "Trousers", 
    "Jeans", "Skirts", "Shorts", "Knitwear", "Suits",
    "Jumpsuits", "Swimwear", "Lingerie", "Accessories", "Shoes"
  ],
  "man": [
    "T-shirts", "Shirts", "Polos", "Sweaters", "Hoodies",
    "Jackets", "Coats", "Blazers", "Suits", "Trousers",
    "Jeans", "Shorts", "Knitwear", "Underwear", "Swimwear",
    "Accessories", "Shoes"
  ],
  "kids": [
    "Baby (0-12 months)", "Toddler (1-5 years)", "Kids (6-14 years)",
    "Tops", "Bottoms", "Dresses", "Outerwear", "Sleepwear",
    "Activewear", "Footwear", "Accessories"
  ],
  "home": [
    "Bedroom", "Bathroom", "Living Room", "Dining", "Kitchen",
    "Decor", "Textiles", "Furniture", "Storage", "Lighting"
  ],
  "beauty": [
    "Skincare", "Makeup", "Haircare", "Fragrance", "Body Care",
    "Men's Grooming", "Wellness", "Beauty Tools", "Gift Sets"
  ]
};

// Function to generate SKU based on category and random number
const generateSku = (category: string = ""): string => {
  const prefix = category ? category.substring(0, 2).toUpperCase() : "PR";
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  const year = new Date().getFullYear();
  return `${prefix}-${year}-${randomNum}`;
};

// Function to determine the current or upcoming fashion season
const getCurrentFashionSeason = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth(); // 0-11
  
  // Fashion industry seasons are typically:
  // Spring/Summer (SS): Starts in January for the upcoming summer
  // Fall/Winter (FW): Starts in July for the upcoming winter
  // Pre-Fall: May-June
  // Resort/Cruise: November-December
  
  // For simplicity, we'll use these approximate divisions:
  if (month >= 0 && month <= 4) { // Jan-May
    return `Spring/Summer ${year}`;
  } else if (month >= 5 && month <= 6) { // Jun-Jul
    return `Pre-Fall ${year}`;
  } else if (month >= 7 && month <= 9) { // Aug-Oct
    return `Fall/Winter ${year}`;
  } else { // Nov-Dec
    return `Resort ${year + 1}`;
  }
};

export const ProductFormTabs = ({
  selectedColor,
  setSelectedColor,
  colorOptions
}: ProductFormTabsProps) => {
  const [bulkTiers, setBulkTiers] = useState<BulkTier[]>([
    { id: '1', minQuantity: '10', discountPercent: '5' }
  ]);
  const [availabilityType, setAvailabilityType] = useState("in-stock");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [productName, setProductName] = useState("");
  const [sku, setSku] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [currentSeason, setCurrentSeason] = useState(getCurrentFashionSeason());
  const [formChanged, setFormChanged] = useState(false);
  
  // Auto-save functionality
  useEffect(() => {
    let autoSaveTimer: NodeJS.Timeout;
    
    if (formChanged) {
      autoSaveTimer = setTimeout(() => {
        handleAutoSave();
      }, 3000); // Autosave after 3 seconds of inactivity
    }
    
    return () => {
      clearTimeout(autoSaveTimer);
    };
  }, [formChanged]);
  
  // Mark form as changed when relevant fields are updated
  useEffect(() => {
    setFormChanged(true);
  }, [
    productName, 
    sku, 
    availabilityType, 
    selectedCategory,
    selectedSubcategory,
    isFeatured,
    videoUrl,
    websiteUrl,
    selectedColor,
    bulkTiers
  ]);

  // Generate SKU if empty when category changes
  useEffect(() => {
    if (!sku && selectedCategory) {
      setSku(generateSku(selectedCategory));
    }
  }, [selectedCategory, sku]);

  const addBulkTier = () => {
    const newId = String(bulkTiers.length + 1);
    setBulkTiers([...bulkTiers, { id: newId, minQuantity: '', discountPercent: '' }]);
  };

  const removeBulkTier = (id: string) => {
    setBulkTiers(bulkTiers.filter(tier => tier.id !== id));
  };

  const updateBulkTier = (id: string, field: 'minQuantity' | 'discountPercent', value: string) => {
    setBulkTiers(
      bulkTiers.map(tier => 
        tier.id === id ? { ...tier, [field]: value } : tier
      )
    );
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory(""); // Reset subcategory when category changes
    
    // If SKU is empty, generate one based on the new category
    if (!sku) {
      setSku(generateSku(category));
    }
  };
  
  const handleAutoSave = () => {
    // Here we would normally save to a database
    // For now we'll just show a toast notification
    toast.success("Product draft saved automatically", {
      position: "bottom-right",
      duration: 3000,
    });
    setFormChanged(false);
  };
  
  const analyzeImageColors = () => {
    // This would normally call an AI service to analyze an image
    // For this demo, we'll simulate by setting a random color
    const randomIndex = Math.floor(Math.random() * colorOptions.length);
    setSelectedColor(colorOptions[randomIndex].name);
    toast.success("Image analyzed and colors extracted", {
      position: "bottom-right",
    });
  };

  return (
    <Tabs defaultValue="basic" className="w-full">
      <TabsList className="w-full mb-6 grid grid-cols-2 md:grid-cols-5 bg-gray-100 p-1">
        <TabsTrigger 
          value="basic" 
          className="data-[state=active]:bg-white data-[state=active]:text-gray-800 data-[state=active]:shadow-sm"
        >
          <Tag className="mr-2 h-4 w-4" /> Basic Info
        </TabsTrigger>
        <TabsTrigger 
          value="materials" 
          className="data-[state=active]:bg-white data-[state=active]:text-gray-800 data-[state=active]:shadow-sm"
        >
          <Image className="mr-2 h-4 w-4" /> Materials
        </TabsTrigger>
        <TabsTrigger 
          value="pricing" 
          className="data-[state=active]:bg-white data-[state=active]:text-gray-800 data-[state=active]:shadow-sm"
        >
          <RussianRuble className="mr-2 h-4 w-4" /> Pricing
        </TabsTrigger>
        <TabsTrigger 
          value="shipping" 
          className="data-[state=active]:bg-white data-[state=active]:text-gray-800 data-[state=active]:shadow-sm"
        >
          <Truck className="mr-2 h-4 w-4" /> Shipping
        </TabsTrigger>
        <TabsTrigger 
          value="details" 
          className="data-[state=active]:bg-white data-[state=active]:text-gray-800 data-[state=active]:shadow-sm"
        >
          <Package className="mr-2 h-4 w-4" /> Details
        </TabsTrigger>
      </TabsList>
      
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Checkbox 
            id="isFeatured" 
            checked={isFeatured}
            onCheckedChange={(checked) => setIsFeatured(checked as boolean)}
            className="border-gray-500 data-[state=checked]:bg-gray-800 data-[state=checked]:text-white"
          />
          <Label htmlFor="isFeatured" className="text-sm font-medium">Featured Product</Label>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleAutoSave} 
          className="flex items-center gap-1 text-gray-600"
          disabled={!formChanged}
        >
          <Save className="h-4 w-4" />
          {formChanged ? "Save Draft" : "Saved"}
        </Button>
      </div>

      <TabsContent value="basic" className="space-y-6 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="productName" className="text-sm font-medium">
              Product Name*
            </Label>
            <Input
              id="productName"
              placeholder="e.g., Silk Blend Tailored Blazer"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-1">
              Include key attributes in name (material, style)
            </p>
          </div>
          
          <div>
            <Label htmlFor="sku" className="text-sm font-medium">
              SKU/Style Code*
            </Label>
            <div className="flex gap-2">
              <Input
                id="sku"
                placeholder="e.g., BL-2025-SLK"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
              />
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={() => setSku(generateSku(selectedCategory))}
                className="whitespace-nowrap"
              >
                Generate
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Unique identifier for inventory tracking
            </p>
          </div>
          
          <div className="col-span-1 md:col-span-2">
            <Label className="text-sm font-medium mb-2 block">
              Availability*
            </Label>
            <RadioGroup
              value={availabilityType}
              onValueChange={setAvailabilityType}
              className="grid grid-cols-1 md:grid-cols-3 gap-3"
            >
              <div className={`flex items-center space-x-2 border p-3 cursor-pointer transition-colors ${availabilityType === "in-stock" ? "border-gray-500 bg-gray-50" : "border-gray-200 hover:bg-gray-50"}`}>
                <RadioGroupItem value="in-stock" id="in-stock" className="hidden" />
                <div className={`flex h-7 w-7 items-center justify-center rounded-full ${availabilityType === "in-stock" ? "bg-gray-500" : "bg-gray-100"}`}>
                  <Check className={`h-4 w-4 ${availabilityType === "in-stock" ? "text-white" : "text-gray-400"}`} />
                </div>
                <Label htmlFor="in-stock" className="cursor-pointer font-medium">In Stock</Label>
              </div>
              
              <div className={`flex items-center space-x-2 border p-3 cursor-pointer transition-colors ${availabilityType === "pre-order" ? "border-gray-500 bg-gray-50" : "border-gray-200 hover:bg-gray-50"}`}>
                <RadioGroupItem value="pre-order" id="pre-order" className="hidden" />
                <div className={`flex h-7 w-7 items-center justify-center rounded-full ${availabilityType === "pre-order" ? "bg-gray-500" : "bg-gray-100"}`}>
                  <Calendar className={`h-4 w-4 ${availabilityType === "pre-order" ? "text-white" : "text-gray-400"}`} />
                </div>
                <Label htmlFor="pre-order" className="cursor-pointer font-medium">Pre-Order</Label>
              </div>
              
              <div className={`flex items-center space-x-2 border p-3 cursor-pointer transition-colors ${availabilityType === "commission" ? "border-gray-500 bg-gray-50" : "border-gray-200 hover:bg-gray-50"}`}>
                <RadioGroupItem value="commission" id="commission" className="hidden" />
                <div className={`flex h-7 w-7 items-center justify-center rounded-full ${availabilityType === "commission" ? "bg-gray-500" : "bg-gray-100"}`}>
                  <Handshake className={`h-4 w-4 ${availabilityType === "commission" ? "text-white" : "text-gray-400"}`} />
                </div>
                <Label htmlFor="commission" className="cursor-pointer font-medium">Commission</Label>
              </div>
            </RadioGroup>
            <p className="text-xs text-gray-500 mt-2">
              Select how this product is available to customers
            </p>
          </div>

          <div>
            <Label htmlFor="category" className="text-sm font-medium">
              Category*
            </Label>
            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="woman">Woman</SelectItem>
                <SelectItem value="man">Man</SelectItem>
                <SelectItem value="kids">Kids</SelectItem>
                <SelectItem value="home">Home</SelectItem>
                <SelectItem value="beauty">Beauty</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="subcategory" className="text-sm font-medium">
              Subcategory*
            </Label>
            <Select 
              value={selectedSubcategory} 
              onValueChange={setSelectedSubcategory}
              disabled={!selectedCategory}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={selectedCategory ? "Select subcategory" : "Select a category first"} />
              </SelectTrigger>
              <SelectContent>
                {selectedCategory && subcategoriesByCategory[selectedCategory]?.map((subcategory) => (
                  <SelectItem key={subcategory} value={subcategory}>
                    {subcategory}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {!selectedCategory && (
              <p className="text-xs text-gray-500 mt-1">
                Select a category first to see subcategories
              </p>
            )}
          </div>

          <div className="col-span-1 md:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="videoUrl" className="text-sm font-medium">
                  Video URL
                </Label>
                <div className="flex items-center gap-2">
                  <div className="text-gray-400 absolute ml-3">
                    <Video className="h-4 w-4" />
                  </div>
                  <Input
                    id="videoUrl"
                    placeholder="https://vimeo.com/yourproduct"
                    className="pl-10"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  YouTube, Vimeo or other video platform link
                </p>
              </div>
              
              <div>
                <Label htmlFor="websiteUrl" className="text-sm font-medium">
                  External Website
                </Label>
                <div className="flex items-center gap-2">
                  <div className="text-gray-400 absolute ml-3">
                    <Globe className="h-4 w-4" />
                  </div>
                  <Input
                    id="websiteUrl"
                    placeholder="https://yourwebsite.com/product"
                    className="pl-10"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Link to external product page
                </p>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="designer" className="text-sm font-medium">
              Designer/Collection
            </Label>
            <Input
              id="designer"
              placeholder="e.g. Summer 2025 Collection" 
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="season" className="text-sm font-medium">
                  Season/Year*
                </Label>
                <Select defaultValue={currentSeason}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select season" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Spring/Summer 2025">Spring/Summer 2025</SelectItem>
                    <SelectItem value="Pre-Fall 2024">Pre-Fall 2024</SelectItem>
                    <SelectItem value="Fall/Winter 2024">Fall/Winter 2024</SelectItem>
                    <SelectItem value="Resort 2025">Resort 2025</SelectItem>
                    <SelectItem value="timeless">Timeless/Non-seasonal</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500 mt-1">
                  Current season: {currentSeason}
                </p>
              </div>
              
              <div>
                <Label htmlFor="color" className="text-sm font-medium">
                  Colors
                </Label>
                <div className="space-y-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full flex justify-between">
                        <div className="flex items-center gap-2">
                          <Palette className="h-4 w-4" />
                          {selectedColor ? (
                            <>
                              <div 
                                className="h-4 w-4 rounded-full mr-1" 
                                style={{ backgroundColor: colorOptions.find(c => c.name === selectedColor)?.hex || '#FFFFFF' }} 
                              />
                              {selectedColor}
                            </>
                          ) : (
                            "Select color"
                          )}
                        </div>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 max-h-[300px] overflow-y-auto">
                      {colorOptions.map((color) => (
                        <DropdownMenuItem 
                          key={color.name}
                          onClick={() => setSelectedColor(color.name)}
                          className="flex items-center gap-2"
                        >
                          <div 
                            className="h-4 w-4 " 
                            style={{ backgroundColor: color.hex }} 
                          />
                          <span>{color.name}</span>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={analyzeImageColors}
                  >
                    <Image className="h-4 w-4 mr-2" /> Analyze Image for Colors
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="release" className="text-sm font-medium">
              Release Date
            </Label>
            <Input
              id="release"
              type="date" 
            />
            <p className="text-xs text-gray-500 mt-1">
              When the product will be available to buyers
            </p>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="materials" className="space-y-6 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="materials" className="text-sm font-medium">
              Materials/Fabric*
            </Label>
            <Input
              id="materials"
              placeholder="e.g., 70% Silk, 30% Cotton"
            />
          </div>
          
          <div>
            <Label htmlFor="origin" className="text-sm font-medium">
              Country of Origin
            </Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="italy">Italy</SelectItem>
                <SelectItem value="france">France</SelectItem>
                <SelectItem value="portugal">Portugal</SelectItem>
                <SelectItem value="turkey">Turkey</SelectItem>
                <SelectItem value="china">China</SelectItem>
                <SelectItem value="india">India</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="col-span-1 md:col-span-2">
            <Label htmlFor="care" className="text-sm font-medium">
              Care Instructions
            </Label>
            <Input
              id="care"
              placeholder="e.g., Dry clean only" 
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <Label htmlFor="sustainInfo" className="text-sm font-medium">
              Sustainability Information
            </Label>
            <Input
              id="sustainInfo"
              placeholder="e.g., GOTS certified organic cotton" 
            />
            <p className="text-xs text-gray-500 mt-1">
              Certifications, sustainable practices, etc.
            </p>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="pricing" className="space-y-6 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="wholesalePrice" className="text-sm font-medium">
              Wholesale Price*
            </Label>
            <div className="relative">
              <RussianRuble className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                id="wholesalePrice"
                className="pl-8"
                placeholder="0.00" 
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="msrp" className="text-sm font-medium">
              MSRP*
            </Label>
            <div className="relative">
              <RussianRuble className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                id="msrp"
                className="pl-8"
                placeholder="0.00" 
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="currency" className="text-sm font-medium">
              Currency
            </Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="RUB" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rub">RUB</SelectItem>
                <SelectItem value="usd">USD</SelectItem>
                <SelectItem value="eur">EUR</SelectItem>
                <SelectItem value="gbp">GBP</SelectItem>
                <SelectItem value="jpy">JPY</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="minOrder" className="text-sm font-medium">
              Minimum Order
            </Label>
            <Input
              id="minOrder"
              type="number"
              placeholder="e.g., 5" 
            />
          </div>
          
          <div>
            <Label htmlFor="availableUnits" className="text-sm font-medium">
              Available Units*
            </Label>
            <Input
              id="availableUnits"
              type="number"
              placeholder="0" 
            />
          </div>
          
          <div>
            <Label htmlFor="leadTime" className="text-sm font-medium">
              Lead Time (days)
            </Label>
            <Input
              id="leadTime"
              type="number"
              placeholder="e.g., 30" 
            />
            <p className="text-xs text-gray-500 mt-1">
              Production to delivery time
            </p>
          </div>

          <div className="col-span-1 md:col-span-3">
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-base">Bulk Order Discounts</h3>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={addBulkTier}
                  className="flex items-center"
                >
                  <Plus className="h-4 w-4 mr-1" /> Add Tier
                </Button>
              </div>
              
              {bulkTiers.length === 0 ? (
                <p className="text-sm text-gray-500 italic">No bulk pricing tiers added yet.</p>
              ) : (
                <div className="space-y-3">
                  {bulkTiers.map((tier) => (
                    <div key={tier.id} className="grid grid-cols-1 md:grid-cols-8 gap-3 items-end">
                      <div className="md:col-span-3">
                        <Label htmlFor={`quantity-${tier.id}`} className="text-sm">
                          Min Quantity
                        </Label>
                        <Input
                          id={`quantity-${tier.id}`}
                          type="number"
                          value={tier.minQuantity}
                          onChange={(e) => updateBulkTier(tier.id, 'minQuantity', e.target.value)}
                          placeholder="e.g., 10"
                        />
                      </div>
                      
                      <div className="md:col-span-3">
                        <Label htmlFor={`discount-${tier.id}`} className="text-sm">
                          Discount (%)
                        </Label>
                        <Input
                          id={`discount-${tier.id}`}
                          type="number"
                          value={tier.discountPercent}
                          onChange={(e) => updateBulkTier(tier.id, 'discountPercent', e.target.value)}
                          placeholder="e.g., 5"
                        />
                      </div>
                      
                      <div className="md:col-span-2 flex justify-start md:justify-end">
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm"
                          onClick={() => removeBulkTier(tier.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <p className="text-xs text-gray-500 mt-4">
                Set quantity thresholds and corresponding percentage discounts for bulk orders
              </p>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="shipping" className="space-y-6 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="weight" className="text-sm font-medium">
              Weight (kg)
            </Label>
            <Input
              id="weight"
              type="number"
              step="0.01"
              placeholder="0.00" 
            />
          </div>
          
          <div>
            <Label htmlFor="dimensions" className="text-sm font-medium">
              Dimensions (cm)
            </Label>
            <Input
              id="dimensions"
              placeholder="L x W x H" 
            />
          </div>
          
          <div className="col-span-1 md:col-span-2">
            <Label htmlFor="sizeGuide" className="text-sm font-medium">
              Size Guide
            </Label>
            <Input
              id="sizeGuide"
              placeholder="e.g., S (36), M (38), L (40)" 
            />
            <p className="text-xs text-gray-500 mt-1">
              Include international size conversions
            </p>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="details" className="space-y-6 mt-4">
        <div className="space-y-4">
          <div>
            <Label htmlFor="shortDescription" className="text-sm font-medium">
              Short Description*
            </Label>
            <Input
              id="shortDescription"
              placeholder="Brief product highlight (1-2 sentences)" 
            />
          </div>
          
          <div>
            <Label htmlFor="description" className="text-sm font-medium">
              Full Description*
            </Label>
            <textarea 
              id="description"
              className="w-full p-2 border border-gray-200 h-24"
              placeholder="Detailed description including key selling points, fit information, and styling suggestions" 
            ></textarea>
          </div>
        </div>
      </TabsContent>

      <div className="flex justify-end pt-4 mt-6 border-t">
        <Button variant="outline" className="mr-2" onClick={handleAutoSave}>
          <Save size={14} className="mr-1" />
          Save Draft
        </Button>
        <Button className="bg-black hover:bg-black-600">
          Publish Product
        </Button>
      </div>
    </Tabs>
  );
};
