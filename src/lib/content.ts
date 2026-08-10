export type CommitteeSpotlight = {
  id: string;
  acronym: string;
  name: string;
  logo: string;
  topics: [string, string];
};

/** Advanced committee emblems — Scene 2 + 3 */
export const ADVANCED_COMMITTEES: CommitteeSpotlight[] = [
  {
    id: "disec",
    acronym: "DISEC",
    name: "Disarmament & Int'l Security",
    logo: "assets/committee-logos/disec.png",
    topics: ["Cross-Border Weapons Transport", "Preventing Arms Diversion"],
  },
  {
    id: "fwc",
    acronym: "FWC",
    name: "Fantasy World Committee",
    logo: "assets/committee-logos/fwc.png",
    topics: ["Outbreak Response Protocol", "International Aid Coordination"],
  },
  {
    id: "interpol",
    acronym: "INTERPOL",
    name: "Int'l Criminal Police Org.",
    logo: "assets/committee-logos/interpol.png",
    topics: ["Disrupting Human Trafficking", "Combating Cybercrime Networks"],
  },
  {
    id: "who",
    acronym: "WHO",
    name: "World Health Organization",
    logo: "assets/committee-logos/who.png",
    topics: ["Pandemic Preparedness", "Universal Health Coverage"],
  },
];

export type SignupScene = {
  key: "delegate" | "chair" | "advisor";
  headline: string;
  dueLabel: string;
  dueDetail: string;
  support: string;
  qr: string;
  accent: string;
};

export const SIGNUPS: SignupScene[] = [
  {
    key: "delegate",
    headline: "Delegate Sign Ups",
    dueLabel: "Due Date",
    dueDetail: "Delegate Sign Ups close October 15th",
    support: "Choose your preferred committees and allocations.",
    qr: "assets/qr/delegate.png",
    accent: "#6EE7B7",
  },
  {
    key: "chair",
    headline: "Chair Applications",
    dueLabel: "Due Date",
    dueDetail: "Chair Applications close September 15th",
    support: "Choose your preferred committees.\nTell us why you'd make a great chair.",
    qr: "assets/qr/chair.png",
    accent: "#93C5FD",
  },
  {
    key: "advisor",
    headline: "Advisor Sign Ups",
    dueLabel: "Due Date",
    dueDetail: "Advisor Sign Ups close October 15th",
    support: "Register your school and delegation.",
    qr: "assets/qr/advisor.png",
    accent: "#FCA5A5",
  },
];

export const BRAND = {
  title: "SEAMUN I 2027",
  tagline: "Policies with a Purpose",
  taglineCaps: "POLICIES WITH A PURPOSE",
  dates: "16–17 January 2027",
  datesCaps: "16–17 JANUARY 2027",
  datesShort: "16/01/27 → 17/01/27",
  location: "Bangkok, Thailand",
  locationCaps: "BANGKOK, THAILAND",
  venue: "D-PREP Secondary Campus, Bangkok, Thailand",
  partnership: "in Partnership with D-PREP",
  partnershipCaps: "IN PARTNERSHIP WITH D-PREP",
  website: "seamun.com",
  email: "information@seamun.com",
  cta1: "Find Your Committee.",
  cta2: "Find Your Voice.",
  logo: "assets/brand/seamun-logo.png",
  dprep: "assets/brand/d-prep-logo.png",
  water: "assets/brand/water-bg.png",
  websiteQr: "assets/qr/website.png",
} as const;
