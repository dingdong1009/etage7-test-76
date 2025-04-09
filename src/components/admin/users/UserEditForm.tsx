
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Brand, Buyer, SalesManager } from "@/types/users";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface UserEditFormProps {
  user: Brand | Buyer | SalesManager;
  activeTab: string;
  handleGoBack: () => void;
  handleEditUserSubmit: (data: any) => void;
}

const UserEditForm = ({ user, activeTab, handleGoBack, handleEditUserSubmit }: UserEditFormProps) => {
  const isBrand = (user: any): user is Brand => {
    return 'productsCount' in user && 'totalSales' in user;
  };

  const isBuyer = (user: any): user is Buyer => {
    return 'storeCount' in user && 'annualPurchases' in user;
  };

  const isSalesManager = (user: any): user is SalesManager => {
    return 'quarterlyPerformance' in user && 'seniorityLevel' in user;
  };

  const editUserForm = useForm({
    defaultValues: {
      id: user.id,
      name: user.name,
      status: user.status,
      plan: isBrand(user) || isBuyer(user) ? user.plan : "",
      contactPerson: isBrand(user) || isBuyer(user) ? user.contactPerson : "",
      email: user.email,
      phone: user.phone,
      website: isBrand(user) || isBuyer(user) ? user.website : "",
      description: user.description,
      marketSegment: isBrand(user) || isBuyer(user) ? user.marketSegment : "",
      productsCount: isBrand(user) ? user.productsCount : 0,
      activeSince: user.activeSince,
      avgOrderValue: isBrand(user) || isBuyer(user) ? user.avgOrderValue : "",
      totalSales: isBrand(user) ? user.totalSales : "",
      storeCount: isBuyer(user) ? user.storeCount : 0,
      annualPurchases: isBuyer(user) ? user.annualPurchases : "",
      seniorityLevel: isSalesManager(user) ? user.seniorityLevel : "",
      region: isSalesManager(user) ? user.region : "",
      managedAccounts: isSalesManager(user) ? user.managedAccounts : 0,
      monthlyTarget: isSalesManager(user) ? user.monthlyTarget : "",
      quarterlyPerformance: isSalesManager(user) ? user.quarterlyPerformance : ""
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
            Edit {user.name}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...editUserForm}>
          <form onSubmit={editUserForm.handleSubmit(handleEditUserSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  {isSalesManager(user) ? "Manager Information" : "Company Information"}
                </h3>
                <div className="space-y-4">
                  <FormField
                    control={editUserForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {isSalesManager(user) ? "Name" : "Company Name"}
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={editUserForm.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
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
                  
                  {(isBrand(user) || isBuyer(user)) && (
                    <FormField
                      control={editUserForm.control}
                      name="plan"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Plan</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
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
                  )}
                  
                  {isSalesManager(user) && (
                    <FormField
                      control={editUserForm.control}
                      name="seniorityLevel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Seniority Level</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select level" />
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
                  )}
                  
                  {(isBrand(user) || isBuyer(user)) && (
                    <FormField
                      control={editUserForm.control}
                      name="marketSegment"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Market Segment</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select market segment" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {activeTab === "brand" ? (
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
                  )}
                  
                  {(isBrand(user) || isBuyer(user)) && (
                    <FormField
                      control={editUserForm.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  
                  {isSalesManager(user) && (
                    <FormField
                      control={editUserForm.control}
                      name="region"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Region</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
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
                  )}
                  
                  <FormField
                    control={editUserForm.control}
                    name="activeSince"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Active Since</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  {(isBrand(user) || isBuyer(user)) && (
                    <FormField
                      control={editUserForm.control}
                      name="contactPerson"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Person</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  
                  <FormField
                    control={editUserForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={editUserForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            
            <FormField
              control={editUserForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea className="min-h-32" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {isBrand(user) && (
                  <>
                    <FormField
                      control={editUserForm.control}
                      name="productsCount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Products Count</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} value={field.value?.toString()} onChange={e => field.onChange(parseInt(e.target.value) || 0)} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={editUserForm.control}
                      name="avgOrderValue"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Average Order Value</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={editUserForm.control}
                      name="totalSales"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Total Sales</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
                
                {isBuyer(user) && (
                  <>
                    <FormField
                      control={editUserForm.control}
                      name="storeCount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Store Count</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} value={field.value?.toString()} onChange={e => field.onChange(parseInt(e.target.value) || 0)} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={editUserForm.control}
                      name="avgOrderValue"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Average Order Value</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={editUserForm.control}
                      name="annualPurchases"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Annual Purchases</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
                
                {isSalesManager(user) && (
                  <>
                    <FormField
                      control={editUserForm.control}
                      name="managedAccounts"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Managed Accounts</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} value={field.value?.toString()} onChange={e => field.onChange(parseInt(e.target.value) || 0)} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={editUserForm.control}
                      name="monthlyTarget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Monthly Target</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={editUserForm.control}
                      name="quarterlyPerformance"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quarterly Performance</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </div>
            </div>
            
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
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UserEditForm;
