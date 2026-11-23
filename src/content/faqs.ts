import type { Faq } from "./types";

/**
 * Sources: /faq/ and /admission/ on the current site (migrated), plus questions required by the
 * redesign brief. New answers describe services only as the current site describes them; nothing
 * about pricing, duration or guarantees has been added.
 */
const REVIEWED = "2026-11-21";

export const faqs: Faq[] = [
  {
    id: "when-to-start",
    category: "process",
    question: "When should I start preparing to study abroad?",
    answer:
      "For undergraduate applications, ideally in Class 9 or 10 — when extracurricular depth and academic trajectory start to matter, and there is still time to shape both. Most families begin in Class 11, which still allows a full cycle. Starting in Class 12 is possible but limits you to the profile that already exists. For postgraduate study, begin 12–18 months before your intended intake.",
  },
  {
    id: "first-consultation",
    category: "consultation",
    question: "What happens in a consultation?",
    answer:
      "You speak with an Ethos counsellor about your goals, academic background, timeline and questions. Students and parents are both welcome. By the end you should have a clearer view of your options and of which Ethos programme — if any — fits your situation.",
  },
  {
    id: "shortlisting",
    category: "process",
    question: "How does university shortlisting work?",
    answer:
      "We work through the three Cs — course, college and country — using your interests, aptitude, academic record, budget and long-term goals. The result is a balanced shortlist of dream, reach and safer options, each with a reason to be there.",
  },
  {
    id: "choose-programme",
    category: "programmes",
    question: "How do I choose between Ethos programmes?",
    answer:
      "Dream School Application suits students aiming for the most selective universities who want end-to-end strategy. The Guaranteed Admissions Program suits students who value an assured place at a participating partner university. The Scholarship Program suits students for whom funding is a deciding factor. Many families decide after their first consultation.",
  },
  {
    id: "guaranteed-eligibility",
    category: "programmes",
    question: "Who is eligible for the Guaranteed Admissions Program — and what is guaranteed?",
    answer:
      "Students who meet the programme’s set academic and English-language requirements. The guarantee is admission to a participating partner university — not to any specific university, and not to Ivy League institutions outside the partner group. The criteria and current partner list are set out in written terms shared before you enrol.",
  },
  {
    id: "mentorship-includes",
    category: "mentorship",
    question: "What does the 5:1 mentorship model include?",
    answer:
      "Each student is supported by five specialists: a University Expert for shortlisting, a Profile Builder for activities and research, a Research Analyst for requirements and funding, an Editor for essays and statements, and a Counsellor who leads the plan and keeps everyone aligned.",
  },
  {
    id: "scholarships-loans",
    category: "scholarships",
    question: "Do you help with scholarships and education loans?",
    answer:
      "Yes. We identify universities with strong merit- and need-based aid, support scholarship applications and essays, and guide families through education-loan options. No scholarship amount can be guaranteed.",
  },
  {
    id: "visa-support",
    category: "visas",
    question: "Do you support the student visa process?",
    answer:
      "Yes. Visa guidance is part of our process: documentation, financial evidence and interview practice. Visa rules change regularly, so we always work from each country’s current official requirements.",
  },
  {
    id: "countries",
    category: "process",
    question: "Which countries and universities do you work with?",
    answer:
      "Our focus is the United States, United Kingdom, Canada, Europe and Singapore. We also advise on Australia, New Zealand, India and other destinations when they suit a student’s goals.",
  },
  {
    id: "editing",
    category: "process",
    question: "What does your application editing include?",
    answer:
      "Essay theme development, drafting support, personalisation and editing — for main essays, supplements, statements of purpose and personal statements — along with guidance on recommendation letters, résumés and activity lists.",
  },
  {
    id: "interviews",
    category: "process",
    question: "Will I get interview support?",
    answer: "Yes — mock interviews with trained interviewers, covering content, poise and communication.",
  },
  {
    id: "worth-it",
    category: "consultation",
    question: "Is it worth paying for an admissions consultant?",
    answer:
      "It depends on what you need. If you are applying to two or three universities in one country with straightforward requirements, you can usually manage alone using official university websites. Consultants earn their fee on complex applications: multi-country shortlists, competitive courses, scholarship applications, profile gaps or tight deadlines across different systems. Ask any consultant what share of their students were admitted to their first-choice university — and ask to speak to a past family.",
  },
  {
    id: "ivy-with-90",
    category: "process",
    question: "Can I get into an Ivy League university with 90–95% in my board exams?",
    answer:
      "Yes, it happens every year. Ivy League admissions are holistic — board marks are one input among essays, recommendations, extracurricular depth and demonstrated interest. A 95% with a genuine, sustained achievement outside the classroom generally reads stronger than a 98% with nothing else. Marks well below 90% make the academic case harder, and you would need clear evidence of improvement or exceptional accomplishment elsewhere.",
  },
  {
    id: "test-prep-options",
    category: "tests",
    question: "Which tests do you prepare students for?",
    answer:
      "Ten: SAT, ACT, AP, GRE, GMAT, IELTS, TOEFL iBT, PTE Academic, the Duolingo English Test and the ESAT. Preparation is planned around the requirements of the universities on your shortlist.",
  },
  {
    id: "sat-compulsory",
    category: "tests",
    question: "Is the SAT compulsory for Indian students applying to the USA?",
    lastReviewed: REVIEWED,
    answer:
      "No. Many US universities have been test-optional since 2020, but several selective institutions have reinstated testing requirements. Check each university’s current policy, as these change year to year. A strong score can still help where testing is optional — particularly for merit scholarships.",
  },
  {
    id: "det-accepted",
    category: "tests",
    question: "Do US universities accept the Duolingo English Test?",
    lastReviewed: REVIEWED,
    answer:
      "Thousands of institutions accept the DET, including many well-known US universities. It is cheaper than IELTS or TOEFL, taken at home, and results arrive quickly. But acceptance is not universal, and some universities limit the courses it can be used for or require a higher equivalent score. Confirm on each university’s admissions page before booking.",
  },
  {
    id: "ielts-score",
    category: "tests",
    question: "What IELTS score do I need to study abroad?",
    lastReviewed: REVIEWED,
    answer:
      "As a general guide: undergraduate programmes often ask for 6.0–6.5 overall, postgraduate programmes 6.5–7.0, and competitive courses such as law, medicine or journalism 7.0–7.5. Many universities also set a minimum for each band, so an overall 7.0 with 5.5 in writing can still fall short. Visa requirements are separate and may differ.",
  },
];

export const homepageFaqIds = [
  "when-to-start",
  "shortlisting",
  "scholarships-loans",
  "mentorship-includes",
  "first-consultation",
  "test-prep-options",
  "visa-support",
  "guaranteed-eligibility",
  "choose-programme",
];
