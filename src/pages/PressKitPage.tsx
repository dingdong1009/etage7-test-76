
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { toast } from "sonner";

const PressKitPage = () => {
  // Logo variants configuration
  const logoVariants = [
    {
      category: "White Logo",
      background: "bg-black",
      textColor: "text-white",
      sizes: [
        { name: "Small", size: "text-3xl", id: "white-logo-small" },
        { name: "Medium", size: "text-5xl", id: "white-logo-medium" },
        { name: "Large", size: "text-7xl", id: "white-logo-large" },
      ]
    },
    {
      category: "Black Logo",
      background: "bg-white border border-gray-200",
      textColor: "text-black",
      sizes: [
        { name: "Small", size: "text-3xl", id: "black-logo-small" },
        { name: "Medium", size: "text-5xl", id: "black-logo-medium" },
        { name: "Large", size: "text-7xl", id: "black-logo-large" },
      ]
    },
    {
      category: "Transparent Background",
      background: "bg-[url('/placeholder.svg')] bg-contain bg-center",
      textColor: "text-black",
      sizes: [
        { name: "Small", size: "text-3xl", id: "transparent-logo-small" },
        { name: "Medium", size: "text-5xl", id: "transparent-logo-medium" },
        { name: "Large", size: "text-7xl", id: "transparent-logo-large" },
      ]
    }
  ];

  // Social media logo variants with shorter É7 text
  const socialMediaVariants = [
    {
      category: "Social Media - White",
      background: "bg-black",
      textColor: "text-white",
      sizes: [
        { name: "Small", size: "text-3xl", id: "social-white-small" },
        { name: "Medium", size: "text-5xl", id: "social-white-medium" },
        { name: "Large", size: "text-7xl", id: "social-white-large" },
      ],
      text: "É7"
    },
    {
      category: "Social Media - Black",
      background: "bg-white border border-gray-200",
      textColor: "text-black",
      sizes: [
        { name: "Small", size: "text-3xl", id: "social-black-small" },
        { name: "Medium", size: "text-5xl", id: "social-black-medium" },
        { name: "Large", size: "text-7xl", id: "social-black-large" },
      ],
      text: "É7"
    },
    {
      category: "Social Media - Purple",
      background: "bg-[#9b87f5]",
      textColor: "text-white",
      sizes: [
        { name: "Small", size: "text-3xl", id: "social-purple-small" },
        { name: "Medium", size: "text-5xl", id: "social-purple-medium" },
        { name: "Large", size: "text-7xl", id: "social-purple-large" },
      ],
      text: "É7"
    },
    {
      category: "Social Media - Blue",
      background: "bg-[#0EA5E9]",
      textColor: "text-white",
      sizes: [
        { name: "Small", size: "text-3xl", id: "social-blue-small" },
        { name: "Medium", size: "text-5xl", id: "social-blue-medium" },
        { name: "Large", size: "text-7xl", id: "social-blue-large" },
      ],
      text: "É7"
    }
  ];

  // Formats available for download
  const formats = [
    { name: "PNG", id: "png" },
    { name: "SVG", id: "svg" },
    { name: "PDF", id: "pdf" },
  ];

  const logoRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleDownload = (logoId: string, format: string, logoText = "éTAGE7") => {
    const logoElement = logoRefs.current[logoId];
    
    if (logoElement) {
      const displayText = logoElement.innerText;
      let fileContent = '';
      let fileName = `etage7-${logoId}.${format.toLowerCase()}`;
      let mimeType = '';
      
      // Generate different file formats
      if (format === 'svg') {
        const backgroundColor = logoId.includes('transparent') ? 'transparent' : 
                               logoId.includes('white') ? 'black' : 
                               logoId.includes('purple') ? '#9b87f5' : 
                               logoId.includes('blue') ? '#0EA5E9' : 'white';
        const textColor = logoId.includes('white') || logoId.includes('purple') || logoId.includes('blue') ? 'white' : 'black';
        
        // Create SVG content
        fileContent = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="100">
          <rect width="100%" height="100%" fill="${backgroundColor}" />
          <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" 
            font-family="Arial" font-weight="500" fill="${textColor}" 
            style="text-transform: uppercase; letter-spacing: -0.05em;">
            ${displayText}
          </text>
        </svg>`;
        mimeType = 'image/svg+xml';
      } 
      else if (format === 'png') {
        // For simplicity, we'll create a simple text file with PNG content description
        // In a real app, you would use canvas to generate an actual PNG
        fileContent = `PNG representation of the ${logoId} logo would be generated here.
Logo text: ${displayText}`;
        mimeType = 'text/plain';
      }
      else if (format === 'pdf') {
        // For simplicity, we'll create a simple text file with PDF content description
        // In a real app, you would use a library like jsPDF to generate a PDF
        fileContent = `PDF representation of the ${logoId} logo would be generated here.
Logo text: ${displayText}`;
        mimeType = 'text/plain';
      }
      
      // Create and trigger download
      const blob = new Blob([fileContent], { type: mimeType });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success(`Downloading ${logoId} in ${format} format`);
    } else {
      toast.error(`Could not generate ${format} file for ${logoId}`);
    }
  };

  // Function to render a logo variant section
  const renderLogoSection = (variant, variantIndex, isShortLogo = false) => {
    return (
      <section key={variantIndex} className="mb-16">
        <h2 className="text-2xl font-light tracking-tighter mb-6">{variant.category}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {variant.sizes.map((size, sizeIndex) => (
            <div key={sizeIndex} className="flex flex-col space-y-4">
              <div 
                className={`${variant.background} p-8 h-48 flex items-center justify-center`}
                ref={el => logoRefs.current[size.id] = el}
              >
                <div className={`${variant.textColor} ${size.size} font-medium tracking-tighter uppercase`}>
                  {isShortLogo ? variant.text : "éTAGE7"}
                </div>
              </div>
              
              <div>
                <h3 className="font-light text-lg mb-2">{size.name} ({size.size.replace('text-', '')})</h3>
                <div className="flex flex-wrap gap-2">
                  {formats.map((format, formatIndex) => (
                    <Button 
                      key={formatIndex}
                      variant="outline" 
                      size="sm"
                      className="border-black text-black hover:bg-black hover:text-white transition-colors"
                      onClick={() => handleDownload(size.id, format.id, isShortLogo ? variant.text : "éTAGE7")}
                    >
                      <Download className="mr-1 h-4 w-4" />
                      {format.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4">
      <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tighter uppercase mb-6">Logo Downloads</h1>
      
      <p className="text-gray-600 mb-10">
        Download ETAGE7 logos in different colors and sizes. All logos are available in multiple formats for your convenience.
      </p>

      {/* Standard Logo Sections */}
      {logoVariants.map((variant, variantIndex) => renderLogoSection(variant, variantIndex))}

      {/* Social Media Logo Section */}
      <h2 className="text-3xl font-light tracking-tighter mt-12 mb-10 border-t border-gray-200 pt-10">Social Media Assets</h2>
      <p className="text-gray-600 mb-10">
        Optimized shorter logo versions perfect for social media profiles, avatars, and small-space applications.
      </p>
      
      {socialMediaVariants.map((variant, variantIndex) => renderLogoSection(variant, `social-${variantIndex}`, true))}

      <section className="bg-gray-50 p-6 mt-8 mb-8">
        <h2 className="text-xl font-light tracking-tighter mb-4">Usage Guidelines</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-600">
          <li>Always maintain the logo's proportions when resizing</li>
          <li>Maintain adequate clear space around the logo</li>
          <li>Do not alter the logo colors beyond the provided variants</li>
          <li>Do not add effects, shadows, or outlines to the logo</li>
          <li>Do not place the logo on busy backgrounds that reduce visibility</li>
          <li>Use the short É7 version only for social media and small-space applications</li>
        </ul>
      </section>
    </div>
  );
};

export default PressKitPage;
