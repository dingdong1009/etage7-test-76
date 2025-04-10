import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, QrCode, LayoutTemplate, Eye, Store as StoreIcon, Save, Check, Instagram, Twitter, Facebook, MessageCircle, Phone, Globe } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Product, SocialMediaLinks } from "@/types/product";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";

// Mock data for featured products
const mockProducts: Product[] = [{
  id: 1,
  name: "Silk Blouse",
  sku: "SB001",
  category: "Tops",
  season: "Spring",
  color: "White",
  price: 89.99,
  status: "Active",
  releaseDate: "2025-03-01",
  description: "Luxurious silk blouse with pearl buttons",
  materials: "100% Silk"
}, {
  id: 2,
  name: "Wool Sweater",
  sku: "WS002",
  category: "Knitwear",
  season: "Winter",
  color: "Cream",
  price: 129.99,
  status: "Active",
  releaseDate: "2025-01-15",
  description: "Cozy wool sweater with ribbed details",
  materials: "80% Wool, 20% Cashmere"
}, {
  id: 3,
  name: "Linen Trousers",
  sku: "LT003",
  category: "Bottoms",
  season: "Summer",
  color: "Beige",
  price: 109.99,
  status: "Active",
  releaseDate: "2025-05-20",
  description: "Lightweight linen trousers, perfect for summer",
  materials: "100% Linen"
}, {
  id: 4,
  name: "Cotton Shirt",
  sku: "CS004",
  category: "Tops",
  season: "All Year",
  color: "Blue",
  price: 69.99,
  status: "Active",
  releaseDate: "2025-02-10",
  description: "Versatile cotton shirt for everyday wear",
  materials: "100% Organic Cotton"
}];

// Store layout templates
type TemplateType = "minimal" | "classic" | "modern" | "elegant";
interface StoreTemplate {
  id: string;
  name: string;
  type: TemplateType;
  previewImage: string;
}
const storeTemplates: StoreTemplate[] = [{
  id: "template-1",
  name: "Minimal",
  type: "minimal",
  previewImage: "minimal-template.jpg"
}, {
  id: "template-2",
  name: "Classic",
  type: "classic",
  previewImage: "classic-template.jpg"
}, {
  id: "template-3",
  name: "Modern",
  type: "modern",
  previewImage: "modern-template.jpg"
}, {
  id: "template-4",
  name: "Elegant",
  type: "elegant",
  previewImage: "elegant-template.jpg"
}];

