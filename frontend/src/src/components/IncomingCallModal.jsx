import { PhoneIcon, PhoneOffIcon, VideoIcon } from "lucide-react";
import { useCallStore } from "../store/useCallStore";
import { useNavigate } from "react-router";

function IncomingCallModal() {
  const { callStatus, incomingCall, callType, acceptCall, declineCall } = useCallStore();
  const navigate = useNavigate();

  if (callStatus !== "incoming" || !incomingCall) return null;

  const caller = incomingCall.state?.members?.find(
    (m) => m.user_id !== incomingCall.currentUserId
  )?.user || incomingCall.state?.members?.[0]?.user;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative z-10 rounded-2xl p-8 flex flex-col items-center gap-5 shadow-2xl w-80"
        style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}
      >
        <div className="relative">
          <div
            className="absolute inset-0 rounded-full animate-ping opacity-30"
            style={{ backgroundColor: "var(--color-primary)" }}
          />
          <img
            src={caller?.image || "/avatar.png"}
            alt={caller?.name}
            className="relative w-20 h-20 rounded-full object-cover border-4"
            style={{ borderColor: "var(--color-primary)" }}
          />
        </div>

        <div className="text-center">
          <p className="text-sm mb-1" style={{ color: "var(--color-text-muted)" }}>
            Incoming {callType === "video" ? "Video" : "Voice"} Call
          </p>
          <h3 className="text-xl font-bold" style={{ color: "var(--color-text)" }}>
            {caller?.name || "Unknown"}
          </h3>
        </div>

        <div className="flex gap-8 mt-2">
          <button onClick={declineCall} className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-full flex items-center justify-center bg-red-500 hover:bg-red-600 transition-colors">
              <PhoneOffIcon className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>Decline</span>
          </button>

          <button onClick={() => acceptCall(navigate)} className="flex flex-col items-center gap-2">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center transition-colors hover:opacity-90"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              {callType === "video"
                ? <VideoIcon className="w-6 h-6 text-white" />
                : <PhoneIcon className="w-6 h-6 text-white" />
              }
            </div>
            <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>Accept</span>
          </button>
        </div>
      </div>
    </div>
  );
}
export default IncomingCallModal;
