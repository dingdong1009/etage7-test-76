
import { useCallback, useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDropzone } from "react-dropzone";
import { Image as ImageIcon, X, Bold, Italic, Underline, List, ListOrdered, AlignLeft, AlignCenter, AlignRight, Link, Tag, Store, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  onImageUpload?: (file: File) => Promise<string>;
}

// Mock data for brands and buyers - in a real app, fetch this from your API
const mockBrands = [
  { id: 1, name: "Nike", type: "brand" },
  { id: 2, name: "Adidas", type: "brand" },
  { id: 3, name: "Puma", type: "brand" },
  { id: 4, name: "Reebok", type: "brand" },
  { id: 5, name: "Under Armour", type: "brand" },
];

const mockBuyers = [
  { id: 1, name: "Nordstrom", type: "buyer" },
  { id: 2, name: "Macy's", type: "buyer" },
  { id: 3, name: "Bloomingdale's", type: "buyer" },
  { id: 4, name: "Saks Fifth Avenue", type: "buyer" },
  { id: 5, name: "Neiman Marcus", type: "buyer" },
];

const RichTextEditor = ({ value, onChange, onImageUpload }: RichTextEditorProps) => {
  const [dragging, setDragging] = useState(false);
  const [editorValue, setEditorValue] = useState(value);
  const [searchTerm, setSearchTerm] = useState("");
  const [openTagPopover, setOpenTagPopover] = useState(false);
  const quillRef = useRef<ReactQuill>(null);

  useEffect(() => {
    // Initialize editor value when the component mounts or value prop changes
    setEditorValue(value);
  }, [value]);

  // Enhanced toolbar options
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }],
        [{ color: [] }, { background: [] }],
        ["link", "image"],
        ["clean"],
      ],
    },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "align",
    "color",
    "background",
    "link",
    "image",
  ];

  const handleEditorChange = (content: string) => {
    setEditorValue(content);
    onChange(content);
  };

  const insertTag = (item: { id: number; name: string; type: string }) => {
    if (!quillRef.current) return;
    
    const editor = quillRef.current.getEditor();
    const range = editor.getSelection(true);
    
    // Insert the tag with styling based on type
    const tagClass = item.type === 'brand' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800';
    const tagHTML = `<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${tagClass}" data-${item.type}-id="${item.id}">@${item.name}</span>`;
    
    editor.clipboard.dangerouslyPasteHTML(range.index, tagHTML);
    editor.setSelection(range.index + tagHTML.length, 0);
    
    setOpenTagPopover(false);
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (!onImageUpload) return;
      
      try {
        const imgUrls = await Promise.all(
          acceptedFiles.map(async (file) => {
            const url = await onImageUpload(file);
            return url;
          })
        );

        // Insert images into editor
        if (quillRef.current) {
          const editor = quillRef.current.getEditor();
          const range = editor.getSelection(true);
          
          imgUrls.forEach((url, index) => {
            editor.insertEmbed(range.index + index, 'image', url);
            editor.setSelection(range.index + index + 1, 0);
          });
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setDragging(false);
      }
    },
    [onImageUpload]
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    }
  });

  // Filter items based on search term
  const filteredItems = [...mockBrands, ...mockBuyers].filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div 
      {...getRootProps()}
      className={`relative border rounded-md ${
        isDragActive || dragging ? "border-primary bg-primary/5" : "border-input"
      }`}
      onDragEnter={() => setDragging(true)}
      onDragLeave={() => setDragging(false)}
      onDrop={() => setDragging(false)}
    >
      <input {...getInputProps()} />
      
      {(isDragActive || dragging) && (
        <div className="absolute inset-0 bg-black/10 flex items-center justify-center rounded-md z-10">
          <div className="p-4 bg-white rounded shadow-lg text-center">
            <ImageIcon className="mx-auto mb-2 text-primary" />
            <p className="text-sm">Drop images here to add them to your content</p>
          </div>
        </div>
      )}
      
      <div className="mb-2 flex flex-wrap gap-2 justify-between">
        <div className="flex gap-1 items-center">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              if (quillRef.current) {
                const editor = quillRef.current.getEditor();
                const format = editor.getFormat();
                editor.format('bold', !format.bold);
              }
            }}
            className="h-8 w-8 p-0"
            title="Bold"
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              if (quillRef.current) {
                const editor = quillRef.current.getEditor();
                const format = editor.getFormat();
                editor.format('italic', !format.italic);
              }
            }}
            className="h-8 w-8 p-0"
            title="Italic"
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              if (quillRef.current) {
                const editor = quillRef.current.getEditor();
                const format = editor.getFormat();
                editor.format('underline', !format.underline);
              }
            }}
            className="h-8 w-8 p-0"
            title="Underline"
          >
            <Underline className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              if (quillRef.current) {
                const editor = quillRef.current.getEditor();
                editor.format('list', 'bullet');
              }
            }}
            className="h-8 w-8 p-0"
            title="Bullet List"
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              if (quillRef.current) {
                const editor = quillRef.current.getEditor();
                editor.format('list', 'ordered');
              }
            }}
            className="h-8 w-8 p-0"
            title="Numbered List"
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              if (quillRef.current) {
                const editor = quillRef.current.getEditor();
                editor.format('align', 'left');
              }
            }}
            className="h-8 w-8 p-0"
            title="Align Left"
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              if (quillRef.current) {
                const editor = quillRef.current.getEditor();
                editor.format('align', 'center');
              }
            }}
            className="h-8 w-8 p-0"
            title="Align Center"
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              if (quillRef.current) {
                const editor = quillRef.current.getEditor();
                editor.format('align', 'right');
              }
            }}
            className="h-8 w-8 p-0"
            title="Align Right"
          >
            <AlignRight className="h-4 w-4" />
          </Button>
          <Popover open={openTagPopover} onOpenChange={setOpenTagPopover}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-8 p-1"
                title="Tag Brand or Buyer"
              >
                <Tag className="h-4 w-4 mr-1" />
                <span className="text-xs">Tag</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-64">
              <Command>
                <CommandInput
                  placeholder="Search brand or buyer..."
                  value={searchTerm}
                  onValueChange={setSearchTerm}
                />
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Brands">
                  {filteredItems
                    .filter((item) => item.type === "brand")
                    .map((item) => (
                      <CommandItem
                        key={`brand-${item.id}`}
                        onSelect={() => insertTag(item)}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Store className="h-4 w-4 text-blue-600" />
                        {item.name}
                      </CommandItem>
                    ))}
                </CommandGroup>
                <CommandGroup heading="Buyers">
                  {filteredItems
                    .filter((item) => item.type === "buyer")
                    .map((item) => (
                      <CommandItem
                        key={`buyer-${item.id}`}
                        onSelect={() => insertTag(item)}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <User className="h-4 w-4 text-purple-600" />
                        {item.name}
                      </CommandItem>
                    ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => open()}
          className="flex gap-1 items-center"
        >
          <ImageIcon className="h-4 w-4" />
          <span>Add Images</span>
        </Button>
      </div>
      
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={editorValue}
        onChange={handleEditorChange}
        modules={modules}
        formats={formats}
        className="min-h-[200px]"
      />
      
      <p className="text-xs text-muted-foreground mt-1">
        Drag and drop images directly into the editor, use the toolbar options to style your text, or tag brands and buyers with @ mentions
      </p>
    </div>
  );
};

export default RichTextEditor;
