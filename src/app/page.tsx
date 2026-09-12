import { Hero } from "@/components/Hero";
import { StatsStrip } from "@/components/StatsStrip";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { MultiVendorSupport } from "@/components/MultiVendorSupport";
import { NationwideCoverage } from "@/components/NationwideCoverage";
import { IndustriesWeServe } from "@/components/IndustriesWeServe";
import { DeliveryCapabilities } from "@/components/DeliveryCapabilities";
import { FinalCTA } from "@/components/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <About />
      <Services />
      <MultiVendorSupport />
      <NationwideCoverage />
      <IndustriesWeServe />
      <DeliveryCapabilities />
      <FinalCTA />
    </>
  );
}
