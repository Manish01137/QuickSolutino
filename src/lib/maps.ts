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

export type WorldHub = { x: number; y: number; label: string; hq: boolean };

export type WorldMapArt = {
  width: number;
  height: number;
  dotsPath: string;
  hubs: WorldHub[];
};

const worldHubs = [
  { lat: 23.0225, lng: 72.5714, label: "Ahmedabad", hq: true },
  { lat: 40.7128, lng: -74.006, label: "New York" },
  { lat: 43.6532, lng: -79.3832, label: "Toronto" },
  { lat: 51.5074, lng: -0.1278, label: "London" },
  { lat: 50.1109, lng: 8.6821, label: "Frankfurt" },
  { lat: 25.2048, lng: 55.2708, label: "Dubai" },
  { lat: 1.3521, lng: 103.8198, label: "Singapore" },
  { lat: 35.6762, lng: 139.6503, label: "Tokyo" },
  { lat: -33.8688, lng: 151.2093, label: "Sydney" },
  { lat: -23.5505, lng: -46.6333, label: "São Paulo" },
  { lat: -26.2041, lng: 28.0473, label: "Johannesburg" },
];

let worldMapCache: WorldMapArt | null = null;

export function getWorldMap(): WorldMapArt {
  if (worldMapCache) return worldMapCache;

  const map = new DottedMap({ height: 46, grid: "diagonal" });
  // All dots as one path of zero-length segments: far lighter to render than ~1,800 <circle>s.
  const dotsPath = map
    .getPoints()
    .map((p) => `M${p.x.toFixed(2)} ${p.y.toFixed(2)}h0`)
    .join("");
  const hubs = worldHubs.flatMap((h) => {
    const p = map.getPin({ lat: h.lat, lng: h.lng });
    return p ? [{ x: p.x, y: p.y, label: h.label, hq: Boolean(h.hq) }] : [];
  });

  worldMapCache = { width: map.image.width, height: map.image.height, dotsPath, hubs };
  return worldMapCache;
}
