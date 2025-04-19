
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

export function ContactBrandDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full border-gray-300 font-normal uppercase">
          Contact Brand
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Contact Brand</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" className="mt-2" />
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" className="mt-2" rows={4} />
          </div>
          <Button type="submit" className="w-full">Send Message</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
