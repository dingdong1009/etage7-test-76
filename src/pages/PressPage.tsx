
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, ArrowRight } from 'lucide-react';

const PressPage = () => {
  const pressReleases = [
    {
      title: 'ETAGE7 Secures €5 Million in Series A Funding',
      date: 'March 15, 2024',
      excerpt: 'Fashion technology platform ETAGE7 announces completion of Series A funding round led by Venture Partners.'
    },
    {
      title: 'ETAGE7 Expands to 10 New European Markets',
      date: 'January 22, 2024',
      excerpt: 'Following strong growth in core markets, ETAGE7 announces expansion into ten additional European countries.'
    },
    {
      title: 'ETAGE7 Partners with Leading Fashion Week Organizers',
      date: 'November 5, 2023',
      excerpt: 'Strategic partnership aims to bring emerging designers to the forefront of fashion week events globally.'
    },
    {
      title: 'ETAGE7 Launches Innovative Buyer-Brand Matching Algorithm',
      date: 'September 12, 2023',
      excerpt: 'New AI-powered technology promises to revolutionize how fashion buyers discover brand collections.'
    }
  ];

  const mediaFeatures = [
    {
      publication: 'Fashion Business Weekly',
      title: 'How ETAGE7 is Disrupting Traditional Fashion Wholesale',
      date: 'February 2024'
    },
    {
      publication: 'Tech Innovators',
      title: 'Fashion Meets Technology: The ETAGE7 Success Story',
      date: 'December 2023'
    },
    {
      publication: 'Retail Futures',
      title: 'Digital Platforms Revolutionizing Fashion Distribution',
      date: 'October 2023'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-light tracking-tighter mt-12 mb-10">Press</h1>
      
      <div className="space-y-12">
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-light tracking-tighter mb-4">Media Resources</h2>
              <p className="text-gray-600 mb-6">
                Welcome to the ETAGE7 press room. Find the latest news, press releases, media resources, and contact information for press inquiries.
              </p>
              <div className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto flex items-center justify-center border-black text-black hover:bg-black hover:text-white transition-colors"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Press Kit
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto flex items-center justify-center border-black text-black hover:bg-black hover:text-white transition-colors"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Brand Assets
                </Button>
              </div>
            </div>
            <div className="bg-gray-100 h-60 flex items-center justify-center">
              <span className="text-gray-400">Press Image</span>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-light tracking-tighter mb-6">Press Releases</h2>
          <div className="space-y-6">
            {pressReleases.map((release, index) => (
              <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                <div className="text-sm text-gray-500 mb-1">{release.date}</div>
                <h3 className="text-xl font-light mb-2">{release.title}</h3>
                <p className="text-gray-600 mb-3">{release.excerpt}</p>
                <a 
                  href="#" 
                  className="inline-flex items-center text-black hover:underline"
                >
                  Read More <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-light tracking-tighter mb-6">Media Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mediaFeatures.map((feature, index) => (
              <div key={index} className="border border-gray-200 p-6">
                <div className="text-accent-mint mb-2">{feature.publication}</div>
                <h3 className="text-lg font-light mb-2">{feature.title}</h3>
                <div className="text-sm text-gray-500">{feature.date}</div>
                <a 
                  href="#" 
                  className="inline-flex items-center text-black mt-4 hover:underline"
                >
                  Read Article <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gray-50 p-8">
          <h2 className="text-2xl font-light tracking-tighter mb-4">Press Contact</h2>
          <p className="text-gray-600 mb-2">
            For press inquiries, please contact:
          </p>
          <div className="mb-6">
            <p className="font-medium">Media Relations</p>
            <p className="text-gray-600">press@etage7.com</p>
            <p className="text-gray-600">+33 (0) 1 XX XX XX XX</p>
          </div>
          <Button className="bg-black text-white hover:bg-gray-800">
            Contact Press Team
          </Button>
        </section>
      </div>
    </div>
  );
};

export default PressPage;
