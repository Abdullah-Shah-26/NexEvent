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
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
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

BookingSchema.index({ eventId: 1 });
BookingSchema.index({ email: 1 });
BookingSchema.index({ eventId: 1, email: 1 });

const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;
