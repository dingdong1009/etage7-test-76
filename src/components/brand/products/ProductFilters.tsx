
import { useState } from "react";
import { Filter, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface ProductFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  seasonFilter: string;
  setSeasonFilter: (season: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
}

export const ProductFilters = ({
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
  seasonFilter,
  setSeasonFilter,
  statusFilter,
  setStatusFilter
}: ProductFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search products..." 
            className="pl-9" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-10">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="h-10 px-2">
                Advanced
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="mt-4 space-y-4">
            <div>
              <Label className="text-sm">Category</Label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All categories</SelectItem>
                  <SelectItem value="Outerwear">Outerwear</SelectItem>
                  <SelectItem value="Tops">Tops</SelectItem>
                  <SelectItem value="Bottoms">Bottoms</SelectItem>
                  <SelectItem value="Dresses">Dresses</SelectItem>
                  <SelectItem value="Accessories">Accessories</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm">Season</Label>
              <Select value={seasonFilter} onValueChange={setSeasonFilter}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="All seasons" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All seasons</SelectItem>
                  <SelectItem value="Spring/Summer 2025">Spring/Summer 2025</SelectItem>
                  <SelectItem value="Fall/Winter 2024">Fall/Winter 2024</SelectItem>
                  <SelectItem value="Resort 2025">Resort 2025</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setCategoryFilter("");
                  setSeasonFilter("");
                  setStatusFilter("");
                }}
              >
                Reset
              </Button>
              <Button size="sm" className="bg-black hover:bg-black-600">
                Apply Filters
              </Button>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

