import { useChatStore } from "../store/useChatStore";

function ActiveTabSwitch() {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <div className="flex border-b flex-shrink-0 transition-colors"
      style={{ borderColor: "var(--color-border)" }}>
      {["chats", "contacts"].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className="flex-1 py-3 text-sm font-medium capitalize transition-colors border-b-2"
          style={{
            borderColor: activeTab === tab ? "var(--color-primary)" : "transparent",
            color: activeTab === tab ? "var(--color-primary)" : "var(--color-text-muted)",
            backgroundColor: "transparent",
          }}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
export default ActiveTabSwitch;
