import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const Contact = mongoose.models.Contact || mongoose.model("Contact", ContactSchema);

export default Contact;
