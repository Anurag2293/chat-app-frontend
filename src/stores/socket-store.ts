import { Message } from "@prisma/client";
import { type Socket } from "socket.io-client";
import { createStore } from "zustand";
export type SocketState = {
  socket: Socket | null;
  messages: Message[];
};

export type SocketActions = {
  setSocket: (newSocket: Socket) => void;
};

export type SocketStore = SocketState & SocketActions;

export const initSocketStore = (): SocketState => {
  return { socket: null, messages: [] };
};

export const defaultSocketInitState: SocketState = {
  socket: null,
  messages: [],
};

export const createSocketStore = (
  initState: SocketState = defaultSocketInitState
) => {
  return createStore<SocketStore>()((set) => {
    return {
      ...initState,

      setSocket: (newSocket: Socket) => {
        set((state) => ({
          ...state,
          socket: newSocket,
        }));
      },
    };
  });
};
