
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
import { Textarea } from "@/components/ui/textarea"

export function RequestSamplesDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full border-gray-300 font-normal uppercase">
          Request for Samples
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Request Samples</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <Label htmlFor="samples">Number of Samples</Label>
            <Input id="samples" type="number" min="1" max="5" className="mt-2" />
          </div>
          <div>
            <Label htmlFor="sizes">Sizes Needed</Label>
            <Input id="sizes" placeholder="e.g. S, M, L" className="mt-2" />
          </div>
          <div>
            <Label htmlFor="details">Additional Details</Label>
            <Textarea id="details" className="mt-2" rows={3} />
          </div>
          <Button type="submit" className="w-full">Submit Request</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
