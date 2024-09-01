
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import CreateGroup from "./__components/create-group";

export default async function CreateNewGroup() {
  const session = await auth();

  if (!session || !session.user) {
    return redirect("/");
  }

  return <CreateGroup />
}
