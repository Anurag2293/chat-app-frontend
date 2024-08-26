import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function JoinRoom() {
    const session = await auth();
    if (!session || !session) {
        
    }

    return (
        <></>
    )

}