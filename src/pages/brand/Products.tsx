
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from "@/components/ui/tabs";
import { 
  Upload, 
  Plus, 
  FileText, 
  Image, 
  Tag, 
  DollarSign, 
  Package, 
  Truck
} from "lucide-react";

const BrandProducts = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-4xl md:text-6xl uppercase font-thin mb-6">Products</h1>
        <div className="flex gap-2">
          <Button 
            onClick={() => setShowForm(true)} 
            className="h-9 text-xs bg-black-500 hover:bg-black-600 text-white"
          >
            <Plus size={16} className="mr-1" />
            Add Product
          </Button>
          <Button variant="outline" size="sm" className="h-9 text-xs">
            <FileText size={16} className="mr-1" />
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
              <p className="text-xs text-gray-400">Upload high-quality product images with clean backgrounds</p>
              <input type="file" multiple className="hidden" />
            </div>
          </div>
          
          {/* Mass upload button */}
          <div className="flex flex-col sm:flex-row gap-2 items-center">
            <Button variant="default" className="w-full sm:w-auto bg-black-500 hover:bg-black-600">
              Mass Upload from CSV
            </Button>
            <Button variant="outline" className="w-full sm:w-auto">
              Download Template
            </Button>
          </div>
          
          {/* Tabbed Fashion Product Form */}
          <div className="border rounded-lg p-4">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="w-full mb-6 grid grid-cols-2 md:grid-cols-5 bg-gray-100 p-1 rounded-md">
                <TabsTrigger 
                  value="basic" 
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
                >
                  <Tag className="mr-2 h-4 w-4" /> Basic Info
                </TabsTrigger>
                <TabsTrigger 
                  value="materials" 
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
                >
                  <Image className="mr-2 h-4 w-4" /> Materials
                </TabsTrigger>
                <TabsTrigger 
                  value="pricing" 
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
                >
                  <DollarSign className="mr-2 h-4 w-4" /> Pricing
                </TabsTrigger>
                <TabsTrigger 
                  value="shipping" 
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
                >
                  <Truck className="mr-2 h-4 w-4" /> Shipping
                </TabsTrigger>
                <TabsTrigger 
                  value="details" 
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
                >
                  <Package className="mr-2 h-4 w-4" /> Details
                </TabsTrigger>
              </TabsList>

              {/* Basic Information Tab */}
              <TabsContent value="basic" className="space-y-6 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="productName" className="text-sm font-medium">
                      Product Name*
                    </Label>
                    <Input
                      id="productName"
                      placeholder="e.g., Silk Blend Tailored Blazer"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Include key attributes in name (material, style)
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="sku" className="text-sm font-medium">
                      SKU/Style Code*
                    </Label>
                    <Input
                      id="sku"
                      placeholder="e.g., BL-2025-SLK"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Unique identifier for inventory tracking
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="category" className="text-sm font-medium">
                      Category*
                    </Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="outerwear">Outerwear</SelectItem>
                        <SelectItem value="tops">Tops</SelectItem>
                        <SelectItem value="bottoms">Bottoms</SelectItem>
                        <SelectItem value="dresses">Dresses</SelectItem>
                        <SelectItem value="footwear">Footwear</SelectItem>
                        <SelectItem value="accessories">Accessories</SelectItem>
                        <SelectItem value="jewelry">Jewelry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="designer" className="text-sm font-medium">
                      Designer/Collection
                    </Label>
                    <Input
                      id="designer"
                      placeholder="e.g., Summer 2025 Collection" 
                    />
                  </div>

                  <div>
                    <Label htmlFor="season" className="text-sm font-medium">
                      Season/Year*
                    </Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select season" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ss25">Spring/Summer 2025</SelectItem>
                        <SelectItem value="fw24">Fall/Winter 2024</SelectItem>
                        <SelectItem value="resort25">Resort 2025</SelectItem>
                        <SelectItem value="pre-fall24">Pre-Fall 2024</SelectItem>
                        <SelectItem value="timeless">Timeless/Non-seasonal</SelectItem>
                      </SelectContent>
                    </Select>
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

              {/* Materials Tab */}
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

              {/* Pricing Tab */}
              <TabsContent value="pricing" className="space-y-6 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="wholesalePrice" className="text-sm font-medium">
                      Wholesale Price*
                    </Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
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
                      <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
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
                        <SelectValue placeholder="USD" />
                      </SelectTrigger>
                      <SelectContent>
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
                </div>
              </TabsContent>

              {/* Shipping Tab */}
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

              {/* Details Tab */}
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
                      className="w-full p-2 border border-gray-200 rounded h-24"
                      placeholder="Detailed description including key selling points, fit information, and styling suggestions" 
                    ></textarea>
                  </div>
                </div>
              </TabsContent>

              <div className="flex justify-end pt-4 mt-6 border-t">
                <Button variant="outline" className="mr-2">
                  Save Draft
                </Button>
                <Button className="bg-black-500 hover:bg-black-600">
                  Publish Product
                </Button>
              </div>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BrandProducts;
