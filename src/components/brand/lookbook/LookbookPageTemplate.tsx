
import React from "react";

interface LookbookPageTemplateProps {
  template: string;
}

const LookbookPageTemplate: React.FC<LookbookPageTemplateProps> = ({ template }) => {
  const renderTemplate = () => {
    switch (template) {
      case "grid-2":
        return (
          <div className="grid grid-cols-2 gap-1 w-full h-full p-1">
            <div className="bg-gray-300 w-full h-full"></div>
            <div className="bg-gray-300 w-full h-full"></div>
          </div>
        );
      case "grid-3":
        return (
          <div className="grid grid-cols-3 gap-1 w-full h-full p-1">
            <div className="bg-gray-300 w-full h-full"></div>
            <div className="bg-gray-300 w-full h-full"></div>
            <div className="bg-gray-300 w-full h-full"></div>
          </div>
        );
      case "featured":
        return (
          <div className="grid grid-rows-2 gap-1 w-full h-full p-1">
            <div className="row-span-1 bg-gray-300 w-full h-full"></div>
            <div className="grid grid-cols-2 gap-1">
              <div className="bg-gray-300 w-full h-full"></div>
              <div className="bg-gray-300 w-full h-full"></div>
            </div>
          </div>
        );
      case "cover":
        return (
          <div className="relative w-full h-full p-1">
            <div className="bg-gray-300 w-full h-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-3/4 h-1/4 flex items-center justify-center">
              <div className="w-3/4 h-1/2 bg-gray-400"></div>
            </div>
          </div>
        );
      default:
        return (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <p className="text-xs text-gray-500">Invalid template</p>
          </div>
        );
    }
  };

  return (
    <div className="w-full h-full">
      {renderTemplate()}
    </div>
  );
};

export default LookbookPageTemplate;
