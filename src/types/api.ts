import type { Message, User } from "@prisma/client";

export type ResultType<DataType> = {
	success: Boolean,
	message: string,
	data: DataType
}

export type UserIncludedMessage = {
	user: User
} & Message;
