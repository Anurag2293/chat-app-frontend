import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { auth } from "@/auth";

import { Role } from "@prisma/client";

export const GET = auth(async function GET(request) {
	try {
		if (!request.auth) {
			throw new Error("Not authorised!");
		}

		const searchParams = request.nextUrl.searchParams;
		const roomID = searchParams.get("roomID");
		if (!roomID) {
			throw new Error("Invalid roomID");
		}

		const usersInRoom = await prisma.userRoom.findMany({
			where: {
				roomID
			},
			include: {
				user: true
			}
		});

		return NextResponse.json(
			{
				success: true,
				message: "Fetched room details",
				data: usersInRoom
			},
			{
				status: 200
			},
		);
	} catch (e) {
		console.log("Error getting Room Details", e);
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
			throw new Error("Not authorised!");
		}
		const body = await request.json();
		const { roomID, role } = body;
		console.log({ body });

		console.log({ postUserRoomAuth: request.auth });

		const checkUser = await prisma.user.findFirst({
			where: {
				email: request.auth.user?.email ?? "12345"
			}
		});
		console.log({ checkUser });
		if (!checkUser) {
			throw new Error("User not found");
		}

		const newRole: Role = role ? role : "MEMBER";
		const newUserRoom = await prisma.userRoom.create({
			data: {
				userID: checkUser.id,
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
		console.error("Error creating user room: ", error);
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
