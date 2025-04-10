
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, QrCode } from "lucide-react";

const BrandStore = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl md:text-6xl uppercase font-thin mb-6">Store Settings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border border-gray-200 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-1xl md:text-2xl uppercase font-thin mb-6">Store Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Store Name
              </label>
              <input 
                type="text" 
                className="w-full p-2 border border-gray-200"
                placeholder="Your Brand Store"
                value="Elegant Fashion House" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Store Description
              </label>
              <textarea 
                className="w-full p-2 border border-gray-200 h-24"
                placeholder="Tell customers about your store"
                value="Premium fashion pieces crafted with attention to detail and sustainability in mind. Discover our unique collections designed for the modern individual."
              ></textarea>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input 
                  type="email" 
                  className="w-full p-2 border border-gray-200"
                  placeholder="contact@yourbrand.com"
                  value="contact@elegantfashion.com" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input 
                  type="tel" 
                  className="w-full p-2 border border-gray-200"
                  placeholder="+1 (555) 123-4567"
                  value="+1 (555) 987-6543" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Website
                </label>
                <input 
                  type="url" 
                  className="w-full p-2 border border-gray-200"
                  placeholder="https://yourbrand.com"
                  value="https://elegantfashion.com" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Social Media
                </label>
                <input 
                  type="text" 
                  className="w-full p-2 border border-gray-200"
                  placeholder="@yourbrand"
                  value="@elegantfashion" 
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Store Address
              </label>
              <textarea 
                className="w-full p-2 border border-gray-200 h-20"
                placeholder="Your store address"
                value="123 Fashion Avenue, Suite 500&#10;New York, NY 10001&#10;United States"
              ></textarea>
            </div>
            
            <div className="flex justify-end">
              <button className="px-4 py-2 bg-black text-white hover:bg-black-600">
                Save Changes
              </button>
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-1xl md:text-2xl uppercase font-thin mb-6">Store Logo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="h-40 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">Upload Logo</p>
                <p className="text-xs text-gray-400">PNG, JPG or SVG, max 2MB</p>
              </div>
              
              <div className="flex justify-center">
                <button className="px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300">
                  Browse Files
                </button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-1xl md:text-2xl uppercase font-thin mb-6">Store QR Code</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <div className="h-40 w-40 border border-gray-200 flex items-center justify-center">
                <QrCode size={120} />
              </div>
              
              <p className="text-sm text-gray-500 text-center">
                Scan this code to visit your online store
              </p>
              
              <div className="flex gap-2">
                <button className="px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300">
                  Download
                </button>
                <button className="px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300">
                  Share
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BrandStore;
