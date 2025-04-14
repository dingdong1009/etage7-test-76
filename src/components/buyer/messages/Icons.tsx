
import { LucideProps } from "lucide-react";

export const Archive = ({ size = 24, className = "" }: LucideProps) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={className}
    >
      <rect width="18" height="6" x="3" y="3" rx="1" />
      <path d="m3 9 1.5 9.5a1 1 0 0 0 1 .5h13a1 1 0 0 0 1-.5L21 9" />
      <path d="m9 15 3 3 3-3" />
      <path d="M10 12h4" />
    </svg>
  );
};
