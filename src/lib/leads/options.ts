/** Form options shared by the consultation form (client) and lead validation (server). */

export const studyLevels = [
  { value: "undergraduate", label: "Undergraduate" },
  { value: "masters", label: "Master’s" },
  { value: "mba", label: "MBA" },
  { value: "phd", label: "PhD / Research" },
  { value: "school-career", label: "School student / Career exploration" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

export const roles = [
  { value: "student", label: "Student" },
  { value: "parent", label: "Parent or guardian" },
] as const;

export const countries = [
  { value: "usa", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "canada", label: "Canada" },
  { value: "europe", label: "Europe" },
  { value: "singapore", label: "Singapore" },
  { value: "other", label: "Somewhere else" },
  { value: "undecided", label: "Still deciding" },
] as const;

export const services = [
  { value: "dream-school", label: "Dream School Application" },
  { value: "guaranteed-admissions", label: "Guaranteed Admissions Program" },
  { value: "scholarship-program", label: "Scholarship Program" },
  { value: "ivy-mentors", label: "Ivy Mentors" },
  { value: "test-prep", label: "Test preparation" },
  { value: "career-counselling", label: "Career counselling" },
  { value: "not-sure", label: "Not sure — help me decide" },
] as const;

/** Intake options relative to the current year — computed in the browser, not at build time. */
export const getIntakes = (year: number) =>
  [year + 1, year + 2, year + 3].flatMap((y) => [`Fall ${y}`, `Spring ${y}`]).concat(["Later / not sure"]);

export const dialCodes = [
  { code: "+91", label: "India +91" },
  { code: "+1", label: "USA / Canada +1" },
  { code: "+44", label: "UK +44" },
  { code: "+971", label: "UAE +971" },
  { code: "+65", label: "Singapore +65" },
  { code: "+61", label: "Australia +61" },
  { code: "+966", label: "Saudi Arabia +966" },
  { code: "+974", label: "Qatar +974" },
  { code: "+968", label: "Oman +968" },
  { code: "+965", label: "Kuwait +965" },
  { code: "+973", label: "Bahrain +973" },
  { code: "+977", label: "Nepal +977" },
  { code: "+49", label: "Germany +49" },
  { code: "+33", label: "France +33" },
  { code: "+31", label: "Netherlands +31" },
  { code: "+353", label: "Ireland +353" },
  { code: "+852", label: "Hong Kong +852" },
  { code: "+64", label: "New Zealand +64" },
] as const;

export type StudyLevel = (typeof studyLevels)[number]["value"];
export type ServiceInterest = (typeof services)[number]["value"];

export const labelFor = (list: readonly { value: string; label: string }[], value?: string) =>
  list.find((o) => o.value === value)?.label ?? value ?? "";
