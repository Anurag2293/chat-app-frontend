'use client'

import { useEffect } from "react";
import type { Session } from "next-auth";
import { io } from "socket.io-client";

import { useSocketStore } from "@/providers/socket-store-provider";

export const SocketAuth = (props: { session: Session }) => {
    const { socket, setSocket } = useSocketStore(s => s);

    useEffect(() => {
        const initializeSocket = () => {
            const newSocket = io("http://localhost:8080", {
                auth: {
                    email: props.session.user?.email
                }
            });
            setSocket(newSocket);
        }
        initializeSocket();
    }, [setSocket, props.session.user?.email]);

    if (socket) {
        socket.on("connect", () => {
            console.log("Connected to server: ", socket.id);
        });

        socket.on("disconnect", () => {
            console.log("Disconnected to server: ", socket.id);
        });
    }

    return (<></>);
}