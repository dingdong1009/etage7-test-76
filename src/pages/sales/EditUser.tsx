
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ArrowLeft, Save } from "lucide-react";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";

// Brand and Buyer types
type Brand = {
  id: number;
  name: string;
  status: string;
  plan: string;
  lastActivity: string;
  contactPerson: string;
  email: string;
  phone: string;
  website: string;
  description: string;
  marketSegment: string;
  productsCount: number;
  activeSince: string;
  avgOrderValue: string;
  totalSales: string;
};

type Buyer = {
  id: number;
  name: string;
  status: string;
  plan: string;
  lastActivity: string;
  contactPerson: string;
  email: string;
  phone: string;
  website: string;
  description: string;
  marketSegment: string;
  storeCount: number;
  activeSince: string;
  avgOrderValue: string;
  annualPurchases: string;
};

type User = Brand | Buyer;

// Type guards
const isBrand = (user: User): user is Brand => {
  return 'productsCount' in user;
};

const isBuyer = (user: User): user is Buyer => {
  return 'storeCount' in user;
};

const EditUser = () => {
  const { userType, userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const form = useForm({
    defaultValues: {
      name: "",
      status: "",
      plan: "",
      contactPerson: "",
      email: "",
      phone: "",
      website: "",
      description: "",
      marketSegment: ""
    }
  });

  useEffect(() => {
    // In a real application, you would fetch user data from an API
    // This is a mock implementation
    const fetchUserData = () => {
      setLoading(true);
      setTimeout(() => {
        // Sample data - in a real app, this would be fetched from an API
        if (userType === "brand") {
          const brandUser: Brand = {
            id: Number(userId),
            name: "Luxury Brands Inc.",
            status: "active",
            plan: "Premium",
            lastActivity: "2 hours ago",
            contactPerson: "John Smith",
            email: "john@luxurybrandsinc.com",
            phone: "+1 (555) 123-4567",
            website: "luxurybrandsinc.com",
            description: "Leading luxury fashion and accessories brand focused on high-end retail market",
            marketSegment: "Luxury Apparel",
            productsCount: 245,
            activeSince: "June 2018",
            avgOrderValue: "$2,500",
            totalSales: "$1.2M"
          };
          setUser(brandUser);
          form.reset({
            name: brandUser.name,
            status: brandUser.status,
            plan: brandUser.plan,
            contactPerson: brandUser.contactPerson,
            email: brandUser.email,
            phone: brandUser.phone,
            website: brandUser.website,
            description: brandUser.description,
            marketSegment: brandUser.marketSegment
          });
        } else {
          const buyerUser: Buyer = {
            id: Number(userId),
            name: "Department Store Group",
            status: "active",
            plan: "Enterprise",
            lastActivity: "1 hour ago",
            contactPerson: "Robert Chen",
            email: "robert@departmentstoregroup.com",
            phone: "+1 (555) 678-9012",
            website: "departmentstoregroup.com",
            description: "National chain of premium department stores operating in major cities",
            marketSegment: "Department Stores",
            storeCount: 35,
            activeSince: "January 2015",
            avgOrderValue: "$45,000",
            annualPurchases: "$12M"
          };
          setUser(buyerUser);
          form.reset({
            name: buyerUser.name,
            status: buyerUser.status,
            plan: buyerUser.plan,
            contactPerson: buyerUser.contactPerson,
            email: buyerUser.email,
            phone: buyerUser.phone,
            website: buyerUser.website,
            description: buyerUser.description,
            marketSegment: buyerUser.marketSegment
          });
        }
        setLoading(false);
      }, 500);
    };

    fetchUserData();
  }, [userId, userType, form]);

  const handleBack = () => {
    navigate(`/sales/users/${userType}/${userId}/view`);
  };

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    // In a real app, you would save the data to an API
    navigate(`/sales/users/${userType}/${userId}/view`);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to User
          </Button>
        </div>
        <div className="h-96 flex items-center justify-center">
          <p>Loading user details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to User
          </Button>
          <h1 className="text-4xl uppercase font-thin">Edit {user?.name}</h1>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="text-xl uppercase font-thin">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Company name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="plan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Plan</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select plan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Basic">Basic</SelectItem>
                          <SelectItem value="Professional">Professional</SelectItem>
                          <SelectItem value="Premium">Premium</SelectItem>
                          <SelectItem value="Enterprise">Enterprise</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card className="col-span-1 lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-xl uppercase font-thin">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="contactPerson"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Person</FormLabel>
                      <FormControl>
                        <Input placeholder="Contact person" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Email address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="Phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input placeholder="Website" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card className="col-span-1 lg:col-span-3">
              <CardHeader>
                <CardTitle className="text-xl uppercase font-thin">Company Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Company description" 
                          className="min-h-32" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="marketSegment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Market Segment</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select market segment" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {userType === "brand" ? (
                            <>
                              <SelectItem value="Luxury Apparel">Luxury Apparel</SelectItem>
                              <SelectItem value="Contemporary Fashion">Contemporary Fashion</SelectItem>
                              <SelectItem value="Formal Wear">Formal Wear</SelectItem>
                              <SelectItem value="Heritage Fashion">Heritage Fashion</SelectItem>
                              <SelectItem value="Sustainable Fashion">Sustainable Fashion</SelectItem>
                            </>
                          ) : (
                            <>
                              <SelectItem value="Department Stores">Department Stores</SelectItem>
                              <SelectItem value="Boutiques">Boutiques</SelectItem>
                              <SelectItem value="International Retail">International Retail</SelectItem>
                              <SelectItem value="Outlet Retail">Outlet Retail</SelectItem>
                              <SelectItem value="Luxury Retail">Luxury Retail</SelectItem>
                            </>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex justify-end">
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={handleBack}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    className="bg-black text-white"
                  >
                    <Save className="mr-2 h-4 w-4" /> Save Changes
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="col-span-1 lg:col-span-3">
              <CardHeader>
                <CardTitle className="text-xl uppercase font-thin">Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-gray-500">
                  {user && isBrand(user) ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Products Count</p>
                        <p className="font-medium">{user.productsCount}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Average Order Value</p>
                        <p className="font-medium">{user.avgOrderValue}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total Sales</p>
                        <p className="font-medium">{user.totalSales}</p>
                      </div>
                    </div>
                  ) : user && isBuyer(user) ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Store Count</p>
                        <p className="font-medium">{user.storeCount}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Average Order Value</p>
                        <p className="font-medium">{user.avgOrderValue}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Annual Purchases</p>
                        <p className="font-medium">{user.annualPurchases}</p>
                      </div>
                    </div>
                  ) : null}
                  <p className="mt-4 italic">Performance metrics cannot be edited directly. They are calculated based on user activity.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditUser;