const BrandStore = () => {
  const [activeTab, setActiveTab] = useState("info");
  const [selectedTemplate, setSelectedTemplate] = useState<StoreTemplate>(storeTemplates[0]);
  const [storeInfo, setStoreInfo] = useState({
    name: "Elegant Fashion House",
    description: "Premium fashion pieces crafted with attention to detail and sustainability in mind. Discover our unique collections designed for the modern individual.",
    email: "contact@elegantfashion.com",
    phone: "+1 (555) 987-6543",
    website: "https://elegantfashion.com",
    address: "123 Fashion Avenue, Suite 500\nNew York, NY 10001\nUnited States"
  });
  const [socialMedia, setSocialMedia] = useState<SocialMediaLinks>({
    instagram: "@elegantfashion",
    twitter: "@elegantfashion",
    facebook: "elegantfashion",
    telegram: "elegantfashion",
    whatsapp: "+1 (555) 123-4567",
    vk: "elegantfashion"
  });
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Handler for selecting featured products
  const toggleProductSelection = (product: Product) => {
    if (selectedProducts.some(p => p.id === product.id)) {
      setSelectedProducts(selectedProducts.filter(p => p.id !== product.id));
    } else {
      if (selectedProducts.length < 4) {
        setSelectedProducts([...selectedProducts, product]);
      }
    }
  };

  // Handler for saving information
  const handleSaveInfo = () => {
    console.log("Store information saved:", storeInfo);
    console.log("Social media links saved:", socialMedia);
  };
  const handleSocialMediaChange = (platform: keyof SocialMediaLinks, value: string) => {
    setSocialMedia(prev => ({
      ...prev,
      [platform]: value
    }));
  };
  return <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl md:text-6xl uppercase font-thin">Store Settings</h1>
        {activeTab === "layouts" && <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsPreviewMode(!isPreviewMode)}>
              {isPreviewMode ? <LayoutTemplate className="mr-2" /> : <Eye className="mr-2" />}
              {isPreviewMode ? "Back to Edit" : "Preview"}
            </Button>
            <Button>
              <Save className="mr-2" size={18} />
              Save Changes
            </Button>
          </div>}
      </div>
      
      <Tabs defaultValue="info" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="info">Store Information</TabsTrigger>
          <TabsTrigger value="layouts">Page Layouts</TabsTrigger>
        </TabsList>
        
        {/* Store Information Tab */}
        <TabsContent value="info">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border border-gray-200 md:col-span-2">
              <CardHeader>
                <CardTitle className="text-1xl md:text-2xl uppercase font-thin mb-6">Store Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Store Name
                  </label>
                  <input type="text" className="w-full p-2 border border-gray-200" placeholder="Your Brand Store" value={storeInfo.name} onChange={e => setStoreInfo({
                  ...storeInfo,
                  name: e.target.value
                })} />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Store Description
                  </label>
                  <textarea className="w-full p-2 border border-gray-200 h-24" placeholder="Tell customers about your store" value={storeInfo.description} onChange={e => setStoreInfo({
                  ...storeInfo,
                  description: e.target.value
                })}></textarea>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input type="email" className="w-full p-2 border border-gray-200" placeholder="contact@yourbrand.com" value={storeInfo.email} onChange={e => setStoreInfo({
                    ...storeInfo,
                    email: e.target.value
                  })} />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input type="tel" className="w-full p-2 border border-gray-200" placeholder="+1 (555) 123-4567" value={storeInfo.phone} onChange={e => setStoreInfo({
                    ...storeInfo,
                    phone: e.target.value
                  })} />
                  </div>
                  
                </div>

                {/* Social Media Section */}
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <h3 className="font-medium text-lg mb-3">Social Media</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <div className="mr-2">
                        <Instagram size={18} />
                      </div>
                      <Input type="text" placeholder="Instagram username" value={socialMedia.instagram} onChange={e => handleSocialMediaChange('instagram', e.target.value)} className="flex-1" />
                    </div>
                    
                    <div className="flex items-center">
                      <div className="mr-2">
                        <Twitter size={18} />
                      </div>
                      <Input type="text" placeholder="X (Twitter) username" value={socialMedia.twitter} onChange={e => handleSocialMediaChange('twitter', e.target.value)} className="flex-1" />
                    </div>
                    
                    <div className="flex items-center">
                      <div className="mr-2">
                        <Facebook size={18} />
                      </div>
                      <Input type="text" placeholder="Facebook page name" value={socialMedia.facebook} onChange={e => handleSocialMediaChange('facebook', e.target.value)} className="flex-1" />
                    </div>
                    
                    <div className="flex items-center">
                      <div className="mr-2">
                        <MessageCircle size={18} />
                      </div>
                      <Input type="text" placeholder="Telegram username" value={socialMedia.telegram} onChange={e => handleSocialMediaChange('telegram', e.target.value)} className="flex-1" />
                    </div>
                    
                    <div className="flex items-center">
                      <div className="mr-2">
                        <Phone size={18} />
                      </div>
                      <Input type="text" placeholder="WhatsApp number" value={socialMedia.whatsapp} onChange={e => handleSocialMediaChange('whatsapp', e.target.value)} className="flex-1" />
                    </div>
                    
                    <div className="flex items-center">
                      <div className="mr-2">
                        <Globe size={18} />
                      </div>
                      <Input type="text" placeholder="VK page name" value={socialMedia.vk} onChange={e => handleSocialMediaChange('vk', e.target.value)} className="flex-1" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Store Address
                  </label>
                  <textarea className="w-full p-2 border border-gray-200 h-20" placeholder="Your store address" value={storeInfo.address} onChange={e => setStoreInfo({
                  ...storeInfo,
                  address: e.target.value
                })}></textarea>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={handleSaveInfo}>
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              <Card className="border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-1xl md:text-2xl uppercase font-thin mb-6">Store Logo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="h-40 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Upload Logo</p>
                    <p className="text-xs text-gray-400">PNG, JPG or SVG, max 2MB</p>
                  </div>
                  
                  <div className="flex justify-center">
                    <Button variant="outline">
                      Browse Files
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-1xl md:text-2xl uppercase font-thin mb-6">Store QR Code</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center space-y-4">
                  <div className="h-40 w-40 border border-gray-200 flex items-center justify-center">
                    <QrCode size={120} />
                  </div>
                  
                  <p className="text-sm text-gray-500 text-center">
                    Scan this code to visit your online store
                  </p>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                    <Button variant="outline" size="sm">
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        {/* Page Layouts Tab */}
        <TabsContent value="layouts">
          {isPreviewMode ? <StorePreview template={selectedTemplate.type} storeInfo={storeInfo} socialMedia={socialMedia} featuredProducts={selectedProducts} /> : <div className="space-y-6">
              <Card className="border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-1xl md:text-2xl uppercase font-thin mb-6">Select Template</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-6">
                    {storeTemplates.map(template => <div key={template.id} className={`border p-2 rounded-md cursor-pointer hover:border-black transition-colors ${selectedTemplate.id === template.id ? 'border-black' : 'border-gray-200'}`} onClick={() => setSelectedTemplate(template)}>
                        <div className="h-36 bg-gray-100 flex items-center justify-center">
                          <LayoutTemplate size={40} className="text-gray-400" />
                        </div>
                        <div className="mt-2 flex justify-between items-center">
                          <span className="font-medium">{template.name}</span>
                          {selectedTemplate.id === template.id && <Check size={18} className="text-green-500" />}
                        </div>
                      </div>)}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-1xl md:text-2xl uppercase font-thin mb-6">Featured Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">Select up to 4 products to feature on your store page</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {mockProducts.map(product => <div key={product.id} className={`border p-3 rounded-md cursor-pointer transition-all ${selectedProducts.some(p => p.id === product.id) ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-400'}`} onClick={() => toggleProductSelection(product)}>
                        <div className="h-28 bg-gray-100 mb-2"></div>
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-sm text-gray-500">${product.price}</p>
                        <div className="mt-2 flex justify-between items-center">
                          <span className="text-xs text-gray-500">{product.category}</span>
                          {selectedProducts.some(p => p.id === product.id) && <Check size={16} className="text-green-500" />}
                        </div>
                      </div>)}
                  </div>
                </CardContent>
              </Card>
            </div>}
        </TabsContent>
      </Tabs>
    </div>;
};

