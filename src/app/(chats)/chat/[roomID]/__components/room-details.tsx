import React from "react"
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import type { Room } from "@prisma/client";
import { User, X, Search, LogOut, UserPlus, Link2 } from "lucide-react";

import { getUserRoom } from "@/api/user-room";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import { GetDateFromDateTime, GetTimeFromDateTime } from "@/lib/chat-room";

type RoomDetailsProps = {
  setShowRoomDetails: React.Dispatch<React.SetStateAction<boolean>>,
  roomDetails: Room
}

export default function RoomDetails(props: RoomDetailsProps) {
  const { data: roomWithUsers, isLoading, isError } = useQuery({
    queryFn: () => getUserRoom(props.roomDetails.id),
    queryKey: ['getUsersInRoom']
  });

  if (isLoading) {
    return "Loading...";
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
          <p className="text-muted-foreground">Group {`\u00B7`} {roomWithUsers?.data.length} members</p>
        </div>
      </CardHeader>

      <CardContent className="my-2 p-8 bg-muted/20">
        <CardDescription className="text-base text-primary">
          {props.roomDetails.description}
        </CardDescription>
        <p className="mt-4 text-muted-foreground">
          Group created by Anurag Dhote, on {GetDateFromDateTime(props.roomDetails.createdAt)} at {GetTimeFromDateTime(props.roomDetails.createdAt)}
        </p>
      </CardContent>

      <CardContent className="my-2 p-0 bg-muted/20">
        <div className="mx-8 py-4 flex justify-between cursor-pointer ">
          <h4 className="font-medium text-muted-foreground">{roomWithUsers?.data.length} members</h4>
          <Search className="text-muted-foreground" />
        </div>

        <div className="w-full px-8 py-4 flex items-center space-x-2 cursor-pointer hover:bg-muted/50">
          <div className="h-10 w-10 flex justify-center items-center bg-green-600 rounded-full">
            <UserPlus />
          </div>
          <div>Add member</div>
        </div>

        <div className="w-full px-8 py-4 flex items-center space-x-2 cursor-pointer hover:bg-muted/50">
          <div className="h-10 w-10 flex justify-center items-center bg-green-600 rounded-full">
            <Link2 />
          </div>
          <div>Invite to group via link</div>
        </div>

        <div className="flex flex-col items-start">
          {roomWithUsers?.data.map((userroom) => (
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
          ))}
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