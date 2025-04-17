
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const BrandSettings: React.FC = () => {
  const [brandData, setBrandData] = useState({
    name: "Fashion Brand",
    description: "Premium fashion brand offering quality clothing and accessories for modern consumers.",
    website: "https://fashionbrand.com",
    industry: "fashion",
    founded: "2010",
    headquarters: "New York, NY"
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would save the brand data to your backend
    toast({
      title: "Brand settings updated",
      description: "Your brand information has been saved successfully."
    });
  };

  return (
    <Card className="border border-gray-200 shadow-none rounded-none">
      <CardContent className="p-6">
        <h2 className="text-xl md:text-2xl uppercase font-light mb-6 tracking-tighter">Brand Information</h2>
        
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/placeholder.svg" alt="Brand logo" />
              <AvatarFallback>FB</AvatarFallback>
            </Avatar>
            <Button variant="outline" className="flex items-center gap-2 rounded-none text-xs">
              <Upload size={16} /> Upload Logo
            </Button>
          </div>
          
          <form className="flex-1 space-y-4" onSubmit={handleSave}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="brand-name">Brand Name</Label>
                <Input 
                  id="brand-name" 
                  value={brandData.name}
                  onChange={(e) => setBrandData({...brandData, name: e.target.value})}
                  className="border-gray-200 rounded-none"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input 
                  id="website" 
                  value={brandData.website}
                  onChange={(e) => setBrandData({...brandData, website: e.target.value})}
                  className="border-gray-200 rounded-none"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Select 
                  value={brandData.industry}
                  onValueChange={(value) => setBrandData({...brandData, industry: value})}
                >
                  <SelectTrigger id="industry" className="border-gray-200 rounded-none">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fashion">Fashion</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                    <SelectItem value="footwear">Footwear</SelectItem>
                    <SelectItem value="jewelry">Jewelry</SelectItem>
                    <SelectItem value="beauty">Beauty</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="founded">Founded Year</Label>
                <Input 
                  id="founded" 
                  value={brandData.founded}
                  onChange={(e) => setBrandData({...brandData, founded: e.target.value})}
                  className="border-gray-200 rounded-none"
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="headquarters">Headquarters</Label>
                <Input 
                  id="headquarters" 
                  value={brandData.headquarters}
                  onChange={(e) => setBrandData({...brandData, headquarters: e.target.value})}
                  className="border-gray-200 rounded-none"
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Brand Description</Label>
                <Textarea 
                  id="description" 
                  rows={4}
                  value={brandData.description}
                  onChange={(e) => setBrandData({...brandData, description: e.target.value})}
                  className="border-gray-200 rounded-none resize-none"
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button type="submit" className="rounded-none bg-black text-white hover:bg-gray-800 text-xs font-light">
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default BrandSettings;
