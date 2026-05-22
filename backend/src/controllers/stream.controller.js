import streamClient from "../lib/stream.js";

export const getStreamToken = async (req, res) => {
  try {
    const user = req.user; // already set by your auth middleware

    // create or update the user in Stream
    await streamClient.upsertUsers([
      {
        id: user._id.toString(),
        name: user.fullName,
        image: user.profilePic || "",
      },
    ]);

    // generate token for this user
    const token = streamClient.generateUserToken({
      user_id: user._id.toString(),
    });

    res.status(200).json({
      token,
      apiKey: process.env.STREAM_API_KEY,
      userId: user._id.toString(),
      userName: user.fullName,
    });
  } catch (error) {
    console.log("Error in getStreamToken:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};