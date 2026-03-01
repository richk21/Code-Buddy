import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#6366f1",
    },
    background: {
      default: "#0f172a",
      paper: "#1e293b",
    },
  },

  typography: {
    fontFamily: `"Montserrat", sans-serif`,

    h1: {
      fontWeight: 700,
      fontSize: "2.8rem",
    },
    h4: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
    body1: {
      fontWeight: 400,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 16,
  },

  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          padding: "8px",
          boxShadow: "0px 8px 24px rgba(0,0,0,0.3)",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: "10px 20px",
        },
      },
    },
  },
});

export default theme;
