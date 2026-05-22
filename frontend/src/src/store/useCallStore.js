import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { initStreamClient, disconnectStreamClient } from "../lib/stream";

// ringtone audio — created once at module level
const ringtone = new Audio("/sounds/messenger_call.mp3");
ringtone.loop = true; // keep ringing until answered or declined

export const useCallStore = create((set, get) => ({
  streamClient: null,
  callType: null,
  callStatus: null,
  incomingCall: null,

  initStream: async () => {
    const { streamClient } = get();
    if (streamClient) return;

    try {
      const res = await axiosInstance.get("/stream/token");
      const { token, apiKey, userId, userName } = res.data;

      const client = initStreamClient(userId, userName, "", token, apiKey);

      client.on("call.ring", (event) => {
        console.log("📞 Incoming call!", event);
        const { type, id } = event.call;
        const callInstance = client.call(type, id);

        // play ringtone
        ringtone.currentTime = 0;
        ringtone.play().catch((e) => console.log("Ringtone error:", e));

        set({
          incomingCall: callInstance,
          callType: "video",
          callStatus: "incoming",
        });
      });

      set({ streamClient: client });
    } catch (error) {
      console.log("Error initializing Stream:", error);
    }
  },

  startCall: async (targetUser, type, navigate) => {
    const { streamClient } = get();
    if (!streamClient) return;

    try {
      const callId = `call-${Date.now()}`;
      const call = streamClient.call("default", callId);

      await call.getOrCreate({
        ring: true,
        data: {
          members: [{ user_id: targetUser._id.toString() }],
        },
      });

      set({ callType: type, callStatus: "calling" });
      navigate(`/call/${callId}`);
    } catch (error) {
      console.log("Error starting call:", error);
    }
  },

  acceptCall: (navigate) => {
    const { incomingCall } = get();
    if (!incomingCall) return;

    // stop ringtone
    ringtone.pause();
    ringtone.currentTime = 0;

    const callId = incomingCall.id;
    set({ incomingCall: null, callStatus: null, callType: null });
    navigate(`/call/${callId}`);
  },

  declineCall: async () => {
    const { incomingCall } = get();
    if (!incomingCall) return;

    // stop ringtone
    ringtone.pause();
    ringtone.currentTime = 0;

    try {
      await incomingCall.leave();
    } catch (error) {
      console.log("Error declining call:", error);
    }
    set({ incomingCall: null, callStatus: null, callType: null });
  },

  disconnectStream: async () => {
    // stop ringtone just in case
    ringtone.pause();
    ringtone.currentTime = 0;

    await disconnectStreamClient();
    set({ streamClient: null, callStatus: null, incomingCall: null });
  },
}));