import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Package, ShoppingCart, Bell, MessageSquare, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import BuyerInsights from "@/components/brand/marketing/BuyerInsights";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Mock data for the engagement chart
const engagementData = [{
  name: 'Jan',
  followers: 4,
  likes: 8,
  carts: 2,
  visits: 15
}, {
  name: 'Feb',
  followers: 6,
  likes: 12,
  carts: 4,
  visits: 20
}, {
  name: 'Mar',
  followers: 8,
  likes: 16,
  carts: 6,
  visits: 25
}, {
  name: 'Apr',
  followers: 10,
  likes: 14,
  carts: 8,
  visits: 30
}, {
  name: 'May',
  followers: 12,
  likes: 18,
  carts: 10,
  visits: 35
}];

// Sample data - in a real app, this would come from your backend
const mockData = {
  products: {
    active: 45,
    total: 86
  },
  recentOrders: [{
    id: '1',
    customer: 'Fashion Store Paris',
    date: '2025-04-15',
    status: 'pending',
    amount: '€2,400'
  }, {
    id: '2',
    customer: 'Luxury Boutique',
    date: '2025-04-14',
    status: 'shipped',
    amount: '€1,800'
  }, {
    id: '3',
    customer: 'Style Hub',
    date: '2025-04-13',
    status: 'delivered',
    amount: '€3,200'
  }],
  notifications: [{
    id: '1',
    message: 'New order received from Fashion Store Paris',
    time: '2 hours ago'
  }, {
    id: '2',
    message: 'Product stock running low: Summer Collection Dress',
    time: '5 hours ago'
  }, {
    id: '3',
    message: 'Payment confirmed for order #12345',
    time: 'Yesterday'
  }],
  messages: [{
    id: '1',
    from: 'Fashion Store Paris',
    preview: 'Regarding the Spring collection...',
    time: '1 hour ago'
  }, {
    id: '2',
    from: 'Luxury Boutique',
    preview: 'Can you provide more details about...',
    time: '3 hours ago'
  }, {
    id: '3',
    from: 'Style Hub',
    preview: 'We would like to place a bulk order...',
    time: 'Yesterday'
  }]
};
const BrandDashboard = () => {
  return <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="relative -mx-8 px-8 py-12 bg-gray-50/50 border-b border-gray-100">
        <div className="max-w-[1481px] mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tighter uppercase mb-4">
            BRAND DASHBOARD
          </h1>
        </div>
      </div>

      {/* Product Stats and Notifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border border-gray-200 shadow-none rounded-none hover:border-black transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <MessageSquare className="h-8 w-8 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 uppercase">Recent Messages</p>
                  <h3 className="text-3xl font-light">{mockData.messages.length}</h3>
                </div>
              </div>
            </div>
            <Link to="/brand/messages" className="text-xs text-gray-600 hover:text-black flex items-center gap-1 transition-colors">
              View Messages <ChevronRight className="h-3 w-3" />
            </Link>
          </CardContent>
        </Card>

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
              {mockData.recentOrders.map(order => <div key={order.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="text-sm font-normal">{order.customer}</p>
                    <p className="text-xs text-gray-500">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-normal">{order.amount}</p>
                    <p className="text-xs text-gray-500 uppercase">{order.status}</p>
                  </div>
                </div>)}
            </div>
          </CardContent>
        </Card>

        {/* Recent Notifications */}
        <Card className="border border-gray-200 shadow-none rounded-none hover:border-black transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Bell className="h-6 w-6 text-gray-400" />
                <h3 className="text-lg font-light uppercase">Recent Notifications</h3>
              </div>
            </div>
            <div className="space-y-4">
              {mockData.notifications.map(notification => <div key={notification.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <p className="text-sm font-normal">{notification.message}</p>
                  <p className="text-xs text-gray-500">{notification.time}</p>
                </div>)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Engagement Overview Chart */}
      <Card className="border-gray-100 shadow-none rounded-none">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-sm font-light uppercase">Engagement Overview</CardTitle>
          <CardDescription className="text-xs">Monthly engagement metrics</CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="followers" name="Followers" fill="#d1d5db" />
                <Bar dataKey="likes" name="Likes" fill="#9ca3af" />
                <Bar dataKey="carts" name="Carts" fill="#6b7280" />
                <Bar dataKey="visits" name="Visits" fill="#374151" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity and Buyer Insights */}
      <div className="space-y-8">
        {/* Buyer Insights Section */}
        <BuyerInsights />

        {/* Recent Activity Sections */}
        
      </div>
    </div>;
};
export default BrandDashboard;