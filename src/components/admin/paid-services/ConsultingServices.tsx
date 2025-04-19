import { useState } from "react";
import { mockConsultingServices } from "@/mock/paidServices";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Edit, Trash2, Eye, Plus, UserX, Clock } from "lucide-react";
import { ConsultingService } from "@/types/services/paidServices";

interface ConsultingServicesProps {
  onAddClick: () => void;
}

const ConsultingServices = ({ onAddClick }: ConsultingServicesProps) => {
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
        <Button 
          className="bg-black hover:bg-gray-100 border hover:text-black hover:border text-white font-normal uppercase"
          onClick={onAddClick}
        >
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
                          <UserX className="h-4 w-4 text-red-400" strokeWidth={1.5}  />
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
      </div>
    </div>
  );
};

export default ConsultingServices;
