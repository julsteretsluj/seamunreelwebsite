export type CommitteeSpotlight = {
  id: string;
  acronym: string;
  name: string;
  logo: string;
  /** Concise topic labels derived from official seamun.com agendas */
  topics: string[];
  /** Optional feature art shown in the spotlight scene */
  featureArt?: string;
  /** Portrait (tall figure) vs landscape (card / banner) feature framing */
  featureArtLayout?: "portrait" | "landscape";
  /** When true, skip the small logo under the feature (logo already in the art) */
  featureArtContainsLogo?: boolean;
};

/** All 10 committees — official topics shortened for video readability */
export const ALL_COMMITTEES: CommitteeSpotlight[] = [
  {
    id: "ecosoc",
    acronym: "ECOSOC",
    name: "Economic and Social Council",
    logo: "assets/committee-logos/ecosoc.png",
    featureArt: "assets/committees/ecosoc-card.png",
    featureArtLayout: "landscape",
    topics: [
      "Universal Basic Income & Economic Stability",
      "Military Spending to Public Health",
    ],
  },
  {
    id: "press",
    acronym: "Press",
    name: "Press Corps",
    logo: "assets/committee-logos/press.png",
    featureArt: "assets/committees/press-camera.png",
    featureArtLayout: "portrait",
    topics: ["Journalistic Ethics in Public Health Reporting"],
  },
  {
    id: "unhrc",
    acronym: "UNHRC",
    name: "Human Rights Council",
    logo: "assets/committee-logos/unhrc.png",
    featureArt: "assets/committees/unhrc-seal.png",
    featureArtLayout: "portrait",
    featureArtContainsLogo: true,
    topics: [
      "Death Penalty Regulation & Application",
      "Preventing Cruel Treatment in Judicial Systems",
    ],
  },
  {
    id: "unodc",
    acronym: "UNODC",
    name: "UN Office on Drugs & Crime",
    logo: "assets/committee-logos/unodc.png",
    featureArt: "assets/committees/unodc-capsule.png",
    featureArtLayout: "portrait",
    topics: [
      "Alternatives to Punishment for Personal Drug Use",
      "Inter-generational Impact of Addiction",
    ],
  },
  {
    id: "unsc",
    acronym: "UNSC",
    name: "Security Council (Crisis)",
    logo: "assets/committee-logos/unsc.png",
    topics: ["Standardizing Peacekeeping & Medical Support"],
  },
  {
    id: "unwomen",
    acronym: "UN Women",
    name: "UN Women",
    logo: "assets/committee-logos/unwomen.png",
    topics: [
      "Reproductive Autonomy & Safe Abortion Access",
      "Universal Childcare as a Human Right",
    ],
  },
  {
    id: "disec",
    acronym: "DISEC",
    name: "Disarmament & Int'l Security",
    logo: "assets/committee-logos/disec.png",
    topics: [
      "Cross-Border Weapons Transport",
      "Preventing Arms Diversion",
    ],
  },
  {
    id: "fwc",
    acronym: "FWC",
    name: "Fantasy World Committee (Crisis)",
    logo: "assets/committee-logos/fwc.png",
    featureArt: "assets/committees/fwc-demogorgon.png",
    featureArtLayout: "portrait",
    topics: [
      "Psychic Child Experimentation & Protection",
      "Weaponization of the Human Mind",
    ],
  },
  {
    id: "interpol",
    acronym: "INTERPOL",
    name: "Int'l Criminal Police Organization",
    logo: "assets/committee-logos/interpol.png",
    topics: [
      "Underground Medical Markets",
      "Narcotics Trafficking — Schengen & Golden Triangle",
    ],
  },
  {
    id: "who",
    acronym: "WHO",
    name: "World Health Organization",
    logo: "assets/committee-logos/who.png",
    topics: [
      "Psychedelics for Trauma-Based Mental Health",
      "Pandemic Response & Recovery",
    ],
  },
];

/** @deprecated use ALL_COMMITTEES */
export const ADVANCED_COMMITTEES = ALL_COMMITTEES.filter((c) =>
  ["disec", "fwc", "interpol", "who"].includes(c.id),
);

export type TeamMember = {
  name: string;
  role: string;
  img: string;
};

export const TEAM: TeamMember[] = [
  { name: "Jules K.A.", role: "Secretary General", img: "assets/leadership/jules.png" },
  { name: "Emily H.", role: "Deputy Secretary General", img: "assets/leadership/emily.png" },
  { name: "Tung-O", role: "Co-Deputy SG", img: "assets/leadership/tung-o.png" },
  { name: "Sam S.", role: "Parliamentarian", img: "assets/leadership/sam.png" },
  { name: "Sparkle W.", role: "Parliamentarian", img: "assets/leadership/sparkle.png" },
  { name: "Venice K.", role: "Parliamentarian", img: "assets/leadership/venice.png" },
  { name: "Dominic S. S.", role: "Head of Delegate Affairs", img: "assets/leadership/dominic.png" },
  { name: "Moonum C.", role: "Head of Logistics", img: "assets/leadership/moonum.png" },
  { name: "Nadia", role: "Head of Thai Operations", img: "assets/leadership/nadia.png" },
  { name: "Mannan P.", role: "Deputy Head of Finance", img: "assets/leadership/mannan.png" },
  { name: "Phil R.", role: "Head of PR & Advertising", img: "assets/leadership/phil.png" },
  { name: "Myesha S.", role: "Head of Community Outreach", img: "assets/leadership/myesha.png" },
  { name: "Joanna H.", role: "Head of Media", img: "assets/leadership/joanna.png" },
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
