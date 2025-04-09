
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { FileText, Image, Tag, DollarSign, Package, Palette } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface ProductFormProps {
  onCancel: () => void;
}

interface ColorOption {
  name: string;
  hex: string;
}

const ProductForm = ({ onCancel }: ProductFormProps) => {
  const [selectedColor, setSelectedColor] = useState("");

  const colorOptions: ColorOption[] = [
    { name: "Neutral Gray", hex: "#8E9196" },
    { name: "Primary Purple", hex: "#9b87f5" },
    { name: "Secondary Purple", hex: "#7E69AB" },
    { name: "Tertiary Purple", hex: "#6E59A5" },
    { name: "Dark Purple", hex: "#1A1F2C" },
    { name: "Light Purple", hex: "#D6BCFA" },
    { name: "Soft Green", hex: "#F2FCE2" },
    { name: "Soft Yellow", hex: "#FEF7CD" },
    { name: "Soft Orange", hex: "#FEC6A1" },
    { name: "Soft Purple", hex: "#E5DEFF" },
    { name: "Soft Pink", hex: "#FFDEE2" },
    { name: "Soft Blue", hex: "#D3E4FD" },
    { name: "Vivid Purple", hex: "#8B5CF6" },
    { name: "Magenta Pink", hex: "#D946EF" },
    { name: "Bright Orange", hex: "#F97316" },
    { name: "Ocean Blue", hex: "#0EA5E9" },
    { name: "Charcoal Gray", hex: "#403E43" },
    { name: "Navy Blue", hex: "#1E3A8A" },
    { name: "Burgundy", hex: "#9F1239" },
    { name: "Tan", hex: "#D4A76A" },
  ];

  return (
    <Card className="border border-gray-200">
      <CardHeader>
        <CardTitle className="text-1xl md:text-2xl uppercase font-thin">Add New Product</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <FileText size={18} /> Basic Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="productName">Product Name</Label>
                <Input id="productName" placeholder="Enter product name" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sku">SKU</Label>
                <Input id="sku" placeholder="Enter unique SKU" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Enter product description" 
                className="min-h-[100px]" 
              />
            </div>
          </div>
          
          {/* Categories & Tags */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Tag size={18} /> Categories & Tags
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="outerwear">Outerwear</SelectItem>
                    <SelectItem value="tops">Tops</SelectItem>
                    <SelectItem value="bottoms">Bottoms</SelectItem>
                    <SelectItem value="dresses">Dresses</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="season">Season</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select season" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="spring-summer-2025">Spring/Summer 2025</SelectItem>
                    <SelectItem value="fall-winter-2024">Fall/Winter 2024</SelectItem>
                    <SelectItem value="resort-2025">Resort 2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Tags</Label>
              <Input placeholder="Enter tags separated by commas" />
            </div>
          </div>
          
          {/* Pricing */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <DollarSign size={18} /> Pricing
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Retail Price</Label>
                <Input id="price" type="number" min="0" step="0.01" placeholder="0.00" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="salePrice">Sale Price (Optional)</Label>
                <Input id="salePrice" type="number" min="0" step="0.01" placeholder="0.00" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cost">Cost (Optional)</Label>
                <Input id="cost" type="number" min="0" step="0.01" placeholder="0.00" />
              </div>
            </div>
          </div>
          
          {/* Inventory */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Package size={18} /> Inventory
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stock">Stock Quantity</Label>
                <Input id="stock" type="number" min="0" placeholder="0" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sku">SKU</Label>
                <Input id="sku" placeholder="Enter SKU" />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch id="trackInventory" />
              <Label htmlFor="trackInventory">Track inventory for this product</Label>
            </div>
          </div>
          
          {/* Variants - Colors */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Palette size={18} /> Colors
            </h3>
            
            <div className="space-y-2">
              <Label>Select Color</Label>
              <ToggleGroup type="single" className="flex flex-wrap gap-2" value={selectedColor} onValueChange={setSelectedColor}>
                {colorOptions.map((color) => (
                  <ToggleGroupItem 
                    key={color.name}
                    value={color.name}
                    title={color.name}
                    className="w-8 h-8 rounded-full p-0 border border-gray-200 flex items-center justify-center" 
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </ToggleGroup>
              {selectedColor && (
                <p className="text-sm mt-2">Selected: {selectedColor}</p>
              )}
            </div>
          </div>
          
          {/* Images */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Image size={18} /> Images
            </h3>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <div className="flex flex-col items-center">
                <Image className="h-12 w-12 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">Drag images here or click to upload</p>
                <Button variant="outline" size="sm" className="mt-4">
                  Upload Images
                </Button>
              </div>
            </div>
          </div>
          
          {/* Status & Visibility */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Status</h3>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <Switch id="active" defaultChecked />
                <Label htmlFor="active">Active</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="featured" />
                <Label htmlFor="featured">Featured Product</Label>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onCancel}>Cancel</Button>
            <Button className="bg-black hover:bg-black-600">Save Product</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProductForm;
