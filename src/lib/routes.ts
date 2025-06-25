import type { BusRoute } from './types';

// This is mock data. In a real application, you'd fetch this from a server.
export const busRoutes: BusRoute[] = [
  {
    id: 'route-1',
    name: 'Route 1: North-South Express',
    // A simplified path from north to south
    path: [
      { lat: 37.8, lng: -122.4 },
      { lat: 37.79, lng: -122.4 },
      { lat: 37.78, lng: -122.41 },
      { lat: 37.77, lng: -122.42 },
      { lat: 37.76, lng: -122.43 },
    ],
    stops: [
      { id: 'stop-1-1', name: 'Uptown Plaza', location: { lat: 37.795, lng: -122.4 } },
      { id: 'stop-1-2', name: 'Central Station', location: { lat: 37.78, lng: -122.41 } },
      { id: 'stop-1-3', name: 'Downtown Park', location: { lat: 37.765, lng: -122.425 } },
    ],
  },
  {
    id: 'route-2',
    name: 'Route 2: East-West Corridor',
    // A simplified path from east to west
    path: [
      { lat: 37.77, lng: -122.39 },
      { lat: 37.77, lng: -122.41 },
      { lat: 37.77, lng: -122.43 },
      { lat: 37.77, lng: -122.45 },
      { lat: 37.77, lng: -122.47 },
    ],
    stops: [
      { id: 'stop-2-1', name: 'Bay Bridge Hub', location: { lat: 37.77, lng: -122.4 } },
      { id: 'stop-2-2', name: 'City Hall', location: { lat: 37.77, lng: -122.42 } },
      { id: 'stop-2-3', name: 'Ocean View', location: { lat: 37.77, lng: -122.46 } },
    ],
  },
  {
    id: 'route-3',
    name: 'Route 3: Suburban Loop',
    // A simplified loop
    path: [
        { lat: 37.75, lng: -122.45 },
        { lat: 37.74, lng: -122.47 },
        { lat: 37.73, lng: -122.46 },
        { lat: 37.74, lng: -122.44 },
        { lat: 37.75, lng: -122.45 },
    ],
    stops: [
      { id: 'stop-3-1', name: 'Green Valley Mall', location: { lat: 37.745, lng: -122.46 } },
      { id: 'stop-3-2', name: 'Sunset District', location: { lat: 37.735, lng: -122.465 } },
      { id: 'stop-3-3', name: 'Hilltop College', location: { lat: 37.745, lng: -122.445 } },
    ],
  },
];
