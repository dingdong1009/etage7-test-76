
import React, { useState } from "react";
import { Upload, Plus, Move, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

interface LookbookPageProps {
  template: string;
  preview?: boolean;
}

interface TextContainerStyle {
  top: string;
  left: string;
  width: string;
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  textAlign: string;
  color: string;
}

const LookbookPage: React.FC<LookbookPageProps> = ({ template, preview = false }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [textStyle, setTextStyle] = useState<TextContainerStyle>({
    top: "50%",
    left: "50%",
    width: "60%",
    fontFamily: "sans-serif",
    fontSize: "16px",
    fontWeight: "400",
    textAlign: "center",
    color: "#000000"
  });

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    if (preview) return;
    setIsDragging(true);
    
    const container = e.currentTarget.closest(".relative");
    if (!container) return;
    
    const initialX = e.clientX;
    const initialY = e.clientY;
    const textBox = e.currentTarget;
    const textBoxRect = textBox.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    
    // Calculate position as percentage of container
    const initialLeft = textBoxRect.left - containerRect.left;
    const initialTop = textBoxRect.top - containerRect.top;
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - initialX;
      const deltaY = moveEvent.clientY - initialY;
      
      const newLeft = ((initialLeft + deltaX) / containerRect.width) * 100;
      const newTop = ((initialTop + deltaY) / containerRect.height) * 100;
      
      setTextStyle(prev => ({
        ...prev,
        left: `${Math.max(0, Math.min(100 - parseFloat(prev.width), newLeft))}%`,
        top: `${Math.max(0, Math.min(100, newTop))}%`
      }));
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
    
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };
  
  const handleFontChange = (property: keyof TextContainerStyle, value: string) => {
    setTextStyle(prev => ({
      ...prev,
      [property]: value
    }));
  };
  
  const renderTemplate = () => {
    switch (template) {
      case "grid-2":
        return (
          <div className="grid grid-cols-2 h-full gap-2 p-2">
            {[...Array(2)].map((_, index) => (
              <ImagePlaceholder key={index} preview={preview} />
            ))}
          </div>
        );
      case "grid-3":
        return (
          <div className="grid grid-cols-3 h-full gap-2 p-2">
            {[...Array(3)].map((_, index) => (
              <ImagePlaceholder key={index} preview={preview} />
            ))}
          </div>
        );
      case "featured":
        return (
          <div className="grid grid-rows-2 h-full gap-2 p-2">
            <div className="row-span-1">
              <ImagePlaceholder preview={preview} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <ImagePlaceholder preview={preview} />
              <ImagePlaceholder preview={preview} />
            </div>
          </div>
        );
      case "cover":
        return (
          <div className="relative h-full flex flex-col justify-center items-center p-6 bg-gray-50">
            <ImagePlaceholder preview={preview} className="absolute inset-0 z-0 opacity-90" />
            <div 
              className="z-10 bg-white bg-opacity-90 p-6 shadow-sm"
              style={{
                position: "absolute",
                top: textStyle.top,
                left: textStyle.left,
                transform: "translate(-50%, -50%)",
                width: textStyle.width,
                fontFamily: textStyle.fontFamily,
                fontSize: textStyle.fontSize,
                fontWeight: textStyle.fontWeight,
                textAlign: textStyle.textAlign as any,
                color: textStyle.color,
                cursor: preview ? "default" : "move",
              }}
              onMouseDown={handleDragStart}
            >
              <h2 
                className="uppercase mb-2"
                style={{
                  fontSize: `calc(${textStyle.fontSize} * 1.25)`,
                  fontWeight: textStyle.fontWeight,
                  fontFamily: textStyle.fontFamily,
                }}
              >
                {preview ? "Collection Title" : "Add Collection Title"}
              </h2>
              <p
                style={{
                  fontFamily: textStyle.fontFamily,
                  fontSize: textStyle.fontSize,
                  color: textStyle.color,
                }}
              >
                {preview ? "A brief description of this collection." : "Add description here"}
              </p>
              
              {!preview && (
                <div className="absolute -top-8 left-0 flex gap-1 bg-white p-1 rounded shadow-sm border">
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Move size={12} />
                  </Button>
                  <select 
                    className="text-xs border rounded p-1"
                    value={textStyle.fontFamily}
                    onChange={(e) => handleFontChange('fontFamily', e.target.value)}
                  >
                    <option value="sans-serif">Sans-serif</option>
                    <option value="serif">Serif</option>
                    <option value="monospace">Monospace</option>
                    <option value="cursive">Cursive</option>
                  </select>
                  <select
                    className="text-xs border rounded p-1"
                    value={textStyle.fontSize}
                    onChange={(e) => handleFontChange('fontSize', e.target.value)}
                  >
                    <option value="12px">12px</option>
                    <option value="14px">14px</option>
                    <option value="16px">16px</option>
                    <option value="18px">18px</option>
                    <option value="20px">20px</option>
                    <option value="24px">24px</option>
                  </select>
                  <select
                    className="text-xs border rounded p-1"
                    value={textStyle.fontWeight}
                    onChange={(e) => handleFontChange('fontWeight', e.target.value)}
                  >
                    <option value="300">Light</option>
                    <option value="400">Regular</option>
                    <option value="500">Medium</option>
                    <option value="700">Bold</option>
                  </select>
                  <select
                    className="text-xs border rounded p-1"
                    value={textStyle.textAlign}
                    onChange={(e) => handleFontChange('textAlign', e.target.value)}
                  >
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                  </select>
                  <input
                    type="color"
                    className="w-6 h-6 p-0 border"
                    value={textStyle.color}
                    onChange={(e) => handleFontChange('color', e.target.value)}
                  />
                </div>
              )}
              
              {!preview && (
                <div className="absolute -bottom-8 right-0 flex items-center gap-1">
                  <span className="text-xs text-gray-500">Width:</span>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={parseInt(textStyle.width)}
                    onChange={(e) => handleFontChange('width', `${e.target.value}%`)}
                    className="w-24 h-4"
                  />
                  <span className="text-xs text-gray-500">{textStyle.width}</span>
                </div>
              )}
            </div>
          </div>
        );
      default:
        return (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-500">Template not found</p>
          </div>
        );
    }
  };

  return (
    <div className="w-full h-full bg-white">
      {renderTemplate()}
    </div>
  );
};

interface ImagePlaceholderProps {
  preview?: boolean;
  className?: string;
}

const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({ preview = false, className = "" }) => {
  return (
    <div className={`bg-gray-100 h-full flex flex-col items-center justify-center ${className}`}>
      {!preview ? (
        <>
          <Upload className="h-6 w-6 text-gray-400 mb-2" />
          <Button variant="outline" size="sm" className="bg-white">
            <Plus size={14} className="mr-1" />
            Add Image
          </Button>
        </>
      ) : (
        <span className="text-gray-400">Preview Image</span>
      )}
    </div>
  );
};

export default LookbookPage;
