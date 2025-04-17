
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Package, 
  ShoppingCart, 
  Bell, 
  MessageSquare,
  ChevronRight 
} from "lucide-react";
import { Link } from "react-router-dom";

// Sample data - in a real app, this would come from your backend
const mockData = {
  products: {
    active: 45,
    total: 86
  },
  recentOrders: [
    { id: '1', customer: 'Fashion Store Paris', date: '2025-04-15', status: 'pending', amount: '€2,400' },
    { id: '2', customer: 'Luxury Boutique', date: '2025-04-14', status: 'shipped', amount: '€1,800' },
    { id: '3', customer: 'Style Hub', date: '2025-04-13', status: 'delivered', amount: '€3,200' }
  ],
  notifications: [
    { id: '1', message: 'New order received from Fashion Store Paris', time: '2 hours ago' },
    { id: '2', message: 'Product stock running low: Summer Collection Dress', time: '5 hours ago' },
    { id: '3', message: 'Payment confirmed for order #12345', time: 'Yesterday' }
  ],
  messages: [
    { id: '1', from: 'Fashion Store Paris', preview: 'Regarding the Spring collection...', time: '1 hour ago' },
    { id: '2', from: 'Luxury Boutique', preview: 'Can you provide more details about...', time: '3 hours ago' },
    { id: '3', from: 'Style Hub', preview: 'We would like to place a bulk order...', time: 'Yesterday' }
  ]
};

const BrandDashboard = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="relative -mx-8 px-8 py-12 bg-gray-50/50 border-b border-gray-100">
        <div className="max-w-[1481px] mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tighter uppercase mb-4">
            BRAND DASHBOARD
          </h1>
        </div>
      </div>

      {/* Product Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border border-gray-200 shadow-none rounded-none hover:border-black transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <Package className="h-8 w-8 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 uppercase">Active Products</p>
                  <h3 className="text-3xl font-light">{mockData.products.active}</h3>
                </div>
              </div>
            </div>
            <Link 
              to="/brand/products" 
              className="text-xs text-gray-600 hover:text-black flex items-center gap-1 transition-colors"
            >
              View Products <ChevronRight className="h-3 w-3" />
            </Link>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-none rounded-none hover:border-black transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <Package className="h-8 w-8 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 uppercase">Total Products</p>
                  <h3 className="text-3xl font-light">{mockData.products.total}</h3>
                </div>
              </div>
            </div>
            <Link 
              to="/brand/products" 
              className="text-xs text-gray-600 hover:text-black flex items-center gap-1 transition-colors"
            >
              View All Products <ChevronRight className="h-3 w-3" />
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card className="border border-gray-200 shadow-none rounded-none hover:border-black transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <ShoppingCart className="h-6 w-6 text-gray-400" />
                <h3 className="text-lg font-light uppercase">Recent Orders</h3>
              </div>
              <Button variant="ghost" size="sm" className="text-xs" asChild>
                <Link to="/brand/orders">
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
            <div className="space-y-4">
              {mockData.recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="text-sm font-normal">{order.customer}</p>
                    <p className="text-xs text-gray-500">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-normal">{order.amount}</p>
                    <p className="text-xs text-gray-500 uppercase">{order.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Messages */}
        <Card className="border border-gray-200 shadow-none rounded-none hover:border-black transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <MessageSquare className="h-6 w-6 text-gray-400" />
                <h3 className="text-lg font-light uppercase">Recent Messages</h3>
              </div>
              <Button variant="ghost" size="sm" className="text-xs" asChild>
                <Link to="/brand/messages">
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
            <div className="space-y-4">
              {mockData.messages.map((message) => (
                <div key={message.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="text-sm font-normal">{message.from}</p>
                    <p className="text-xs text-gray-500">{message.preview}</p>
                  </div>
                  <p className="text-xs text-gray-500">{message.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="border border-gray-200 shadow-none rounded-none hover:border-black transition-colors lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Bell className="h-6 w-6 text-gray-400" />
                <h3 className="text-lg font-light uppercase">Recent Notifications</h3>
              </div>
            </div>
            <div className="space-y-4">
              {mockData.notifications.map((notification) => (
                <div key={notification.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <p className="text-sm font-normal">{notification.message}</p>
                  <p className="text-xs text-gray-500">{notification.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BrandDashboard;
