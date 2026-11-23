/**
 * Shared content types. Local content in this folder is the development source of truth and the
 * fallback when Webflow CMS is not configured. The Webflow mappers in src/lib/cms produce the same
 * shapes, so pages never know where content came from.
 */

export type Img = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Provisional imagery (inherited from the old site, likely AI-generated) — replace before launch. */
  provisional?: boolean;
};

export type Verification = {
  /** false = must be confirmed by Ethos before it is shown in production (see docs/CONTENT-VERIFICATION.md). */
  verified: boolean;
  note?: string;
};

export type Programme = {
  slug: "dream-school" | "guaranteed-admissions" | "scholarship-program";
  index: string;
  name: string;
  shortName: string;
  kicker: string;
  summary: string;
  intro: string[];
  forWhom: string[];
  includes: { title: string; text: string }[];
  components?: { id: string; name: string; summary: string; points: string[]; href?: string }[];
  terms?: { heading: string; text: string } & Verification;
  image: Img;
  seo: { title: string; description: string };
  legacyPaths: string[];
};

export type MentorRole = {
  index: string;
  title: string;
  short: string;
  description: string;
  contributes: string[];
};

export type ProcessStep = {
  index: string;
  title: string;
  summary: string;
  deliverables: string[];
  image: Img;
};

export type ExamCategory = "undergraduate" | "postgraduate" | "business" | "english" | "subject";

export type Exam = {
  slug: string;
  path: string;
  name: string;
  fullName: string;
  categories: ExamCategory[];
  administeredBy: string;
  officialUrl: string;
  tagline: string;
  forWhom: string[];
  measures: string;
  ethosSupport: string[];
  approach: string;
  faqs: Faq[];
  lastReviewed: string;
  seo: { title: string; description: string };
};

export type Destination = {
  slug: string;
  path: string;
  name: string;
  shortName: string;
  index: string;
  tagline: string;
  intro: string;
  howApplicationsWork: { title: string; text: string }[];
  ethosFocus: string[];
  exams: string[];
  outcomeCountries: string[];
  tone: "oxblood" | "midnight" | "sage" | "gilt" | "ink";
  lastReviewed: string;
  seo: { title: string; description: string };
};

export type Faq = {
  id: string;
  question: string;
  answer: string;
  category: "process" | "programmes" | "tests" | "scholarships" | "visas" | "mentorship" | "consultation";
  lastReviewed?: string;
};

export type VideoStory = {
  id: string;
  speaker: string;
  relation?: string;
  student: string;
  programme: string;
  university: string;
  country: string;
  video: { src: string; poster: string; captions?: string; durationSeconds: number };
  quote?: string;
  quoteTimestamp?: string;
} & Verification;

export type Outcome = {
  name: string;
  university: string;
  destination: string;
} & Verification;

export type Stat = {
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
  definition: string;
} & Verification;

export type Office = {
  city: string;
  region: string;
  role?: string;
  address: string[];
} & Verification;

export type JournalArticle = {
  slug: string;
  path: string;
  title: string;
  publishedAt: string;
  updatedAt: string;
  author: string | null;
  topic: JournalTopic;
  excerpt: string;
  seo: { title: string; description: string };
  featuredImage: { src: string; width: number; height: number; alt: string } | null;
  images: Record<string, { width: number; height: number }>;
  readingMinutes: number;
  wordCount: number;
  body: string;
  /** Migrated articles are markdown; Webflow rich-text bodies arrive as HTML and are sanitised on render. */
  bodyFormat?: "markdown" | "html";
};

export type JournalTopic =
  | "admissions"
  | "scholarships-funding"
  | "visas-careers"
  | "destinations"
  | "test-prep"
  | "perspectives";
