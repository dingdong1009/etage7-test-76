import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, ShoppingCart, User, Eye, Package } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
const mockFollowers = [{
  id: 1,
  name: "Galeries Lafayette",
  email: "buyer@gl.com",
  location: "Paris, France",
  followedDate: "2025-03-15",
  avatar: ""
}, {
  id: 2,
  name: "Selfridges",
  email: "buyer@selfridges.com",
  location: "London, UK",
  followedDate: "2025-03-10",
  avatar: ""
}, {
  id: 3,
  name: "Saks Fifth Avenue",
  email: "buyer@saks.com",
  location: "New York, USA",
  followedDate: "2025-02-28",
  avatar: ""
}, {
  id: 4,
  name: "Le Bon Marché",
  email: "buyer@lbm.com",
  location: "Paris, France",
  followedDate: "2025-02-20",
  avatar: ""
}, {
  id: 5,
  name: "Harrods",
  email: "buyer@harrods.com",
  location: "London, UK",
  followedDate: "2025-02-15",
  avatar: ""
}];
const mockLikes = [{
  id: 1,
  name: "Galeries Lafayette",
  productName: "Silk Blouse - White",
  likedDate: "2025-03-16",
  avatar: ""
}, {
  id: 2,
  name: "Selfridges",
  productName: "Wool Coat - Black",
  likedDate: "2025-03-14",
  avatar: ""
}, {
  id: 3,
  name: "Neiman Marcus",
  productName: "Leather Pants - Brown",
  likedDate: "2025-03-12",
  avatar: ""
}, {
  id: 4,
  name: "Harrods",
  productName: "Cashmere Sweater - Gray",
  likedDate: "2025-03-10",
  avatar: ""
}, {
  id: 5,
  name: "Bloomingdale's",
  productName: "Silk Scarf - Patterned",
  likedDate: "2025-03-08",
  avatar: ""
}];
const mockCarts = [{
  id: 1,
  name: "Galeries Lafayette",
  productName: "Silk Blouse - White",
  quantity: 10,
  addedDate: "2025-03-17",
  avatar: ""
}, {
  id: 2,
  name: "Selfridges",
  productName: "Wool Coat - Black",
  quantity: 5,
  addedDate: "2025-03-14",
  avatar: ""
}, {
  id: 3,
  name: "Neiman Marcus",
  productName: "Leather Pants - Brown",
  quantity: 8,
  addedDate: "2025-03-13",
  avatar: ""
}, {
  id: 4,
  name: "Harrods",
  productName: "Cashmere Sweater - Gray",
  quantity: 12,
  addedDate: "2025-03-11",
  avatar: ""
}, {
  id: 5,
  name: "Le Bon Marché",
  productName: "Evening Gown - Black",
  quantity: 3,
  addedDate: "2025-03-09",
  avatar: ""
}];
const mockVisits = [{
  id: 1,
  name: "Galeries Lafayette",
  visitDate: "2025-03-17",
  pageViews: 12,
  avatar: ""
}, {
  id: 2,
  name: "Selfridges",
  visitDate: "2025-03-16",
  pageViews: 8,
  avatar: ""
}, {
  id: 3,
  name: "Neiman Marcus",
  visitDate: "2025-03-15",
  pageViews: 5,
  avatar: ""
}, {
  id: 4,
  name: "Harrods",
  visitDate: "2025-03-14",
  pageViews: 10,
  avatar: ""
}, {
  id: 5,
  name: "Bloomingdale's",
  visitDate: "2025-03-13",
  pageViews: 7,
  avatar: ""
}];
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
const BuyerInsights = () => {
  const [insightTab, setInsightTab] = useState("overview");
  return <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <Card className="border-gray-100 shadow-none rounded-none hover:shadow-sm transition-shadow">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm flex items-center gap-2 font-light uppercase">
              <User size={16} strokeWidth={1} className="text-gray-600" />
              Following Buyers
            </CardTitle>
            <CardDescription className="text-xs">Buyers who follow your brand</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-3xl font-light">{mockFollowers.length}</div>
          </CardContent>
        </Card>
        
        <Card className="border-gray-100 shadow-none rounded-none hover:shadow-sm transition-shadow">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm flex items-center gap-2 font-light uppercase">
              <Heart size={16} strokeWidth={1} className="text-gray-600" />
              Likes
            </CardTitle>
            <CardDescription className="text-xs">Buyers who liked your products</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-3xl font-light">{mockLikes.length}</div>
          </CardContent>
        </Card>
        
        <Card className="border-gray-100 shadow-none rounded-none hover:shadow-sm transition-shadow">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm flex items-center gap-2 font-light uppercase">
              <ShoppingCart size={16} strokeWidth={1} className="text-gray-600" />
              Carts
            </CardTitle>
            <CardDescription className="text-xs">Buyers with your products in cart</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-3xl font-light">{mockCarts.length}</div>
          </CardContent>
        </Card>
        
        <Card className="border-gray-100 shadow-none rounded-none hover:shadow-sm transition-shadow">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm flex items-center gap-2 font-light uppercase">
              <Eye size={16} strokeWidth={1} className="text-gray-600" />
              Profile Visits
            </CardTitle>
            <CardDescription className="text-xs">Buyers who viewed your profile</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-3xl font-light">{mockVisits.length}</div>
          </CardContent>
        </Card>

        <Card className="border-gray-100 shadow-none rounded-none hover:shadow-sm transition-shadow">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm flex items-center gap-2 font-light uppercase">
              <Package size={16} strokeWidth={1} className="text-gray-600" />
              Active Products
            </CardTitle>
            <CardDescription className="text-xs">Currently active products</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-3xl font-light">45</div>
          </CardContent>
        </Card>
      </div>
      
      
      
      <Tabs value={insightTab} onValueChange={setInsightTab} className="w-full">
        <TabsList className="bg-transparent p-0 mb-4 border-b w-full flex justify-start space-x-4 h-auto">
          <TabsTrigger value="overview" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-black border-b-2 border-transparent px-2 py-2 rounded-none text-xs uppercase font-light">
            All Data
          </TabsTrigger>
          <TabsTrigger value="followers" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-black border-b-2 border-transparent px-2 py-2 rounded-none text-xs uppercase font-light">
            Followers
          </TabsTrigger>
          <TabsTrigger value="likes" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-black border-b-2 border-transparent px-2 py-2 rounded-none text-xs uppercase font-light">
            Likes
          </TabsTrigger>
          <TabsTrigger value="carts" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-black border-b-2 border-transparent px-2 py-2 rounded-none text-xs uppercase font-light">
            Carts
          </TabsTrigger>
          <TabsTrigger value="visits" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-black border-b-2 border-transparent px-2 py-2 rounded-none text-xs uppercase font-light">
            Visits
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="followers" className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-light">Buyer</TableHead>
                <TableHead className="font-light">Location</TableHead>
                <TableHead className="font-light">Followed Date</TableHead>
                <TableHead className="font-light text-right">Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockFollowers.map(follower => <TableRow key={follower.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={follower.avatar} alt={follower.name} />
                        <AvatarFallback className="text-xs">{follower.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span>{follower.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{follower.location}</TableCell>
                  <TableCell>{follower.followedDate}</TableCell>
                  <TableCell className="text-right">{follower.email}</TableCell>
                </TableRow>)}
            </TableBody>
          </Table>
        </TabsContent>
        
        <TabsContent value="likes" className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-light">Buyer</TableHead>
                <TableHead className="font-light">Product</TableHead>
                <TableHead className="font-light text-right">Liked Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockLikes.map(like => <TableRow key={like.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={like.avatar} alt={like.name} />
                        <AvatarFallback className="text-xs">{like.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span>{like.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{like.productName}</TableCell>
                  <TableCell className="text-right">{like.likedDate}</TableCell>
                </TableRow>)}
            </TableBody>
          </Table>
        </TabsContent>
        
        <TabsContent value="carts" className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-light">Buyer</TableHead>
                <TableHead className="font-light">Product</TableHead>
                <TableHead className="font-light">Quantity</TableHead>
                <TableHead className="font-light text-right">Added Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCarts.map(cart => <TableRow key={cart.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={cart.avatar} alt={cart.name} />
                        <AvatarFallback className="text-xs">{cart.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span>{cart.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{cart.productName}</TableCell>
                  <TableCell>{cart.quantity}</TableCell>
                  <TableCell className="text-right">{cart.addedDate}</TableCell>
                </TableRow>)}
            </TableBody>
          </Table>
        </TabsContent>
        
        <TabsContent value="visits" className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-light">Buyer</TableHead>
                <TableHead className="font-light">Visit Date</TableHead>
                <TableHead className="font-light text-right">Page Views</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockVisits.map(visit => <TableRow key={visit.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={visit.avatar} alt={visit.name} />
                        <AvatarFallback className="text-xs">{visit.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span>{visit.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{visit.visitDate}</TableCell>
                  <TableCell className="text-right">{visit.pageViews}</TableCell>
                </TableRow>)}
            </TableBody>
          </Table>
        </TabsContent>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-gray-100 shadow-none rounded-none">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm font-light uppercase">Recent Followers</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  {mockFollowers.slice(0, 3).map(follower => <div key={follower.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={follower.avatar} alt={follower.name} />
                          <AvatarFallback className="text-xs">{follower.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{follower.name}</p>
                          <p className="text-xs text-gray-500">{follower.location}</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">{follower.followedDate}</p>
                    </div>)}
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-gray-100 shadow-none rounded-none">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm font-light uppercase">Recent Likes</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  {mockLikes.slice(0, 3).map(like => <div key={like.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={like.avatar} alt={like.name} />
                          <AvatarFallback className="text-xs">{like.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{like.name}</p>
                          <p className="text-xs text-gray-500">{like.productName}</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">{like.likedDate}</p>
                    </div>)}
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-gray-100 shadow-none rounded-none">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm font-light uppercase">Recent Cart Additions</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  {mockCarts.slice(0, 3).map(cart => <div key={cart.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={cart.avatar} alt={cart.name} />
                          <AvatarFallback className="text-xs">{cart.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{cart.name}</p>
                          <p className="text-xs text-gray-500">{cart.productName} (Qty: {cart.quantity})</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">{cart.addedDate}</p>
                    </div>)}
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-gray-100 shadow-none rounded-none">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm font-light uppercase">Recent Profile Visits</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  {mockVisits.slice(0, 3).map(visit => <div key={visit.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={visit.avatar} alt={visit.name} />
                          <AvatarFallback className="text-xs">{visit.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{visit.name}</p>
                          <p className="text-xs text-gray-500">{visit.pageViews} page views</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">{visit.visitDate}</p>
                    </div>)}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>;
};
export default BuyerInsights;