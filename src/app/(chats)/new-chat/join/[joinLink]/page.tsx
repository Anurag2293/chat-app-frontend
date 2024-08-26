'use client'

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { getJoinRoom } from "@/api/join-room";
import { useToast } from "@/components/ui/use-toast";

type JoinRoomProps = {
    params: {
        joinLink: string
    }
}

export default function JoinRoom(props: JoinRoomProps) {
    const router = useRouter();
    const { toast } = useToast();

    const { data, isLoading, error } = useQuery({
        queryFn: () => getJoinRoom(props.params.joinLink),
        queryKey: ['getJoinRoom']
    });

    if (error || !data?.success) {
        router.push("/chat");
        toast({
            title: "Error joining room",
            description: error?.message,
            variant: "destructive"
        });
    }

    if (data && data.success) {
        router.push(`/chat/${data.data.roomID}`);
        toast({
            title: "Joined room successfully!",
        });
    }

    return (
        <div>
            {isLoading && <div>
                Joining Room...     
            </div>}
        </div>
    )

}