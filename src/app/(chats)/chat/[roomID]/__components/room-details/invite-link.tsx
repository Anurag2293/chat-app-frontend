import { ArrowLeft, Copy, AlertCircle } from "lucide-react";
import { TiArrowForward } from "react-icons/ti";
import { useQuery } from "@tanstack/react-query";

import { postJoinRoomLink } from "@/api/join-room";
import { BASE_URL } from "@/lib/url";

import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert";
import { LoadingSpinner } from "@/components/loader";


type GroupInviteLinkProps = {
    goBackToHome: () => void,
    roomID: string
}

export default function GroupInviteLink(props: GroupInviteLinkProps) {
    const { toast } = useToast();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['getJoinRoomLink'],
        queryFn: () => postJoinRoomLink(props.roomID)
    });

    const copyGroupInviteLink = () => {
        if (!data) {
            return;
        }
        const joinLink = `${BASE_URL}/new-chat/join/${data.data}`
        navigator.clipboard.writeText(joinLink);
        toast({
            description: "Copied Joining Link successfully!"
        });
    }

    return <Card className="min-h-screen rounded-none bg-muted/20">
        <div className="w-full py-6 px-8 flex space-x-6">
            <ArrowLeft onClick={props.goBackToHome} className="cursor-pointer text-muted-foreground" />
            <h2 className="font-semibold text-lg">Invite to group via Link</h2>
        </div>
        {isLoading && (
            <div className="w-full my-8 flex justify-center items-center">
                <LoadingSpinner size={40} />
            </div>
        )}
        {!isLoading && isError && (
            <div className="w-full my-8 px-6">
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error generating link.</AlertTitle>
                    <AlertDescription>
                        {error.message}. Please try again.
                    </AlertDescription>
                </Alert>
            </div>
        )}
        {!isLoading && !isError && (
            <CardContent className="px-0 py-1">
                <div className="w-full px-8 py-6 flex items-center space-x-4 cursor-pointer hover:bg-muted">
                    <TiArrowForward fontSize={20} />
                    <p className="text-base">Send link via Chat App</p>
                </div>
                <div className="w-full px-8 py-6 flex space-x-4 cursor-pointer hover:bg-muted" onClick={copyGroupInviteLink}>
                    <Copy className="p-1 box-content size-4" />
                    <p className="text-base">Copy Link</p>
                </div>
            </CardContent>
        )}
    </Card>
}