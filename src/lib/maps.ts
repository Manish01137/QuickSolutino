import DottedMap from "dotted-map";

export type MapPoint = {
  x: number;
  y: number;
  data?: { hub?: boolean; label?: string };
};

export type MapArt = {
  width: number;
  height: number;
  dots: MapPoint[];
  hubs: MapPoint[];
};

const regionHubs = [
  { lat: 40.7128, lng: -74.006, label: "Americas" },
  { lat: 51.5074, lng: -0.1278, label: "Europe" },
  { lat: 25.2048, lng: 55.2708, label: "Middle East" },
  { lat: 28.6139, lng: 77.209, label: "Asia Pacific" },
];

let worldMapCache: MapArt | null = null;

export function getWorldMap(): MapArt {
  if (worldMapCache) return worldMapCache;

  const map = new DottedMap({ height: 56, grid: "diagonal" });

  regionHubs.forEach((hub) => {
    map.addPin({
      lat: hub.lat,
      lng: hub.lng,
      data: { hub: true, label: hub.label },
    });
  });

  const points = map.getPoints();
  const dots: MapPoint[] = [];
  const hubs: MapPoint[] = [];

  for (const p of points) {
    const data = p.data as MapPoint["data"];
    if (data?.hub) {
      hubs.push({ x: p.x, y: p.y, data });
    } else {
      dots.push({ x: p.x, y: p.y });
    }
  }

  worldMapCache = { width: map.image.width, height: map.image.height, dots, hubs };
  return worldMapCache;
}

const indiaCities = [
  { lat: 28.6139, lng: 77.209, label: "Delhi" },
  { lat: 19.076, lng: 72.8777, label: "Mumbai" },
  { lat: 12.9716, lng: 77.5946, label: "Bengaluru" },
  { lat: 13.0827, lng: 80.2707, label: "Chennai" },
  { lat: 22.5726, lng: 88.3639, label: "Kolkata" },
  { lat: 17.385, lng: 78.4867, label: "Hyderabad" },
  { lat: 18.5204, lng: 73.8567, label: "Pune" },
  { lat: 23.0225, lng: 72.5714, label: "Ahmedabad" },
  { lat: 26.9124, lng: 75.7873, label: "Jaipur" },
  { lat: 26.8467, lng: 80.9462, label: "Lucknow" },
  { lat: 30.7333, lng: 76.7794, label: "Chandigarh" },
  { lat: 9.9312, lng: 76.2673, label: "Kochi" },
];

let indiaMapCache: MapArt | null = null;

export function getIndiaMap(): MapArt {
  if (indiaMapCache) return indiaMapCache;

  const map = new DottedMap({ height: 52, countries: ["IND"], grid: "diagonal" });

  indiaCities.forEach((city) => {
    map.addPin({
      lat: city.lat,
      lng: city.lng,
      data: { hub: true, label: city.label },
    });
  });

  const points = map.getPoints();
  const dots: MapPoint[] = [];
  const hubs: MapPoint[] = [];

  for (const p of points) {
    const data = p.data as MapPoint["data"];
    if (data?.hub) {
      hubs.push({ x: p.x, y: p.y, data });
    } else {
      dots.push({ x: p.x, y: p.y });
    }
  }

  indiaMapCache = { width: map.image.width, height: map.image.height, dots, hubs };
  return indiaMapCache;
}
