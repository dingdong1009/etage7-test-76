
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import StatusBadge from "../StatusBadge";
import BackButton from "../BackButton";
import { SalesManager, UserType } from "@/types/users";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface SalesManagerViewProps {
  salesManager: SalesManager;
  onBack: () => void;
  onEdit: (userType: UserType, userId: number) => void;
}

const SalesManagerView = ({ salesManager, onBack, onEdit }: SalesManagerViewProps) => {
  return (
    <Card className="border border-gray-200">
      <CardHeader className="flex items-center justify-between pb-2">
        <div className="flex items-center space-x-4">
          <BackButton onClick={onBack} />
          <CardTitle className="text-1xl md:text-2xl uppercase font-thin">
            {salesManager.name}
          </CardTitle>
        </div>
        <Button 
          className="text-xs text-black px-3 py-1.5 bg-gray-100 rounded hover:text-white"
          onClick={() => onEdit("salesManager", salesManager.id)}
        >
          <Edit className="h-4 w-4 mr-1" /> Edit
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p>{salesManager.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <StatusBadge status={salesManager.status} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p>{salesManager.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p>{salesManager.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Start Date</p>
                <p>{salesManager.startDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Years in Company</p>
                <p>{salesManager.yearsInCompany}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Financial Information</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Monthly Salary</p>
                <p>{salesManager.salaryPerMonth}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Current Commission Rate</p>
                <p>{salesManager.commissionRate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Commissions</p>
                <p>{salesManager.totalCommissions}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">YTD Commissions</p>
                <p>{salesManager.ytdCommissions}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
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
              {salesManager.commissionHistory.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.rate}</TableCell>
                  <TableCell>{item.effectiveDate}</TableCell>
                  <TableCell>{item.notes || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesManagerView;
