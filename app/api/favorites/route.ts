import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import { Favorite, User } from "@/database";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const user = await User.findOne({
      email: session.user.email.toLowerCase(),
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const { eventId } = await req.json();

    if (!eventId) {
      return NextResponse.json(
        { message: "Event ID is required" },
        { status: 400 }
      );
    }

    // Check if already favorited
    const existingFavorite = await Favorite.findOne({
      eventId,
      userId: user._id,
    });

    if (existingFavorite) {
      return NextResponse.json(
        { message: "Event already favorited" },
        { status: 400 }
      );
    }

    const favorite = await Favorite.create({
      eventId,
      userId: user._id,
    });

    return NextResponse.json(
      { message: "Event added to favorites", favorite },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding favorite:", error);
    return NextResponse.json(
      { message: "Failed to add favorite" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const user = await User.findOne({
      email: session.user.email.toLowerCase(),
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get("eventId");

    if (!eventId) {
      return NextResponse.json(
        { message: "Event ID is required" },
        { status: 400 }
      );
    }

    const result = await Favorite.findOneAndDelete({
      eventId,
      userId: user._id,
    });

    if (!result) {
      return NextResponse.json(
        { message: "Favorite not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Event removed from favorites" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error removing favorite:", error);
    return NextResponse.json(
      { message: "Failed to remove favorite" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const user = await User.findOne({
      email: session.user.email.toLowerCase(),
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const favorites = await Favorite.find({ userId: user._id })
      .populate("eventId")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      { message: "Favorites fetched successfully", favorites },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return NextResponse.json(
      { message: "Failed to fetch favorites" },
      { status: 500 }
    );
  }
}
