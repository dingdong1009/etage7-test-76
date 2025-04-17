
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Store as StoreIcon, Instagram, Twitter, Facebook, MessageCircle, Send, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product, SocialMediaLinks } from "@/types/product";

// Mock brand data - in a real application, this would come from an API
const getMockBrandData = (slug: string) => {
  // Convert slug back to a name for demo purposes
  const brandName = slug.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
  
  return {
    name: brandName,
    description: "Premium fashion pieces crafted with attention to detail and sustainability in mind. Discover our unique collections designed for the modern individual.",
    email: `contact@${slug}.com`,
    phone: "+1 (555) 987-6543",
    website: `https://${slug}.com`,
    address: "123 Fashion Avenue, Suite 500\nNew York, NY 10001\nUnited States",
    logo: null, // In a real app, this would be an image URL
    socialMedia: {
      instagram: `@${slug}`,
      twitter: `@${slug}`,
      facebook: slug,
      telegram: slug,
      whatsapp: "+1 (555) 123-4567",
      vk: slug
    },
    products: [
      {
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
      },
      {
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
      },
      {
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
      },
      {
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
      }
    ]
  };
};

const BrandStorefront = () => {
  const { brandSlug } = useParams<{ brandSlug: string }>();
  const [brandData, setBrandData] = useState<{
    name: string;
    description: string;
    email: string;
    phone: string;
    website: string;
    address: string;
    logo: string | null;
    socialMedia: SocialMediaLinks;
    products: Product[];
  } | null>(null);

  useEffect(() => {
    if (brandSlug) {
      // In a real app, fetch data from API
      const data = getMockBrandData(brandSlug);
      setBrandData(data);
    }
  }, [brandSlug]);

  if (!brandData) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center border">
              {brandData.logo ? (
                <img src={brandData.logo} alt={brandData.name} className="h-12 w-12 rounded-full" />
              ) : (
                <StoreIcon size={30} />
              )}
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-serif">{brandData.name}</h1>
              <p className="text-sm text-gray-500">{brandData.socialMedia.instagram}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="black">Contact Brand</Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-8">
        {/* About Section */}
        <section className="mb-12">
          <h2 className="text-xl mb-4 font-serif border-b border-gray-300 inline-block pb-2">About Our Brand</h2>
          <p className="text-gray-700 max-w-3xl">{brandData.description}</p>
        </section>

        {/* Products Section */}
        <section className="mb-12">
          <h2 className="text-xl mb-6 font-serif border-b border-gray-300 inline-block pb-2">Featured Products</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {brandData.products.map(product => (
              <div key={product.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  <p className="text-gray-400 text-sm">Product Image</p>
                </div>
                <div className="p-4">
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">${product.price}</span>
                    <Button variant="black" size="sm">View Details</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Info Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <h3 className="text-lg mb-4 font-serif border-b border-gray-300 inline-block pb-2">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="font-medium block">Email:</span>
                <span className="text-gray-600">{brandData.email}</span>
              </li>
              <li>
                <span className="font-medium block">Phone:</span>
                <span className="text-gray-600">{brandData.phone}</span>
              </li>
              <li>
                <span className="font-medium block">Website:</span>
                <span className="text-gray-600">{brandData.website}</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg mb-4 font-serif border-b border-gray-300 inline-block pb-2">Location</h3>
            <address className="not-italic text-sm text-gray-600 whitespace-pre-line">
              {brandData.address}
            </address>
          </div>
          
          <div>
            <h3 className="text-lg mb-4 font-serif border-b border-gray-300 inline-block pb-2">Connect</h3>
            <div className="flex gap-2 flex-wrap">
              {brandData.socialMedia.instagram && (
                <a href={`https://instagram.com/${brandData.socialMedia.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="h-8 w-8 border rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-50">
                  <Instagram size={16} />
                </a>
              )}
              {brandData.socialMedia.twitter && (
                <a href={`https://twitter.com/${brandData.socialMedia.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="h-8 w-8 border rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-50">
                  <Twitter size={16} />
                </a>
              )}
              {brandData.socialMedia.facebook && (
                <a href={`https://facebook.com/${brandData.socialMedia.facebook}`} target="_blank" rel="noopener noreferrer" className="h-8 w-8 border rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-50">
                  <Facebook size={16} />
                </a>
              )}
              {brandData.socialMedia.telegram && (
                <a href={`https://t.me/${brandData.socialMedia.telegram}`} target="_blank" rel="noopener noreferrer" className="h-8 w-8 border rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-50">
                  <Send size={16} />
                </a>
              )}
              {brandData.socialMedia.whatsapp && (
                <a href={`https://wa.me/${brandData.socialMedia.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="h-8 w-8 border rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-50">
                  <MessageCircle size={16} />
                </a>
              )}
              {brandData.socialMedia.vk && (
                <a href={`https://vk.com/${brandData.socialMedia.vk}`} target="_blank" rel="noopener noreferrer" className="h-8 w-8 border rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-50">
                  <Globe size={16} />
                </a>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 p-6 text-center mt-8">
        <p className="text-sm text-gray-500">© {new Date().getFullYear()} {brandData.name}. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default BrandStorefront;
