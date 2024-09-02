'use client'

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Users } from "lucide-react"

import { getJoinRoom } from "@/api/join-room";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast";

type JoinRoomProps = {
    joinLink: string
}

export default function JoinRoomCard(props: JoinRoomProps) {
    const participantCount = 8;

    // const { data, isLoading, error, isError } = useQuery({
    //     queryFn: () => getJoinRoom(props.params.joinLink),
    //     queryKey: ['getJoinRoom'],
    //     refetchInterval: false
    // });

    return (
        <div className="w-full flex-grow flex items-center justify-center bg-background p-4">
            <Card className="w-full max-w-lg mx-auto">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl sm:text-4xl font-bold mb-2">Family Chat</CardTitle>
                    <div className="flex items-center justify-center text-lg sm:text-xl text-muted-foreground">
                        <Users className="w-6 h-6 mr-2" />
                        <span>{participantCount} participants</span>
                    </div>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-lg sm:text-xl mb-4">Join the conversation with your family members!</p>
                </CardContent>
                <CardFooter>
                    <Button className="w-full text-lg py-6" size="lg">
                        Join Chat
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )

}