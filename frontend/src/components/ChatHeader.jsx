import { XIcon, PhoneIcon, VideoIcon, ArrowLeftIcon, Trash2Icon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useCallStore } from "../store/useCallStore";
import { useNavigate } from "react-router";

function ChatHeader() {
  const { selectedUser, setSelectedUser, deleteConversation } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const { startCall } = useCallStore();
  const navigate = useNavigate();
  const isOnline = onlineUsers.includes(selectedUser._id);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const handleEscKey = (e) => { if (e.key === "Escape") setSelectedUser(null); };
    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedUser]);

  const handleDeleteConversation = () => {
    deleteConversation();
    setShowConfirm(false);
  };

  return (
    <>
      <div
        className="flex justify-between items-center border-b px-3 md:px-6 py-3 md:max-h-[84px] transition-colors"
        style={{
          backgroundColor: "color-mix(in srgb, var(--color-surface) 60%, transparent)",
          borderColor: "var(--color-border)",
        }}
      >
        {/* Left */}
        <div className="flex items-center gap-2 md:gap-3">
          <button className="md:hidden p-1" onClick={() => setSelectedUser(null)}
            style={{ color: "var(--color-text-muted)" }}>
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

          {/* Voice call */}
          <button onClick={() => startCall(selectedUser, "voice", navigate)} title="Voice Call"
            className="w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{ backgroundColor: "color-mix(in srgb, var(--color-primary) 12%, transparent)", color: "var(--color-primary)" }}>
            <PhoneIcon className="w-4 h-4" />
          </button>

          {/* Video call */}
          <button onClick={() => startCall(selectedUser, "video", navigate)} title="Video Call"
            className="w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{ backgroundColor: "color-mix(in srgb, var(--color-primary) 12%, transparent)", color: "var(--color-primary)" }}>
            <VideoIcon className="w-4 h-4" />
          </button>

          {/* Delete conversation */}
          <button onClick={() => setShowConfirm(true)} title="Delete Conversation"
            className="w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{ backgroundColor: "color-mix(in srgb, #ef4444 12%, transparent)", color: "#ef4444" }}>
            <Trash2Icon className="w-4 h-4" />
          </button>

          {/* X — desktop only */}
          <button onClick={() => setSelectedUser(null)} className="hidden md:block">
            <XIcon className="w-5 h-5 hover:opacity-80" style={{ color: "var(--color-text-muted)" }} />
          </button>
        </div>
      </div>

      {/* Confirm delete conversation modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowConfirm(false)} />
          <div className="relative z-10 rounded-2xl p-6 shadow-2xl w-80 flex flex-col gap-4"
            style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-red-500/10">
                <Trash2Icon className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="font-bold text-lg" style={{ color: "var(--color-text)" }}>
                Delete Conversation
              </h3>
              <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                This will permanently delete all messages with <b>{selectedUser.fullName}</b>. This cannot be undone.
              </p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowConfirm(false)}
                className="flex-1 py-2 rounded-lg text-sm font-medium transition-colors"
                style={{ backgroundColor: "var(--color-input-bg)", color: "var(--color-text)" }}>
                Cancel
              </button>
              <button onClick={handleDeleteConversation}
                className="flex-1 py-2 rounded-lg text-sm font-medium text-white transition-colors bg-red-500 hover:bg-red-600">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default ChatHeader;
