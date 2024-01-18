"use client";
import { useState } from "react";
import { signInHandler } from "../actions";

export const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [secretCode, setSecretCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [signUpStatus, setSignUpStatus] = useState<
    "ERROR" | "SUCCESS" | "DEFAULT"
  >("DEFAULT");

  return (
    <>
      <form
        className="flex flex-col bg-opacity-70 mb-8 justify-between shadow-lg gap-2 min-h-96 w-full max-w-96 border border-green-800 bg-white p-4 rounded-lg"
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);

          const redirectUrl = new URL("/auth/callback", window.location.href)
            .href;
          const { data, error } = await signInHandler(
            email,
            secretCode,
            redirectUrl
          );

          if (error) {
            setSignUpStatus("ERROR");
          } else {
            setSignUpStatus("SUCCESS");
          }

          setTimeout(() => {
            setSignUpStatus("DEFAULT");
          }, 5000);

          setLoading(false);
        }}
      >
        <div className="w-full flex flex-col gap-2">
          <h1 className="text-2xl font-bold self-center uppercase">Sign In</h1>
          <div className="flex flex-col">
            <label className="font-semibold" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              placeholder="john.smith@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold" htmlFor="code">
              Code
            </label>
            <input
              type="text"
              placeholder="123456"
              onChange={(e) => setSecretCode(e.target.value)}
            />
          </div>
        </div>
        <button className="btn-primary w-2/3 self-center " disabled={loading}>
          Submit
        </button>
      </form>
      {signUpStatus === "ERROR" && (
        <div
          role="alert"
          className="border py-2 px-8 text-center rounded-full bg-white shadow-lg"
        >
          <p>Something went wrong signing you in.</p>
          <p>was the code you entered correct?</p>
        </div>
      )}
      {signUpStatus === "SUCCESS" && (
        <div
          className="border py-2 px-8 text-center rounded-full bg-white shadow-lg"
          role="success"
        >
          <p>Check your email for a magic link to sign in.</p>
          <p>If you don&apos;t see it, check your spam folder.</p>
        </div>
      )}
    </>
  );
};
