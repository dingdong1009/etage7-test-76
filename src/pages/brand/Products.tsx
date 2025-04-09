
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Plus, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

const BrandProducts = () => {
  // Example form state
  const [images, setImages] = useState<File[]>([]);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setImages(prev => [...prev, ...fileArray]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <div className="flex gap-2">
          <button className="text-xs px-3 py-2 bg-blue-500 text-white rounded flex items-center gap-1">
            <Plus size={16} />
            Add Product
          </button>
          <button className="text-xs px-3 py-2 bg-gray-200 rounded flex items-center gap-1">
            <FileText size={16} />
            Export
          </button>
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
                  <select id="category" className="w-full p-2 border border-gray-200 rounded">
                    <option value="">Select Category</option>
                    <option value="dresses">Dresses</option>
                    <option value="tops">Tops</option>
                    <option value="bottoms">Bottoms</option>
                    <option value="outerwear">Outerwear</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="subcategory">Subcategory</Label>
                  <select id="subcategory" className="w-full p-2 border border-gray-200 rounded">
                    <option value="">Select Subcategory</option>
                    <option value="midi">Midi Dresses</option>
                    <option value="maxi">Maxi Dresses</option>
                    <option value="mini">Mini Dresses</option>
                  </select>
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
                    <select className="w-16 border border-gray-200 rounded-l">
                      <option>€</option>
                      <option>$</option>
                      <option>£</option>
                    </select>
                    <Input id="retailPrice" placeholder="0.00" className="rounded-l-none" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="wholesalePrice">Wholesale Price *</Label>
                  <div className="flex">
                    <select className="w-16 border border-gray-200 rounded-l">
                      <option>€</option>
                      <option>$</option>
                      <option>£</option>
                    </select>
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
                  <Input id="countryOfOrigin" placeholder="e.g., Italy, France" />
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

