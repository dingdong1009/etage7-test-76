
import React from "react";
import { Upload, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FontStyles {
  family: string;
  size: string;
  weight: string;
  alignment: string;
  color: string;
}

interface LookbookPageProps {
  template: string;
  preview?: boolean;
  fontStyles?: FontStyles;
}

const LookbookPage: React.FC<LookbookPageProps> = ({ 
  template, 
  preview = false,
  fontStyles = {
    family: 'sans',
    size: 'text-2xl',
    weight: 'font-thin',
    alignment: 'text-center',
    color: 'text-black'
  }
}) => {
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
            <div className={`z-10 bg-white bg-opacity-90 p-6 shadow-sm ${fontStyles.alignment}`}>
              <h2 className={`${fontStyles.size} uppercase ${fontStyles.weight} mb-2 ${fontStyles.color} font-${fontStyles.family}`}>
                {preview ? "Collection Title" : "Add Collection Title"}
              </h2>
              <p className={`text-gray-600 font-${fontStyles.family}`}>
                {preview ? "A brief description of this collection." : "Add description here"}
              </p>
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
