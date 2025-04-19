
import { useState, useEffect, RefObject } from 'react';

export const useScrollProgress = (scrollRef: RefObject<HTMLElement>) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = element;
      const itemHeight = scrollHeight / 5; // 5 images
      const currentPos = scrollTop + clientHeight / 2;
      const newIndex = Math.min(4, Math.floor(currentPos / itemHeight));
      setCurrentIndex(newIndex);
    };

    element.addEventListener('scroll', handleScroll);
    return () => element.removeEventListener('scroll', handleScroll);
  }, [scrollRef]);

  return currentIndex;
};
