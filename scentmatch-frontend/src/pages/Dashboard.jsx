import { Link, useNavigate } from "react-router-dom";

import "../styles/Dashboard.css";


export default function Dashboard() {

  const navigate = useNavigate();


  // ================= GET LOGGED-IN USER =================

  const user = JSON.parse(
    localStorage.getItem("user")
  );


  // ================= CHECK ADMIN =================

  const isAdmin =
    user?.role === "ADMIN";


  // ================= LOGOUT =================

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");

  };


  return (

    <div className="dashboard-page">


      {/* ================= NAVBAR ================= */}

      <nav className="main-nav">


        {/* ================= BRAND ================= */}

        <Link
          className="brand"
          to="/dashboard"
        >

          <span className="brand-mark">
            ✦
          </span>


          <span className="brand-text">

            <b>
              ScentMatch
            </b>

            <small>
              AI FRAGRANCE DISCOVERY
            </small>

          </span>

        </Link>



        {/* ================= NAVIGATION LINKS ================= */}

        <div className="nav-links">


          <Link to="/dashboard">
            Home
          </Link>


          <Link to="/perfumes">
            Explore
          </Link>


          <Link to="/favorites">
            Favorites
          </Link>


          <button
            className="nav-ai-link"
            onClick={() =>
              navigate("/ai-assistant")
            }
          >
            AI Assistant
          </button>


        </div>



        {/* ================= NAVBAR ACTIONS ================= */}

        <div className="nav-actions">


          {/* ================= ADMIN PANEL ================= */}

          {isAdmin && (

            <button
              className="nav-admin"
              onClick={() =>
                navigate("/admin")
              }
            >

              Admin Panel

            </button>

          )}


          {/* ================= LOGOUT ================= */}

          <button
            className="logout-btn"
            onClick={handleLogout}
          >

            Logout

          </button>


        </div>


      </nav>



      <main>


        {/* ================= HERO SECTION ================= */}

        <section className="hero-section">


          {/* ================= HERO TEXT ================= */}

          <div className="hero-copy">


            <p className="eyebrow">

              ✦ YOUR PERSONAL FRAGRANCE COMPANION

            </p>


            <h1>

              Find a fragrance

              <br />

              that feels

              <span>
                {" "}like you.
              </span>

            </h1>


            <p className="hero-text">

              Discover exceptional fragrances and let ScentMatch
              understand your personality, mood and lifestyle to
              recommend scents made for you.

            </p>



            {/* ================= HERO BUTTONS ================= */}

            <div className="hero-actions">


              <button
                className="primary-btn"
                onClick={() =>
                  navigate("/scentmatch-quiz")
                }
              >

                ✦ Start ScentMatch Quiz

              </button>


              <button
                className="secondary-btn"
                onClick={() =>
                  navigate("/perfumes")
                }
              >

                Explore Collection →

              </button>


            </div>



            {/* ================= QUICK STATS ================= */}

            <div className="hero-stats">


              <div>

                <b>
                  32+
                </b>

                <span>
                  Fragrances
                </span>

              </div>



              <div>

                <b>
                  AI
                </b>

                <span>
                  Powered Matching
                </span>

              </div>



              <div>

                <b>
                  3
                </b>

                <span>
                  Ways to Discover
                </span>

              </div>


            </div>


          </div>



          {/* ================= HERO VISUAL ================= */}

          <div className="hero-art">


            <div className="hero-bg-circle"></div>


            <div className="glow-orb"></div>



            {/* ================= PERFUME BOTTLE ================= */}

            <div className="perfume-bottle">


              <div className="bottle-cap"></div>


              <div className="bottle-neck"></div>



              <div className="bottle-label">


                <span>
                  SCENT
                </span>


                <strong>
                  MATCH
                </strong>


                <small>
                  AI FRAGRANCE
                </small>


              </div>


            </div>



            {/* ================= FLOATING NOTES ================= */}

            <span className="float-note note-1">
              ✦ Citrus
            </span>


            <span className="float-note note-2">
              ✦ Woody
            </span>


            <span className="float-note note-3">
              ✦ Vanilla
            </span>


            <span className="float-note note-4">
              ✦ Musk
            </span>


          </div>


        </section>



        {/* ================= HOW IT WORKS ================= */}

        <section className="feature-strip">


          {/* ================= STEP 1 ================= */}

          <div className="feature-step">


            <span className="step-number">
              01
            </span>


            <div>

              <h3>
                Discover
              </h3>


              <p>

                Browse a curated collection
                of exceptional fragrances.

              </p>


            </div>


          </div>



          {/* ================= STEP 2 ================= */}

          <div className="feature-step">


            <span className="step-number">
              02
            </span>


            <div>

              <h3>
                Match
              </h3>


              <p>

                Let AI understand your
                preferences and personality.

              </p>


            </div>


          </div>



          {/* ================= STEP 3 ================= */}

          <div className="feature-step">


            <span className="step-number">
              03
            </span>


            <div>

              <h3>
                Save
              </h3>


              <p>

                Keep your favorite fragrances
                in one personal collection.

              </p>


            </div>


          </div>


        </section>



        {/* ================= DISCOVERY SECTION ================= */}

        <section className="dashboard-section-heading">


          <p>

            DISCOVER YOUR PERFECT SCENT

          </p>


          <h2>

            Three ways to find

            <span>
              {" "}your fragrance.
            </span>

          </h2>


        </section>



        {/* ================= FEATURE CARDS ================= */}

        <section className="dashboard-cards">



          {/* ================= AI ASSISTANT ================= */}

          <article
            className="dashboard-card"
            onClick={() =>
              navigate("/ai-assistant")
            }
          >


            <div className="card-top">


              <div className="card-icon">
                ✦
              </div>


              <span>
                AI POWERED
              </span>


            </div>


            <h2>
              AI Scent Assistant
            </h2>


            <p>

              Tell the AI what you like and
              discover fragrance profiles
              tailored to your mood and style.

            </p>


            <button
              onClick={(e) => {

                e.stopPropagation();

                navigate("/ai-assistant");

              }}
            >

              Ask AI →

            </button>


          </article>



          {/* ================= QUIZ ================= */}

          <article
            className="dashboard-card"
            onClick={() =>
              navigate("/scentmatch-quiz")
            }
          >


            <div className="card-top">


              <div className="card-icon">
                ◈
              </div>


              <span>
                PERSONALIZED
              </span>


            </div>


            <h2>
              Preference Quiz
            </h2>


            <p>

              Answer questions about your
              fragrance preferences and let
              ScentMatch find your ideal scent.

            </p>


            <button
              onClick={(e) => {

                e.stopPropagation();

                navigate("/scentmatch-quiz");

              }}
            >

              Take Quiz →

            </button>


          </article>



          {/* ================= FAVORITES ================= */}

          <article
            className="dashboard-card"
            onClick={() =>
              navigate("/favorites")
            }
          >


            <div className="card-top">


              <div className="card-icon">
                ♥
              </div>


              <span>
                YOUR COLLECTION
              </span>


            </div>


            <h2>
              Your Favorites
            </h2>


            <p>

              Keep track of the fragrances
              you love and build your own
              personal scent collection.

            </p>


            <button
              onClick={(e) => {

                e.stopPropagation();

                navigate("/favorites");

              }}
            >

              View Favorites →

            </button>


          </article>


        </section>



        {/* ================= FINAL CTA ================= */}

        <section className="dashboard-cta">


          <div>


            <p>

              READY TO FIND YOUR SCENT?

            </p>


            <h2>

              Your next signature fragrance
              is waiting.

            </h2>


          </div>



          <button
            onClick={() =>
              navigate("/perfumes")
            }
          >

            Explore Perfumes →

          </button>


        </section>


      </main>


    </div>

  );

}