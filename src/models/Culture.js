import mongoose from "mongoose";

const CultureSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
});

export default mongoose.models.Culture || mongoose.model("Culture", CultureSchema);