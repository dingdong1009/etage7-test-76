import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, Save, Plus, Move, Trash2, Upload, LayoutTemplate, Grid3X3, Type, Eye } from "lucide-react";
import LookbookPage from "./LookbookPage";
import LookbookPageTemplate from "./LookbookPageTemplate";

interface LookbookCreatorProps {
  lookbook: { id: number; title: string } | null;
  onClose: () => void;
}

const LookbookCreator: React.FC<LookbookCreatorProps> = ({ lookbook, onClose }) => {
  const [title, setTitle] = useState(lookbook?.title || "");
  const [description, setDescription] = useState("");
  const [activeTab, setActiveTab] = useState("content");
  const [pages, setPages] = useState([{ id: 1, template: "grid-2", images: [] }]);
  const [currentPage, setCurrentPage] = useState(1);
  const [previewMode, setPreviewMode] = useState(false);
  
  const handleAddPage = () => {
    const newPage = {
      id: pages.length + 1,
      template: "grid-2",
      images: []
    };
    setPages([...pages, newPage]);
  };
  
  const handleSave = () => {
    console.log("Saving lookbook:", { title, description, pages });
    onClose();
  };

  const handleTemplateChange = (templateId: string) => {
    const updatedPages = pages.map(page => {
      if (page.id === currentPage) {
        return { ...page, template: templateId };
      }
      return page;
    });
    setPages(updatedPages);
  };
  
  const availableTemplates = [
    { id: "grid-2", name: "2-Grid", icon: <Grid3X3 size={16} /> },
    { id: "grid-3", name: "3-Grid", icon: <Grid3X3 size={16} /> },
    { id: "featured", name: "Featured", icon: <LayoutTemplate size={16} /> },
    { id: "cover", name: "Cover", icon: <Type size={16} /> }
  ];

  return (
    <div className="space-y-4">
      <Card className="border border-gray-200">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-1xl md:text-2xl uppercase font-thin mb-6">
            {lookbook ? "Edit Lookbook" : "Create New Lookbook"}
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPreviewMode(!previewMode)}
            >
              <Eye size={16} className="mr-2" />
              {previewMode ? "Exit Preview" : "Preview"}
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Save size={16} className="mr-2" />
              Save
            </Button>
            <Button variant="outline" size="icon" onClick={onClose}>
              <X size={16} />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {!previewMode ? (
            <>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Lookbook Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter lookbook title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Enter lookbook description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Cover Image</Label>
                  <div className="border-2 border-dashed p-6 flex flex-col items-center justify-center bg-gray-50">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Drag and drop or click to upload</p>
                    <Button variant="outline" size="sm" className="mt-4">
                      Select Cover Image
                    </Button>
                  </div>
                </div>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3">
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="layout">Page Layout</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="content" className="mt-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Pages</h3>
                    <Button variant="outline" size="sm" onClick={handleAddPage}>
                      <Plus size={16} className="mr-2" />
                      Add Page
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {pages.map((page, index) => (
                      <div 
                        key={page.id} 
                        className={`border overflow-hidden cursor-pointer ${
                          currentPage === page.id ? 'ring-2 ring-black' : ''
                        }`}
                        onClick={() => setCurrentPage(page.id)}
                      >
                        <div className="aspect-[5/7] bg-gray-100 flex items-center justify-center">
                          <LookbookPageTemplate template={page.template} />
                        </div>
                        <div className="p-2 bg-gray-50 flex justify-between items-center border-t">
                          <span className="text-xs font-medium">Page {index + 1}</span>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <Move size={12} />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-red-500">
                              <Trash2 size={12} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="layout" className="mt-6">
                  <div className="border-t p-4 mt-2">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-1xl md:text-2xl uppercase font-thin">Page {currentPage} Layout</h3>
                      <div className="flex gap-2">
                        {availableTemplates.map(template => (
                          <Button 
                            key={template.id}
                            variant={pages.find(p => p.id === currentPage)?.template === template.id ? "default" : "outline"}
                            size="sm" 
                            className="flex gap-1 items-center"
                            onClick={() => handleTemplateChange(template.id)}
                          >
                            {template.icon}
                            {template.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="w-full aspect-[4/3] bg-gray-100 overflow-hidden">
                      <LookbookPage 
                        template={pages.find(p => p.id === currentPage)?.template || "grid-2"} 
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="settings" className="mt-6">
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="seasonTag">Season Tag</Label>
                        <Input
                          id="seasonTag"
                          placeholder="e.g., Spring/Summer 2023"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="colorScheme">Color Scheme</Label>
                        <Input
                          id="colorScheme"
                          placeholder="e.g., Light, Dark, Custom"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="publishDate">Publish Date</Label>
                      <Input
                        id="publishDate"
                        type="date"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="block">Visibility</Label>
                      <div className="flex gap-4">
                        <div className="flex items-center">
                          <input type="radio" id="public" name="visibility" className="mr-2" defaultChecked />
                          <Label htmlFor="public">Public</Label>
                        </div>
                        <div className="flex items-center">
                          <input type="radio" id="private" name="visibility" className="mr-2" />
                          <Label htmlFor="private">Private</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </>
          ) : (
            <div className="flex flex-col items-center">
              <div className="max-w-4xl w-full">
                <h2 className="text-1xl md:text-2xl text-center uppercase font-thin mb-2">{title || "Untitled Lookbook"}</h2>
                {description && <p className="text-center text-gray-600 mb-8">{description}</p>}
                
                <div className="space-y-12">
                  {pages.map((page, index) => (
                    <div key={page.id} className="w-full aspect-[4/3] bg-white border rounded-md overflow-hidden shadow-md">
                      <LookbookPage 
                        template={page.template}
                        preview={true}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between border-t p-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save Lookbook</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LookbookCreator;
