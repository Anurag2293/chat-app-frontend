'use client'

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { Search, MessageSquarePlus, EllipsisVertical, AlertCircle } from "lucide-react";

import { getUserRooms } from "@/api/room";
import { getAvatarFallback } from "@/lib/chat-room";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Alert,
	AlertDescription,
	AlertTitle,
} from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";

import { UserMenu } from "./user-menu";

export default function UserContacts() {
	const { roomID } = useParams();

	console.log({ roomID });

	const { data, isLoading, isError, error } = useQuery({
		queryFn: getUserRooms,
		queryKey: ['fetchUserContact'],
	});

	return (
		<div className={`h-screen md:col-span-1 flex flex-col bg-background border-r`}>
			<div className="flex items-center justify-between space-x-4 p-4">
				<Link href="/" className="flex-grow">
					<div className="font-bold text-2xl">Chats</div>
				</Link>
				<Link href="/new-chat/create-group">
					<Button variant="ghost" size="icon" className="rounded-full w-10 h-10">
						<MessageSquarePlus className="h-6 w-6" />
						<span className="sr-only">New chat</span>
					</Button>
				</Link>
				<UserMenu>
					<Button variant="ghost" size="icon" className="rounded-full w-10 h-10">
						<EllipsisVertical className="h-6 w-6" />
						<span className="sr-only">Menu</span>
					</Button>
				</UserMenu>
			</div>
			<div className="relative p-4">
				<Search className="absolute left-7 top-7 h-5 w-5 text-muted-foreground" />
				<Input className="pl-10" placeholder="Search or start new chat" />
			</div>
			<ScrollArea className="flex-grow">
				<div className="space-y-2 p-3">
					{isLoading &&
						<div>
							{Array(8).fill(0).map((_, idx) => (
								<div key={idx} className="my-4 flex items-center space-x-4">
									<Skeleton className="h-14 w-14 rounded-full" />
									<div className="space-y-2">
										<Skeleton className="h-5 w-[250px]" />
										<Skeleton className="h-5 w-[200px]" />
									</div>
								</div>
							))}
						</div>
					}

					{!isLoading && isError &&
						<div className="w-full space-y-4">
							<div className="w-full px-4">
								<Alert variant="destructive">
									<AlertCircle className="h-4 w-4" />
									<AlertTitle>Error getting contacts.</AlertTitle>
									<AlertDescription>
										{error.message}. Please try again.
									</AlertDescription>
								</Alert>
							</div>

							<div className="w-full flex items-center justify-center space-x-4">
								<Link href="/">
									<Button>
										Go Home
									</Button>
								</Link>
								<Button variant="outline" onClick={() => {
									window.location.href = "/chat"
								}}>
									Try Again
								</Button>
							</div>
						</div>
					}

					{!isLoading && !isError && data && data.data.length === 0 &&
						<Card className="m-4">
							<CardContent className="flex flex-col items-center p-6 text-center">
								<MessageSquarePlus className="h-12 w-12 text-muted-foreground mb-4" />
								<h2 className="text-lg font-semibold mb-2">No chats yet</h2>
								<p className="text-sm text-muted-foreground mb-4">Start a conversation to connect with friends and family.</p>
								<Link href="/new-chat/create-group">
									<Button>
										<MessageSquarePlus className="mr-2 h-4 w-4" />
										Create New Chat
									</Button>
								</Link>
							</CardContent>
						</Card>
					}

					{!isLoading && !isError && data && data.data.length > 0 &&
						data.data.map((contact) => (
							<Link
								href={`/chat/${contact.roomID}`}
								key={contact.id}
								className={`flex items-center p-3 hover:bg-muted cursor-pointer rounded-lg ${contact.roomID === roomID && 'bg-muted'}`}
							>
								<Avatar className="h-12 w-12">
									<AvatarImage src={contact.room.profileImage ?? ''} alt={contact.room.name} />
									<AvatarFallback>{getAvatarFallback(contact.room.name)}</AvatarFallback>
								</Avatar>
								<div className="ml-4 flex-grow">
									<div className="flex justify-between items-baseline">
										<h2 className="text-base font-semibold">{contact.room.name}</h2>
										<span className="text-xs text-muted-foreground">{contact.room.type}</span>
									</div>
									<p className="text-sm text-muted-foreground truncate">{contact.role}</p>
								</div>
							</Link>
						))
					}
				</div>
			</ScrollArea>
		</div>

	)
}