"use client";

import { APIProvider, Map, AdvancedMarker, Polyline } from "@vis.gl/react-google-maps";
import config from "@/lib/config";
import type { BusRoute, LatLng } from "@/lib/types";
import Image from "next/image";

type MapViewProps = {
  route: BusRoute | null;
  busLocation: LatLng | null;
  center: LatLng;
};

export function MapView({ route, busLocation, center }: MapViewProps) {
  if (!config.googleMapsApiKey) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-muted">
        <p className="text-destructive-foreground bg-destructive p-4 rounded-md">
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
        defaultZoom={12}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      >
        {route && (
          <>
            <Polyline path={route.path} strokeColor="#3F51B5" strokeOpacity={0.8} strokeWeight={4} />
            {route.stops.map((stop) => (
              <AdvancedMarker key={stop.id} position={stop.location} title={stop.name}>
                 <Image src="/stop-icon.svg" alt={stop.name} width={24} height={24} />
              </AdvancedMarker>
            ))}
          </>
        )}
        {busLocation && (
           <AdvancedMarker position={busLocation} title="Current Bus Location">
             <Image src="/bus-icon.svg" alt="Bus Location" width={32} height={32} className="transition-all duration-1000 ease-linear" />
           </AdvancedMarker>
        )}
      </Map>
    </APIProvider>
  );
}
