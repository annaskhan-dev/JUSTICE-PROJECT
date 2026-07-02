import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./Register.module.css";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const { fullName, email, password } = formData;

      // Pointing absolutely to your local port 5000 backend
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // mapping 'fullName' from state to the 'name' field required by backend User model
        body: JSON.stringify({ name: fullName, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed.");
      }

      setSuccess(true);
      console.log("User successfully saved into MongoDB:", data);
      
      setTimeout(() => {
        navigate("/login");
      }, 2000);

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
            Join <br />
            <span className={style.justiceText}>Justice</span>
            <span className={style.blueText}>Ease</span>
          </h2>
          <div className={style.headingDivider}></div>
          <p className={style.authSubtext}>
            Create an account to track legal documents and research articles safely.
          </p>
        </div>

        {error && <div className={style.errorMessage}>{error}</div>}
        {success && <div className={style.successMessage}>Account created successfully! Redirecting...</div>}

        <form onSubmit={handleRegisterSubmit} className={style.authForm}>
          <div className={style.inputGroup}>
            <label htmlFor="fullName" className={style.inputLabel}>Full Name</label>
            <input
              type="text"
              id="fullName"
              placeholder="Enter your full name..."
              value={formData.fullName}
              onChange={handleInputChange}
              className={style.authInput}
              disabled={loading || success}
              required
            />
          </div>

          <div className={style.inputGroup}>
            <label htmlFor="email" className={style.inputLabel}>Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email address..."
              value={formData.email}
              onChange={handleInputChange}
              className={style.authInput}
              disabled={loading || success}
              required
            />
          </div>

          <div className={style.inputGroup}>
            <label htmlFor="password" className={style.inputLabel}>Password</label>
            <input
              type="password"
              id="password"
              placeholder="Create a password..."
              value={formData.password}
              onChange={handleInputChange}
              className={style.authInput}
              disabled={loading || success}
              required
            />
          </div>

          <div className={style.inputGroup}>
            <label htmlFor="confirmPassword" className={style.inputLabel}>Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Repeat your password..."
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={style.authInput}
              disabled={loading || success}
              required
            />
          </div>

          <button type="submit" className={style.authButton} disabled={loading || success}>
            {loading ? "Creating Record..." : "Create Account"}
          </button>
        </form>

        <div className={style.authFooter}>
          <p>
            Already have an account?{" "}
            <Link to="/login" className={style.authLink}>
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;