import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AiScentAssistant.css";

export default function AiScentAssistant() {
  const navigate = useNavigate();

  const [messages, setMessages] = useState([
    {
      type: "ai",
      text: "Tell me what you're looking for and I'll help you discover the perfect fragrance."
    }
  ]);

  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  // ==========================================
  // SEND MESSAGE
  // ==========================================

  const sendMessage = async (customPrompt = null) => {
    const userPrompt = customPrompt || prompt;

    if (!userPrompt.trim() || loading) {
      return;
    }

    const userMessage = {
      type: "user",
      text: userPrompt
    };

    setMessages((previousMessages) => [
      ...previousMessages,
      userMessage
    ]);

    setPrompt("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8080/api/ai/recommend",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            prompt: userPrompt
          })
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get recommendations");
      }

      const perfumes = await response.json();

      let aiText = "";

      if (!perfumes || perfumes.length === 0) {
        aiText =
          "I couldn't find an exact match in the current collection. Try adjusting your fragrance preferences or budget.";
      } else {
        aiText =
          "Based on your preferences, these fragrances are the best matches from our collection.";
      }

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          type: "ai",
          text: aiText,
          perfumes: perfumes
        }
      ]);
    } catch (error) {
      console.error(error);

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          type: "ai",
          text:
            "I couldn't connect to the recommendation service. Please make sure the backend is running and try again."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // ENTER KEY
  // ==========================================

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  // ==========================================
  // SUGGESTIONS
  // ==========================================

  const suggestions = [
    {
      icon: "💧",
      title: "Fresh & Aquatic",
      text: "Fresh aquatic perfume for men under 10000"
    },
    {
      icon: "🌙",
      title: "Date Night",
      text: "Sweet vanilla perfume for a date night under 8000"
    },
    {
      icon: "💼",
      title: "Office Wear",
      text: "Long lasting office perfume for women under 12000"
    },
    {
      icon: "🌲",
      title: "Winter Woody",
      text: "Strong woody perfume for winter under 15000"
    }
  ];

  return (
    <div className="ai-assistant-page">

      {/* ======================================
          HEADER
      ====================================== */}

      <header className="ai-header">

        <div className="header-left">

          <button
            className="back-button"
            onClick={() => navigate("/dashboard")}
          >
            ←
          </button>

          <div className="brand-section">

            <div className="brand-logo">
              ✦
            </div>

            <div>
              <h2>ScentMatch</h2>

              <p>
                AI Fragrance Intelligence
              </p>
            </div>

          </div>

        </div>


        <div className="header-status">

          <span className="status-dot"></span>

          AI Assistant Online

        </div>

      </header>


      {/* ======================================
          MAIN CONTENT
      ====================================== */}

      <div className="assistant-layout">


        {/* ====================================
            INTRO SECTION
        ==================================== */}

        <section className="assistant-intro">

          <div className="intro-badge">
            ✦ PERSONAL FRAGRANCE AI
          </div>

          <h1>
            Find your
            <span> perfect scent.</span>
          </h1>

          <p>
            Describe what you like and ScentMatch AI will
            analyze your preferences to recommend fragrances
            from our collection.
          </p>

        </section>


        {/* ====================================
            CHAT CONTAINER
        ==================================== */}

        <section className="chat-container">


          {/* ===============================
              CHAT HEADER
          =============================== */}

          <div className="chat-top">

            <div className="assistant-avatar">
              ✦
            </div>

            <div>

              <h3>
                ScentMatch Assistant
              </h3>

              <p>
                Your personal fragrance expert
              </p>

            </div>

          </div>


          {/* ===============================
              MESSAGES
          =============================== */}

          <div className="messages-area">

            {messages.map((message, index) => (

              <div
                key={index}
                className={`chat-row ${message.type}`}
              >

                {message.type === "ai" && (

                  <div className="message-icon">
                    ✦
                  </div>

                )}


                <div className={`chat-message ${message.type}`}>

                  <p>
                    {message.text}
                  </p>


                  {/* ==========================
                      PERFUME RESULTS
                  ========================== */}

                  {message.perfumes &&
                    message.perfumes.length > 0 && (

                      <div className="recommendation-results">

                        {message.perfumes.map((perfume) => (

                          <div
                            className="recommendation-card"
                            key={perfume.id}
                          >

                            <div className="recommendation-content">

                              <div className="recommendation-top">

                                <div>

                                  <span className="recommendation-label">
                                    SCENTMATCH RECOMMENDS
                                  </span>

                                  <h3>
                                    {perfume.name}
                                  </h3>

                                  <p className="recommendation-brand">
                                    {perfume.brand}
                                  </p>

                                </div>

                              </div>


                              <div className="recommendation-tags">

                                {perfume.fragranceFamily && (

                                  <span>
                                    {perfume.fragranceFamily}
                                  </span>

                                )}

                                {perfume.gender && (

                                  <span>
                                    {perfume.gender}
                                  </span>

                                )}

                              </div>


                              {perfume.description && (

                                <p className="recommendation-description">
                                  {perfume.description}
                                </p>

                              )}


                              <div className="recommendation-bottom">

                                <div className="recommendation-price">

                                  ₹ {perfume.price}

                                </div>


                                <button
                                  onClick={() =>
                                    navigate("/perfumes")
                                  }
                                >
                                  View Collection →
                                </button>

                              </div>

                            </div>

                          </div>

                        ))}

                      </div>

                    )}

                </div>

              </div>

            ))}


            {/* ===============================
                LOADING
            =============================== */}

            {loading && (

              <div className="chat-row ai">

                <div className="message-icon">
                  ✦
                </div>

                <div className="typing-message">

                  <span></span>
                  <span></span>
                  <span></span>

                </div>

              </div>

            )}

          </div>


          {/* ==================================
              SUGGESTIONS
          ================================== */}

          {messages.length === 1 && (

            <div className="suggestions-section">

              <p>
                TRY AN EXAMPLE
              </p>

              <div className="suggestion-grid">

                {suggestions.map(
                  (suggestion, index) => (

                    <button
                      key={index}
                      onClick={() =>
                        sendMessage(suggestion.text)
                      }
                    >

                      <span className="suggestion-icon">
                        {suggestion.icon}
                      </span>

                      <div>

                        <strong>
                          {suggestion.title}
                        </strong>

                        <small>
                          {suggestion.text}
                        </small>

                      </div>

                      <span className="suggestion-arrow">
                        →
                      </span>

                    </button>

                  )
                )}

              </div>

            </div>

          )}


          {/* ==================================
              INPUT
          ================================== */}

          <div className="prompt-section">

            <div className="prompt-box">

              <textarea

                placeholder="Describe your perfect fragrance..."

                value={prompt}

                onChange={(event) =>
                  setPrompt(event.target.value)
                }

                onKeyDown={handleKeyDown}

                rows="1"

              />


              <button
                className="send-button"
                onClick={() => sendMessage()}
                disabled={loading || !prompt.trim()}
              >

                {loading ? (
                  "..."
                ) : (
                  "Send →"
                )}

              </button>

            </div>


            <p className="prompt-hint">

              Try mentioning notes, occasion, season,
              longevity, gender or budget.

            </p>

          </div>


        </section>


        {/* ====================================
            INFORMATION CARDS
        ==================================== */}

        <section className="assistant-features">

          <div className="feature-item">

            <span>01</span>

            <div>

              <h4>
                Understands Preferences
              </h4>

              <p>
                Analyzes notes, style, occasion and more.
              </p>

            </div>

          </div>


          <div className="feature-item">

            <span>02</span>

            <div>

              <h4>
                Matches Your Budget
              </h4>

              <p>
                Finds fragrances within your price range.
              </p>

            </div>

          </div>


          <div className="feature-item">

            <span>03</span>

            <div>

              <h4>
                Personalized Results
              </h4>

              <p>
                Recommendations based on your preferences.
              </p>

            </div>

          </div>

        </section>


      </div>

    </div>
  );
}