
import { useState, useEffect } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export interface NotificationTarget {
  type: "brand" | "buyer";
  id: string;
  name: string;
}

interface NotificationsHandlerProps {
  targets: NotificationTarget[];
  onSend: (targets: NotificationTarget[]) => Promise<void>;
  onClose: () => void;
}

const NotificationsHandler = ({ targets, onSend, onClose }: NotificationsHandlerProps) => {
  const { toast } = useToast();
  const [selectedTargets, setSelectedTargets] = useState<NotificationTarget[]>(targets);
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState("");

  // Group targets by type
  const brandTargets = targets.filter(target => target.type === "brand");
  const buyerTargets = targets.filter(target => target.type === "buyer");

  const handleToggleTarget = (target: NotificationTarget) => {
    if (selectedTargets.find(t => t.id === target.id && t.type === target.type)) {
      setSelectedTargets(selectedTargets.filter(
        t => !(t.id === target.id && t.type === target.type)
      ));
    } else {
      setSelectedTargets([...selectedTargets, target]);
    }
  };

  const handleSelectAll = (type: "brand" | "buyer") => {
    const targetsOfType = targets.filter(t => t.type === type);
    const allOfTypeSelected = targetsOfType.every(
      target => selectedTargets.some(t => t.id === target.id && t.type === target.type)
    );
    
    if (allOfTypeSelected) {
      setSelectedTargets(selectedTargets.filter(t => t.type !== type));
    } else {
      const currentWithoutType = selectedTargets.filter(t => t.type !== type);
      setSelectedTargets([...currentWithoutType, ...targetsOfType]);
    }
  };

  const handleSendNotifications = async () => {
    if (selectedTargets.length === 0) {
      toast({
        title: "No recipients selected",
        description: "Please select at least one recipient.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSending(true);
    try {
      await onSend(selectedTargets);
      toast({
        title: "Notifications sent",
        description: `Successfully sent notifications to ${selectedTargets.length} recipients.`,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error sending notifications",
        description: "There was a problem sending notifications. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Send notifications to:</h3>
        
        {/* Brands Section */}
        {brandTargets.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <h4 className="text-sm font-medium">Brands</h4>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleSelectAll("brand")}
                className="ml-2 h-6 text-xs"
              >
                {brandTargets.every(
                  target => selectedTargets.some(t => t.id === target.id && t.type === target.type)
                ) ? "Deselect All" : "Select All"}
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {brandTargets.map((target) => (
                <div 
                  key={`brand-${target.id}`}
                  onClick={() => handleToggleTarget(target)}
                  className={`
                    px-2 py-1 text-xs rounded-full cursor-pointer 
                    ${selectedTargets.some(t => t.id === target.id && t.type === target.type) 
                      ? "bg-primary text-white" 
                      : "bg-secondary text-secondary-foreground"}
                  `}
                >
                  {target.name}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Buyers Section */}
        {buyerTargets.length > 0 && (
          <div>
            <div className="flex items-center mb-2">
              <h4 className="text-sm font-medium">Buyers</h4>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleSelectAll("buyer")}
                className="ml-2 h-6 text-xs"
              >
                {buyerTargets.every(
                  target => selectedTargets.some(t => t.id === target.id && t.type === target.type)
                ) ? "Deselect All" : "Select All"}
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {buyerTargets.map((target) => (
                <div 
                  key={`buyer-${target.id}`}
                  onClick={() => handleToggleTarget(target)}
                  className={`
                    px-2 py-1 text-xs rounded-full cursor-pointer 
                    ${selectedTargets.some(t => t.id === target.id && t.type === target.type) 
                      ? "bg-primary text-white" 
                      : "bg-secondary text-secondary-foreground"}
                  `}
                >
                  {target.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {selectedTargets.length > 0 && (
        <div className="p-3 bg-muted rounded-md flex items-center gap-3">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <span className="text-sm">Notification will be sent to {selectedTargets.length} recipients</span>
        </div>
      )}
      
      {selectedTargets.length === 0 && (
        <div className="p-3 bg-muted rounded-md flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-amber-500" />
          <span className="text-sm">Select at least one recipient</span>
        </div>
      )}
      
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onClose} disabled={isSending}>
          Cancel
        </Button>
        <Button 
          onClick={handleSendNotifications} 
          disabled={selectedTargets.length === 0 || isSending}
          className="bg-black text-white"
        >
          {isSending ? "Sending..." : "Send Notifications"}
        </Button>
      </div>
    </div>
  );
};

export default NotificationsHandler;
