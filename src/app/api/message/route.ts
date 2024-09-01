import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { auth } from "@/auth";

export const GET = auth(async function GET(request) {
	try {
		if (!request.auth) {
			throw new Error("Not authenticated");
		}

		const searchParams = request.nextUrl.searchParams;
		const roomID = searchParams.get('roomID');
		if (!roomID) {
			console.error("roomID not provided when getting messages!");
			throw new Error('Invalid identifier.')
		}

		// TODO: Validate if user is from the room!

		const thirtyDaysAgo = new Date();
		thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

		const messages = await prisma.message.findMany({
			where: {
				roomID,
				sentAt: {
					gte: thirtyDaysAgo
				}
			}
		});

		return NextResponse.json(
			{
				success: true,
				message: "User groups fetched successfully!",
				data: messages
			}
		)
	} catch (e) {
		console.log("Error getting Room messages", e);
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
});


export const POST = auth(async function POST(request) {
	try {
		if (!request.auth) {
			throw new Error("Not authenticated!");
		}
		const body = await request.json();
		const { roomID, messageContent } = body;

		const user = await prisma.user.findFirst({
			where: {
				email: request.auth.user?.email ?? "12345"
			}
		});
		if (!user) {
			throw new Error("User doesn't exists!");
		}

		const newMessage = await prisma.message.create({
			data: {
				roomID,
				userID: user.id,
				content: messageContent,
				senderType: 'USER'
			}
		});

		return NextResponse.json(
			{
				success: true,
				message: "Message created successfully!",
				data: newMessage,
			},
			{
				status: 201,
			},
		);
	} catch (e) {
		console.log("Error creating Room", e);
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
});
