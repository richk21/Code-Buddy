import {
  Typography,
  Stack,
  Button,
  Box,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import { Layout } from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
import { getToken } from "../../utils/auth";
import axios from "axios";
import { useEffect, useState } from "react";
import type { User } from "../../types/user";
import WeeklyProgressCard from "../../components/WeeklyProgressCard/WeeklyProgressCard";
import { backendUrl } from "../../api/constants";

const Home = () => {
  const token = getToken();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [points, setPoints] = useState(0);
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [tasksAssigned, setTasksAssigned] = useState(0);
  const [tasksPendingApproval, setTasksPendingApproval] = useState(0);
  const [weeklyHours, setWeeklyHours] = useState(0);
  const [weeklyGoal, setWeeklyGoal] = useState(10);

  const fetchData = async () => {
    try {
      setLoading(true);
      const loggedInRes = await axios.get(
        `${backendUrl}/api/auth/loggedInUser`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const loggedInUser = loggedInRes.data;
      setUser(loggedInUser);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${backendUrl}/api/tasks/getDashboardData`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const dashboardData = res.data;
      setPoints(dashboardData.points);
      setTasksCompleted(dashboardData.tasksCompleted);
      setTasksAssigned(dashboardData.tasksAssigned);
      setTasksPendingApproval(dashboardData.tasksPendingApproval);
      setWeeklyHours(dashboardData.hoursSpent);
      setWeeklyGoal(dashboardData.goalHours);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (token) {
      fetchData();
      fetchDashboardData();
    }
  }, []);

  if (loading)
    return (
      <CircularProgress
        size={50}
        color="inherit"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    );

  return (
    <Layout>
      {!token ? (
        <Box sx={{ py: 8 }}>
          <Stack
            spacing={4}
            alignItems="center"
            textAlign="center"
            sx={{ mb: 10 }}
          >
            <Typography variant="h2" fontWeight="bold">
              Find Your Perfect Code Buddy
            </Typography>

            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 600 }}
            >
              Stay consistent, stay accountable, and grow faster. Assign tasks,
              track progress, and level up together.
            </Typography>

            <Stack direction="row" spacing={3}>
              <Button
                variant="contained"
                size="large"
                component={Link}
                to="/create"
              >
                Get Started
              </Button>

              <Button
                variant="outlined"
                size="large"
                component={Link}
                to="/login"
              >
                Login
              </Button>
            </Stack>
          </Stack>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 4,
            }}
          >
            <Box>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Connect with Buddies
                  </Typography>
                  <Typography color="text.secondary">
                    Find like-minded developers and build long-term coding
                    accountability partnerships.
                  </Typography>
                </CardContent>
              </Card>
            </Box>

            <Box>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Assign & Track Tasks
                  </Typography>
                  <Typography color="text.secondary">
                    Assign coding challenges, submit proof, and approve
                    completed work to stay productive.
                  </Typography>
                </CardContent>
              </Card>
            </Box>

            <Box>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Stay Consistent
                  </Typography>
                  <Typography color="text.secondary">
                    Build daily momentum and maintain streaks with structured
                    accountability.
                  </Typography>
                </CardContent>
              </Card>
            </Box>

            <Box>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Earn Points & Grow
                  </Typography>
                  <Typography color="text.secondary">
                    Collect points for completed tasks and measure your growth
                    over time.
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
            Welcome back, {user?.username}!
          </Typography>
          <Typography variant="body1">
            Review your tasks, submit progress, and level up with your code
            buddy.
          </Typography>
          <WeeklyProgressCard
            weeklyHours={weeklyHours}
            weeklyGoal={weeklyGoal}
          />
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 4,
              mt: 4,
              mb: 4,
            }}
          >
            <Box>
              <Card
                sx={{
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    Points earned
                  </Typography>
                  <Typography
                    variant="h2"
                    sx={{ width: "100%", textAlign: "center" }}
                  >
                    {points}
                  </Typography>
                </CardContent>
              </Card>
            </Box>

            <Box>
              <Card
                sx={{
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    Tasks completed
                  </Typography>
                  <Typography
                    variant="h2"
                    sx={{ width: "100%", textAlign: "center" }}
                  >
                    {tasksCompleted}
                  </Typography>
                </CardContent>
              </Card>
            </Box>

            <Box>
              <Card
                sx={{
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    Tasks assigned to buddies
                  </Typography>
                  <Typography
                    variant="h2"
                    sx={{ width: "100%", textAlign: "center" }}
                  >
                    {tasksAssigned}
                  </Typography>
                </CardContent>
              </Card>
            </Box>

            <Box>
              <Card
                sx={{
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    Tasks pending approval
                  </Typography>
                  <Typography
                    variant="h2"
                    sx={{ width: "100%", textAlign: "center" }}
                  >
                    {tasksPendingApproval}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Box>
      )}
    </Layout>
  );
};

export default Home;
