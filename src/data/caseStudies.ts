export type CaseStudyAction = {
  heading: string;
  body: string;
};

export type CaseStudyOutcome = {
  heading: string;
  body: string;
};

export type CaseStudy = {
  slug: string;
  image: string;
  title: string;
  industry: string;
  service: string;
  locations: string;
  problem: string;
  objective?: string[];
  solutionIntro: string;
  actions: CaseStudyAction[];
  outcomes: CaseStudyOutcome[];
  testimonial: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "onsite-engineer-support-watch-design-company",
    image:
      "https://images.unsplash.com/photo-1759683733144-d054ffe00549?w=1200&q=75&auto=format&fit=crop",
    title:
      "Onsite Engineer Support & Parts Supply for a Global Watch Design & Sales Company",
    industry: "Watch Design & Retail",
    service: "Onsite Engineer Support & Same/Next Business Day Parts Supply",
    locations: "Global (Europe, North America, Asia, and more)",
    problem:
      "A leading watch designer and seller operates globally with high-end boutiques and design studios. The company faced frequent challenges maintaining its in-house IT infrastructure, including POS systems, inventory management, and customer-facing tech — systems that needed to function flawlessly, especially during peak sales periods. Whenever technical issues arose, the company needed a reliable, fast-response partner to provide onsite engineering support and deliver spare parts quickly, with minimal disruption to operations.",
    solutionIntro:
      "Quick Solutions was chosen to provide on-demand onsite engineer support and fast parts supply with Same Business Day and Next Business Day SLAs.",
    actions: [
      {
        heading: "Onsite Engineer Support",
        body: "Engineers were deployed worldwide on demand to resolve issues related to point-of-sale systems, networking, and inventory management tools — trained to deliver expert, tailored solutions within Same or Next Business Day, minimizing delays.",
      },
      {
        heading: "Parts Supply",
        body: "Quick Solutions ensured critical IT parts stayed available, maintaining a supplier network for quick access to high-priority equipment such as POS terminals, servers, and specialized tech.",
      },
      {
        heading: "Global Coverage",
        body: "A global team of engineers meant support was available whenever and wherever the company needed it, with seamless coverage across all major regions.",
      },
    ],
    outcomes: [
      {
        heading: "Reduced Downtime",
        body: "Minimal disruption to operations, keeping stores and design studios open and functional.",
      },
      {
        heading: "Rapid Response",
        body: "Fast onsite engineer dispatch and parts supply resolved issues quickly, ensuring business continuity during peak periods.",
      },
      {
        heading: "Enhanced Efficiency",
        body: "The company could focus on its core business — designing and selling high-quality watches — without worrying about IT disruptions.",
      },
    ],
    testimonial:
      "Quick Solutions has been an indispensable partner for our global operations. Their ability to provide fast, reliable onsite support and quick parts delivery has kept our tech running smoothly, no matter where we are. We can always count on them to keep our systems operational, and their responsiveness ensures we never miss a beat during peak sales.",
  },
  {
    slug: "laptop-installation-metal-detector-manufacturer",
    image:
      "https://images.unsplash.com/photo-1598299803204-b73796f43289?w=1200&q=75&auto=format&fit=crop",
    title: "Laptop Installation & Setup for a Metal Detector Manufacturer in India",
    industry: "Metal Detector Manufacturing (Sport, Security & Countermine)",
    service:
      "Laptop Installation (Unpacking, Windows Setup, Software Installation, and Data Backup)",
    locations: "Pan India",
    problem:
      "The customer needed to quickly set up new laptops for employees across India. Each laptop had to be pre-configured with Windows, the necessary software, and all data from old devices backed up and transferred — done smoothly, without interrupting the company's operations.",
    solutionIntro:
      "Quick Solutions provided a full-service solution handling the unpacking, Windows installation, software setup, and data backup for each laptop.",
    actions: [
      {
        heading: "Unpacking & Setup",
        body: "Our team unpacked and checked the laptops to ensure they were in perfect condition and ready for configuration.",
      },
      {
        heading: "Windows Installation",
        body: "The latest version of Windows was installed, including updates and security settings.",
      },
      {
        heading: "Software Installation",
        body: "Necessary business software — design tools, ERP systems, and communication apps — was installed based on each department's needs.",
      },
      {
        heading: "Data Backup",
        body: "Data from previous devices was securely backed up and transferred to the new laptops to avoid any data loss.",
      },
    ],
    outcomes: [
      {
        heading: "Quick Deployment",
        body: "Employees received fully configured laptops, ready to use without delays.",
      },
      {
        heading: "Seamless Transition",
        body: "All systems and data were properly set up, so employees could start working right away.",
      },
      {
        heading: "Data Security",
        body: "The data backup process ensured no information was lost during the migration.",
      },
    ],
    testimonial:
      "Quick Solutions made the process of setting up our new laptops simple and efficient. Their team handled everything from unpacking to software installation and data transfer smoothly. Our staff in India were able to get to work immediately with no issues.",
  },
  {
    slug: "full-time-onsite-engineers-backfill-support-mnc",
    image:
      "https://images.unsplash.com/photo-1758518731706-be5d5230e5a5?w=1200&q=75&auto=format&fit=crop",
    title:
      "Full-Time Onsite Engineers with Backfill Support for a Multinational Corporation",
    industry: "Multinational Corporation (Various Sectors)",
    service: "Full-Time Onsite Engineers & Backfill Support",
    locations: "India, USA, UK, Germany, Japan, Canada, and more",
    problem:
      "A large multinational corporation faced challenges maintaining consistent IT support across its global offices. It needed full-time onsite engineers to manage day-to-day IT operations in different countries, plus reliable backfill support whenever engineers took leave, so business activities were never disrupted. The company needed a trusted partner to supply experienced engineers on its payroll who could integrate seamlessly into its teams, provide technical expertise, and cover absences without affecting productivity.",
    solutionIntro:
      "Quick Solutions was selected as the strategic partner to provide full-time onsite engineers and backfill support across the customer's global offices.",
    actions: [
      {
        heading: "Full-Time Onsite Engineers",
        body: "Dedicated, full-time engineers were provided for key locations including India, the USA, the UK, Germany, Japan, Canada, and others — chosen for technical expertise aligned with the client's specific IT requirements, and working directly on the client's projects for regular support, maintenance, and troubleshooting.",
      },
      {
        heading: "Backfill Support",
        body: "To ensure uninterrupted service, Quick Solutions supplied backfill engineers for any planned or unplanned absences (vacations, sick leave, time off), trained to step into the role seamlessly with no downtime in service.",
      },
      {
        heading: "Seamless Integration into Client Teams",
        body: "Engineers were fully integrated into the client's existing IT teams for smooth communication and collaboration, while operating under Quick Solutions' payroll — simplifying the process for the customer while providing high-quality, local support.",
      },
    ],
    outcomes: [
      {
        heading: "Uninterrupted IT Support",
        body: "Continuous IT support with full-time engineers on-site, backed by reliable backfill whenever necessary.",
      },
      {
        heading: "Cost-Effective Solution",
        body: "Using Quick Solutions' payroll minimized the administrative overhead of hiring full-time employees in each region.",
      },
      {
        heading: "Global Consistency",
        body: "With engineers in multiple locations, the customer maintained a consistent level of service quality and responsiveness worldwide.",
      },
      {
        heading: "Increased Productivity",
        body: "Dedicated engineers and backfill support let internal teams focus on core business activities without worrying about IT disruptions.",
      },
    ],
    testimonial:
      "Quick Solutions has been an exceptional partner for us. Their full-time onsite engineers have seamlessly integrated with our IT teams, and their backfill support ensures we never experience downtime. We can always rely on them to provide skilled engineers across multiple countries, making IT management smoother and more efficient.",
  },
  {
    slug: "data-center-relocation-end-to-end",
    image:
      "https://images.unsplash.com/photo-1762163516269-3c143e04175c?w=1200&q=75&auto=format&fit=crop",
    title: "Data Center Relocation Services — End-to-End Solutions",
    industry: "Technology & Telecommunications, Financial Services, Multiple Industry",
    service:
      "Preventive Maintenance, 24/7 Technical Support, Spare Parts Supply & Management, Network Device Maintenance, Server & Storage Hardware Support, Asset Health Assessments, Remote & On-Site Support Services, Third-Party Vendor Coordination",
    locations: "India, Dubai, Riyadh, USA, Canada",
    problem:
      "The client's existing data center infrastructure was aging and no longer met its business continuity and scalability needs. It required a relocation service that ensured minimal downtime and a seamless transition across multiple regions.",
    objective: [
      "Migrate IT infrastructure with zero disruption across all regions.",
      "Modernize infrastructure to support scalability and compliance.",
      "Enhance performance, security, and redundancy across operations.",
    ],
    solutionIntro:
      "Quick Solutions provided a complete end-to-end relocation strategy.",
    actions: [
      {
        heading: "Assessment & Planning",
        body: "Analyzed dependencies and created region-specific timelines.",
      },
      {
        heading: "Design & Optimization",
        body: "Upgraded infrastructure designs for scalability and performance.",
      },
      {
        heading: "Testing & Pre-Migration Checks",
        body: "Simulated risks and ensured backup systems were ready.",
      },
      {
        heading: "Execution",
        body: "Coordinated multi-regional logistics and asset relocation with minimal downtime.",
      },
      {
        heading: "Post-Relocation Support",
        body: "Comprehensive system testing and 24/7 monitoring.",
      },
    ],
    outcomes: [
      {
        heading: "Zero Downtime",
        body: "Seamless operations maintained across all regions during the transition.",
      },
      {
        heading: "Modernized Infrastructure",
        body: "Scalable, secure, and optimized for future growth.",
      },
      {
        heading: "Operational Savings",
        body: "Streamlined costs through strategic consolidation.",
      },
    ],
    testimonial:
      "Managing a multi-regional data center relocation is a massive challenge, but the team at Quick Solutions executed the move flawlessly. Their end-to-end approach — spanning planning, execution, and ongoing support — allowed us to migrate our assets without disrupting operations. We now have a modern, secure, and scalable infrastructure supporting our global operations.",
  },
  {
    slug: "global-third-party-hardware-maintenance",
    image:
      "https://images.unsplash.com/photo-1785682117394-4c8d27afc12a?w=1200&q=75&auto=format&fit=crop",
    title: "Global Third-Party Hardware Maintenance for Multi-Vendor IT Infrastructure",
    industry: "Technology & Telecommunications, Financial Services, Multiple Industry",
    service:
      "Preventive Maintenance, 24/7 Technical Support, Spare Parts Supply & Management, Network Device Maintenance, Server & Storage Hardware Support, Asset Health Assessments, Remote & On-Site Support Services, Third-Party Vendor Coordination",
    locations: "Globally",
    problem:
      "Managing multi-vendor hardware maintenance across a vast geographical footprint while minimizing downtime and ensuring rapid response.",
    objective: [
      "Servers, storage, and networking devices across diverse regions.",
      "24/7/365 support with quick response times to maintain operational continuity.",
      "Access to technical expertise, parts, and inventory to ensure swift issue resolution.",
    ],
    solutionIntro: "A full-service, end-to-end hardware maintenance package.",
    actions: [
      {
        heading: "Skilled Global Engineering Team",
        body: "A network of experienced, skilled engineers with expertise in servers, storage, and networking devices across all major brands.",
      },
      {
        heading: "24/7/365 Help Desk Support",
        body: "Round-the-clock technical assistance for instant problem identification and rapid response.",
      },
      {
        heading: "Technical & Field Support",
        body: "On-site and remote technical support to address any hardware-related issue, from troubleshooting to complete replacements.",
      },
      {
        heading: "Global Warehouse & Spare Parts Inventory",
        body: "Strategic warehousing in key regions so parts are readily available for quick deployment.",
      },
      {
        heading: "Proactive Monitoring & Maintenance",
        body: "Regular system check-ups and updates to identify and resolve issues before they impact operations.",
      },
    ],
    outcomes: [
      {
        heading: "Improved Uptime",
        body: "Downtime reduced by 35% through proactive maintenance and quick issue resolution.",
      },
      {
        heading: "Cost Savings",
        body: "Streamlined maintenance costs by replacing multiple vendor agreements with a single comprehensive solution.",
      },
      {
        heading: "Rapid Response Times",
        body: "24/7/365 help desk and skilled on-site engineers ensured technical issues were resolved within SLAs.",
      },
      {
        heading: "Optimized Inventory",
        body: "Access to regional warehouses reduced parts delivery time by 40%.",
      },
    ],
    testimonial:
      "The end-to-end third-party hardware maintenance services provided by Quick Solutions transformed how we manage IT operations globally. Their expertise, resources, and support ensured reliability across our data centers and offices.",
  },
];

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
