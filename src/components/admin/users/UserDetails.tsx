
import { Brand, Buyer, SalesManager } from "@/types/users";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface UserDetailsProps {
  user: Brand | Buyer | SalesManager;
  activeTab: string;
  handleGoBack: () => void;
  handleEditUser: (userType: string, userId: number) => void;
}

const UserDetails = ({ user, activeTab, handleGoBack, handleEditUser }: UserDetailsProps) => {
  const isBrand = (user: any): user is Brand => {
    return 'productsCount' in user && 'totalSales' in user;
  };

  const isBuyer = (user: any): user is Buyer => {
    return 'storeCount' in user && 'annualPurchases' in user;
  };

  const isSalesManager = (user: any): user is SalesManager => {
    return 'commissionRate' in user && 'ytdCommissions' in user;
  };

  return (
    <Card className="border border-gray-200">
      <CardHeader className="flex items-center justify-between pb-2">
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleGoBack}
            className="bg-gray-100 hover:bg-gray-200"
          >
            <ChevronLeft className="mr-1 h-4 w-4" /> Back
          </Button>
          <CardTitle className="text-1xl md:text-2xl uppercase font-thin">
            {user.name}
          </CardTitle>
        </div>
        <Button 
          className="text-xs text-black px-3 py-1.5 bg-gray-100 rounded hover:text-white"
          onClick={() => handleEditUser(activeTab, user.id)}
        >
          Edit
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {isSalesManager(user) ? "Manager Information" : "Company Information"}
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">
                  {isSalesManager(user) ? "Name" : "Company Name"}
                </p>
                <p>{user.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <Badge 
                  className={`${
                    user.status === "active" ? "bg-green-100 text-green-800" :
                    user.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                    "bg-gray-100 text-gray-800"
                  }`}
                >
                  {user.status}
                </Badge>
              </div>
              {(isBrand(user) || isBuyer(user)) && (
                <div>
                  <p className="text-sm text-gray-500">Plan</p>
                  <p>{user.plan}</p>
                </div>
              )}
              {isSalesManager(user) && (
                <div>
                  <p className="text-sm text-gray-500">Start Date</p>
                  <p>{user.startDate}</p>
                </div>
              )}
              {isSalesManager(user) && (
                <div>
                  <p className="text-sm text-gray-500">Years in Company</p>
                  <p>{user.yearsInCompany}</p>
                </div>
              )}
              {isSalesManager(user) && user.seniorityLevel && (
                <div>
                  <p className="text-sm text-gray-500">Seniority Level</p>
                  <p>{user.seniorityLevel}</p>
                </div>
              )}
              {(isBrand(user) || isBuyer(user)) && (
                <div>
                  <p className="text-sm text-gray-500">Market Segment</p>
                  <p>{user.marketSegment}</p>
                </div>
              )}
              {(isBrand(user) || isBuyer(user)) && (
                <div>
                  <p className="text-sm text-gray-500">Website</p>
                  <p>{user.website}</p>
                </div>
              )}
              {isSalesManager(user) && user.region && (
                <div>
                  <p className="text-sm text-gray-500">Region</p>
                  <p>{user.region}</p>
                </div>
              )}
              {(isBrand(user) || isBuyer(user)) && (
                <div>
                  <p className="text-sm text-gray-500">Active Since</p>
                  <p>{user.activeSince}</p>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="space-y-4">
              {(isBrand(user) || isBuyer(user)) && (
                <div>
                  <p className="text-sm text-gray-500">Contact Person</p>
                  <p>{user.contactPerson}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p>{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p>{user.phone}</p>
              </div>
              {user.lastActivity && (
                <div>
                  <p className="text-sm text-gray-500">Last Activity</p>
                  <p>{user.lastActivity}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {user.description && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Description</h3>
            <p className="text-gray-700 mb-8">{user.description}</p>
          </div>
        )}
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {isBrand(user) && (
              <>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Products Count</p>
                  <p className="text-2xl font-semibold">{user.productsCount}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Average Order Value</p>
                  <p className="text-2xl font-semibold">{user.avgOrderValue}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Total Sales</p>
                  <p className="text-2xl font-semibold">{user.totalSales}</p>
                </div>
              </>
            )}
            
            {isBuyer(user) && (
              <>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Store Count</p>
                  <p className="text-2xl font-semibold">{user.storeCount}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Average Order Value</p>
                  <p className="text-2xl font-semibold">{user.avgOrderValue}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Annual Purchases</p>
                  <p className="text-2xl font-semibold">{user.annualPurchases}</p>
                </div>
              </>
            )}
            
            {isSalesManager(user) && (
              <>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Salary per Month</p>
                  <p className="text-2xl font-semibold">{user.salaryPerMonth}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Current Commission Rate</p>
                  <p className="text-2xl font-semibold">{user.commissionRate}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Total Commissions</p>
                  <p className="text-2xl font-semibold">{user.totalCommissions}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">YTD Commissions</p>
                  <p className="text-2xl font-semibold">{user.ytdCommissions}</p>
                </div>
                {user.managedAccounts && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Managed Accounts</p>
                    <p className="text-2xl font-semibold">{user.managedAccounts}</p>
                  </div>
                )}
                {user.monthlyTarget && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Monthly Target</p>
                    <p className="text-2xl font-semibold">{user.monthlyTarget}</p>
                  </div>
                )}
                {user.quarterlyPerformance && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Quarterly Performance</p>
                    <p className="text-2xl font-semibold">{user.quarterlyPerformance}</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {isSalesManager(user) && user.commissionHistory && user.commissionHistory.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Commission History</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rate</TableHead>
                  <TableHead>Effective Date</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {user.commissionHistory.map((change) => (
                  <TableRow key={change.id}>
                    <TableCell>{change.rate}</TableCell>
                    <TableCell>{change.effectiveDate}</TableCell>
                    <TableCell>{change.notes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserDetails;
