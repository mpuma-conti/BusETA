export type LatLng = {
  lat: number;
  lng: number;
};

export type BusStop = {
  id: string;
  name: string;
  location: LatLng;
};

export type BusRoute = {
  id: string;
  name: string;
  path: LatLng[];
  stops: BusStop[];
};

export type DriverInfo = {
  name: string;
  routeId: string;
};
