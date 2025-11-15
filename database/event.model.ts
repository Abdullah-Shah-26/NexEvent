import mongoose, { Schema, Model, Document } from "mongoose";

export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters long"],
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters long"],
    },
    overview: {
      type: String,
      required: [true, "Overview is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
      trim: true,
    },
    venue: {
      type: String,
      required: [true, "Venue is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    date: {
      type: String,
      required: [true, "Date is required"],
    },
    time: {
      type: String,
      required: [true, "Time is required"],
    },
    mode: {
      type: String,
      required: [true, "Mode is required"],
      trim: true,
    },
    audience: {
      type: String,
      required: [true, "Audience is required"],
      trim: true,
    },
    agenda: {
      type: [String],
      required: [true, "Agenda is required"],
      validate: {
        validator: function (arr: string[]) {
          return arr.length > 0;
        },
        message: "Agenda must contain at least one item",
      },
    },
    organizer: {
      type: String,
      required: [true, "Organizer is required"],
      trim: true,
    },
    tags: {
      type: [String],
      required: [true, "Tags are required"],
      validate: {
        validator: function (arr: string[]) {
          return arr.length > 0;
        },
        message: "At least one tag is required",
      },
    },
  },
  {
    timestamps: true,
  }
);

EventSchema.pre("save", async function (next) {
  if (this.isModified("title")) {
    const baseSlug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    let uniqueSlug = baseSlug;
    let counter = 1;

    while (
      await mongoose.models.Event.findOne({
        slug: uniqueSlug,
        _id: { $ne: this._id },
      })
    ) {
      uniqueSlug = `${baseSlug}-${counter}`;
      counter++;
    }

    this.slug = uniqueSlug;
  }

  if (this.isModified("date")) {
    const dateStr = this.date.trim();
    const parsedDate = new Date(dateStr);

    if (isNaN(parsedDate.getTime())) {
      if (!dateStr) {
        return next(new Error("Date cannot be empty"));
      }
    }
  }

  if (this.isModified("time")) {
    this.time = this.time.trim();

    if (!this.time) {
      return next(new Error("Time cannot be empty"));
    }
  }

  next();
});

const Event = (mongoose.models?.Event ||
  mongoose.model<IEvent>("Event", EventSchema)) as Model<IEvent>;

export default Event;
