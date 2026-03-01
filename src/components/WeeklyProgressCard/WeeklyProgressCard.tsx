import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Stack,
} from "@mui/material";

interface WeeklyProgressCardProps {
  weeklyHours: number;
  weeklyGoal: number;
}

const WeeklyProgressCard = ({
  weeklyHours,
  weeklyGoal,
}: WeeklyProgressCardProps) => {
  const safeGoal = weeklyGoal || 0;

  const percentage = safeGoal > 0 ? (weeklyHours / safeGoal) * 100 : 0;

  const progress = Math.min(percentage, 100);
  const exceeded = weeklyHours > safeGoal;
  const extraHours = exceeded ? weeklyHours - safeGoal : 0;
  const remaining = safeGoal > 0 ? Math.max(safeGoal - weeklyHours, 0) : 0;

  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 3,
        mt: 4,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight="bold" mb={3}>
          Weekly Progress
        </Typography>

        <Stack alignItems="center" spacing={2}>
          <Box position="relative" display="inline-flex">
            <CircularProgress
              variant="determinate"
              value={progress}
              size={130}
              thickness={5}
              color={exceeded ? "success" : "primary"}
            />

            <Box
              position="absolute"
              top={0}
              left={0}
              bottom={0}
              right={0}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="h5" fontWeight="bold">
                {weeklyHours}h
              </Typography>
            </Box>
          </Box>

          <Typography variant="body1">Goal: {safeGoal}h</Typography>

          {safeGoal === 0 ? (
            <Typography color="text.secondary">
              Set a weekly goal to track progress.
            </Typography>
          ) : exceeded ? (
            <Typography color="success.main" fontWeight="bold">
              +{extraHours} hours beyond goal!
            </Typography>
          ) : (
            <Typography color="text.secondary">
              {remaining} hours left to hit your goal
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default WeeklyProgressCard;
