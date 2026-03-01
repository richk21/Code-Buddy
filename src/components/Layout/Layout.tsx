import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Stack,
} from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <Stack direction="row" alignItems="center">
              <CodeIcon sx={{ mr: 1 }} />
              <Typography
                variant="h6"
                component={Link}
                to="/"
                sx={{ textDecoration: "none", color: "inherit" }}
              >
                Code Buddy
              </Typography>
            </Stack>
            <Navbar />
          </Stack>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md">
        <Box mt={6}>{children}</Box>
      </Container>
    </>
  );
};
