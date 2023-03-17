import { MaterialProvider } from "@/context/MaterialProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MaterialProvider>
      <Component {...pageProps} />
    </MaterialProvider>
  );
}
