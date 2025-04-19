
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
    <div className={cn("absolute flex flex-col gap-2 items-center pointer-events-none", className)}>
      <div className="flex flex-col gap-2 items-center pointer-events-auto">
        {Array.from({ length: totalItems }, (_, i) => (
          <button
            key={i}
            onClick={() => onBubbleClick(i)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              currentIndex === i 
                ? "bg-white scale-125" 
                : "bg-white/50 hover:bg-white/75"
            )}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
