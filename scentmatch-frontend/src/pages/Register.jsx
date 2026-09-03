import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Register.css";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

    setError("");
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!form.email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!form.password.trim()) {
      setError("Please create a password.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      /*
        Registration API can be connected here later.

        Example:
        await registerUser(form);
      */

      // Temporary frontend registration
      localStorage.setItem(
        "scentmatchUser",
        JSON.stringify({
          name: form.name,
          email: form.email
        })
      );

      navigate("/dashboard");

    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        {/* LOGO */}

        <div className="auth-logo">
          ✦
        </div>


        {/* HEADING */}

        <p>
          START YOUR JOURNEY
        </p>

        <h1>
          Create your
          <span> ScentMatch.</span>
        </h1>

        <div className="auth-description">
          Discover fragrances that match your
          personality, mood and lifestyle.
        </div>


        {/* ERROR MESSAGE */}

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}


        {/* FORM */}

        <form onSubmit={submit}>

          <label>
            Name

            <input
              required
              type="text"
              name="name"
              value={form.name}
              onChange={change}
              placeholder="Your name"
              autoComplete="name"
            />

          </label>


          <label>
            Email

            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={change}
              placeholder="you@example.com"
              autoComplete="email"
            />

          </label>


          <label>
            Password

            <input
              required
              type="password"
              name="password"
              value={form.password}
              onChange={change}
              placeholder="Create password"
              autoComplete="new-password"
            />

          </label>


          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Account →"
            }
          </button>

        </form>


        {/* LOGIN LINK */}

        <div className="auth-links">

          Already have an account?

          <Link to="/login">
            Sign in
          </Link>

        </div>

      </div>

    </div>
  );
}