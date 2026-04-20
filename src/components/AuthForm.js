import { useState, useEffect } from "react";
import "./AuthForm.css";

// Props:
//   isOpen      — boolean, controls visibility
//   initialMode — 'signin' | 'signup', which panel to show first
//   onClose     — callback to close the modal

export default function AuthModal({ isOpen, initialMode = 'signin', onClose }) {
  const [isSignUp, setIsSignUp] = useState(initialMode === 'signup');

  const [signInData, setSignInData] = useState({ email: "", password: "" });
  const [signUpData, setSignUpData] = useState({ name: "", email: "", password: "" });

  // Sync panel when parent changes initialMode (e.g. Login vs Sign Up button)
  useEffect(() => {
    setIsSignUp(initialMode === 'signup');
  }, [initialMode, isOpen]); // reset panel each time modal opens

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log("Sign In:", signInData);
    // TODO: your auth logic here
  };

  const handleSignUp = async (e) => {
  e.preventDefault()  // stop default form submission

  try {
    const res = await fetch('http://localhost:3000/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(signUpData),
    })

    const data = await res.json()
    console.log('Server response:', data)
    alert('Signup sent to server!')
    onClose()  // close popup
  } catch (err) {
    console.error(err)
    alert('Signup failed')
  }
}

  if (!isOpen) return null;

  return (
    <div
      className="auth-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`auth-container ${isSignUp ? "right-panel-active" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* X close button */}
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>

        {/* ── testing ── */}
        <div className="form-container sign-up-container">
          <form onSubmit={handleSignUp} className="auth-form">
            <h1 className="form-title">Create Account</h1>
            <div className="social-row">
              <a href="#" className="social-btn" aria-label="Google">G</a>
              <a href="#" className="social-btn" aria-label="Facebook">f</a>
            </div>
            <span className="or-divider">or use your email</span>
            <input
              className="auth-input"
              type="text"
              placeholder="Name"
              value={signUpData.name}
              onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}
              required
            />
            <input
              className="auth-input"
              type="email"
              placeholder="Email"
              value={signUpData.email}
              onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
              required
            />
            <input
              className="auth-input"
              type="password"
              placeholder="Password"
              value={signUpData.password}
              onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
              required
            />
            <button type="submit" className="auth-btn">Sign Up</button>
          </form>
        </div>

        {/* ── Sign In Form ── */}
        <div className="form-container sign-in-container">
          <form onSubmit={handleSignIn} className="auth-form">
            <h1 className="form-title">Sign In</h1>
            <div className="social-row">
              <a href="#" className="social-btn" aria-label="Google">G</a>
              <a href="#" className="social-btn" aria-label="Facebook">f</a>
            </div>
            <span className="or-divider">or use your account</span>
            <input
              className="auth-input"
              type="email"
              placeholder="Email"
              value={signInData.email}
              onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
              required
            />
            <input
              className="auth-input"
              type="password"
              placeholder="Password"
              value={signInData.password}
              onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
              required
            />
            <a href="#" className="forgot-link">Forgot your password?</a>
            <button type="submit" className="auth-btn">Sign In</button>
          </form>
        </div>

        {/* ── Sliding Overlay ── */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="overlay-title">Welcome Back!</h1>
              <p className="overlay-text">
                To keep connected with us please login with your personal info
              </p>
              <button className="auth-btn ghost" onClick={() => setIsSignUp(false)}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="overlay-title">Hello, Friend!</h1>
              <p className="overlay-text">
                Enter your personal details and start your journey with us
              </p>
              <button className="auth-btn ghost" onClick={() => setIsSignUp(true)}>
                Sign Up
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}