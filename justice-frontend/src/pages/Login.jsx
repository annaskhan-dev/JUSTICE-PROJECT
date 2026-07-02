import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import style from "./Login.module.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Pointing absolutely to your local port 5000 backend
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to log in.");
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      console.log("MongoDB Authentication successful:", data);
      navigate("/"); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.pageWrapper}>
      <div className={style.authCard}>
        <div className={style.cardHeader}>
          <h2 className={style.authHeading}>
            Welcome Back to <br />
            <span className={style.justiceText}>Justice</span>
            <span className={style.blueText}>Ease</span>
          </h2>
          <div className={style.headingDivider}></div>
          <p className={style.authSubtext}>
            Securely access your personalized legal dashboard and saved resources.
          </p>
        </div>

        {error && <div className={style.errorMessage}>{error}</div>}

        <form onSubmit={handleLoginSubmit} className={style.authForm}>
          <div className={style.inputGroup}>
            <label htmlFor="email" className={style.inputLabel}>Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email..."
              value={formData.email}
              onChange={handleInputChange}
              className={style.authInput}
              disabled={loading}
              required
            />
          </div>

          <div className={style.inputGroup}>
            <label htmlFor="password" className={style.inputLabel}>Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password..."
              value={formData.password}
              onChange={handleInputChange}
              className={style.authInput}
              disabled={loading}
              required
            />
          </div>

          <button type="submit" className={style.authButton} disabled={loading}>
            {loading ? "Authenticating..." : "Sign In"}
          </button>
        </form>

        <div className={style.authFooter}>
          <p>
            Don't have an account?{" "}
            <Link to="/register" className={style.authLink}>
              Create one here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;