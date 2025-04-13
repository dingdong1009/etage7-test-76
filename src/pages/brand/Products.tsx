
import { useState } from "react";
import { Plus, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from "@/components/ui/tabs";
import { ProductList } from "@/components/brand/products/ProductList";
import { ProductForm } from "@/components/brand/products/ProductForm";
import { Product, ColorOption } from "../../types/product";

const BrandProducts = () => {
  const [activeTab, setActiveTab] = useState("list");
  const [selectedColor, setSelectedColor] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [seasonFilter, setSeasonFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Silk Blend Tailored Blazer",
      sku: "BL-2025-SLK",
      category: "Outerwear",
      season: "Spring/Summer 2025",
      color: "Navy Blue",
      price: 289.99,
      status: "active",
      releaseDate: "2025-03-15",
      description: "Luxurious silk blend blazer with modern tailoring and subtle texture.",
      materials: "70% Silk, 30% Cotton"
    },
    {
      id: 2,
      name: "Cashmere Wool Cardigan",
      sku: "CW-2025-CSM",
      category: "Tops",
      season: "Fall/Winter 2024",
      color: "Burgundy",
      price: 199.99,
      status: "draft",
      releaseDate: "2024-08-30",
      description: "Premium cashmere wool cardigan with ribbed cuffs and hem.",
      materials: "85% Cashmere, 15% Wool"
    },
    {
      id: 3,
      name: "Leather Crossbody Bag",
      sku: "LB-2025-CRS",
      category: "Accessories",
      season: "Resort 2025",
      color: "Tan",
      price: 349.99,
      status: "active",
      releaseDate: "2025-01-10",
      description: "Artisanal leather crossbody with adjustable strap and distinctive hardware.",
      materials: "100% Full-grain Leather"
    }
  ]);

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
    <div className="space-y-6">
        <h1 className="text-4xl md:text-6xl uppercase font-thin mb-6">Products</h1>

      <Tabs defaultValue="list" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <div className="border-t border-gray-200 mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="list">Product List</TabsTrigger>
          <TabsTrigger value="add">Add Product</TabsTrigger>
        </TabsList>
      </div>
      <div className="flex gap-2">
          <Button 
            onClick={() => setActiveTab("add")} 
            className="h-9 text-xs bg-black hover:bg-black-600 text-white"
          >
            <Plus size={16} className="mr-1" />
            Add Product
          </Button>
          <Button variant="outline" size="sm" className="h-9 text-xs">
            <FileText size={16} className="mr-1" />
            Export
          </Button>
        </div>
        <TabsContent value="list" className="space-y-6">
          <ProductList 
            products={filteredProducts}
            colorOptions={colorOptions}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            seasonFilter={seasonFilter}
            setSeasonFilter={setSeasonFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            handleSort={handleSort}
            sortConfig={sortConfig}
            toggleProductStatus={toggleProductStatus}
            deleteProduct={deleteProduct}
            onEditProduct={() => setActiveTab("add")}
          />
        </TabsContent>

        <TabsContent value="add" className="space-y-6 mt-4">
          <ProductForm 
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            colorOptions={colorOptions}
          />
        </TabsContent>
      </Tabs>
      </div>

  );
};

export default BrandProducts;
