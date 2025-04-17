
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Mail, Check, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Mock data for credit packages
const creditPackages = [
  {
    id: 1,
    name: "Starter",
    credits: 50,
    price: "$25",
    pricePerCredit: "$0.50",
    popular: false,
  },
  {
    id: 2,
    name: "Professional",
    credits: 200,
    price: "$80",
    pricePerCredit: "$0.40",
    popular: true,
  },
  {
    id: 3,
    name: "Business",
    credits: 500,
    price: "$175",
    pricePerCredit: "$0.35",
    popular: false,
  },
  {
    id: 4,
    name: "Enterprise",
    credits: 1000,
    price: "$300",
    pricePerCredit: "$0.30",
    popular: false,
  }
];

// Mock data for transaction history
const transactionHistory = [
  {
    id: 1,
    type: "Purchase",
    details: "200 Credits - Professional Package",
    date: "2023-04-10",
    amount: "+200",
    status: "completed"
  },
  {
    id: 2,
    type: "Usage",
    details: "Spring Collection Launch Campaign",
    date: "2023-04-12",
    amount: "-45",
    status: "completed"
  },
  {
    id: 3,
    type: "Usage",
    details: "VIP Early Access Campaign",
    date: "2023-04-15",
    amount: "-20",
    status: "completed"
  },
  {
    id: 4,
    type: "Free",
    details: "Welcome Bonus",
    date: "2023-03-01",
    amount: "+1",
    status: "completed"
  }
];

const CreditSystem = () => {
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>("credit_card");
  
  // Credit balance - would come from user data in real app
  const creditBalance = 136;

  const handlePurchase = (packageId: number) => {
    setSelectedPackage(packageId);
    setShowPurchaseDialog(true);
  };

  const handleConfirmPurchase = () => {
    // In a real app, this would process the payment and add credits
    setShowPurchaseDialog(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-light">Email Credits</h2>
      </div>
      
      {/* Credit Balance */}
      <Card className="border border-gray-100 rounded-none shadow-none">
        <CardContent className="pt-6 pb-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-gray-50 p-4 rounded-full">
                <Mail className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-2xl font-light">{creditBalance}</h3>
                <p className="text-sm text-gray-500">Available Credits</p>
              </div>
            </div>
            <Button 
              className="rounded-none text-xs font-light bg-black text-white hover:bg-gray-800"
              onClick={() => setShowPurchaseDialog(true)}
            >
              <CreditCard className="mr-2 h-4 w-4" strokeWidth={1} />
              Purchase Credits
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Credit Packages */}
      <div>
        <h3 className="text-xl font-light mb-4">Credit Packages</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {creditPackages.map((pkg) => (
            <Card 
              key={pkg.id} 
              className={`border rounded-none shadow-none ${
                pkg.popular ? 'border-black ring-1 ring-black' : 'border-gray-100'
              }`}
            >
              {pkg.popular && (
                <div className="bg-black text-white text-xs text-center py-1 uppercase font-light">
                  Most Popular
                </div>
              )}
              <CardContent className={`pt-6 pb-6 ${!pkg.popular ? 'pt-7' : ''}`}>
                <h4 className="text-xl font-light mb-1">{pkg.name}</h4>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-2xl font-light">{pkg.price}</span>
                  <span className="text-sm text-gray-500">({pkg.pricePerCredit} per credit)</span>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-black" strokeWidth={1.5} />
                    <span className="text-sm">{pkg.credits} email credits</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-black" strokeWidth={1.5} />
                    <span className="text-sm">No expiration</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-black" strokeWidth={1.5} />
                    <span className="text-sm">Full analytics</span>
                  </div>
                </div>
                
                <Button 
                  className={`w-full rounded-none text-xs font-light ${
                    pkg.popular 
                      ? 'bg-black text-white hover:bg-gray-800' 
                      : 'bg-white text-black border border-black hover:bg-gray-100'
                  }`}
                  onClick={() => handlePurchase(pkg.id)}
                >
                  Purchase
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Transaction History */}
      <div>
        <h3 className="text-xl font-light mb-4">Transaction History</h3>
        <Card className="border border-gray-100 rounded-none shadow-none">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-light">Type</TableHead>
                  <TableHead className="font-light">Details</TableHead>
                  <TableHead className="font-light">Date</TableHead>
                  <TableHead className="font-light text-right">Amount</TableHead>
                  <TableHead className="font-light text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactionHistory.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.type}</TableCell>
                    <TableCell>{transaction.details}</TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell className="text-right">
                      <span className={transaction.amount.startsWith('+') ? 'text-green-600' : ''}>
                        {transaction.amount} credits
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge 
                        className={`
                          rounded-sm text-xs 
                          ${transaction.status === 'completed' ? 'bg-accent-mint text-gray-800' : ''}
                          ${transaction.status === 'pending' ? 'bg-gray-200 text-gray-800' : ''}
                          ${transaction.status === 'failed' ? 'bg-red-100 text-red-800' : ''}
                        `}
                      >
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
      {/* Purchase Dialog */}
      <Dialog open={showPurchaseDialog} onOpenChange={setShowPurchaseDialog}>
        <DialogContent className="sm:max-w-[500px] rounded-none">
          <DialogHeader>
            <DialogTitle className="text-xl font-light">Purchase Email Credits</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-sm font-light">Select Package</Label>
              <RadioGroup value={selectedPackage?.toString() || ""} onValueChange={(value) => setSelectedPackage(parseInt(value))}>
                <div className="grid gap-2">
                  {creditPackages.map((pkg) => (
                    <div key={pkg.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={pkg.id.toString()} id={`package-${pkg.id}`} />
                      <Label htmlFor={`package-${pkg.id}`} className="flex-1">
                        <div className="flex justify-between items-center">
                          <span>{pkg.name} ({pkg.credits} credits)</span>
                          <span>{pkg.price}</span>
                        </div>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-light">Payment Method</Label>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="grid gap-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="credit_card" id="payment-cc" />
                    <Label htmlFor="payment-cc">Credit Card</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="paypal" id="payment-paypal" />
                    <Label htmlFor="payment-paypal">PayPal</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
            
            {paymentMethod === "credit_card" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="card-name" className="text-sm font-light">Name on Card</Label>
                    <Input id="card-name" className="rounded-none" placeholder="John Smith" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="card-number" className="text-sm font-light">Card Number</Label>
                    <Input id="card-number" className="rounded-none" placeholder="1234 5678 9012 3456" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2 col-span-1">
                    <Label htmlFor="expiry" className="text-sm font-light">Expiry</Label>
                    <Input id="expiry" className="rounded-none" placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2 col-span-1">
                    <Label htmlFor="cvc" className="text-sm font-light">CVC</Label>
                    <Input id="cvc" className="rounded-none" placeholder="123" />
                  </div>
                  <div className="space-y-2 col-span-1">
                    <Label htmlFor="zip" className="text-sm font-light">ZIP/Postal</Label>
                    <Input id="zip" className="rounded-none" placeholder="12345" />
                  </div>
                </div>
              </div>
            )}
            
            <div className="bg-gray-50 p-3 rounded-sm flex items-start gap-3 mt-4">
              <AlertCircle className="h-5 w-5 text-gray-600 mt-0.5" strokeWidth={1.5} />
              <p className="text-sm text-gray-600">
                Your email credits will be added to your account immediately after successful payment and never expire.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowPurchaseDialog(false)}
              className="rounded-none text-xs font-light"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleConfirmPurchase}
              className="rounded-none text-xs font-light bg-black text-white hover:bg-gray-800"
            >
              Complete Purchase
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreditSystem;
