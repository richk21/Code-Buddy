export interface ITask {
  _id: string;
  title: string;
  description?: string;
  points: number;
  assignedBy: string;
  assignedTo: string;
  status: "pending" | "completed" | "pending_approval";
  createdAt: Date;
  completedAt?: Date;
  proof?: string;
  hoursSpent?: number;
}
