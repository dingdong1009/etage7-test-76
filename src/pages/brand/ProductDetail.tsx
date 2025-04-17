
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Image, Trash2, Share, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Product, ColorOption } from "@/types/product";

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("details");
  const [isEditing, setIsEditing] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  
  // Mock data for colors
  const colorOptions: ColorOption[] = [
    { name: "Neutral Gray", hex: "#8E9196" },
    { name: "Primary Purple", hex: "#9b87f5" },
    { name: "Navy Blue", hex: "#1E3A8A" },
    { name: "Burgundy", hex: "#9F1239" },
    { name: "Tan", hex: "#D4A76A" },
  ];

  // Mock products data - in a real app this would come from an API
  const mockProducts: Product[] = [
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
  ];

  // Find the product based on the ID from the URL
  useEffect(() => {
    if (productId) {
      const foundProduct = mockProducts.find(p => p.id === parseInt(productId));
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        // Product not found, redirect to products list
        navigate("/brand/products");
      }
    }
  }, [productId, navigate]);

  if (!product) {
    return <div className="p-8 text-center">Loading product...</div>;
  }

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveChanges = () => {
    // Here you would save changes to the API
    console.log("Saving product changes:", product);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof Product, value: any) => {
    if (product) {
      setProduct({
        ...product,
        [field]: value
      });
    }
  };

  const getColorHex = (colorName: string) => {
    return colorOptions.find(c => c.name === colorName)?.hex || "#000000";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={() => navigate("/brand/products")}>
            <ArrowLeft size={16} className="mr-1" />
            Back to Products
          </Button>
          <h1 className="text-2xl md:text-4xl uppercase font-thin">{product.name}</h1>
        </div>
        
        <div className="flex gap-2">
          {isEditing ? (
            <Button onClick={handleSaveChanges} className="bg-black hover:bg-gray-800">
              <Save size={16} className="mr-1" />
              Save Changes
            </Button>
          ) : (
            <Button onClick={handleEditToggle} className="bg-black hover:bg-gray-800">
              <Edit size={16} className="mr-1" />
              Edit Product
            </Button>
          )}
          <Button variant="outline">
            <Share size={16} className="mr-1" />
            Share
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Product Images Column */}
        <div className="md:col-span-1">
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-1xl md:text-2xl uppercase font-thin">Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="h-64 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                  <Image size={32} className="text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Main Product Image</p>
                  <p className="text-xs text-gray-400">Upload image</p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {[1, 2, 3, 4].map((index) => (
                    <div 
                      key={index} 
                      className="h-24 border border-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-50"
                    >
                      <p className="text-xs text-gray-400">+ Add</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Product Details Column */}
        <div className="md:col-span-3">
          <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b border-gray-200 mb-6">
              <TabsList className="w-full flex justify-start overflow-x-auto pb-0 mb-0 bg-transparent">
                <TabsTrigger 
                  value="details" 
                  className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2 data-[state=active]:shadow-none"
                >
                  Product Details
                </TabsTrigger>
                <TabsTrigger 
                  value="inventory" 
                  className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2 data-[state=active]:shadow-none"
                >
                  Inventory
                </TabsTrigger>
                <TabsTrigger 
                  value="variants" 
                  className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2 data-[state=active]:shadow-none"
                >
                  Variants
                </TabsTrigger>
                <TabsTrigger 
                  value="analytics" 
                  className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2 data-[state=active]:shadow-none"
                >
                  Analytics
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="details" className="space-y-6 mt-0">
              <Card className="border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-1xl md:text-2xl uppercase font-thin">Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="product-name">Product Name</Label>
                      <Input 
                        id="product-name" 
                        value={product.name} 
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="product-sku">SKU</Label>
                      <Input 
                        id="product-sku" 
                        value={product.sku} 
                        onChange={(e) => handleInputChange('sku', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="product-description">Description</Label>
                    <Textarea 
                      id="product-description" 
                      value={product.description} 
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      className="h-32"
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="product-category">Category</Label>
                      <Input 
                        id="product-category" 
                        value={product.category} 
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="product-season">Season</Label>
                      <Input 
                        id="product-season" 
                        value={product.season} 
                        onChange={(e) => handleInputChange('season', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="product-release-date">Release Date</Label>
                      <Input 
                        id="product-release-date" 
                        type="date"
                        value={product.releaseDate} 
                        onChange={(e) => handleInputChange('releaseDate', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-1xl md:text-2xl uppercase font-thin">Pricing</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="product-price">Price</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                        <Input 
                          id="product-price" 
                          type="number"
                          className="pl-6"
                          value={product.price} 
                          onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="product-status">Status</Label>
                      <div className="flex items-center space-x-2 mt-2">
                        <div 
                          className={`h-3 w-3 rounded-full ${product.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`}
                        ></div>
                        <span className="font-medium">
                          {product.status === 'active' ? 'Active' : 'Draft'}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-1xl md:text-2xl uppercase font-thin">Material & Color</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="product-materials">Materials</Label>
                    <Input 
                      id="product-materials" 
                      value={product.materials} 
                      onChange={(e) => handleInputChange('materials', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="product-color">Color</Label>
                    <div className="flex items-center gap-3 mt-2">
                      <div 
                        className="h-6 w-6 rounded-full border" 
                        style={{ backgroundColor: getColorHex(product.color) }}
                      ></div>
                      <span>{product.color}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="inventory" className="space-y-6 mt-0">
              <Card className="border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-1xl md:text-2xl uppercase font-thin">Inventory Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">Inventory details will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="variants" className="space-y-6 mt-0">
              <Card className="border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-1xl md:text-2xl uppercase font-thin">Product Variants</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">Product variants will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6 mt-0">
              <Card className="border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-1xl md:text-2xl uppercase font-thin">Performance Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">Product performance analytics will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
