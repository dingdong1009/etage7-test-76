
import { Card } from "@/components/ui/card";
import { Heart } from "lucide-react";

const BuyerDashboard = () => {
  // Sample product data
  const products = Array.from({ length: 12 }).map((_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    category: "Women's Collection",
    price: `€${Math.floor(Math.random() * 2000) + 500}`,
    image: `https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&h=500&q=80`
  }));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Product Catalog</h1>

      {/* Filter bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-200">
        <div className="flex flex-wrap gap-2">
          <button className="px-4 py-2 text-sm font-medium border border-gray-200 rounded-none hover:bg-gray-50">
            New Arrivals
          </button>
          <button className="px-4 py-2 text-sm font-medium border border-gray-200 rounded-none hover:bg-gray-50">
            Featured
          </button>
          <button className="px-4 py-2 text-sm font-medium border border-gray-200 rounded-none hover:bg-gray-50">
            Bestsellers
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Sort by:</span>
          <select className="py-1 pl-2 pr-8 text-sm border border-gray-200 rounded-none bg-white">
            <option>Newest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Product Grid - Prada-inspired layout */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <Card key={product.id} className="group rounded-none border border-gray-100 overflow-hidden cursor-pointer hover:shadow-sm transition-shadow">
            <div className="relative aspect-[3/4] bg-gray-50">
              <img 
                src={product.image} 
                alt={product.name}
                className="object-cover w-full h-full"
              />
              <button className="absolute top-4 right-4 p-1 text-gray-600 hover:text-black">
                <Heart size={20} />
              </button>
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all">
                <div className="translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all">
                  <button className="px-4 py-2 bg-white text-black text-xs font-medium uppercase tracking-wide hover:bg-gray-100">
                    View Details
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-sm font-medium">{product.name}</h3>
              <p className="text-xs text-gray-500 mt-1">{product.category}</p>
              <p className="text-sm mt-2">{product.price}</p>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Pagination */}
      <div className="flex justify-center pt-8">
        <div className="flex border border-gray-200 rounded-none divide-x divide-gray-200">
          <button className="px-3 py-1 text-sm hover:bg-gray-50">Previous</button>
          <button className="px-3 py-1 text-sm bg-gray-100">1</button>
          <button className="px-3 py-1 text-sm hover:bg-gray-50">2</button>
          <button className="px-3 py-1 text-sm hover:bg-gray-50">3</button>
          <button className="px-3 py-1 text-sm hover:bg-gray-50">Next</button>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
