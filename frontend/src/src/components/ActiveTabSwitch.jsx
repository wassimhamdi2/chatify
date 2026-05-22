import { useChatStore } from "../store/useChatStore";

function ActiveTabSwitch() {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <div className="tabs tabs-boxed bg-transparent p-2 m-2">
      <button
        onClick={() => setActiveTab("chats")}
        className="tab transition-colors"
        style={
          activeTab === "chats"
            ? { backgroundColor: "color-mix(in srgb, var(--color-primary) 15%, transparent)", color: "var(--color-primary)" }
            : { color: "var(--color-text-muted)" }
        }
      >
        Chats
      </button>
      <button
        onClick={() => setActiveTab("contacts")}
        className="tab transition-colors"
        style={
          activeTab === "contacts"
            ? { backgroundColor: "color-mix(in srgb, var(--color-primary) 15%, transparent)", color: "var(--color-primary)" }
            : { color: "var(--color-text-muted)" }
        }
      >
        Contacts
      </button>
    </div>
  );
}
export default ActiveTabSwitch;
