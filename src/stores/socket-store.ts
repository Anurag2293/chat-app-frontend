import type { Socket } from "socket.io-client";
import { createStore } from "zustand";
import { io } from "socket.io-client";
import { useRouter } from "next/navigation";

import { ChatType } from "@/types/socketTypes";

import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

export type SocketState = {
  socket: Socket | null;
  messages: ChatType[];
};

export type SocketActions = {
  setSocket: (newSocket: Socket) => void;
  joinSocketRoom: (roomID: string) => void;
  confirmJoinRoom: (roomID: string) => void;
  sendMessageToRoom: (roomID: string, chatMessage: string) => void;
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
  initState: SocketState = defaultSocketInitState,
) => {
  return createStore<SocketStore>()((set) => {
    const socket = io("http://localhost:8080");
    const { toast } = useToast();
    const router = useRouter();

    socket.on("connect", () => {
      console.log("Connected to server: ", socket.id);
      return toast({
        description: "Connected to server: " + socket.id,
      });
    });

    socket.on("disconnect", () => {
      console.log("Disconnected to server: ", socket.id);
      return toast({
        variant: "destructive",
        description: "Disconnected from server.",
        // action: <ToastAction altText="Try again">{"Try again"}</ToastAction>
      });
    });

    socket.on("join-message", (joinMessage: ChatType) => {
      set((state) => ({
        ...state,
        messages: [...state.messages, joinMessage],
      }));
    });

    socket.on("emit-message", (message: ChatType) => {
      set((state) => ({
        ...state,
        messages: [...state.messages, message],
      }));
    });

    return {
      ...initState,
      socket,

      setSocket: (newSocket: Socket) => {
        set((state) => ({
          ...state,
          socket: newSocket,
        }));
      },

      joinSocketRoom: (roomID: string) => {
        if (!socket) {
          return toast({
            variant: "destructive",
            title: "Socket connection doesn't exists",
            // action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        }
        socket.emit("join", roomID, (error: string) => {
          if (error) {
            return toast({
              variant: "destructive",
              title: "Error joining room!",
              description: error,
            });
          }
          router.push(`/chat/${roomID}`);
          socket.emit("joined-room", roomID);
          toast({
            description: "Joined room successfully!",
          });
        });
      },

      confirmJoinRoom: (roomID: string) => {
        socket.emit("joined-room", roomID);
      },

      sendMessageToRoom: (roomID: string, chatMessage: string) => {
        if (chatMessage.trim().length === 0) {
          return;
        }
        if (!socket) {
          return toast({
            variant: "destructive",
            title: "Socket connection doesn't exists!",
          });
        }
        socket.emit("send-message", roomID, chatMessage);
      },
    };
  });
};
