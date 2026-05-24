import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { PhoneIncomingIcon, PhoneOutgoingIcon, PhoneMissedIcon, PhoneIcon } from "lucide-react";

function formatDuration(seconds) {
  if (!seconds || seconds === 0) return null;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

function formatTime(dateStr) {
  const d = new Date(dateStr);
  const now = new Date();
  const diffMs = now - d;
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffDays === 0) {
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } else if (diffDays === 1) {
    return "Yesterday";
  } else if (diffDays < 7) {
    return d.toLocaleDateString([], { weekday: "short" });
  } else {
    return d.toLocaleDateString([], { month: "short", day: "numeric" });
  }
}

function CallHistory() {
  const { callHistory, isCallHistoryLoading, getCallHistory } = useChatStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    if (getCallHistory) getCallHistory();
  }, [getCallHistory]);

  if (isCallHistoryLoading) {
    return (
      <div className="flex flex-col gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-xl animate-pulse">
            <div className="size-12 rounded-full bg-current opacity-10 flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-3 rounded opacity-10 bg-current w-2/3" />
              <div className="h-2 rounded opacity-10 bg-current w-1/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // If no API for call history yet, show placeholder entries
  const entries = callHistory && callHistory.length > 0 ? callHistory : [];

  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-48 gap-3 opacity-50">
        <PhoneIcon className="size-10" style={{ color: "var(--color-text-muted)" }} />
        <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>No call history yet</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      {entries.map((entry) => {
        const isOutgoing = entry.callerId === authUser?._id;
        const isMissed = entry.status === "missed";
        const otherUser = isOutgoing ? entry.callee : entry.caller;

        let Icon = isOutgoing ? PhoneOutgoingIcon : PhoneIncomingIcon;
        let iconColor = isOutgoing ? "var(--color-primary)" : "var(--color-text)";
        if (isMissed) { Icon = PhoneMissedIcon; iconColor = "#ef4444"; }

        return (
          <div
            key={entry._id}
            className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-150"
            style={{ backgroundColor: "color-mix(in srgb, var(--color-primary) 6%, transparent)" }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = "color-mix(in srgb, var(--color-primary) 15%, transparent)"}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = "color-mix(in srgb, var(--color-primary) 6%, transparent)"}
          >
            {/* Avatar */}
            <div className="size-12 rounded-full overflow-hidden flex-shrink-0">
              <img
                src={otherUser?.profilePic || "/avatar.png"}
                alt={otherUser?.fullName}
                className="size-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate" style={{ color: "var(--color-text)" }}>
                {otherUser?.fullName || "Unknown"}
              </p>
              <div className="flex items-center gap-1 mt-0.5">
                <Icon className="size-3.5 flex-shrink-0" style={{ color: iconColor }} />
                <span className="text-xs" style={{ color: isMissed ? "#ef4444" : "var(--color-text-muted)" }}>
                  {isMissed ? "Missed" : isOutgoing ? "Outgoing" : "Incoming"}
                  {formatDuration(entry.duration) ? ` · ${formatDuration(entry.duration)}` : ""}
                </span>
              </div>
            </div>

            {/* Time */}
            <span className="text-xs flex-shrink-0" style={{ color: "var(--color-text-muted)" }}>
              {formatTime(entry.createdAt)}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default CallHistory;
