import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import budgetTrackerLogo from "../assets/loginLogo.png";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { loginThunk } from "../store/thunk/auth/auth.thunk";

import "./Login.css"; // Include animations, themes, and switch styles

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  // const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [globalError, setGlobalError] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();
  // const { login } = useAuth();

  useEffect(() => {
    const timeout = setTimeout(() => setFadeIn(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    setGlobalError("");

    let hasError = false;
    if (!email.trim()) {
      setEmailError("Email is required");
      hasError = true;
    }
    if (!password.trim()) {
      setPasswordError("Password is required");
      hasError = true;
    }
    if (hasError) return;

    try {
      const data = {
        identifier: email,
        password: password,
      };
      // const success = dispatch(loginThunk(data));
      const success = await dispatch(loginThunk(data));

      if (loginThunk.fulfilled.match(success)) {
        // console.log("Login successful:", success);
        const result = success.payload;
        if (result.success === true) {
          console.log("Login result:", result);
          const token = result.data.token;
          const userName = result.data.user.name;
          localStorage.setItem("userName", userName);
          localStorage.setItem("authToken", token);
          console.log(result.data.user, "user");
          navigate("/");
        }

        // login(result.payload); // Call the login function from AuthContext
      }
    } catch (error) {
      console.log("Login error:", error);
      setGlobalError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div
      className={`min-vh-100 position-relative d-flex align-items-center justify-content-center px-3 ${
        darkMode ? "dark-mode bg-dark" : "bg-light-interactive"
      }`}
    >
      {/* Theme Toggle Switch */}
      <div className="position-absolute top-0 end-0 m-3 d-flex align-items-center gap-2">
        <span className="text-muted small">{darkMode ? "🌙" : "🌞"}</span>
        <label className="theme-switch">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode((prev) => !prev)}
          />
          <span className="slider" />
        </label>
      </div>

      <div
        className={`card border-0 rounded-4 shadow-lg p-0 ${
          fadeIn ? "animate__animated animate__fadeInDown" : ""
        }`}
        style={{
          width: "100%",
          maxWidth: "420px",
          animationDuration: "0.8s",
          transition: "transform 0.3s ease-in-out",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.015)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <div className="card-body p-5 text-center">
          <img
            src={budgetTrackerLogo}
            alt="Budget Tracker Logo"
            style={{
              width: "80px",
              height: "80px",
              marginBottom: "16px",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
          <p className="text-muted mb-4 fs-5">Budget Tracker</p>

          {globalError && (
            <div className="alert alert-danger text-center py-2">
              {globalError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="text-start">
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-medium">
                Email
              </label>
              <input
                type="email"
                className="form-control rounded-3"
                id="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && (
                <div className="text-danger mt-1">{emailError}</div>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="form-label fw-medium">
                Password
              </label>
              <div className="position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control rounded-3 pe-5"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {passwordError && (
                <div className="text-danger mt-1">{passwordError}</div>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 rounded-3 fw-semibold login-slide-btn"
              style={{
                transition: "background-color 0.3s ease, transform 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.02)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              Login
            </button>

            <div className="text-center mt-3">
              <small className="text-muted">
                Don't have an account?{" "}
                <button
                  type="button"
                  className="btn btn-link p-0 text-decoration-none"
                  onClick={() => navigate("/register")}
                >
                  Register here
                </button>
              </small>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
