import type { Programme } from "./types";

/**
 * Source: current-site-archive pages /admission/, /guaranteed-admission-program/, /ivy-mentors/,
 * /elite-preparation-ethos-education-expert-coaching/ — rewritten for clarity, scope unchanged.
 */
export const programmes: Programme[] = [
  {
    slug: "dream-school",
    index: "I",
    name: "Dream School Application",
    shortName: "Dream School",
    kicker: "For the most selective universities",
    summary:
      "End-to-end admissions strategy for students aiming at the world’s most competitive universities — from aptitude mapping to the final submitted application.",
    intro: [
      "Every student’s route to a dream university should be purposeful and well guided. The Dream School Application programme supports the whole journey, from understanding who you are to settling in abroad.",
      "It brings together two Ethos offerings: ELITE, our comprehensive admissions and profile-development programme, and IVY MENTOR, specialised academic mentorship and guided research.",
    ],
    forWhom: [
      "Students targeting highly selective universities in the US, UK and beyond",
      "Families who want one coordinated team rather than separate tutors, editors and advisers",
      "Students with time to build depth — ideally 12–18 months or more before applications",
    ],
    includes: [
      { title: "Aptitude mapping & goal setting", text: "Psychometric assessments and one-to-one sessions to identify strengths, interests and direction." },
      { title: "Course, country & university selection", text: "The three Cs — course, college, country — with a shortlist balanced across dream, reach and safer options." },
      { title: "A roadmap with deadlines", text: "A personalised timeline for profile building, test preparation and document readiness, reviewed regularly." },
      { title: "Profile building", text: "Mentored extracurriculars, leadership, community engagement, research exposure, projects and internships." },
      { title: "Application & editorial support", text: "Common App essays, personal statements and SOPs, supplementary essays, recommendation guidance, résumés and activity lists." },
      { title: "Interview preparation", text: "Mock interviews covering content, poise and communication." },
    ],
    components: [
      {
        id: "elite",
        name: "ELITE",
        summary: "Comprehensive admissions and profile development — from aptitude mapping to university selection and complete application support.",
        points: [
          "Aptitude mapping & academic goal setting",
          "Course, country & university selection",
          "Roadmap creation with progress reviews",
          "Profile building & skill development",
          "Application strategy & editorial support",
        ],
      },
      {
        id: "ivy-mentor",
        name: "IVY MENTOR",
        summary: "Specialised academic mentorship — guided research, academic networking and expert support for school selection and applications.",
        points: [
          "Independent research studies and faculty-guided projects",
          "Advanced academic exploration in a chosen field",
          "Support turning research into reports or publication submissions",
          "Mentor perspectives on campuses, courses and careers",
        ],
        href: "/ivy-mentors/",
      },
    ],
    image: { src: "/media/photos/campus-quad.webp", alt: "Students walking across a historic university quadrangle beneath a bell tower", width: 2400, height: 1600, provisional: true },
    seo: {
      title: "Dream School Application | Ivy League & Top University Admissions",
      description:
        "End-to-end admissions strategy for selective universities: aptitude mapping, shortlisting, profile building, essays and interviews — with ELITE and IVY MENTOR.",
    },
    legacyPaths: ["/dream-school-application/", "/elite/", "/elite-preparation-ethos-education-expert-coaching/"],
  },
  {
    slug: "guaranteed-admissions",
    index: "II",
    name: "Guaranteed Admissions Program",
    shortName: "Guaranteed Admissions",
    kicker: "A structured, assured pathway",
    summary:
      "A defined route to admission at participating partner universities in the US and other destinations — for students who meet the programme’s set academic and English-language requirements.",
    intro: [
      "Some students value certainty above all: knowing early where they will study, so that budgets, scholarships and living arrangements can be planned calmly.",
      "The Guaranteed Admissions Program gives you a clear set of eligibility criteria. Meet them, and admission to a participating partner university is assured. Our counsellors stay with you from meeting the requirements to preparing for the move.",
    ],
    forWhom: [
      "Students who want a dependable admission outcome and an early plan",
      "Families planning finances and timelines well in advance",
      "Students comfortable choosing from a defined group of partner universities",
    ],
    includes: [
      { title: "Clear eligibility criteria", text: "Academic and language requirements set out at the start, so you know exactly what to work towards." },
      { title: "A structured academic roadmap", text: "Preparation focused on meeting the criteria and building a strong profile alongside them." },
      { title: "Financial & personal planning", text: "With an assured place, budgets, scholarships and accommodation can be planned early." },
      { title: "Guidance throughout", text: "Counsellor support from meeting requirements through visa preparation and transition." },
    ],
    terms: {
      heading: "What is — and isn’t — guaranteed",
      text: "The guarantee is admission to a participating partner university once the programme’s published academic and English-language requirements are met. It is not a guarantee of admission to any particular university, and it does not apply to Ivy League or other institutions outside the partner group. The full written terms, including the current list of partner universities, are shared before you enrol.",
      verified: false,
      note: "Wording derived from the current site. Ethos must supply the written programme terms and partner list before launch.",
    },
    image: { src: "/media/photos/graduation-celebration.webp", alt: "Graduates in academic gowns celebrating together", width: 2400, height: 1600, provisional: true },
    seo: {
      title: "Guaranteed Admissions Program | Ethos Education Gurugram",
      description:
        "How the Ethos Guaranteed Admissions Program works: eligibility, partner universities, what is and isn’t guaranteed, and the support you receive at each stage.",
    },
    legacyPaths: ["/guaranteed-admission-program/"],
  },
  {
    slug: "scholarship-program",
    index: "III",
    name: "Scholarship Program",
    shortName: "Scholarships",
    kicker: "Making ambition affordable",
    summary:
      "Guidance towards universities with strong merit- and need-based aid — especially public universities in the USA — and applications built to compete for it.",
    intro: [
      "Financial constraints should not decide where a capable student studies. The Scholarship Program is designed to make studying abroad — particularly in the USA — more financially accessible.",
      "We match your academic strengths, activities and goals with institutions known for meaningful merit- and need-based funding, then help you write applications that make the strongest possible case. No scholarship amount can be promised; our job is to put you in the best position to win one.",
    ],
    forWhom: [
      "Strong students for whom cost is a deciding factor",
      "Families comparing the real, after-aid cost of different universities",
      "Applicants to US public universities and other aid-friendly institutions",
    ],
    includes: [
      { title: "Scholarship-aware shortlisting", text: "Universities chosen for fit and for the strength of their merit- and need-based aid." },
      { title: "Personalised guidance", text: "Matching academic strengths, achievements and career goals with the right opportunities." },
      { title: "Application & essay support", text: "Applications and scholarship essays that highlight achievements and potential." },
      { title: "Loan facilitation", text: "Guidance on education-loan options where scholarships do not cover the full cost." },
    ],
    image: { src: "/media/photos/reading-room.webp", alt: "A grand university reading room lined with bookshelves", width: 2400, height: 1600, provisional: true },
    seo: {
      title: "Scholarship Program for Studying Abroad | Ethos Education",
      description:
        "Find universities with strong merit- and need-based aid and build scholarship applications that compete — guidance for Indian students applying abroad.",
    },
    legacyPaths: ["/scholarship-program-2/"],
  },
];

export const getProgrammeLocal = (slug: string) => programmes.find((p) => p.slug === slug);
