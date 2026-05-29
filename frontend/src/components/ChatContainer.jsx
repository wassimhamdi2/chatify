import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";
import { MoreVerticalIcon, Trash2Icon } from "lucide-react";

function ChatContainer() {
const {
  selectedUser, getMessagesByUserId, messages,
  isMessagesLoading, subscribeToMessages, unsubscribeFromMessages,
  deleteMessage, sendMessage, // ← add sendMessage
} = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
  const [openMenuId, setOpenMenuId] = useState(null);

  useEffect(() => {
    getMessagesByUserId(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser, getMessagesByUserId, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // close menu when clicking outside
  useEffect(() => {
    const handleClick = () => setOpenMenuId(null);
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <ChatHeader />
      <div className="flex-1 px-3 md:px-6 overflow-y-auto py-4 md:py-8">
        {messages.length > 0 && !isMessagesLoading ? (
          <div className="max-w-3xl mx-auto space-y-4 md:space-y-6">
            {messages.map((msg) => {
              const isMe = msg.senderId === authUser._id;
              return (
                <div key={msg._id} className={`chat ${isMe ? "chat-end" : "chat-start"} group`}>
                  <div className="relative flex items-center gap-1">

                    {/* 3-dot menu — only for sender, shown on hover */}
                    {isMe && (
                      <div className={`${isMe ? "order-first" : "order-last"} relative`}>
                        <button
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full"
                          style={{ color: "var(--color-text-muted)" }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenuId(openMenuId === msg._id ? null : msg._id);
                          }}
                        >
                          <MoreVerticalIcon className="w-4 h-4" />
                        </button>

                        {openMenuId === msg._id && (
                          <div
                            className="absolute bottom-full mb-1 right-0 rounded-lg shadow-lg z-10 py-1 min-w-[120px]"
                            style={{
                              backgroundColor: "var(--color-surface)",
                              border: "1px solid var(--color-border)",
                            }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              onClick={() => { deleteMessage(msg._id); setOpenMenuId(null); }}
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:opacity-80 transition-opacity text-red-500"
                            >
                              <Trash2Icon className="w-4 h-4" />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Message bubble */}
                    <div
                      className="chat-bubble"
                      style={{
                        backgroundColor: isMe ? "var(--color-bubble-me)" : "var(--color-bubble-other)",
                        color: isMe ? "#fff" : "var(--color-bubble-other-text)",
                      }}
                    >
                      {msg.image && (
                        <img src={msg.image} alt="Shared"
                          className="rounded-lg max-h-48 w-full object-cover" />
                      )}
                      {msg.text && <p className="mt-1 text-sm md:text-base">{msg.text}</p>}
                      <p className="text-xs mt-1 opacity-75">
                        {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                          hour: "2-digit", minute: "2-digit",
                        })}
                      </p>
                    </div>

                  </div>
                </div>
              );
            })}
            <div ref={messageEndRef} />
          </div>
        ) : isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : (
          <NoChatHistoryPlaceholder
            name={selectedUser.fullName}
            onSend={(text) => sendMessage({ text, image: null })}
          />
        )}
      </div>
      <MessageInput />
    </div>
  );
}
export default ChatContainer;
