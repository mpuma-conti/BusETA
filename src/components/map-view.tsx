
"use client";

import { memo } from "react";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import config from "@/lib/config";
import type { BusRoute, LatLng } from "@/lib/types";
import { Polyline } from "./google-maps-polyline";
import { Bus, MapPin } from "lucide-react";

type MapViewProps = {
  route: BusRoute | null;
  busLocation: LatLng | null;
  center: LatLng;
};

// Memoize marker content to avoid getRootNode issues during rapid updates
const StopMarker = memo(({ stop }: { stop: { name: string, location: LatLng } }) => (
  <AdvancedMarker position={stop.location} title={stop.name}>
     <div className="bg-white p-1 rounded-full border-2 border-primary shadow-md">
        <MapPin className="h-5 w-5 text-primary" />
     </div>
  </AdvancedMarker>
));
StopMarker.displayName = 'StopMarker';

const BusMarker = memo(({ location }: { location: LatLng }) => (
  <AdvancedMarker position={location} title="Current Bus Location">
    <div className="bg-accent p-2 rounded-full border-2 border-white shadow-lg animate-bounce">
       <Bus className="h-6 w-6 text-white" />
    </div>
  </AdvancedMarker>
));
BusMarker.displayName = 'BusMarker';

export function MapView({ route, busLocation, center }: MapViewProps) {
  if (!config.googleMapsApiKey) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-muted">
        <p className="text-destructive-foreground bg-destructive p-4 rounded-md shadow-sm">
          Google Maps API Key is missing.
        </p>
      </div>
    );
  }

  return (
    <APIProvider apiKey={config.googleMapsApiKey}>
      <Map
        mapId="bus-eta-map"
        style={{ width: "100%", height: "100%" }}
        defaultCenter={center}
        defaultZoom={13}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      >
        {route && (
          <>
            <Polyline 
              path={route.path} 
              strokeColor="#3F51B5" 
              strokeOpacity={0.8} 
              strokeWeight={6} 
            />
            {route.stops.map((stop) => (
              <StopMarker key={stop.id} stop={stop} />
            ))}
          </>
        )}
        {busLocation && <BusMarker location={busLocation} />}
      </Map>
    </APIProvider>
  );
}
