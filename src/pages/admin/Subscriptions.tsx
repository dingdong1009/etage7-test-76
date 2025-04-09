
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminSubscriptions = () => {
  const subscriptionPlans = [
    { id: 1, name: "Basic", price: "$99/month", features: ["Feature 1", "Feature 2"], active: true },
    { id: 2, name: "Premium", price: "$199/month", features: ["Feature 1", "Feature 2", "Feature 3"], active: true },
    { id: 3, name: "Enterprise", price: "$499/month", features: ["All Features", "Priority Support"], active: true },
  ];

  const additionalServices = [
    { id: 1, name: "Premium Support", price: "$50/month", description: "24/7 priority support" },
    { id: 2, name: "Custom Development", price: "$120/hour", description: "Custom feature development" },
    { id: 3, name: "Consulting", price: "$200/hour", description: "Strategic business consulting" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Subscription Management</h1>

      <Tabs defaultValue="plans" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="plans">Subscription Plans</TabsTrigger>
          <TabsTrigger value="additional">Additional Services</TabsTrigger>
        </TabsList>

        <TabsContent value="plans" className="space-y-4">
          <div className="flex justify-end mb-4">
            <Button className="bg-black text-white border-none hover:underline">
              Add New Plan
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {subscriptionPlans.map((plan) => (
              <Card key={plan.id} className="p-6 border border-gray-200">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <div className={`px-2 py-1 text-xs rounded-sm ${plan.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {plan.active ? 'Active' : 'Inactive'}
                  </div>
                </div>
                <div className="text-2xl font-bold mt-2">{plan.price}</div>
                <ul className="mt-4 space-y-2">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <span className="mr-2">•</span> {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 space-x-2">
                  <Button variant="outline" size="sm" className="border-gray-200">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="border-gray-200 text-red-600 hover:text-red-700">
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="additional" className="space-y-4">
          <div className="flex justify-end mb-4">
            <Button className="bg-black text-white border-none hover:underline">
              Add New Service
            </Button>
          </div>

          <div className="rounded-none border border-gray-200 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-medium">Service Name</TableHead>
                  <TableHead className="font-medium">Price</TableHead>
                  <TableHead className="font-medium">Description</TableHead>
                  <TableHead className="font-medium text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {additionalServices.map((service) => (
                  <TableRow key={service.id} className="border-t border-gray-200">
                    <TableCell className="font-medium">{service.name}</TableCell>
                    <TableCell>{service.price}</TableCell>
                    <TableCell>{service.description}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="sm" className="border-gray-200">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="border-gray-200 text-red-600 hover:text-red-700">
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSubscriptions;
