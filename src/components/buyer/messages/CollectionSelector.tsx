
import { useState } from "react";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type CollectionSelectorProps = {
  brandId: string;
  selectedCollection: string | null;
  onSelectCollection: (collectionId: string) => void;
};

// Mock data for collections
const mockCollections = {
  "brand1": [
    { id: "col1", name: "Spring 2025", season: "Spring/Summer", itemCount: 24 },
    { id: "col2", name: "Winter Collection", season: "Fall/Winter", itemCount: 18 },
    { id: "col3", name: "Resort Wear", season: "Resort", itemCount: 12 }
  ],
  "brand2": [
    { id: "col4", name: "Spring Essentials", season: "Spring/Summer", itemCount: 15 },
    { id: "col5", name: "Fall Luxury", season: "Fall/Winter", itemCount: 22 }
  ]
};

export const CollectionSelector = ({ 
  brandId, 
  selectedCollection, 
  onSelectCollection 
}: CollectionSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Get collections for the selected brand
  const brandCollections = mockCollections[brandId as keyof typeof mockCollections] || [];
  
  const filteredCollections = brandCollections.filter(collection => 
    collection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    collection.season.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
        <Input
          type="search"
          placeholder="Search collections..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-3">Available Collections</h3>
        {filteredCollections.length === 0 ? (
          <p className="text-sm text-gray-500">No collections found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredCollections.map(collection => (
              <Card 
                key={collection.id}
                className={`cursor-pointer border ${selectedCollection === collection.id ? 'border-black' : 'border-gray-200'}`}
                onClick={() => onSelectCollection(collection.id)}
              >
                <CardContent className="p-4">
                  <h4 className="font-medium">{collection.name}</h4>
                  <p className="text-sm text-gray-500">{collection.season}</p>
                  <p className="text-xs text-gray-500 mt-1">{collection.itemCount} items</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
