import { Coordinates } from '../interfaces';

// Haversine formula
export const getDistanceFromLatLon = (origin: Coordinates, destination: Coordinates): number => {
  const earthRadius = 6371; // In km
  const differenceLatitude = degreesToradius(destination.latitude - origin.latitude); // deg2rad below
  const differenceLongitude = degreesToradius(destination.longitude - origin.longitude);
  const a =
    Math.sin(differenceLatitude / 2) * Math.sin(differenceLatitude / 2) +
    Math.cos(degreesToradius(origin.latitude)) *
      Math.cos(degreesToradius(destination.latitude)) *
      Math.sin(differenceLongitude / 2) *
      Math.sin(differenceLongitude / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = earthRadius * c; // Distance in km
  return d;
};

const degreesToradius = (deg: number) => {
  return deg * (Math.PI / 180);
};
