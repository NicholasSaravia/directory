import { supabase } from "@/lib/supabaseClient";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // get emails that are allowed magic login using members table
    const FAKE_ACCEPTED_EMAILS: string[] = [process.env.EMAIL || ""];
    // get the email from the request body
    const { email } = req.body;
    // check if the email is in the list of accepted emails
    if (FAKE_ACCEPTED_EMAILS.includes(email)) {
      // if it is, send a 200 response
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${process.env.VERCEL_URL}/directory`,
        },
      });

      if (error) return res.status(401).json({ message: error.message });

      return res.status(200).json({ result: "success" });
    } else {
      // if it isn't, send a 401 response
      return res.status(401).json({ message: "email not found" });
    }
  } else {
    // TODO: convert status's to object
    return res.send(405);
  }
}
