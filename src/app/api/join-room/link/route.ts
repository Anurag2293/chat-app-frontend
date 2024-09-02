import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { auth } from "@/auth";

import { generateLink } from "@/lib/link-service";

export const POST = auth(async function POST(request) {
  try {
    if (!request.auth) {
      throw new Error("Not authenticated!");
    }
    const body = await request.json();
    const { roomID } = body;

    const verifyUserInRoom = await prisma.user.findFirst({
      where: {
        email: request.auth.user?.email ?? ""
      },
      include: {
        groups: {
          where: {
            roomID
          }
        }
      }
    });
    if (!verifyUserInRoom) {
      throw new Error('No user exists!');
    }

    const isUserAuthorized = verifyUserInRoom.groups.filter(group =>
      (group.roomID === roomID) &&
      (['OWNER', 'ADMIN'].includes(group.role))
    ).length > 0;
    if (!isUserAuthorized) {
      throw new Error('User unauthorized!');
    }

    const joinLink = await generateLink(roomID);

    return NextResponse.json(
      {
        success: true,
        message: "Join Room Link created successfully!",
        data: joinLink,
      },
      {
        status: 201,
      },
    );
  } catch (e) {
    console.log("Error creating Room Link", e);
    return NextResponse.json(
      {
        success: false,
        message: (e as Error).message,
        data: null,
      },
      {
        status: 401,
      },
    );
  }
})