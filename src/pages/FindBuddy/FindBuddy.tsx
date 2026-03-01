import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  CircularProgress,
  Avatar,
} from "@mui/material";
import { Layout } from "../../components/Layout/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../../utils/auth";
import type { User } from "../../types/user";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../../api/constants";

const FindBuddy = () => {
  const navigate = useNavigate();
  const [matches, setMatches] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const token = getToken();

  const fetchMatches = async () => {
    try {
      const currentUser = await axios.get(
        `${backendUrl}/api/auth/loggedInUser`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const { focusArea, skillLevel } = currentUser.data;

      const res = await axios.get(`${backendUrl}/api/buddies/match`, {
        params: { focusArea, skillLevel },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMatches(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchMatches();
  }, []);

  const connect = async (buddyUsername: string) => {
    setLoading(true);
    try {
      await axios.post(
        `${backendUrl}/api/buddies/connect`,
        { buddyUsername },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      fetchMatches();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Typography variant="h4" mb={3}>
        Find a Buddy
      </Typography>

      <Stack spacing={3} sx={{ mb: 4 }}>
        {matches.map((user) => (
          <Card key={user._id}>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar
                  src={user.avatar}
                  sx={{
                    width: 80,
                    height: 80,
                    marginRight: 3,
                    backgroundColor: "primary.main",
                  }}
                />
                <Stack>
                  <Typography
                    variant="h6"
                    sx={{
                      cursor: "pointer",
                      "&:hover": { textDecoration: "underline" },
                    }}
                    onClick={() => navigate(`/profile/${user.username}`)}
                  >
                    {user.username}
                  </Typography>
                  <Typography>
                    {user.skillLevel} • {user.focusArea}
                  </Typography>
                </Stack>
              </Stack>

              <Button
                variant="contained"
                sx={{ mt: 2, display: "block", marginLeft: "auto" }}
                onClick={() => connect(user.username)}
              >
                {loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  "Connect"
                )}
              </Button>
            </CardContent>
          </Card>
        ))}

        {matches.length === 0 && (
          <Typography>No available buddies right now.</Typography>
        )}
      </Stack>
    </Layout>
  );
};

export default FindBuddy;
