import { TUser } from "@/auth";
import { UserSideBarMenu } from "./menu";
import { LoginModal } from "@/components/modals/loginModal";

export default function User({
  user,
  handleSideBarMin,
  sideBarMin,
}: {
  user: TUser;
  handleSideBarMin: () => void;
  sideBarMin: boolean;
}) {
  return (
    <>
      {user ? (
        <UserSideBarMenu sideBarMin={sideBarMin} handleSideBarMin={handleSideBarMin} user={user} />
      ) : (
        <LoginModal />
      )}
    </>
  );
}
