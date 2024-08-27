'use client'

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { getUserRooms } from "@/api/room";
import { useToast } from "@/components/ui/use-toast";

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
    })
    router.push("/chat");

    return (<></>);
  }

  if (!roomDetails) {
    if (isLoading) {
      return "Loading...";
    }
    return (<></>);
  }

  return (
    <div className="w-full h-screen grid grid-cols-1 md:grid-cols-2">
      <div className={showRoomDetails ? 'col-span-1 hidden md:block' : 'col-span-2'}>
        <ChatRoom 
          toggleShowRoomDetails={toggleShowRoomDetails} 
          roomDetails={roomDetails} 
        />
      </div>

      {showRoomDetails && <RoomDetails 
        setShowRoomDetails={setShowRoomDetails} 
        roomDetails={roomDetails} 
      />}
    </div>
  )
}