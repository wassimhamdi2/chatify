import { MessageCircleIcon } from "lucide-react";

const NoConversationPlaceholder = () => (
  <div className="flex flex-col items-center justify-center h-full text-center p-6">
    <div className="size-20 rounded-full flex items-center justify-center mb-6"
      style={{ background: "color-mix(in srgb, var(--color-primary) 20%, transparent)" }}>
      <MessageCircleIcon className="size-10" style={{ color: "var(--color-primary)" }} />
    </div>
    <h3 className="text-xl font-semibold mb-2" style={{ color: "var(--color-text)" }}>Select a conversation</h3>
    <p className="max-w-md" style={{ color: "var(--color-text-muted)" }}>
      Choose a contact from the sidebar to start chatting or continue a previous conversation.
    </p>
  </div>
);
export default NoConversationPlaceholder;
