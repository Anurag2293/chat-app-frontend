import Cryptr from "cryptr"
import prisma from "./db";

const cryptr = new Cryptr(String(process.env.CRYPTR_SECRET_KEY), {
    encoding: 'base64',
    pbkdf2Iterations: 10000,
    saltLength: 10
});

export const generateLink = async (roomID: string) => {
    const link = await prisma.roomLink.findFirst({
        where: {
            roomID
        }
    });
    if (link) {
        return link.joinLink;
    }

    const newJoinLink = cryptr.encrypt(roomID);
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
        }
    });
    
    if (!link || link.expiresAt < new Date()) {
        return null;
    }
    
    const decryptedCode = cryptr.decrypt(joinLink);
    if (!decryptedCode) {
        return null;
    }
    
    const updatedLink = await prisma.roomLink.update({
        where: {
            joinLink
        },
        data: {
            usageCount: {
                increment: 1
            }
        },
    });

    return updatedLink.roomID;
}