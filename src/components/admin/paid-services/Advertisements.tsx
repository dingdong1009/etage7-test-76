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

interface AdvertisementsProps {
  onAddClick: () => void;
}

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

const performanceData = mockAdvertisements.map(ad => ({
  name: ad.name,
  impressions: ad.impressions,
  clicks: ad.clicks,
  ctr: Number((ad.clicks! / ad.impressions! * 100).toFixed(1))
}));

const Advertisements = ({ onAddClick }: AdvertisementsProps) => {
  const [advertisements] = useState<Advertisement[]>(mockAdvertisements);
  const [searchQuery, setSearchQuery] = useState("");
  
  const totalImpressions = advertisements.reduce((sum, ad) => sum + (ad.impressions || 0), 0);
  const totalClicks = advertisements.reduce((sum, ad) => sum + (ad.clicks || 0), 0);
  const averageCTR = totalImpressions > 0 ? (totalClicks / totalImpressions * 100).toFixed(2) : "0.00";
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center space-x-3">
        <h2 className="text-xl font-normal tracking-tighter uppercase">Advertisement Management</h2>
        <Button 
          className="bg-black hover:bg-gray-100 border hover:text-black hover:border text-white font-normal uppercase"
          onClick={onAddClick}
        >
          <Plus size={16} />
          Add new Package
        </Button>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border border-gray-200 shadow-none rounded-lg">
          <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
            <CardTitle className="text-lg font-normal uppercase text-gray-900">
              Popular Ad Placements
            </CardTitle>
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
                      <h4 className="font-medium capitalize">{placement}</h4>
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
            <CardTitle className="text-lg font-normal uppercase text-gray-900">
              Ad Package Management
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
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
