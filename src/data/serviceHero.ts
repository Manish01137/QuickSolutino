// The photo region inside each service banner (fractions of the image), chosen to
// exclude the text and callouts baked into the artwork. The hero rebuilds those as live UI.
export type PhotoCrop = { x: number; y: number; w: number; h: number };

export const serviceHeroCrops: Record<string, PhotoCrop> = {
  "smart-hands-remote-hands": { x: 0.03, y: 0.35, w: 0.44, h: 0.49 },
  "third-party-hardware-maintenance": { x: 0.4, y: 0, w: 0.4, h: 1 },
  "server-storage-network-support": { x: 0.39, y: 0.05, w: 0.34, h: 0.95 },
  "imac-end-user-computing": { x: 0.48, y: 0.33, w: 0.45, h: 0.67 },
  "data-center-support": { x: 0.37, y: 0, w: 0.41, h: 1 },
  "structured-cabling-site-surveys": { x: 0.48, y: 0.32, w: 0.4, h: 0.68 },
  "project-rollouts-migrations-deployments": { x: 0.44, y: 0.3, w: 0.4, h: 0.7 },
  "dedicated-onsite-resident-engineers": { x: 0.47, y: 0, w: 0.33, h: 1 },
  "warehousing-logistics-spare-management": { x: 0.38, y: 0, w: 0.41, h: 0.86 },
  "data-center-office-relocations": { x: 0.5, y: 0.45, w: 0.32, h: 0.55 },
};

export const DEFAULT_CROP: PhotoCrop = { x: 0.4, y: 0, w: 0.45, h: 1 };
