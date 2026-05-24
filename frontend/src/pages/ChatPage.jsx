import { useChatStore } from "../store/useChatStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import CallHistory from "../components/CallHistory";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();

  const renderSidebarContent = () => {
    if (activeTab === "chats") return <ChatsList />;
    if (activeTab === "contacts") return <ContactList />;
    if (activeTab === "calls") return <CallHistory />;
    return null;
  };

  return (
    <div className="relative w-full max-w-6xl h-[800px]">
      <BorderAnimatedContainer>
        {/* LEFT SIDE */}
        <div
          className="w-80 backdrop-blur-sm flex flex-col transition-colors"
          style={{ backgroundColor: "color-mix(in srgb, var(--color-surface) 60%, transparent)" }}
        >
          <ProfileHeader />
          <ActiveTabSwitch />

          {/* Divider */}
          <div className="mx-4 mb-2" style={{ height: "1px", backgroundColor: "var(--color-border)" }} />

          <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-1">
            {renderSidebarContent()}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div
          className="flex-1 flex flex-col backdrop-blur-sm transition-colors"
          style={{ backgroundColor: "color-mix(in srgb, var(--color-bg) 60%, transparent)" }}
        >
          {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
        </div>
      </BorderAnimatedContainer>
    </div>
  );
}

export default ChatPage;
