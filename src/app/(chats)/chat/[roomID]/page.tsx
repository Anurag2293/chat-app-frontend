'use client'

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle } from "lucide-react";

import { getUserRooms } from "@/api/room";

import { LoadingSpinner } from "@/components/loader";
import { useToast } from "@/components/ui/use-toast";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

import ChatRoom from "./__components/chat-room";
import RoomDetails from "./__components/room-details";

export default function ChatRoomWithID() {
  const { roomID } = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [showRoomDetails, setShowRoomDetails] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryFn: getUserRooms,
    queryKey: ['fetchUserContact'],
  });

  const toggleShowRoomDetails = () => setShowRoomDetails(!showRoomDetails);
  const roomDetails = data?.data.filter((value) => value.roomID === roomID)[0].room;

  if (isError) {
    toast({
      description: "Error fetching room data",
      variant: "destructive"
    });
    router.push("/chat");
  }

  return (
    <div className="h-screen col-span-1 md:col-span-2">
      {isLoading &&
        <div className="h-full flex justify-center items-center">
          <LoadingSpinner size={64} />
        </div>
      }

      {!isLoading && isError &&
        <div className="h-full flex justify-center items-center px-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error fetching group data.</AlertTitle>
            <AlertDescription>
              Please try again.
            </AlertDescription>
          </Alert>
        </div>
      }

      <div className="h-full grid grid-cols-1 md:grid-cols-2">
        {!isError &&
          <div className={showRoomDetails ? 'col-span-1 hidden md:block' : 'col-span-2'}>
            <ChatRoom
              toggleShowRoomDetails={toggleShowRoomDetails}
              roomDetails={roomDetails}
              isLoadingRoomDetails={isLoading}
            />
          </div>
        }

        {!isLoading && !isError && roomDetails && showRoomDetails &&
          <RoomDetails
            setShowRoomDetails={setShowRoomDetails}
            roomDetails={roomDetails}
          />
        }
      </div>
    </div>
  )
}