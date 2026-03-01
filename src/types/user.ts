import type { ITask } from "./task";

export interface User {
  _id: string;
  username: string;
  avatar: string;
  skillLevel: string;
  focusArea: string;
  weeklyGoal: string;
  streak: number;
  buddies: string[];
  tasksAssigned: ITask[];
  tasksReceived: ITask[];
}
