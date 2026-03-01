import {
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Grid,
} from "@mui/material";
import { Layout } from "../../components/Layout/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import type { User } from "../../types/user";
import { backendUrl } from "../../api/constants";

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (!username) {
      navigate("/");
      return;
    }

    axios
      .get(`${backendUrl}/api/users/${username}`)
      .then((res) => setUser(res.data));
  }, [navigate, username]);

  if (!user) return <Layout>Loading...</Layout>;

  return (
    <Layout>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Welcome, {user.username}
          </Typography>

          <Grid container spacing={2} mt={1}>
            <Grid size={6}>
              <Chip label={`Skill: ${user.skillLevel}`} />
            </Grid>
            <Grid size={6}>
              <Chip label={`Focus: ${user.focusArea}`} />
            </Grid>
            <Grid size={6}>
              <Chip label={`Weekly Goal: ${user.weeklyGoal}`} />
            </Grid>
            <Grid size={6}>
              <Chip label={`🔥 Streak: ${user.streak}`} />
            </Grid>
          </Grid>

          <div style={{ marginTop: 24 }}>
            {user.buddies ? (
              <Typography variant="h6">Your Buddies: {user.buddies}</Typography>
            ) : (
              <Button variant="contained" onClick={() => navigate("/find")}>
                Find Buddy
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Dashboard;
