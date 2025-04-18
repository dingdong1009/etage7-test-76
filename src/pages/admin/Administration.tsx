
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Administration = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Administration</h1>
      <Card>
        <CardHeader>
          <CardTitle>System Administration</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Administration content will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Administration;
