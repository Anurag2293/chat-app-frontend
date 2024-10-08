import type { Message } from "@prisma/client";
import { ResultType, UserIncludedMessage } from "@/types/api";

export async function getRoomMessages(roomID: string): Promise<ResultType<UserIncludedMessage[]>> {
    const response = await fetch(`/api/message?roomID=${roomID}`, {
        method: 'GET'
    });
    const result: ResultType<UserIncludedMessage[]> = await response.json();
	if (!result.success || !result.data) {
		throw new Error(result.message);
	}
    return result;
}

export async function postRoomMessage({
    roomID, 
    messageContent
}:{
    roomID: string, 
    messageContent: string
}): Promise<ResultType<Message>> {
    const response = await fetch("/api/message", {
        method: 'POST',
        body: JSON.stringify({
            roomID,
            messageContent
        })
    });
    const result: ResultType<Message> = await response.json();
    if (!result.success) {
        throw new Error(result.message);
    }
    return result;
}