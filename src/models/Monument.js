import mongoose from "mongoose";

const MonumentSchema = new mongoose.Schema({
  name: String,
  location: String,
  description: String,
  image: String,
  timings: String,
  entryFee: String,
  established: String,
  architect: String,
  architectureStyle: String,
  history: String,
  significance: String,
  gallery: [String] // Array of image URLs
});

export default mongoose.models.Monument || mongoose.model("Monument", MonumentSchema);
