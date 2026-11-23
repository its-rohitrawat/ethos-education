import type { Destination } from "./types";

const REVIEWED = "2026-11-21";

/**
 * Destination guides. Only long-standing structural facts are stated (application systems, typical
 * components). Deadlines, fees and visa rules are intentionally left to linked, dated Journal
 * articles and to counsellors, because they change.
 */
export const destinations: Destination[] = [
  {
    slug: "usa",
    path: "/study-abroad/usa/",
    name: "United States",
    shortName: "USA",
    index: "01",
    tagline: "Breadth, choice and the liberal-arts tradition.",
    intro:
      "The US system rewards students who can show who they are beyond grades: what they pursue, how they think and what they will add to a campus. It offers unmatched choice — and the most complex applications.",
    howApplicationsWork: [
      { title: "Holistic review", text: "Grades, course rigour, activities, essays, recommendations and — where required — test scores are read together." },
      { title: "Application platforms", text: "Most universities use the Common App or their own portals, with university-specific supplementary essays." },
      { title: "Rounds and timing", text: "Early and regular rounds have different deadlines and commitments. Choosing between them is a strategic decision." },
      { title: "Funding", text: "Aid ranges from merit scholarships to need-based support, and policies for international students vary widely by university." },
    ],
    ethosFocus: [
      "Shortlists balanced across dream, reach and safer universities",
      "Essay strategy across the main essay and supplements",
      "Testing decisions for test-optional and test-required universities",
      "Scholarship-aware selection, including public universities",
      "F-1 visa documentation and interview preparation",
    ],
    exams: ["sat", "act", "ap", "toefl-ibt", "gre", "gmat"],
    outcomeCountries: ["USA"],
    tone: "oxblood",
    lastReviewed: REVIEWED,
    seo: {
      title: "Study in the USA from India | Admissions Guidance",
      description:
        "How US university admissions work for Indian students — holistic review, Common App, testing, scholarships and F-1 visas — and how Ethos guides each step.",
    },
  },
  {
    slug: "uk",
    path: "/study-abroad/uk/",
    name: "United Kingdom",
    shortName: "UK",
    index: "02",
    tagline: "Depth from day one, in shorter degrees.",
    intro:
      "UK universities admit you to study a subject in depth from the start. Applications centre on academic readiness and genuine interest in the course — and some courses add admissions tests and interviews.",
    howApplicationsWork: [
      { title: "UCAS", text: "Undergraduate applications go through UCAS, with a single personal statement for all your choices." },
      { title: "Subject focus", text: "Predicted grades and a clear case for the subject matter more than broad extracurricular breadth." },
      { title: "Tests and interviews", text: "Oxford, Cambridge and some competitive courses use admissions tests (such as the ESAT) and interviews, with earlier deadlines." },
      { title: "Postgraduate", text: "Master’s applications are usually made directly to each university." },
    ],
    ethosFocus: [
      "Course choice and a subject-focused personal statement",
      "Oxbridge and competitive-course preparation, including admissions tests",
      "Interview practice",
      "English-test planning, including visa-approved versions where required",
      "Student visa preparation",
    ],
    exams: ["esat", "ielts", "pte", "toefl-ibt"],
    outcomeCountries: ["UK"],
    tone: "midnight",
    lastReviewed: REVIEWED,
    seo: {
      title: "Study in the UK from India | UCAS & Oxbridge Guidance",
      description:
        "UK university admissions explained — UCAS, personal statements, admissions tests and interviews — with guidance for Oxbridge and competitive courses.",
    },
  },
  {
    slug: "canada",
    path: "/study-abroad/canada/",
    name: "Canada",
    shortName: "Canada",
    index: "03",
    tagline: "Strong universities, welcoming cities, practical pathways.",
    intro:
      "Canadian admissions place strong weight on academic results, with some programmes adding supplementary applications, essays or interviews. Choosing the right programme and province matters as much as the university.",
    howApplicationsWork: [
      { title: "Province-based systems", text: "Ontario universities use a central application service; most other provinces accept applications directly." },
      { title: "Grades first", text: "Admission is often driven by academic averages in prerequisite subjects." },
      { title: "Supplementary applications", text: "Competitive programmes may ask for personal profiles, essays, portfolios or interviews." },
      { title: "Study permits", text: "International students need a study permit; rules are updated regularly, so we check current requirements with you." },
    ],
    ethosFocus: [
      "Programme and province selection",
      "Prerequisite planning for competitive programmes",
      "Supplementary applications and personal profiles",
      "English-test planning",
      "Study permit preparation",
    ],
    exams: ["ielts", "toefl-ibt", "pte", "det"],
    outcomeCountries: ["Canada"],
    tone: "sage",
    lastReviewed: REVIEWED,
    seo: {
      title: "Study in Canada from India | University Admissions",
      description:
        "Canadian university admissions for Indian students — programme choice, supplementary applications, English tests and study permits — with Ethos guidance.",
    },
  },
  {
    slug: "europe",
    path: "/study-abroad/europe/",
    name: "Europe",
    shortName: "Europe",
    index: "04",
    tagline: "Distinctive institutions, often with lower tuition.",
    intro:
      "From business schools in France to research universities in the Netherlands and Ireland, Europe offers excellent English-taught programmes — each country with its own system, calendar and costs.",
    howApplicationsWork: [
      { title: "Country by country", text: "There is no single system: some countries use national portals, others apply directly to the institution." },
      { title: "English-taught programmes", text: "Many bachelor’s and master’s programmes are taught in English, especially in business, engineering and the sciences." },
      { title: "Cost advantages", text: "Tuition at public universities in several countries is lower than in the US or UK; living costs vary widely by city." },
      { title: "Business schools", text: "Leading business schools often have their own admissions tests, essays and interviews." },
    ],
    ethosFocus: [
      "Choosing countries and programmes that fit budget and goals",
      "Navigating different national application systems",
      "Business-school applications and interviews",
      "Scholarship and funding research",
      "Visa and residence-permit preparation",
    ],
    exams: ["ielts", "toefl-ibt", "gmat", "gre"],
    outcomeCountries: ["France", "Netherlands", "Ireland"],
    tone: "gilt",
    lastReviewed: REVIEWED,
    seo: {
      title: "Study in Europe from India | Admissions Guidance",
      description:
        "Study in Europe as an Indian student — English-taught programmes, business schools, national application systems and funding — with Ethos guidance.",
    },
  },
  {
    slug: "singapore",
    path: "/study-abroad/singapore/",
    name: "Singapore",
    shortName: "Singapore",
    index: "05",
    tagline: "World-ranked universities, close to home.",
    intro:
      "Singapore’s universities combine global reputations with a location close to India. Admission is competitive and largely academic, with essays, interviews or tests for some programmes.",
    howApplicationsWork: [
      { title: "Direct applications", text: "Students apply directly to each university, such as NUS, NTU and SMU." },
      { title: "Academic emphasis", text: "Strong results in relevant subjects are central; some programmes add essays, interviews or aptitude tests." },
      { title: "Funding options", text: "Scholarships and government-supported tuition schemes exist, some with conditions such as a post-graduation work commitment." },
      { title: "Planning costs", text: "Tuition and living costs differ significantly by university and programme — see our cost guide in the Journal." },
    ],
    ethosFocus: [
      "University and programme selection",
      "Essays and interview preparation",
      "Understanding scholarship and tuition-support conditions",
      "Budget planning",
      "Student pass preparation",
    ],
    exams: ["sat", "ielts", "toefl-ibt"],
    outcomeCountries: ["Singapore"],
    tone: "ink",
    lastReviewed: REVIEWED,
    seo: {
      title: "Study in Singapore from India | NUS, NTU & SMU Guidance",
      description:
        "Admissions guidance for Singapore’s universities — NUS, NTU and SMU — covering applications, interviews, scholarships and costs for Indian students.",
    },
  },
];

export const getDestinationLocal = (slug: string) => destinations.find((d) => d.slug === slug);
