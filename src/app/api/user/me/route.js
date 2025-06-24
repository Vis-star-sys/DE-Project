import { connectToDB } from "@/utils/db";
import User from "@/models/User";
import { getTokenFromHeader, verifyToken } from "@/utils/Helper/jwt";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import { Readable } from "stream";

// ✅ Required config for file parsing
export const config = {
  api: {
    bodyParser: false,
  },
};

// ✅ Convert Web ReadableStream to Node.js Readable stream
function streamToNodeStream(stream) {
  const reader = stream.getReader();
  return new Readable({
    async read() {
      const { done, value } = await reader.read();
      if (done) this.push(null);
      else this.push(value);
    },
  });
}

// ✅ GET: Fetch user details
export async function GET(req) {
  await connectToDB();

  try {
    const token = getTokenFromHeader(req);
    if (!token) return new Response(JSON.stringify({ error: "No token" }), { status: 401 });

    const decoded = verifyToken(token);
    const user = await User.findOne({ userId: decoded.userId }).select("-password");

    if (!user) return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
}

// ✅ PUT: Update profile with image
export async function PUT(req) {
  await connectToDB();

  try {
    const token = getTokenFromHeader(req);
    if (!token) return new Response(JSON.stringify({ error: "No token" }), { status: 401 });

    const decoded = verifyToken(token);
    const userId = decoded.userId;

    // Convert to node stream for formidable
    const nodeReq = streamToNodeStream(req.body);

    const form = formidable({
      multiples: false,
      keepExtensions: true,
      uploadDir: path.join(process.cwd(), "/public/uploads"),
    });

    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(nodeReq, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    const { name, email, contact } = fields;
    let imageUrl = null;

    if (files.image) {
      const image = files.image;
      const fileName = `${Date.now()}-${image.originalFilename || image.newFilename}`;
      const newPath = path.join(process.cwd(), "public/uploads", fileName);

      fs.renameSync(image.filepath, newPath);
      imageUrl = `/uploads/${fileName}`;
    }

    const updatedUser = await User.findOneAndUpdate(
      { userId },
      {
        name,
        email,
        contact,
        ...(imageUrl && { image: imageUrl }),
      },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (err) {
    console.error("Update profile error:", err);
    return new Response(JSON.stringify({ error: "Update failed" }), { status: 500 });
  }
}
