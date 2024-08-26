import { redirect } from "next/navigation";

import { auth } from "@/auth";
import CreateGroupComponent from "./components/create-group";

export default async function CreateGroup() {
  const session = await auth();

  if (!session || !session.user) {
    return redirect("/");
  }

  return <CreateGroupComponent user={session.user} />;
}
