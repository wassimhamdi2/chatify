import { MessageSquareIcon, UserIcon, PhoneIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

const tabs = [
  { key: "chats",    label: "Chats",    Icon: MessageSquareIcon },
  { key: "contacts", label: "Contacts", Icon: UserIcon },
  { key: "calls",    label: "Calls",    Icon: PhoneIcon },
];

function ActiveTabSwitch() {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <nav className="flex flex-col px-3 py-2 gap-1">
      {tabs.map(({ key, label, Icon }) => {
        const isActive = activeTab === key;
        return (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 w-full"
            style={
              isActive
                ? {
                    backgroundColor: "color-mix(in srgb, var(--color-primary) 18%, transparent)",
                    color: "var(--color-primary)",
                    fontWeight: 600,
                  }
                : {
                    color: "var(--color-text-muted)",
                    backgroundColor: "transparent",
                  }
            }
            onMouseEnter={e => {
              if (!isActive) e.currentTarget.style.backgroundColor = "color-mix(in srgb, var(--color-primary) 8%, transparent)";
            }}
            onMouseLeave={e => {
              if (!isActive) e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <Icon className="size-5 flex-shrink-0" />
            <span className="text-sm">{label}</span>
          </button>
        );
      })}
    </nav>
  );
}

export default ActiveTabSwitch;
