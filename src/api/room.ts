
import type { Room } from "@prisma/client";
import type { ResultType } from "@/types/api";

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
