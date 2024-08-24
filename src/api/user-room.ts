
import type { Role, UserRoom } from "@prisma/client";
import type { ResultType } from "@/types/api";

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
