
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Tag, PlusCircle, Image as ImageIcon, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";

interface BrandTag {
  id: string;
  name: string;
}

interface BrandMedia {
  id: string;
  brandId: string;
  brandName: string;
  url: string;
  type: "image" | "video";
  title: string;
}

const CuratedPage = () => {
  const { toast } = useToast();
  const [brandTags, setBrandTags] = useState<BrandTag[]>([
    { id: "1", name: "Sustainable Fashion" },
    { id: "2", name: "Luxury" },
  ]);
  const [brandMedia, setBrandMedia] = useState<BrandMedia[]>([
    { id: "1", brandId: "1", brandName: "Eco Couture", url: "https://placehold.co/600x400/png", type: "image", title: "Spring Collection" },
    { id: "2", brandId: "2", brandName: "Luxe Modern", url: "https://placehold.co/600x400/png", type: "image", title: "Designer Showcase" },
  ]);
  
  const [newTag, setNewTag] = useState("");
  const [newMedia, setNewMedia] = useState<Omit<BrandMedia, "id">>({
    brandId: "",
    brandName: "",
    url: "",
    type: "image",
    title: ""
  });

  const handleAddTag = () => {
    if (newTag.trim()) {
      const newTagObj: BrandTag = {
        id: Date.now().toString(),
        name: newTag.trim()
      };
      setBrandTags([...brandTags, newTagObj]);
      setNewTag("");
      toast({
        title: "Brand Tag Added",
        description: `Added new tag: ${newTag}`
      });
    }
  };

  const handleRemoveTag = (id: string) => {
    setBrandTags(brandTags.filter(tag => tag.id !== id));
    toast({
      title: "Brand Tag Removed"
    });
  };

  const handleAddMedia = () => {
    if (newMedia.brandName && newMedia.url && newMedia.title) {
      const mediaItem: BrandMedia = {
        ...newMedia,
        id: Date.now().toString()
      };
      setBrandMedia([...brandMedia, mediaItem]);
      setNewMedia({
        brandId: "",
        brandName: "",
        url: "",
        type: "image",
        title: ""
      });
      toast({
        title: "Media Added",
        description: `Added new media: ${newMedia.title}`
      });
    }
  };

  const handleRemoveMedia = (id: string) => {
    setBrandMedia(brandMedia.filter(media => media.id !== id));
    toast({
      title: "Media Removed"
    });
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-black text-white py-24 px-4">
        <div className="max-w-[1481px] mx-auto">
          <h1 className="text-3xl md:text-5xl uppercase font-thin mb-6">
            AI-POWERED <br/>
            <span className="font-normal">BRAND CURATION</span>
          </h1>
          <p className="max-w-2xl text-lg font-light mb-8">
            Discover brands hand-picked by our AI to match your specific requirements.
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {brandTags.map(tag => (
              <span key={tag.id} className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm flex items-center">
                {tag.name}
              </span>
            ))}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                  <Tag className="mr-2 h-4 w-4" /> Manage Tags
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Manage Brand Tags</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {brandTags.map(tag => (
                      <div key={tag.id} className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
                        {tag.name}
                        <button 
                          onClick={() => handleRemoveTag(tag.id)}
                          className="ml-2 text-gray-500 hover:text-red-500"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="New brand tag" 
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                      className="flex-1"
                    />
                    <Button onClick={handleAddTag}>Add Tag</Button>
                  </div>
                </div>
                <DialogFooter>
                  <Button className="bg-black text-white border-0 hover:bg-gray-800">
                    Done
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <Button className="bg-white text-black border-0 hover:bg-gray-100">
            COMING SOON <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Brand Media Section */}
      <section className="py-16 px-4">
        <div className="max-w-[1481px] mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl uppercase font-thin">
              FEATURED <span className="font-normal">BRAND MEDIA</span>
            </h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-black text-white hover:bg-gray-800">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Media
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Brand Media</DialogTitle>
                </DialogHeader>
                <div className="py-4 space-y-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="brand-name" className="text-right">Brand Name</Label>
                    <Input 
                      id="brand-name" 
                      className="col-span-3"
                      value={newMedia.brandName}
                      onChange={(e) => setNewMedia({...newMedia, brandName: e.target.value, brandId: Date.now().toString()})}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="media-title" className="text-right">Title</Label>
                    <Input 
                      id="media-title" 
                      className="col-span-3"
                      value={newMedia.title}
                      onChange={(e) => setNewMedia({...newMedia, title: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="media-url" className="text-right">Media URL</Label>
                    <Input 
                      id="media-url" 
                      className="col-span-3"
                      placeholder="https://example.com/image.jpg"
                      value={newMedia.url}
                      onChange={(e) => setNewMedia({...newMedia, url: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="media-type" className="text-right">Type</Label>
                    <select 
                      id="media-type"
                      className="col-span-3 border rounded-md px-3 py-2"
                      value={newMedia.type}
                      onChange={(e) => setNewMedia({...newMedia, type: e.target.value as "image" | "video"})}
                    >
                      <option value="image">Image</option>
                      <option value="video">Video</option>
                    </select>
                  </div>
                </div>
                <DialogFooter>
                  <Button 
                    className="bg-black text-white border-0 hover:bg-gray-800"
                    onClick={handleAddMedia}
                  >
                    Add Media
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brandMedia.map((media) => (
              <Card key={media.id} className="overflow-hidden">
                <div className="relative h-48">
                  {media.type === "image" && (
                    <img 
                      src={media.url} 
                      alt={media.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  {media.type === "video" && (
                    <video 
                      src={media.url}
                      controls
                      className="w-full h-full object-cover"
                    />
                  )}
                  <button 
                    onClick={() => handleRemoveMedia(media.id)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-medium">{media.title}</h3>
                  <p className="text-sm text-gray-500">{media.brandName}</p>
                </div>
              </Card>
            ))}
            
            {brandMedia.length === 0 && (
              <div className="col-span-full text-center py-10 border border-dashed rounded-lg">
                <ImageIcon className="mx-auto h-12 w-12 text-gray-300" />
                <p className="mt-2 text-gray-500">No media added yet</p>
                <p className="text-sm text-gray-400">Click "Add Media" to get started</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-32 px-4 bg-gray-50">
        <div className="max-w-[1481px] mx-auto text-center">
          <h2 className="text-2xl md:text-4xl uppercase font-thin mb-6">
            CURATED COLLECTIONS <span className="font-normal">COMING SOON</span>
          </h2>
          <p className="max-w-2xl mx-auto mb-8 font-light">
            Our advanced AI system is being trained to understand your specific requirements 
            and match you with brands that perfectly align with your business needs.
          </p>
          <Button className="bg-black text-white hover:bg-gray-800">
            SUBSCRIBE FOR UPDATES <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default CuratedPage;
