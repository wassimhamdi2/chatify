import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  StreamVideo, StreamVideoClient, StreamCall,
  CallControls, SpeakerLayout, StreamTheme,
  CallingState, useCallStateHooks,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "../store/useAuthStore";
import PageLoader from "../components/PageLoader";

const CallPage = () => {
  const { id: callId } = useParams();
  const { authUser } = useAuthStore();
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [isConnecting, setIsConnecting] = useState(true);

  useEffect(() => {
    const initCall = async () => {
      if (!authUser || !callId) return;
      try {
        const res = await axiosInstance.get("/stream/token");
        const { token, apiKey } = res.data;

        const videoClient = new StreamVideoClient({
          apiKey,
          user: {
            id: authUser._id.toString(),
            name: authUser.fullName,
            image: authUser.profilePic || "",
          },
          token,
        });

        const callInstance = videoClient.call("default", callId);
        await callInstance.join({ create: true });

        setClient(videoClient);
        setCall(callInstance);
      } catch (error) {
        console.log("Error init call:", error);
      } finally {
        setIsConnecting(false);
      }
    };

    initCall();
  }, [authUser, callId]);

  if (isConnecting) return <PageLoader />;

  return (
    <div className="h-screen w-screen fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ backgroundColor: "#0a0a0a" }}>
      {client && call ? (
        <StreamVideo client={client}>
          <StreamCall call={call}>
            <CallContent />
          </StreamCall>
        </StreamVideo>
      ) : (
        <p className="text-white">Could not connect to call. Please try again.</p>
      )}
    </div>
  );
};

const CallContent = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const navigate = useNavigate();

  useEffect(() => {
    if (callingState === CallingState.LEFT) {
      navigate("/");
    }
  }, [callingState, navigate]);

  return (
    <StreamTheme>
      <SpeakerLayout />
      <CallControls />
    </StreamTheme>
  );
};

export default CallPage;
