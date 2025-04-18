
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Search, Plus, Eye, Edit, Trash } from "lucide-react";
import { Advertisement } from "@/types/services/paidServices";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

// Mock data for advertisements
const mockAdvertisements: Advertisement[] = [
  {
    id: "ad-1",
    name: "Homepage Banner",
    description: "Premium placement on the homepage carousel",
    price: 500,
    features: ["Above the fold", "Mobile responsive", "Click tracking"],
    type: "advertisement",
    frequency: "monthly",
    autoRenewal: true,
    status: "active",
    createdAt: "2024-01-10T08:00:00Z",
    updatedAt: "2024-03-15T14:30:00Z",
    placement: "homepage",
    duration: 30,
    impressions: 15000,
    clicks: 450
  },
  {
    id: "ad-2",
    name: "Search Results Feature",
    description: "Featured placement in search results",
    price: 350,
    features: ["Top of results", "Highlighted border", "Custom badge"],
    type: "advertisement",
    frequency: "monthly",
    autoRenewal: true,
    status: "active",
    createdAt: "2024-02-05T09:15:00Z",
    updatedAt: "2024-04-01T11:00:00Z",
    placement: "search",
    duration: 30,
    impressions: 8500,
    clicks: 310
  },
  {
    id: "ad-3",
    name: "Curated Section Placement",
    description: "Featured in the curated section of the marketplace",
    price: 600,
    features: ["Editorial coverage", "Custom description", "Multiple images"],
    type: "advertisement",
    frequency: "monthly",
    autoRenewal: false,
    status: "inactive",
    createdAt: "2024-03-12T10:30:00Z",
    updatedAt: "2024-04-05T16:45:00Z",
    placement: "curated",
    duration: 15,
    impressions: 6200,
    clicks: 280
  },
  {
    id: "ad-4",
    name: "Buyer Dashboard Highlight",
    description: "Highlighted brand in buyer dashboard",
    price: 400,
    features: ["Persistent visibility", "Custom call-to-action", "Direct messaging"],
    type: "advertisement",
    frequency: "monthly",
    autoRenewal: true,
    status: "active",
    createdAt: "2024-02-25T13:45:00Z",
    updatedAt: "2024-03-28T09:00:00Z",
    placement: "dashboard",
    duration: 30,
    impressions: 4800,
    clicks: 195
  }
];

// Performance data for chart
const performanceData = mockAdvertisements.map(ad => ({
  name: ad.name,
  impressions: ad.impressions,
  clicks: ad.clicks,
  ctr: Number((ad.clicks! / ad.impressions! * 100).toFixed(1))
}));

