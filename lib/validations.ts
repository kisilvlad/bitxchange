import { z } from "zod";
import { exchangeOptions, experienceOptions, planOptions } from "@/lib/content";

const optionalString = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((value) => (value === "" ? undefined : value));

export const leadSubmissionSchema = z.object({
  name: z.string().trim().min(2).max(80),
  contact: z.string().trim().min(3).max(80),
  email: z.preprocess(
    (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
    z.string().trim().email().max(120).optional()
  ),
  exchange: z.enum(exchangeOptions),
  experience: z.enum(experienceOptions),
  selectedPlan: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.enum(planOptions).optional()
  ),
  message: z.string().trim().max(1000).optional().default(""),
  consent: z.literal(true),
  website: z.string().max(0).optional().default(""),
  utmSource: optionalString(120),
  utmMedium: optionalString(120),
  utmCampaign: optionalString(160),
  utmContent: optionalString(160),
  utmTerm: optionalString(160),
  referrer: optionalString(500),
  pageUrl: optionalString(500)
});

export type LeadSubmission = z.infer<typeof leadSubmissionSchema>;
export type ExchangeOption = (typeof exchangeOptions)[number];
export type ExperienceOption = (typeof experienceOptions)[number];
export type PlanOption = (typeof planOptions)[number];

export type LeadRecord = Omit<LeadSubmission, "website"> & {
  createdAt: string;
};
