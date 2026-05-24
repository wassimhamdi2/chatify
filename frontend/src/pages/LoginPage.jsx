import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { MailIcon, LoaderIcon, LockIcon } from "lucide-react";
import { Link } from "react-router";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="w-full flex items-center justify-center p-2 md:p-4 min-h-screen md:min-h-0"
      style={{ backgroundColor: "var(--color-bg)" }}>
      <div className="relative w-full max-w-6xl md:h-[800px]">
        <BorderAnimatedContainer>
          <div className="w-full flex flex-col md:flex-row min-h-screen md:min-h-0">

            {/* FORM */}
            <div
              className="w-full md:w-1/2 p-6 md:p-8 flex items-center justify-center md:border-r transition-colors"
              style={{ borderColor: "var(--color-border)" }}
            >
              <div className="w-full max-w-md">
                <div className="text-center mb-6 md:mb-8">
                  <img src="/logo2.png" alt="Hkeya logo" className="w-39 h-39 md:w-42 md:h-42  mx-auto mb-3 md:mb-4 object-contain" />
                  <h2 className="text-xl md:text-2xl font-bold mb-2" style={{ color: "var(--color-text)" }}>
                    Welcome Back
                  </h2>
                  <p className="text-sm md:text-base" style={{ color: "var(--color-text-muted)" }}>
                    Login to access your account
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  <div>
                    <label className="auth-input-label">Email</label>
                    <div className="relative">
                      <MailIcon className="auth-input-icon" />
                      <input type="email" value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="input" placeholder="johndoe@gmail.com" />
                    </div>
                  </div>
                  <div>
                    <label className="auth-input-label">Password</label>
                    <div className="relative">
                      <LockIcon className="auth-input-icon" />
                      <input type="password" value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="input" placeholder="Enter your password" />
                    </div>
                  </div>
                  <button className="auth-btn" type="submit" disabled={isLoggingIn}>
                    {isLoggingIn ? <LoaderIcon className="w-full h-5 animate-spin text-center" /> : "Sign In"}
                  </button>
                </form>

                <div className="mt-4 md:mt-6 text-center">
                  <Link to="/signup" className="auth-link">Don't have an account? Sign Up</Link>
                </div>
              </div>
            </div>

            {/* ILLUSTRATION — desktop only */}
            <div
              className="hidden md:w-1/2 md:flex items-center justify-center p-6 transition-colors"
              style={{ background: "linear-gradient(to bottom left, color-mix(in srgb, var(--color-surface) 40%, transparent), transparent)" }}
            >
              <div>
                <img src="/login.png" alt="Login illustration" className="w-full h-auto object-contain" />
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-medium" style={{ color: "var(--color-primary)" }}>
                    Connect anytime, anywhere
                  </h3>
                  <div className="mt-4 flex justify-center gap-4">
                    <span className="auth-badge">Free</span>
                    <span className="auth-badge">Easy Setup</span>
                    <span className="auth-badge">Private</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}
export default LoginPage;
