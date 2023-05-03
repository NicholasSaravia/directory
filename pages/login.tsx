import { Box, Grid, Paper, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { login } from "@/helpers/api/login";
import { LoadingButton } from "@mui/lab";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    login(email).then((res) => {
      setLoading(false);
      if (res.success) {
        setEmailSent(true);
      } else if (res?.error) {
        alert("Email not found");
      }
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setEmailSent(false);
    }, 5000);
  }, [emailSent]);

  return (
    <Grid
      container
      height="inherit"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={0} md={6}></Grid>
      <Grid item xs={12} md={6}>
        <Paper
          elevation={2}
          sx={(theme) => ({
            p: 4,
            pb: 5,
            margin: "auto",
            width: "100%",
            maxWidth: 400,
            borderRadius: 2,
            backgroundColor: theme.palette.common.white,
          })}
        >
          <Stack spacing={4}>
            <Typography
              textAlign="center"
              variant="h1"
              fontSize="3rem"
              fontWeight={500}
            >
              Church Directory
            </Typography>
            <Stack spacing={2}>
              <TextField
                label="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailSent ? (
                <>
                  <Stack
                    flexDirection="row"
                    justifyContent="center"
                    alignItems="center"
                    gap={2}
                  >
                    <Typography color="primary" textTransform="uppercase">
                      Email Sent
                    </Typography>
                    <MarkEmailReadIcon color="primary" />
                  </Stack>
                </>
              ) : (
                <LoadingButton
                  size="large"
                  variant="contained"
                  onClick={handleLogin}
                  loading={loading}
                >
                  <Typography fontWeight={700}>Send Sign In Link</Typography>
                </LoadingButton>
              )}
            </Stack>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
};

Login.login = true;
export default Login;
