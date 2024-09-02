'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AlertCircle } from "lucide-react"

import { getJoinRoom } from "@/api/join-room";
import { postUserRoom } from "@/api/user-room";
import { getAvatarFallback } from "@/lib/chat-room";

import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { LoadingSpinner } from "@/components/loader";
import { Role } from "@prisma/client";

type JoinRoomProps = {
	joinLink: string
}

export default function JoinRoomCard(props: JoinRoomProps) {
	const router = useRouter();
	const { toast } = useToast();

	const { data, isError, isLoading, error } = useQuery({
		queryKey: ['getJoinRoom'],
		queryFn: () => getJoinRoom(props.joinLink)
	})

	const { mutate, isPending } = useMutation({
		mutationFn: postUserRoom,
		onSuccess: (result) => {
			console.log("Joined room successfully!");
			router.push(`/chat/${result.data.roomID}`);
			toast({
				title: "Joined room successfully!"
			});
		},
		onError: (error) => {
			console.error("Error joining room!");
			toast({
				title: "Error joining room!",
				description: error.message,
				variant: "destructive"
			});
		}
	});

	const joinRoomUsingRoomID = (roomID: string, role: Role) => {
		mutate({ roomID, role });
	}

	return (
		<div className="w-full flex-grow flex items-start justify-center bg-background p-4">
			{isLoading &&
				<div className="h-full flex flex-col justify-center">
					<LoadingSpinner size={96} />
				</div>
			}

			{!isLoading && isError &&
				<div className="h-full w-full md:w-1/2 mx-auto flex flex-col justify-center space-y-4">
					<div className="w-full px-4">
						<Alert variant="destructive">
							<AlertCircle className="h-4 w-4" />
							<AlertTitle>Error getting join link.</AlertTitle>
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
							window.location.href = `/new-chat/join/${props.joinLink}`
						}}>
							Try Again
						</Button>
					</div>
				</div>
			}

			{!isLoading && !isError && data &&
				<Card className="w-full max-w-lg h-full flex flex-col justify-center border-none space-y-12">
					<Avatar className="h-48 w-48 mx-auto">
						<AvatarImage src={data.data.room.profileImage ?? ''} alt={data.data.room.name} />
						<AvatarFallback className="text-7xl">{getAvatarFallback(data.data.room.name)}</AvatarFallback>
					</Avatar>
					<CardContent className="text-center space-y-2">
						<CardTitle className="text-4xl font-normal">{data.data.room.name}</CardTitle>
						<CardDescription className="text-2xl">Chatter Group Invite</CardDescription>
					</CardContent>
					<CardFooter>
						<Button
							className="mx-auto py-8 px-8 text-lg rounded-full"
							size="lg"
							onClick={() => joinRoomUsingRoomID(data.data.room.id, 'MEMBER')}
							disabled={isPending}
						>
							Join Chat
						</Button>
					</CardFooter>
				</Card>
			}
		</div>
	)

}