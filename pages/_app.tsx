import { MaterialProvider } from "@/context/MaterialProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import { Layout } from "@/components/Layout";
import RouteProtector from "@/components/RouteProtector";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  login?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
export default function App({ Component, pageProps }: AppPropsWithLayout) {
  return (
    <MaterialProvider>
      <RouteProtector login={Boolean(Component.login)}>
        <Layout login={Component.login}>
          <Component {...pageProps} />
        </Layout>
      </RouteProtector>
    </MaterialProvider>
  );
}
