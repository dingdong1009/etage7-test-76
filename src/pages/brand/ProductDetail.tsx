import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Trash2, CheckCircle, XCircle, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Product, ColorOption } from "../../types/product";

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock color options - in a real app, these would be fetched from your backend
  const colorOptions: ColorOption[] = [
    { name: "Neutral Gray", hex: "#8E9196" },
    { name: "Primary Purple", hex: "#9b87f5" },
    { name: "Secondary Purple", hex: "#7E69AB" },
    { name: "Navy Blue", hex: "#1E3A8A" },
    { name: "Burgundy", hex: "#9F1239" },
    { name: "Tan", hex: "#D4A76A" },
    // ... other colors
  ];

  // Mock product data - in a real app, you would fetch this from your API
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

  // Fetch product data
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      const foundProduct = mockProducts.find(p => p.id === Number(productId));
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        toast({
          title: "Product not found",
          description: "The requested product could not be found.",
          variant: "destructive"
        });
        navigate("/brand/products");
      }
      setIsLoading(false);
    }, 500);
  }, [productId, navigate, toast]);

  const handleGoBack = () => {
    navigate("/brand/products");
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveChanges = () => {
    if (!product) return;
    
    toast({
      title: "Changes saved",
      description: `Product "${product.name}" has been updated successfully.`,
    });
    
    setIsEditing(false);
  };

  const handleToggleStatus = () => {
    if (!product) return;
    
    const newStatus = product.status === "active" ? "draft" : "active";
    setProduct({
      ...product,
      status: newStatus
    });
    
    toast({
      title: `Product ${newStatus === "active" ? "activated" : "deactivated"}`,
      description: `"${product.name}" is now ${newStatus === "active" ? "active" : "in draft mode"}.`
    });
  };

  const handleDeleteProduct = () => {
    if (!product) return;
    
    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      toast({
        title: "Product deleted",
        description: `"${product.name}" has been removed from your catalog.`
      });
      navigate("/brand/products");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-48">
        <p>Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-48">
        <p className="text-xl font-semibold mb-4">Product not found</p>
        <Button onClick={handleGoBack} variant="outline">Go Back to Products</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={handleGoBack}>
          <ArrowLeft />
        </Button>
        <h1 className="text-3xl md:text-4xl font-thin">{product.name}</h1>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {product.status === 'active' ? 'Active' : 'Draft'}
          </span>
          <span className="text-gray-500">SKU: {product.sku}</span>
        </div>
        
        <div className="ml-auto flex items-center gap-2">
          {isEditing ? (
            <Button 
              onClick={handleSaveChanges} 
              className="bg-black hover:bg-gray-800"
            >
              <Save className="mr-1.5 h-4 w-4" />
              Save Changes
            </Button>
          ) : (
            <Button 
              onClick={toggleEditMode}
              variant="outline"
            >
              <Edit className="mr-1.5 h-4 w-4" />
              Edit Product
            </Button>
          )}
          
          <Button 
            onClick={handleToggleStatus}
            variant="outline"
          >
            {product.status === 'active' ? (
              <>
                <XCircle className="mr-1.5 h-4 w-4 text-red-500" />
                Deactivate
              </>
            ) : (
              <>
                <CheckCircle className="mr-1.5 h-4 w-4 text-green-500" />
                Activate
              </>
            )}
          </Button>
          
          <Button 
            onClick={handleDeleteProduct}
            variant="outline"
            className="text-red-500 hover:text-red-600"
          >
            <Trash2 className="mr-1.5 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="border-t border-gray-200 mb-6">
          <TabsList className="border-b border-gray-200 w-full flex justify-start overflow-x-auto pb-0 mb-6 bg-transparent">
            <TabsTrigger value="details" className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2 data-[state=active]:shadow-none">
              Product Details
            </TabsTrigger>
            <TabsTrigger value="images" className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2 data-[state=active]:shadow-none">
              Images
            </TabsTrigger>
            <TabsTrigger value="pricing" className="text-xs font-light uppercase data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-6 py-2 data-[state=active]:shadow-none">
              Pricing & Inventory
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="details" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-light">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="name">Product Name</Label>
                  <Input 
                    id="name" 
                    value={product.name} 
                    onChange={(e) => setProduct({...product, name: e.target.value})} 
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="sku">SKU</Label>
                  <Input 
                    id="sku" 
                    value={product.sku} 
                    onChange={(e) => setProduct({...product, sku: e.target.value})} 
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={product.category} 
                    onValueChange={(value) => setProduct({...product, category: value})}
                    disabled={!isEditing}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Outerwear">Outerwear</SelectItem>
                      <SelectItem value="Tops">Tops</SelectItem>
                      <SelectItem value="Bottoms">Bottoms</SelectItem>
                      <SelectItem value="Dresses">Dresses</SelectItem>
                      <SelectItem value="Accessories">Accessories</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="season">Season</Label>
                  <Select 
                    value={product.season} 
                    onValueChange={(value) => setProduct({...product, season: value})}
                    disabled={!isEditing}
                  >
                    <SelectTrigger id="season">
                      <SelectValue placeholder="Select season" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Spring/Summer 2025">Spring/Summer 2025</SelectItem>
                      <SelectItem value="Fall/Winter 2024">Fall/Winter 2024</SelectItem>
                      <SelectItem value="Resort 2025">Resort 2025</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="color">Color</Label>
                  <Select 
                    value={product.color} 
                    onValueChange={(value) => setProduct({...product, color: value})}
                    disabled={!isEditing}
                  >
                    <SelectTrigger id="color" className="flex items-center gap-2">
                      {product.color && (
                        <div 
                          className="h-3 w-3 rounded-full" 
                          style={{ 
                            backgroundColor: colorOptions.find(c => c.name === product.color)?.hex || '#000000'
                          }} 
                        />
                      )}
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      {colorOptions.map((color) => (
                        <SelectItem key={color.name} value={color.name} className="flex items-center gap-2">
                          <div 
                            className="h-4 w-4 rounded-full" 
                            style={{ backgroundColor: color.hex }} 
                          />
                          <span>{color.name}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="releaseDate">Release Date</Label>
                  <Input 
                    id="releaseDate" 
                    type="date" 
                    value={product.releaseDate} 
                    onChange={(e) => setProduct({...product, releaseDate: e.target.value})} 
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  value={product.description} 
                  onChange={(e) => setProduct({...product, description: e.target.value})}
                  rows={4}
                  disabled={!isEditing} 
                />
              </div>
              
              <div>
                <Label htmlFor="materials">Materials</Label>
                <Textarea 
                  id="materials" 
                  value={product.materials} 
                  onChange={(e) => setProduct({...product, materials: e.target.value})}
                  rows={2}
                  disabled={!isEditing} 
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="images" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-light">Product Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex flex-col items-center gap-2">
                  <p className="text-sm text-gray-500">No product images uploaded yet</p>
                  <p className="text-xs text-gray-400">Upload high-quality product images with clean backgrounds</p>
                  {isEditing && (
                    <Button variant="outline" className="mt-2">
                      Upload Images
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-light">Pricing & Inventory</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="price">Price ($)</Label>
                  <Input 
                    id="price" 
                    type="number"
                    value={product.price} 
                    onChange={(e) => setProduct({...product, price: parseFloat(e.target.value)})}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="comparePrice">Compare At Price ($)</Label>
                  <Input 
                    id="comparePrice" 
                    type="number"
                    placeholder="0.00"
                    disabled={!isEditing}
                  />
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <Label htmlFor="cost">Cost per item ($)</Label>
                  <Input 
                    id="cost" 
                    type="number"
                    placeholder="0.00"
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input 
                    id="quantity" 
                    type="number"
                    placeholder="0"
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="sku">SKU</Label>
                  <Input 
                    id="sku" 
                    value={product.sku}
                    disabled={true} 
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductDetail;
