'use client'

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getUserRooms } from "@/api/room";
import { useParams } from "next/navigation";

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


export default function UserContacts() {
	const { roomID } = useParams();

	const { data, isLoading, isError } = useQuery({
		queryFn: getUserRooms,
		queryKey: ['fetchUserContact']
	});

	if (isLoading) return <div>
		Loading...
	</div>

	if (isError || !data) return <div>
		<Link href="/">
			<Button>
				Go To Home
			</Button>
		</Link>
	</div>

	console.log({data: data.data})

	return data.data.map((contact, index) => (
		<Link
			href={`/chat/${contact.roomID}`}
			className={`flex items-center gap-4 p-2 rounded-lg hover:bg-muted/50 ${contact.roomID == roomID && "bg-muted"}`}
			prefetch={false}
			key={index}
		>
			<Avatar className="border w-10 h-10">
				<AvatarImage src={contact.room.profileImage ?? ''} alt="Image" />
				<AvatarFallback>{contact.room.name.toUpperCase().substring(0, 2)}</AvatarFallback>
			</Avatar>
			<div className="grid gap-0.5">
				<p className="text-sm font-medium leading-none">
					{contact.room.name}
				</p>
				{/* <p className="text-xs text-muted-foreground">
					{contact.lastMessage} &middot; {contact.lastMessageDuration}
				</p> */}
			</div>
		</Link>
	))
}