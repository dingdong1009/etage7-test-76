
import React from 'react';
import { cn } from '@/lib/utils';
import { useScrollbarHide } from '@/hooks/useScrollbarHide';

interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  hideScrollbar?: boolean;
}

export const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ className, hideScrollbar = true, children, ...props }, forwardedRef) => {
    const scrollRef = useScrollbarHide({ enabled: hideScrollbar });
    
    return (
      <div
        ref={(node) => {
          // Handle both forwarded ref and internal ref
          if (typeof forwardedRef === 'function') {
            forwardedRef(node);
          } else if (forwardedRef) {
            forwardedRef.current = node;
          }
          if (scrollRef) {
            scrollRef.current = node;
          }
        }}
        className={cn('overflow-auto', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ScrollArea.displayName = 'ScrollArea';
