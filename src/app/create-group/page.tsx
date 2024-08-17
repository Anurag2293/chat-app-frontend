import { redirect } from "next/navigation";

import { auth } from "@/auth";
import CreateGroupComponent from "@/app/create-group/components/create-group";

export default async function CreateGroup() {
  const session = await auth();

  if (!session || !session.user) {
    return redirect("/chat");
  }

  return <CreateGroupComponent />;
}
