"use client"

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

import PhoneIcon from "@/components/icons/phone";
import SendIcon from "@/components/icons/send";
import VideoIcon from "@/components/icons/video";

import { useSocketStore } from "@/providers/socket-store-provider";

const SelfChat = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex w-max max-w-[65%] flex-col gap-2 rounded-full px-4 py-2 text-sm ml-auto bg-primary text-primary-foreground">
            {children}
        </div>
    )
}

const OtherChat = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex w-max max-w-[65%] flex-col gap-2 rounded-full px-4 py-2 text-sm bg-muted">
            {children}
        </div>
    )
}

const chatFormSchema = z.object({
    chatMessage: z.string().min(1, {
        message: "Enter a valid room name.",
    }),
});


type ChatType = { senderID: string, text: string }

export default function ChatRoom() {
    const router = useRouter();
    const { roomID } = useParams();

    const { toast } = useToast();
    const form = useForm<z.infer<typeof chatFormSchema>>({
        resolver: zodResolver(chatFormSchema),
        defaultValues: {
            chatMessage: "",
        },
    });

    const { socket } = useSocketStore(s => s);
    const [chatHistory, setChatHistory] = useState<ChatType[]>([]);

    useEffect(() => {
        const joinSocketRoom = () => {
            if (socket) {
                console.log("Socket connection on : ", socket.id);

                socket.emit("joined-room", roomID);

                socket.on("join-message", (joinChat: ChatType) => {
                    setChatHistory(p => [...p, joinChat]);
                });

                socket.on("emit-message", (message: ChatType) => {
                    setChatHistory(p => [...p, message]);
                });
            } else {
                router.push("/");
            }
        }

        joinSocketRoom();
    }, []);

    const onSubmit = (values: z.infer<typeof chatFormSchema>) => {
        if (!socket) {
            return toast({
                variant: "destructive",
                title: "Socket connection doesn't exists!",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
        }
        socket.emit("send-message", roomID, values.chatMessage);
    }

    return (
        <>
            <div className="p-3 flex border-b items-center">
                <div className="flex items-center gap-2">
                    <Avatar className="border w-10 h-10">
                        <AvatarImage src="/placeholder-user.jpg" alt="Image" />
                        <AvatarFallback>OM</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-0.5">
                        <p className="text-sm font-medium leading-none">{roomID}</p>
                        <p className="text-xs text-muted-foreground">Active 2h ago</p>
                    </div>
                </div>
                <div className="flex items-center gap-1 ml-auto">
                    <Button variant="ghost" size="icon">
                        <span className="sr-only">Call</span>
                        <PhoneIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <span className="sr-only">Video call</span>
                        <VideoIcon className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            <div className="grid gap-4 p-3">
                {chatHistory.map((chat) => {
                    if (chat.senderID === socket?.id) {
                        return <SelfChat>{chat.senderID}: {chat.text}</SelfChat>
                    }
                    return <OtherChat>{chat.senderID}: {chat.text}</OtherChat>
                })}
            </div>
            <div className="border-t">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full items-center space-x-2 p-3">
                        <FormField
                            control={form.control}
                            name="chatMessage"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormControl autoFocus>
                                        <Input placeholder="Type your message..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" size="icon">
                            <span className="sr-only">Send</span>
                            <SendIcon className="h-4 w-4" />
                        </Button>
                    </form>
                </Form>
            </div>
        </>
    )
}
