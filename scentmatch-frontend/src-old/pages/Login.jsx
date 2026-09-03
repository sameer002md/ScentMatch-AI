import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/api";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await loginUser(formData);

      console.log("Login Response:", data);

      // Get JWT token from backend response
      const token =
        data.token ||
        data.jwt ||
        data.accessToken;

      if (!token) {
        throw new Error(
          "Login successful but JWT token was not returned by the backend."
        );
      }

      // Save JWT token
      localStorage.setItem("token", token);

      // Optional: save user information
      if (data.email) {
        localStorage.setItem("email", data.email);
      }

      // Navigate after successful login
      navigate("/dashboard");

    } catch (err) {
      console.error("Login Error:", err);

      setError(
        err.message || "Login failed. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h1>ScentMatch</h1>

        <p className="subtitle">
          AI-Powered Perfume Recommendation
        </p>

        <form onSubmit={handleSubmit}>

          <div className="input-group">

            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </div>


          <div className="input-group">

            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />

          </div>


          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

        </form>


        {error && (
          <p className="error">
            {error}
          </p>
        )}


        <p className="switch-auth">

          Don't have an account?{" "}

          <Link to="/register">
            Create Account
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;