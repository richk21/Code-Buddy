import type { User } from "../../types/user";

interface Props {
  user: User;
}

const ProfileCard = ({ user }: Props) => {
  return (
    <div className="border rounded p-4 shadow-md">
      <h3 className="text-xl font-bold">{user.username}</h3>
      <p>Skill: {user.skillLevel}</p>
      <p>Focus: {user.focusArea}</p>
      <p>Weekly Goal: {user.weeklyGoal}</p>
      <p>Available: {user.availability?.join(", ")}</p>
      <p>Preferred Time: {user.preferredTime}</p>
      <p>🔥 Streak: {user.streak}</p>
    </div>
  );
};

export default ProfileCard;
