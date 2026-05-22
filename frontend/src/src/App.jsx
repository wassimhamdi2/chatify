import { Navigate, Route, Routes } from "react-router";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import CallPage from "./pages/CallPage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import PageLoader from "./components/PageLoader";
import { useThemeStore } from "./store/useThemeStore";
import { Toaster } from "react-hot-toast";
import IncomingCallModal from "./components/IncomingCallModal";

function App() {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();
  const { isDark } = useThemeStore();

  useEffect(() => { checkAuth(); }, [checkAuth]);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  if (isCheckingAuth) return <PageLoader />;

  return (
    <div
      className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden transition-colors duration-300"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f18_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f18_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute top-0 -left-4 size-96 opacity-20 blur-[100px]" style={{ backgroundColor: "var(--color-primary)" }} />
      <div className="absolute bottom-0 -right-4 size-96 opacity-20 blur-[100px]" style={{ backgroundColor: "var(--color-accent)" }} />

      <Routes>
        <Route path="/" element={authUser ? <ChatPage /> : <Navigate to="/login" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/call/:id" element={authUser ? <CallPage /> : <Navigate to="/login" />} />
      </Routes>

      <Toaster />
      <IncomingCallModal />
    </div>
  );
}
export default App;
