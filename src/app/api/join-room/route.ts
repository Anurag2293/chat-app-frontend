import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { auth } from "@/auth";

import { validateLink } from "@/lib/link-service";

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

    const { room, participants } = await validateLink(joinLink);
    if (!room || !participants) {
      throw new Error('Invalid or expired link.');
    }

    return NextResponse.json(
      {
        success: true,
        message: "Get Join Room Link successfully!",
        data: {
          room,
          participants
        },
      },
      {
        status: 201,
      },
    );
  } catch (e) {
    console.log("Error getting Room Link", e);
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