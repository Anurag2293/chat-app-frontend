
"use client"

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import PhoneIcon from "@/components/icons/phone";
import SendIcon from "@/components/icons/send";
import VideoIcon from "@/components/icons/video";

import { useSocketStore } from "@/providers/socket-store-provider";

const SelfChat = ({ children }: { children: React.ReactNode}) => {
    return (
        <div className="flex w-max max-w-[65%] flex-col gap-2 rounded-full px-4 py-2 text-sm ml-auto bg-primary text-primary-foreground">
            {children}
        </div>
    )
}

const OtherChat = ({ children }: { children: React.ReactNode}) => {
    return (
        <div className="flex w-max max-w-[65%] flex-col gap-2 rounded-full px-4 py-2 text-sm bg-muted">
            {children}
        </div>
    )
}

type ChatType = { senderID: string, text: string }

// const chatHistory: ChatType[] = []

export default function ChatRoom() {
    const router = useRouter();
    const { roomID } = useParams();
    const { socket } = useSocketStore(s => s);
    const [chatHistory, setChatHistory] = useState<ChatType[]>([]);

    useEffect(() => {
        if (socket) {
            console.log("Socket connection on : ", socket.id);

            socket.emit("joined-room", roomID);

            socket.on("join-message", (joinChat: ChatType) => {
                setChatHistory(p => [...p, joinChat]);
            })
        } else {
            router.push("/"); 
        }
    }, []);

    return (
        <>
            <div className="p-3 flex border-b items-center">
                <div className="flex items-center gap-2">
                    <Avatar className="border w-10 h-10">
                        <AvatarImage src="/placeholder-user.jpg" alt="Image" />
                        <AvatarFallback>OM</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-0.5">
                        <p className="text-sm font-medium leading-none">Sofia Davis: {socket?.id}</p>
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
                {/* <SelfChat>
                    Hey hope you&apos;re doing well! We should catch up sometime soon. 🙏
                </SelfChat>
                <OtherChat>
                    Sure! I&apos;m free this weekend if you want to grab a coffee.
                </OtherChat>
                <SelfChat>
                    Sounds good! Let&apos;s meet at the Starbucks on 5th Ave.
                </SelfChat>
                <OtherChat>
                    I&apos;ll message you on Saturday.
                </OtherChat> */}
            </div>
            <div className="border-t">
                <form className="flex w-full items-center space-x-2 p-3">
                    <Input id="message" placeholder="Type your message..." className="flex-1" autoComplete="off" />
                    <Button type="submit" size="icon">
                        <span className="sr-only">Send</span>
                        <SendIcon className="h-4 w-4" />
                    </Button>
                </form>
            </div>
        </>
    )
}
