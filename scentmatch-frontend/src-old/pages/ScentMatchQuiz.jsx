import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRecommendations } from "../services/api";
import "../styles/ScentMatchQuiz.css";

function ScentMatchQuiz() {

  const navigate = useNavigate();

  const [preferences, setPreferences] = useState({
    gender: "",
    fragranceFamily: "",
    season: "",
    occasion: "",
    budget: "",
    longevity: "",
    sillage: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");


  // ==========================================
  // HANDLE OPTION CHANGE
  // ==========================================

  const handleChange = (e) => {

    setPreferences({
      ...preferences,
      [e.target.name]: e.target.value,
    });

  };


  // ==========================================
  // HANDLE FORM SUBMIT
  // ==========================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");


    // Check all fields
    if (
      !preferences.gender ||
      !preferences.fragranceFamily ||
      !preferences.season ||
      !preferences.occasion ||
      !preferences.budget ||
      !preferences.longevity ||
      !preferences.sillage
    ) {

      setError(
        "Please select all preferences before continuing."
      );

      return;

    }


    try {

      setLoading(true);


      // ==========================================
      // CREATE CORRECT DATA FOR SPRING BOOT
      // ==========================================

      const recommendationData = {

        gender: preferences.gender,

        fragranceFamily:
          preferences.fragranceFamily,

        season:
          preferences.season,

        occasion:
          preferences.occasion,

        // IMPORTANT
        // Convert budget from String to Number

        budget:
          Number(preferences.budget),

        longevity:
          preferences.longevity,

        sillage:
          preferences.sillage,

      };


      console.log(
        "Sending preferences:",
        recommendationData
      );


      // ==========================================
      // CALL BACKEND API
      // ==========================================

      const recommendations =
        await getRecommendations(
          recommendationData
        );


      console.log(
        "Recommendations received:",
        recommendations
      );


      // ==========================================
      // GO TO RECOMMENDATIONS PAGE
      // ==========================================

      navigate(
        "/recommendations",
        {
          state: {
            preferences:
              recommendationData,

            recommendations:
              recommendations,
          },
        }
      );


    } catch (err) {

      console.error(
        "Recommendation Error:",
        err
      );


      setError(
        err.message ||
        "Failed to get recommendations."
      );


    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="quiz-page">


      {/* ================= HEADER ================= */}

      <div className="quiz-header">

        <h1>
          ✨ Find Your Perfect Scent
        </h1>


        <p>
          Tell us what you love, and ScentMatch AI
          will find fragrances that match your
          personality and preferences.
        </p>

      </div>


      {/* ================= FORM ================= */}

      <form
        className="quiz-form"
        onSubmit={handleSubmit}
      >


        {/* ================= GENDER ================= */}

        <div className="quiz-section">

          <h3>
            👤 Who is this fragrance for?
          </h3>


          <div className="option-grid">

            {[
              "Men",
              "Women",
              "Unisex"
            ].map((option) => (

              <label
                key={option}
                className="option-card"
              >

                <input
                  type="radio"
                  name="gender"
                  value={option}
                  checked={
                    preferences.gender === option
                  }
                  onChange={handleChange}
                />

                <span>
                  {option}
                </span>

              </label>

            ))}

          </div>

        </div>



        {/* ================= FRAGRANCE FAMILY ================= */}

        <div className="quiz-section">

          <h3>
            🌸 What fragrance style do you prefer?
          </h3>


          <div className="option-grid">

            {[
              "Fresh",
              "Woody",
              "Floral",
              "Oriental",
              "Sweet",
              "Citrus",
            ].map((option) => (

              <label
                key={option}
                className="option-card"
              >

                <input
                  type="radio"
                  name="fragranceFamily"
                  value={option}
                  checked={
                    preferences.fragranceFamily ===
                    option
                  }
                  onChange={handleChange}
                />

                <span>
                  {option}
                </span>

              </label>

            ))}

          </div>

        </div>



        {/* ================= SEASON ================= */}

        <div className="quiz-section">

          <h3>
            🌤️ When will you mostly wear it?
          </h3>


          <div className="option-grid">

            {[
              "Summer",
              "Winter",
              "Spring",
              "Autumn",
              "All Season",
            ].map((option) => (

              <label
                key={option}
                className="option-card"
              >

                <input
                  type="radio"
                  name="season"
                  value={option}
                  checked={
                    preferences.season === option
                  }
                  onChange={handleChange}
                />

                <span>
                  {option}
                </span>

              </label>

            ))}

          </div>

        </div>



        {/* ================= OCCASION ================= */}

        <div className="quiz-section">

          <h3>
            🎯 What is the occasion?
          </h3>


          <div className="option-grid">

            {[
              "Daily",
              "Office",
              "Party",
              "Date",
              "Special Occasion",
            ].map((option) => (

              <label
                key={option}
                className="option-card"
              >

                <input
                  type="radio"
                  name="occasion"
                  value={option}
                  checked={
                    preferences.occasion === option
                  }
                  onChange={handleChange}
                />

                <span>
                  {option}
                </span>

              </label>

            ))}

          </div>

        </div>



        {/* ================= BUDGET ================= */}

        <div className="quiz-section">

          <h3>
            💰 What's your budget?
          </h3>


          <div className="option-grid">

            {[
              "5000",
              "10000",
              "20000",
              "30000",
              "50000",
            ].map((option) => (

              <label
                key={option}
                className="option-card"
              >

                <input
                  type="radio"
                  name="budget"
                  value={option}
                  checked={
                    preferences.budget === option
                  }
                  onChange={handleChange}
                />

                <span>
                  ₹{option}
                </span>

              </label>

            ))}

          </div>

        </div>



        {/* ================= LONGEVITY ================= */}

        <div className="quiz-section">

          <h3>
            ⏳ How long should it last?
          </h3>


          <div className="option-grid">

            {[
              "Low",
              "Medium",
              "Long",
              "Very Long",
            ].map((option) => (

              <label
                key={option}
                className="option-card"
              >

                <input
                  type="radio"
                  name="longevity"
                  value={option}
                  checked={
                    preferences.longevity === option
                  }
                  onChange={handleChange}
                />

                <span>
                  {option}
                </span>

              </label>

            ))}

          </div>

        </div>



        {/* ================= SILLAGE ================= */}

        <div className="quiz-section">

          <h3>
            🌊 How strong should the fragrance be?
          </h3>


          <div className="option-grid">

            {[
              "Soft",
              "Moderate",
              "Strong",
              "Very Strong",
            ].map((option) => (

              <label
                key={option}
                className="option-card"
              >

                <input
                  type="radio"
                  name="sillage"
                  value={option}
                  checked={
                    preferences.sillage === option
                  }
                  onChange={handleChange}
                />

                <span>
                  {option}
                </span>

              </label>

            ))}

          </div>

        </div>



        {/* ================= ERROR ================= */}

        {error && (

          <p
            style={{
              color: "red",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >

            {error}

          </p>

        )}



        {/* ================= SUBMIT ================= */}

        <button
          type="submit"
          className="match-button"
          disabled={loading}
        >

          {loading
            ? "Finding Your Perfect Scent..."
            : "✨ Find My Perfect Scent"}

        </button>


      </form>


    </div>

  );

}

export default ScentMatchQuiz;done
