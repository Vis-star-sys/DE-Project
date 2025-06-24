import mongoose from "mongoose";

const HeroImageSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
});

export default mongoose.models.HeroImage || mongoose.model("HeroImage", HeroImageSchema);
