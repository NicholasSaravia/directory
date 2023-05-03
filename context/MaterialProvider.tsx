import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { PropsWithChildren } from "react";
import "@fontsource/teko";
import "@fontsource/ubuntu";

export const MaterialProvider = ({ children }: PropsWithChildren) => {
  const theme = createTheme({
    palette: {
      // forest green pallete
      primary: {
        main: "#538580",
      },
      secondary: {
        main: "#EFF3E1",
      },
      text: {
        // rgb for primary
        primary: "rgba(35, 56,69,1)",
      },
    },
    // set font family
    typography: {
      fontFamily: "Ubuntu",
      h1: {
        fontFamily: "Teko",
      },
      body1: {
        fontFamily: "Ubuntu",
      },
      body2: {
        fontFamily: "Ubuntu",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
