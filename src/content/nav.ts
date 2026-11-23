import { destinations } from "./destinations";
import { exams } from "./exams";

/** Primary navigation, built on the server and passed to the (client) header as plain data. */
export type NavGroup = {
  label: string;
  href: string;
  blurb?: string;
  image?: { src: string; alt: string };
  links?: { label: string; href: string }[];
};

export const navGroups: NavGroup[] = [
  {
    label: "Programmes",
    href: "/admission/",
    blurb: "Admissions programmes and mentorship, built around where each student wants to go.",
    image: { src: "/media/photos/campus-quad.webp", alt: "" },
    links: [
      { label: "Dream School Application", href: "/admission/dream-school/" },
      { label: "Guaranteed Admissions", href: "/admission/guaranteed-admissions/" },
      { label: "Scholarship Program", href: "/admission/scholarship-program/" },
      { label: "Ivy Mentors", href: "/ivy-mentors/" },
      { label: "Career Counselling", href: "/career-counselling/" },
    ],
  },
  {
    label: "Test Prep",
    href: "/test-prep/",
    blurb: "Preparation planned around the universities on your shortlist.",
    image: { src: "/media/photos/student-writing.webp", alt: "" },
    links: exams.map((e) => ({ label: e.name, href: e.path })),
  },
  {
    label: "Study Abroad",
    href: "/study-abroad/",
    blurb: "How applications really work in each destination.",
    image: { src: "/media/photos/campus-walk.webp", alt: "" },
    links: destinations.map((d) => ({ label: d.name, href: d.path })),
  },
  {
    label: "About",
    href: "/about/",
    blurb: "Who we are, the students we have guided, and how to reach us.",
    image: { src: "/media/photos/counselling-session.webp", alt: "" },
    links: [
      { label: "About Ethos", href: "/about/" },
      { label: "Success Stories", href: "/success-stories/" },
      { label: "FAQs", href: "/faq/" },
      { label: "Contact", href: "/contact/" },
    ],
  },
  { label: "Journal", href: "/blog/" },
];
