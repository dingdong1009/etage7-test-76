
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import StatusBadge from "../StatusBadge";
import BackButton from "../BackButton";
import { Brand, UserType } from "@/types/users";

interface BrandViewProps {
  brand: Brand;
  onBack: () => void;
  onEdit: (userType: UserType, userId: number) => void;
}

const BrandView = ({ brand, onBack, onEdit }: BrandViewProps) => {
  return (
    <Card className="border border-gray-200">
      <CardHeader className="flex items-center justify-between pb-2">
        <div className="flex items-center space-x-4">
          <BackButton onClick={onBack} />
          <CardTitle className="text-1xl md:text-2xl uppercase font-thin">
            {brand.name}
          </CardTitle>
        </div>
        <Button 
          className="text-xs text-black px-3 py-1.5 bg-gray-100 rounded hover:text-white"
          onClick={() => onEdit("brand", brand.id)}
        >
          <Edit className="h-4 w-4 mr-1" /> Edit
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Company Information</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Company Name</p>
                <p>{brand.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <StatusBadge status={brand.status} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Plan</p>
                <p>{brand.plan}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Market Segment</p>
                <p>{brand.marketSegment}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Since</p>
                <p>{brand.activeSince}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Description</p>
                <p>{brand.description}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Contact Person</p>
                <p>{brand.contactPerson}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p>{brand.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p>{brand.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Website</p>
                <p>{brand.website}</p>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold mt-8 mb-4">Performance</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Products Count</p>
                <p>{brand.productsCount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Average Order Value</p>
                <p>{brand.avgOrderValue}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Sales</p>
                <p>{brand.totalSales}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Activity</p>
                <p>{brand.lastActivity}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BrandView;
