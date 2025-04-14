
import { useState } from "react";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Check } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

type ProductSelectorProps = {
  brandId: string;
  collectionId: string;
  selectedProducts: string[];
  onSelectProducts: (productIds: string[]) => void;
};

// Mock data for products
const mockProducts = {
  "col1": [
    { id: "p1", name: "Linen Blazer", color: "Beige", price: "€120" },
    { id: "p2", name: "Silk Blouse", color: "White", price: "€85" },
    { id: "p3", name: "Cotton Pants", color: "Navy", price: "€95" },
    { id: "p4", name: "Summer Dress", color: "Floral", price: "€110" },
    { id: "p5", name: "Lightweight Cardigan", color: "Cream", price: "€75" },
  ],
  "col2": [
    { id: "p6", name: "Wool Coat", color: "Charcoal", price: "€250" },
    { id: "p7", name: "Cashmere Sweater", color: "Burgundy", price: "€180" }
  ]
};

export const ProductSelector = ({ 
  brandId, 
  collectionId, 
  selectedProducts, 
  onSelectProducts 
}: ProductSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Get products for the selected collection
  const collectionProducts = mockProducts[collectionId as keyof typeof mockProducts] || [];
  
  const filteredProducts = collectionProducts.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.color.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProductToggle = (productId: string) => {
    if (selectedProducts.includes(productId)) {
      onSelectProducts(selectedProducts.filter(id => id !== productId));
    } else {
      onSelectProducts([...selectedProducts, productId]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
        <Input
          type="search"
          placeholder="Search products..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-3">Products in Collection</h3>
        {filteredProducts.length === 0 ? (
          <p className="text-sm text-gray-500">No products found</p>
        ) : (
          <div className="space-y-3">
            {filteredProducts.map(product => (
              <Card 
                key={product.id}
                className={`cursor-pointer border ${selectedProducts.includes(product.id) ? 'border-black' : 'border-gray-200'}`}
                onClick={() => handleProductToggle(product.id)}
              >
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{product.name}</h4>
                    <p className="text-sm text-gray-500">{product.color} • {product.price}</p>
                  </div>
                  <Checkbox 
                    checked={selectedProducts.includes(product.id)} 
                    onCheckedChange={() => handleProductToggle(product.id)}
                    className="data-[state=checked]:bg-black data-[state=checked]:border-black"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
