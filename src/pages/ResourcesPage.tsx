
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ResourcesPage = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-black text-white py-24 px-4">
        <div className="max-w-[1481px] mx-auto">
          <h1 className="text-3xl md:text-5xl uppercase font-thin mb-6">
            INDUSTRY <br/>
            <span className="font-normal">RESOURCES</span>
          </h1>
          <p className="max-w-2xl text-lg font-light mb-8">
            Valuable insights and tools for fashion brands and buyers.
          </p>
          <Button className="bg-white text-black border-0 hover:bg-gray-100">
            EXPLORE RESOURCES <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16 px-4">
        <div className="max-w-[1481px] mx-auto">
          <h2 className="text-2xl md:text-4xl uppercase font-thin mb-12">
            EXPLORE OUR <span className="font-normal">RESOURCES</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border border-gray-200 hover:shadow-md transition-shadow group">
              <CardHeader>
                <CardTitle>Brand Resources</CardTitle>
                <CardDescription>Access guides, templates, and tutorials designed specifically for fashion brands.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-6 text-gray-600">
                  Our brand resources include marketing materials, product photography guidelines, 
                  sales strategies, and more to help you grow your fashion brand.
                </p>
                <Link to="/brand/resources">
                  <Button className="bg-black text-white hover:bg-gray-800 group-hover:translate-x-1 transition-transform">
                    View Brand Resources <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200 hover:shadow-md transition-shadow group">
              <CardHeader>
                <CardTitle>Buyer Resources</CardTitle>
                <CardDescription>Access guides, templates, and tutorials designed specifically for fashion buyers.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-6 text-gray-600">
                  Our buyer resources include merchandising guides, inventory management tools, 
                  retail trends reports, and more to help you make informed buying decisions.
                </p>
                <Link to="/buyer/resources">
                  <Button className="bg-black text-white hover:bg-gray-800 group-hover:translate-x-1 transition-transform">
                    View Buyer Resources <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-16 text-center">
            <h3 className="text-xl font-medium mb-4">Are you an administrator?</h3>
            <p className="mb-6 max-w-2xl mx-auto text-gray-600">
              Manage all resources for brands and buyers in our dedicated admin panel.
            </p>
            <Link to="/admin/resources">
              <Button variant="outline" className="border-black text-black hover:bg-gray-100">
                Go to Resource Management <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-[1481px] mx-auto text-center">
          <h2 className="text-2xl md:text-4xl uppercase font-thin mb-6">
            STAY <span className="font-normal">INFORMED</span>
          </h2>
          <p className="max-w-2xl mx-auto mb-8 font-light text-gray-600">
            Subscribe to our newsletter for the latest industry resources, market reports, 
            and educational content delivered straight to your inbox.
          </p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="px-4 py-2 border border-gray-300 rounded-none focus:outline-none focus:border-black flex-grow"
            />
            <Button className="bg-black text-white hover:bg-gray-800 whitespace-nowrap">
              SUBSCRIBE
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResourcesPage;
