import { Brand, Buyer, SalesManager } from "@/types/users";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Edit2, Lock } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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

  const editableFields = [
    "name", 
    "status", 
    "email", 
    "phone", 
    "seniorityLevel", 
    "region", 
    "description", 
    "commissionRate", 
    "monthlyTarget",
    "managedAccounts"
  ];

  const renderField = (label: string, value: any, isEditable: boolean = false) => (
    <div>
      <div className="flex items-center gap-1">
        <p className="text-sm text-gray-500">{label}</p>
        {isEditable && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span><Edit2 className="h-3 w-3 text-gray-400" /></span>
              </TooltipTrigger>
              <TooltipContent>
                <p>This field is editable</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        {!isEditable && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span><Lock className="h-3 w-3 text-gray-400" /></span>
              </TooltipTrigger>
              <TooltipContent>
                <p>This field is not editable</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <p>{value}</p>
    </div>
  );

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
          className="text-xs text-black px-3 py-1.5 bg-gray-100 rounded hover:text-white hover:bg-black transition-colors"
          onClick={() => handleEditUser(activeTab, user.id)}
        >
          <Edit2 className="mr-1 h-4 w-4" /> Edit
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {isSalesManager(user) ? "Manager Information" : "Company Information"}
            </h3>
            <div className="space-y-6">
              {isSalesManager(user) ? (
                renderField("Name", user.name, editableFields.includes("name"))
              ) : (
                renderField("Company Name", user.name, editableFields.includes("name"))
              )}
              
              {renderField("Status", (
                <Badge 
                  className={`${
                    user.status === "active" ? "bg-green-100 text-green-800" :
                    user.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                    "bg-gray-100 text-gray-800"
                  }`}
                >
                  {user.status}
                </Badge>
              ), editableFields.includes("status"))}
              
              {(isBrand(user) || isBuyer(user)) && renderField("Plan", user.plan)}
              
              {isSalesManager(user) && renderField("Start Date", user.startDate)}
              
              {isSalesManager(user) && renderField("Years in Company", user.yearsInCompany)}
              
              {isSalesManager(user) && user.seniorityLevel && renderField("Seniority Level", user.seniorityLevel, editableFields.includes("seniorityLevel"))}
              
              {(isBrand(user) || isBuyer(user)) && renderField("Market Segment", user.marketSegment)}
              
              {(isBrand(user) || isBuyer(user)) && renderField("Website", user.website)}
              
              {isSalesManager(user) && user.region && renderField("Region", user.region, editableFields.includes("region"))}
              
              {(isBrand(user) || isBuyer(user)) && renderField("Active Since", user.activeSince)}
              
              {isSalesManager(user) && renderField("Active Since", user.activeSince || '')}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="space-y-6">
              {(isBrand(user) || isBuyer(user)) && renderField("Contact Person", user.contactPerson)}
              
              {renderField("Email", user.email, editableFields.includes("email"))}
              
              {renderField("Phone", user.phone, editableFields.includes("phone"))}
              
              {user.lastActivity && renderField("Last Activity", user.lastActivity)}
            </div>
          </div>
        </div>
        
        {user.description && (
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-1">
              Description
              {isSalesManager(user) && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span><Edit2 className="h-3 w-3 text-gray-400" /></span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>This field is editable</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </h3>
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
                <div className="bg-gray-50 p-4 rounded-lg relative">
                  <div className="flex items-center gap-1">
                    <p className="text-sm text-gray-500">Current Commission Rate</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span><Edit2 className="h-3 w-3 text-gray-400" /></span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>This field is editable</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
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
                    <div className="flex items-center gap-1">
                      <p className="text-sm text-gray-500">Managed Accounts</p>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span><Edit2 className="h-3 w-3 text-gray-400" /></span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>This field is editable</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <p className="text-2xl font-semibold">{user.managedAccounts}</p>
                  </div>
                )}
                {user.monthlyTarget && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-1">
                      <p className="text-sm text-gray-500">Monthly Target</p>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span><Edit2 className="h-3 w-3 text-gray-400" /></span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>This field is editable</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
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
