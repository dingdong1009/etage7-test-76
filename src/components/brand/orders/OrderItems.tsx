
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";

interface OrderItem {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  price: string;
  total: string;
  size?: string;
  color?: string;
  image?: string;
}

interface OrderItemsProps {
  items: OrderItem[];
  subtotal: string;
  shipping: string;
  tax: string;
  total: string;
}

const OrderItems: React.FC<OrderItemsProps> = ({ items, subtotal, shipping, tax, total }) => {
  return (
    <Card className="border border-gray-200">
      <CardHeader>
        <CardTitle>Order Items</CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      {item.image && (
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-12 h-12 object-cover rounded" 
                        />
                      )}
                      <span>{item.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{item.sku}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {item.size && <div>Size: {item.size}</div>}
                      {item.color && <div>Color: {item.color}</div>}
                    </div>
                  </TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell className="text-right">{item.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="mt-6 border-t pt-4">
          <div className="flex justify-end">
            <div className="w-full max-w-xs space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{subtotal}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>{shipping}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>{tax}</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between font-medium">
                <span>Total:</span>
                <span>{total}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItems;
