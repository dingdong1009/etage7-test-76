
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Plus, FileText } from "lucide-react";

const BrandProducts = () => {
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
              <input type="file" multiple className="hidden" />
            </div>
          </div>
          
          {/* Mass upload button */}
          <div className="flex flex-col sm:flex-row gap-2 items-center">
            <button className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Mass Upload from CSV
            </button>
            <button className="w-full sm:w-auto px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
              Download Template
            </button>
          </div>
          
          {/* Sample product form */}
          <div className="border rounded-lg p-4 space-y-4">
            <h3 className="font-medium">Product Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input 
                  type="text" 
                  className="w-full p-2 border border-gray-200 rounded"
                  placeholder="Enter product name" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SKU
                </label>
                <input 
                  type="text" 
                  className="w-full p-2 border border-gray-200 rounded"
                  placeholder="Enter SKU" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <input 
                  type="number" 
                  className="w-full p-2 border border-gray-200 rounded"
                  placeholder="0.00" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <input 
                  type="number" 
                  className="w-full p-2 border border-gray-200 rounded"
                  placeholder="0" 
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea 
                className="w-full p-2 border border-gray-200 rounded h-24"
                placeholder="Enter product description" 
              ></textarea>
            </div>
            
            <div className="flex justify-end">
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Save Product
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BrandProducts;
