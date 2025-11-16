import mongoose, { Schema, Model, Document, Types } from "mongoose";

export interface IFavorite extends Document {
  eventId: Types.ObjectId;
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const FavoriteSchema = new Schema<IFavorite>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event ID is required"],
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to ensure a user can only favorite an event once
FavoriteSchema.index({ eventId: 1, userId: 1 }, { unique: true });

const Favorite = (mongoose.models?.Favorite ||
  mongoose.model<IFavorite>("Favorite", FavoriteSchema)) as Model<IFavorite>;

export default Favorite;
