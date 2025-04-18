
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Agenda = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Agenda</h1>
      <Card>
        <CardHeader>
          <CardTitle>Agenda Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Agenda content will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Agenda;
