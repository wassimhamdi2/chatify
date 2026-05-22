import { XIcon, PhoneIcon, VideoIcon, ArrowLeftIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useCallStore } from "../store/useCallStore";
import { useNavigate } from "react-router";

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const { startCall } = useCallStore();
  const navigate = useNavigate();
  const isOnline = onlineUsers.includes(selectedUser._id);

  useEffect(() => {
    const handleEscKey = (e) => { if (e.key === "Escape") setSelectedUser(null); };
    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedUser]);

  return (
    <div
      className="flex justify-between items-center border-b px-3 md:px-6 py-3 md:max-h-[84px] transition-colors"
      style={{
        backgroundColor: "color-mix(in srgb, var(--color-surface) 60%, transparent)",
        borderColor: "var(--color-border)",
      }}
    >
      {/* Left */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Back arrow — mobile only */}
        <button
          className="md:hidden p-1"
          onClick={() => setSelectedUser(null)}
          style={{ color: "var(--color-text-muted)" }}
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </button>

        <div className={`avatar ${isOnline ? "online" : "offline"}`}>
          <div className="w-9 md:w-12 rounded-full">
            <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
          </div>
        </div>
        <div>
          <h3 className="font-medium text-sm md:text-base" style={{ color: "var(--color-text)" }}>
            {selectedUser.fullName}
          </h3>
          <p className="text-xs" style={{ color: isOnline ? "var(--color-primary)" : "var(--color-text-muted)" }}>
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 md:gap-3">
        <button
          onClick={() => startCall(selectedUser, "voice", navigate)}
          title="Voice Call"
          className="w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{ backgroundColor: "color-mix(in srgb, var(--color-primary) 12%, transparent)", color: "var(--color-primary)" }}
        >
          <PhoneIcon className="w-4 h-4" />
        </button>

        <button
          onClick={() => startCall(selectedUser, "video", navigate)}
          title="Video Call"
          className="w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{ backgroundColor: "color-mix(in srgb, var(--color-primary) 12%, transparent)", color: "var(--color-primary)" }}
        >
          <VideoIcon className="w-4 h-4" />
        </button>

        {/* X — desktop only */}
        <button onClick={() => setSelectedUser(null)} className="hidden md:block">
          <XIcon className="w-5 h-5 hover:opacity-80" style={{ color: "var(--color-text-muted)" }} />
        </button>
      </div>
    </div>
  );
}
export default ChatHeader;
