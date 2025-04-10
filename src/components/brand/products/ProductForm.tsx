
import { Upload, FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductFormTabs } from "./ProductFormTabs";
import { ColorOption } from "../../../types/product";

interface ProductFormProps {
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  colorOptions: ColorOption[];
}

export const ProductForm = ({
  selectedColor,
  setSelectedColor,
  colorOptions
}: ProductFormProps) => {
  return (
    <Card className="border border-gray-200">
      <CardHeader>
        <CardTitle className="text-1xl md:text-2xl uppercase font-thin mb-6">Add New Products</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="border-2 border-dashed border-gray-300 p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors">
          <div className="flex flex-col items-center gap-2">
            <Upload className="h-10 w-10 text-gray-400" />
            <h3 className="font-medium">Drag and drop product images here</h3>
            <p className="text-sm text-gray-500">Or click to browse files</p>
            <p className="text-xs text-gray-400">Upload high-quality product images with clean backgrounds</p>
            <input type="file" multiple className="hidden" />
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 items-center">
          <Button variant="default" className="w-full sm:w-auto bg-black hover:bg-black-600">
            Mass Upload from CSV
          </Button>
          <Button variant="outline" className="w-full sm:w-auto">
            Download Template
          </Button>
        </div>
        
        <div className="border p-4">
          <ProductFormTabs 
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            colorOptions={colorOptions}
          />
        </div>
      </CardContent>
    </Card>
  );
};
