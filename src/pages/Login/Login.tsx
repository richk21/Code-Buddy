import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Stack,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../components/Layout/Layout";
import type { ILoginRequest } from "../../api/Request/LoginRequest";
import { setToken } from "../../utils/auth";
import { useState } from "react";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { backendUrl } from "../../api/constants";

export const Login = () => {
  const { control, handleSubmit } = useForm<ILoginRequest>();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: ILoginRequest) => {
    const res = await axios.post(`${backendUrl}/api/auth/login`, data);
    setToken(res.data.token);
    navigate("/dashboard");
  };

  return (
    <Layout>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Welcome Back!
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <Controller
                name="username"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField label="Username" fullWidth {...field} />
                )}
              />
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    label="Password"
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    {...field}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword((prev) => !prev)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />

              <Button type="submit" variant="contained" size="large">
                Login
              </Button>
            </Stack>
          </form>
          <Typography
            variant="body2"
            color="textSecondary"
            mt={2}
            justifyContent="center"
            alignItems="center"
            display="flex"
          >
            Don't have an account?{" "}
            <Button
              variant="text"
              onClick={() => navigate("/create")}
              size="small"
              sx={{ ml: -1.5, ":hover": { backgroundColor: "transparent" } }}
            >
              Create one
            </Button>
          </Typography>
        </CardContent>
      </Card>
    </Layout>
  );
};
