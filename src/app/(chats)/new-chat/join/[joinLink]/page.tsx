import { auth } from "@/auth";

import Navbar from "@/components/navbar";
import JoinRoomCard from "./__components/join-room";

type JoinRoomProps = {
    params: {
        joinLink: string
    }
}

export default async function JoinRoom(props: JoinRoomProps) {
    const session = await auth();

    return (
        <div className="h-screen flex flex-col">
            <Navbar session={session}  />
            <JoinRoomCard joinLink={props.params.joinLink} />
        </div>
    )

}