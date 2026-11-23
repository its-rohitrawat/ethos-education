import type { JournalTopic } from "../types";

export const journalTopics: { slug: JournalTopic; label: string; description: string }[] = [
  { slug: "admissions", label: "Admissions", description: "Strategy for selective universities — Ivy League, Oxbridge and beyond." },
  { slug: "scholarships-funding", label: "Scholarships & Funding", description: "Scholarships, financial aid and planning the cost of study abroad." },
  { slug: "destinations", label: "Destinations", description: "Countries, costs and what studying there is really like." },
  { slug: "visas-careers", label: "Visas & Careers", description: "Student visas, employability and courses with strong outcomes." },
  { slug: "test-prep", label: "Test Prep", description: "Admissions and English tests — what they measure and how to prepare." },
  { slug: "perspectives", label: "Perspectives", description: "The bigger picture: global education and the personal journey." },
];
