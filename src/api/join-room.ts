
import type { UserRoom } from "@prisma/client";
import { ResultType } from "@/types/api";

export const getJoinRoom = async (joinLink: string): Promise<ResultType<UserRoom>> => {
    const response = await fetch(`/api/join-room?joinLink=${joinLink}`, {
        method: 'GET'
    });
    const result: ResultType<UserRoom> = await response.json();
    if (!result.success) {
        throw new Error(result.message);
    }
    return result;
}