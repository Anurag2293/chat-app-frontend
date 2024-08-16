import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { auth } from "@/auth";

export const POST = auth(async function POST(request) {
  try {
    if (!request.auth) {
      throw new Error("Not authenticated!");
    }
    const body = await request.json();
    const { roomName } = body;

    const newRoom = await prisma.room.create({
      data: {
        name: String(roomName),
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Room created successfully!",
        data: newRoom,
      },
      {
        status: 201,
      },
    );
  } catch (e) {
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
