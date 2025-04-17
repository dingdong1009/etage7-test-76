
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Users, Heart, ShoppingCart, Eye } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

// Mock data for demonstration
const mockInsightData = {
  followers: [
    { id: 1, name: "Luxury Boutique Paris", email: "contact@luxuryboutiqueparis.com", date: "2023-04-12", location: "Paris, France" },
    { id: 2, name: "Milano Fashion House", email: "info@milanofashionhouse.it", date: "2023-04-10", location: "Milan, Italy" },
    { id: 3, name: "Berlin Concept Store", email: "hello@berlinconceptstore.de", date: "2023-04-08", location: "Berlin, Germany" },
    { id: 4, name: "London Style Co.", email: "buyers@londonstyle.co.uk", date: "2023-04-05", location: "London, UK" },
    { id: 5, name: "New York Luxury", email: "orders@nyluxury.com", date: "2023-04-01", location: "New York, USA" },
  ],
  likes: [
    { id: 1, name: "Tokyo Fashion Forward", email: "info@tokyofashion.jp", product: "Silk Evening Dress", date: "2023-04-14", location: "Tokyo, Japan" },
    { id: 2, name: "Luxury Boutique Paris", email: "contact@luxuryboutiqueparis.com", product: "Cashmere Sweater", date: "2023-04-11", location: "Paris, France" },
    { id: 3, name: "Dubai Luxury Mall", email: "buying@dubailuxury.ae", product: "Leather Handbag", date: "2023-04-09", location: "Dubai, UAE" },
    { id: 4, name: "Stockholm Selections", email: "hello@stockholmselections.se", product: "Linen Blazer", date: "2023-04-07", location: "Stockholm, Sweden" },
    { id: 5, name: "Madrid Fashion Hub", email: "contact@madridfashion.es", product: "Summer Collection Set", date: "2023-04-03", location: "Madrid, Spain" },
  ],
  carts: [
    { id: 1, name: "Dubai Luxury Mall", email: "buying@dubailuxury.ae", product: "Leather Handbag", quantity: 3, date: "2023-04-13", location: "Dubai, UAE" },
    { id: 2, name: "Sydney Style Co.", email: "orders@sydneystyle.com.au", product: "Wool Coat", quantity: 5, date: "2023-04-12", location: "Sydney, Australia" },
    { id: 3, name: "Amsterdam Fashion", email: "buy@amsterdamfashion.nl", product: "Denim Collection", quantity: 10, date: "2023-04-10", location: "Amsterdam, Netherlands" },
    { id: 4, name: "Copenhagen Design", email: "wholesale@copenhagendesign.dk", product: "Minimalist Dress", quantity: 8, date: "2023-04-06", location: "Copenhagen, Denmark" },
    { id: 5, name: "Berlin Concept Store", email: "hello@berlinconceptstore.de", product: "Linen Collection", quantity: 4, date: "2023-04-04", location: "Berlin, Germany" },
  ],
  visits: [
    { id: 1, name: "Barcelona Style", email: "info@barcelonastyle.es", date: "2023-04-14", pages: 12, duration: "8m 45s", location: "Barcelona, Spain" },
    { id: 2, name: "Seoul Fashion Forward", email: "buyers@seoulfashion.kr", date: "2023-04-13", pages: 8, duration: "5m 20s", location: "Seoul, South Korea" },
    { id: 3, name: "Toronto Boutique", email: "orders@torontoboutique.ca", date: "2023-04-11", pages: 15, duration: "12m 10s", location: "Toronto, Canada" },
    { id: 4, name: "Helsinki Design", email: "wholesale@helsinkidesign.fi", date: "2023-04-09", pages: 6, duration: "3m 55s", location: "Helsinki, Finland" },
    { id: 5, name: "Vienna Luxury", email: "buying@viennaluxury.at", date: "2023-04-07", pages: 10, duration: "7m 30s", location: "Vienna, Austria" },
  ]
};

