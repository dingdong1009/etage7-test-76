
import { useState } from "react";
import { Filter, Search } from "lucide-react";
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
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        <Input 
          placeholder="Search products..." 
          className="pl-9" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="subtle" size="sm" className="h-10 flex gap-1.5">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-72 p-4">
            <div className="space-y-4">
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
                  variant="subtle" 
                  size="sm" 
                  onClick={() => {
                    setCategoryFilter("");
                    setSeasonFilter("");
                    setStatusFilter("");
                  }}
                >
                  Reset
                </Button>
                <Button 
                  variant="purple" 
                  size="sm"
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
