"use server";
import Event from "../../database/event.model";
import connectDB from "../mongoose";

export const getSimilarEventsBySlug = async (slug: string) => {
  try {
    await connectDB();

    const event = await Event.findOne({ slug }).lean();

    if (!event) return [];

    return await Event.find({
      _id: { $ne: event._id },
      tags: { $in: event.tags },
    })
      .limit(6)
      .lean();
  } catch {
    return [];
  }
};
