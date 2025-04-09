
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Plus, FileText, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

const BrandProducts = () => {
  // Example form state
  const [images, setImages] = useState<File[]>([]);
  const [currency, setCurrency] = useState<string>("€");
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setImages(prev => [...prev, ...fileArray]);
    }
  };

  // Categories for dropdown
  const categories = [
    { label: "Dresses", value: "dresses" },
    { label: "Tops", value: "tops" },
    { label: "Bottoms", value: "bottoms" },
    { label: "Outerwear", value: "outerwear" },
    { label: "Accessories", value: "accessories" },
  ];

  // Subcategories mapped by category
  const subcategoriesMap = {
    dresses: [
      { label: "Midi Dresses", value: "midi" },
      { label: "Maxi Dresses", value: "maxi" },
      { label: "Mini Dresses", value: "mini" },
    ],
    tops: [
      { label: "T-Shirts", value: "tshirts" },
      { label: "Blouses", value: "blouses" },
      { label: "Shirts", value: "shirts" },
    ],
    bottoms: [
      { label: "Pants", value: "pants" },
      { label: "Skirts", value: "skirts" },
      { label: "Shorts", value: "shorts" },
    ],
    outerwear: [
      { label: "Jackets", value: "jackets" },
      { label: "Coats", value: "coats" },
      { label: "Blazers", value: "blazers" },
    ],
    accessories: [
      { label: "Bags", value: "bags" },
      { label: "Jewelry", value: "jewelry" },
      { label: "Shoes", value: "shoes" },
    ],
  };

  // State for selected category and subcategories
  const [selectedCategory, setSelectedCategory] = useState("");
  const [availableSubcategories, setAvailableSubcategories] = useState([]);

  // Handle category change to update subcategory options
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setAvailableSubcategories(subcategoriesMap[value as keyof typeof subcategoriesMap] || []);
  };

  // Available currencies
  const currencies = [
    { symbol: "€", label: "Euro" },
    { symbol: "$", label: "USD" },
    { symbol: "£", label: "GBP" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" className="h-8 text-xs px-3 py-2 gap-1">
                <Plus size={16} />
                Add Product
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuItem>Single Product</DropdownMenuItem>
              <DropdownMenuItem>Bulk Upload</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="sm" className="h-8 text-xs px-3 py-2 gap-1">
            <FileText size={16} />
            Export
          </Button>
        </div>
      </div>
      
      <Card className="border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Add New Products</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Drag and drop area */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex flex-col items-center gap-2">
              <Upload className="h-10 w-10 text-gray-400" />
              <h3 className="font-medium">Drag and drop product images here</h3>
              <p className="text-sm text-gray-500">Or click to browse files</p>
              <input 
                type="file" 
                multiple 
                className="hidden" 
                onChange={handleFileChange}
              />
              {images.length > 0 && (
                <p className="text-sm text-blue-600">{images.length} file(s) selected</p>
              )}
            </div>
          </div>
          
          {/* Mass upload button */}
          <div className="flex flex-col sm:flex-row gap-2 items-center">
            <Button className="w-full sm:w-auto">
              Mass Upload from CSV
            </Button>
            <Button variant="outline" className="w-full sm:w-auto">
              Download Template
            </Button>
          </div>
          
          {/* Enhanced product form */}
          <div className="border rounded-lg p-4 space-y-6">
            <h3 className="font-medium text-lg border-b pb-2">Product Details</h3>
            
            {/* Basic Information */}
            <div className="space-y-4">
              <h4 className="font-medium">Basic Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="productName">Product Name *</Label>
                  <Input id="productName" placeholder="Enter product name" />
                </div>
                
                <div>
                  <Label htmlFor="sku">SKU / Article Number *</Label>
                  <Input id="sku" placeholder="Enter SKU" />
                </div>
                
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select onValueChange={handleCategoryChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="subcategory">Subcategory</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Subcategory" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableSubcategories.map((subcategory: any) => (
                        <SelectItem key={subcategory.value} value={subcategory.value}>
                          {subcategory.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            {/* Pricing & Inventory */}
            <div className="space-y-4">
              <h4 className="font-medium">Pricing & Inventory</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="retailPrice">Retail Price *</Label>
                  <div className="flex">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button 
                          variant="outline" 
                          className="w-16 px-2 rounded-r-none border-r-0 flex justify-center"
                        >
                          {currency}
                          <ChevronDown className="ml-1 h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-40 p-0">
                        <div className="grid">
                          {currencies.map((c) => (
                            <Button
                              key={c.symbol}
                              variant="ghost"
                              className="justify-start font-normal"
                              onClick={() => setCurrency(c.symbol)}
                            >
                              <span>{c.symbol}</span>
                              <span className="ml-2">{c.label}</span>
                              {currency === c.symbol && (
                                <Check className="ml-auto h-4 w-4" />
                              )}
                            </Button>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                    <Input id="retailPrice" placeholder="0.00" className="rounded-l-none" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="wholesalePrice">Wholesale Price *</Label>
                  <div className="flex">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button 
                          variant="outline" 
                          className="w-16 px-2 rounded-r-none border-r-0 flex justify-center"
                        >
                          {currency}
                          <ChevronDown className="ml-1 h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-40 p-0">
                        <div className="grid">
                          {currencies.map((c) => (
                            <Button
                              key={c.symbol}
                              variant="ghost"
                              className="justify-start font-normal"
                              onClick={() => setCurrency(c.symbol)}
                            >
                              <span>{c.symbol}</span>
                              <span className="ml-2">{c.label}</span>
                              {currency === c.symbol && (
                                <Check className="ml-auto h-4 w-4" />
                              )}
                            </Button>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                    <Input id="wholesalePrice" placeholder="0.00" className="rounded-l-none" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="stock">Stock Quantity *</Label>
                  <Input id="stock" type="number" placeholder="0" min="0" />
                </div>
              </div>
            </div>
            
            {/* Product Details */}
            <div className="space-y-4">
              <h4 className="font-medium">Product Specifications</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="material">Materials</Label>
                  <Input id="material" placeholder="e.g., 100% Cotton, Silk" />
                </div>
                
                <div>
                  <Label htmlFor="colors">Available Colors</Label>
                  <Input id="colors" placeholder="e.g., Black, White, Red" />
                </div>
                
                <div>
                  <Label htmlFor="sizes">Available Sizes</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                      <label key={size} className="flex items-center">
                        <input type="checkbox" className="mr-1" />
                        {size}
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="weight">Weight (g)</Label>
                  <Input id="weight" type="number" placeholder="0" />
                </div>
                
                <div>
                  <Label htmlFor="dimensions">Dimensions (cm)</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Input placeholder="Length" />
                    <Input placeholder="Width" />
                    <Input placeholder="Height" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="countryOfOrigin">Country of Origin</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                    <SelectContent>
                      {["Italy", "France", "Spain", "Portugal", "Turkey", "China", "Bangladesh", "Vietnam"].map((country) => (
                        <SelectItem key={country} value={country.toLowerCase()}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            {/* Sales & Marketing */}
            <div className="space-y-4">
              <h4 className="font-medium">Sales & Marketing</h4>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="shortDescription">Short Description *</Label>
                  <Textarea 
                    id="shortDescription" 
                    placeholder="Brief product description (100-150 characters)" 
                    className="h-20"
                  />
                </div>
                
                <div>
                  <Label htmlFor="fullDescription">Full Description *</Label>
                  <Textarea 
                    id="fullDescription" 
                    placeholder="Detailed product description" 
                    className="h-32"
                  />
                </div>
                
                <div>
                  <Label htmlFor="careInstructions">Care Instructions</Label>
                  <Textarea 
                    id="careInstructions" 
                    placeholder="e.g., Hand wash cold, Do not bleach" 
                    className="h-20"
                  />
                </div>
                
                <div>
                  <Label htmlFor="keywords">Keywords/Tags</Label>
                  <Input 
                    id="keywords" 
                    placeholder="e.g., summer, casual, elegant (comma-separated)" 
                  />
                </div>
                
                <div>
                  <Label>Sustainability Score</Label>
                  <div className="flex gap-4 items-center pt-2">
                    <Slider defaultValue={[50]} max={100} step={1} />
                    <span className="text-sm w-8">50%</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Shipping & Logistics */}
            <div className="space-y-4">
              <h4 className="font-medium">Shipping & Logistics</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="minOrderQuantity">Minimum Order Quantity</Label>
                  <Input id="minOrderQuantity" type="number" defaultValue={1} min={1} />
                </div>
                
                <div>
                  <Label htmlFor="leadTime">Production Lead Time (days)</Label>
                  <Input id="leadTime" type="number" placeholder="0" min={0} />
                </div>
                
                <div>
                  <Label htmlFor="hsCode">HS Code</Label>
                  <Input id="hsCode" placeholder="Harmonized System Code" />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline">Save as Draft</Button>
              <Button>Publish Product</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BrandProducts;
