
import { useEffect, useRef } from 'react';

interface UseScrollbarHideProps {
  enabled?: boolean;
}

export const useScrollbarHide = ({ enabled = true }: UseScrollbarHideProps = {}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || !enabled) return;

    const element = ref.current;
    element.classList.add('scrollbar-hide');

    return () => {
      element.classList.remove('scrollbar-hide');
    };
  }, [enabled]);

  return ref;
};
