"use client";
import { useState } from "react";
import { signIn } from "@/app/actions";

export default function Home() {
  const [email, setEmail] = useState("");
  const [secretCode, setSecretCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [signUpStatus, setSignUpStatus] = useState<
    "ERROR" | "SUCCESS" | "DEFAULT"
  >("DEFAULT");

  return (
    <main className="flex flex-col h-full justify-center items-center">
      <form
        className="flex flex-col gap-2 max-w-60 border p-4 rounded-lg"
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);

          const redirectUrl = new URL("/directory", window.location.href).href;
          const { error } = await signIn(email, secretCode, redirectUrl);

          if (error) {
            setSignUpStatus("ERROR");
          } else {
            setSignUpStatus("SUCCESS");
          }

          setTimeout(() => {
            console.log("resetting");
            setSignUpStatus("DEFAULT");
          }, 3000);

          setLoading(false);
        }}
      >
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Secret Code"
          onChange={(e) => setSecretCode(e.target.value)}
        />
        <button className="btn-primary" disabled={loading}>
          Sign In via magic link
        </button>
      </form>
      {signUpStatus === "ERROR" && (
        <div>Something went wrong submitting your request</div>
      )}
      {signUpStatus === "SUCCESS" && (
        <div>
          Check your email for a magic link to sign in. If you don&apos;t see
          it, check your spam folder.
        </div>
      )}
    </main>
  );
}
