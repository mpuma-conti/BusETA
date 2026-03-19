
"use client";

import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

type PolylineProps = google.maps.PolylineOptions & {
  path: google.maps.LatLngLiteral[];
};

export function Polyline({ path, ...options }: PolylineProps) {
  const map = useMap();
  const mapsLib = useMapsLibrary("maps");
  const [polyline, setPolyline] = useState<google.maps.Polyline | null>(null);

  useEffect(() => {
    if (!mapsLib || !map) return;

    const poly = new mapsLib.Polyline({
      map,
      path,
      ...options,
    });

    setPolyline(poly);

    return () => {
      poly.setMap(null);
    };
  }, [mapsLib, map]);

  useEffect(() => {
    if (polyline) {
      polyline.setOptions({ path, ...options });
    }
  }, [polyline, path, options]);

  return null;
}
