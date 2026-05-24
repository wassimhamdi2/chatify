import Call from "../models/Call.js";

// GET /api/calls/history
export const getCallHistory = async (req, res) => {
  try {
    const myId = req.user._id;

    const calls = await Call.find({
      $or: [{ callerId: myId }, { calleeId: myId }],
    })
      .populate("callerId", "fullName profilePic")
      .populate("calleeId", "fullName profilePic")
      .sort({ createdAt: -1 });

    // Shape the response to match what the frontend expects
    const shaped = calls.map((call) => ({
      _id: call._id,
      callerId: call.callerId._id,
      caller: call.callerId,
      callee: call.calleeId,
      status: call.status,
      duration: call.duration,
      createdAt: call.createdAt,
    }));

    res.status(200).json(shaped);
  } catch (error) {
    console.log("Error in getCallHistory:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/calls/save
export const saveCall = async (req, res) => {
  try {
    const callerId = req.user._id;
    const { calleeId, status, duration } = req.body;

    if (!calleeId || !status) {
      return res.status(400).json({ message: "calleeId and status are required" });
    }

    const call = await Call.create({ callerId, calleeId, status, duration: duration || 0 });

    res.status(201).json(call);
  } catch (error) {
    console.log("Error in saveCall:", error);
    res.status(500).json({ message: "Server error" });
  }
};
