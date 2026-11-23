import type { Office, Stat } from "./types";

export const site = {
  name: "Ethos Education",
  legalName: "Ethos Education Pvt Ltd",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ethoseducation.world").replace(/\/$/, ""),
  description:
    "Ethos Education is an admissions consultancy in Gurugram guiding students to selective universities in the United States, United Kingdom, Canada, Europe and Singapore — through mentorship, test preparation and career counselling.",
  mission:
    "We help ambitious students choose well, prepare deliberately and apply with a story that is unmistakably their own.",
  phone: { display: "+91 909 909 6647", e164: "+919099096647" },
  email: "info@ethoseducation.world",
  whatsapp: {
    number: "919099096647",
    message: "Hello Ethos Education — I'd like to book a consultation.",
  },
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/ethos-education-india/" },
    { label: "Instagram", href: "https://www.instagram.com/ethos_edu/" },
    { label: "X", href: "https://x.com/education_ethos" },
    { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61579401687901" },
  ],
} as const;

export const whatsappHref = (message: string = site.whatsapp.message) =>
  `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;

/**
 * Offices as listed in the footer of the current website. Full street addresses are shown only
 * once verified (brief: "Display complete addresses only after verification").
 */
export const offices: Office[] = [
  {
    city: "Gurugram",
    region: "Haryana, India",
    role: "Head office",
    address: ["C-308, Nirvana Courtyard", "Gurugram, Haryana 122018"],
    verified: false,
  },
  {
    city: "Noida",
    region: "Uttar Pradesh, India",
    address: ["304, 3rd Floor, Anthurium, Sector-73", "Noida, Uttar Pradesh 201301"],
    verified: false,
  },
  {
    city: "Ranchi",
    region: "Jharkhand, India",
    address: ["1st Floor, Anideep Complex, Radium Road", "Ranchi, Jharkhand 834001"],
    verified: false,
  },
  {
    city: "Dublin, California",
    region: "United States",
    address: ["8599 Deervale Rd", "Dublin, CA 94568, United States"],
    verified: false,
  },
];

/**
 * Marketing claims from the current homepage. NOT verified: the brief requires approval of each
 * number and its definition before it appears in production. See src/lib/verification.ts.
 */
export const stats: Stat[] = [
  {
    value: 50,
    suffix: "+",
    label: "Years of combined team experience",
    definition: "Sum of admissions-counselling experience across the current Ethos team.",
    verified: false,
    note: "Confirm team roster and how years are counted.",
  },
  {
    value: 3000,
    suffix: "+",
    label: "Students guided",
    definition: "Students who received counselling, mentorship or test preparation from Ethos.",
    verified: false,
    note: "Confirm count, date range and which services are included.",
  },
  {
    value: 300,
    suffix: "+",
    label: "Universities in our students’ outcomes",
    definition: "Distinct universities where Ethos students received offers.",
    verified: false,
    note: "Current site says 'Universities Represented' — that wording can imply partnership. Confirm meaning.",
  },
  {
    value: 99,
    suffix: "%",
    label: "Visa success",
    definition: "Share of Ethos-supported student visa applications that were approved.",
    verified: false,
    note: "Confirm numerator, denominator and period.",
  },
];
