import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Recommendations.css";

function Recommendations() {

  const location = useLocation();

  const navigate = useNavigate();


  // ==========================================
  // GET DATA FROM SCENTMATCH QUIZ
  // ==========================================

  const recommendations =
    location.state?.recommendations || [];

  const preferences =
    location.state?.preferences || {};


  // ==========================================
  // IF USER OPENS PAGE DIRECTLY
  // ==========================================

  if (recommendations.length === 0) {

    return (

      <div className="recommendations-page">

        <div className="no-results-container">

          <h1>
            No Recommendations Found
          </h1>

          <p>
            Please complete the ScentMatch quiz
            to get your personalized perfume
            recommendations.
          </p>

          <button
            className="quiz-again-btn"
            onClick={() =>
              navigate("/scentmatch-quiz")
            }
          >
            Take the Quiz
          </button>

        </div>

      </div>

    );

  }


  // ==========================================
  // GET MATCH LEVEL
  // ==========================================

  const getMatchLabel = (score) => {

    if (score >= 85) {
      return "Excellent Match";
    }

    if (score >= 70) {
      return "Great Match";
    }

    if (score >= 50) {
      return "Good Match";
    }

    return "Possible Match";

  };


  // ==========================================
  // GET MATCH CLASS
  // ==========================================

  const getMatchClass = (score) => {

    if (score >= 85) {
      return "excellent-match";
    }

    if (score >= 70) {
      return "great-match";
    }

    if (score >= 50) {
      return "good-match";
    }

    return "possible-match";

  };


  return (

    <div className="recommendations-page">


      {/* ================= NAVBAR ================= */}

      <nav className="recommendations-navbar">


        <div
          className="recommendations-logo"
          onClick={() =>
            navigate("/dashboard")
          }
        >

          <div className="recommendations-logo-icon">
            ✦
          </div>


          <div>

            <h2>
              ScentMatch
            </h2>

            <p>
              AI FRAGRANCE EXPERIENCE
            </p>

          </div>

        </div>


        <div className="recommendations-nav-actions">


          <button
            onClick={() =>
              navigate("/dashboard")
            }
          >
            Dashboard
          </button>


          <button
            onClick={() =>
              navigate("/perfumes")
            }
          >
            Explore
          </button>


          <button
            className="retake-nav-btn"
            onClick={() =>
              navigate("/scentmatch-quiz")
            }
          >
            Retake Quiz
          </button>


        </div>


      </nav>



      {/* ================= HEADER ================= */}

      <section className="recommendations-hero">


        <div className="recommendations-badge">

          ✨ AI ANALYSIS COMPLETE

        </div>


        <h1>

          Your perfect scents
          <span> are waiting.</span>

        </h1>


        <p>

          Based on your personal preferences,
          ScentMatch analyzed our fragrance
          collection to find your best matches.

        </p>


        <div className="preferences-summary">


          {preferences.gender && (

            <div className="preference-pill">

              👤 {preferences.gender}

            </div>

          )}


          {preferences.fragranceFamily && (

            <div className="preference-pill">

              🌸 {preferences.fragranceFamily}

            </div>

          )}


          {preferences.season && (

            <div className="preference-pill">

              🌤️ {preferences.season}

            </div>

          )}


          {preferences.occasion && (

            <div className="preference-pill">

              🎯 {preferences.occasion}

            </div>

          )}


          {preferences.budget && (

            <div className="preference-pill">

              💰 ₹{preferences.budget}

            </div>

          )}


        </div>


      </section>



      {/* ================= RESULTS ================= */}

      <section className="results-section">


        <div className="results-heading">


          <div>

            <p>
              PERSONALIZED FOR YOU
            </p>


            <h2>

              Your Top
              <span> Matches</span>

            </h2>

          </div>


          <div className="results-count">

            {recommendations.length}

            {" "}

            fragrances found

          </div>


        </div>



        {/* ================= PERFUME GRID ================= */}

        <div className="recommendations-grid">


          {recommendations.map(

            (perfume, index) => (

              <div
                className="recommendation-card"
                key={perfume.perfumeId}
              >


                {/* RANK */}

                <div className="perfume-rank">

                  #{index + 1}

                </div>



                {/* IMAGE */}

                <div className="recommendation-image-container">


                  <img
                    src={perfume.imageUrl}
                    alt={perfume.name}
                    className="recommendation-image"
                  />


                  <div
                    className={`match-badge ${getMatchClass(
                      perfume.matchScore
                    )}`}
                  >

                    {Math.round(
                      perfume.matchScore
                    )}%

                    <span>

                      Match

                    </span>

                  </div>


                </div>



                {/* PERFUME DETAILS */}

                <div className="recommendation-content">


                  <div className="perfume-brand">

                    {perfume.brand}

                  </div>


                  <h3>

                    {perfume.name}

                  </h3>


                  <p className="perfume-description">

                    {perfume.description}

                  </p>



                  {/* MATCH LABEL */}

                  <div className="match-label">

                    ✨ {getMatchLabel(
                      perfume.matchScore
                    )}

                  </div>



                  {/* AI EXPLANATION */}

                  {perfume.aiExplanation && (

                    <div className="ai-explanation">


                      <div className="ai-explanation-title">

                        ✦ Why ScentMatch chose this

                      </div>


                      <p>

                        {perfume.aiExplanation}

                      </p>


                    </div>

                  )}



                  {/* SCORE DETAILS */}

                  <div className="score-details">


                    <div>

                      <span>
                        Fragrance
                      </span>

                      <strong>

                        {Math.round(
                          perfume.familyScore
                        )}

                      </strong>

                    </div>


                    <div>

                      <span>
                        Occasion
                      </span>

                      <strong>

                        {Math.round(
                          perfume.occasionScore
                        )}

                      </strong>

                    </div>


                    <div>

                      <span>
                        Season
                      </span>

                      <strong>

                        {Math.round(
                          perfume.seasonScore
                        )}

                      </strong>

                    </div>


                  </div>



                  {/* PRICE */}

                  <div className="recommendation-footer">


                    <div className="perfume-price">

                      ₹{
                        Number(
                          perfume.price
                        ).toLocaleString(
                          "en-IN"
                        )
                      }

                    </div>


                    <button
                       onClick={() =>
    navigate(
      `/perfume/${perfume.perfumeId}`,
      {
        state: {
          perfume: perfume
        }
      }
    )
  }
>
  View Details
  <span>
    →
  </span>
</button>


                  </div>


                </div>


              </div>

            )

          )}


        </div>



        {/* ================= RETAKE CTA ================= */}

        <div className="retake-section">


          <div>

            <p>
              Not sure about these results?
            </p>


            <h3>

              Try different preferences and
              discover something new.

            </h3>

          </div>


          <button
            onClick={() =>
              navigate("/scentmatch-quiz")
            }
          >

            Retake Quiz
            <span>
              ↻
            </span>

          </button>


        </div>


      </section>


    </div>

  );

}

export default Recommendations;