
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Download, ArrowRight } from 'lucide-react';
import { toast } from "sonner";

const PressKitPage = () => {
  const brandAssets = [
    {
      name: 'Logo (High-Res)',
      format: 'PNG, SVG',
      description: 'Official ETAGE7 logo in high resolution formats suitable for print and digital media.',
      id: 'logo-high-res'
    },
    {
      name: 'Logo (Vector)',
      format: 'AI, EPS',
      description: 'Vector formats of our logo for unlimited scaling.',
      id: 'logo-vector'
    },
    {
      name: 'Brand Guidelines',
      format: 'PDF',
      description: 'Comprehensive guide for proper logo usage, color palette, typography, and visual identity standards.',
      id: 'brand-guidelines'
    },
    {
      name: 'Product Images',
      format: 'JPG, PNG',
      description: 'High-resolution images of our platform and services.',
      id: 'product-images'
    }
  ];

  const companyInfo = [
    {
      label: 'Founded',
      value: '2020'
    },
    {
      label: 'Headquarters',
      value: 'Paris, France'
    },
    {
      label: 'Team Size',
      value: '50+ employees'
    },
    {
      label: 'Markets',
      value: '15+ European countries'
    },
    {
      label: 'Funding',
      value: '€8 Million in total funding'
    }
  ];

  const handleDownload = (assetId: string) => {
    // In a real application, this would trigger the download of the actual file
    // For now, we'll show a toast notification to indicate the functionality
    toast.success(`Downloading ${assetId} asset`);
  };

  const handleDownloadFullKit = () => {
    toast.success("Downloading full press kit");
  };

  const handleDownloadMediaKit = () => {
    toast.success("Downloading full media kit");
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tighter uppercase mb-10">Press Kit</h1>
      
      <div className="space-y-12">
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-light tracking-tighter mb-4">ETAGE7 Media Resources</h2>
              <p className="text-gray-600 mb-4">
                Welcome to the ETAGE7 press kit. Here you'll find everything you need for media coverage of our company.
              </p>
              <p className="text-gray-600 mb-6">
                For press inquiries, please contact our media team at press@etage7.com.
              </p>
              <Button 
                variant="outline" 
                className="w-full sm:w-auto flex items-center justify-center border-black text-black hover:bg-black hover:text-white transition-colors"
                onClick={handleDownloadFullKit}
              >
                <Download className="mr-2 h-4 w-4" />
                Download Full Press Kit
              </Button>
            </div>
            <div className="flex justify-center items-center">
              {/* ETAGE7 logo in a different size */}
              <div className="text-black text-8xl font-medium tracking-tighter uppercase">
                éTAGE7
              </div>
            </div>
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-light tracking-tighter mb-6">Company Overview</h2>
          <p className="text-gray-600 mb-4">
            ETAGE7 is a fashion technology platform connecting emerging and established fashion brands with buyers worldwide. 
            Our mission is to democratize access to the fashion industry by creating transparent, efficient connections 
            between brands and buyers.
          </p>
          <p className="text-gray-600 mb-6">
            Founded in 2020, ETAGE7 emerged as a revolutionary solution to address the challenges faced by fashion brands 
            in reaching global markets and buyers in discovering unique products.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {companyInfo.map((item, index) => (
              <div key={index} className="p-6 border border-gray-200">
                <h3 className="text-sm text-gray-500 mb-1">{item.label}</h3>
                <p className="text-lg font-light">{item.value}</p>
              </div>
            ))}
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-light tracking-tighter mb-6">Brand Assets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {brandAssets.map((asset, index) => (
              <div key={index} className="border border-gray-200 p-6">
                <h3 className="text-xl font-light mb-2">{asset.name}</h3>
                <div className="text-sm text-gray-500 mb-2">Format: {asset.format}</div>
                <p className="text-gray-600 mb-4">{asset.description}</p>
                <Button 
                  variant="outline"
                  size="sm"
                  className="flex items-center border-black text-black hover:bg-black hover:text-white transition-colors"
                  onClick={() => handleDownload(asset.id)}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gray-50 p-8">
          <h2 className="text-2xl font-light tracking-tighter mb-4">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-light mb-2">Media Kit</h3>
              <p className="text-gray-600 mb-4">
                Download our complete media kit including logos, product images, and executive headshots.
              </p>
              <Button 
                variant="outline"
                className="flex items-center border-black text-black hover:bg-black hover:text-white transition-colors"
                onClick={handleDownloadMediaKit}
              >
                <Download className="mr-2 h-4 w-4" />
                Full Media Kit
              </Button>
            </div>
            <div>
              <h3 className="text-xl font-light mb-2">Press Releases</h3>
              <p className="text-gray-600 mb-4">
                Access our archive of press releases and company announcements.
              </p>
              <Link to="/press">
                <Button 
                  variant="outline"
                  className="flex items-center border-black text-black hover:bg-black hover:text-white transition-colors"
                >
                  View Press Releases <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PressKitPage;
