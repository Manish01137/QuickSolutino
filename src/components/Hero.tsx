import { getWorldMap } from "@/lib/maps";
import { HeroClient } from "./hero/HeroClient";

export function Hero() {
  return <HeroClient map={getWorldMap()} />;
}
