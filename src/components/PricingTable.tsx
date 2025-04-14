
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface PricingPlan {
  name: string;
  price: string;
  features: string[];
  buttonText: string;
  highlight?: boolean;
}

interface PricingTableProps {
  plan: PricingPlan;
}

export const PricingTable = ({ plan }: PricingTableProps) => {
  return (
    <div className={`pricing-table border ${plan.highlight ? 'bg-white text-black' : 'bg-white text-black'} transition-all duration-300`}>
      <div className="p-8 flex flex-col h-full">
        <div className="mb-8">
          <h3 className="text-xl uppercase font-normal tracking-tighter">{plan.name}</h3>
          <div className="mt-4 flex items-baseline">
            <span className="text-4xl font-light tracking-tighter">{plan.price}</span>
            <span className="ml-1 text-sm font-light"></span>
          </div>
        </div>
        
        <ul className="space-y-4 mb-8 flex-grow">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <div className="mr-3 mt-1">
                <Check size={16} strokeWidth={1} className={plan.highlight ? "text-black" : "text-black"} />
              </div>
              <span className="font-light text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Button 
          className={`mt-auto w-full uppercase tracking-wide ${
            plan.highlight 
              ? "bg-black text-white hover:bg-gray-800" 
              : "bg-black text-white hover:bg-gray-800"
          }`}
          size="lg"
        >
          {plan.buttonText}
        </Button> 
      </div>
    </div>
  );
};
