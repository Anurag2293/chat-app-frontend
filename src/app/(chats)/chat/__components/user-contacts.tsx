'use client'

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Search } from "lucide-react";

import { getUserRooms } from "@/api/room";
import { getAvatarFallback } from "@/lib/chat-room";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";

import PlusIcon from "@/components/icons/plus";

export default function UserContacts() {
	const { roomID } = useParams();

	console.log({roomID});

	const { data, isLoading, isError } = useQuery({
		queryFn: getUserRooms,
		queryKey: ['fetchUserContact'],
	});

	return (
		<div className={`h-screen md:col-span-1 flex flex-col bg-background border-r`}>
			<div className="flex items-center justify-between space-x-4 p-4">
				<Link href="/">
					<div className="font-bold text-2xl">Chats</div>
				</Link>
				<Link href="/new-chat">
					<Button variant="ghost" size="icon" className="rounded-full w-8 h-8">
						<PlusIcon className="h-4 w-4" />
						<span className="sr-only">New chat</span>
					</Button>
				</Link>
			</div>
			<div className="relative p-4">
				<Search className="absolute left-7 top-7 h-5 w-5 text-muted-foreground" />
				<Input className="pl-10" placeholder="Search or start new chat" />
			</div>
			<ScrollArea className="flex-grow">
				<div className="divide-y divide-border p-3">
					{isLoading && <div>
						{Array(8).fill(0).map((_, idx) => (
							<div key={idx} className="my-4 flex items-center space-x-4">
								<Skeleton className="h-14 w-14 rounded-full" />
								<div className="space-y-2">
									<Skeleton className="h-5 w-[250px]" />
									<Skeleton className="h-5 w-[200px]" />
								</div>
							</div>
						))}
					</div>}

					{!isLoading && isError && <div>
						<Link href="/">
							<Button>
								Go To Home
							</Button>
						</Link>
					</div>}

					{!isLoading && !isError && data &&
						data.data.map((contact) => (
							<Link href={`/chat/${contact.roomID}`} key={contact.id} className="flex items-center p-4 hover:bg-muted cursor-pointer">
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
						))}
				</div>
			</ScrollArea>
		</div>

	)
}