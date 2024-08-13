
"use client"

import { useEffect } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

import PhoneIcon from "@/components/icons/phone"
import SendIcon from "@/components/icons/send"
import PlusIcon from "@/components/icons/plus"
import VideoIcon from "@/components/icons/video"

import { useSocketStore } from "@/providers/socket-store-provider";

const chatContacts = [
    {
        avatarFallback: "OM",
        name: "Sofia Davis",
        lastMessage: "hey what's going on?",
        lastMessageDuration: "2h",
        active: true,
    },
    {
        avatarFallback: "AJ",
        name: "Alex Johnson",
        lastMessage: "Just finished a great book! 📚",
        lastMessageDuration: "45m",
        active: false,
    },
    {
        avatarFallback: "MG",
        name: "Maria Gonzalez",
        lastMessage: "Excited for the weekend!",
        lastMessageDuration: "1h",
        active: false,
    },
    {
        avatarFallback: "KB",
        name: "Kevin Brown",
        lastMessage: "Who's up for a movie night?",
        lastMessageDuration: "3h",
        active: false,
    },
    {
        avatarFallback: "LW",
        name: "Lily White",
        lastMessage: "Morning coffee is the best! ☕",
        lastMessageDuration: "30m",
        active: false,
    },
];


export default function ChatRoom() {
    const { socket, setSocket } = useSocketStore(s => s);

    useEffect(() => {
        if (socket) {
            console.log("Socket connection on : ", socket.id);
        }
    }, [])

    return (
        <div className="grid grid-cols-3 md:grid-cols-4 w-full overflow-hidden">
            <div className="bg-muted/20 p-3 border-r hidden md:block">
                <div className="flex items-center justify-between space-x-4">
                    <div className="font-medium text-sm">Chats</div>
                    <Button variant="ghost" size="icon" className="rounded-full w-8 h-8">
                        <PlusIcon className="h-4 w-4" />
                        <span className="sr-only">New chat</span>
                    </Button>
                </div>
                <div className="py-4">
                    <form>
                        <Input placeholder="Search" className="h-8" />
                    </form>
                </div>
                <div className="grid gap-2">
                    {chatContacts.map((contact, index) => <Link 
                        href="#" 
                        className={`flex items-center gap-4 p-2 rounded-lg hover:bg-muted/50 ${contact.active && 'bg-muted'}`} 
                        prefetch={false}
                        key={index}
                    >
                        <Avatar className="border w-10 h-10">
                            <AvatarImage src="/placeholder-user.jpg" alt="Image" />
                            <AvatarFallback>{contact.avatarFallback}</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-0.5">
                            <p className="text-sm font-medium leading-none">{contact.name}</p>
                            <p className="text-xs text-muted-foreground">{contact.lastMessage} &middot; {contact.lastMessageDuration}</p>
                        </div>
                    </Link>)}
                </div>
            </div>
            <div className="min-h-screen col-span-3 flex flex-col justify-between">
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
                    <div className="flex w-max max-w-[65%] flex-col gap-2 rounded-full px-4 py-2 text-sm ml-auto bg-primary text-primary-foreground">
                        Hey hope you&apos;re doing well! We should catch up sometime soon. 🙏
                    </div>
                    <div className="flex w-max max-w-[65%] flex-col gap-2 rounded-full px-4 py-2 text-sm bg-muted">
                        Sure! I&apos;m free this weekend if you want to grab a coffee.
                    </div>
                    <div className="flex w-max max-w-[65%] flex-col gap-2 rounded-xl overflow-hidden text-sm ml-auto">
                        <img
                            src="/placeholder.svg"
                            alt="photo"
                            width={200}
                            height={150}
                            className="object-cover"
                            style={{ aspectRatio: "200/150", objectFit: "cover" }}
                        />
                    </div>
                    <div className="flex w-max max-w-[65%] flex-col gap-2 rounded-full px-4 py-2 text-sm ml-auto bg-primary text-primary-foreground">
                        Sounds good! Let&apos;s meet at the Starbucks on 5th Ave.
                    </div>
                    <div className="flex w-max max-w-[65%] flex-col gap-2 rounded-full px-4 py-2 text-sm bg-muted">
                        I&apos;ll message you on Saturday.
                    </div>
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
            </div>
        </div>
    )
}
