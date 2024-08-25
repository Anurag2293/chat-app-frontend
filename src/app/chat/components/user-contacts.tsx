'use client'

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getUserRooms } from "@/api/room";

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