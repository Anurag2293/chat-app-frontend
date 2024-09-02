import { nanoid } from 'nanoid';

import prisma from "./db";

export const generateLink = async (roomID: string) => {
    const link = await prisma.roomLink.findFirst({
        where: {
            roomID
        }
    });
    if (link) {
        return link.joinLink;
    }

    const newJoinLink = nanoid();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + (5 * 24));

    const newLink = await prisma.roomLink.create({
        data: {
            room: { connect: { id: roomID } },
            joinLink: newJoinLink,
            expiresAt,
            usageCount: 1
        }
    });

    return newLink.joinLink;
}

export const validateLink = async (joinLink: string) => {
    const link = await prisma.roomLink.findFirst({
        where: {
            joinLink
        },
        include: {
            room: true
        }
    });
    
    if (!link || link.expiresAt < new Date()) {
        return { room: null, participants: null };
    }

    const numberOfParticipants = await prisma.userRoom.count({
        where: {
            roomID: link.roomID
        }
    });
    
    await prisma.roomLink.update({
        where: {
            joinLink
        },
        data: {
            usageCount: {
                increment: 1
            }
        },
    });

    return { room: link.room, participants: numberOfParticipants };
}