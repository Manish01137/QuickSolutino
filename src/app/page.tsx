import { Hero } from "@/components/Hero";
import { StatsStrip } from "@/components/StatsStrip";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { MultiVendorSupport } from "@/components/MultiVendorSupport";
import { IndustriesWeServe } from "@/components/IndustriesWeServe";
import { GlobalCoverage } from "@/components/GlobalCoverage";
import { FinalCTA } from "@/components/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <About />
      <Services />
      <MultiVendorSupport />
      <IndustriesWeServe />
      <GlobalCoverage />
      <FinalCTA />
    </>
  );
}
