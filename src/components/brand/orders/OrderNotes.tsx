
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OrderNotesProps {
  notes?: string;
}

const OrderNotes: React.FC<OrderNotesProps> = ({ notes }) => {
  if (!notes) return null;

  return (
    <Card className="border border-gray-200">
      <CardHeader>
        <CardTitle>Additional Notes</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{notes}</p>
      </CardContent>
    </Card>
  );
};

export default OrderNotes;
