import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import MenuIcon from "@mui/icons-material/Menu";
import { PropsWithChildren } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Session } from "@supabase/supabase-js";
import { useSession } from "@/hooks/useSession";

interface LayoutProps {
  login?: boolean;
}

export const Layout = ({ children, login }: PropsWithChildren<LayoutProps>) => {
  const router = useRouter();
  const session = useSession();

  const loginStyles = login
    ? {
        backgroundImage: "url(/priscilla-du-preez-unsplash.jpg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
      }
    : {};

  return (
    <>
      {!login && (
        <AppBar color="secondary">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Directory
            </Typography>
            {!session ? (
              <Button color="inherit" onClick={() => router.push("/login")}>
                Login
              </Button>
            ) : (
              <Button color="inherit" onClick={() => supabase.auth.signOut()}>
                Sign Out
              </Button>
            )}
          </Toolbar>
        </AppBar>
      )}

      <Box
        component="main"
        sx={{
          height: "100dvh",
          ...loginStyles,
        }}
      >
        <Container sx={{ height: "inherit" }}>{children}</Container>
      </Box>
    </>
  );
};
