
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface UserAddFormProps {
  activeTab: string;
  handleGoBack: () => void;
  handleAddUserSubmit: (data: any) => void;
}

const UserAddForm = ({ activeTab, handleGoBack, handleAddUserSubmit }: UserAddFormProps) => {
  const addUserForm = useForm({
    defaultValues: {
      contactPerson: "",
      email: "",
      phone: "",
      companyName: "",
      description: "",
      marketSegment: "",
      website: "",
      userType: activeTab,
      productsCount: 0,
      activeSince: "",
      avgOrderValue: "",
      totalSales: "",
      storeCount: 0,
      annualPurchases: "",
      // Sales manager specific fields
      name: "",
      seniorityLevel: "",
      region: "",
      managedAccounts: 0,
      monthlyTarget: "",
      quarterlyPerformance: ""
    }
  });

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
            Add New {activeTab === "brand" ? "Brand" : activeTab === "buyer" ? "Buyer" : "Sales Manager"}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...addUserForm}>
          <form onSubmit={addUserForm.handleSubmit(handleAddUserSubmit)} className="space-y-6">
            {activeTab === "salesManager" ? (
              // Sales Manager specific form
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={addUserForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={addUserForm.control}
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
                  control={addUserForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={addUserForm.control}
                  name="seniorityLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Seniority Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select seniority level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Junior">Junior</SelectItem>
                          <SelectItem value="Mid-level">Mid-level</SelectItem>
                          <SelectItem value="Senior">Senior</SelectItem>
                          <SelectItem value="Lead">Lead</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={addUserForm.control}
                  name="region"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Region</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select region" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="North America">North America</SelectItem>
                          <SelectItem value="Europe">Europe</SelectItem>
                          <SelectItem value="Asia Pacific">Asia Pacific</SelectItem>
                          <SelectItem value="Middle East">Middle East</SelectItem>
                          <SelectItem value="Latin America">Latin America</SelectItem>
                          <SelectItem value="Global">Global</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={addUserForm.control}
                  name="activeSince"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Active Since</FormLabel>
                      <FormControl>
                        <Input placeholder="Month Year" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={addUserForm.control}
                  name="managedAccounts"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Managed Accounts</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0" {...field} value={field.value?.toString()} onChange={e => field.onChange(parseInt(e.target.value) || 0)} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={addUserForm.control}
                  name="monthlyTarget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Monthly Target</FormLabel>
                      <FormControl>
                        <Input placeholder="$0K" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ) : (
              // Brand or Buyer form
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={addUserForm.control}
                  name="contactPerson"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Person</FormLabel>
                      <FormControl>
                        <Input placeholder="Full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={addUserForm.control}
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
                  control={addUserForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={addUserForm.control}
                  name="companyName"
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
                  control={addUserForm.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input placeholder="Website URL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={addUserForm.control}
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
                          {activeTab === "brand" ? (
                            <>
                              <SelectItem value="luxury">Luxury Apparel</SelectItem>
                              <SelectItem value="contemporary">Contemporary Fashion</SelectItem>
                              <SelectItem value="formal">Formal Wear</SelectItem>
                              <SelectItem value="heritage">Heritage Fashion</SelectItem>
                              <SelectItem value="sustainable">Sustainable Fashion</SelectItem>
                            </>
                          ) : (
                            <>
                              <SelectItem value="department">Department Stores</SelectItem>
                              <SelectItem value="boutiques">Boutiques</SelectItem>
                              <SelectItem value="international">International Retail</SelectItem>
                              <SelectItem value="outlet">Outlet Retail</SelectItem>
                              <SelectItem value="luxury-retail">Luxury Retail</SelectItem>
                            </>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            
            <FormField
              control={addUserForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {activeTab === "salesManager" ? "Personal Bio" : "Company Description"}
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder={activeTab === "salesManager" ? "Brief bio and expertise" : "Brief description of the company"} 
                      className="min-h-32" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end space-x-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleGoBack}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-black text-white"
              >
                Send Invitation & Save
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UserAddForm;
