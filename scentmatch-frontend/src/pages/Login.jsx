import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../styles/Login.css";


export default function Login() {

  const navigate = useNavigate();


  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);


  const submit = async (e) => {

    e.preventDefault();


    setError("");


    if (!email.trim() || !password.trim()) {

      setError(
        "Please enter your email and password."
      );

      return;

    }


    try {

      setLoading(true);


      const response = await fetch(

        "http://localhost:8080/api/auth/login",

        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json"

          },

          body: JSON.stringify({

            email: email,

            password: password

          })

        }

      );


      const data =
        await response.json();


      if (!response.ok) {

        throw new Error(

          data.message ||
          "Invalid email or password"

        );

      }


      // =========================
      // SAVE JWT TOKEN
      // =========================

      localStorage.setItem(

        "token",

        data.token

      );


      // =========================
      // SAVE USER DETAILS
      // =========================

      const user = {

        userId: data.userId,

        name: data.name,

        email: data.email,

        role: data.role

      };


      localStorage.setItem(

        "user",

        JSON.stringify(user)

      );


      // =========================
      // REDIRECT
      // =========================

      navigate(
        "/dashboard"
      );


    } catch (error) {

      setError(
        error.message ||
        "Login failed. Please try again."
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="auth-page">


      <div className="auth-background">
      </div>


      <div className="auth-card">


        {/* LOGO */}

        <div className="auth-brand">

          <div className="auth-logo">
            ✦
          </div>


          <div className="auth-brand-text">

            <b>
              ScentMatch
            </b>

            <small>
              AI FRAGRANCE DISCOVERY
            </small>

          </div>

        </div>



        {/* HEADING */}

        <div className="auth-heading">


          <p className="auth-eyebrow">

            WELCOME BACK

          </p>


          <h1>

            Sign in to

            <span>
              {" "}ScentMatch.
            </span>

          </h1>


          <p className="auth-description">

            Continue your journey to discovering
            fragrances that feel uniquely you.

          </p>


        </div>



        {/* FORM */}

        <form onSubmit={submit}>


          {error && (

            <div className="auth-error">

              {error}

            </div>

          )}



          {/* EMAIL */}

          <label>

            Email Address


            <input

              required

              type="email"

              value={email}

              onChange={(e) =>
                setEmail(e.target.value)
              }

              placeholder="you@example.com"

              autoComplete="email"

            />


          </label>



          {/* PASSWORD */}

          <label>

            Password


            <div className="password-wrapper">


              <input

                required

                type={
                  showPassword
                    ? "text"
                    : "password"
                }

                value={password}

                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }

                placeholder="Enter your password"

                autoComplete="current-password"

              />



              <button

                type="button"

                className="password-toggle"

                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }

              >

                {
                  showPassword
                    ? "Hide"
                    : "Show"
                }

              </button>


            </div>


          </label>



          {/* SUBMIT */}

          <button

            type="submit"

            className="auth-submit"

            disabled={loading}

          >

            {
              loading
                ? "Signing in..."
                : "Sign In →"
            }

          </button>


        </form>



        {/* REGISTER */}

        <div className="auth-links">


          <span>

            New to ScentMatch?

          </span>


          <Link to="/register">

            Create account

          </Link>


        </div>



        {/* FOOTER */}

        <p className="auth-footer">

          Discover. Match. Experience.

        </p>


      </div>

    </div>

  );

}