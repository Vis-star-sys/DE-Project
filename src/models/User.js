import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  userId: { type: String, unique: true },
  email: String,
  contact: String,
  password: String,
});

export default mongoose.models.User || mongoose.model("User", userSchema);
