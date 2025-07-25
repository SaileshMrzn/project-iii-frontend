// "use server";

import { auth } from "@/auth";
import { UserAvatar, UserAvatarMobile } from "./UserAvatar";

export default async function UserAvatarServer() {
  const session = await auth();

  if (!session?.user) return null;

  return (
    <div>
      <div className="hidden md:block">
        <UserAvatar session={session} />
      </div>

      <div className="md:hidden">
        <UserAvatarMobile session={session} />
      </div>
    </div>
  );
}
