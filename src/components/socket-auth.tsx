'use client'

import { useSocketStore } from "@/providers/socket-store-provider"
import type { Session } from "next-auth"

export const SocketAuth = ({ session }: { session: Session}) => {
    const { socket } = useSocketStore(s => s);

    if (socket) {   
        socket.on("get-auth", (callback: (userEmail: string) => {}) => {
            // console.log("Get Auth");
            console.log({ userEmail: session.user?.email, socketID: socket.id });
            callback(session.user?.email ?? "");
        })
    }
    return (<></>);
}