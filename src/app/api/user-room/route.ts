import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { auth } from "@/auth";

import { Role } from "@prisma/client"

export const POST = auth(async function POST(request) {
	try {
		if (!request.auth) {
			throw new Error("Not authorised!");
		}
		const body = await request.json();
		const { userID, roomID, role } = body;

    console.log({ body });

    const checkUser = await prisma.user.findFirst({
      where: {
        id: userID
      }
    });

    if (!checkUser) {
      throw new Error("User not found");
    }

    console.log({checkUser});

		const newRole: Role = role ? role : "MEMBER";

		const newUserRoom = await prisma.userRoom.create({
			data: {
				userID,
				roomID,
				role: newRole
			}
		});

		console.log({ newUserRoom });

		return NextResponse.json(
			{
				success: true,
				message: "UserRoom created successfully!",
				data: newUserRoom
			},
			{
				status: 201
			},
		);
	} catch (error) {
		console.log("Error creating user room", error);
		return NextResponse.json(
			{
				success: false,
				message: (error as Error).message,
				data: null,
			},
			{
				status: 401
			},
		);
	}
});
