import { Link, useNavigate } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import { Create, Login, Person } from "@mui/icons-material";
import { Search } from "@mui/icons-material";
import { getToken, logout } from "../../utils/auth";
import { Logout } from "@mui/icons-material";

const Navbar = () => {
  const token = getToken();
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center p-4 shadow-md">
      <Stack direction="row" alignItems="center" spacing={5}>
        {!token && (
          <>
            <Typography
              variant="h6"
              component={Link}
              to="/create"
              sx={{
                textDecoration: "none",
                color: "inherit",
                fontSize: "1rem",
                alignItems: "center",
                justifyContent: "space-around",
                display: "flex",
                width: "150px",
              }}
            >
              <Create />
              Create profile
            </Typography>
            <Typography
              variant="h6"
              component={Link}
              to="/login  "
              sx={{
                textDecoration: "none",
                color: "inherit",
                fontSize: "1rem",
                alignItems: "center",
                justifyContent: "space-around",
                display: "flex",
                width: "100px",
              }}
            >
              <Login />
              Login
            </Typography>
          </>
        )}
        {token && (
          <>
            <Typography
              variant="h6"
              component={Link}
              to="/match"
              sx={{
                textDecoration: "none",
                color: "inherit",
                fontSize: "1rem",
                alignItems: "center",
                display: "flex",
              }}
            >
              <Search />
            </Typography>
            <Typography
              variant="h6"
              onClick={() => {
                navigate("/profile");
              }}
              sx={{
                textDecoration: "none",
                color: "inherit",
                fontSize: "1rem",
                alignItems: "center",
                display: "flex",
                cursor: "pointer",
              }}
            >
              <Person />
            </Typography>
            <Typography
              variant="h6"
              onClick={() => {
                logout();
                window.location.href = "/";
              }}
              sx={{
                textDecoration: "none",
                color: "inherit",
                fontSize: "1rem",
                alignItems: "center",
                display: "flex",
                cursor: "pointer",
              }}
            >
              <Logout />
            </Typography>
          </>
        )}
      </Stack>
    </div>
  );
};

export default Navbar;
