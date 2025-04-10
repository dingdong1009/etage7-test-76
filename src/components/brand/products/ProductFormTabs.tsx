
import { useState } from "react";
import { 
  DollarSign, 
  FileText, 
  Image, 
  Package, 
  Palette, 
  Tag, 
  Truck 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { ColorOption } from "../../../types/product";

interface ProductFormTabsProps {
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  colorOptions: ColorOption[];
}

export const ProductFormTabs = ({
  selectedColor,
  setSelectedColor,
  colorOptions
}: ProductFormTabsProps) => {
  return (
    <Tabs defaultValue="basic" className="w-full">
      <TabsList className="w-full mb-6 grid grid-cols-2 md:grid-cols-5 bg-gray-100 p-1">
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
          <RubbleSign className="mr-2 h-4 w-4" /> Pricing
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
              placeholder="e.g. Summer 2025 Collection" 
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <Label htmlFor="color" className="text-sm font-medium">
                  Colors
                </Label>
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
                          className="h-4 w-4 rounded-full" 
                          style={{ backgroundColor: color.hex }} 
                        />
                        <span>{color.name}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <p className="text-xs text-gray-500 mt-1">
                  Select primary product color
                </p>
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
        <Button variant="outline" className="mr-2">
          Save Draft
        </Button>
        <Button className="bg-black hover:bg-black-600">
          Publish Product
        </Button>
      </div>
    </Tabs>
  );
};
