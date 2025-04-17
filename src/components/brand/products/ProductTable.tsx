
import { useState } from "react";
import { ArrowUpDown, CheckCircle, Edit, Eye, Filter, Search, Trash2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Product, ColorOption } from "../../../types/product";

interface ProductTableProps {
  products: Product[];
  colorOptions: ColorOption[];
  handleSort: (key: string) => void;
  sortConfig: { key: string, direction: string };
  toggleProductStatus: (id: number, newStatus: string) => void;
  deleteProduct: (id: number) => void;
  onEditProduct: () => void;
}

export const ProductTable = ({
  products,
  colorOptions,
  handleSort,
  sortConfig,
  toggleProductStatus,
  deleteProduct,
  onEditProduct
}: ProductTableProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [seasonFilter, setSeasonFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  
  // Filter products based on search query and filters
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = categoryFilter ? product.category === categoryFilter : true;
    const matchesSeason = seasonFilter ? product.season === seasonFilter : true;
    const matchesStatus = statusFilter ? product.status === statusFilter : true;
    
    return matchesSearch && matchesCategory && matchesSeason && matchesStatus;
  });

  // Get unique categories, seasons from products for filter options
  const categories = [...new Set(products.map(product => product.category))];
  const seasons = [...new Set(products.map(product => product.season))];
  
  return (
    <div>
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
              <Button variant="outline" size="sm" className="h-10 flex gap-1.5">
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
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
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
                      {seasons.map(season => (
                        <SelectItem key={season} value={season}>{season}</SelectItem>
                      ))}
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
                  <Button 
                    size="sm" 
                    className="bg-black hover:bg-gray-800"
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-[250px] cursor-pointer" onClick={() => handleSort('name')}>
                <div className="flex items-center">
                  Product Name
                  <ArrowUpDown size={16} className="ml-1.5" />
                </div>
              </TableHead>
              <TableHead className="w-[100px] cursor-pointer" onClick={() => handleSort('sku')}>
                <div className="flex items-center">
                  SKU
                  <ArrowUpDown size={16} className="ml-1.5" />
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('category')}>
                <div className="flex items-center">
                  Category
                  <ArrowUpDown size={16} className="ml-1.5" />
                </div>
              </TableHead>
              <TableHead className="hidden md:table-cell">Season</TableHead>
              <TableHead className="hidden md:table-cell">
                <div className="flex items-center">
                  Colors
                </div>
              </TableHead>
              <TableHead className="cursor-pointer text-right" onClick={() => handleSort('price')}>
                <div className="flex items-center justify-end">
                  Price
                  <ArrowUpDown size={16} className="ml-1.5" />
                </div>
              </TableHead>
              <TableHead className="w-[100px] cursor-pointer" onClick={() => handleSort('status')}>
                <div className="flex items-center">
                  Status
                  <ArrowUpDown size={16} className="ml-1.5" />
                </div>
              </TableHead>
              <TableHead className="w-[100px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No products found.
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.sku}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell className="hidden md:table-cell">{product.season}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-8 px-2 flex items-center gap-2">
                          <div 
                            className="h-3 w-3 rounded-full" 
                            style={{ 
                              backgroundColor: colorOptions.find(c => c.name === product.color)?.hex || '#000000'
                            }} 
                          />
                          <span className="text-xs">{product.color}</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56 max-h-[300px] overflow-y-auto">
                        {colorOptions.map((color) => (
                          <DropdownMenuItem 
                            key={color.name}
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
                  </TableCell>
                  <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {product.status === 'active' ? 'Active' : 'Draft'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8" 
                        title="View details"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8" 
                        title="Edit product"
                        onClick={onEditProduct}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      {product.status === 'active' ? (
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8" 
                          title="Deactivate product"
                          onClick={() => toggleProductStatus(product.id, 'draft')}
                        >
                          <XCircle className="h-4 w-4 text-red-500" />
                        </Button>
                      ) : (
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8" 
                          title="Activate product"
                          onClick={() => toggleProductStatus(product.id, 'active')}
                        >
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8" 
                        title="Delete product"
                        onClick={() => deleteProduct(product.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