// Store Preview Component
interface StorePreviewProps {
  template: TemplateType;
  storeInfo: {
    name: string;
    description: string;
    email: string;
    phone: string;
    website: string;
    address: string;
  };
  socialMedia: SocialMediaLinks;
  featuredProducts: Product[];
}
const StorePreview: React.FC<StorePreviewProps> = ({
  template,
  storeInfo,
  socialMedia,
  featuredProducts
}) => {
  const getTemplateStyles = () => {
    switch (template) {
      case "minimal":
        return {
          mainBg: "bg-white",
          headerBg: "bg-gray-50",
          fontFamily: "font-sans",
          accentColor: "border-gray-800",
          buttonStyle: "bg-black text-white hover:bg-gray-800"
        };
      case "classic":
        return {
          mainBg: "bg-stone-50",
          headerBg: "bg-stone-100",
          fontFamily: "font-serif",
          accentColor: "border-stone-700",
          buttonStyle: "bg-stone-800 text-white hover:bg-stone-700"
        };
      case "modern":
        return {
          mainBg: "bg-white",
          headerBg: "bg-indigo-50",
          fontFamily: "font-sans",
          accentColor: "border-indigo-500",
          buttonStyle: "bg-indigo-600 text-white hover:bg-indigo-700"
        };
      case "elegant":
        return {
          mainBg: "bg-white",
          headerBg: "bg-rose-50",
          fontFamily: "font-serif",
          accentColor: "border-rose-300",
          buttonStyle: "bg-rose-700 text-white hover:bg-rose-800"
        };
    }
  };
  const styles = getTemplateStyles();
  return <div className={`border rounded-lg overflow-hidden ${styles.mainBg}`}>
      <header className={`p-8 ${styles.headerBg}`}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center border">
              <StoreIcon size={30} />
            </div>
            <div>
              <h2 className={`text-2xl md:text-3xl ${styles.fontFamily}`}>{storeInfo.name}</h2>
              <p className="text-sm text-gray-500">{socialMedia.instagram}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">Visit Store</Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <QrCode size={20} />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Store QR Code</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center p-4">
                  <div className="h-64 w-64 border flex items-center justify-center">
                    <QrCode size={200} />
                  </div>
                  <p className="text-sm text-gray-500 mt-4">Scan to visit {storeInfo.name}</p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>
      
      <div className="max-w-6xl mx-auto p-8">
        <div className="mb-12">
          <h3 className={`text-xl mb-4 ${styles.fontFamily} border-b ${styles.accentColor} inline-block pb-2`}>About Our Store</h3>
          <p className="text-gray-700 max-w-3xl">{storeInfo.description}</p>
        </div>
        
        <div className="mb-12">
          <h3 className={`text-xl mb-6 ${styles.fontFamily} border-b ${styles.accentColor} inline-block pb-2`}>Featured Products</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.length > 0 ? featuredProducts.map(product => <div key={product.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-48 bg-gray-100 flex items-center justify-center">
                    <p className="text-gray-400 text-sm">Product Image</p>
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium">{product.name}</h4>
                    <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">${product.price}</span>
                      <Button className={styles.buttonStyle} size="sm">View</Button>
                    </div>
                  </div>
                </div>) : <div className="col-span-full text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No featured products selected</p>
              </div>}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className={`text-lg mb-4 ${styles.fontFamily} border-b ${styles.accentColor} inline-block pb-2`}>Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="font-medium block">Email:</span>
                <span className="text-gray-600">{storeInfo.email}</span>
              </li>
              <li>
                <span className="font-medium block">Phone:</span>
                <span className="text-gray-600">{storeInfo.phone}</span>
              </li>
              <li>
                <span className="font-medium block">Website:</span>
                <span className="text-gray-600">{storeInfo.website}</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className={`text-lg mb-4 ${styles.fontFamily} border-b ${styles.accentColor} inline-block pb-2`}>Location</h3>
            <address className="not-italic text-sm text-gray-600 whitespace-pre-line">
              {storeInfo.address}
            </address>
          </div>
          
          <div>
            <h3 className={`text-lg mb-4 ${styles.fontFamily} border-b ${styles.accentColor} inline-block pb-2`}>Connect</h3>
            <div className="flex gap-2 flex-wrap">
              {socialMedia.instagram && <div className="h-8 w-8 border rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-50">
                  <Instagram size={16} />
                </div>}
              {socialMedia.twitter && <div className="h-8 w-8 border rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-50">
                  <Twitter size={16} />
                </div>}
              {socialMedia.facebook && <div className="h-8 w-8 border rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-50">
                  <Facebook size={16} />
                </div>}
              {socialMedia.telegram && <div className="h-8 w-8 border rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-50">
                  <MessageCircle size={16} />
                </div>}
              {socialMedia.whatsapp && <div className="h-8 w-8 border rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-50">
                  <Phone size={16} />
                </div>}
              {socialMedia.vk && <div className="h-8 w-8 border rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-50">
                  <Globe size={16} />
                </div>}
            </div>
          </div>
        </div>
      </div>
      
      <footer className={`p-6 text-center ${styles.headerBg} mt-8`}>
        <p className="text-sm text-gray-500">© {new Date().getFullYear()} {storeInfo.name}. All rights reserved.</p>
      </footer>
    </div>;
};
export default BrandStore;
