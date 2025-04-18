
import React from 'react';
import { cn } from '@/lib/utils';

interface ScrollIndicatorProps {
  totalItems: number;
  currentIndex: number;
  onBubbleClick: (index: number) => void;
  className?: string;
}

export const ScrollIndicator = ({
  totalItems,
  currentIndex,
  onBubbleClick,
  className
}: ScrollIndicatorProps) => {
  return (
    <div className={cn("fixed flex flex-col gap-2 items-center", className)}>
      {Array.from({ length: totalItems }, (_, i) => (
        <button
          key={i}
          onClick={() => onBubbleClick(i)}
          className={cn(
            "w-2 h-2 rounded-full transition-all duration-300",
            currentIndex === i 
              ? "bg-black scale-125" 
              : "bg-gray-300 hover:bg-gray-400"
          )}
          aria-label={`Go to image ${i + 1}`}
        />
      ))}
    </div>
  );
};
