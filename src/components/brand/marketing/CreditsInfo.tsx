
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { CreditCard, Download, HelpCircle, Info, RefreshCw } from "lucide-react";

// Mock credit transactions
const creditTransactions = [
  { id: 1, date: "2025-03-15", type: "purchase", amount: 10, cost: "€45.00", balance: 10, description: "Credit package purchase" },
  { id: 2, date: "2025-03-16", type: "usage", amount: -1, cost: "-", balance: 9, description: "Spring Collection campaign" },
  { id: 3, date: "2025-03-20", type: "purchase", amount: 5, cost: "€25.00", balance: 14, description: "Credit package purchase" },
  { id: 4, date: "2025-03-21", type: "usage", amount: -1, cost: "-", balance: 13, description: "Fashion Week follow-up campaign" },
  { id: 5, date: "2025-03-25", type: "usage", amount: -1, cost: "-", balance: 12, description: "New product announcement" },
  { id: 6, date: "2025-03-30", type: "complimentary", amount: 1, cost: "-", balance: 13, description: "Monthly free credit" },
];

const CreditsInfo = () => {
  const [creditBalance, setCreditBalance] = useState(13);
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false);
  
  const handlePurchaseCredits = () => {
    // Mock buying credits
    toast({
      title: "Credits Purchased",
      description: "Your account has been credited with 10 email credits.",
    });
    setCreditBalance(prev => prev + 10);
    setShowPurchaseDialog(false);
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-gray-100 shadow-none rounded-none">
          <CardHeader className="p-4 pb-0">
            <CardDescription className="text-xs uppercase font-light">Available Credits</CardDescription>
            <CardTitle className="text-4xl font-light">{creditBalance}</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <p className="text-sm text-gray-500">
              Use your credits for email campaigns, automated follow-ups, and bulk communications.
            </p>
          </CardContent>
          <CardFooter className="px-4 py-3 border-t border-gray-50">
            <Button 
              className="w-full bg-black text-white hover:bg-gray-800 text-xs rounded-none font-light"
              onClick={() => setShowPurchaseDialog(true)}
            >
              <CreditCard className="w-3 h-3 mr-1" strokeWidth={1.5} />
              Purchase Credits
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="border-gray-100 shadow-none rounded-none">
          <CardHeader className="p-4 pb-0">
            <CardDescription className="text-xs uppercase font-light">Monthly Free Credits</CardDescription>
            <CardTitle className="text-4xl font-light">1</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <p className="text-sm text-gray-500">
              You receive 1 free credit per month with your current subscription plan.
            </p>
          </CardContent>
          <CardFooter className="px-4 py-3 border-t border-gray-50">
            <div className="text-xs text-gray-500 flex items-center">
              <RefreshCw className="w-3 h-3 mr-1" strokeWidth={1.5} />
              Next free credit on April 1, 2025
            </div>
          </CardFooter>
        </Card>
        
        <Card className="border-gray-100 shadow-none rounded-none lg:col-span-1">
          <CardHeader className="p-4 pb-0">
            <CardDescription className="text-xs uppercase font-light">Credit Usage</CardDescription>
            <CardTitle className="text-4xl font-light">8</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <p className="text-sm text-gray-500">
              Total credits used in the last 30 days.
            </p>
          </CardContent>
          <CardFooter className="px-4 py-3 border-t border-gray-50">
            <Button 
              variant="outline" 
              className="w-full text-xs rounded-none font-light"
            >
              <Download className="w-3 h-3 mr-1" strokeWidth={1.5} />
              Download Usage Report
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <Card className="border-gray-100 shadow-none rounded-none">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-lg font-light">Credit Transaction History</CardTitle>
          <CardDescription className="text-sm">View your past credit purchases and usage</CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-light">Date</TableHead>
                <TableHead className="font-light">Description</TableHead>
                <TableHead className="font-light">Type</TableHead>
                <TableHead className="font-light text-right">Credits</TableHead>
                <TableHead className="font-light text-right">Cost</TableHead>
                <TableHead className="font-light text-right">Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {creditTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>
                    <Badge 
                      className={`
                        rounded-sm text-xs font-light
                        ${transaction.type === 'purchase' ? 'bg-gray-100 text-gray-700' : ''}
                        ${transaction.type === 'usage' ? 'bg-gray-100 text-gray-600' : ''}
                        ${transaction.type === 'complimentary' ? 'bg-gray-100 text-gray-700' : ''}
                      `}
                    >
                      {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className={`text-right ${transaction.amount > 0 ? 'text-gray-700' : 'text-gray-500'}`}>
                    {transaction.amount > 0 ? `+${transaction.amount}` : transaction.amount}
                  </TableCell>
                  <TableCell className="text-right">{transaction.cost}</TableCell>
                  <TableCell className="text-right font-medium">{transaction.balance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card className="border-gray-100 shadow-none rounded-none bg-gray-50">
        <CardHeader className="p-4 pb-2">
          <div className="flex items-center space-x-2">
            <Info className="h-4 w-4 text-gray-500" strokeWidth={1.5} />
            <CardTitle className="text-base font-light">About Email Credits</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-4 text-sm text-gray-600">
            <p>
              Email credits are used for sending mass communications to buyers. Each credit allows you to send one email campaign to your selected audience.
            </p>
            <div className="space-y-2">
              <h4 className="font-medium text-black">How credits work:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>One credit is used per email campaign, regardless of the number of recipients</li>
                <li>Follow-up emails to individual buyers do not require credits</li>
                <li>You receive one free credit per month with your subscription</li>
                <li>Credits never expire and can be used at any time</li>
                <li>Additional credits can be purchased as needed</li>
              </ul>
            </div>
            <p>
              For personalized communications with individual buyers, use the Follow-ups feature which doesn't require credits.
            </p>
          </div>
        </CardContent>
      </Card>
      
      {/* Purchase Credits Dialog */}
      <Dialog open={showPurchaseDialog} onOpenChange={setShowPurchaseDialog}>
        <DialogContent className="sm:max-w-[400px] rounded-none">
          <DialogHeader>
            <DialogTitle className="text-lg font-light">Purchase Email Credits</DialogTitle>
            <DialogDescription>
              Select a credit package to enhance your marketing efforts.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-2">
                <Card className="border-gray-200 shadow-none rounded-none p-4 text-center cursor-pointer hover:border-black transition-colors">
                  <p className="text-lg font-light">5</p>
                  <p className="text-xs text-gray-500">credits</p>
                  <p className="text-sm font-medium mt-2">€25</p>
                </Card>
                <Card className="border-gray-200 shadow-none rounded-none p-4 text-center cursor-pointer hover:border-black transition-colors border-black">
                  <p className="text-lg font-light">10</p>
                  <p className="text-xs text-gray-500">credits</p>
                  <p className="text-sm font-medium mt-2">€45</p>
                  <Badge className="mt-1 text-[10px] bg-gray-100 text-gray-700 font-light">BEST VALUE</Badge>
                </Card>
                <Card className="border-gray-200 shadow-none rounded-none p-4 text-center cursor-pointer hover:border-black transition-colors">
                  <p className="text-lg font-light">20</p>
                  <p className="text-xs text-gray-500">credits</p>
                  <p className="text-sm font-medium mt-2">€80</p>
                </Card>
              </div>
              
              <div className="space-y-2">
                <Label className="text-xs font-light">Payment Method</Label>
                <Select defaultValue="card">
                  <SelectTrigger className="rounded-none border-gray-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
                    <SelectItem value="card">Credit Card (Ending in 4242)</SelectItem>
                    <SelectItem value="new-card">Add New Card</SelectItem>
                    <SelectItem value="invoice">Request Invoice</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs rounded-none font-light"
              onClick={() => setShowPurchaseDialog(false)}
            >
              Cancel
            </Button>
            <Button 
              size="sm" 
              className="bg-black text-white hover:bg-gray-800 text-xs rounded-none font-light"
              onClick={handlePurchaseCredits}
            >
              <CreditCard className="w-3 h-3 mr-1" strokeWidth={1.5} />
              Complete Purchase
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreditsInfo;
