import { useRef, useState } from "react";
import useKeyboardSound from "../hooks/useKeyboardSound";
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";
import { ImageIcon, SendIcon, XIcon } from "lucide-react";

function MessageInput() {
  const { playRandomKeyStrokeSound } = useKeyboardSound();
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage, isSoundEnabled } = useChatStore();

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    if (isSoundEnabled) playRandomKeyStrokeSound();
    sendMessage({ text: text.trim(), image: imagePreview });
    setText("");
    setImagePreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) { toast.error("Please select an image file"); return; }
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="p-2 md:p-4 border-t transition-colors" style={{ borderColor: "var(--color-border)" }}>
      {imagePreview && (
        <div className="max-w-3xl mx-auto mb-2 md:mb-3 flex items-center">
          <div className="relative">
            <img src={imagePreview} alt="Preview"
              className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg border"
              style={{ borderColor: "var(--color-border)" }} />
            <button onClick={removeImage} type="button"
              className="absolute -top-2 -right-2 w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center text-white"
              style={{ backgroundColor: "var(--color-secondary)" }}>
              <XIcon className="w-3 h-3 md:w-4 md:h-4" />
            </button>
          </div>
        </div>
      )}
      <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto flex gap-2 md:gap-4">
        <input
          type="text"
          value={text}
          onChange={(e) => { setText(e.target.value); isSoundEnabled && playRandomKeyStrokeSound(); }}
          className="flex-1 rounded-lg py-2 px-3 md:px-4 text-sm md:text-base border transition-colors"
          style={{ backgroundColor: "var(--color-input-bg)", borderColor: "var(--color-border)", color: "var(--color-text)" }}
          placeholder="Type your message..."
        />
        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} className="hidden" />
        <button type="button" onClick={() => fileInputRef.current?.click()}
          className="rounded-lg px-3 md:px-4 transition-colors hover:opacity-80"
          style={{ backgroundColor: "var(--color-input-bg)", color: imagePreview ? "var(--color-primary)" : "var(--color-text-muted)" }}>
          <ImageIcon className="w-4 h-4 md:w-5 md:h-5" />
        </button>
        <button type="submit" disabled={!text.trim() && !imagePreview}
          className="text-white rounded-lg px-3 md:px-4 py-2 font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: "var(--color-primary)" }}>
          <SendIcon className="w-4 h-4 md:w-5 md:h-5" />
        </button>
      </form>
    </div>
  );
}
export default MessageInput;
