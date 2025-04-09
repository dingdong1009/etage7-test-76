
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Check, FileText, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const BrandSubscriptions = () => {
  // Sample transactions
  const transactions = [
    { id: "INV-001", date: "2023-04-01", amount: "$49.99", status: "paid" },
    { id: "INV-002", date: "2023-03-01", amount: "$49.99", status: "paid" },
    { id: "INV-003", date: "2023-02-01", amount: "$49.99", status: "paid" },
    { id: "INV-004", date: "2023-01-01", amount: "$39.99", status: "paid" }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-4xl md:text-6xl uppercase font-thin mb-6">Subscriptions</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border border-gray-200 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Current Plan</CardTitle>
            <CardDescription>Your subscription details and billing information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg bg-black-50 border-blue-100">
              <div>
                <Badge className="mb-2 bg-black-500">Professional</Badge>
                <h3 className="text-xl font-bold">$49.99<span className="text-sm font-normal text-gray-500">/month</span></h3>
                <p className="text-sm text-gray-600 mt-1">Billed monthly</p>
              </div>
              <div className="mt-4 sm:mt-0">
                <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-black-50">
                  Change Plan
                </button>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Plan Features</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Up to 50 products</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Advanced analytics</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Custom domain</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Team accounts (up to 5)</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Priority support</span>
                </li>
              </ul>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-medium mb-3">Payment Information</h3>
              <div className="flex items-center justify-between p-3 border rounded-md">
                <div className="flex items-center">
                  <div className="h-8 w-12 bg-gray-100 rounded flex items-center justify-center mr-3 text-xs font-medium">
                    VISA
                  </div>
                  <div>
                    <p className="text-sm">Visa ending in 4242</p>
                    <p className="text-xs text-gray-500">Expires 12/2024</p>
                  </div>
                </div>
                <button className="text-sm text-blue-500 hover:underline">Edit</button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Available Plans</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-md p-3 hover:border-blue-500 transition-colors cursor-pointer hover:shadow-sm">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">Basic</h3>
                  <Badge className="bg-gray-500">$19.99/mo</Badge>
                </div>
                <p className="text-xs text-gray-500 mt-1">For small brands just getting started</p>
              </div>
              
              <div className="border rounded-md p-3 bg-black-50 border-blue-500 transition-colors cursor-pointer shadow-sm">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">Professional</h3>
                  <Badge className="bg-black-500">$49.99/mo</Badge>
                </div>
                <p className="text-xs text-gray-500 mt-1">For growing brands with multiple products</p>
                <div className="mt-1">
                  <Badge className="bg-green-100 text-green-800 text-xs">Current Plan</Badge>
                </div>
              </div>
              
              <div className="border rounded-md p-3 hover:border-blue-500 transition-colors cursor-pointer hover:shadow-sm">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">Enterprise</h3>
                  <Badge className="bg-purple-500">$99.99/mo</Badge>
                </div>
                <p className="text-xs text-gray-500 mt-1">For established brands with high volume</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Premium Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="border rounded-md p-3 hover:border-blue-500 transition-colors cursor-pointer hover:shadow-sm">
                <h3 className="font-medium">Custom Design</h3>
                <p className="text-xs text-gray-500 mt-1">From $499</p>
              </div>
              
              <div className="border rounded-md p-3 hover:border-blue-500 transition-colors cursor-pointer hover:shadow-sm">
                <h3 className="font-medium">Marketing Campaign</h3>
                <p className="text-xs text-gray-500 mt-1">From $299/month</p>
              </div>
              
              <div className="border rounded-md p-3 hover:border-blue-500 transition-colors cursor-pointer hover:shadow-sm">
                <h3 className="font-medium">SEO Optimization</h3>
                <p className="text-xs text-gray-500 mt-1">From $199/month</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Card className="border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Billing History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-gray-200">
                  <th className="pb-2">Invoice</th>
                  <th className="pb-2">Date</th>
                  <th className="pb-2">Amount</th>
                  <th className="pb-2">Status</th>
                  <th className="pb-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-100">
                    <td className="py-3">{transaction.id}</td>
                    <td className="py-3">{transaction.date}</td>
                    <td className="py-3">{transaction.amount}</td>
                    <td className="py-3">
                      <Badge 
                        className={`${
                          transaction.status === "paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {transaction.status}
                      </Badge>
                    </td>
                    <td className="py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="text-xs px-2 py-1 bg-gray-100 rounded flex items-center gap-1">
                          <FileText size={12} />
                          View
                        </button>
                        <button className="text-xs px-2 py-1 bg-gray-100 rounded flex items-center gap-1">
                          <Download size={12} />
                          PDF
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BrandSubscriptions;
