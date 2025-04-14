
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type MessageTypeSelectorProps = {
  selectedType: string | null;
  onSelectType: (type: string) => void;
};

const messageTypes = [
  { 
    id: "quote", 
    name: "Request for Quote", 
    description: "Get pricing information for selected products" 
  },
  { 
    id: "samples", 
    name: "Request for Samples", 
    description: "Request physical samples of the products" 
  },
  { 
    id: "info", 
    name: "General Information", 
    description: "Ask general questions about the products" 
  },
  { 
    id: "custom", 
    name: "Custom Order", 
    description: "Inquire about custom or bespoke options" 
  }
];

export const MessageTypeSelector = ({ 
  selectedType, 
  onSelectType 
}: MessageTypeSelectorProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-3">Select Message Type</h3>
        <RadioGroup value={selectedType || ""} onValueChange={onSelectType}>
          <div className="space-y-3">
            {messageTypes.map(type => (
              <Card 
                key={type.id}
                className={`cursor-pointer border ${selectedType === type.id ? 'border-black' : 'border-gray-200'}`}
              >
                <CardContent className="p-4 flex items-center gap-3">
                  <RadioGroupItem 
                    value={type.id} 
                    id={type.id}
                    className="data-[state=checked]:border-black data-[state=checked]:bg-black"
                  />
                  <div className="flex-1">
                    <Label htmlFor={type.id} className="font-medium cursor-pointer">
                      {type.name}
                    </Label>
                    <p className="text-sm text-gray-500 mt-1">{type.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};
