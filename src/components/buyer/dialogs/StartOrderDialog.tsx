
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function StartOrderDialog() {
  const [quantity, setQuantity] = useState("");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({ quantity, selectedSizes, notes });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-black hover:bg-gray-100 border hover:text-black hover:border text-white font-normal uppercase">
          Start an Order
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-normal tracking-tight">New Order</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity" className="text-sm font-medium">Quantity*</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter quantity"
                className="bg-white"
                required
              />
              <p className="text-xs text-gray-500">Minimum order: 20 pieces</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="size" className="text-sm font-medium">Sizes*</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select sizes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="xs">XS (32-34)</SelectItem>
                  <SelectItem value="s">S (34-36)</SelectItem>
                  <SelectItem value="m">M (36-38)</SelectItem>
                  <SelectItem value="l">L (38-40)</SelectItem>
                  <SelectItem value="xl">XL (40-42)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">Select all required sizes</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="deliveryDate" className="text-sm font-medium">Requested Delivery Date</Label>
              <Input
                id="deliveryDate"
                type="date"
                className="bg-white"
              />
              <p className="text-xs text-gray-500">Standard lead time: 30 days</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="shippingMethod" className="text-sm font-medium">Shipping Method</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select shipping" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard Shipping (7-10 days)</SelectItem>
                  <SelectItem value="express">Express Shipping (3-5 days)</SelectItem>
                  <SelectItem value="priority">Priority Shipping (1-2 days)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm font-medium">Additional Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any specific requirements or customization requests?"
              className="min-h-[100px] bg-white"
            />
          </div>

          <div className="space-y-4">
            <div className="border-t pt-4">
              <p className="text-sm text-gray-600 mb-4">Order Summary</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Unit Price:</span>
                  <span>€2,400</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Quantity:</span>
                  <span>{quantity || 0} units</span>
                </div>
                <div className="flex justify-between text-sm font-medium border-t pt-2">
                  <span>Total Estimate:</span>
                  <span>€{quantity ? Number(quantity) * 2400 : 0}</span>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full bg-black hover:bg-gray-800 text-white">
              Submit Order
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
