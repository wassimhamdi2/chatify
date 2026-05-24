import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import {
  StreamVideo, StreamCall,
  CallControls, SpeakerLayout, StreamTheme,
  CallingState, useCallStateHooks,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "../store/useAuthStore";
import { useCallStore } from "../store/useCallStore";
import { getStreamClient } from "../lib/stream";
import PageLoader from "../components/PageLoader";

const CallPage = () => {
  const { id: callId } = useParams();
  const { authUser } = useAuthStore();
  const { clearCallState } = useCallStore();
  const [call, setCall] = useState(null);
  const [isConnecting, setIsConnecting] = useState(true);
  const calleeIdRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const initCall = async () => {
      if (!authUser || !callId) return;

      const client = getStreamClient();
      if (!client) {
        console.log("No stream client available");
        setIsConnecting(false);
        return;
      }

      try {
        // CRITICAL: reuseInstance:true returns the existing Call object
        // already registered in the client store (the one from getOrCreate/accept)
        // instead of creating a brand new instance which causes duplicates
        const callInstance = client.call("default", callId, { reuseInstance: true });

        const state = callInstance.state.callingState;
        console.log("CallPage callingState on entry:", state);

        // Only join if not already joined/joining
        // - Callee: accept() already joined → JOINED, skip
        // - Caller: getOrCreate(ring:true) → RINGING, needs to join
        if (state !== CallingState.JOINED && state !== CallingState.JOINING) {
          await callInstance.join({ create: true });
        }

        // Get the other person's id for saving call history
        const members = callInstance.state?.members || {};
        const otherMember = Object.values(members).find(
          (m) => m.user_id !== authUser._id.toString()
        );
        if (otherMember) calleeIdRef.current = otherMember.user_id;

        setCall(callInstance);
      } catch (error) {
        console.log("Error init call:", error);
      } finally {
        setIsConnecting(false);
      }
    };

    initCall();

    return () => { clearCallState(); };
  }, [authUser, callId, clearCallState]);

  if (isConnecting) return <PageLoader />;

  const client = getStreamClient();

  return (
    <div
      className="h-screen w-screen fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      {client && call ? (
        <StreamVideo client={client}>
          <StreamCall call={call}>
            <CallContent calleeIdRef={calleeIdRef} />
          </StreamCall>
        </StreamVideo>
      ) : (
        <p className="text-white">Could not connect to call. Please try again.</p>
      )}
    </div>
  );
};

const CallContent = ({ calleeIdRef }) => {
  const { useCallCallingState, useCallSession } = useCallStateHooks();
  const callingState = useCallCallingState();
  const session = useCallSession();
  const navigate = useNavigate();
  const savedRef = useRef(false);

  useEffect(() => {
    if (callingState === CallingState.LEFT && !savedRef.current) {
      savedRef.current = true;

      const duration = session?.startedAt
        ? Math.floor((Date.now() - new Date(session.startedAt).getTime()) / 1000)
        : 0;

      const calleeId = calleeIdRef.current;
      if (calleeId) {
        axiosInstance
          .post("/calls/save", { calleeId, status: "answered", duration })
          .catch(() => {});
      }

      navigate("/");
    }
  }, [callingState, navigate, session, calleeIdRef]);

  return (
    <StreamTheme>
      <SpeakerLayout />
      <CallControls />
    </StreamTheme>
  );
};

export default CallPage;