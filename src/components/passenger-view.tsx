
"use client";

import { useState, useMemo, memo } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapView } from "./map-view";
import { useBusTracking } from "@/hooks/use-bus-tracking";
import { busRoutes } from '@/lib/routes';
import { Clock, MapPin, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

// Memoized Route Selector to prevent unnecessary re-renders during bus movement
const RouteSelector = memo(({ selectedId, onSelect }: { selectedId?: string, onSelect: (id: string) => void }) => (
  <Card>
    <CardHeader>
      <CardTitle className="font-headline">Select Your Route</CardTitle>
    </CardHeader>
    <CardContent>
      <Select onValueChange={onSelect} defaultValue={selectedId}>
        <SelectTrigger>
          <SelectValue placeholder="Select a bus route" />
        </SelectTrigger>
        <SelectContent>
          {busRoutes.map((route) => (
            <SelectItem key={route.id} value={route.id}>
              {route.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </CardContent>
  </Card>
));
RouteSelector.displayName = 'RouteSelector';

export function PassengerView() {
    const [selectedRouteId, setSelectedRouteId] = useState<string | undefined>(busRoutes[0]?.id);
    const { busLocation, nextStop, eta, driverInfo } = useBusTracking();

    const currentRouteIsActive = useMemo(() => {
        return driverInfo?.routeId === selectedRouteId;
    }, [driverInfo, selectedRouteId]);

    const routeForMap = useMemo(() => {
        return busRoutes.find(r => r.id === selectedRouteId) || null;
    }, [selectedRouteId]);

    const mapCenter = useMemo(() => {
        return routeForMap?.path[Math.floor(routeForMap.path.length / 2)] || { lat: 37.77, lng: -122.43 };
    }, [routeForMap]);

    return (
        <div className="relative h-full w-full">
            <MapView 
                route={routeForMap} 
                busLocation={currentRouteIsActive ? busLocation : null} 
                center={mapCenter}
            />

            <div className="absolute top-4 left-4 right-4 md:left-auto md:w-96 space-y-4">
                 <RouteSelector 
                    selectedId={selectedRouteId} 
                    onSelect={setSelectedRouteId} 
                 />

                {currentRouteIsActive && driverInfo ? (
                     <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-accent font-headline flex items-center gap-2">
                                <Clock className="h-6 w-6" /> Live ETA
                            </CardTitle>
                            <CardDescription>Driver: {driverInfo.name}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {nextStop && eta !== null ? (
                                <div className="space-y-2">
                                    <p className="text-lg">Next Stop:</p>
                                    <p className="flex items-center gap-2 text-2xl font-bold">
                                        <MapPin className="h-6 w-6 text-primary" />
                                        {nextStop.name}
                                    </p>
                                    <p className="text-4xl font-bold text-accent">{eta} min</p>
                                    <p className="text-sm text-muted-foreground">
                                        Estimated time of arrival. Subject to traffic conditions.
                                    </p>
                                </div>
                            ) : (
                                <p>The bus has completed the route or is starting up. ETA will appear soon.</p>
                            )}
                        </CardContent>
                    </Card>
                ) : (
                    <Alert className="bg-white/90 backdrop-blur-sm shadow-md">
                      <Info className="h-4 w-4" />
                      <AlertTitle>No Active Bus</AlertTitle>
                      <AlertDescription>
                        There is currently no active bus on this route. Please check back later.
                      </AlertDescription>
                    </Alert>
                )}
            </div>
        </div>
    );
}
