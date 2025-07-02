import mongoose from "mongoose";

const cultureSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    history: {
      type: String,
    },
    significance: {
      type: String,
    },
    gallery: {
      type: [String], // Array of image URLs
    },
  },
  { timestamps: true }
);

export default mongoose.models.Culture || mongoose.model("Culture", cultureSchema);
