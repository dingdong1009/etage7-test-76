import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Package, ShoppingCart, Users, MessageSquare, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const BuyerInsights = () => {
  return (
    <div className="space-y-8">
      {/* Title and Description */}
      <div>
        <h2 className="text-2xl font-light tracking-tighter">Buyer Insights</h2>
        <p className="text-sm text-gray-500">Understand your audience better with these insights.</p>
      </div>

      {/* Updated grid from 4 to 5 columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Total Orders Card */}
        <Card className="border border-gray-200 shadow-none rounded-none hover:border-black transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <ShoppingCart className="h-8 w-8 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 uppercase">Total Orders</p>
                  <h3 className="text-3xl font-light">1,245</h3>
                </div>
              </div>
            </div>
            <Link to="/brand/orders" className="text-xs text-gray-600 hover:text-black flex items-center gap-1 transition-colors">
              View Orders <ChevronRight className="h-3 w-3" />
            </Link>
          </CardContent>
        </Card>

        {/* New Customers Card */}
        <Card className="border border-gray-200 shadow-none rounded-none hover:border-black transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <Users className="h-8 w-8 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 uppercase">New Customers</p>
                  <h3 className="text-3xl font-light">320</h3>
                </div>
              </div>
            </div>
            <Link to="/brand/customers" className="text-xs text-gray-600 hover:text-black flex items-center gap-1 transition-colors">
              View Customers <ChevronRight className="h-3 w-3" />
            </Link>
          </CardContent>
        </Card>

        {/* Average Order Value Card */}
        <Card className="border border-gray-200 shadow-none rounded-none hover:border-black transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-credit-card h-8 w-8 text-gray-400">
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <line x1="2" x2="22" y1="10" y2="10" />
                  <line x1="6" x2="6" y1="16" y2="16" />
                </svg>
                <div>
                  <p className="text-sm text-gray-500 uppercase">Avg. Order Value</p>
                  <h3 className="text-3xl font-light">$125.50</h3>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer Messages Card */}
        <Card className="border border-gray-200 shadow-none rounded-none hover:border-black transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <MessageSquare className="h-8 w-8 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 uppercase">Customer Messages</p>
                  <h3 className="text-3xl font-light">68</h3>
                </div>
              </div>
            </div>
            <Link to="/brand/messages" className="text-xs text-gray-600 hover:text-black flex items-center gap-1 transition-colors">
              View Messages <ChevronRight className="h-3 w-3" />
            </Link>
          </CardContent>
        </Card>
        
        {/* New Active Products Card */}
        <Card className="border border-gray-200 shadow-none rounded-none hover:border-black transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <Package className="h-8 w-8 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 uppercase">Active Products</p>
                  <h3 className="text-3xl font-light">45</h3>
                </div>
              </div>
            </div>
            <Link to="/brand/products" className="text-xs text-gray-600 hover:text-black flex items-center gap-1 transition-colors">
              View Products <ChevronRight className="h-3 w-3" />
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BuyerInsights;
