
import type { Room, UserRoom } from "@prisma/client";
import type { ResultType } from "@/types/api";

type RoomWithInfo = {
	room: Room
} & UserRoom;

export async function getUserRooms(): Promise<ResultType<RoomWithInfo[]>> {
	const response = await fetch("/api/room", {
		method: "GET"
	});
	const result: ResultType<RoomWithInfo[]> = await response.json();
	if (!result.success || !result.data) {
		throw new Error(result.message);
	}
	return result;
}

export async function postRoom({
	name,
	description,
}: {
	name: string;
	description: string;
}): Promise<ResultType<Room>> {
	const response = await fetch("/api/room", {
		method: "POST",
		body: JSON.stringify({
			name,
			description,
		}),
	});
	const result: ResultType<Room> = await response.json();
	if (!result.success) {
		throw new Error(result.message);
	}
	return result;
}

export async function patchRoomWithProfileImage({
	roomID,
	profileImageURL,
}: {
	roomID: string;
	profileImageURL: string;
}): Promise<ResultType<Room>> {
	const response = await fetch("/api/room", {
		method: "PATCH",
		body: JSON.stringify({
			roomID,
			profileImageURL,
		}),
	});
	const result: ResultType<Room> = await response.json();
	if (!result.success) {
		throw new Error(result.message);
	}
	return result;
}
