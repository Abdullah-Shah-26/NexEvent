import mongoose, { Schema, Model, Document, Types } from "mongoose";

export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event ID is required"],
      index: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      index: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address",
      ],
    },
  },
  {
    timestamps: true,
  }
);

BookingSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("eventId")) {
    try {
      const EventModel = mongoose.models.Event;

      if (!EventModel) {
        return next(
          new Error("Event model not found. Ensure Event model is registered.")
        );
      }

      const eventExists = await EventModel.findById(this.eventId)
        .select("_id")
        .lean();

      if (!eventExists) {
        return next(new Error(`Event with ID ${this.eventId} does not exist`));
      }
    } catch (error) {
      return next(error as Error);
    }
  }

  next();
});

const Booking = (mongoose.models?.Booking ||
  mongoose.model<IBooking>("Booking", BookingSchema)) as Model<IBooking>;

export default Booking;
