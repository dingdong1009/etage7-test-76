
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Edit, Trash2, ToggleRight } from "lucide-react";
import { mockCreditPackages, mockBrandCredits } from "@/mock/marketingCredits";
import type { CreditPackage } from "@/types/mockData";

const MarketingCredits = () => {
  const [packages, setPackages] = useState(mockCreditPackages);
  const [newPackage, setNewPackage] = useState<Partial<CreditPackage>>({
    name: "",
    credits: 0,
    price: 0,
  });

  const handleAddPackage = () => {
    if (newPackage.name && newPackage.credits && newPackage.price) {
      const packageToAdd: CreditPackage = {
        id: Date.now().toString(),
        name: newPackage.name,
        credits: Number(newPackage.credits),
        price: Number(newPackage.price),
        isActive: true,
        createdAt: new Date().toISOString(),
      };
      setPackages([...packages, packageToAdd]);
      setNewPackage({ name: "", credits: 0, price: 0 });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Credit Packages Management */}
        <Card>
          <CardHeader>
            <CardTitle>Credit Packages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <Input
                  placeholder="Package Name"
                  value={newPackage.name}
                  onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
                />
                <Input
                  type="number"
                  placeholder="Credits"
                  value={newPackage.credits}
                  onChange={(e) => setNewPackage({ ...newPackage, credits: Number(e.target.value) })}
                />
                <Input
                  type="number"
                  placeholder="Price ($)"
                  value={newPackage.price}
                  onChange={(e) => setNewPackage({ ...newPackage, price: Number(e.target.value) })}
                />
              </div>
              <Button onClick={handleAddPackage} className="w-full">
                <Plus className="w-4 h-4 mr-2" /> Add Package
              </Button>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Credits</TableHead>
                    <TableHead>Price ($)</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {packages.map((pkg) => (
                    <TableRow key={pkg.id}>
                      <TableCell>{pkg.name}</TableCell>
                      <TableCell>{pkg.credits}</TableCell>
                      <TableCell>${pkg.price}</TableCell>
                      <TableCell className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 p-0 hover:bg-red-100">
                          <Edit className="h-4 w-4" strokeWidth={1.5} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 p-0 hover:bg-red-100">
                          <ToggleRight className="h-4 w-4" strokeWidth={1.5} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 p-0 hover:bg-red-100">
                              <Trash2 className="h-4 w-4 text-red-500" strokeWidth={1.5} />
                            </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Brand Credits Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Brand Credits Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Brand</TableHead>
                  <TableHead>Available Credits</TableHead>
                  <TableHead>Used Credits</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockBrandCredits.map((credit) => (
                  <TableRow key={credit.id}>
                    <TableCell>{credit.brandName}</TableCell>
                    <TableCell>{credit.creditsPurchased - credit.creditsUsed}</TableCell>
                    <TableCell>{credit.creditsUsed}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MarketingCredits;
