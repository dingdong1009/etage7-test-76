
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

// Product interface for type safety
interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  imagePlaceholder: string;
}

const Dashboard = () => {
  // Sample product data
  const [products] = useState<Product[]>(
    Array(12).fill(null).map((_, index) => ({
      id: `product-${index + 1}`,
      name: `Product ${index + 1}`,
      category: ['Dresses', 'Tops', 'Skirts', 'Bags', 'Shoes'][Math.floor(Math.random() * 5)],
      price: `${Math.floor(Math.random() * 1000) + 500} EUR`,
      imagePlaceholder: `${Math.floor(Math.random() * 200) + 200}x${Math.floor(Math.random() * 100) + 250}`
    }))
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl md:text-6xl font-light tracking-tighter mb-6">PRODUCTS</h1>
        <div className="flex gap-4">
          <select className="border border-gray-200 rounded px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-black">
            <option>All Categories</option>
            <option>Dresses</option>
            <option>Tops</option>
            <option>Skirts</option>
            <option>Bags</option>
            <option>Shoes</option>
          </select>
          <select className="border border-gray-200 rounded px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-black">
            <option>Sort By</option>
            <option>Price: High to Low</option>
            <option>Price: Low to High</option>
            <option>Newest</option>
          </select>
        </div>
      </div>
      
      {/* Product grid with refined monochrome styling */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="border-0 rounded-none overflow-hidden group">
            <CardContent className="p-0">
              {/* Product image placeholder */}
              <div className="aspect-[3/4] bg-gray-50 flex items-center justify-center relative overflow-hidden">
                <div className="text-gray-400 text-xs">{product.imagePlaceholder}</div>
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <button className="absolute bottom-3 right-3 bg-white text-black text-xs px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 focus:outline-none hover:bg-gray-100">
                  Quick View
                </button>
              </div>
              {/* Product details with refined styling */}
              <div className="pt-4 px-0 space-y-1">
                <p className="text-xs text-gray-500 uppercase tracking-wide">{product.category}</p>
                <h3 className="font-light text-sm tracking-tight">{product.name}</h3>
                <p className="text-sm">{product.price}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination with monochrome styling */}
      <div className="flex justify-center pt-8">
        <div className="flex gap-2">
          {[1, 2, 3].map((page) => (
            <button 
              key={page} 
              className={`px-3 py-1 border ${page === 1 ? 'bg-black text-white border-black' : 'bg-white border-gray-200 hover:border-gray-400 transition-colors'}`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
