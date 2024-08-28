
import type { Role, UserRoom, User } from "@prisma/client";
import type { ResultType } from "@/types/api";

type UserDetailInRoom = {
	user: User
} & UserRoom;

export async function getUserRoom(roomID: string): Promise<ResultType<UserDetailInRoom[]>> {
	const response = await fetch(`/api/user-room?roomID=${roomID}`, {
		method: "GET"
	});
	const result: ResultType<UserDetailInRoom[]> = await response.json();
	if (!result.success) {
		throw new Error(result.message);
	}
	return result;
}

export async function postUserRoom({
	roomID,
	role = "MEMBER"
}: {
	roomID: string,
	role: Role
}): Promise<ResultType<UserRoom>> {
	const response = await fetch("/api/user-room", {
		method: "POST",
		body: JSON.stringify({
			roomID,
			role
		})
	});
	const result: ResultType<UserRoom> = await response.json();
	if (!result.success) {
		throw new Error(result.message);
	}
	return result;
}
