"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import { busRoutes } from '@/lib/routes';
import type { BusRoute, DriverInfo, LatLng, BusStop } from '@/lib/types';
import { useToast } from './use-toast';

const DRIVER_INFO_KEY = 'buseta_driver_info';
const BUS_LOCATION_KEY = 'buseta_bus_location';

// Simple haversine distance calculation
function getDistance(p1: LatLng, p2: LatLng) {
  const R = 6371; // Radius of the Earth in km
  const dLat = (p2.lat - p1.lat) * Math.PI / 180;
  const dLon = (p2.lng - p1.lng) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(p1.lat * Math.PI / 180) * Math.cos(p2.lat * Math.PI / 180) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

export function useBusTracking() {
  const { toast } = useToast();
  const [driverInfo, setDriverInfo] = useState<DriverInfo | null>(null);
  const [busLocation, setBusLocation] = useState<LatLng | null>(null);
  const [activeRoute, setActiveRoute] = useState<BusRoute | null>(null);
  const [nextStop, setNextStop] = useState<BusStop | null>(null);
  const [eta, setEta] = useState<number | null>(null); // ETA in minutes
  const [isTracking, setIsTracking] = useState(false);

  // Load initial state from localStorage
  useEffect(() => {
    try {
      const storedDriverInfo = localStorage.getItem(DRIVER_INFO_KEY);
      if (storedDriverInfo) {
        const info: DriverInfo = JSON.parse(storedDriverInfo);
        setDriverInfo(info);
        const route = busRoutes.find(r => r.id === info.routeId);
        setActiveRoute(route || null);
      }

      const storedBusLocation = localStorage.getItem(BUS_LOCATION_KEY);
      if (storedBusLocation) {
        setBusLocation(JSON.parse(storedBusLocation));
      }
    } catch (error) {
      console.error("Failed to parse from localStorage", error);
    }
  }, []);
  
  // Persist state to localStorage
  useEffect(() => {
    try {
      if (driverInfo) {
        localStorage.setItem(DRIVER_INFO_KEY, JSON.stringify(driverInfo));
      } else {
        localStorage.removeItem(DRIVER_INFO_KEY);
      }
    } catch (error) {
      console.error("Failed to save to localStorage", error);
    }
  }, [driverInfo]);

  useEffect(() => {
    try {
      if (busLocation) {
        localStorage.setItem(BUS_LOCATION_KEY, JSON.stringify(busLocation));
      } else {
        localStorage.removeItem(BUS_LOCATION_KEY);
      }
    } catch (error) {
       console.error("Failed to save to localStorage", error);
    }
  }, [busLocation]);

  const startTracking = useCallback((info: DriverInfo) => {
    const route = busRoutes.find(r => r.id === info.routeId);
    if (!route) {
      toast({ title: "Error", description: "Invalid route selected.", variant: "destructive" });
      return;
    }
    setDriverInfo(info);
    setActiveRoute(route);
    setBusLocation(route.path[0]);
    setIsTracking(true);
    toast({ title: "Trip Started", description: `Driver ${info.name} is on ${route.name}.` });
  }, [toast]);
  
  const stopTracking = useCallback(() => {
    setIsTracking(false);
    setNextStop(null);
    setEta(null);
    toast({ title: "Trip Ended", description: "Location tracking has stopped." });
  }, [toast]);

  // Bus movement simulation
  useEffect(() => {
    if (!isTracking || !activeRoute) return;

    let currentPathIndex = 0;
    const interval = setInterval(() => {
      setBusLocation(prevLocation => {
        if (!prevLocation || !activeRoute.path[currentPathIndex]) return prevLocation;

        const targetPoint = activeRoute.path[currentPathIndex + 1];
        if (!targetPoint) {
            stopTracking();
            return activeRoute.path[activeRoute.path.length-1];
        }

        const distanceToTarget = getDistance(prevLocation, targetPoint);
        const speed = 50 / 3600; // 50 km/h in km per second
        
        if (distanceToTarget < speed) {
            currentPathIndex++;
            return targetPoint;
        } else {
            const newLat = prevLocation.lat + (targetPoint.lat - prevLocation.lat) * speed / distanceToTarget;
            const newLng = prevLocation.lng + (targetPoint.lng - prevLocation.lng) * speed / distanceToTarget;
            return { lat: newLat, lng: newLng };
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isTracking, activeRoute, stopTracking]);

  // ETA Calculation
  useEffect(() => {
    if (!busLocation || !activeRoute) {
        setNextStop(null);
        setEta(null);
        return;
    }

    let closestPathIndex = -1;
    let minDistance = Infinity;
    activeRoute.path.forEach((p, index) => {
        const d = getDistance(busLocation, p);
        if(d < minDistance) {
            minDistance = d;
            closestPathIndex = index;
        }
    });

    const remainingStops = activeRoute.stops.filter(stop => {
      let closestStopPathIndex = -1;
      let minStopDistance = Infinity;
        activeRoute.path.forEach((p, index) => {
          const d = getDistance(stop.location, p);
          if(d < minStopDistance) {
              minStopDistance = d;
              closestStopPathIndex = index;
          }
      });
      return closestStopPathIndex > closestPathIndex;
    });

    const currentNextStop = remainingStops[0] || null;
    setNextStop(currentNextStop);

    if (currentNextStop) {
      const distance = getDistance(busLocation, currentNextStop.location);
      const speedKmh = 40; // Assume average speed of 40 km/h
      const timeHours = distance / speedKmh;
      const timeMinutes = Math.round(timeHours * 60);
      setEta(timeMinutes);
    } else {
      setEta(null);
    }
  }, [busLocation, activeRoute]);
  
  // For passenger view to listen to changes from another tab (driver)
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === BUS_LOCATION_KEY && event.newValue) {
        setBusLocation(JSON.parse(event.newValue));
      }
      if (event.key === DRIVER_INFO_KEY && event.newValue) {
        const info = JSON.parse(event.newValue);
        setDriverInfo(info);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  

  return { driverInfo, busLocation, activeRoute, nextStop, eta, startTracking, stopTracking, isTracking };
}
