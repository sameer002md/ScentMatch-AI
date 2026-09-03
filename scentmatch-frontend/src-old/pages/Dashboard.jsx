import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

function Dashboard() {

  const navigate = useNavigate();


  // ================= LOGOUT =================

  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/login");

  };


  return (

    <div className="dashboard-page">


      {/* ================= NAVBAR ================= */}

      <nav className="dashboard-navbar">


        <div
          className="dashboard-logo"
          onClick={() => navigate("/dashboard")}
        >

          <div className="logo-icon">
            ✦
          </div>


          <div>

            <h1>ScentMatch</h1>

            <p>
              AI FRAGRANCE EXPERIENCE
            </p>

          </div>

        </div>



        <div className="nav-actions">


          {/* AI ASSISTANT */}

          <button
            className="nav-ai-btn"
            onClick={() => navigate("/ai-assistant")}
          >
            ✨ Ask AI
          </button>


          {/* EXPLORE PERFUMES */}

          <button
            className="nav-explore-btn"
            onClick={() => navigate("/perfumes")}
          >
            Explore Perfumes
          </button>


          {/* FAVORITES */}

          <button
            className="nav-favorites-btn"
            onClick={() => navigate("/favorites")}
          >
            ♥ Favorites
          </button>


          {/* LOGOUT */}

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>


        </div>

      </nav>



      {/* ================= HERO ================= */}

      <section className="dashboard-hero">


        {/* HERO CONTENT */}

        <div className="hero-content">


          <div className="welcome-tag">
            ✨ AI POWERED FRAGRANCE DISCOVERY
          </div>



          <h2>

            Discover a fragrance

            <span>
              made for you.
            </span>

          </h2>



          <p>

            ScentMatch uses your personal preferences to discover
            fragrances that perfectly match your personality,
            lifestyle and special moments.

          </p>



          {/* HERO BUTTONS */}

          <div className="hero-buttons">


            {/* QUIZ */}

            <button
              className="primary-btn"
              onClick={() =>
                navigate("/scentmatch-quiz")
              }
            >

              Find My Perfect Scent

              <span>
                →
              </span>

            </button>



            {/* AI ASSISTANT */}

            <button
              className="ai-assistant-btn"
              onClick={() =>
                navigate("/ai-assistant")
              }
            >

              ✨ Ask ScentMatch AI

            </button>



            {/* EXPLORE */}

            <button
              className="secondary-btn"
              onClick={() =>
                navigate("/perfumes")
              }
            >

              Explore Collection

            </button>


          </div>



          {/* HERO STATS */}

          <div className="hero-stats">


            <div>

              <h3>
                30+
              </h3>

              <p>
                Premium Perfumes
              </p>

            </div>



            <div>

              <h3>
                AI
              </h3>

              <p>
                Smart Matching
              </p>

            </div>



            <div>

              <h3>
                100%
              </h3>

              <p>
                Personalized
              </p>

            </div>


          </div>


        </div>



        {/* ================= HERO VISUAL ================= */}

        <div className="hero-visual">


          <div className="glow glow-one"></div>

          <div className="glow glow-two"></div>



          <div className="perfume-display">


            {/* AI MATCH CARD */}

            <div className="floating-card card-one">

              <span>
                ✨
              </span>


              <div>

                <small>
                  AI MATCH
                </small>

                <strong>
                  95%
                </strong>

              </div>

            </div>



            {/* PERFUME BOTTLE */}

            <div className="perfume-bottle">


              <div className="bottle-cap"></div>



              <div className="bottle-body">


                <div className="bottle-logo">
                  S
                </div>


                <h3>
                  SCENT
                </h3>


                <p>
                  MATCH
                </p>


              </div>


            </div>



            {/* STYLE CARD */}

            <div className="floating-card card-two">


              <span>
                🌸
              </span>


              <div>

                <small>
                  YOUR STYLE
                </small>

                <strong>
                  Woody
                </strong>

              </div>


            </div>


          </div>


        </div>


      </section>



      {/* ================= FEATURES ================= */}

      <section className="features-section">


        <div className="section-heading">


          <div>


            <p className="section-label">
              YOUR SCENT JOURNEY
            </p>



            <h2>

              Everything you need to

              <span>
                find your signature scent.
              </span>

            </h2>


          </div>


        </div>



        <div className="dashboard-grid">



          {/* ================= AI SCENT ASSISTANT ================= */}

          <div
            className="dashboard-card ai-dashboard-card"
            onClick={() =>
              navigate("/ai-assistant")
            }
          >


            <div className="card-icon ai-icon">
              ✨
            </div>



            <div className="card-content">


              <span className="card-tag">
                CONVERSATIONAL AI
              </span>



              <h3>
                Ask ScentMatch AI
              </h3>



              <p>

                Describe your perfect fragrance in your own words.
                Tell our AI your budget, favorite notes, occasion,
                style or fragrance preferences.

              </p>


            </div>



            <div className="card-arrow">
              →
            </div>


          </div>



          {/* ================= FIND MY SCENT ================= */}

          <div
            className="dashboard-card featured-card"
            onClick={() =>
              navigate("/scentmatch-quiz")
            }
          >


            <div className="card-icon">
              ✨
            </div>



            <div className="card-content">


              <span className="card-tag">
                AI RECOMMENDATION
              </span>



              <h3>
                Find My Perfect Scent
              </h3>



              <p>

                Answer a few questions and let our AI
                discover fragrances perfectly matched
                to your preferences.

              </p>


            </div>



            <div className="card-arrow">
              →
            </div>


          </div>



          {/* ================= FAVORITES ================= */}

          <div
            className="dashboard-card"
            onClick={() =>
              navigate("/favorites")
            }
          >


            <div className="card-icon pink-icon">
              ♥
            </div>



            <div className="card-content">


              <span className="card-tag">
                YOUR COLLECTION
              </span>



              <h3>
                My Favorites
              </h3>



              <p>

                Access the fragrances you've saved
                and keep track of your personal
                scent collection.

              </p>


            </div>



            <div className="card-arrow">
              →
            </div>


          </div>



          {/* ================= EXPLORE PERFUMES ================= */}

          <div
            className="dashboard-card"
            onClick={() =>
              navigate("/perfumes")
            }
          >


            <div className="card-icon purple-icon">
              ◈
            </div>



            <div className="card-content">


              <span className="card-tag">
                DISCOVER
              </span>



              <h3>
                Explore Perfumes
              </h3>



              <p>

                Browse our fragrance collection and
                discover new scents from premium
                perfume brands.

              </p>


            </div>



            <div className="card-arrow">
              →
            </div>


          </div>



          {/* ================= PREFERENCES ================= */}

          <div
            className="dashboard-card"
            onClick={() =>
              navigate("/scentmatch-quiz")
            }
          >


            <div className="card-icon orange-icon">
              ⚙
            </div>



            <div className="card-content">


              <span className="card-tag">
                PERSONALIZATION
              </span>



              <h3>
                Update Preferences
              </h3>



              <p>

                Update your fragrance preferences
                anytime and receive better AI
                recommendations.

              </p>


            </div>



            <div className="card-arrow">
              →
            </div>


          </div>


        </div>


      </section>



      {/* ================= AI CTA ================= */}

      <section className="ai-dashboard-cta">


        <div className="ai-cta-content">


          <div className="ai-cta-icon">
            ✨
          </div>



          <div>


            <span className="ai-cta-label">
              SCENTMATCH AI ASSISTANT
            </span>



            <h2>
              Tell us what you're looking for.
            </h2>



            <p>

              Looking for a fresh citrus perfume under ₹10,000?
              Need a powerful fragrance for a special occasion?
              Simply describe it and let ScentMatch AI help you.

            </p>


          </div>



          <button
            className="ai-cta-button"
            onClick={() =>
              navigate("/ai-assistant")
            }
          >

            Ask AI Assistant

            <span>
              ✨
            </span>


          </button>


        </div>


      </section>



      {/* ================= CTA ================= */}

      <section className="dashboard-cta">


        <div className="cta-content">


          <span>
            ✦
          </span>



          <h2>

            Ready to discover your

            <strong>
              signature fragrance?
            </strong>

          </h2>



          <p>

            Let ScentMatch AI understand your preferences
            and find the fragrances that truly represent you.

          </p>



          <button
            onClick={() =>
              navigate("/scentmatch-quiz")
            }
          >

            Start Your Scent Journey

            <span>
              →
            </span>


          </button>


        </div>


      </section>



      {/* ================= FOOTER ================= */}

      <footer className="dashboard-footer">


        <div className="footer-logo">


          <strong>
            ScentMatch
          </strong>



          <span>
            AI-Powered Fragrance Discovery
          </span>


        </div>



        <p>
          © 2026 ScentMatch. Discover your perfect fragrance.
        </p>


      </footer>


    </div>

  );

}

export default Dashboard;