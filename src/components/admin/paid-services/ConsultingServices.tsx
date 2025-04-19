
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Edit, Trash2, Eye, Plus, Users, Clock } from "lucide-react";
import { ConsultingService } from "@/types/services/paidServices";

// Mock data for consulting services
const mockConsultingServices: ConsultingService[] = [
  {
    id: "cs-1",
    name: "Brand Strategy",
    description: "Develop a comprehensive brand strategy aligned with market trends",
    price: 1500,
    features: ["Market analysis", "Brand positioning", "Visual identity", "Strategy document"],
    type: "consulting",
    frequency: "one-time",
    status: "active",
    createdAt: "2023-10-12T08:00:00Z",
    updatedAt: "2024-03-15T11:20:00Z",
    duration: 10,
    consultantCount: 2,
    availability: ["Monday", "Wednesday", "Friday"]
  },
  {
    id: "cs-2",
    name: "Market Entry Analysis",
    description: "Detailed analysis for brands entering new markets",
    price: 2500,
    features: ["Market research", "Competitor analysis", "Entry strategy", "Risk assessment"],
    type: "consulting",
    frequency: "one-time",
    status: "active",
    createdAt: "2023-11-05T09:30:00Z",
    updatedAt: "2024-02-20T14:45:00Z",
    duration: 15,
    consultantCount: 3,
    availability: ["Tuesday", "Thursday"]
  },
  {
    id: "cs-3",
    name: "Product Line Review",
    description: "In-depth assessment of product lines with recommendations",
    price: 1200,
    features: ["Product assessment", "Market fit analysis", "Pricing strategy", "Improvement recommendations"],
    type: "consulting",
    frequency: "one-time",
    status: "active",
    createdAt: "2024-01-20T10:15:00Z",
    updatedAt: "2024-04-05T13:30:00Z",
    duration: 8,
    consultantCount: 1,
    availability: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
  },
  {
    id: "cs-4",
    name: "Seasonal Trend Forecast",
    description: "Fashion trend predictions for upcoming seasons",
    price: 950,
    features: ["Trend analysis", "Color palette", "Material recommendations", "Style guide"],
    type: "consulting",
    frequency: "one-time",
    status: "inactive",
    createdAt: "2023-12-10T14:00:00Z",
    updatedAt: "2024-01-15T09:00:00Z",
    duration: 5,
    consultantCount: 2,
    availability: ["Wednesday", "Friday"]
  }
];

const ConsultingServices = () => {
  const [services] = useState<ConsultingService[]>(mockConsultingServices);
  
  // Calculate data for chart
  const chartData = services.map(service => ({
    name: service.name,
    duration: service.duration,
    consultants: service.consultantCount
  }));
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-normal tracking-tighter uppercase">Consulting Services ({services.length})</h2>
        <Button className="bg-black hover:bg-gray-100 border hover:text-black hover:border text-white font-normal uppercase">
          <Plus size={16} />
          Add New Service
        </Button>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <Card className="border border-gray-200 shadow-none rounded-lg">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px] font-normal text-xs uppercase">Service</TableHead>
                    <TableHead className=" font-normal text-xs uppercase">Price</TableHead>
                    <TableHead className=" font-normal text-xs uppercase">Duration</TableHead>
                    <TableHead className=" font-normal text-xs uppercase">Consultants</TableHead>
                    <TableHead className=" font-normal text-xs uppercase">Status</TableHead>
                    <TableHead className="text-right  font-normal text-xs uppercase">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {services.map((service) => (
                    <TableRow key={service.id} className="border-t border-gray-100">
                      <TableCell className="font-light">{service.name}</TableCell>
                      <TableCell className="font-light">${service.price}</TableCell>
                      <TableCell className="font-light">{service.duration} hours</TableCell>
                      <TableCell className="font-light">{service.consultantCount}</TableCell>
                      <TableCell>
                        {service.status === "active" ? (
                          <Badge variant="outline" className="bg-accent-mint text-gray-800 border-gray-200">
                            Active
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
                            Inactive
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 p-0 hover:bg-gray-200">
                          <Eye className="h-4 w-4" strokeWidth={1.5}  />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 p-0 hover:bg-gray-200">
                          <Edit className="h-4 w-4" strokeWidth={1.5}  />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 p-0 hover:bg-red-200">
                          <Trash2 className="h-4 w-4 text-red-400" strokeWidth={1.5}  />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>


{/* Graph for future use
        <div>
          <Card className="border border-gray-200 shadow-none rounded-lg">
            <CardHeader className="px-6 py-5 border-b border-gray-100 bg-gray-50/80">
              <CardTitle className="text-lg font-normal uppercase text-gray-900">
                Service Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex justify-between mb-8">
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-gray-100">
                    <Clock className="h-6 w-6 text-gray-700" />
                  </div>
                  <div className="mt-2 text-2xl font-light">
                    {services.reduce((sum, service) => sum + service.duration, 0)}
                  </div>
                  <div className="text-sm text-gray-500">Total Hours</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-gray-100">
                    <Users className="h-6 w-6 text-gray-700" />
                  </div>
                  <div className="mt-2 text-2xl font-light">
                    {services.reduce((sum, service) => sum + service.consultantCount, 0)}
                  </div>
                  <div className="text-sm text-gray-500">Total Consultants</div>
                </div>
              </div>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 0, bottom: 60 }}
                    className={"font-light text-xs"}
                  >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name" angle={0} textAnchor="end" height={10} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="duration" name="Duration (hours)" fill="#8884d8" />
                    <Bar dataKey="consultants" name="Consultants" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
         */}
      </div>
    </div>
  );
};

export default ConsultingServices;
