import "server-only";
import { z } from "zod";
import { countries, dialCodes, roles, services, studyLevels } from "../options";

const values = <T extends readonly { value: string }[]>(list: T) =>
  list.map((o) => o.value) as unknown as [T[number]["value"], ...T[number]["value"][]];

const shortText = (max: number) => z.string().trim().max(max).optional();

/** Server-side validation of a consultation request. The client validates too, but only this is trusted. */
export const leadSchema = z.object({
  submissionId: z.uuid(),
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(120)
    .refine((v) => !/[<>{}]/.test(v), "Please enter your full name."),
  email: z.email("Please enter a valid email address.").max(254),
  phoneCountry: z.enum(dialCodes.map((d) => d.code) as [string, ...string[]]),
  phone: z
    .string()
    .trim()
    .regex(/^[\d\s().-]+$/, "Please enter a valid phone number.")
    .refine((v) => {
      const digits = v.replace(/\D/g, "").length;
      return digits >= 6 && digits <= 14;
    }, "Please enter a valid phone number."),
  studyLevel: z.enum(values(studyLevels)),
  role: z.enum(values(roles)).optional(),
  country: z.enum(values(countries)).optional(),
  intake: shortText(40),
  service: z.enum(values(services)).optional(),
  message: shortText(2000),
  consent: z.literal(true, "Please confirm we may contact you."),
  /** Honeypot: hidden from people, often filled by bots. */
  website: z.string().max(0).optional().or(z.literal("")),
  /** Milliseconds between the form rendering and submission. */
  elapsedMs: z.number().int().nonnegative(),
  turnstileToken: shortText(4096),
  attribution: z
    .object({
      source: shortText(80),
      pagePath: shortText(300),
      landingPage: shortText(300),
      referrer: shortText(300),
      utm_source: shortText(120),
      utm_medium: shortText(120),
      utm_campaign: shortText(160),
      utm_term: shortText(160),
      utm_content: shortText(160),
      gclid: shortText(200),
    })
    .partial()
    .default({}),
});

export type Lead = z.infer<typeof leadSchema>;

/** The canonical record handed to CRM / email adapters. */
export type LeadRecord = Omit<Lead, "website" | "elapsedMs" | "turnstileToken" | "consent"> & {
  consentAt: string;
  receivedAt: string;
  phoneE164: string;
};

export function toRecord(lead: Lead): LeadRecord {
  const now = new Date().toISOString();
  return {
    submissionId: lead.submissionId,
    fullName: lead.fullName,
    email: lead.email,
    phoneCountry: lead.phoneCountry,
    phone: lead.phone,
    studyLevel: lead.studyLevel,
    role: lead.role,
    country: lead.country,
    intake: lead.intake,
    service: lead.service,
    message: lead.message,
    attribution: lead.attribution,
    consentAt: now,
    receivedAt: now,
    phoneE164: `${lead.phoneCountry}${lead.phone.replace(/\D/g, "")}`,
  };
}
