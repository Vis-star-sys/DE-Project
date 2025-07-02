import { serialize } from "cookie";

export async function POST() {
  // Clear the token cookie by setting it to an expired value
  const logoutCookie = serialize("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Only set secure in production
    path: "/",
    sameSite: "lax",
    expires: new Date(0), // Expire immediately
  });

  // Return JSON response with Set-Cookie header
  return new Response(
    JSON.stringify({ message: "Logged out successfully" }),
    {
      status: 200,
      headers: {
        "Set-Cookie": logoutCookie,
        "Content-Type": "application/json",
      },
    }
  );
}
