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
import type { ISignupRequest } from "../../api/Request/SignupRequest";
import { setToken } from "../../utils/auth";
import { MenuItem } from "@mui/material";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { backendUrl } from "../../api/constants";

const CreateProfile = () => {
  const { control, handleSubmit } = useForm<ISignupRequest>();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: ISignupRequest) => {
    const res = await axios.post(`${backendUrl}/api/auth/register`, data);
    setToken(res.data.token);
    navigate("/");
  };

  return (
    <Layout>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Create Your Profile
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
                name="skillLevel"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField select label="Skill Level" fullWidth {...field}>
                    <MenuItem value="Beginner">Beginner</MenuItem>
                    <MenuItem value="Intermediate">Intermediate</MenuItem>
                    <MenuItem value="Advanced">Advanced</MenuItem>
                  </TextField>
                )}
              />

              <Controller
                name="focusArea"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField select label="Focus Area" fullWidth {...field}>
                    <MenuItem value="Frontend">Frontend</MenuItem>
                    <MenuItem value="Backend">Backend</MenuItem>
                    <MenuItem value="Fullstack">Fullstack</MenuItem>
                    <MenuItem value="Data Structures">Data Structures</MenuItem>
                    <MenuItem value="System Design">System Design</MenuItem>
                    <MenuItem value="DevOps">DevOps</MenuItem>
                  </TextField>
                )}
              />

              <Controller
                name="weeklyGoal"
                control={control}
                defaultValue={1}
                render={({ field }) => (
                  <TextField
                    label="Weekly Goal (hours)"
                    type="number"
                    fullWidth
                    {...field}
                  />
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
                Create Profile
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
            Already have an account?{" "}
            <Button
              variant="text"
              onClick={() => navigate("/login")}
              size="small"
              sx={{ ml: -1.5, ":hover": { backgroundColor: "transparent" } }}
            >
              Log In
            </Button>
          </Typography>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default CreateProfile;
