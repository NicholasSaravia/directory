import { useSession } from "@/hooks/useSession";
import { Backdrop, CircularProgress, Stack } from "@mui/material";
import { useRouter } from "next/router";
import React, { PropsWithChildren, useEffect } from "react";

interface RouteProtectorProps {
  login: boolean;
}

const RouteProtector = ({
  children,
  login,
}: PropsWithChildren<RouteProtectorProps>) => {
  const { session, loading } = useSession();

  if (session || login) {
    return <>{children}</>;
  }

  if (loading) {
    return <PageLoading />;
  }

  return <RedirectToLogin />;
};

export default RouteProtector;

const RedirectToLogin = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/login");
    }, 1000);
  }, [router]);

  return <PageLoading />;
};

const PageLoading = () => (
  <Stack>
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  </Stack>
);
