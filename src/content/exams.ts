import type { Exam, ExamCategory } from "./types";

/**
 * The ten examinations Ethos prepares students for. Per the brief, only stable, general information
 * is hard-coded (who the test is for, what it measures, who runs it). Formats, timings, fees and
 * score requirements change — each page links to the official source and shows `lastReviewed`.
 * Exam pages keep their existing root-level URLs (/sat/, /gre/ …) to preserve search equity.
 */
const REVIEWED = "2026-11-21";

const ethosCore = (exam: string) => [
  `A diagnostic ${exam} assessment to set a realistic target and timeline`,
  "A personalised study plan built around your application deadlines",
  "Timed practice tests with detailed review of every error pattern",
  "One-to-one support on the sections where you lose the most marks",
  "Advice on when to test, when to retake and how scores fit your shortlist",
];

export const examCategoryLabels: Record<ExamCategory, string> = {
  undergraduate: "Undergraduate",
  postgraduate: "Postgraduate",
  business: "Business school",
  english: "English proficiency",
  subject: "Subject-specific",
};

export const exams: Exam[] = [
  {
    slug: "sat",
    path: "/sat/",
    name: "SAT",
    fullName: "The SAT (Digital SAT)",
    categories: ["undergraduate"],
    administeredBy: "College Board",
    officialUrl: "https://satsuite.collegeboard.org/sat",
    tagline: "The admissions test most US universities recognise for undergraduate entry.",
    forWhom: [
      "Students applying for undergraduate study in the United States",
      "Applicants to universities elsewhere that consider SAT scores",
      "Students competing for merit scholarships that use test scores",
    ],
    measures:
      "Reading and writing, and mathematics — the skills universities see as foundations for undergraduate study. The test is taken digitally and adapts to performance.",
    ethosSupport: ethosCore("SAT"),
    approach:
      "We start from your target universities, not a generic score. Some are test-optional, some require scores again, and merit aid often still rewards a strong result — so the plan reflects what your shortlist actually needs.",
    faqs: [
      {
        id: "sat-required",
        question: "Is the SAT compulsory for Indian students applying to the USA?",
        answer:
          "Not always. Many US universities have been test-optional since 2020, while several selective institutions have reinstated testing requirements. Policies change year to year, so check each university’s current policy — and remember a strong score can still help with merit scholarships.",
        category: "tests",
        lastReviewed: REVIEWED,
      },
      {
        id: "sat-vs-act",
        question: "SAT or ACT — which is better?",
        answer:
          "US universities accept both equally. Take a full timed practice test of each, then commit to whichever gives you the stronger percentile. Splitting preparation across both is a common mistake.",
        category: "tests",
        lastReviewed: REVIEWED,
      },
    ],
    lastReviewed: REVIEWED,
    seo: {
      title: "SAT Coaching and Practice Tests",
      description:
        "Digital SAT preparation with personalised mentorship, practice tests and strategies to strengthen your score for US and global undergraduate admissions.",
    },
  },
  {
    slug: "act",
    path: "/act/",
    name: "ACT",
    fullName: "The ACT",
    categories: ["undergraduate"],
    administeredBy: "ACT",
    officialUrl: "https://www.act.org",
    tagline: "An alternative to the SAT, accepted equally by US universities.",
    forWhom: [
      "Students applying for undergraduate study in the United States",
      "Students comfortable working quickly and interpreting data",
      "Applicants who score better on the ACT than the SAT in practice",
    ],
    measures:
      "English, mathematics and reading, with a science section that assesses data interpretation and reasoning. ACT has been revising its format, so confirm the current structure on act.org.",
    ethosSupport: ethosCore("ACT"),
    approach:
      "The ACT rewards pace and composure. Preparation focuses on timing strategy and accuracy under pressure, alongside the content gaps your diagnostic reveals.",
    faqs: [
      {
        id: "act-accepted",
        question: "Do universities prefer the SAT over the ACT?",
        answer: "No. US universities accept both and do not prefer one. Choose the test that suits you better in timed practice.",
        category: "tests",
        lastReviewed: REVIEWED,
      },
    ],
    lastReviewed: REVIEWED,
    seo: {
      title: "ACT Prep for US University Admissions",
      description:
        "ACT preparation with personalised mentorship, timed practice tests and score strategy for US and global university admissions.",
    },
  },
  {
    slug: "ap",
    path: "/ap/",
    name: "AP",
    fullName: "Advanced Placement (AP) Exams",
    categories: ["undergraduate", "subject"],
    administeredBy: "College Board",
    officialUrl: "https://apstudents.collegeboard.org",
    tagline: "College-level subject exams that show academic depth — and can earn credit.",
    forWhom: [
      "High-achieving school students in grades 9–12",
      "IB or A-Level students adding subjects their curriculum doesn’t offer",
      "Applicants to selective universities who want to demonstrate rigour",
    ],
    measures:
      "Mastery of college-level coursework in a specific subject, across sciences, mathematics, languages, humanities and the arts. Many universities award credit or placement for qualifying scores.",
    ethosSupport: [
      "Choosing AP subjects that strengthen your intended major",
      "Subject-specific study plans and practice exams",
      "Guidance on how AP scores are used for credit and placement",
      "Timing AP exams alongside board exams and applications",
    ],
    approach:
      "We treat AP subject choice as part of your application story: the right subjects signal readiness for the course you are applying to.",
    faqs: [
      {
        id: "ap-why",
        question: "Do AP exams help with admissions outside the US?",
        answer:
          "Often, yes — many universities outside the US recognise AP scores, sometimes as part of entry requirements. Recognition varies by university and country, so we check each institution on your shortlist.",
        category: "tests",
        lastReviewed: REVIEWED,
      },
    ],
    lastReviewed: REVIEWED,
    seo: {
      title: "AP Exam Preparation for Study Abroad",
      description:
        "AP exam preparation in India with strategic subject selection, college-credit guidance and support for global university admissions.",
    },
  },
  {
    slug: "gre",
    path: "/gre/",
    name: "GRE",
    fullName: "GRE General Test",
    categories: ["postgraduate", "business"],
    administeredBy: "ETS",
    officialUrl: "https://www.ets.org/gre",
    tagline: "The graduate admissions test for master’s and PhD programmes worldwide.",
    forWhom: [
      "Applicants to master’s and doctoral programmes",
      "STEM applicants to US universities",
      "Business-school applicants where the GRE is accepted",
    ],
    measures:
      "Verbal reasoning, quantitative reasoning and analytical writing — the reasoning skills graduate programmes rely on.",
    ethosSupport: ethosCore("GRE"),
    approach:
      "Graduate programmes weigh the GRE differently. We set a target based on your programmes and plan preparation around work or final-year study.",
    faqs: [
      {
        id: "gre-required",
        question: "Do all master’s programmes require the GRE?",
        answer:
          "No. Many programmes have made the GRE optional or removed it, while others still require or recommend it. We confirm requirements for each programme on your list before you register.",
        category: "tests",
        lastReviewed: REVIEWED,
      },
    ],
    lastReviewed: REVIEWED,
    seo: {
      title: "GRE Preparation for MS Admissions Abroad",
      description:
        "GRE preparation with personalised study plans, mock tests and strategy for master’s and PhD admissions abroad.",
    },
  },
  {
    slug: "gmat",
    path: "/gmat/",
    name: "GMAT",
    fullName: "GMAT Exam",
    categories: ["business", "postgraduate"],
    administeredBy: "GMAC",
    officialUrl: "https://www.mba.com/exams/gmat-exam",
    tagline: "The admissions test built for business school.",
    forWhom: [
      "MBA applicants, in India and abroad",
      "Applicants to business master’s programmes",
      "Professionals planning a management career move",
    ],
    measures:
      "Quantitative reasoning, verbal reasoning and data insights — the analytical and decision-making skills business schools value.",
    ethosSupport: ethosCore("GMAT"),
    approach:
      "We plan GMAT preparation alongside your wider MBA application — work experience narrative, essays and school selection — so the score supports the story.",
    faqs: [
      {
        id: "gmat-vs-gre",
        question: "Should I take the GMAT or the GRE for an MBA?",
        answer:
          "Most business schools accept both. The GMAT is designed specifically for business school; the GRE suits applicants keeping non-business options open. Check each school’s policy, then choose the test you score better on in practice.",
        category: "tests",
        lastReviewed: REVIEWED,
      },
    ],
    lastReviewed: REVIEWED,
    seo: {
      title: "GMAT Preparation for MBA Admissions",
      description:
        "GMAT preparation in India with expert guidance for MBA, business master’s and global management admissions.",
    },
  },
  {
    slug: "ielts",
    path: "/ielts/",
    name: "IELTS",
    fullName: "International English Language Testing System",
    categories: ["english"],
    administeredBy: "British Council, IDP IELTS and Cambridge University Press & Assessment",
    officialUrl: "https://ielts.org",
    tagline: "The most widely recognised English test for study abroad.",
    forWhom: [
      "Students applying to universities in the UK, Canada, Europe, Australia and beyond",
      "Applicants who need an English score for a student visa",
      "Students who prefer a speaking test with a human examiner",
    ],
    measures:
      "Listening, reading, writing and speaking. Study applicants usually take IELTS Academic; some visa routes require specific approved versions of the test.",
    ethosSupport: ethosCore("IELTS"),
    approach:
      "Universities often set minimum scores for each band, not just overall. We prepare you to clear every band your shortlist requires — and check whether your visa route needs a specific version of the test.",
    faqs: [
      {
        id: "ielts-score",
        question: "What IELTS score do I need?",
        answer:
          "As a general guide, undergraduate programmes often ask for 6.0–6.5 overall, postgraduate programmes 6.5–7.0, and competitive courses such as law or medicine 7.0–7.5. Many set minimums for each band, and visa requirements can differ — always confirm with each university.",
        category: "tests",
        lastReviewed: REVIEWED,
      },
    ],
    lastReviewed: REVIEWED,
    seo: {
      title: "IELTS Preparation for Study Abroad",
      description:
        "IELTS preparation with personalised study plans, mock tests and guidance on UKVI requirements to help you reach your target band score.",
    },
  },
  {
    slug: "toefl-ibt",
    path: "/toefl-ibt/",
    name: "TOEFL iBT",
    fullName: "TOEFL iBT Test",
    categories: ["english"],
    administeredBy: "ETS",
    officialUrl: "https://www.ets.org/toefl",
    tagline: "An academic English test widely accepted by US universities.",
    forWhom: [
      "Students applying to universities in the United States and elsewhere",
      "Applicants comfortable with a fully computer-based test",
      "Students whose shortlist accepts TOEFL alongside IELTS",
    ],
    measures:
      "Reading, listening, speaking and writing in academic English, in a computer-based format.",
    ethosSupport: ethosCore("TOEFL iBT"),
    approach:
      "We help you choose between TOEFL, IELTS, PTE and the Duolingo English Test based on what your universities accept — then prepare for the one that suits you.",
    faqs: [
      {
        id: "toefl-vs-ielts",
        question: "TOEFL or IELTS?",
        answer:
          "Both are widely accepted. The right choice depends on what your universities and visa route accept and which format you perform better in. We compare them for your shortlist before you book.",
        category: "tests",
        lastReviewed: REVIEWED,
      },
    ],
    lastReviewed: REVIEWED,
    seo: {
      title: "TOEFL iBT Preparation in India",
      description:
        "TOEFL iBT preparation with strategic guidance, mock tests and feedback to help students achieve strong scores for study abroad admissions.",
    },
  },
  {
    slug: "pte",
    path: "/pte/",
    name: "PTE",
    fullName: "PTE Academic",
    categories: ["english"],
    administeredBy: "Pearson",
    officialUrl: "https://www.pearsonpte.com",
    tagline: "A computer-based English test with fast results.",
    forWhom: [
      "Students applying to universities that accept PTE Academic",
      "Applicants who need results quickly",
      "Students comfortable with computer-scored speaking and writing",
    ],
    measures:
      "Speaking, writing, reading and listening, scored by computer. Integrated tasks assess several skills at once.",
    ethosSupport: ethosCore("PTE Academic"),
    approach:
      "PTE rewards familiarity with its task types. Preparation combines English skill-building with deliberate practice on each item format.",
    faqs: [
      {
        id: "pte-accepted",
        question: "Is PTE accepted as widely as IELTS?",
        answer:
          "PTE Academic is accepted by many universities and for some visa purposes, but acceptance varies. We confirm it for every university on your list before you register.",
        category: "tests",
        lastReviewed: REVIEWED,
      },
    ],
    lastReviewed: REVIEWED,
    seo: {
      title: "PTE Academic Preparation for Study Abroad",
      description:
        "PTE Academic preparation in India with adaptive strategies and guidance for study abroad admissions and student visas.",
    },
  },
  {
    slug: "det",
    path: "/det/",
    name: "DET",
    fullName: "Duolingo English Test",
    categories: ["english"],
    administeredBy: "Duolingo",
    officialUrl: "https://englishtest.duolingo.com",
    tagline: "An online English test you take at home.",
    forWhom: [
      "Students whose universities accept the Duolingo English Test",
      "Applicants with short deadlines or limited access to test centres",
      "Students wanting a lower-cost option for some applications",
    ],
    measures:
      "Reading, writing, listening and speaking, through short adaptive tasks taken online and proctored remotely.",
    ethosSupport: [
      "Checking which universities on your list accept the DET — and for which courses",
      "Practice on every task type under timed conditions",
      "Technical readiness for remote proctoring",
      "A backup plan with IELTS or TOEFL where needed",
    ],
    approach:
      "The DET is convenient but not universally accepted. We confirm acceptance before you prepare, so a quick test doesn’t become a wasted one.",
    faqs: [
      {
        id: "det-accepted",
        question: "Do US universities accept the Duolingo English Test?",
        answer:
          "Many do, but acceptance is not universal — and some universities limit the courses it can be used for or set higher equivalent scores. Always confirm on each university’s admissions page before booking.",
        category: "tests",
        lastReviewed: REVIEWED,
      },
    ],
    lastReviewed: REVIEWED,
    seo: {
      title: "Duolingo English Test (DET) Coaching",
      description:
        "Duolingo English Test coaching with flexible online classes, score strategies and university acceptance checks for your study abroad plans.",
    },
  },
  {
    slug: "esat",
    path: "/esat/",
    name: "ESAT",
    fullName: "Engineering and Science Admissions Test",
    categories: ["undergraduate", "subject"],
    administeredBy: "UAT-UK, delivered through Pearson VUE",
    officialUrl: "https://www.uat-uk.org",
    tagline: "The admissions test for engineering and physical sciences at Cambridge and Imperial.",
    forWhom: [
      "Applicants to certain engineering and science courses at the University of Cambridge",
      "Applicants to certain engineering courses at Imperial College London",
      "Students with strong mathematics and physics who want to show readiness beyond grades",
    ],
    measures:
      "Mathematics and science knowledge and problem-solving at school level, in modules chosen according to the course applied for.",
    ethosSupport: [
      "Identifying which ESAT modules your courses require",
      "Problem-solving practice beyond the school syllabus",
      "Timed module practice and error analysis",
      "Planning ESAT alongside your UCAS application",
    ],
    approach:
      "ESAT questions reward fluency under time pressure. We combine syllabus revision with problem-solving practice that builds speed and accuracy.",
    faqs: [
      {
        id: "esat-who",
        question: "Which courses require the ESAT?",
        answer:
          "Certain engineering and science courses at Cambridge and Imperial. Required modules depend on the course, so check the university’s current requirements and UAT-UK’s guidance before registering.",
        category: "tests",
        lastReviewed: REVIEWED,
      },
    ],
    lastReviewed: REVIEWED,
    seo: {
      title: "ESAT Exam Preparation for UK Engineering",
      description:
        "ESAT preparation for Cambridge and Imperial applicants with focused maths and science training, timed practice and guidance on UK engineering admissions.",
    },
  },
];

export const getExamLocal = (slug: string) => exams.find((e) => e.slug === slug);

/** Only what the test-prep grid renders — keeps the client payload small (full records stay on the server). */
export type ExamSummary = Pick<Exam, "slug" | "path" | "name" | "tagline" | "categories">;
export const toExamSummary = ({ slug, path, name, tagline, categories }: Exam): ExamSummary => ({ slug, path, name, tagline, categories });
