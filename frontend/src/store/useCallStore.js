import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { initStreamClient, disconnectStreamClient } from "../lib/stream";
import toast from "react-hot-toast";

const CALL_TIMEOUT_MS = 30000;

export const useCallStore = create((set, get) => ({
  streamClient: null,
  callType: null,
  callStatus: null,   // "calling" | "incoming" | null
  incomingCall: null,
  outgoingCall: null,
  outgoingCallee: null,
  callTimeoutId: null,
  navigateRef: null,

  initStream: async () => {
    const { streamClient } = get();
    if (streamClient) return;

    try {
      const res = await axiosInstance.get("/stream/token");
      const { token, apiKey, userId, userName } = res.data;

      const client = initStreamClient(userId, userName, "", token, apiKey);

      // Someone is calling us
      client.on("call.ring", (event) => {
        // Ignore if we are already in a call or already have an incoming call
        const { callStatus } = get();
        if (callStatus) return;

        const { type, id } = event.call;
        const callInstance = client.call(type, id);
        set({ incomingCall: callInstance, callType: "video", callStatus: "incoming" });
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
        data: { members: [{ user_id: targetUser._id.toString() }] },
      });

      // Callee accepted → navigate to call screen
      call.on("call.accepted", () => {
        const { callStatus, callTimeoutId, navigateRef } = get();
        if (callStatus !== "calling") return;

        if (callTimeoutId) clearTimeout(callTimeoutId);
        set({ callTimeoutId: null, callStatus: null, outgoingCall: null });
        if (navigateRef) navigateRef(`/call/${callId}`);
      });

      // Callee declined → close waiting screen, show toast
      call.on("call.rejected", () => {
        const { callStatus, callTimeoutId, outgoingCallee, outgoingCall } = get();
        if (callStatus !== "calling" || !outgoingCall || outgoingCall.id !== callId) return;

        if (callTimeoutId) clearTimeout(callTimeoutId);

        toast.error("User is busy. Please try again later.", { duration: 4000, icon: "📵" });

        if (outgoingCallee) {
          axiosInstance.post("/calls/save", {
            calleeId: outgoingCallee._id,
            status: "missed",
            duration: 0,
          }).catch(() => {});
        }

        set({ outgoingCall: null, outgoingCallee: null, callStatus: null, callType: null, callTimeoutId: null });
      });

      // 30s timeout — also notify callee to dismiss their incoming modal
      const timeoutId = setTimeout(async () => {
        const { outgoingCall, outgoingCallee, callStatus } = get();
        if (!outgoingCall || outgoingCall.id !== callId || callStatus !== "calling") return;

        try {
          // reject() tells the callee's ring event to dismiss too
          await call.reject();
        } catch (_) {}

        toast.error("No answer. Please try again later.", { duration: 4000, icon: "📵" });

        if (outgoingCallee) {
          axiosInstance.post("/calls/save", {
            calleeId: outgoingCallee._id,
            status: "missed",
            duration: 0,
          }).catch(() => {});
        }

        set({ outgoingCall: null, outgoingCallee: null, callStatus: null, callType: null, callTimeoutId: null });
      }, CALL_TIMEOUT_MS);

      set({
        callType: type,
        callStatus: "calling",
        outgoingCall: call,
        outgoingCallee: targetUser,
        callTimeoutId: timeoutId,
        navigateRef: navigate,
      });

    } catch (error) {
      console.log("Error starting call:", error);
    }
  },

  // Caller cancels manually from waiting screen
  cancelCall: async () => {
    const { outgoingCall, callTimeoutId, outgoingCallee } = get();
    if (callTimeoutId) clearTimeout(callTimeoutId);
    if (outgoingCall) {
      // reject() dismisses the incoming modal on callee's side too
      try { await outgoingCall.reject(); } catch (_) {}
    }
    if (outgoingCallee) {
      axiosInstance.post("/calls/save", {
        calleeId: outgoingCallee._id,
        status: "missed",
        duration: 0,
      }).catch(() => {});
    }
    set({ outgoingCall: null, outgoingCallee: null, callStatus: null, callType: null, callTimeoutId: null });
  },

  acceptCall: (navigate) => {
    const { incomingCall } = get();
    if (!incomingCall) return;
    const callId = incomingCall.id;
    // Notify the caller that call was accepted
    incomingCall.accept().catch(() => {});
    set({ incomingCall: null, callStatus: null, callType: null });
    navigate(`/call/${callId}`);
  },

  declineCall: async () => {
    const { incomingCall } = get();
    if (!incomingCall) return;
    try {
      const members = incomingCall.state?.members || {};
      const caller = Object.values(members).find(
        (m) => m.user_id !== incomingCall.currentUserId
      );
      if (caller) {
        axiosInstance.post("/calls/save", {
          calleeId: caller.user_id,
          status: "missed",
          duration: 0,
        }).catch(() => {});
      }
      // reject() sends proper rejection signal to caller
      await incomingCall.reject();
    } catch (error) {
      console.log("Error declining call:", error);
    }
    set({ incomingCall: null, callStatus: null, callType: null });
  },

  // Called when callee's ring is cancelled by caller timeout/cancel
  dismissIncomingCall: () => {
    set({ incomingCall: null, callStatus: null, callType: null });
  },

  clearCallState: () => {
    const { callTimeoutId } = get();
    if (callTimeoutId) clearTimeout(callTimeoutId);
    set({ incomingCall: null, callStatus: null, callType: null, outgoingCall: null, outgoingCallee: null, callTimeoutId: null });
  },

  disconnectStream: async () => {
    const { callTimeoutId } = get();
    if (callTimeoutId) clearTimeout(callTimeoutId);
    await disconnectStreamClient();
    set({ streamClient: null, callStatus: null, incomingCall: null, outgoingCall: null, outgoingCallee: null, callTimeoutId: null });
  },
}));