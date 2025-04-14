
import { useState } from "react";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type BrandSelectorProps = {
  selectedBrand: string | null;
  onSelectBrand: (brandId: string) => void;
};

// Mock data for recently viewed brands
const recentBrands = [
  { id: "brand1", name: "Brand Studio A", lastViewed: "2 hours ago" },
  { id: "brand2", name: "Fashion House B", lastViewed: "Yesterday" },
  { id: "brand3", name: "Designer C", lastViewed: "2 days ago" }
];

// Mock data for all brands
const allBrands = [
  { id: "brand1", name: "Brand Studio A" },
  { id: "brand2", name: "Fashion House B" },
  { id: "brand3", name: "Designer C" },
  { id: "brand4", name: "Atelier D" },
  { id: "brand5", name: "Studio E" },
  { id: "brand6", name: "F Collections" }
];

export const BrandSelector = ({ selectedBrand, onSelectBrand }: BrandSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredBrands = allBrands.filter(brand => 
    brand.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
        <Input
          type="search"
          placeholder="Search brands..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {recentBrands.length > 0 && !searchQuery && (
        <div>
          <h3 className="text-sm font-medium mb-3">Recently Viewed</h3>
          <div className="space-y-2">
            {recentBrands.map(brand => (
              <Card 
                key={brand.id}
                className={`cursor-pointer border ${selectedBrand === brand.id ? 'border-black' : 'border-gray-200'}`}
                onClick={() => onSelectBrand(brand.id)}
              >
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{getInitials(brand.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{brand.name}</h4>
                      <p className="text-xs text-gray-500">Viewed {brand.lastViewed}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
      
      <div>
        <h3 className="text-sm font-medium mb-3">All Brands</h3>
        {filteredBrands.length === 0 ? (
          <p className="text-sm text-gray-500">No brands found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredBrands.map(brand => (
              <Card 
                key={brand.id}
                className={`cursor-pointer border ${selectedBrand === brand.id ? 'border-black' : 'border-gray-200'}`}
                onClick={() => onSelectBrand(brand.id)}
              >
                <CardContent className="p-4 flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{getInitials(brand.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{brand.name}</h4>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
