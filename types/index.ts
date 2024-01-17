import { object, string, z } from "zod";

const familySchema = object({
  id: string(),
  name: string(),
  description: string().nullable(),
  anniversary: string().nullable(),
  created_at: string().transform((val) => new Date(val)),
  photo_url: string().nullable(),
});

export type Family = z.infer<typeof familySchema>;
