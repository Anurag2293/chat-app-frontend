import { useRouter } from "next/navigation";
import { Message } from "@prisma/client";
import { io, type Socket } from "socket.io-client";
import { createStore } from "zustand";

import { useToast } from "@/components/ui/use-toast";

export type SocketState = {
  socket: Socket | null;
  messages: Message[];
};

export type SocketActions = {
  setSocket: (newSocket: Socket) => void;
  // joinSocketRoom: (roomID: string) => void;
  // confirmJoinRoom: (roomID: string) => void;
  // sendMessageToRoom: (roomID: string, chatMessage: string) => void;
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
  const socket = io("http://localhost:8080", {
    auth: {
      email: ""
    }
  });
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
    });
  });

  return createStore<SocketStore>()((set) => {
    socket.on("emit-message", (message: Message) => {
      console.log("Emit Message!");
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
    };
  });
};

/*
joinSocketRoom: (roomID: string) => {
  if (!socket) {
    return toast({
      variant: "destructive",
      title: "Socket connection doesn't exists",
    });
  }
  socket.emit("join-room", roomID, (error: string) => {
    if (error) {
      return toast({
        variant: "destructive",
        title: "Error joining room!",
        description: error,
      });
    }
    // router.push(`/chat/${roomID}`);
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
*/