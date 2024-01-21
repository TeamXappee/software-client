import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserData } from "../../../../auth";

export function UserAvatar({ user }: { user: UserData }) {
  if (!user)
    return (
      <Avatar className="w-8 h-8">
        <AvatarFallback className="text-sm">UN</AvatarFallback>
      </Avatar>
    );
  return (
    <Avatar className="w-8 h-8">
      <AvatarImage src={user.image || ""} alt={user.name || ""} />
      <AvatarFallback className="text-sm bg-blue-500 hover:bg-blue-600 text-white">
        {user.name && user.name.slice(0, 2)}
      </AvatarFallback>
    </Avatar>
  );
}
