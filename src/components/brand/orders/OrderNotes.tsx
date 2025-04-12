
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OrderNotesProps {
  notes?: string;
}

const OrderNotes: React.FC<OrderNotesProps> = ({ notes }) => {
  if (!notes) return null;

  return (
    <Card className="border border-gray-200 rounded-none">
      <CardHeader className="border-b border-gray-100 pb-3">
        <CardTitle className="text-xs uppercase font-light tracking-tight">Additional Notes</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="font-light text-sm">{notes}</p>
      </CardContent>
    </Card>
  );
};

export default OrderNotes;
