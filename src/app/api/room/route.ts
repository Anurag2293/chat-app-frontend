import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { auth } from "@/auth";

export const GET = auth(async function GET(request) {
  try {
    if (!request.auth) {
      throw new Error("Not authenticated");
    }

    const user = await prisma.user.findFirst({
      where: {
        id: request.auth.user?.id
      },
      include: {
        groups: {
          include: {
            room: true
          }
        }
      }
    });
    if (!user) {
      throw new Error("User not found");
    }

    console.log({groups: user.groups});

    return NextResponse.json(
      {
        success: true,
        message: "User groups fetched successfully!",
        data: user.groups
      }
    )
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
    const { name, description } = body;

    const newRoom = await prisma.room.create({
      data: {
        name,
        description: description,
      },
    });

    console.log({ newRoom });

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

export const PATCH = auth(async function PATCH(request) {
  try {
    if (!request.auth) {
      throw new Error("Not authenticated!");
    }
    const body = await request.json();
    const { roomID, profileImageURL } = body;

    const updatedRoom = await prisma.room.update({
      where: {
        id: roomID,
      },
      data: {
        profileImage: profileImageURL,
      },
    });

    console.log({ updatedRoom });

    return NextResponse.json(
      {
        success: true,
        message: "Room updated successfully!",
        data: updatedRoom,
      },
      {
        status: 200,
      },
    );
  } catch (e) {
    console.log("Error updating Room with profile Image", e);
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
