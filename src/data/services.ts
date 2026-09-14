export type ServiceSection = {
  heading: string;
  items?: string[];
  body?: string;
  showVendorLogos?: boolean;
};

export type ServiceHighlight = {
  icon: string;
  title: string;
  description: string;
};

export type ProcessStep = {
  title: string;
  description?: string;
};

export type Service = {
  slug: string;
  navTitle: string;
  icon: string;
  image: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  subhead: string;
  intro: string;
  sections: ServiceSection[];
  highlights?: ServiceHighlight[];
  process?: ProcessStep[];
  ctaHeading: string;
  ctaBody: string;
  ctaPrimary: string;
};

export const services: Service[] = [
  {
    slug: "smart-hands-remote-hands",
    navTitle: "Smart Hands & Remote Hands",
    icon: "handMetal",
    image:
      "https://images.unsplash.com/photo-1629837093109-11325d6e7afd?w=1200&q=75&auto=format&fit=crop",
    seoTitle: "Smart Hands & Remote Hands Services | Quick Solutions",
    metaDescription:
      "Reliable Smart Hands and Remote Hands IT support for data centers, servers, storage and networking infrastructure. Get skilled onsite engineers across India and 100+ countries.",
    h1: "Smart Hands & Remote Hands Services",
    subhead: "Reliable Onsite IT Support, Wherever Your Infrastructure Is",
    intro:
      "Managing IT infrastructure across multiple locations can be challenging, especially when your technical team cannot be physically present at every site. Quick Solutions provides Smart Hands and Remote Hands services to give your IT teams reliable, skilled technical support at the location where it is needed. From rack and stack, hardware replacement and equipment checks to troubleshooting, installations and data center support, our engineers help you manage physical IT infrastructure efficiently while reducing response time and operational complexity. Our service model combines local technical expertise with global reach, supporting customers across India and 100+ countries.",
    sections: [
      {
        heading: "Our Smart Hands & Remote Hands Services",
        items: [
          "Server and storage hardware support",
          "Network equipment support",
          "Rack & stack services",
          "Hardware installation and replacement",
          "Equipment inspection and health checks",
          "Troubleshooting and issue resolution",
          "Power cycling and device resets",
          "Cable checking and physical connectivity support",
          "Data center hands-on assistance",
          "IMAC support",
          "Site surveys",
          "Preventive maintenance",
        ],
      },
    ],
    highlights: [
      {
        icon: "userCheck",
        title: "Skilled Engineers",
        description:
          "Access experienced technical resources without maintaining an onsite team at every location.",
      },
      {
        icon: "clock",
        title: "24x7x365 Support",
        description:
          "Our operations are designed to provide round-the-clock support when your infrastructure needs assistance.",
      },
      {
        icon: "layers",
        title: "Multi-Vendor Expertise",
        description:
          "Support for leading infrastructure brands including HP, IBM, Dell, Cisco, Fujitsu, NetApp, EMC, Hitachi, Oracle and others.",
      },
      {
        icon: "globe2",
        title: "Global Coverage",
        description:
          "Support across India, APAC, Europe, Middle East, Africa, Americas and other locations through our service network and partners.",
      },
    ],
    ctaHeading: "Need an engineer onsite?",
    ctaBody:
      "Get reliable Smart Hands & Remote Hands support for your IT infrastructure.",
    ctaPrimary: "Talk to Quick Solutions Today",
  },
  {
    slug: "third-party-hardware-maintenance",
    navTitle: "Third-Party Hardware Maintenance",
    icon: "wrench",
    image:
      "https://images.unsplash.com/photo-1595633060827-ac7651e89a7a?w=1200&q=75&auto=format&fit=crop",
    seoTitle: "Third-Party Hardware Maintenance Services | Quick Solutions",
    metaDescription:
      "Reduce IT maintenance costs with reliable third-party hardware maintenance for servers, storage and networking equipment. Multi-vendor support with flexible SLA options.",
    h1: "Third-Party Hardware Maintenance Services",
    subhead: "Reliable Multi-Vendor IT Hardware Support Without OEM Dependency",
    intro:
      "Keeping critical IT hardware operational doesn't always require expensive OEM maintenance contracts. Quick Solutions provides third-party hardware maintenance services for servers, storage systems, networking equipment and other IT infrastructure, helping businesses maintain reliable operations while optimizing maintenance costs. Our multi-vendor approach enables organizations to manage infrastructure from multiple manufacturers through a single experienced service partner.",
    sections: [
      {
        heading: "What We Support",
        items: [
          "Servers",
          "Storage systems",
          "Networking equipment",
          "Switches",
          "Workstations",
          "Desktops and laptops",
          "Printers",
          "Tape libraries",
          "Data center hardware",
          "Enterprise IT infrastructure",
        ],
        body: "Quick Solutions has experience supporting major technology brands including:",
        showVendorLogos: true,
      },
      {
        heading: "Benefits",
        items: [
          "Reduce hardware maintenance costs",
          "Extend the useful life of existing infrastructure",
          "Reduce dependency on OEM contracts",
          "One partner for multiple vendors",
          "Flexible support models",
          "Faster onsite response",
          "Improved infrastructure availability",
        ],
      },
    ],
    highlights: [
      {
        icon: "wrench",
        title: "Hardware Break-Fix",
        description: "Diagnosis, repair and replacement of defective hardware.",
      },
      {
        icon: "shieldCheck",
        title: "Preventive Maintenance",
        description:
          "Regular infrastructure checks designed to identify potential issues before they become major failures.",
      },
      {
        icon: "layers",
        title: "Multi-Vendor Support",
        description:
          "Manage different hardware manufacturers through one service provider.",
      },
      {
        icon: "shoppingCart",
        title: "Spare Parts Support",
        description:
          "Access to required replacement components and spare management.",
      },
      {
        icon: "handMetal",
        title: "Onsite Engineering",
        description:
          "Skilled engineers available for onsite hardware support and technical activities.",
      },
    ],
    ctaHeading: "Looking for a reliable alternative to OEM hardware maintenance?",
    ctaBody:
      "Talk to Quick Solutions about a customized third-party maintenance solution.",
    ctaPrimary: "Talk to Quick Solutions Today",
  },
  {
    slug: "server-storage-network-support",
    navTitle: "Server, Storage & Network Support",
    icon: "server",
    image:
      "https://images.unsplash.com/photo-1584169417032-d34e8d805e8b?w=1200&q=75&auto=format&fit=crop",
    seoTitle: "Server, Storage & Network Support Services | Quick Solutions",
    metaDescription:
      "Expert server, storage and network infrastructure support for enterprise IT environments. Multi-vendor hardware support with 24x7 service and global coverage.",
    h1: "Server, Storage & Network Support",
    subhead: "Expert Support for Your Critical IT Infrastructure",
    intro:
      "Your servers, storage systems and network infrastructure form the foundation of your business operations. Quick Solutions provides server, storage and network support services designed to help organizations maintain reliable, secure and efficient IT infrastructure. Our experienced engineers support a wide range of enterprise hardware and infrastructure environments across multiple vendors.",
    sections: [
      {
        heading: "Server Support",
        items: [
          "Hardware troubleshooting",
          "Component replacement",
          "Server installation",
          "Hardware upgrades",
          "Preventive maintenance",
          "Break-fix support",
          "Rack & stack",
          "Server relocation",
          "Physical inspection",
        ],
      },
      {
        heading: "Storage Support",
        items: [
          "Storage hardware maintenance",
          "Component replacement",
          "Storage installation",
          "Hardware troubleshooting",
          "Preventive maintenance",
          "Onsite technical support",
          "Equipment relocation",
        ],
      },
      {
        heading: "Network Support",
        items: [
          "Switch support",
          "Network equipment installation",
          "Hardware replacement",
          "Network point installation",
          "Physical connectivity checks",
          "Troubleshooting",
          "Preventive maintenance",
          "Onsite network support",
        ],
      },
      {
        heading: "Multi-Vendor Infrastructure Support",
        body: "Quick Solutions supports infrastructure from leading vendors including:",
        showVendorLogos: true,
      },
    ],
    ctaHeading: "Keep Your IT Infrastructure Running.",
    ctaBody:
      "Get expert server, storage and network support from Quick Solutions.",
    ctaPrimary: "Talk to Quick Solutions Today",
  },
  {
    slug: "imac-end-user-computing",
    navTitle: "IMAC & End-User Computing",
    icon: "monitor",
    image:
      "https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?w=1200&q=75&auto=format&fit=crop",
    seoTitle: "IMAC & End-User Computing Services | Quick Solutions",
    metaDescription:
      "Professional IMAC and end-user computing support for desktops, laptops, printers and workplace IT infrastructure. Nationwide onsite IT support across India.",
    h1: "IMAC & End-User Computing Services",
    subhead: "Simplify IT Changes Across Your Workplace",
    intro:
      "Managing thousands of devices across offices, branches and remote locations requires reliable technical resources. Quick Solutions provides IMAC and End-User Computing services covering the complete lifecycle of workplace IT equipment — from installation and movement to upgrades, changes and decommissioning.",
    sections: [
      {
        heading: "End-User Computing Support",
        items: [
          "Desktops",
          "Laptops",
          "Workstations",
          "Monitors",
          "Printers",
          "UPS systems",
          "Peripherals",
          "Workplace IT equipment",
        ],
        body: "Our company profile also highlights doorstep support for desktops, laptops, printers, UPS systems and monitors.",
      },
      {
        heading: "Why Businesses Choose Our IMAC Services",
        items: [
          "Nationwide onsite support",
          "Skilled technical engineers",
          "Flexible deployment models",
          "Large-scale rollout capability",
          "Faster response",
          "Reduced internal IT workload",
          "Centralized service coordination",
        ],
      },
    ],
    highlights: [
      {
        icon: "hammer",
        title: "Install",
        description: "Deployment and installation of new IT equipment.",
      },
      {
        icon: "truck",
        title: "Move",
        description:
          "Safe movement of IT equipment between locations, floors, workstations or offices.",
      },
      {
        icon: "layoutGrid",
        title: "Add",
        description:
          "Deployment of additional devices, peripherals and infrastructure.",
      },
      {
        icon: "settings2",
        title: "Change",
        description:
          "Hardware replacements, upgrades and configuration-related activities.",
      },
    ],
    ctaHeading: "Need IT Support Across Multiple Locations?",
    ctaBody:
      "Let Quick Solutions manage your workplace IT infrastructure while your team focuses on the business.",
    ctaPrimary: "Talk to Quick Solutions Today",
  },
  {
    slug: "data-center-support",
    navTitle: "Data Center Support",
    icon: "database",
    image:
      "https://images.unsplash.com/photo-1639066648921-82d4500abf1a?w=1200&q=75&auto=format&fit=crop",
    seoTitle:
      "Data Center Support Services | Smart Hands & IT Infrastructure | Quick Solutions",
    metaDescription:
      "Professional data center support including Smart Hands, rack & stack, hardware replacement, monitoring, maintenance and onsite engineering services.",
    h1: "Data Center Support Services",
    subhead: "Reliable Support for Mission-Critical Data Center Infrastructure",
    intro:
      "Your data center cannot afford unnecessary downtime. Quick Solutions provides data center support services designed to help organizations maintain, monitor and manage critical IT infrastructure with skilled technical resources. From routine physical tasks to hardware replacement and infrastructure checks, our engineers provide the onsite support your data center requires.",
    sections: [
      {
        heading: "Our Data Center Services",
        items: [
          "Smart Hands & Remote Hands",
          "Rack & Stack",
          "Server installation",
          "Storage installation",
          "Hardware replacement",
          "Equipment inspection",
          "Preventive maintenance",
          "Cable management",
          "Network equipment support",
          "Hardware troubleshooting",
          "Site surveys",
          "Data center relocations",
          "IMAC services",
        ],
      },
      {
        heading: "24x7 Data Center Support",
        body: "Our support model includes 24x7x365 operations, helping businesses access technical resources whenever required.",
      },
      {
        heading: "Multi-Vendor Data Center Expertise",
        body: "Our engineers support servers, storage, networking equipment, switches and other enterprise infrastructure from multiple technology vendors.",
      },
      {
        heading: "Data Center Support Across India & Globally",
        body: "Quick Solutions provides Pan-India coverage and global support capabilities, allowing organizations to work with a single service partner across multiple locations.",
      },
    ],
    ctaHeading: "Need Reliable Data Center Support?",
    ctaBody: "Get skilled engineers where and when your infrastructure needs them.",
    ctaPrimary: "Talk to Quick Solutions Today",
  },
  {
    slug: "structured-cabling-site-surveys",
    navTitle: "Structured Cabling & Site Surveys",
    icon: "cable",
    image:
      "https://images.unsplash.com/photo-1683322499436-f4383dd59f5a?w=1200&q=75&auto=format&fit=crop",
    seoTitle: "Structured Cabling & Site Survey Services | Quick Solutions",
    metaDescription:
      "Professional structured cabling, network point installation and IT infrastructure site survey services for offices, data centers and enterprise environments.",
    h1: "Structured Cabling & Site Survey Services",
    subhead: "Build IT Infrastructure That Performs Reliably",
    intro:
      "A well-designed physical infrastructure is the foundation of reliable network and IT operations. Quick Solutions provides structured cabling and site survey services to help businesses plan, install and optimize their physical IT infrastructure. Our engineers assess the environment, identify infrastructure requirements and support cabling and network installation activities.",
    sections: [
      {
        heading: "Structured Cabling Services",
        items: [
          "Network cabling installation",
          "Network point installation",
          "Data center cabling",
          "Server rack cabling",
          "Cable organization",
          "Infrastructure audits",
          "Connectivity checks",
          "Cable labeling",
          "Physical infrastructure assessment",
        ],
      },
      {
        heading: "IT Site Survey Services",
        body: "Before implementing or upgrading IT infrastructure, our engineers can assess:",
        items: [
          "Site readiness",
          "Equipment locations",
          "Rack requirements",
          "Network points",
          "Cabling requirements",
          "Physical infrastructure",
          "Installation requirements",
          "Potential deployment challenges",
        ],
      },
      {
        heading: "Why Conduct a Site Survey?",
        body: "A professional site survey helps organizations:",
        items: [
          "Plan infrastructure accurately",
          "Identify potential installation challenges",
          "Reduce deployment delays",
          "Optimize equipment placement",
          "Improve network infrastructure planning",
          "Prepare for future expansion",
        ],
      },
    ],
    ctaHeading: "Planning a New IT Infrastructure Project?",
    ctaBody:
      "Start with a professional site survey and infrastructure assessment from Quick Solutions.",
    ctaPrimary: "Talk to Quick Solutions Today",
  },
  {
    slug: "project-rollouts-migrations-deployments",
    navTitle: "Project Rollouts, Migrations & Deployments",
    icon: "rocket",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&q=75&auto=format&fit=crop",
    seoTitle:
      "IT Project Rollouts, Migrations & Deployment Services | Quick Solutions",
    metaDescription:
      "End-to-end IT rollout, migration and deployment services with skilled engineers, nationwide coverage and project-based support for enterprise infrastructure.",
    h1: "Project Rollouts, Migrations & Deployments",
    subhead: "Execute IT Projects With Confidence",
    intro:
      "Large-scale IT deployments require careful planning, coordination and execution. Quick Solutions provides IT project rollout, migration and deployment services to help organizations execute infrastructure projects efficiently across multiple locations. Whether you're deploying new hardware, upgrading existing infrastructure or migrating IT environments, our technical teams provide the onsite resources required to execute your project.",
    sections: [
      {
        heading: "Our Project Services",
        items: [
          "Hardware rollouts",
          "Server deployments",
          "Storage deployments",
          "Network equipment deployment",
          "Desktop & laptop rollouts",
          "IMAC projects",
          "Hardware refresh projects",
          "Data center deployments",
          "Infrastructure migrations",
          "Equipment replacement",
          "Site surveys",
          "Installation projects",
          "Decommissioning",
          "Projects & installations, more broadly, across every stage of the rollout",
        ],
        body: "Quick Solutions' company material specifically identifies rollouts, installations, IMAC, TPM support, site surveys, procurement of parts and data center/office relocations among delivered projects.",
      },
      {
        heading: "Flexible Project Engagement",
        body: "Choose the level of support you need:",
        items: [
          "Project-based engineers",
          "Dedicated resources",
          "Location-based deployment",
          "Nationwide rollout support",
          "Multi-location deployment",
          "Short-term technical resources",
        ],
      },
    ],
    process: [
      { title: "Planning" },
      { title: "Site Survey" },
      { title: "Logistics" },
      { title: "Installation" },
      { title: "Configuration Support" },
      { title: "Testing" },
      { title: "Documentation" },
      { title: "Handover" },
    ],
    ctaHeading: "Planning an IT Rollout or Migration?",
    ctaBody:
      "Let our technical team help you plan and execute your next infrastructure project.",
    ctaPrimary: "Talk to Quick Solutions Today",
  },
  {
    slug: "dedicated-onsite-resident-engineers",
    navTitle: "Dedicated Onsite & Resident Engineers",
    icon: "badgeCheck",
    image:
      "https://images.unsplash.com/photo-1785682117028-6fcf2c0b515b?w=1200&q=75&auto=format&fit=crop",
    seoTitle: "Dedicated Onsite & Resident IT Engineers | Quick Solutions",
    metaDescription:
      "Deploy dedicated onsite and resident IT engineers for ongoing infrastructure support, data centers, enterprise IT environments and end-user support.",
    h1: "Dedicated Onsite & Resident Engineers",
    subhead: "Dedicated Technical Expertise. Right Where You Need It.",
    intro:
      "Some IT environments require more than on-demand support. Quick Solutions provides dedicated onsite and resident engineer services for organizations that require continuous technical resources at their facilities. Our engineers can work as an extension of your internal IT team, providing hands-on support for infrastructure, users, data centers and ongoing technical operations.",
    sections: [
      {
        heading: "Dedicated Engineer Services",
        body: "Depending on your requirements, engineers can support:",
        items: [
          "Server infrastructure",
          "Storage systems",
          "Network infrastructure",
          "Data center operations",
          "End-user computing",
          "Hardware maintenance",
          "IT installations",
          "IMAC activities",
          "Preventive maintenance",
          "Infrastructure monitoring",
          "Technical troubleshooting",
          "Asset-related activities",
        ],
      },
    ],
    highlights: [
      {
        icon: "userCheck",
        title: "Dedicated Resource",
        description: "Get a technical professional assigned to your environment.",
      },
      {
        icon: "zap",
        title: "Faster Response",
        description: "Reduce the time required to dispatch an engineer.",
      },
      {
        icon: "gauge",
        title: "Better Infrastructure Familiarity",
        description:
          "Dedicated resources develop deeper knowledge of your environment and processes.",
      },
      {
        icon: "settings2",
        title: "Flexible Engagement",
        description:
          "Scale technical resources based on your operational requirements.",
      },
      {
        icon: "handshake",
        title: "Extension of Your IT Team",
        description:
          "Expand your technical capabilities without the overhead of hiring and managing additional permanent staff.",
      },
    ],
    ctaHeading: "Need Dedicated IT Engineering Support?",
    ctaBody:
      "Tell us about your environment and we'll help you design the right onsite support model.",
    ctaPrimary: "Talk to Quick Solutions Today",
  },
  {
    slug: "warehousing-logistics-spare-management",
    navTitle: "Warehousing, Logistics & Spare Management",
    icon: "warehouse",
    image:
      "https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&q=75&auto=format&fit=crop",
    seoTitle:
      "IT Warehousing, Logistics & Spare Management Services | Quick Solutions",
    metaDescription:
      "Secure IT equipment warehousing, inventory, logistics and spare parts management services to support deployments, maintenance and infrastructure operations.",
    h1: "IT Warehousing, Logistics & Spare Management",
    subhead: "The Right Equipment. The Right Location. At the Right Time.",
    intro:
      "IT infrastructure projects often depend on more than skilled engineers. Equipment, replacement parts and hardware need to be available at the right location at the right time. Quick Solutions provides IT warehousing, logistics and spare management services to support infrastructure deployments, maintenance operations and large-scale IT projects.",
    sections: [
      {
        heading: "Benefits",
        items: [
          "Better spare availability",
          "Faster hardware replacement",
          "Reduced equipment handling complexity",
          "Centralized inventory management",
          "Improved project coordination",
          "Support for multi-location deployments",
          "Reduced infrastructure downtime",
        ],
      },
      {
        heading: "Supporting the Complete IT Infrastructure Lifecycle",
        body: "From procurement and warehousing to deployment, maintenance, replacement and relocation, Quick Solutions can provide technical and operational support across the IT infrastructure lifecycle. The company's project portfolio includes procurement of parts and data center/office relocations alongside Smart Hands, rollouts, IMAC and installations.",
      },
    ],
    highlights: [
      {
        icon: "warehouse",
        title: "IT Equipment Warehousing",
        description:
          "Secure storage and management of IT equipment before deployment or installation.",
      },
      {
        icon: "layoutGrid",
        title: "Inventory Management",
        description:
          "Track and manage equipment, components and spare parts required for ongoing operations.",
      },
      {
        icon: "shoppingCart",
        title: "Spare Parts Management",
        description:
          "Maintain availability of critical replacement components to support faster hardware resolution.",
      },
      {
        icon: "truck",
        title: "IT Logistics",
        description:
          "Coordinate movement and delivery of IT equipment between warehouses, offices, data centers and project locations.",
      },
      {
        icon: "rocket",
        title: "Project Logistics",
        description:
          "Support equipment movement for large-scale rollouts, migrations and deployment projects.",
      },
    ],
    ctaHeading: "Need Better Control Over IT Hardware & Spares?",
    ctaBody:
      "Talk to Quick Solutions about warehousing, logistics and spare management support.",
    ctaPrimary: "Talk to Quick Solutions Today",
  },
  {
    slug: "data-center-office-relocations",
    navTitle: "Data Center & Office Relocations",
    icon: "truck",
    image:
      "https://images.unsplash.com/photo-1783419538460-676cb89a0d19?w=1200&q=75&auto=format&fit=crop",
    seoTitle: "Data Center & Office Relocation Services | Quick Solutions",
    metaDescription:
      "Professional data center and office relocation services including IT equipment planning, de-installation, transportation, installation and deployment support.",
    h1: "Data Center & Office Relocation Services",
    subhead: "Move Your IT Infrastructure Without Disrupting Your Business",
    intro:
      "Relocating IT infrastructure requires careful planning, coordination and technical execution. Quick Solutions provides data center and office relocation services to help organizations move critical IT equipment safely and efficiently. From planning and equipment handling to installation and post-move support, our engineers can assist throughout the relocation process.",
    sections: [
      {
        heading: "Data Center Relocation Services",
        items: [
          "Pre-move site surveys",
          "Infrastructure assessment",
          "Equipment identification",
          "Rack documentation",
          "De-installation",
          "Hardware handling",
          "Equipment transportation coordination",
          "Rack & stack",
          "Reinstallation",
          "Cabling support",
          "Hardware testing",
          "Post-move technical support",
        ],
      },
      {
        heading: "Office IT Relocation Services",
        body: "We support the relocation of:",
        items: [
          "Servers",
          "Storage",
          "Network equipment",
          "Desktops",
          "Laptops",
          "Printers",
          "Monitors",
          "Workstations",
          "IT peripherals",
        ],
      },
    ],
    process: [
      {
        title: "Plan",
        description:
          "Understand infrastructure, locations, timelines and dependencies.",
      },
      {
        title: "Survey",
        description: "Assess the existing and destination sites.",
      },
      {
        title: "Prepare",
        description:
          "Document equipment and prepare the infrastructure for movement.",
      },
      {
        title: "Relocate",
        description: "Coordinate safe handling and movement of IT equipment.",
      },
      {
        title: "Install",
        description: "Reinstall equipment at the new location.",
      },
      {
        title: "Test & Validate",
        description: "Check physical infrastructure and equipment after deployment.",
      },
      {
        title: "Handover",
        description: "Complete the relocation and provide post-move support.",
      },
    ],
    ctaHeading: "Planning a Data Center or Office Move?",
    ctaBody: "Let Quick Solutions manage the technical side of your IT relocation.",
    ctaPrimary: "Talk to Quick Solutions Today",
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}
