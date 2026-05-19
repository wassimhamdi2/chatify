import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import { useAuthStore } from "../store/useAuthStore";

function ContactList() {
  const { getAllContacts, allContacts, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => { getAllContacts(); }, [getAllContacts]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;

  return (
    <>
      {allContacts.map((contact) => (
        <div
          key={contact._id}
          className="p-4 rounded-lg cursor-pointer transition-colors"
          style={{ backgroundColor: "color-mix(in srgb, var(--color-primary) 10%, transparent)" }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = "color-mix(in srgb, var(--color-primary) 20%, transparent)"}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = "color-mix(in srgb, var(--color-primary) 10%, transparent)"}
          onClick={() => setSelectedUser(contact)}
        >
          <div className="flex items-center gap-3">
            <div className={`avatar ${onlineUsers.includes(contact._id) ? "online" : "offline"}`}>
              <div className="size-12 rounded-full">
                <img src={contact.profilePic || "/avatar.png"} />
              </div>
            </div>
            <h4 className="font-medium" style={{ color: "var(--color-text)" }}>{contact.fullName}</h4>
          </div>
        </div>
      ))}
    </>
  );
}
export default ContactList;
