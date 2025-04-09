
import { useCallback, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDropzone } from "react-dropzone";
import { Image as ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  onImageUpload?: (file: File) => Promise<string>;
}

const RichTextEditor = ({ value, onChange, onImageUpload }: RichTextEditorProps) => {
  const [dragging, setDragging] = useState(false);
  const [editorValue, setEditorValue] = useState(value);

  // Modules for toolbar options
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ color: [] }, { background: [] }],
      ["link"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "color",
    "background",
    "link",
  ];

  const handleEditorChange = (content: string) => {
    setEditorValue(content);
    onChange(content);
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
        const updatedContent = imgUrls.reduce(
          (content, url) => {
            return content + `<p><img src="${url}" alt="Uploaded content" /></p>`;
          },
          editorValue
        );

        setEditorValue(updatedContent);
        onChange(updatedContent);
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setDragging(false);
      }
    },
    [editorValue, onChange, onImageUpload]
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    }
  });

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
      
      <div className="mb-2 flex justify-end">
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
        theme="snow"
        value={editorValue}
        onChange={handleEditorChange}
        modules={modules}
        formats={formats}
        className="min-h-[200px]"
      />
      
      <p className="text-xs text-muted-foreground mt-1">
        Drag and drop images directly into the editor, or use the toolbar options above to style your text
      </p>
    </div>
  );
};

export default RichTextEditor;
