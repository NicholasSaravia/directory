"use client";
import { signInWithEmail } from "@/lib/api/auth";
import { useRef, useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [signUpStatus, setSignUpStatus] = useState<
    "ERROR" | "SUCCESS" | "DEFAULT"
  >("DEFAULT");

  return (
    <main className="h-[100dvh] w-[100dvw]">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const { data, error } = await signInWithEmail(email);

          if (error) {
            setSignUpStatus("ERROR");
          } else {
            setSignUpStatus("SUCCESS");
          }

          setTimeout(() => {
            console.log("resetting");
            setSignUpStatus("DEFAULT");
          }, 3000);
        }}
      >
        <>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button>Sign In via magic link</button>
        </>
        {signUpStatus === "ERROR" && (
          <div>Something went wrong submitting your request</div>
        )}
        {signUpStatus === "SUCCESS" && (
          <div>
            Check your email for a magic link to sign in. If you don&apos;t see
            it, check your spam folder.
          </div>
        )}
      </form>
    </main>
  );
}