const BrandInsights = () => {
  const [timeFilter, setTimeFilter] = useState<string>("last7days");
  
  // Summary card data
  const summaryData = [
    { title: "Followers", icon: <Users size={24} strokeWidth={1.5} />, count: 45, change: "+12%", trend: "up" },
    { title: "Product Likes", icon: <Heart size={24} strokeWidth={1.5} />, count: 358, change: "+24%", trend: "up" },
    { title: "Cart Additions", icon: <ShoppingCart size={24} strokeWidth={1.5} />, count: 87, change: "+8%", trend: "up" },
    { title: "Profile Visits", icon: <Eye size={24} strokeWidth={1.5} />, count: 432, change: "+18%", trend: "up" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-light">Buyer Interaction Insights</h2>
        <div className="flex items-center gap-4">
          <Select defaultValue={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-[180px] rounded-none text-xs">
              <SelectValue placeholder="Select time period" />
            </SelectTrigger>
            <SelectContent className="rounded-none">
              <SelectItem value="today" className="text-xs">Today</SelectItem>
              <SelectItem value="last7days" className="text-xs">Last 7 days</SelectItem>
              <SelectItem value="last30days" className="text-xs">Last 30 days</SelectItem>
              <SelectItem value="last90days" className="text-xs">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryData.map((item, index) => (
          <Card key={index} className="border border-gray-100 rounded-none shadow-none">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div className="bg-gray-50 p-2 rounded-sm">{item.icon}</div>
                <Badge variant={item.trend === "up" ? "default" : "destructive"} className={`${item.trend === "up" ? "bg-accent-mint text-gray-800" : ""} text-xs rounded-sm`}>
                  {item.change}
                </Badge>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500 font-light">{item.title}</p>
                <p className="text-2xl font-light mt-1">{item.count}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Insights */}
      <Card className="border border-gray-100 rounded-none shadow-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-light">Detailed Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="followers">
            <TabsList className="grid grid-cols-4 h-9 mb-6 bg-transparent">
              <TabsTrigger 
                value="followers" 
                className="text-xs font-light uppercase rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:shadow-none"
              >
                Followers
              </TabsTrigger>
              <TabsTrigger 
                value="likes" 
                className="text-xs font-light uppercase rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:shadow-none"
              >
                Product Likes
              </TabsTrigger>
              <TabsTrigger 
                value="carts" 
                className="text-xs font-light uppercase rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:shadow-none"
              >
                Cart Additions
              </TabsTrigger>
              <TabsTrigger 
                value="visits" 
                className="text-xs font-light uppercase rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:shadow-none"
              >
                Profile Visits
              </TabsTrigger>
            </TabsList>

            <TabsContent value="followers">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-light">Buyer</TableHead>
                    <TableHead className="font-light">Contact</TableHead>
                    <TableHead className="font-light">Location</TableHead>
                    <TableHead className="font-light">Date</TableHead>
                    <TableHead className="font-light text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockInsightData.followers.map((follower) => (
                    <TableRow key={follower.id}>
                      <TableCell className="font-medium">{follower.name}</TableCell>
                      <TableCell>{follower.email}</TableCell>
                      <TableCell>{follower.location}</TableCell>
                      <TableCell>{follower.date}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" className="h-8 rounded-none text-xs">
                          Contact
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="likes">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-light">Buyer</TableHead>
                    <TableHead className="font-light">Product</TableHead>
                    <TableHead className="font-light">Location</TableHead>
                    <TableHead className="font-light">Date</TableHead>
                    <TableHead className="font-light text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockInsightData.likes.map((like) => (
                    <TableRow key={like.id}>
                      <TableCell className="font-medium">{like.name}</TableCell>
                      <TableCell>{like.product}</TableCell>
                      <TableCell>{like.location}</TableCell>
                      <TableCell>{like.date}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" className="h-8 rounded-none text-xs">
                          Contact
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="carts">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-light">Buyer</TableHead>
                    <TableHead className="font-light">Product</TableHead>
                    <TableHead className="font-light">Quantity</TableHead>
                    <TableHead className="font-light">Date</TableHead>
                    <TableHead className="font-light text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockInsightData.carts.map((cart) => (
                    <TableRow key={cart.id}>
                      <TableCell className="font-medium">{cart.name}</TableCell>
                      <TableCell>{cart.product}</TableCell>
                      <TableCell>{cart.quantity}</TableCell>
                      <TableCell>{cart.date}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" className="h-8 rounded-none text-xs">
                          Follow Up
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="visits">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-light">Buyer</TableHead>
                    <TableHead className="font-light">Pages Viewed</TableHead>
                    <TableHead className="font-light">Duration</TableHead>
                    <TableHead className="font-light">Date</TableHead>
                    <TableHead className="font-light text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockInsightData.visits.map((visit) => (
                    <TableRow key={visit.id}>
                      <TableCell className="font-medium">{visit.name}</TableCell>
                      <TableCell>{visit.pages}</TableCell>
                      <TableCell>{visit.duration}</TableCell>
                      <TableCell>{visit.date}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" className="h-8 rounded-none text-xs">
                          Contact
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default BrandInsights;
