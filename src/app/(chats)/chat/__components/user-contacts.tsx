'use client'

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { getUserRooms } from "@/api/room";
import { getAvatarFallback } from "@/lib/chat-room";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

export default function UserContacts() {
	const { roomID } = useParams();

	const { data, isLoading, isError } = useQuery({
		queryFn: getUserRooms,
		queryKey: ['fetchUserContact'],
	});

	return (
		<div>
			{isLoading && <div>
				{Array(8).fill(0).map((_, idx) => (
					<div key={idx} className="mb-4 flex items-center space-x-4">
						<Skeleton className="h-12 w-12 rounded-full" />
						<div className="space-y-2">
							<Skeleton className="h-4 w-[250px]" />
							<Skeleton className="h-4 w-[200px]" />
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
				data.data.map((contact, index) => (
					<Link
						href={`/chat/${contact.roomID}`}
						className={`flex items-center gap-4 p-2 rounded-lg hover:bg-muted/50 ${contact.roomID == roomID && "bg-muted"}`}
						prefetch={false}
						key={index}
					>
						<Avatar className="border w-10 h-10">
							<AvatarImage src={contact.room.profileImage ?? ''} alt="Image" />
							<AvatarFallback>{getAvatarFallback(contact.room.name)}</AvatarFallback>
						</Avatar>
						<div className="grid gap-0.5">
							<p className="text-sm font-medium leading-none">
								{contact.room.name}
							</p>
						</div>
					</Link>
				))
			}
		</div>
	)
}