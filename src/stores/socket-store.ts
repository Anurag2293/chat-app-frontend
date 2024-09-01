import type { Socket } from "socket.io-client";
import { createStore } from "zustand";

import { ChatMessages } from "@/types/socket";

export type SocketState = {
  socket: Socket | null;
  messages: ChatMessages;
};

export type SocketActions = {
  setSocket: (newSocket: Socket) => void;
  setMessages: (newMessages: ChatMessages) => void;
};

export type SocketStore = SocketState & SocketActions;

export const initSocketStore = (): SocketState => {
  return { socket: null, messages: new Map() };
};

export const defaultSocketInitState: SocketState = {
  socket: null,
  messages: new Map(),
};

export const createSocketStore = (
  initState: SocketState = defaultSocketInitState
) => {
  return createStore<SocketStore>()((set) => {
    return {
      ...initState,

      setSocket: (newSocket) => {
        set((state) => ({
          ...state,
          socket: newSocket,
        }));
      },

      setMessages: (newMessages) => {
        set((state) => ({
          ...state,
          messages: newMessages
        }));
      }
    };
  });
};
