import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { auth } from "@/auth";

import { generateLink, validateLink } from "@/lib/link-service";

export const GET = auth(async function GET(request) {
	try {
		if (!request.auth) {
      throw new Error("Not authenticated");
    }

		const searchParams = request.nextUrl.searchParams;
		const joinLink = searchParams.get('joinLink');
		if (!joinLink) {
			throw new Error('Invalid link.')
		}

		const roomID = await validateLink(joinLink);
		if (!roomID) {
			throw new Error('Invalid or expired link.');
		}

		// TODO: Extend session so that we don't need to fetch user here!
		const user = await prisma.user.findFirst({
			where: {
				email: request.auth.user?.email ?? "12345"
			}
		});
		if (!user) {
			throw new Error('User not found!');
		}

		const newUserRoom = await prisma.userRoom.create({
			data: {
				roomID,
				userID: user.id
			}
		});

		return NextResponse.json(
      {
        success: true,
        message: "Joined Room successfully!",
        data: newUserRoom,
      },
      {
        status: 201,
      },
    );
	} catch (e) {
		console.log("Error getting Room", e);
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

export const POST = auth(async function POST(request) {
	try {
		if (!request.auth) {
      throw new Error("Not authenticated!");
    }
		const body = await request.json();
		const { roomID } = body;

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