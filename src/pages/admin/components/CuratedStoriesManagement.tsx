
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit, Trash2, Tag, Image, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Story {
  id: number;
  title: string;
  excerpt: string;
  status: "published" | "draft";
  lastUpdated: string;
  taggedBrands?: string[];
  content?: string;
  media?: {name: string, type: "image" | "video"}[];
}

interface CuratedStoriesManagementProps {
  availableBrands: string[];
}

const CuratedStoriesManagement = ({ availableBrands }: CuratedStoriesManagementProps) => {
  const { toast } = useToast();
  
  // Stories State
  const [stories, setStories] = useState<Story[]>([
    { id: 1, title: "Latest Men's Fashion Trends", excerpt: "Discover the latest trends in men's fashion for the upcoming season", status: "published", lastUpdated: "2025-03-15" },
    { id: 2, title: "Women's Summer Collection", excerpt: "Explore our curated collection of summer fashion for women", status: "published", lastUpdated: "2025-03-10" },
    { id: 3, title: "Sustainable Fashion Guide", excerpt: "Learn how to shop sustainably for your fashion needs", status: "draft", lastUpdated: "2025-03-05" },
  ]);
  
  // Form State
  const [newStory, setNewStory] = useState<Omit<Story, 'id'>>({
    title: "",
    excerpt: "",
    content: "",
    status: "draft",
    lastUpdated: new Date().toISOString().split('T')[0],
    taggedBrands: [],
    media: []
  });

  const [editStory, setEditStory] = useState<Story | null>(null);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [mediaName, setMediaName] = useState("");
  const [mediaType, setMediaType] = useState<"image" | "video">("image");

  // Event Handlers
  const handleAddStory = () => {
    if (newStory.title) {
      const id = Math.max(0, ...stories.map(s => s.id)) + 1;
      setStories([...stories, { id, ...newStory }]);
      setNewStory({
        title: "",
        excerpt: "",
        content: "",
        status: "draft",
        lastUpdated: new Date().toISOString().split('T')[0],
        taggedBrands: [],
        media: []
      });
      toast({
        title: "Story Created",
        description: "The new story has been added successfully."
      });
    }
  };

  const handleUpdateStory = () => {
    if (editStory && editStory.title) {
      setStories(stories.map(story => story.id === editStory.id ? {
        ...editStory,
        lastUpdated: new Date().toISOString().split('T')[0]
      } : story));
      setEditStory(null);
      toast({
        title: "Story Updated",
        description: "The story has been updated successfully."
      });
    }
  };

  const handleDeleteStory = (id: number) => {
    setStories(stories.filter(story => story.id !== id));
    toast({
      title: "Story Deleted",
      description: "The story has been deleted successfully.",
      variant: "destructive"
    });
  };

  const handleAddBrand = (isEditing: boolean = false) => {
    if (selectedBrand) {
      if (isEditing && editStory) {
        const updatedBrands = editStory.taggedBrands || [];
        if (!updatedBrands.includes(selectedBrand)) {
          setEditStory({
            ...editStory,
            taggedBrands: [...updatedBrands, selectedBrand]
          });
        }
      } else {
        const updatedBrands = newStory.taggedBrands || [];
        if (!updatedBrands.includes(selectedBrand)) {
          setNewStory({
            ...newStory,
            taggedBrands: [...updatedBrands, selectedBrand]
          });
        }
      }
      setSelectedBrand("");
    }
  };

  const handleRemoveBrand = (brand: string, isEditing: boolean = false) => {
    if (isEditing && editStory) {
      setEditStory({
        ...editStory,
        taggedBrands: (editStory.taggedBrands || []).filter(b => b !== brand)
      });
    } else {
      setNewStory({
        ...newStory,
        taggedBrands: (newStory.taggedBrands || []).filter(b => b !== brand)
      });
    }
  };

  const handleAddMedia = (isEditing: boolean = false) => {
    if (mediaName) {
      if (isEditing && editStory) {
        const updatedMedia = editStory.media || [];
        setEditStory({
          ...editStory,
          media: [...updatedMedia, { name: mediaName, type: mediaType }]
        });
      } else {
        const updatedMedia = newStory.media || [];
        setNewStory({
          ...newStory,
          media: [...updatedMedia, { name: mediaName, type: mediaType }]
        });
      }
      setMediaName("");
    }
  };

  const handleRemoveMedia = (name: string, isEditing: boolean = false) => {
    if (isEditing && editStory) {
      setEditStory({
        ...editStory,
        media: (editStory.media || []).filter(m => m.name !== name)
      });
    } else {
      setNewStory({
        ...newStory,
        media: (newStory.media || []).filter(m => m.name !== name)
      });
    }
  };

  return (
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
              <DialogTitle>Add New Story</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="title" className="text-right font-medium text-sm">
                  Title
                </label>
                <Input
                  id="title"
                  value={newStory.title}
                  onChange={(e) => setNewStory({...newStory, title: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="status" className="text-right font-medium text-sm">
                  Status
                </label>
                <Select
                  value={newStory.status}
                  onValueChange={(value: "published" | "draft") => setNewStory({...newStory, status: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <label htmlFor="excerpt" className="text-right font-medium text-sm pt-2">
                  Excerpt
                </label>
                <Textarea
                  id="excerpt"
                  value={newStory.excerpt}
                  onChange={(e) => setNewStory({...newStory, excerpt: e.target.value})}
                  className="col-span-3"
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <label htmlFor="content" className="text-right font-medium text-sm pt-2">
                  Content
                </label>
                <Textarea
                  id="content"
                  value={newStory.content}
                  onChange={(e) => setNewStory({...newStory, content: e.target.value})}
                  className="col-span-3"
                  rows={6}
                />
              </div>
              
              {/* Tagged Brands Section */}
              <div className="grid grid-cols-4 items-start gap-4">
                <label className="text-right font-medium text-sm pt-2">
                  Tagged Brands
                </label>
                <div className="col-span-3 space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {newStory.taggedBrands?.map((brand, index) => (
                      <div key={index} className="bg-gray-100 text-xs px-2 py-1 rounded flex items-center gap-1">
                        <span>{brand}</span>
                        <button
                          type="button"
                          className="text-gray-500 hover:text-gray-700"
                          onClick={() => handleRemoveBrand(brand)}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Select
                      value={selectedBrand}
                      onValueChange={setSelectedBrand}
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
                      onClick={() => handleAddBrand()}
                      disabled={!selectedBrand}
                    >
                      <Tag className="h-4 w-4 mr-1" /> Add
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Media Section */}
              <div className="grid grid-cols-4 items-start gap-4">
                <label className="text-right font-medium text-sm pt-2">
                  Media
                </label>
                <div className="col-span-3 space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {newStory.media?.map((item, index) => (
                      <div key={index} className="bg-gray-100 text-xs px-2 py-1 rounded flex items-center gap-1">
                        <span>{item.name} ({item.type})</span>
                        <button
                          type="button"
                          className="text-gray-500 hover:text-gray-700"
                          onClick={() => handleRemoveMedia(item.name)}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 items-center">
                    <Input
                      placeholder="Media name"
                      className="flex-1"
                      value={mediaName}
                      onChange={(e) => setMediaName(e.target.value)}
                    />
                    <Select
                      value={mediaType}
                      onValueChange={(value: "image" | "video") => setMediaType(value)}
                    >
                      <SelectTrigger className="w-28">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="image">Image</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleAddMedia()}
                      disabled={!mediaName}
                    >
                      <Image className="h-4 w-4 mr-1" /> Add
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button className="bg-black text-white" onClick={handleAddStory}>
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
            <TableHead>Title</TableHead>
            <TableHead>Excerpt</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stories.map((story) => (
            <TableRow key={story.id}>
              <TableCell className="font-medium">{story.title}</TableCell>
              <TableCell className="max-w-xs truncate">{story.excerpt}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  story.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {story.status}
                </span>
              </TableCell>
              <TableCell>{story.lastUpdated}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
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
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="edit-title" className="text-right font-medium text-sm">
                              Title
                            </label>
                            <Input
                              id="edit-title"
                              value={editStory.title}
                              onChange={(e) => setEditStory({...editStory, title: e.target.value})}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="edit-status" className="text-right font-medium text-sm">
                              Status
                            </label>
                            <Select
                              value={editStory.status}
                              onValueChange={(value: "published" | "draft") => setEditStory({...editStory, status: value})}
                            >
                              <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="published">Published</SelectItem>
                                <SelectItem value="draft">Draft</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-4 items-start gap-4">
                            <label htmlFor="edit-excerpt" className="text-right font-medium text-sm pt-2">
                              Excerpt
                            </label>
                            <Textarea
                              id="edit-excerpt"
                              value={editStory.excerpt}
                              onChange={(e) => setEditStory({...editStory, excerpt: e.target.value})}
                              className="col-span-3"
                              rows={2}
                            />
                          </div>
                          <div className="grid grid-cols-4 items-start gap-4">
                            <label htmlFor="edit-content" className="text-right font-medium text-sm pt-2">
                              Content
                            </label>
                            <Textarea
                              id="edit-content"
                              value={editStory.content || ""}
                              onChange={(e) => setEditStory({...editStory, content: e.target.value})}
                              className="col-span-3"
                              rows={6}
                            />
                          </div>
                          
                          {/* Tagged Brands Section for Edit */}
                          <div className="grid grid-cols-4 items-start gap-4">
                            <label className="text-right font-medium text-sm pt-2">
                              Tagged Brands
                            </label>
                            <div className="col-span-3 space-y-2">
                              <div className="flex flex-wrap gap-2">
                                {editStory.taggedBrands?.map((brand, index) => (
                                  <div key={index} className="bg-gray-100 text-xs px-2 py-1 rounded flex items-center gap-1">
                                    <span>{brand}</span>
                                    <button
                                      type="button"
                                      className="text-gray-500 hover:text-gray-700"
                                      onClick={() => handleRemoveBrand(brand, true)}
                                    >
                                      <X className="h-3 w-3" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                              <div className="flex gap-2">
                                <Select
                                  value={selectedBrand}
                                  onValueChange={setSelectedBrand}
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
                                  onClick={() => handleAddBrand(true)}
                                  disabled={!selectedBrand}
                                >
                                  <Tag className="h-4 w-4 mr-1" /> Add
                                </Button>
                              </div>
                            </div>
                          </div>
                          
                          {/* Media Section for Edit */}
                          <div className="grid grid-cols-4 items-start gap-4">
                            <label className="text-right font-medium text-sm pt-2">
                              Media
                            </label>
                            <div className="col-span-3 space-y-2">
                              <div className="flex flex-wrap gap-2">
                                {editStory.media?.map((item, index) => (
                                  <div key={index} className="bg-gray-100 text-xs px-2 py-1 rounded flex items-center gap-1">
                                    <span>{item.name} ({item.type})</span>
                                    <button
                                      type="button"
                                      className="text-gray-500 hover:text-gray-700"
                                      onClick={() => handleRemoveMedia(item.name, true)}
                                    >
                                      <X className="h-3 w-3" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                              <div className="flex gap-2 items-center">
                                <Input
                                  placeholder="Media name"
                                  className="flex-1"
                                  value={mediaName}
                                  onChange={(e) => setMediaName(e.target.value)}
                                />
                                <Select
                                  value={mediaType}
                                  onValueChange={(value: "image" | "video") => setMediaType(value)}
                                >
                                  <SelectTrigger className="w-28">
                                    <SelectValue placeholder="Type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="image">Image</SelectItem>
                                    <SelectItem value="video">Video</SelectItem>
                                  </SelectContent>
                                </Select>
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() => handleAddMedia(true)}
                                  disabled={!mediaName}
                                >
                                  <Image className="h-4 w-4 mr-1" /> Add
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button className="bg-black text-white" onClick={handleUpdateStory}>
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
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the story.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-500 text-white hover:bg-red-600"
                          onClick={() => handleDeleteStory(story.id)}
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
  );
};

export default CuratedStoriesManagement;
