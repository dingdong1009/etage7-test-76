
import { useState } from "react";
import { mockConsultingServices } from "@/mock/paidServices";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye, Plus, ToggleRight } from "lucide-react";
import { ConsultingService } from "@/types/services/paidServices";
import { toast } from "@/hooks/use-toast";
import NewServiceDialog from "@/components/admin/services/NewServiceDialog";

interface ConsultingServicesProps {
  onAddClick: () => void;
}

const ConsultingServices = ({ onAddClick }: ConsultingServicesProps) => {
  const [services, setServices] = useState<ConsultingService[]>(mockConsultingServices);
  const [selectedService, setSelectedService] = useState<ConsultingService | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"view" | "edit">("view");

  const handleViewDetails = (service: ConsultingService) => {
    setSelectedService(service);
    setDialogMode("view");
    setIsDialogOpen(true);
  };

  const handleEdit = (service: ConsultingService) => {
    setSelectedService(service);
    setDialogMode("edit");
    setIsDialogOpen(true);
  };

  const handleToggleStatus = (serviceId: string) => {
    setServices(prev =>
      prev.map(service => {
        if (service.id === serviceId) {
          const newStatus = service.status === "active" ? "inactive" : "active";
          toast({
            title: "Status Updated",
            description: `Service status changed to ${newStatus}`,
          });
          return { ...service, status: newStatus };
        }
        return service;
      })
    );
  };

  const handleDelete = (serviceId: string) => {
    setServices(prev => prev.filter(service => service.id !== serviceId));
    toast({
      title: "Service Deleted",
      description: "The service has been successfully deleted",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-normal tracking-tighter uppercase">
          Consulting Services ({services.length})
        </h2>
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
                    <TableHead className="font-normal text-xs uppercase">Price</TableHead>
                    <TableHead className="font-normal text-xs uppercase">Duration</TableHead>
                    <TableHead className="font-normal text-xs uppercase">Consultants</TableHead>
                    <TableHead className="font-normal text-xs uppercase">Status</TableHead>
                    <TableHead className="text-right font-normal text-xs uppercase">Actions</TableHead>
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
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 p-0 hover:bg-gray-200"
                          onClick={() => handleViewDetails(service)}
                        >
                          <Eye className="h-4 w-4" strokeWidth={1.5} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 p-0 hover:bg-gray-200"
                          onClick={() => handleEdit(service)}
                        >
                          <Edit className="h-4 w-4" strokeWidth={1.5} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 p-0 hover:bg-red-200"
                          onClick={() => handleToggleStatus(service.id)}
                        >
                          <ToggleRight className="h-4 w-4 text-red-500" strokeWidth={1.5} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 p-0 hover:bg-red-200"
                          onClick={() => handleDelete(service.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" strokeWidth={1.5} />
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

      <NewServiceDialog 
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        onSubmit={(data) => {
          console.log('Form submitted:', data);
          setIsDialogOpen(false);
          if (dialogMode === "edit") {
            toast({
              title: "Service Updated",
              description: "The service has been successfully updated",
            });
          }
        }}
      />
    </div>
  );
};

export default ConsultingServices;
