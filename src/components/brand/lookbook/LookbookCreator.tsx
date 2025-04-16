import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, Save, Plus, Move, Trash2, Upload, LayoutTemplate, Grid3X3, Type, Eye, Link, Search, Tag } from "lucide-react";
import LookbookPage from "./LookbookPage";
import LookbookPageTemplate from "./LookbookPageTemplate";
import { Product } from "@/types/product";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

interface LookbookCreatorProps {
  lookbook: { id: number; title: string } | null;
  onClose: () => void;
}

const formatPrice = (price: string | number): string => {
  if (typeof price === 'number') {
    return price.toFixed(2);
  } else {
    const numericValue = parseFloat(price);
    if (!isNaN(numericValue)) {
      return numericValue.toFixed(2);
    }
    return price;
  }
};

const getProductId = (id: string | number): number => {
  if (typeof id === 'number') {
    return id;
  }
  const numId = parseInt(id.toString(), 10);
  return isNaN(numId) ? 0 : numId;
};

const LookbookCreator: React.FC<LookbookCreatorProps> = ({ lookbook, onClose }) => {
  const [title, setTitle] = useState(lookbook?.title || "");
  const [description, setDescription] = useState("");
  const [activeTab, setActiveTab] = useState("content");
  const [pages, setPages] = useState([{ id: 1, template: "grid-2", images: [], linkedProducts: [] }]);
  const [currentPage, setCurrentPage] = useState(1);
  const [previewMode, setPreviewMode] = useState(false);
  const [productSearchQuery, setProductSearchQuery] = useState("");
  
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
  
  const handleAddPage = () => {
    const newPage = {
      id: pages.length + 1,
      template: "grid-2",
      images: [],
      linkedProducts: []
    };
    setPages([...pages, newPage]);
  };
  
  const handleSave = () => {
    console.log("Saving lookbook:", { title, description, pages });
    toast.success("Lookbook saved successfully");
    onClose();
  };

  const handleTemplateChange = (templateId: string) => {
    const updatedPages = pages.map(page => {
      if (page.id === currentPage) {
        return { ...page, template: templateId };
      }
      return page;
    });
    setPages(updatedPages);
  };
  
  const handleDeletePage = (pageId: number) => {
    if (pages.length <= 1) {
      toast.error("Cannot delete the only page");
      return;
    }
    
    const updatedPages = pages.filter(page => page.id !== pageId);
    setPages(updatedPages);
    
    if (pageId === currentPage) {
      setCurrentPage(updatedPages[0].id);
    }
  };

  const handleToggleProductLink = (productId: number) => {
    const currentPageData = pages.find(page => page.id === currentPage);
    if (!currentPageData) return;

    const updatedPages = pages.map(page => {
      if (page.id === currentPage) {
        const linkedProducts = page.linkedProducts || [];
        const productIndex = linkedProducts.indexOf(productId);
        
        if (productIndex >= 0) {
          return {
            ...page,
            linkedProducts: linkedProducts.filter(id => id !== productId)
          };
        } else {
          return {
            ...page,
            linkedProducts: [...linkedProducts, productId]
          };
        }
      }
      return page;
    });
    
    setPages(updatedPages);
  };

  const isProductLinked = (productId: number) => {
    const currentPageData = pages.find(page => page.id === currentPage);
    return currentPageData?.linkedProducts?.includes(productId) || false;
  };

  const filteredProducts = products.filter(product => {
    return (
      product.name.toLowerCase().includes(productSearchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(productSearchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(productSearchQuery.toLowerCase())
    );
  });

  const getLinkedProductsForPage = (pageId: number) => {
    const pageData = pages.find(page => page.id === pageId);
    if (!pageData || !pageData.linkedProducts || pageData.linkedProducts.length === 0) {
      return [];
    }
    
    return products.filter(product => pageData.linkedProducts.includes(product.id));
  };
  
  const availableTemplates = [
    { id: "grid-2", name: "2-Grid", icon: <Grid3X3 size={16} /> },
    { id: "grid-3", name: "3-Grid", icon: <Grid3X3 size={16} /> },
    { id: "featured", name: "Featured", icon: <LayoutTemplate size={16} /> },
    { id: "cover", name: "Cover", icon: <Type size={16} /> }
  ];

  return (
    <div className="space-y-4">
      <Card className="border border-gray-200">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-1xl md:text-2xl uppercase font-thin mb-6">
            {lookbook ? "Edit Lookbook" : "Create New Lookbook"}
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPreviewMode(!previewMode)}
            >
              <Eye size={16} className="mr-2" />
              {previewMode ? "Exit Preview" : "Preview"}
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Save size={16} className="mr-2" />
              Save
            </Button>
            <Button variant="outline" size="icon" onClick={onClose}>
              <X size={16} />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {!previewMode ? (
            <>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Lookbook Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter lookbook title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Enter lookbook description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Cover Image</Label>
                  <div className="border-2 border-dashed p-6 flex flex-col items-center justify-center bg-gray-50">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Drag and drop or click to upload</p>
                    <Button variant="outline" size="sm" className="mt-4">
                      Select Cover Image
                    </Button>
                  </div>
                </div>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-4">
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="layout">Page Layout</TabsTrigger>
                  <TabsTrigger value="products">Products</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="content" className="mt-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-1xl md:text-2xl uppercase font-thin">Pages</h3>
                    <Button variant="outline" size="sm" onClick={handleAddPage}>
                      <Plus size={16} className="mr-2" />
                      Add Page
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {pages.map((page, index) => (
                      <div 
                        key={page.id} 
                        className={`border overflow-hidden cursor-pointer ${
                          currentPage === page.id ? 'ring-2 ring-black' : ''
                        }`}
                        onClick={() => setCurrentPage(page.id)}
                      >
                        <div className="aspect-[5/7] bg-gray-100 flex items-center justify-center">
                          <LookbookPageTemplate template={page.template} />
                        </div>
                        <div className="p-2 bg-gray-50 flex justify-between items-center border-t">
                          <span className="text-xs font-medium">Page {index + 1}</span>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <Move size={12} />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6 text-red-500"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeletePage(page.id);
                              }}
                            >
                              <Trash2 size={12} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="layout" className="mt-6">
                  <div className="border-t p-4 mt-2">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-1xl md:text-2xl uppercase font-thin">Page {currentPage} Layout</h3>
                      <div className="flex gap-2">
                        {availableTemplates.map(template => (
                          <Button 
                            key={template.id}
                            variant={pages.find(p => p.id === currentPage)?.template === template.id ? "default" : "outline"}
                            size="sm" 
                            className="flex gap-1 items-center"
                            onClick={() => handleTemplateChange(template.id)}
                          >
                            {template.icon}
                            {template.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="w-full aspect-[4/3] bg-gray-100 overflow-hidden">
                      <LookbookPage 
                        template={pages.find(p => p.id === currentPage)?.template || "grid-2"} 
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="products" className="mt-6">
                  <div className="border-t p-4 mt-2">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-1xl md:text-2xl uppercase font-thin">Link Products to Page {currentPage}</h3>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="relative">
                          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                          <Input
                            placeholder="Search products..."
                            className="pl-8"
                            value={productSearchQuery}
                            onChange={(e) => setProductSearchQuery(e.target.value)}
                          />
                        </div>
                        
                        <div className="border rounded-md">
                          <h4 className="p-3 bg-gray-50 font-medium text-sm border-b">
                            Product Catalog
                          </h4>
                          <ScrollArea className="h-[300px]">
                            <div className="p-3 space-y-2">
                              {filteredProducts.length > 0 ? (
                                filteredProducts.map(product => (
                                  <div 
                                    key={product.id}
                                    className="flex items-start gap-3 p-2 border rounded-md hover:bg-gray-50 cursor-pointer"
                                    onClick={() => handleToggleProductLink(product.id)}
                                  >
                                    <div className="flex-shrink-0 h-12 w-12 bg-gray-100 flex items-center justify-center rounded-md">
                                      <Tag size={16} className="text-gray-400" />
                                    </div>
                                    <div className="flex-grow">
                                      <div className="flex items-center justify-between">
                                        <div className="font-medium">{product.name}</div>
                                        <Checkbox 
                                          checked={isProductLinked(product.id)}
                                          onCheckedChange={() => handleToggleProductLink(product.id)}
                                          className="h-4 w-4"
                                        />
                                      </div>
                                      <div className="text-xs text-gray-500">
                                        SKU: {product.sku} · ${formatPrice(product.price)}
                                      </div>
                                      <div className="text-xs text-gray-500 truncate">
                                        {product.description.substring(0, 60)}...
                                      </div>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <div className="text-center py-6 text-gray-500">
                                  No products found
                                </div>
                              )}
                            </div>
                          </ScrollArea>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="font-medium">Linked Products for Page {currentPage}</h4>
                        
                        <div className="border rounded-md">
                          <div className="p-3 bg-gray-50 border-b flex justify-between items-center">
                            <span className="font-medium text-sm">Selected Products</span>
                            <Badge variant="outline" className="text-xs">
                              {getLinkedProductsForPage(currentPage).length} items
                            </Badge>
                          </div>
                          
                          <ScrollArea className="h-[300px]">
                            <div className="p-3">
                              {getLinkedProductsForPage(currentPage).length > 0 ? (
                                <div className="space-y-2">
                                  {getLinkedProductsForPage(currentPage).map(product => (
                                    <div key={product.id} className="flex justify-between items-center p-2 border rounded-md">
                                      <div className="flex items-center gap-2">
                                        <div className="h-10 w-10 bg-gray-100 flex items-center justify-center rounded-md">
                                          <Tag size={20} className="text-gray-400" />
                                        </div>
                                        <div>
                                          <div className="font-medium text-sm">{product.name}</div>
                                          <div className="text-xs text-gray-500">${formatPrice(product.price)}</div>
                                        </div>
                                      </div>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-red-500"
                                        onClick={() => handleToggleProductLink(product.id)}
                                      >
                                        <Trash2 size={16} />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="text-center py-6 text-gray-500 flex flex-col items-center">
                                  <Link className="h-8 w-8 text-gray-400 mb-2" />
                                  <p>No products linked to this page</p>
                                  <p className="text-xs">Select products from the catalog to link them</p>
                                </div>
                              )}
                            </div>
                          </ScrollArea>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="settings" className="mt-6">
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="seasonTag">Season Tag</Label>
                        <Input
                          id="seasonTag"
                          placeholder="e.g., Spring/Summer 2023"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="colorScheme">Color Scheme</Label>
                        <Input
                          id="colorScheme"
                          placeholder="e.g., Light, Dark, Custom"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="publishDate">Publish Date</Label>
                      <Input
                        id="publishDate"
                        type="date"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="block">Visibility</Label>
                      <div className="flex gap-4">
                        <div className="flex items-center">
                          <input type="radio" id="public" name="visibility" className="mr-2" defaultChecked />
                          <Label htmlFor="public">Public</Label>
                        </div>
                        <div className="flex items-center">
                          <input type="radio" id="private" name="visibility" className="mr-2" />
                          <Label htmlFor="private">Private</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </>
          ) : (
            <div className="flex flex-col items-center">
              <div className="max-w-4xl w-full">
                <h2 className="text-1xl md:text-2xl text-center uppercase font-thin mb-2">{title || "Untitled Lookbook"}</h2>
                {description && <p className="text-center text-gray-600 mb-8">{description}</p>}
                
                <div className="space-y-12">
                  {pages.map((page, index) => (
                    <div key={page.id} className="space-y-4">
                      <div className="w-full aspect-[4/3] bg-white border rounded-md overflow-hidden shadow-md">
                        <LookbookPage 
                          template={page.template}
                          preview={true}
                        />
                      </div>
                      
                      {page.linkedProducts && page.linkedProducts.length > 0 && (
                        <div className="border rounded-md p-4">
                          <h3 className="text-sm uppercase font-medium mb-4">Featured Products</h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {getLinkedProductsForPage(page.id).map(product => (
                              <div key={product.id} className="border rounded-md p-3 hover:shadow-sm">
                                <div className="h-24 bg-gray-100 flex items-center justify-center rounded-md mb-2">
                                  <Tag size={20} className="text-gray-400" />
                                </div>
                                <h4 className="font-medium text-sm truncate">{product.name}</h4>
                                <div className="text-xs text-gray-500 mt-1">${formatPrice(product.price)}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between border-t p-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save Lookbook</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LookbookCreator;
