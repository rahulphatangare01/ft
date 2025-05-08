import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import budgetTrackerLogo from "../assets/loginLogo.png";
import "./Login.css"; // Reuse the same CSS used for login
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { registrationThunk } from "../store/thunk/auth/auth.thunk";

const Register: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [fadeIn, setFadeIn] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => setFadeIn(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    let data: any = { ...formData };
    delete data.confirmPassword;

    dispatch(registrationThunk(data));

    // Placeholder for register logic
    console.log("Registered:", data);
    navigate("/login");
  };

  return (
    <div
      className={`min-vh-100 position-relative d-flex flex-column justify-content-between px-3 ${
        darkMode ? "dark-mode bg-dark" : "bg-light-interactive"
      }`}
    >
      {/* Theme Toggle */}
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

      <div className="d-flex align-items-center justify-content-center flex-grow-1">
        <div
          className={`card border-0 rounded-4 shadow-lg p-0 mx-auto ${
            fadeIn ? "animate__animated animate__fadeInDown" : ""
          }`}
          style={{
            width: "100%",
            maxWidth: "500px",
            animationDuration: "0.8s",
            transition: "transform 0.3s ease-in-out",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.015)")
          }
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
                display: "flex",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
            <p className="text-muted mb-4 fs-5">Budget Tracker</p>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit} className="text-start">
              <div className="mb-3">
                <label htmlFor="name" className="form-label fw-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  className="form-control rounded-3"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="form-control rounded-3"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="mobileNo" className="form-label fw-medium">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  id="mobileNo"
                  placeholder="Enter your mobile number"
                  className="form-control rounded-3"
                  value={formData.mobileNo}
                  onChange={(e) =>
                    setFormData({ ...formData, mobileNo: e.target.value })
                  }
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label fw-medium">
                  Password
                </label>
                <div className="position-relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control rounded-3 pe-5"
                    id="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
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
              </div>

              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="form-label fw-medium"
                >
                  Confirm Password
                </label>
                <div className="position-relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="form-control rounded-3 pe-5"
                    id="confirmPassword"
                    placeholder="Enter your confirm password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
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
                Register
              </button>

              <div className="text-center mt-3">
                <small className="text-muted">
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="btn btn-link p-0 text-decoration-none"
                    onClick={() => navigate("/login")}
                  >
                    Login here
                  </button>
                </small>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
