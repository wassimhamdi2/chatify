import { PhoneOffIcon } from "lucide-react";
import { useCallStore } from "../store/useCallStore";

function WaitingCallScreen() {
  const { callStatus, outgoingCallee, cancelCall } = useCallStore();

  if (callStatus !== "calling" || !outgoingCallee) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative z-10 rounded-2xl p-8 flex flex-col items-center gap-5 shadow-2xl w-80"
        style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}
      >
        {/* Pulsing avatar */}
        <div className="relative">
          <div
            className="absolute inset-0 rounded-full animate-ping opacity-25"
            style={{ backgroundColor: "var(--color-primary)" }}
          />
          <img
            src={outgoingCallee.profilePic || "/avatar.png"}
            alt={outgoingCallee.fullName}
            className="relative w-20 h-20 rounded-full object-cover border-4"
            style={{ borderColor: "var(--color-primary)" }}
          />
        </div>

        {/* Name + status */}
        <div className="text-center">
          <h3 className="text-xl font-bold mb-1" style={{ color: "var(--color-text)" }}>
            {outgoingCallee.fullName}
          </h3>
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            Calling...
          </p>
        </div>

        {/* Cancel button */}
        <button onClick={cancelCall} className="flex flex-col items-center gap-2 mt-2">
          <div className="w-14 h-14 rounded-full flex items-center justify-center bg-red-500 hover:bg-red-600 transition-colors">
            <PhoneOffIcon className="w-6 h-6 text-white" />
          </div>
          <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>Cancel</span>
        </button>
      </div>
    </div>
  );
}

export default WaitingCallScreen;
