import type { Room, User, UserRoom } from "@prisma/client";

export type RoomWithUsers = {
	users: User[]
} & Room;

export type RoomWithInfo = {
	room: RoomWithUsers
} & UserRoom;
