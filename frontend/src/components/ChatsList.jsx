import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";
import { useAuthStore } from "../store/useAuthStore";

function ChatsList() {
  const { getMyChatPartners, chats, isUsersLoading, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => { getMyChatPartners(); }, [getMyChatPartners]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;
  if (chats.length === 0) return <NoChatsFound />;

  return (
    <>
      {chats.map((chat) => (
        <div
          key={chat._id}
          className="p-4 rounded-lg cursor-pointer transition-colors"
          style={{ backgroundColor: "color-mix(in srgb, var(--color-primary) 10%, transparent)" }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = "color-mix(in srgb, var(--color-primary) 20%, transparent)"}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = "color-mix(in srgb, var(--color-primary) 10%, transparent)"}
          onClick={() => setSelectedUser(chat)}
        >
          <div className="flex items-center gap-3">
            <div className={`avatar ${onlineUsers.includes(chat._id) ? "online" : "offline"}`}>
              <div className="size-12 rounded-full">
                <img src={chat.profilePic || "/avatar.png"} alt={chat.fullName} />
              </div>
            </div>
            <h4 className="font-medium truncate" style={{ color: "var(--color-text)" }}>{chat.fullName}</h4>
          </div>
        </div>
      ))}
    </>
  );
}
export default ChatsList;
