
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Search, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  Eye, 
  Filter, 
  ArrowUpDown 
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  season: string;
  color: string;
  price: number;
  status: string;
  description: string;
}

interface ProductListProps {
  products: Product[];
  setProducts: (products: Product[]) => void;
  onEditProduct: (product: Product) => void;
}

interface ColorOption {
  name: string;
  hex: string;
}

const ProductList = ({ products, setProducts, onEditProduct }: ProductListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [seasonFilter, setSeasonFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

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

  const handleSort = (key: string) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  const sortedProducts = [...products].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    if (a[sortConfig.key as keyof Product] < b[sortConfig.key as keyof Product]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key as keyof Product] > b[sortConfig.key as keyof Product]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const filteredProducts = sortedProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter ? product.category === categoryFilter : true;
    const matchesSeason = seasonFilter ? product.season === seasonFilter : true;
    const matchesStatus = statusFilter ? product.status === statusFilter : true;
    
    return matchesSearch && matchesCategory && matchesSeason && matchesStatus;
  });

  const toggleProductStatus = (id: number, newStatus: string) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, status: newStatus } : product
    ));
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <Card className="border border-gray-200">
      <CardHeader>
        <CardTitle className="text-1xl md:text-2xl uppercase font-thin">Product Catalog</CardTitle>
      </CardHeader>
      <CardContent>
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
                    <Button 
                      size="sm" 
                      className="bg-black hover:bg-black-600"
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
                          onClick={() => onEditProduct(product)}
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
      </CardContent>
    </Card>
  );
};

export default ProductList;
