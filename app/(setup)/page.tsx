import { initialProfile } from "@/lib/initial-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import InitialModal from "@/components/modals/initial-modal";

const SetupPage = async () => {
  const profile = await initialProfile();

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  // If server, redirect profile to server
  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  // If no server, show a modal and allow a user to create a server
  return <InitialModal />;
};

export default SetupPage;
