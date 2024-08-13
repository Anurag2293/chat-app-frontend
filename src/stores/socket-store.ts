
import type { Socket } from "socket.io-client";
import { createStore } from "zustand";

export type SocketState = {
    socket: Socket | null 
}

export type SocketActions = {
    setSocket: (newSocket: Socket) => void
}

export type SocketStore = SocketState & SocketActions;

export const initSocketStore = (): SocketState => {
    return { socket: null }
}

export const defaultSocketInitState: SocketState = {
    socket: null
}

export const createSocketStore = (
    initState: SocketState = defaultSocketInitState
) => {
    return createStore<SocketStore>()((set) => ({
        ...initState,
        setSocket: (newSocket: Socket) => {
            set((state) => ({
                socket: newSocket
            }));
        }
    }))
}