import { TUser } from "@/auth";
import UserAvatar from "@/components/shared/userAvatar";

export function AvatarMenuTrigger({
  user,
  sideBarMin,
}: {
  user: TUser;
  sideBarMin: boolean;
}) {
  if (!user) return;
  return (
    <div
      className={`flex items-center  gap-2 bg-muted shadow-lg  hover:bg-muted-hovered  rounded-lg cursor-pointer ${
        sideBarMin ? "p-0" : "p-2 w-full"
      }`}
    >
      <UserAvatar user={user} />
      {!sideBarMin && (
        <p className="font-meidum text-sm">
          {user?.name?.length! > 15
            ? `${user?.name?.slice(0, 12)}..`
            : user?.name}
        </p>
      )}
    </div>
  );
}
