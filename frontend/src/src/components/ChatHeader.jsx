import { XIcon, PhoneIcon, VideoIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useCallStore } from "../store/useCallStore";
import { useNavigate } from "react-router";

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers, authUser } = useAuthStore();
  const { startCall } = useCallStore();
  const navigate = useNavigate();
  const isOnline = onlineUsers.includes(selectedUser._id);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") setSelectedUser(null);
    };
    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedUser]);

  return (
    <div
      className="flex justify-between items-center border-b max-h-[84px] px-6 flex-1 transition-colors"
      style={{
        backgroundColor: "color-mix(in srgb, var(--color-surface) 60%, transparent)",
        borderColor: "var(--color-border)",
      }}
    >
      {/* Left — avatar + name */}
      <div className="flex items-center space-x-3">
        <div className={`avatar ${isOnline ? "online" : "offline"}`}>
          <div className="w-12 rounded-full">
            <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
          </div>
        </div>
        <div>
          <h3 className="font-medium" style={{ color: "var(--color-text)" }}>
            {selectedUser.fullName}
          </h3>
          <p className="text-sm" style={{ color: isOnline ? "var(--color-primary)" : "var(--color-text-muted)" }}>
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      {/* Right — call buttons + close */}
      <div className="flex items-center gap-3">
        {/* Voice call */}
        <button
          onClick={() => startCall(selectedUser, "voice", navigate)}
          title="Voice Call"
          className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{
            backgroundColor: "color-mix(in srgb, var(--color-primary) 12%, transparent)",
            color: "var(--color-primary)",
          }}
        >
          <PhoneIcon className="w-4 h-4" />
        </button>

        {/* Video call */}
        <button
          onClick={() => startCall(selectedUser, "video", navigate)}
          title="Video Call"
          className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{
            backgroundColor: "color-mix(in srgb, var(--color-primary) 12%, transparent)",
            color: "var(--color-primary)",
          }}
        >
          <VideoIcon className="w-4 h-4" />
        </button>

        {/* Close */}
        <button onClick={() => setSelectedUser(null)}>
          <XIcon
            className="w-5 h-5 transition-colors hover:opacity-80"
            style={{ color: "var(--color-text-muted)" }}
          />
        </button>
      </div>
    </div>
  );
}
export default ChatHeader;