const Advertisements = () => {
  const [advertisements] = useState<Advertisement[]>(mockAdvertisements);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Calculate totals
  const totalImpressions = advertisements.reduce((sum, ad) => sum + (ad.impressions || 0), 0);
  const totalClicks = advertisements.reduce((sum, ad) => sum + (ad.clicks || 0), 0);
  const averageCTR = totalImpressions > 0 ? (totalClicks / totalImpressions * 100).toFixed(2) : "0.00";
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <h2 className="text-2xl font-light">Advertisement Management</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search advertisements..."
              className="pl-10 w-full md:w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button className="gap-2">
            <Plus size={16} />
            New Ad
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border border-gray-200 shadow-none rounded-lg">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-500">Total Impressions</span>
              <span className="text-xs font-medium text-gray-400">Last 30 days</span>
            </div>
            <div className="text-2xl font-light">{totalImpressions.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="border border-gray-200 shadow-none rounded-lg">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-500">Total Clicks</span>
              <span className="text-xs font-medium text-gray-400">Last 30 days</span>
            </div>
            <div className="text-2xl font-light">{totalClicks.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="border border-gray-200 shadow-none rounded-lg">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-500">Average CTR</span>
              <span className="text-xs font-medium text-gray-400">Last 30 days</span>
            </div>
            <div className="text-2xl font-light">{averageCTR}%</div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="border border-gray-200 shadow-none rounded-lg">
        <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
          <div className="flex flex-col md:flex-row justify-between md:items-center">
            <CardTitle className="text-lg font-medium text-gray-900">
              Advertisement Performance
            </CardTitle>
            <Tabs defaultValue="chart" className="w-fit">
              <TabsList className="bg-transparent">
                <TabsTrigger value="chart">Chart</TabsTrigger>
                <TabsTrigger value="table">Table</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <TabsContent value="chart" className="mt-0">
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={performanceData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" domain={[0, 10]} />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="impressions" name="Impressions" fill="#8884d8" />
                  <Bar yAxisId="left" dataKey="clicks" name="Clicks" fill="#82ca9d" />
                  <Bar yAxisId="right" dataKey="ctr" name="CTR (%)" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="table" className="mt-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent bg-gray-50">
                  <TableHead className="w-[200px] font-medium">Advertisement</TableHead>
                  <TableHead className="font-medium">Placement</TableHead>
                  <TableHead className="font-medium">Impressions</TableHead>
                  <TableHead className="font-medium">Clicks</TableHead>
                  <TableHead className="font-medium">CTR</TableHead>
                  <TableHead className="font-medium">Status</TableHead>
                  <TableHead className="text-right font-medium">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {advertisements.map((ad) => (
                  <TableRow key={ad.id} className="border-t border-gray-100">
                    <TableCell className="font-medium">{ad.name}</TableCell>
                    <TableCell className="capitalize">{ad.placement}</TableCell>
                    <TableCell>{ad.impressions?.toLocaleString()}</TableCell>
                    <TableCell>{ad.clicks?.toLocaleString()}</TableCell>
                    <TableCell>
                      {ad.impressions && ad.clicks
                        ? (ad.clicks / ad.impressions * 100).toFixed(2) + "%"
                        : "0.00%"}
                    </TableCell>
                    <TableCell>
                      {ad.status === "active" ? (
                        <Badge variant="outline" className="bg-accent-mint text-gray-800 border-accent-mint">
                          Active
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
                          Inactive
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border border-gray-200 shadow-none rounded-lg">
          <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
            <CardTitle className="text-lg font-medium text-gray-900">
              Popular Ad Placements
            </CardTitle>
            <CardDescription>Performance by placement location</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {['homepage', 'search', 'dashboard', 'curated'].map(placement => {
              const adsInPlacement = advertisements.filter(ad => ad.placement === placement);
              const totalImpressions = adsInPlacement.reduce((sum, ad) => sum + (ad.impressions || 0), 0);
              const totalClicks = adsInPlacement.reduce((sum, ad) => sum + (ad.clicks || 0), 0);
              const ctr = totalImpressions > 0 ? (totalClicks / totalImpressions * 100).toFixed(2) : "0.00";
              const ctrNumber = parseFloat(ctr);
              
              return (
                <div key={placement} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium capitalize">{placement}</h3>
                      <p className="text-sm text-gray-500">{adsInPlacement.length} active ads</p>
                    </div>
                    <Badge variant={ctrNumber > 3 ? "outline" : "secondary"} className={
                      ctrNumber > 3 ? "bg-accent-mint text-gray-800 border-accent-mint" : ""
                    }>
                      {ctr}% CTR
                    </Badge>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Impressions</p>
                      <p className="font-medium">{totalImpressions.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Clicks</p>
                      <p className="font-medium">{totalClicks.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Avg. Price</p>
                      <p className="font-medium">
                        ${Math.round(adsInPlacement.reduce((sum, ad) => sum + ad.price, 0) / 
                          (adsInPlacement.length || 1)).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
        
        <Card className="border border-gray-200 shadow-none rounded-lg">
          <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
            <CardTitle className="text-lg font-medium text-gray-900">
              Ad Package Management
            </CardTitle>
            <CardDescription>Manage advertisement packages</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-lg flex items-center justify-between hover:border-black transition-colors">
                <div>
                  <h3 className="font-medium">Basic Visibility Package</h3>
                  <p className="text-sm text-gray-500">Search placement + Basic analytics</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-medium">$250 / month</span>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg flex items-center justify-between hover:border-black transition-colors">
                <div>
                  <h3 className="font-medium">Premium Promotion</h3>
                  <p className="text-sm text-gray-500">Homepage banner + Dashboard features</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-medium">$600 / month</span>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg flex items-center justify-between hover:border-black transition-colors">
                <div>
                  <h3 className="font-medium">Elite Package</h3>
                  <p className="text-sm text-gray-500">All placements + Priority support</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-medium">$1200 / month</span>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </div>
              <Button variant="outline" className="w-full gap-2">
                <Plus size={16} />
                New Package
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Advertisements;
