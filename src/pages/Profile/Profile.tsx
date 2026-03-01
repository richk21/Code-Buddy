/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Avatar,
  Card,
  CardContent,
  Typography,
  Stack,
  Tabs,
  Tab,
  Box,
  Modal,
  Button,
  CircularProgress,
} from "@mui/material";
import { Layout } from "../../components/Layout/Layout";
import { getToken } from "../../utils/auth";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import SubmitTaskModal from "../../components/SubmitTaskModal/SubmitTaskModal";
import type { User } from "../../types/user";
import { backendUrl } from "../../api/constants";

export interface IAssignedTask {
  _id: string;
  title: string;
  description?: string;
  proof?: string;
  points: number;
  hoursSpent: number;
  status: "pending" | "completed" | "pending_approval";
  assignedBy: { username: string };
}
const Profile = () => {
  const { username } = useParams();
  const token = getToken();
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<IAssignedTask[]>([]);
  const [tab, setTab] = useState<
    "all" | "pending" | "completed" | "pending_approval"
  >("all");
  const [isOwnProfile, setIsOwnProfile] = useState(true);
  const [notConnected, setNotConnected] = useState(false);
  const [buddiesModalOpen, setBuddiesModalOpen] = useState(false);
  const [userBuddies, setUserBuddies] = useState<
    { username: string; avatar: string }[]
  >([]);
  const [selectedTask, setSelectedTask] = useState<IAssignedTask | null>(null);
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [loading, setLoading] = useState(false);

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

      const viewingOwnProfile = !username || username === loggedInUser.username;

      setIsOwnProfile(viewingOwnProfile);

      if (viewingOwnProfile) {
        setUser(loggedInUser);

        const tasksRes = await axios.get(`${backendUrl}/api/tasks/myTasks`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userBuddiesRes = await axios.get(
          `${backendUrl}/api/buddies/buddiesList`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        setUserBuddies(userBuddiesRes.data);
        setTasks(tasksRes.data);
      } else {
        const buddyRes = await axios.get(
          `${backendUrl}/api/auth/users/${username}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        setUser(buddyRes.data);

        const tasksRes = await axios.get(
          `${backendUrl}/api/tasks/between/${username}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        setTasks(tasksRes.data);
        setNotConnected(false);
      }
    } catch (err: any) {
      console.error(err);
      if (err.response?.status === 403) {
        setNotConnected(true);
        setTasks([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredTasks =
    tab === "all" ? tasks : tasks.filter((t) => t.status === tab);
  if (!user || loading)
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
      <Stack spacing={3} sx={{ mb: 4 }}>
        <Card
          sx={{
            display: "flex",
            alignItems: "center",
            padding: 2,
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Avatar
                src={user.avatar}
                sx={{
                  width: 80,
                  height: 80,
                  marginRight: 3,
                  backgroundColor: "primary.main",
                }}
              />
              <Typography variant="h5">{user.username}</Typography>
            </Box>
            <Stack direction="row" spacing={2}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: 2,
                }}
              >
                <Typography variant="h6">Focus Area</Typography>
                <Typography>{user.focusArea}</Typography>
              </Card>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: 2,
                }}
              >
                <Typography variant="h6">Weekly Goal</Typography>
                <Typography>{user.weeklyGoal} hrs</Typography>
              </Card>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: 2,
                  cursor: isOwnProfile ? "pointer" : "auto",
                }}
                onClick={() => isOwnProfile && setBuddiesModalOpen(true)}
              >
                <Typography variant="h6">Buddies</Typography>
                <Typography>{user.buddies.length}</Typography>
              </Card>
            </Stack>
          </Stack>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {isOwnProfile ? (
                "My Tasks"
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  Tasks with {user.username}
                  <Button
                    variant="contained"
                    sx={{ mt: 2, display: "block", marginLeft: "auto" }}
                    onClick={() => {
                      setSelectedTask(null);
                      setOpenTaskModal(true);
                    }}
                  >
                    Assign Task
                  </Button>
                </Box>
              )}
            </Typography>
            {!isOwnProfile && notConnected ? (
              <Typography>
                You are not connected with {user.username}
              </Typography>
            ) : (
              <>
                <Tabs
                  value={tab}
                  onChange={(_, value) => setTab(value)}
                  textColor="primary"
                  indicatorColor="primary"
                >
                  <Tab label="All" value="all" />
                  <Tab label="Pending" value="pending" />
                  <Tab label="Completed" value="completed" />
                  {isOwnProfile && (
                    <Tab label="Pending Approval" value="pending_approval" />
                  )}
                </Tabs>

                <Stack spacing={2} mt={2}>
                  {filteredTasks.length === 0 && (
                    <Typography>No tasks in this category.</Typography>
                  )}
                  {filteredTasks.map((task) => (
                    <Card
                      key={task._id}
                      variant="outlined"
                      onClick={() => {
                        setSelectedTask(task);
                        setOpenTaskModal(true);
                      }}
                      sx={{ cursor: "pointer", mb: 2 }}
                    >
                      <CardContent>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: "700" }}
                        >
                          {task.title}
                        </Typography>
                        <Typography variant="body2">
                          Assigned by: {task.assignedBy.username} | Points:{" "}
                          {task.points} | Status: {task.status}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
                </Stack>
              </>
            )}
          </CardContent>
        </Card>
      </Stack>
      {buddiesModalOpen && (
        <Modal
          open={buddiesModalOpen}
          onClose={() => setBuddiesModalOpen(false)}
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 600,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              My Buddies
            </Typography>
            {userBuddies.map((buddy: { username: string; avatar: string }) => (
              <Card
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: 1,
                  mb: 1,
                }}
                key={buddy.username}
              >
                <Avatar
                  src={buddy.avatar}
                  sx={{
                    width: 50,
                    height: 50,
                    marginRight: 3,
                    backgroundColor: "primary.main",
                  }}
                />
                <Typography
                  key={buddy.username}
                  component={Link}
                  to={`/profile/${buddy.username}`}
                  sx={{
                    color: "inherit",
                  }}
                >
                  {buddy.username}
                </Typography>
              </Card>
            ))}
          </Box>
        </Modal>
      )}
      <SubmitTaskModal
        currentUserName={user.username}
        open={openTaskModal}
        onClose={() => setOpenTaskModal(false)}
        mode={selectedTask ? "view" : "assign"}
        task={selectedTask}
        assignedToUsername={username}
        isOwner={isOwnProfile}
        onTaskUpdated={() => {
          fetchData();
        }}
        onTaskDeleted={(taskId) =>
          setTasks((prev) => prev.filter((t) => t._id !== taskId))
        }
      />
    </Layout>
  );
};

export default Profile;
