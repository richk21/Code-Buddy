import {
  Modal,
  Box,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import type { ITask } from "../../types/task";
import { getToken } from "../../utils/auth";
import type { IAssignedTask } from "../../pages/Profile/Profile";
import { backendUrl } from "../../api/constants";

interface TaskModalProps {
  open: boolean;
  currentUserName?: string;
  onClose: () => void;
  mode: "assign" | "view";
  task?: IAssignedTask | null;
  assignedToUsername?: string;
  isOwner?: boolean;
  onTaskUpdated?: (task: ITask) => void;
  onTaskDeleted?: (taskId: string) => void;
}

interface FormData {
  title: string;
  description?: string;
  points?: number;
  markCompleted?: boolean;
  proof?: string;
  hoursSpent: number;
}

export default function SubmitTaskModal({
  open,
  currentUserName,
  onClose,
  mode,
  task = null,
  assignedToUsername,
  isOwner = false,
  onTaskUpdated,
  onTaskDeleted,
}: TaskModalProps) {
  const token = getToken();
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const { register, handleSubmit, reset, watch } = useForm<FormData>();

  useEffect(() => {
    if (mode === "view" && task) {
      reset({
        title: task.title,
        description: task.description,
        markCompleted: task.status === "completed",
      });
    }

    if (mode === "assign") {
      reset({
        title: "",
        description: "",
        points: 1,
      });
    }
  }, [task, mode, reset]);

  useEffect(() => {
    if (mode === "view" && task) {
      reset({
        title: task.title,
        description: task.description,
        markCompleted: task.status === "completed",
        hoursSpent: task.hoursSpent || 1,
        proof:
          task.status === "pending" ? "" : task.proof || "No proof provided",
      });
    }
  }, [mode, reset, task]);

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      if (mode === "assign") {
        const res = await axios.post(
          `${backendUrl}/api/tasks/assign`,
          {
            title: data.title,
            description: data.description,
            points: data.points,
            assignedToUsername,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        onTaskUpdated?.(res.data);
        onClose();
        return;
      }

      if (mode === "view" && task) {
        const updatedPayload: IAssignedTask = {} as IAssignedTask;

        if (
          isOwner &&
          (task.status === "pending" || task.status === "pending_approval")
        ) {
          updatedPayload.status = "pending_approval";
          updatedPayload.proof = data.proof;
          updatedPayload.hoursSpent = data.hoursSpent;
        }

        const res = await axios.patch(
          `${backendUrl}/api/tasks/complete/${task._id}`,
          updatedPayload,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        onTaskUpdated?.(res.data);
        onClose();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!task) return;

    try {
      setLoading(true);

      await axios.delete(`${backendUrl}/api/tasks/${task._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      onTaskDeleted?.(task._id);
      onClose();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!task) return;

    try {
      setLoading(true);

      await axios.post(
        `${backendUrl}/api/tasks/approve/${task._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      onClose();
      onTaskUpdated?.({} as ITask);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" sx={{ mb: 3 }}>
          {mode === "assign" ? "Assign Task" : "Task Details"}
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          {mode === "assign" && (
            <>
              <TextField
                label="Title"
                fullWidth
                sx={{ mb: 2 }}
                {...register("title", { required: true })}
              />

              <TextField
                label="Description"
                fullWidth
                multiline
                rows={3}
                sx={{ mb: 2 }}
                {...register("description")}
              />

              <TextField
                label="Points"
                type="number"
                fullWidth
                sx={{ mb: 3 }}
                {...register("points", { required: true })}
              />
            </>
          )}

          {mode === "view" && task && (
            <>
              <Typography sx={{ mb: 1 }}>
                <strong>{task.title}</strong>
              </Typography>

              <TextField
                label="Description"
                fullWidth
                multiline
                rows={2}
                sx={{ mb: 2, mt: 2 }}
                disabled
                value={task.description || "No description"}
              />

              {!(task?.status === "pending") && (
                <>
                  <TextField
                    label="Proof"
                    fullWidth
                    multiline
                    rows={2}
                    disabled={!editMode}
                    sx={{ mb: 2 }}
                    {...register("proof")}
                  />

                  <TextField
                    label="hoursSpent"
                    type="number"
                    defaultValue={1}
                    fullWidth
                    rows={2}
                    disabled={!editMode}
                    sx={{ mb: 2 }}
                    {...register("hoursSpent")}
                  />
                </>
              )}

              <Typography sx={{ mb: 2 }}>
                Status: <strong>{task.status}</strong>
              </Typography>

              <Typography sx={{ mb: 2 }}>
                Points {task?.status === "completed" ? "collected: " : ": "}
                <strong>{task.points}</strong>
              </Typography>

              {isOwner && task.status === "pending" && (
                <>
                  <FormControlLabel
                    control={<Checkbox {...register("markCompleted")} />}
                    label="Mark as Completed"
                  />

                  {watch("markCompleted") && (
                    <>
                      <TextField
                        label="Proof"
                        fullWidth
                        multiline
                        rows={2}
                        sx={{ mt: 2 }}
                        {...register("proof")}
                      />
                      <TextField
                        label="hoursSpent"
                        type="number"
                        fullWidth
                        rows={2}
                        sx={{ mt: 2 }}
                        {...register("hoursSpent")}
                      />
                    </>
                  )}
                </>
              )}
            </>
          )}

          <Stack
            direction="row"
            spacing={2}
            justifyContent="flex-end"
            sx={{ mt: 3 }}
          >
            {task?.assignedBy.username === currentUserName &&
              task?.status === "pending_approval" && (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleApprove}
                >
                  Approve
                </Button>
              )}

            {task?.assignedBy.username !== currentUserName &&
              task?.status === "pending_approval" && (
                <Button
                  variant="outlined"
                  color="success"
                  onClick={() => setEditMode(true)}
                >
                  Edit
                </Button>
              )}
            {(((task?.status === "pending" ||
              (task?.status === "pending_approval" && editMode)) &&
              isOwner) ||
              mode === "assign") && (
              <Button variant="contained" type="submit" disabled={loading}>
                {loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : mode === "assign" ? (
                  "Assign"
                ) : (
                  "Submit"
                )}
              </Button>
            )}
            {mode === "view" && !isOwner && (
              <Button
                variant="outlined"
                color="error"
                onClick={handleDelete}
                disabled={loading || (task?.status === "completed" && !isOwner)}
              >
                Delete
              </Button>
            )}
          </Stack>
        </form>
      </Box>
    </Modal>
  );
}
