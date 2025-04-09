
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brand } from "@/types/users";
import { useForm } from "react-hook-form";

interface BrandFormProps {
  initialData?: Partial<Brand>;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isEdit?: boolean;
}

const BrandForm = ({ initialData, onSubmit, onCancel, isEdit = false }: BrandFormProps) => {
  const form = useForm({
    defaultValues: {
      id: initialData?.id || 0,
      name: initialData?.name || "",
      status: initialData?.status || "active",
      plan: initialData?.plan || "",
      contactPerson: initialData?.contactPerson || "",
      email: initialData?.email || "",
      phone: initialData?.phone || "",
      website: initialData?.website || "",
      description: initialData?.description || "",
      marketSegment: initialData?.marketSegment || "",
      productsCount: initialData?.productsCount || 0,
      activeSince: initialData?.activeSince || "",
      avgOrderValue: initialData?.avgOrderValue || "",
      totalSales: initialData?.totalSales || "",
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            name="contactPerson"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Person</FormLabel>
                <FormControl>
                  <Input placeholder="Contact person name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
          
          <FormField
            control={form.control}
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
            control={form.control}
            name="marketSegment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Market Segment</FormLabel>
                <FormControl>
                  <Input placeholder="Market segment" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="productsCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Products Count</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="Number of products" 
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="activeSince"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Active Since</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., June 2022" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="avgOrderValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Average Order Value</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., $500" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="totalSales"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Sales</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., $1.2M" {...field} />
                </FormControl>
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
                <FormControl>
                  <Input placeholder="e.g., Premium" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {isEdit && (
            <FormField
              control={form.control}
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
          )}
        </div>
        
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
        
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="bg-black text-white">
            {isEdit ? "Update Brand" : "Add Brand"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BrandForm;
