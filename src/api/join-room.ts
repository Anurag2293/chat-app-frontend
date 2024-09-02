
import type { Room } from "@prisma/client";
import { ResultType } from "@/types/api";

type JoinRoomInfo = {
    room: Room,
    participants: number
}

export const getJoinRoom = async (joinLink: string): Promise<ResultType<JoinRoomInfo>> => {
    const response = await fetch(`/api/join-room?joinLink=${joinLink}`, {
        method: 'GET'
    });
    const result: ResultType<JoinRoomInfo> = await response.json();
    if (!result.success) {
        throw new Error(result.message);
    }
    return result;
}

export const postJoinRoomLink = async (roomID: string): Promise<ResultType<string>> => {
    const response = await fetch("/api/join-room/link", {
        method: 'POST',
        body: JSON.stringify({roomID})
    });
    const result: ResultType<string> = await response.json();
    if (!result.success) {
        throw new Error(result.message);
    }
    return result;
}