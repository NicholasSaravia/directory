import { array, boolean, date, number, object, string, z } from "zod";

const familySchema = object({
  id: string(),
  name: string(),
  description: string().nullable(),
  created_at: string().transform((val) => new Date(val)),
  photo_path: string().nullable(),
});

export type Family = z.infer<typeof familySchema>;

const signedPhotoSchema = object({
  error: z.string().nullable(),
  path: z.string().nullable(),
  signedUrl: z.string(),
});

export type SignedPhoto = z.infer<typeof signedPhotoSchema>;

const roleSchema = object({
  userrole: z.enum(["ADMIN", "EDITOR", "VIEWER"]),
  user_id: string(),
  family_id: array(string()),
});

export type Role = z.infer<typeof roleSchema>;

export enum FamilyRole {
  "Head_of_Household" = "Head_of_Household",
  "Spouse" = "Spouse",
  "Child" = "Child",
}
export const memberSchema = object({
  id: string(),
  name: string(),
  role: z.string().default(FamilyRole.Child),
  family_id: string(),
  anniversary: date().nullable(),
  birthday: date().nullable(),
  calculate_age: boolean().default(false),
  phone_number: string().nullable(),
  email: string().nullable(),
});

export type Member = z.infer<typeof memberSchema>;
