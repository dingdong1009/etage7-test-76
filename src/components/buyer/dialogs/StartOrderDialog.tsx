
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function StartOrderDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-black hover:bg-gray-100 border hover:text-black hover:border text-white font-normal uppercase">
          Start an Order
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Order</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <Label htmlFor="quantity">Quantity</Label>
            <Input id="quantity" type="number" min="1" className="mt-2" />
          </div>
          <div>
            <Label htmlFor="size">Size</Label>
            <Input id="size" className="mt-2" />
          </div>
          <div>
            <Label htmlFor="notes">Additional Notes</Label>
            <Input id="notes" className="mt-2" />
          </div>
          <Button type="submit" className="w-full">Submit Order</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
