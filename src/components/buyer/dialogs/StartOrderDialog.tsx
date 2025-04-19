import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

interface SizeQuantity {
  size: string;
  quantity: string;
  colors: string[];
}

const AVAILABLE_SIZES = [
  { value: "xs", label: "XS (32-34)" },
  { value: "s", label: "S (34-36)" },
  { value: "m", label: "M (36-38)" },
  { value: "l", label: "L (38-40)" },
  { value: "xl", label: "XL (40-42)" },
];

const AVAILABLE_COLORS = [
  { name: "Black", hex: "#000000" },
  { name: "Navy", hex: "#000080" },
  { name: "Gray", hex: "#808080" },
];

const BULK_PRICING = [
  { minQuantity: 20, price: 2400 },
  { minQuantity: 50, price: 2200 },
  { minQuantity: 100, price: 2000 },
  { minQuantity: 200, price: 1800 },
];

export function StartOrderDialog() {
  const [sizeQuantities, setSizeQuantities] = useState<SizeQuantity[]>(
    AVAILABLE_SIZES.map(size => ({
      size: size.value,
      quantity: "",
      colors: [],
    }))
  );
  const [notes, setNotes] = useState("");
  const [exclusivity, setExclusivity] = useState(false);
  const MOQ = 20;

  const totalQuantity = sizeQuantities.reduce(
    (sum, item) => sum + (parseInt(item.quantity) || 0),
    0
  );

  const calculateUnitPrice = (quantity: number) => {
    const pricing = [...BULK_PRICING].reverse().find(p => quantity >= p.minQuantity);
    return pricing ? pricing.price : BULK_PRICING[0].price;
  };

  const handleQuantityChange = (size: string, value: string) => {
    setSizeQuantities(prev =>
      prev.map(item =>
        item.size === size ? { ...item, quantity: value } : item
      )
    );
  };

  const handleColorToggle = (size: string, color: string) => {
    setSizeQuantities(prev =>
      prev.map(item => {
        if (item.size === size) {
          const colors = item.colors.includes(color)
            ? item.colors.filter(c => c !== color)
            : [...item.colors, color];
          return { ...item, colors };
        }
        return item;
      })
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (totalQuantity < MOQ) {
      toast.error(`Minimum order quantity is ${MOQ} pieces`);
      return;
    }
    console.log({ sizeQuantities, notes, exclusivity, totalQuantity });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="w-full bg-black hover:bg-gray-100 border hover:text-black hover:border text-white font-normal uppercase">
          Start an Order
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[1000px] sm:w-[1000px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-xl font-normal tracking-tight">New Order</SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Size</TableHead>
                  <TableHead className="w-[120px]">Quantity</TableHead>
                  <TableHead>Colors</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sizeQuantities.map((item) => (
                  <TableRow key={item.size}>
                    <TableCell className="font-medium">
                      {AVAILABLE_SIZES.find(s => s.value === item.size)?.label}
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="0"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.size, e.target.value)}
                        className="w-[100px]"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {AVAILABLE_COLORS.map((color) => (
                          <button
                            key={color.name}
                            type="button"
                            className={`w-6 h-6 rounded-full border-2 ${
                              item.colors.includes(color.name)
                                ? "border-gray-400"
                                : "border-transparent"
                            }`}
                            style={{ backgroundColor: color.hex }}
                            onClick={() => handleColorToggle(item.size, color.name)}
                          />
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="exclusivity"
                checked={exclusivity}
                onCheckedChange={(checked) => setExclusivity(checked as boolean)}
              />
              <Label htmlFor="exclusivity" className="text-sm">
                Request Exclusivity Rights
              </Label>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Bulk Order Pricing</Label>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price per Unit (€)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {BULK_PRICING.map((tier, index) => (
                    <TableRow key={index}>
                      <TableCell>{tier.minQuantity}+ pieces</TableCell>
                      <TableCell>€{tier.price.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
                    <span>Total Quantity:</span>
                    <span>{totalQuantity} units</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Unit Price:</span>
                    <span>€{calculateUnitPrice(totalQuantity).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium border-t pt-2">
                    <span>Total Estimate:</span>
                    <span>€{(calculateUnitPrice(totalQuantity) * totalQuantity).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-black hover:bg-gray-800 text-white"
                disabled={totalQuantity < MOQ}
              >
                Submit Order
              </Button>
              {totalQuantity < MOQ && (
                <p className="text-sm text-red-500 text-center">
                  Minimum order quantity is {MOQ} pieces
                </p>
              )}
            </div>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
