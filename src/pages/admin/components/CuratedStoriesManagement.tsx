
import { useState } from "react";
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
import { Edit, Trash2, Tag, X, ImageIcon, Film } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export interface Media {
  id: string;
  type: 'image' | 'video';
  url: string;
  brandName?: string;
  caption?: string;
}

export interface Story {
  id: number;
  title: string;
  publishDate: string;
  tags: string[];
  content?: string;
  taggedBrands?: string[];
  media?: Media[];
}

interface CuratedStoriesManagementProps {
  availableBrands: string[];
}

const CuratedStoriesManagement = ({ availableBrands }: CuratedStoriesManagementProps) => {
  const { toast } = useToast();
  
  // Story State
  const [curatedStories, setCuratedStories] = useState<Story[]>([
    { id: 1, title: "Emerging Designers 2025", publishDate: "2025-05-10", tags: ["Sustainable", "New Talent"] },
    { id: 2, title: "Ethical Fashion Trends", publishDate: "2025-06-22", tags: ["Ethical", "Sustainable"] },
    { id: 3, title: "Summer Accessories Guide", publishDate: "2025-07-15", tags: ["Accessories", "Trending"] }
  ]);

  // Form State
  const [newStory, setNewStory] = useState<Omit<Story, 'id'>>({ 
    title: "", 
    publishDate: "", 
    tags: [], 
    content: "",
    taggedBrands: [],
    media: [] 
  });
  
  const [editStory, setEditStory] = useState<Story | null>(null);
  const [newTag, setNewTag] = useState("");
  const [newBrand, setNewBrand] = useState("");
  const [newMediaUrl, setNewMediaUrl] = useState("");
  const [newMediaType, setNewMediaType] = useState<"image" | "video">("image");
  const [newMediaCaption, setNewMediaCaption] = useState("");
  const [newMediaBrand, setNewMediaBrand] = useState("");

  // Story Handlers
  const handleAddStory = () => {
    if (newStory.title && newStory.publishDate) {
      const id = Math.max(0, ...curatedStories.map(s => s.id)) + 1;
      setCuratedStories([...curatedStories, { id, ...newStory }]);
      setNewStory({ 
        title: "", 
        publishDate: "", 
        tags: [], 
        content: "", 
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

  const handleAddBrand = (event: React.MouseEvent<HTMLButtonElement>, isEditing: boolean = false) => {
    if (newBrand.trim()) {
      if (isEditing && editStory && !editStory.taggedBrands?.includes(newBrand.trim())) {
        setEditStory({
          ...editStory,
          taggedBrands: [...(editStory.taggedBrands || []), newBrand.trim()]
        });
      } else if (!isEditing && !newStory.taggedBrands?.includes(newBrand.trim())) {
        setNewStory({
          ...newStory,
          taggedBrands: [...(newStory.taggedBrands || []), newBrand.trim()]
        });
      }
      setNewBrand("");
    }
  };

  const handleDeleteBrand = (brandToDelete: string, isEditing: boolean) => {
    if (isEditing && editStory) {
      setEditStory({
        ...editStory,
        taggedBrands: editStory.taggedBrands?.filter(brand => brand !== brandToDelete) || []
      });
    } else if (!isEditing) {
      setNewStory({
        ...newStory,
        taggedBrands: newStory.taggedBrands?.filter(brand => brand !== brandToDelete) || []
      });
    }
  };

  const handleAddMedia = (isEditing: boolean) => {
    if (newMediaUrl.trim()) {
      const newMedia = {
        id: Date.now().toString(),
        type: newMediaType,
        url: newMediaUrl.trim(),
        brandName: newMediaBrand || undefined,
        caption: newMediaCaption.trim() || undefined
      };
      
      if (isEditing && editStory) {
        setEditStory({
          ...editStory,
          media: [...(editStory.media || []), newMedia]
        });
      } else if (!isEditing) {
        setNewStory({
          ...newStory,
          media: [...(newStory.media || []), newMedia]
        });
      }
      
      setNewMediaUrl("");
      setNewMediaCaption("");
      setNewMediaBrand("");
    }
  };

  const handleDeleteMedia = (mediaId: string, isEditing: boolean) => {
    if (isEditing && editStory) {
      setEditStory({
        ...editStory,
        media: editStory.media?.filter(m => m.id !== mediaId) || []
      });
    } else if (!isEditing) {
      setNewStory({
        ...newStory,
        media: newStory.media?.filter(m => m.id !== mediaId) || []
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
              <DialogTitle>Add New Curated Story</DialogTitle>
              <DialogDescription>
                Create a new curated story to showcase brands and products.
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
                <Label htmlFor="publish-date" className="text-right">
                  Publish Date
                </Label>
                <Input
                  id="publish-date"
                  type="date"
                  className="col-span-3"
                  value={newStory.publishDate}
                  onChange={(e) => setNewStory({...newStory, publishDate: e.target.value})}
                />
              </div>
              
              {/* Content Field */}
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="story-content" className="text-right pt-2">
                  Content
                </Label>
                <Textarea
                  id="story-content"
                  className="col-span-3"
                  rows={6}
                  placeholder="Enter story content"
                  value={newStory.content || ""}
                  onChange={(e) => setNewStory({...newStory, content: e.target.value})}
                />
              </div>

              {/* Tag Brands for Story */}
              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right pt-2">
                  Tag Brands
                </Label>
                <div className="col-span-3 space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {newStory.taggedBrands?.map((brand, index) => (
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
                      onClick={(e) => handleAddBrand(e, false)}
                      disabled={!newBrand}
                    >
                      <Tag className="h-4 w-4 mr-1" /> Add
                    </Button>
                  </div>
                </div>
              </div>

              {/* Add Media */}
              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right pt-2">
                  Media
                </Label>
                <div className="col-span-3 space-y-4">
                  <div className="flex flex-wrap gap-4">
                    {newStory.media?.map((media) => (
                      <div key={media.id} className="relative border rounded p-2 w-40">
                        <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden mb-2">
                          {media.type === 'image' ? (
                            <div className="relative w-full h-full">
                              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                <ImageIcon className="h-8 w-8" />
                              </div>
                              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1">
                                Image
                              </div>
                            </div>
                          ) : (
                            <div className="relative w-full h-full">
                              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                <Film className="h-8 w-8" />
                              </div>
                              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1">
                                Video
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="text-xs truncate mb-1" title={media.url}>{media.url}</div>
                        {media.caption && (
                          <div className="text-xs text-gray-500 truncate mb-1" title={media.caption}>
                            {media.caption}
                          </div>
                        )}
                        {media.brandName && (
                          <div className="text-xs bg-gray-100 px-1 py-0.5 rounded inline-block mb-1">
                            {media.brandName}
                          </div>
                        )}
                        <button
                          type="button"
                          className="absolute top-1 right-1 bg-white rounded-full p-0.5 shadow text-gray-500 hover:text-red-500"
                          onClick={() => handleDeleteMedia(media.id, false)}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex gap-2">
                      <Select 
                        value={newMediaType} 
                        onValueChange={(value: "image" | "video") => setNewMediaType(value)}
                      >
                        <SelectTrigger className="w-24">
                          <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="image">Image</SelectItem>
                          <SelectItem value="video">Video</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        placeholder="Media URL"
                        className="flex-1"
                        value={newMediaUrl}
                        onChange={(e) => setNewMediaUrl(e.target.value)}
                      />
                    </div>
                    <Input
                      placeholder="Caption (optional)"
                      value={newMediaCaption}
                      onChange={(e) => setNewMediaCaption(e.target.value)}
                    />
                    <div className="flex gap-2">
                      <Select 
                        value={newMediaBrand} 
                        onValueChange={setNewMediaBrand}
                      >
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="Select brand (optional)" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">No brand</SelectItem>
                          {availableBrands.map((brand) => (
                            <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => handleAddMedia(false)}
                        disabled={!newMediaUrl.trim()}
                      >
                        Add Media
                      </Button>
                    </div>
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
            <TableHead>Title</TableHead>
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
                    <span key={index} className="bg-gray-100 text-xs px-1.5 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
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
                          <DialogTitle>Edit Curated Story</DialogTitle>
                          <DialogDescription>
                            Update the story details below.
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
                            <Label htmlFor="edit-publish-date" className="text-right">
                              Publish Date
                            </Label>
                            <Input
                              id="edit-publish-date"
                              type="date"
                              className="col-span-3"
                              value={editStory.publishDate}
                              onChange={(e) => setEditStory({...editStory, publishDate: e.target.value})}
                            />
                          </div>

                          {/* Content Field for Edit */}
                          <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="edit-story-content" className="text-right pt-2">
                              Content
                            </Label>
                            <Textarea
                              id="edit-story-content"
                              className="col-span-3"
                              rows={6}
                              placeholder="Enter story content"
                              value={editStory.content || ""}
                              onChange={(e) => setEditStory({...editStory, content: e.target.value})}
                            />
                          </div>
                          
                          {/* Tags Field for Edit */}
                          <div className="grid grid-cols-4 items-start gap-4">
                            <Label className="text-right pt-2">
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
                                      <X className="h-3 w-3" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                              <div className="flex gap-2">
                                <Input
                                  placeholder="Add tag"
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
                                  disabled={!newTag.trim()}
                                >
                                  Add Tag
                                </Button>
                              </div>
                            </div>
                          </div>

                          {/* Tag Brands for Edit Story */}
                          <div className="grid grid-cols-4 items-start gap-4">
                            <Label className="text-right pt-2">
                              Tag Brands
                            </Label>
                            <div className="col-span-3 space-y-2">
                              <div className="flex flex-wrap gap-2">
                                {editStory.taggedBrands?.map((brand, index) => (
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
                                  onClick={(e) => handleAddBrand(e, true)}
                                  disabled={!newBrand}
                                >
                                  <Tag className="h-4 w-4 mr-1" /> Add
                                </Button>
                              </div>
                            </div>
                          </div>

                          {/* Edit Media */}
                          <div className="grid grid-cols-4 items-start gap-4">
                            <Label className="text-right pt-2">
                              Media
                            </Label>
                            <div className="col-span-3 space-y-4">
                              <div className="flex flex-wrap gap-4">
                                {editStory.media?.map((media) => (
                                  <div key={media.id} className="relative border rounded p-2 w-40">
                                    <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden mb-2">
                                      {media.type === 'image' ? (
                                        <div className="relative w-full h-full">
                                          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                            <ImageIcon className="h-8 w-8" />
                                          </div>
                                          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1">
                                            Image
                                          </div>
                                        </div>
                                      ) : (
                                        <div className="relative w-full h-full">
                                          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                            <Film className="h-8 w-8" />
                                          </div>
                                          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1">
                                            Video
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                    <div className="text-xs truncate mb-1" title={media.url}>{media.url}</div>
                                    {media.caption && (
                                      <div className="text-xs text-gray-500 truncate mb-1" title={media.caption}>
                                        {media.caption}
                                      </div>
                                    )}
                                    {media.brandName && (
                                      <div className="text-xs bg-gray-100 px-1 py-0.5 rounded inline-block mb-1">
                                        {media.brandName}
                                      </div>
                                    )}
                                    <button
                                      type="button"
                                      className="absolute top-1 right-1 bg-white rounded-full p-0.5 shadow text-gray-500 hover:text-red-500"
                                      onClick={() => handleDeleteMedia(media.id, true)}
                                    >
                                      <X className="h-3 w-3" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                              
                              <div className="border-t pt-4 space-y-2">
                                <div className="flex gap-2">
                                  <Select 
                                    value={newMediaType} 
                                    onValueChange={(value: "image" | "video") => setNewMediaType(value)}
                                  >
                                    <SelectTrigger className="w-24">
                                      <SelectValue placeholder="Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="image">Image</SelectItem>
                                      <SelectItem value="video">Video</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <Input
                                    placeholder="Media URL"
                                    className="flex-1"
                                    value={newMediaUrl}
                                    onChange={(e) => setNewMediaUrl(e.target.value)}
                                  />
                                </div>
                                <Input
                                  placeholder="Caption (optional)"
                                  value={newMediaCaption}
                                  onChange={(e) => setNewMediaCaption(e.target.value)}
                                />
                                <div className="flex gap-2">
                                  <Select 
                                    value={newMediaBrand} 
                                    onValueChange={setNewMediaBrand}
                                  >
                                    <SelectTrigger className="flex-1">
                                      <SelectValue placeholder="Select brand (optional)" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="">No brand</SelectItem>
                                      {availableBrands.map((brand) => (
                                        <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <Button 
                                    type="button" 
                                    variant="outline"
                                    onClick={() => handleAddMedia(true)}
                                    disabled={!newMediaUrl.trim()}
                                  >
                                    Add Media
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline" className="border-gray-300">Cancel</Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button className="bg-black text-white border-none hover:underline" onClick={handleUpdateStory}>
                              Update Story
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    )}
                  </Dialog>
                  
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
                          onClick={() => {
                            setCuratedStories(curatedStories.filter(s => s.id !== story.id));
                            toast({
                              title: "Story Deleted",
                              description: "The story has been permanently deleted.",
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
  );
};

export default CuratedStoriesManagement;
