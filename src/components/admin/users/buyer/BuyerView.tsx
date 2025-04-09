
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import StatusBadge from "../StatusBadge";
import BackButton from "../BackButton";
import { Buyer, UserType } from "@/types/users";

interface BuyerViewProps {
  buyer: Buyer;
  onBack: () => void;
  onEdit: (userType: UserType, userId: number) => void;
}

const BuyerView = ({ buyer, onBack, onEdit }: BuyerViewProps) => {
  return (
    <Card className="border border-gray-200">
      <CardHeader className="flex items-center justify-between pb-2">
        <div className="flex items-center space-x-4">
          <BackButton onClick={onBack} />
          <CardTitle className="text-1xl md:text-2xl uppercase font-thin">
            {buyer.name}
          </CardTitle>
        </div>
        <Button 
          className="text-xs text-black px-3 py-1.5 bg-gray-100 rounded hover:text-white"
          onClick={() => onEdit("buyer", buyer.id)}
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
                <p>{buyer.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <StatusBadge status={buyer.status} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Plan</p>
                <p>{buyer.plan}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Market Segment</p>
                <p>{buyer.marketSegment}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Since</p>
                <p>{buyer.activeSince}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Description</p>
                <p>{buyer.description}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Contact Person</p>
                <p>{buyer.contactPerson}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p>{buyer.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p>{buyer.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Website</p>
                <p>{buyer.website}</p>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold mt-8 mb-4">Performance</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Store Count</p>
                <p>{buyer.storeCount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Average Order Value</p>
                <p>{buyer.avgOrderValue}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Annual Purchases</p>
                <p>{buyer.annualPurchases}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Activity</p>
                <p>{buyer.lastActivity}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BuyerView;
