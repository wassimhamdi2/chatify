import { useState, useRef } from "react";
import { LogOutIcon, VolumeOffIcon, Volume2Icon, SunIcon, MoonIcon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { useThemeStore } from "../store/useThemeStore";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

function ProfileHeader() {
  const { logout, authUser, updateProfile } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();
  const { isDark, toggleTheme } = useThemeStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="p-6 border-b transition-colors" style={{ borderColor: "var(--color-border)" }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="avatar online">
            <button
              className="size-14 rounded-full overflow-hidden relative group"
              onClick={() => fileInputRef.current.click()}
            >
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="User image"
                className="size-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-white text-xs">Change</span>
              </div>
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
          <div>
            <h3 className="font-medium text-base max-w-[150px] truncate" style={{ color: "var(--color-text)" }}>
              {authUser.fullName}
            </h3>
            <p className="text-xs" style={{ color: "var(--color-primary)" }}>Online</p>
          </div>
        </div>

        <div className="flex gap-3 items-center">
          {/* DARK MODE TOGGLE */}
          <button
            className="transition-colors hover:opacity-80"
            style={{ color: "var(--color-text-muted)" }}
            onClick={toggleTheme}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <SunIcon className="size-5" /> : <MoonIcon className="size-5" />}
          </button>

          {/* SOUND TOGGLE */}
          <button
            className="transition-colors hover:opacity-80"
            style={{ color: "var(--color-text-muted)" }}
            onClick={() => {
              mouseClickSound.currentTime = 0;
              mouseClickSound.play().catch((err) => console.log("Audio play failed:", err));
              toggleSound();
            }}
          >
            {isSoundEnabled ? <Volume2Icon className="size-5" /> : <VolumeOffIcon className="size-5" />}
          </button>

          {/* LOGOUT */}
          <button
            className="transition-colors hover:opacity-80"
            style={{ color: "var(--color-text-muted)" }}
            onClick={logout}
          >
            <LogOutIcon className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
export default ProfileHeader;
