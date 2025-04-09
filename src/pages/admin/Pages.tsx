
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, 
  DialogTrigger, DialogClose, DialogDescription
} from "@/components/ui/dialog";
import { 
  AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader,
  AlertDialogTitle, AlertDialogDescription, AlertDialogFooter,
  AlertDialogCancel, AlertDialogAction 
} from "@/components/ui/alert-dialog";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Share2, Edit, Trash2, Tag, PaperclipIcon, X, FileText, FileImage } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description?: string;
  documents?: string[];
  taggedBrands?: string[];
  sendToBuyers?: boolean;
  sendToBrands?: boolean;
}

interface Story {
  id: number;
  title: string;
  publishDate: string;
  tags: string[];
  content?: string;
}

const AdminPages = () => {
  const { toast } = useToast();
  
  // Event State
  const [events, setEvents] = useState<Event[]>([
    { id: 1, title: "Summer Fashion Showcase", date: "2025-06-15", location: "New York" },
    { id: 2, title: "Fall Collection Preview", date: "2025-09-20", location: "Paris" },
    { id: 3, title: "Winter Fashion Week", date: "2025-12-05", location: "Milan" }
  ]);
  
  // Story State
  const [curatedStories, setCuratedStories] = useState<Story[]>([
    { id: 1, title: "Emerging Designers 2025", publishDate: "2025-05-10", tags: ["Sustainable", "New Talent"] },
    { id: 2, title: "Ethical Fashion Trends", publishDate: "2025-06-22", tags: ["Ethical", "Sustainable"] },
    { id: 3, title: "Summer Accessories Guide", publishDate: "2025-07-15", tags: ["Accessories", "Trending"] }
  ]);

  // Form State
  const [newEvent, setNewEvent] = useState<Omit<Event, 'id'>>({ 
    title: "", 
    date: "", 
    location: "", 
    description: "",
    documents: [],
    taggedBrands: [],
    sendToBuyers: false,
    sendToBrands: false
  });
  const [editEvent, setEditEvent] = useState<Event | null>(null);
  const [newStory, setNewStory] = useState<Omit<Story, 'id'>>({ title: "", publishDate: "", tags: [], content: "" });
  const [editStory, setEditStory] = useState<Story | null>(null);
  const [newTag, setNewTag] = useState("");
  const [newBrand, setNewBrand] = useState("");
  const [newDocument, setNewDocument] = useState("");
  
  // Available brands (in a real app, this would come from the database)
  const availableBrands = ["Brand One", "Brand Two", "Brand Three", "Brand Four", "Brand Five"];
  
  // Event Handlers
  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.location) {
      const id = Math.max(0, ...events.map(e => e.id)) + 1;
      setEvents([...events, { id, ...newEvent }]);
      setNewEvent({ 
        title: "", 
        date: "", 
        location: "", 
        description: "",
        documents: [],
        taggedBrands: [],
        sendToBuyers: false,
        sendToBrands: false
      });
      toast({
        title: "Event Created",
        description: "The new event has been added successfully."
      });
    }
  };

  const handleUpdateEvent = () => {
    if (editEvent && editEvent.title && editEvent.date && editEvent.location) {
      setEvents(events.map(event => event.id === editEvent.id ? editEvent : event));
      setEditEvent(null);
      toast({
        title: "Event Updated",
        description: "The event has been updated successfully."
      });
    }
  };

  const handleAddStory = () => {
    if (newStory.title && newStory.publishDate) {
      const id = Math.max(0, ...curatedStories.map(s => s.id)) + 1;
      setCuratedStories([...curatedStories, { id, ...newStory }]);
      setNewStory({ title: "", publishDate: "", tags: [], content: "" });
      toast({
        title: "Story Created",
        description: "The new story has been added successfully."
      });
    }
  };

  const handleUpdateStory = () => {
    if (editStory && editStory.title && editStory.publishDate) {
      setCuratedStories(curatedStories.map(story => 
        story.id === editStory.id ? editStory : story
      ));
      setEditStory(null);
      toast({
        title: "Story Updated",
        description: "The story has been updated successfully."
      });
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && editStory) {
      if (!editStory.tags.includes(newTag.trim())) {
        setEditStory({
          ...editStory,
          tags: [...editStory.tags, newTag.trim()]
        });
      }
      setNewTag("");
    }
  };

  const handleDeleteTag = (tagToDelete: string) => {
    if (editStory) {
      setEditStory({
        ...editStory,
        tags: editStory.tags.filter(tag => tag !== tagToDelete)
      });
    }
  };

  const handleAddBrand = () => {
    if (newBrand.trim()) {
      if (editEvent && !editEvent.taggedBrands?.includes(newBrand.trim())) {
        setEditEvent({
          ...editEvent,
          taggedBrands: [...(editEvent.taggedBrands || []), newBrand.trim()]
        });
      } else if (!editEvent && !newEvent.taggedBrands?.includes(newBrand.trim())) {
        setNewEvent({
          ...newEvent,
          taggedBrands: [...(newEvent.taggedBrands || []), newBrand.trim()]
        });
      }
      setNewBrand("");
    }
  };

  const handleDeleteBrand = (brandToDelete: string, isEditing: boolean) => {
    if (isEditing && editEvent) {
      setEditEvent({
        ...editEvent,
        taggedBrands: editEvent.taggedBrands?.filter(brand => brand !== brandToDelete) || []
      });
    } else if (!isEditing) {
      setNewEvent({
        ...newEvent,
        taggedBrands: newEvent.taggedBrands?.filter(brand => brand !== brandToDelete) || []
      });
    }
  };

  const handleAddDocument = (isEditing: boolean) => {
    if (newDocument.trim()) {
      if (isEditing && editEvent) {
        setEditEvent({
          ...editEvent,
          documents: [...(editEvent.documents || []), newDocument.trim()]
        });
      } else if (!isEditing) {
        setNewEvent({
          ...newEvent,
          documents: [...(newEvent.documents || []), newDocument.trim()]
        });
      }
      setNewDocument("");
    }
  };

  const handleDeleteDocument = (docToDelete: string, isEditing: boolean) => {
    if (isEditing && editEvent) {
      setEditEvent({
        ...editEvent,
        documents: editEvent.documents?.filter(doc => doc !== docToDelete) || []
      });
    } else if (!isEditing) {
      setNewEvent({
        ...newEvent,
        documents: newEvent.documents?.filter(doc => doc !== docToDelete) || []
      });
    }
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-4xl md:text-6xl uppercase font-thin mb-6">User Management</h1>
      
      <Tabs defaultValue="events" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="curated">Curated</TabsTrigger>
        </TabsList>
        
        <TabsContent value="events" className="space-y-4">  
          {/* Events Management Section */}
          <Card className="p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Events List</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-black text-white border-none">
                    + Add Event
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add New Event</DialogTitle>
                    <DialogDescription>
                      Create a new event to share with brands and buyers.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    {/* Basic Event Details */}
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="event-title" className="text-right">
                        Title
                      </Label>
                      <Input
                        id="event-title"
                        className="col-span-3"
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="event-date" className="text-right">
                        Date
                      </Label>
                      <Input
                        id="event-date"
                        type="date"
                        className="col-span-3"
                        value={newEvent.date}
                        onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="event-location" className="text-right">
                        Location
                      </Label>
                      <Input
                        id="event-location"
                        className="col-span-3"
                        value={newEvent.location}
                        onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                      />
                    </div>
                    
                    {/* Description Field */}
                    <div className="grid grid-cols-4 items-start gap-4">
                      <Label htmlFor="event-description" className="text-right pt-2">
                        Description
                      </Label>
                      <Textarea
                        id="event-description"
                        className="col-span-3"
                        rows={4}
                        placeholder="Enter event description"
                        value={newEvent.description || ""}
                        onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                      />
                    </div>
                    
                    {/* Attached Documents */}
                    <div className="grid grid-cols-4 items-start gap-4">
                      <Label className="text-right pt-2">
                        Attached Documents
                      </Label>
                      <div className="col-span-3 space-y-2">
                        <div className="flex flex-wrap gap-2">
                          {newEvent.documents?.map((doc, index) => (
                            <div key={index} className="bg-gray-100 text-xs px-2 py-1 rounded flex items-center gap-1">
                              <span className="flex items-center">
                                {doc.toLowerCase().endsWith('.jpg') || doc.toLowerCase().endsWith('.png') ? 
                                  <FileImage className="h-3 w-3 mr-1" /> : 
                                  <FileText className="h-3 w-3 mr-1" />
                                }
                                {doc}
                              </span>
                              <button
                                type="button"
                                className="text-gray-500 hover:text-gray-700"
                                onClick={() => handleDeleteDocument(doc, false)}
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Document name (e.g., event-flyer.pdf)"
                            className="flex-1"
                            value={newDocument}
                            onChange={(e) => setNewDocument(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && newDocument.trim()) {
                                e.preventDefault();
                                handleAddDocument(false);
                              }
                            }}
                          />
                          <Button 
                            type="button" 
                            variant="outline"
                            onClick={() => handleAddDocument(false)}
                          >
                            <PaperclipIcon className="h-4 w-4 mr-1" /> Add
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Tag Brands */}
                    <div className="grid grid-cols-4 items-start gap-4">
                      <Label className="text-right pt-2">
                        Tag Brands
                      </Label>
                      <div className="col-span-3 space-y-2">
                        <div className="flex flex-wrap gap-2">
                          {newEvent.taggedBrands?.map((brand, index) => (
                            <div key={index} className="bg-gray-100 text-xs px-2 py-1 rounded flex items-center gap-1">
                              <span>{brand}</span>
                              <button
                                type="button"
                                className="text-gray-500 hover:text-gray-700"
                                onClick={() => handleDeleteBrand(brand, false)}
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Select 
                            value={newBrand} 
                            onValueChange={setNewBrand}
                          >
                            <SelectTrigger className="flex-1">
                              <SelectValue placeholder="Select brand" />
                            </SelectTrigger>
                            <SelectContent>
                              {availableBrands.map((brand) => (
                                <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Button 
                            type="button" 
                            variant="outline"
                            onClick={handleAddBrand}
                            disabled={!newBrand}
                          >
                            <Tag className="h-4 w-4 mr-1" /> Add
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Send To Options */}
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">
                        Send To
                      </Label>
                      <div className="col-span-3 space-y-2">
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id="send-buyers"
                            checked={newEvent.sendToBuyers}
                            onCheckedChange={(checked) => setNewEvent({...newEvent, sendToBuyers: checked})}
                          />
                          <Label htmlFor="send-buyers">Send to Buyers</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id="send-brands"
                            checked={newEvent.sendToBrands}
                            onCheckedChange={(checked) => setNewEvent({...newEvent, sendToBrands: checked})}
                          />
                          <Label htmlFor="send-brands">Send to Brands</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline" className="border-gray-300">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button className="bg-black text-white border-none hover:underline" onClick={handleAddEvent}>
                        Save Event
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event Title</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.title}</TableCell>
                    <TableCell>{event.date}</TableCell>
                    <TableCell>{event.location}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        {/* Share Dialog */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Share Event</DialogTitle>
                            </DialogHeader>
                            <div className="py-4">
                              <p className="text-sm text-gray-500 mb-4">Choose who to share this event with:</p>
                              <div className="space-y-2">
                                <label className="flex items-center space-x-2">
                                  <input type="checkbox" className="rounded border-gray-300" />
                                  <span>All Brands</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                  <input type="checkbox" className="rounded border-gray-300" />
                                  <span>All Buyers</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                  <input type="checkbox" className="rounded border-gray-300" />
                                  <span>Selected Brands Only</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                  <input type="checkbox" className="rounded border-gray-300" />
                                  <span>Selected Buyers Only</span>
                                </label>
                              </div>
                            </div>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="outline" className="border-gray-300">Cancel</Button>
                              </DialogClose>
                              <DialogClose asChild>
                                <Button className="bg-black text-white border-none hover:underline">
                                  Share Event
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        
                        {/* Edit Dialog */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0"
                              onClick={() => setEditEvent({...event})}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          {editEvent && (
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Edit Event</DialogTitle>
                                <DialogDescription>
                                  Update event details below.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="edit-title" className="text-right">
                                    Title
                                  </Label>
                                  <Input
                                    id="edit-title"
                                    className="col-span-3"
                                    value={editEvent.title}
                                    onChange={(e) => setEditEvent({...editEvent, title: e.target.value})}
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="edit-date" className="text-right">
                                    Date
                                  </Label>
                                  <Input
                                    id="edit-date"
                                    type="date"
                                    className="col-span-3"
                                    value={editEvent.date}
                                    onChange={(e) => setEditEvent({...editEvent, date: e.target.value})}
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="edit-location" className="text-right">
                                    Location
                                  </Label>
                                  <Input
                                    id="edit-location"
                                    className="col-span-3"
                                    value={editEvent.location}
                                    onChange={(e) => setEditEvent({...editEvent, location: e.target.value})}
                                  />
                                </div>
                                
                                {/* Description Field for Edit */}
                                <div className="grid grid-cols-4 items-start gap-4">
                                  <Label htmlFor="edit-description" className="text-right pt-2">
                                    Description
                                  </Label>
                                  <Textarea
                                    id="edit-description"
                                    className="col-span-3"
                                    rows={4}
                                    placeholder="Enter event description"
                                    value={editEvent.description || ""}
                                    onChange={(e) => setEditEvent({...editEvent, description: e.target.value})}
                                  />
                                </div>
                                
                                {/* Attached Documents for Edit */}
                                <div className="grid grid-cols-4 items-start gap-4">
                                  <Label className="text-right pt-2">
                                    Attached Documents
                                  </Label>
                                  <div className="col-span-3 space-y-2">
                                    <div className="flex flex-wrap gap-2">
                                      {editEvent.documents?.map((doc, index) => (
                                        <div key={index} className="bg-gray-100 text-xs px-2 py-1 rounded flex items-center gap-1">
                                          <span className="flex items-center">
                                            {doc.toLowerCase().endsWith('.jpg') || doc.toLowerCase().endsWith('.png') ? 
                                              <FileImage className="h-3 w-3 mr-1" /> : 
                                              <FileText className="h-3 w-3 mr-1" />
                                            }
                                            {doc}
                                          </span>
                                          <button
                                            type="button"
                                            className="text-gray-500 hover:text-gray-700"
                                            onClick={() => handleDeleteDocument(doc, true)}
                                          >
                                            <X className="h-3 w-3" />
                                          </button>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="flex gap-2">
                                      <Input
                                        placeholder="Document name (e.g., event-flyer.pdf)"
                                        className="flex-1"
                                        value={newDocument}
                                        onChange={(e) => setNewDocument(e.target.value)}
                                        onKeyDown={(e) => {
                                          if (e.key === 'Enter' && newDocument.trim()) {
                                            e.preventDefault();
                                            handleAddDocument(true);
                                          }
                                        }}
                                      />
                                      <Button 
                                        type="button" 
                                        variant="outline"
                                        onClick={() => handleAddDocument(true)}
                                      >
                                        <PaperclipIcon className="h-4 w-4 mr-1" /> Add
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                                
                                {/* Tag Brands for Edit */}
                                <div className="grid grid-cols-4 items-start gap-4">
                                  <Label className="text-right pt-2">
                                    Tag Brands
                                  </Label>
                                  <div className="col-span-3 space-y-2">
                                    <div className="flex flex-wrap gap-2">
                                      {editEvent.taggedBrands?.map((brand, index) => (
                                        <div key={index} className="bg-gray-100 text-xs px-2 py-1 rounded flex items-center gap-1">
                                          <span>{brand}</span>
                                          <button
                                            type="button"
                                            className="text-gray-500 hover:text-gray-700"
                                            onClick={() => handleDeleteBrand(brand, true)}
                                          >
                                            <X className="h-3 w-3" />
                                          </button>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="flex gap-2">
                                      <Select 
                                        value={newBrand} 
                                        onValueChange={setNewBrand}
                                      >
                                        <SelectTrigger className="flex-1">
                                          <SelectValue placeholder="Select brand" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {availableBrands.map((brand) => (
                                            <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                      <Button 
                                        type="button" 
                                        variant="outline"
                                        onClick={handleAddBrand}
                                        disabled={!newBrand}
                                      >
                                        <Tag className="h-4 w-4 mr-1" /> Add
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                                
                                {/* Send To Options for Edit */}
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label className="text-right">
                                    Send To
                                  </Label>
                                  <div className="col-span-3 space-y-2">
                                    <div className="flex items-center space-x-2">
                                      <Switch 
                                        id="edit-send-buyers"
                                        checked={editEvent.sendToBuyers || false}
                                        onCheckedChange={(checked) => setEditEvent({...editEvent, sendToBuyers: checked})}
                                      />
                                      <Label htmlFor="edit-send-buyers">Send to Buyers</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Switch 
                                        id="edit-send-brands"
                                        checked={editEvent.sendToBrands || false}
                                        onCheckedChange={(checked) => setEditEvent({...editEvent, sendToBrands: checked})}
                                      />
                                      <Label htmlFor="edit-send-brands">Send to Brands</Label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <DialogFooter>
                                <DialogClose asChild>
                                  <Button variant="outline" className="border-gray-300">Cancel</Button>
                                </DialogClose>
                                <DialogClose asChild>
                                  <Button 
                                    className="bg-black text-white border-none hover:underline"
                                    onClick={handleUpdateEvent}
                                  >
                                    Update Event
                                  </Button>
                                </DialogClose>
                              </DialogFooter>
                            </DialogContent>
                          )}
                        </Dialog>
                        
                        {/* Delete Dialog */}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the event
                                "{event.title}" and remove it from the system.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="border-gray-300">Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-red-500 text-white hover:bg-red-600"
                                onClick={() => {
                                  setEvents(events.filter(e => e.id !== event.id));
                                  toast({
                                    title: "Event Deleted",
                                    description: "The event has been permanently removed.",
                                    variant: "destructive"
                                  });
                                }}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
        
        <TabsContent value="curated" className="space-y-4">  
          {/* Curated Stories Management Section */}
          <Card className="p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Curated Stories</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-black text-white border-none">
                    + Add Story
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add New Curated Story</DialogTitle>
                    <DialogDescription>
                      Create a new story to share with brands and buyers.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="story-title" className="text-right">
                        Title
                      </Label>
                      <Input
                        id="story-title"
                        className="col-span-3"
                        value={newStory.title}
                        onChange={(e) => setNewStory({...newStory, title: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="story-date" className="text-right">
                        Publish Date
                      </Label>
                      <Input
                        id="story-date"
                        type="date"
                        className="col-span-3"
                        value={newStory.publishDate}
                        onChange={(e) => setNewStory({...newStory, publishDate: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                      <Label htmlFor="story-content" className="text-right pt-2">
                        Content
                      </Label>
                      <Textarea
                        id="story-content"
                        className="col-span-3"
                        rows={5}
                        value={newStory.content}
                        onChange={(e) => setNewStory({...newStory, content: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">
                        Tags
                      </Label>
                      <div className="col-span-3 space-y-2">
                        <div className="flex flex-wrap gap-2">
                          {newStory.tags.map((tag, index) => (
                            <div key={index} className="bg-gray-100 text-xs px-2 py-1 rounded flex items-center gap-1">
                              <span>{tag}</span>
                              <button
                                type="button"
                                className="text-gray-500 hover:text-gray-700"
                                onClick={() => setNewStory({
                                  ...newStory,
                                  tags: newStory.tags.filter((_, i) => i !== index)
                                })}
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Input
                            placeholder="New tag"
                            className="flex-1"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && newTag.trim()) {
                                e.preventDefault();
                                if (!newStory.tags.includes(newTag.trim())) {
                                  setNewStory({
                                    ...newStory,
                                    tags: [...newStory.tags, newTag.trim()]
                                  });
                                }
                                setNewTag("");
                              }
                            }}
                          />
                          <Button 
                            type="button" 
                            variant="outline"
                            onClick={() => {
                              if (newTag.trim() && !newStory.tags.includes(newTag.trim())) {
                                setNewStory({
                                  ...newStory,
                                  tags: [...newStory.tags, newTag.trim()]
                                });
                                setNewTag("");
                              }
                            }}
                          >
                            Add Tag
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline" className="border-gray-300">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button className="bg-black text-white border-none hover:underline" onClick={handleAddStory}>
                        Save Story
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Story Title</TableHead>
                  <TableHead>Publish Date</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {curatedStories.map((story) => (
                  <TableRow key={story.id}>
                    <TableCell className="font-medium">{story.title}</TableCell>
                    <TableCell>{story.publishDate}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {story.tags.map((tag, index) => (
                          <span 
                            key={index} 
                            className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        {/* Tag Brands Dialog */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Tag className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Tag Brands</DialogTitle>
                            </DialogHeader>
                            <div className="py-4">
                              <p className="text-sm text-gray-500 mb-4">Select brands to tag in this story:</p>
                              <div className="space-y-2">
                                <label className="flex items-center space-x-2">
                                  <input type="checkbox" className="rounded border-gray-300" />
                                  <span>Brand One</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                  <input type="checkbox" className="rounded border-gray-300" />
                                  <span>Brand Two</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                  <input type="checkbox" className="rounded border-gray-300" />
                                  <span>Brand Three</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                  <input type="checkbox" className="rounded border-gray-300" />
                                  <span>Brand Four</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                  <input type="checkbox" className="rounded border-gray-300" />
                                  <span>Brand Five</span>
                                </label>
                              </div>
                            </div>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="outline" className="border-gray-300">Cancel</Button>
                              </DialogClose>
                              <DialogClose asChild>
                                <Button className="bg-black text-white border-none hover:underline">
                                  Save Tags
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        
                        {/* Share Dialog */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Share with Buyers</DialogTitle>
                            </DialogHeader>
                            <div className="py-4">
                              <p className="text-sm text-gray-500 mb-4">Choose buyers to share this story with:</p>
                              <div className="space-y-2">
                                <label className="flex items-center space-x-2">
                                  <input type="checkbox" className="rounded border-gray-300" />
                                  <span>All Buyers</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                  <input type="checkbox" className="rounded border-gray-300" />
                                  <span>Selected Buyers:</span>
                                </label>
                              </div>
                              <Select>
                                <SelectTrigger className="w-full mt-2">
                                  <SelectValue placeholder="Select buyers" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="buyer1">Buyer One</SelectItem>
                                  <SelectItem value="buyer2">Buyer Two</SelectItem>
                                  <SelectItem value="buyer3">Buyer Three</SelectItem>
                                  <SelectItem value="buyer4">Buyer Four</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="outline" className="border-gray-300">Cancel</Button>
                              </DialogClose>
                              <DialogClose asChild>
                                <Button className="bg-black text-white border-none hover:underline">
                                  Share Story
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        
                        {/* Edit Dialog */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0" 
                              onClick={() => setEditStory({...story})}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          {editStory && (
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Edit Story</DialogTitle>
                                <DialogDescription>
                                  Update story details below.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="edit-story-title" className="text-right">
                                    Title
                                  </Label>
                                  <Input
                                    id="edit-story-title"
                                    className="col-span-3"
                                    value={editStory.title}
                                    onChange={(e) => setEditStory({...editStory, title: e.target.value})}
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="edit-story-date" className="text-right">
                                    Publish Date
                                  </Label>
                                  <Input
                                    id="edit-story-date"
                                    type="date"
                                    className="col-span-3"
                                    value={editStory.publishDate}
                                    onChange={(e) => setEditStory({...editStory, publishDate: e.target.value})}
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-start gap-4">
                                  <Label htmlFor="edit-story-content" className="text-right pt-2">
                                    Content
                                  </Label>
                                  <Textarea
                                    id="edit-story-content"
                                    className="col-span-3"
                                    rows={5}
                                    value={editStory.content || ""}
                                    onChange={(e) => setEditStory({...editStory, content: e.target.value})}
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label className="text-right">
                                    Tags
                                  </Label>
                                  <div className="col-span-3 space-y-2">
                                    <div className="flex flex-wrap gap-2">
                                      {editStory.tags.map((tag, index) => (
                                        <div key={index} className="bg-gray-100 text-xs px-2 py-1 rounded flex items-center gap-1">
                                          <span>{tag}</span>
                                          <button
                                            type="button"
                                            className="text-gray-500 hover:text-gray-700"
                                            onClick={() => handleDeleteTag(tag)}
                                          >
                                            ×
                                          </button>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="flex gap-2">
                                      <Input
                                        placeholder="New tag"
                                        className="flex-1"
                                        value={newTag}
                                        onChange={(e) => setNewTag(e.target.value)}
                                        onKeyDown={(e) => {
                                          if (e.key === 'Enter' && newTag.trim()) {
                                            e.preventDefault();
                                            handleAddTag();
                                          }
                                        }}
                                      />
                                      <Button 
                                        type="button" 
                                        variant="outline"
                                        onClick={handleAddTag}
                                      >
                                        Add Tag
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <DialogFooter>
                                <DialogClose asChild>
                                  <Button variant="outline" className="border-gray-300">Cancel</Button>
                                </DialogClose>
                                <DialogClose asChild>
                                  <Button 
                                    className="bg-black text-white border-none hover:underline"
                                    onClick={handleUpdateStory}
                                  >
                                    Update Story
                                  </Button>
                                </DialogClose>
                              </DialogFooter>
                            </DialogContent>
                          )}
                        </Dialog>
                        
                        {/* Delete Dialog */}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the story
                                "{story.title}" and remove it from the system.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="border-gray-300">Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-red-500 text-white hover:bg-red-600"
                                onClick={() => {
                                  setCuratedStories(curatedStories.filter(s => s.id !== story.id));
                                  toast({
                                    title: "Story Deleted",
                                    description: "The story has been permanently removed.",
                                    variant: "destructive"
                                  });
                                }}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPages;
