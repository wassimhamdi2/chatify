import { MessageCircleIcon } from "lucide-react";

const NoChatHistoryPlaceholder = ({ name, onSend }) => (
  <div className="flex flex-col items-center justify-center h-full text-center p-6">
    <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
      style={{ background: "color-mix(in srgb, var(--color-primary) 15%, transparent)" }}>
      <MessageCircleIcon className="size-8" style={{ color: "var(--color-primary)" }} />
    </div>
    <h3 className="text-lg font-medium mb-3" style={{ color: "var(--color-text)" }}>
      Start your conversation with {name}
    </h3>
    <div className="flex flex-col space-y-3 max-w-md mb-5">
      <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
        This is the beginning of your conversation. Send a message to start chatting!
      </p>
      <div className="h-px w-32 mx-auto"
        style={{ background: "linear-gradient(to right, transparent, var(--color-primary), transparent)", opacity: 0.4 }} />
    </div>
    <div className="flex flex-wrap gap-2 justify-center">
      {["👋 Hello", "🤝 How are you?", "📅 Meet up soon?"].map((label) => (
        <button key={label}
          onClick={() => onSend(label)}
          className="px-4 py-2 text-xs font-medium rounded-full transition-colors hover:opacity-80"
          style={{
            color: "var(--color-primary)",
            backgroundColor: "color-mix(in srgb, var(--color-primary) 10%, transparent)"
          }}
        >
          {label}
        </button>
      ))}
    </div>
  </div>
);
export default NoChatHistoryPlaceholder;