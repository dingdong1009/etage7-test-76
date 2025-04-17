
import { useState } from "react";
import { ArrowUpDown, CheckCircle, Edit, Eye, Trash2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { Product, ColorOption } from "../../../types/product";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

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
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleViewProduct = (productId: number) => {
    navigate(`/brand/products/${productId}`);
  };
  
  const handleEditProduct = (productId: number) => {
    // For now, just use the generic edit handler
    // In a real app, you would navigate to a specific product edit page
    toast({
      title: "Edit Product",
      description: `Editing product ID: ${productId}`,
    });
    onEditProduct();
  };
  
  const handleDeleteConfirm = (productId: number, productName: string) => {
    if (window.confirm(`Are you sure you want to delete "${productName}"?`)) {
      deleteProduct(productId);
      toast({
        title: "Product deleted",
        description: `"${productName}" has been removed from your catalog`,
      });
    }
  };
  
  const handleToggleStatus = (productId: number, currentStatus: string, productName: string) => {
    const newStatus = currentStatus === 'active' ? 'draft' : 'active';
    toggleProductStatus(productId, newStatus);
    toast({
      title: `Product ${newStatus === 'active' ? 'activated' : 'deactivated'}`,
      description: `"${productName}" is now ${newStatus === 'active' ? 'active' : 'in draft mode'}`,
    });
  };

  return (
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
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center">
                No products found.
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
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
                      title="View product details"
                      onClick={() => handleViewProduct(product.id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8" 
                      title="Edit product"
                      onClick={() => handleEditProduct(product.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    {product.status === 'active' ? (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8" 
                        title="Deactivate product"
                        onClick={() => handleToggleStatus(product.id, product.status, product.name)}
                      >
                        <XCircle className="h-4 w-4 text-red-500" />
                      </Button>
                    ) : (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8" 
                        title="Activate product"
                        onClick={() => handleToggleStatus(product.id, product.status, product.name)}
                      >
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8" 
                      title="Delete product"
                      onClick={() => handleDeleteConfirm(product.id, product.name)}
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
  );
};
