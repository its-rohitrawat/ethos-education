import type { MentorRole, ProcessStep } from "./types";

/**
 * The 5:1 model as described on the current homepage ("each student is guided by five experts").
 * Role descriptions are written from the existing service copy — confirm with Ethos.
 */
export const mentorRoles: MentorRole[] = [
  {
    index: "01",
    title: "University Expert",
    short: "Knows where you fit",
    description:
      "Matches your profile to courses, countries and universities, and builds a shortlist balanced across dream, reach and safer choices.",
    contributes: ["Course, college & country strategy", "Balanced shortlist", "Application-system know-how"],
  },
  {
    index: "02",
    title: "Profile Builder",
    short: "Shapes what you do next",
    description:
      "Plans the activities that give your application depth — leadership, community work, projects, internships and research exposure.",
    contributes: ["Extracurricular & leadership plan", "Projects and internships", "Research opportunities"],
  },
  {
    index: "03",
    title: "Research Analyst",
    short: "Brings the evidence",
    description:
      "Researches programmes, requirements, funding and outcomes so every decision on your shortlist is grounded in current information.",
    contributes: ["Programme & requirement research", "Scholarship and funding scans", "Deadline tracking"],
  },
  {
    index: "04",
    title: "Editor",
    short: "Finds your voice",
    description:
      "Works with you on essays, personal statements and SOPs until they sound unmistakably like you — clear, specific and honest.",
    contributes: ["Essay themes & drafts", "SOPs and supplements", "Résumés and activity lists"],
  },
  {
    index: "05",
    title: "Counsellor",
    short: "Keeps it all together",
    description:
      "Your single point of contact. Sets the roadmap, keeps the team aligned, and supports students and parents through every decision.",
    contributes: ["Roadmap & timeline", "Family communication", "Interview, visa and transition support"],
  },
];

/** Six stages, from the current homepage "steps" section and the ELITE page. */
export const processSteps: ProcessStep[] = [
  {
    index: "01",
    title: "Profile Evaluation",
    summary: "A thorough review of academics, interests and goals — supported by psychometric and aptitude assessments.",
    deliverables: ["Academic & activity review", "Aptitude and interest mapping", "Agreed goals and priorities"],
    image: { src: "/media/photos/counselling-session.webp", alt: "A counsellor in conversation with a student", width: 2400, height: 1350, provisional: true },
  },
  {
    index: "02",
    title: "University Shortlisting",
    summary: "Course, college and country recommendations based on your profile, preferences, budget and long-term plans.",
    deliverables: ["Dream, reach and safer shortlist", "Country briefings: cost, work rights, ROI", "Test and requirement plan"],
    image: { src: "/media/photos/students-laptop.webp", alt: "Four students looking at a laptop together", width: 2400, height: 1800, provisional: true },
  },
  {
    index: "03",
    title: "Profile Development",
    summary: "Skill building, test preparation and mentored extracurricular, leadership and research work that deepen your candidacy.",
    deliverables: ["Personalised roadmap & timeline", "Test preparation plan", "Projects, leadership and research"],
    image: { src: "/media/photos/study-group.webp", alt: "A group of students working together at a café table", width: 2400, height: 1600, provisional: true },
  },
  {
    index: "04",
    title: "Application Strategy",
    summary: "Essays, SOPs, recommendations and applications — shaped with your counsellor and polished by our editors.",
    deliverables: ["Essays and personal statements", "Recommendation guidance", "Interview preparation"],
    image: { src: "/media/photos/student-writing.webp", alt: "A student writing notes in a notebook", width: 2400, height: 1600, provisional: true },
  },
  {
    index: "05",
    title: "Finance & Visa Guidance",
    summary: "Scholarship strategy, education-loan guidance and step-by-step support through the visa process.",
    deliverables: ["Scholarship & funding plan", "Loan guidance", "Visa documents and interview practice"],
    image: { src: "/media/photos/student-focus.webp", alt: "A student concentrating on work at a laptop", width: 2400, height: 1600, provisional: true },
  },
  {
    index: "06",
    title: "Pre-Departure Orientation",
    summary: "Practical preparation for life abroad — cultural adaptation, health and travel insurance, and everyday living.",
    deliverables: ["Pre-departure briefing", "Insurance and travel checklist", "First-semester guidance"],
    image: { src: "/media/photos/students-walking.webp", alt: "A group of students walking and laughing together outdoors", width: 2400, height: 1348, provisional: true },
  },
];

export const careerPaths = [
  {
    id: "school",
    label: "School Students",
    lede: "Choose subjects and streams with confidence, before options narrow.",
    points: [
      "Aptitude and personality assessments",
      "Stream and subject selection guidance",
      "Course and major counselling, career-awareness workshops",
      "A roadmap for entrance exams and scholarships",
    ],
  },
  {
    id: "graduates",
    label: "College Students & Graduates",
    lede: "Turn a degree into a direction — specialisation, further study or work.",
    points: [
      "Specialisation and higher-education planning",
      "Master’s, MBA and certification decisions",
      "Internships and skill-building opportunities",
      "Support moving from study to the workplace",
    ],
  },
  {
    id: "professionals",
    label: "Working Professionals",
    lede: "Step back, take stock and plan the next chapter deliberately.",
    points: [
      "University and course counselling for returning students",
      "Strategies for career plateaus",
      "Leadership, entrepreneurship and freelancing guidance",
      "Industry or role-transition planning",
    ],
  },
] as const;

export const careerApproach = [
  { title: "Personalised assessments", text: "Psychometric, personality and aptitude tests that show strengths and interests." },
  { title: "Tailored roadmaps", text: "Step-by-step plans for your academic stage, goals and course choices." },
  { title: "Global guidance", text: "Studying in India or abroad, scholarships, competitive exams and career planning." },
  { title: "Expert mentorship", text: "Trained counsellors, industry experts and alumni perspectives." },
];

/**
 * "The Ethos difference". Comparative claims from the current site ("10× counselling hours",
 * "AI-powered research") are deliberately omitted until Ethos verifies their scope.
 */
export const differences = [
  { title: "A strategy that is yours", text: "No templates. Every shortlist, roadmap and essay starts from who you are and where you want to go." },
  { title: "Five experts, one student", text: "University expert, profile builder, research analyst, editor and counsellor — working as one team." },
  { title: "Research-led decisions", text: "Choices grounded in current requirements, funding and outcomes, not reputation alone." },
  { title: "Depth over decoration", text: "Profile development that builds genuine achievement: research, leadership, projects and service." },
  { title: "Writing that sounds like you", text: "Editorial support that sharpens your voice rather than replacing it." },
  { title: "Funding and visas, handled", text: "Scholarship strategy, loan guidance and visa preparation inside the same plan." },
];

export const nav = {
  primary: [
    { label: "About", href: "/about/" },
    {
      label: "Admissions",
      href: "/admission/",
      children: [
        { label: "Dream School Application", href: "/admission/dream-school/" },
        { label: "Guaranteed Admissions", href: "/admission/guaranteed-admissions/" },
        { label: "Scholarship Program", href: "/admission/scholarship-program/" },
      ],
    },
    { label: "Ivy Mentors", href: "/ivy-mentors/" },
    { label: "Test Prep", href: "/test-prep/" },
    { label: "Career Counselling", href: "/career-counselling/" },
    { label: "Success Stories", href: "/success-stories/" },
    { label: "Journal", href: "/blog/" },
    { label: "Contact", href: "/contact/" },
  ],
  secondary: [
    { label: "Study destinations", href: "/study-abroad/" },
    { label: "FAQs", href: "/faq/" },
  ],
} as const;
