import { MessageCircleIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

function NoChatsFound() {
  const { setActiveTab } = useChatStore();
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
      <div className="w-16 h-16 rounded-full flex items-center justify-center"
        style={{ background: "color-mix(in srgb, var(--color-primary) 10%, transparent)" }}>
        <MessageCircleIcon className="w-8 h-8" style={{ color: "var(--color-primary)" }} />
      </div>
      <div>
        <h4 className="font-medium mb-1" style={{ color: "var(--color-text)" }}>No conversations yet</h4>
        <p className="text-sm px-6" style={{ color: "var(--color-text-muted)" }}>
          Start a new chat by selecting a contact from the contacts tab
        </p>
      </div>
      <button
        onClick={() => setActiveTab("contacts")}
        className="px-4 py-2 text-sm rounded-lg transition-colors"
        style={{
          color: "var(--color-primary)",
          backgroundColor: "color-mix(in srgb, var(--color-primary) 10%, transparent)"
        }}
      >
        Find contacts
      </button>
    </div>
  );
}
export default NoChatsFound;
