import React, { useState } from "react"
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import type { Room } from "@prisma/client";
import { User, X, Search, LogOut, UserPlus, Link2, AlertCircle } from "lucide-react";
import { useSession } from "next-auth/react";

import { getUserRoom } from "@/api/user-room";
import { getDateFromDateTime, getTimeFromDateTime } from "@/lib/chat-room";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Alert,
	AlertDescription,
	AlertTitle,
} from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import GroupInviteLink from "./invite-link";

export type RoomDetailsOptions = 'HOME' | 'GROUP-INVITE';

type RoomDetailsProps = {
	setShowRoomDetails: React.Dispatch<React.SetStateAction<boolean>>,
	roomDetails: Room
}

export default function RoomDetails(props: RoomDetailsProps) {
	const session = useSession();
	const [pageOption, setPageOption] = useState<RoomDetailsOptions>('HOME');

	const { data: roomWithUsers, isLoading, isError } = useQuery({
		queryFn: () => getUserRoom(props.roomDetails.id),
		queryKey: ['getUsersInRoom']
	});

	
	const currentUser = roomWithUsers?.data.filter(userroom => userroom.user.email === session.data?.user?.email)[0];
	const canUserInvite = ['OWNER', 'ADMIN'].includes(currentUser?.role ?? '');

	const goBackToHome = () => {
		setPageOption('HOME');
	}

	if (pageOption === 'GROUP-INVITE') {
		return <GroupInviteLink goBackToHome={goBackToHome} roomID={props.roomDetails.id} />
	}

	return (
		<Card className="relative col-span-1 rounded-none h-screen overflow-y-auto">
			<div className="w-full sticky top-0 z-10 py-6 px-8 flex gap-4 bg-muted/20">
				<X onClick={() => props.setShowRoomDetails(false)} className='cursor-pointer' />
				<h2 className="font-semibold">Group Info</h2>
			</div>

			<CardHeader className="bg-muted/20 py-6">
				<div className="flex flex-col items-center">
					<div className="w-40 h-40 bg-muted rounded-full flex items-center justify-center">
						{props.roomDetails.profileImage ?
							<Image
								src={props.roomDetails.profileImage ?? ""}
								alt={props.roomDetails.name}
								height={100}
								width={100}
								className="h-full w-full rounded-full"
							/>
							:
							<User className="h-16 w-16 text-muted-foreground" />
						}
					</div>
					<CardTitle className="mt-2 text-2xl font-semibold">{props.roomDetails.name}</CardTitle>
					<p className="text-muted-foreground">
						Group
						{roomWithUsers?.data.length && ` \u00B7 ${roomWithUsers?.data.length} members`}
					</p>
				</div>
			</CardHeader>

			<CardContent className="my-2 p-8 bg-muted/20">
				<CardDescription className="text-base text-primary">
					{props.roomDetails.description}
				</CardDescription>
				<p className="mt-4 text-muted-foreground">
					Group created by Anurag Dhote, on {getDateFromDateTime(props.roomDetails.createdAt)} at {getTimeFromDateTime(props.roomDetails.createdAt)}
				</p>
			</CardContent>

			<CardContent className="my-2 p-0 bg-muted/20">
				<div className="mx-8 py-4 flex justify-between cursor-pointer ">
					<h4 className="font-medium text-muted-foreground">
						{roomWithUsers?.data.length && `${roomWithUsers?.data.length} members`}
					</h4>
					<Search className="text-muted-foreground" />
				</div>

				{canUserInvite && <div className="w-full px-8 py-4 flex items-center space-x-2 cursor-pointer hover:bg-muted/50">
					<div className="h-10 w-10 flex justify-center items-center bg-green-600 rounded-full">
						<UserPlus />
					</div>
					<div>Add member</div>
				</div>}

				{canUserInvite && <div className="w-full px-8 py-4 flex items-center space-x-2 cursor-pointer hover:bg-muted/50" onClick={() => setPageOption('GROUP-INVITE')}>
					<div className="h-10 w-10 flex justify-center items-center bg-green-600 rounded-full">
						<Link2 />
					</div>
					<div>Invite to group via link</div>
				</div>}

				<div className="flex flex-col items-start">
					{isLoading && Array(3).fill(0).map((_, idx) => (
						<div key={idx} className="w-full px-8 py-3 flex items-center space-x-4 my-2">
							<Skeleton className="h-10 w-10 rounded-full" />
							<div className="space-y-2">
								<Skeleton className="h-4 w-[250px]" />
								<Skeleton className="h-4 w-[200px]" />
							</div>
						</div>
					))}

					{!isLoading && isError &&
						<div className="w-full my-8 px-6">
							<Alert variant="destructive">
								<AlertCircle className="h-4 w-4" />
								<AlertTitle>Error fetching Contacts.</AlertTitle>
								<AlertDescription>
									Please try again.
								</AlertDescription>
							</Alert>
						</div>
					}

					{!isLoading && !isError && roomWithUsers &&
						roomWithUsers?.data.map((userroom) => (
							<div key={userroom.user.id} className="w-full px-8 py-3 flex justify-between items-start cursor-pointer hover:bg-muted/50">
								<div className="flex items-start gap-2">
									<Avatar>
										<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
										<AvatarFallback>CN</AvatarFallback>
									</Avatar>
									<div>
										<p className="text-base">{userroom.user.name}</p>
										<p className="text-muted-foreground text-sm">{userroom.user.email}</p>
									</div>
								</div>
								<div>
									{["OWNER", "ADMIN"].includes(userroom.role)
										&&
										<Badge variant="secondary">Group Admin</Badge>
									}
								</div>
							</div>
						))
					}
				</div>
			</CardContent>

			<CardFooter className="mt-2 mb-8 p-0 bg-muted/20">
				<div className="w-full px-8 py-4 flex space-x-4 text-red-400 cursor-pointer hover:bg-muted/50">
					<LogOut />
					<h4>Leave Group</h4>
				</div>
			</CardFooter>
		</Card>
	)
}