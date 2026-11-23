import { destinations } from "./destinations";
import { exams } from "./exams";

/** Primary navigation (original-site order), built on the server and passed to the header as data. */
export type NavGroup = {
  label: string;
  href: string;
  links?: { label: string; href: string }[];
};

export const navGroups: NavGroup[] = [
  {
    label: "Admissions",
    href: "/admission/",
    links: [
      { label: "All programmes", href: "/admission/" },
      { label: "Dream School Application", href: "/admission/dream-school/" },
      { label: "Guaranteed Admissions", href: "/admission/guaranteed-admissions/" },
      { label: "Scholarship Program", href: "/admission/scholarship-program/" },
      { label: "Ivy Mentors", href: "/ivy-mentors/" },
    ],
  },
  {
    label: "Test Prep",
    href: "/test-prep/",
    links: [{ label: "All tests", href: "/test-prep/" }, ...exams.map((e) => ({ label: e.name, href: e.path }))],
  },
  {
    label: "Study Abroad",
    href: "/study-abroad/",
    links: [{ label: "All destinations", href: "/study-abroad/" }, ...destinations.map((d) => ({ label: d.name, href: d.path }))],
  },
  { label: "Career Counselling", href: "/career-counselling/" },
  { label: "Success Stories", href: "/success-stories/" },
  { label: "Blogs", href: "/blog/" },
  {
    label: "About",
    href: "/about/",
    links: [
      { label: "About Ethos", href: "/about/" },
      { label: "FAQs", href: "/faq/" },
      { label: "Contact", href: "/contact/" },
    ],
  },
];
