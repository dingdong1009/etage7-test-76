
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Edit, Trash2, ToggleRight, ToggleLeft } from "lucide-react";
import { mockCreditPackages, mockBrandCredits } from "@/mock/marketingCredits";
import { toast } from "@/hooks/use-toast";
import EditMarketingDialog from "@/components/admin/paid-services/dialogs/EditMarketingDialog";
import type { CreditPackage } from "@/types/mockData";

const MarketingCredits = () => {
  const [packages, setPackages] = useState(mockCreditPackages);
  const [newPackage, setNewPackage] = useState<Partial<CreditPackage>>({
    name: "",
    credits: 0,
    price: 0,
  });
  const [selectedPackage, setSelectedPackage] = useState<CreditPackage | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  const handleEdit = (pkg: CreditPackage) => {
    setSelectedPackage(pkg);
    setIsDialogOpen(true);
    toast({
      title: "Edit Mode",
      description: "Editing package details",
    });
  };

  const handleToggleStatus = (pkg: CreditPackage) => {
    setPackages(prev =>
      prev.map(p => {
        if (p.id === pkg.id) {
          const newStatus = p.isActive ? false : true;
          toast({
            title: "Status Updated",
            description: `Package is now ${newStatus ? 'active' : 'inactive'}`,
          });
          return { ...p, isActive: newStatus };
        }
        return p;
      })
    );
  };

  const handleDelete = (pkg: CreditPackage) => {
    setPackages(prev => prev.filter(p => p.id !== pkg.id));
    toast({
      title: "Package Deleted",
      description: "The package has been successfully removed",
      variant: "destructive",
    });
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
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {packages.map((pkg) => (
                    <TableRow key={pkg.id}>
                      <TableCell>{pkg.name}</TableCell>
                      <TableCell>{pkg.credits}</TableCell>
                      <TableCell>${pkg.price}</TableCell>
                      <TableCell>
                        <span className={`text-sm ${pkg.isActive ? 'text-green-600' : 'text-gray-500'}`}>
                          {pkg.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </TableCell>
                      <TableCell className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 p-0 hover:bg-gray-200" onClick={() => handleEdit(pkg)}>
                          <Edit className="h-4 w-4" strokeWidth={1.5} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 p-0 hover:bg-red-200" onClick={() => handleToggleStatus(pkg)}>
                          {pkg.isActive ? (
                            <ToggleRight className="h-4 w-4 text-red-500" strokeWidth={1.5} />
                          ) : (
                            <ToggleLeft className="h-4 w-4 text-gray-500" strokeWidth={1.5} />
                          )}
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 p-0 hover:bg-red-200" onClick={() => handleDelete(pkg)}>
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
                  <TableHead>Total $ Spent</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockBrandCredits.map((credit) => (
                  <TableRow key={credit.id}>
                    <TableCell>{credit.brandName}</TableCell>
                    <TableCell>{credit.creditsPurchased - credit.creditsUsed}</TableCell>
                    <TableCell>{credit.creditsUsed}</TableCell>
                    <TableCell>${(credit.creditsPurchased * 0.10).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <EditMarketingDialog 
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        package={selectedPackage}
        onSubmit={(data) => {
          console.log('Form submitted:', data);
          setIsDialogOpen(false);
          toast({
            title: "Package Updated",
            description: "The package has been successfully updated",
          });
        }}
      />
    </div>
  );
};

export default MarketingCredits;
