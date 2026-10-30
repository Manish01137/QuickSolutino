import Image from "next/image";

export function Logo({ dark = false }: { dark?: boolean }) {
  if (dark) {
    // Same logo as the navbar, in the white-text version for dark backgrounds.
    return (
      <Image
        src="/brand/quick-solutions-logo-white.svg"
        alt="Quick Solutions — Your Local Service Provider"
        width={200}
        height={78}
        className="h-12 w-auto sm:h-14"
      />
    );
  }

  return (
    <Image
      src="/brand/quick-solutions-logo.png"
      alt="Quick Solutions"
      width={200}
      height={78}
      priority
      className="h-9 w-auto"
    />
  );
}
