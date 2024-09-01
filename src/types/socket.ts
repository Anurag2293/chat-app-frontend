import type { Message } from "@prisma/client";

export type ChatMessages = Map<string, Message[]>;