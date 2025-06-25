"use client";

import { DriverForm } from "@/components/driver-form";
import { useBusTracking } from "@/hooks/use-bus-tracking";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bus, CheckCircle, MapPin } from "lucide-react";

export default function DriverPage() {
  const { startTracking, stopTracking, isTracking, driverInfo, activeRoute } = useBusTracking();

  if (isTracking && driverInfo && activeRoute) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="mx-auto bg-green-100 rounded-full p-4 w-fit">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <CardTitle className="font-headline text-2xl mt-4">Tracking Active</CardTitle>
            <CardDescription>You are now sharing your location.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-left bg-muted p-4 rounded-lg">
                <p className="flex items-center gap-2"><Bus className="h-4 w-4 text-primary" /> <strong>Driver:</strong> {driverInfo.name}</p>
                <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> <strong>Route:</strong> {activeRoute.name}</p>
            </div>
            <p className="text-sm text-muted-foreground">Passengers on your route can now see your location and ETA. Drive safely!</p>
            <Button onClick={stopTracking} variant="destructive" className="w-full">
              End Trip
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <DriverForm onStartTracking={startTracking} />
    </main>
  );
}
