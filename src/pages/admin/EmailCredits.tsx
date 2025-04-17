
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EditIcon, Trash2Icon, PlusCircleIcon, CreditCard } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock credit packages data
const mockCreditPackages = [
  { id: 1, name: "Starter", credits: 50, price: 25, status: "active" },
  { id: 2, name: "Professional", credits: 200, price: 80, status: "active" },
  { id: 3, name: "Business", credits: 500, price: 175, status: "active" },
  { id: 4, name: "Enterprise", credits: 1000, price: 300, status: "active" },
];

// Mock brands with credit data
const mockBrands = [
  { id: 1, name: "Luxury Brands Inc.", email: "john@luxurybrandsinc.com", credits: 136, plan: "Premium" },
  { id: 2, name: "Fashion Forward Co.", email: "emily@fashionforward.co", credits: 0, plan: "Professional" },
  { id: 3, name: "Elegant Styles Ltd.", email: "michael@elegantstyles.com", credits: 25, plan: "Basic" },
  { id: 4, name: "Heritage Designs", email: "sarah@heritagedesigns.com", credits: 78, plan: "Premium" },
  { id: 5, name: "Modern Collections", email: "david@moderncollections.com", credits: 0, plan: "Basic" },
];

const AdminEmailCredits = () => {
  // State for package management dialog
  const [isPackageDialogOpen, setIsPackageDialogOpen] = useState(false);
  const [currentPackageId, setCurrentPackageId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // State for brand credit adjustment dialog
  const [isCreditDialogOpen, setIsCreditDialogOpen] = useState(false);
  const [selectedBrandId, setSelectedBrandId] = useState<number | null>(null);
  
  // Package form
  const packageForm = useForm({
    defaultValues: {
      name: "",
      credits: 0,
      price: 0,
      status: "active",
    },
  });

  // Credit adjustment form
  const creditForm = useForm({
    defaultValues: {
      credits: 0,
      reason: "",
    },
  });

  // Handle opening package dialog
  const handleAddPackage = () => {
    packageForm.reset({
      name: "",
      credits: 0,
      price: 0,
      status: "active",
    });
    setCurrentPackageId(null);
    setIsEditing(false);
    setIsPackageDialogOpen(true);
  };

  // Handle editing a package
  const handleEditPackage = (pkg) => {
    packageForm.reset({
      name: pkg.name,
      credits: pkg.credits,
      price: pkg.price,
      status: pkg.status,
    });
    setCurrentPackageId(pkg.id);
    setIsEditing(true);
    setIsPackageDialogOpen(true);
  };

  // Handle package form submission
  const handleSubmitPackage = (data) => {
    // In a real app, this would save to the database
    if (isEditing) {
      toast({
        title: "Success",
        description: "Credit package updated successfully",
      });
    } else {
      toast({
        title: "Success",
        description: "Credit package added successfully",
      });
    }
    setIsPackageDialogOpen(false);
  };

  // Handle opening credit adjustment dialog
  const handleAdjustCredits = (brandId) => {
    creditForm.reset({
      credits: 0,
      reason: "",
    });
    setSelectedBrandId(brandId);
    setIsCreditDialogOpen(true);
  };

  // Handle credit adjustment form submission
  const handleSubmitCreditAdjustment = (data) => {
    // In a real app, this would update the brand's credit balance
    const brand = mockBrands.find(b => b.id === selectedBrandId);
    toast({
      title: "Success",
      description: `Adjusted credits for ${brand?.name}`,
    });
    setIsCreditDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tighter uppercase mb-6">EMAIL CREDIT MANAGEMENT</h1>

      {/* Credit Packages Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-light">Credit Packages</h2>
          <Button 
            className="bg-black text-white border-none hover:bg-gray-800 text-xs font-light rounded-none"
            onClick={handleAddPackage}
          >
            <PlusCircleIcon className="w-4 h-4 mr-2" strokeWidth={1} />
            Add New Package
          </Button>
        </div>

        <Card className="border border-gray-100 rounded-none shadow-none">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-light">Package Name</TableHead>
                  <TableHead className="font-light">Credits</TableHead>
                  <TableHead className="font-light">Price ($)</TableHead>
                  <TableHead className="font-light">Status</TableHead>
                  <TableHead className="font-light">Price per Credit</TableHead>
                  <TableHead className="font-light text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockCreditPackages.map((pkg) => (
                  <TableRow key={pkg.id}>
                    <TableCell className="font-medium">{pkg.name}</TableCell>
                    <TableCell>{pkg.credits}</TableCell>
                    <TableCell>${pkg.price}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 text-xs rounded-sm ${pkg.status === 'active' ? 'bg-accent-mint text-gray-800' : 'bg-gray-100 text-gray-600'}`}>
                        {pkg.status.charAt(0).toUpperCase() + pkg.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>${(pkg.price / pkg.credits).toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleEditPackage(pkg)}
                        >
                          <EditIcon className="h-4 w-4" strokeWidth={1} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-red-600"
                        >
                          <Trash2Icon className="h-4 w-4" strokeWidth={1} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Brand Credits Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-light">Brand Credits</h2>
        </div>

        <Card className="border border-gray-100 rounded-none shadow-none">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-light">Brand Name</TableHead>
                  <TableHead className="font-light">Email</TableHead>
                  <TableHead className="font-light">Plan</TableHead>
                  <TableHead className="font-light">Available Credits</TableHead>
                  <TableHead className="font-light text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockBrands.map((brand) => (
                  <TableRow key={brand.id}>
                    <TableCell className="font-medium">{brand.name}</TableCell>
                    <TableCell>{brand.email}</TableCell>
                    <TableCell>{brand.plan}</TableCell>
                    <TableCell>
                      <span className={brand.credits === 0 ? 'text-red-600' : ''}>
                        {brand.credits}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 rounded-none text-xs"
                        onClick={() => handleAdjustCredits(brand.id)}
                      >
                        <CreditCard className="mr-2 h-4 w-4" strokeWidth={1} />
                        Adjust Credits
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Package Dialog */}
      <Dialog open={isPackageDialogOpen} onOpenChange={setIsPackageDialogOpen}>
        <DialogContent className="sm:max-w-[500px] rounded-none">
          <DialogHeader>
            <DialogTitle className="text-xl font-light tracking-tight">
              {isEditing ? "Edit Credit Package" : "Add New Credit Package"}
            </DialogTitle>
          </DialogHeader>
          <Form {...packageForm}>
            <form onSubmit={packageForm.handleSubmit(handleSubmitPackage)} className="space-y-4">
              <FormField
                control={packageForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-light">Package Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Starter"
                        {...field}
                        className="rounded-none border-gray-200" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={packageForm.control}
                name="credits"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-light">Number of Credits</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field}
                        className="rounded-none border-gray-200" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={packageForm.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-light">Price ($)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field}
                        className="rounded-none border-gray-200" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={packageForm.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-light">Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="rounded-none border-gray-200">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-none">
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsPackageDialogOpen(false)}
                  className="rounded-none border-gray-200 text-xs font-light"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="rounded-none bg-black text-white hover:bg-gray-800 text-xs font-light"
                >
                  {isEditing ? "Save Changes" : "Add Package"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Credit Adjustment Dialog */}
      <Dialog open={isCreditDialogOpen} onOpenChange={setIsCreditDialogOpen}>
        <DialogContent className="sm:max-w-[500px] rounded-none">
          <DialogHeader>
            <DialogTitle className="text-xl font-light tracking-tight">
              Adjust Credits
            </DialogTitle>
          </DialogHeader>
          <Form {...creditForm}>
            <form onSubmit={creditForm.handleSubmit(handleSubmitCreditAdjustment)} className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">
                  Brand: {mockBrands.find(b => b.id === selectedBrandId)?.name}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Current Credits: {mockBrands.find(b => b.id === selectedBrandId)?.credits}
                </p>
              </div>
              
              <FormField
                control={creditForm.control}
                name="credits"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-light">Adjustment Amount</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field}
                        className="rounded-none border-gray-200" 
                        placeholder="Use positive for adding, negative for removing"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={creditForm.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-light">Reason for Adjustment</FormLabel>
                    <FormControl>
                      <Input 
                        {...field}
                        className="rounded-none border-gray-200" 
                        placeholder="e.g. Complimentary credits for new brand"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsCreditDialogOpen(false)}
                  className="rounded-none border-gray-200 text-xs font-light"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="rounded-none bg-black text-white hover:bg-gray-800 text-xs font-light"
                >
                  Apply Adjustment
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminEmailCredits;
