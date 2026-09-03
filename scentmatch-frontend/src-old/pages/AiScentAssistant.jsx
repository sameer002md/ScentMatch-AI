import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAiRecommendations } from "../services/api";
import "../styles/AiScentAssistant.css";

function AiScentAssistant() {

    const navigate = useNavigate();

    const [prompt, setPrompt] = useState("");

    const [recommendations, setRecommendations] =
        useState([]);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");


    // ==========================================
    // ASK AI
    // ==========================================

    const handleAskAi = async () => {

        if (!prompt.trim()) {

            setError(
                "Please describe the type of perfume you are looking for."
            );

            return;
        }


        try {

            setLoading(true);

            setError("");

            setRecommendations([]);


            const data =
                await getAiRecommendations(
                    prompt
                );


            setRecommendations(
                data || []
            );

        }

        catch (error) {

            console.error(
                error
            );


            setError(
                error.message ||
                "Something went wrong while getting recommendations."
            );

        }

        finally {

            setLoading(false);

        }

    };


    // ==========================================
    // HANDLE ENTER KEY
    // ==========================================

    const handleKeyDown = (event) => {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            handleAskAi();

        }

    };


    return (

        <div className="ai-page">


            {/* ====================================== */}
            {/* NAVBAR */}
            {/* ====================================== */}

            <nav className="ai-navbar">


                <div
                    className="ai-logo"
                    onClick={() =>
                        navigate("/dashboard")
                    }
                >

                    <div className="ai-logo-icon">

                        ✦

                    </div>


                    <div>

                        <h1>
                            ScentMatch
                        </h1>

                        <p>
                            AI FRAGRANCE EXPERIENCE
                        </p>

                    </div>

                </div>


                <div className="ai-nav-actions">


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

                        Explore Perfumes

                    </button>


                    <button
                        className="ai-favorites-btn"
                        onClick={() =>
                            navigate("/favorites")
                        }
                    >

                        ♥ Favorites

                    </button>

                </div>


            </nav>


            {/* ====================================== */}
            {/* HERO */}
            {/* ====================================== */}

            <section className="ai-hero">


                <div className="ai-badge">

                    ✨ AI POWERED FRAGRANCE ASSISTANT

                </div>


                <h2>

                    Tell me what you want.

                    <span>
                        I'll find your scent.
                    </span>

                </h2>


                <p>

                    Describe your perfect fragrance naturally.
                    Tell me your favorite notes, style,
                    occasion or budget.

                </p>


            </section>


            {/* ====================================== */}
            {/* PROMPT BOX */}
            {/* ====================================== */}

            <section className="prompt-section">


                <div className="prompt-container">


                    <div className="prompt-header">

                        <span>
                            ✨
                        </span>

                        <div>

                            <h3>
                                Ask ScentMatch AI
                            </h3>

                            <p>
                                Describe the perfume you are looking for
                            </p>

                        </div>

                    </div>


                    <textarea

                        value={prompt}

                        onChange={(event) =>
                            setPrompt(
                                event.target.value
                            )
                        }

                        onKeyDown={handleKeyDown}

                        placeholder={
                            "Example: I need a budget friendly fresh citrus perfume for daily use below ₹10,000..."
                        }

                        rows="5"

                    />


                    <div className="prompt-footer">


                        <span>

                            Try mentioning:
                            budget • fragrance notes • occasion • season • style

                        </span>


                        <button
                            onClick={handleAskAi}
                            disabled={loading}
                        >

                            {loading
                                ? "Finding your scent..."
                                : "Ask AI ✨"
                            }

                        </button>


                    </div>


                </div>


            </section>


            {/* ====================================== */}
            {/* EXAMPLE PROMPTS */}
            {/* ====================================== */}

            <section className="example-section">


                <h3>
                    Not sure what to ask?
                </h3>


                <div className="example-prompts">


                    <button
                        onClick={() =>
                            setPrompt(
                                "I need a budget friendly fresh citrus perfume below 10000"
                            )
                        }
                    >

                        🍋 Fresh citrus perfume below ₹10,000

                    </button>


                    <button
                        onClick={() =>
                            setPrompt(
                                "I want a long lasting woody perfume for men"
                            )
                        }
                    >

                        🌲 Long lasting woody perfume for men

                    </button>


                    <button
                        onClick={() =>
                            setPrompt(
                                "I need a floral perfume for women for a romantic date"
                            )
                        }
                    >

                        🌸 Floral perfume for a romantic date

                    </button>


                    <button
                        onClick={() =>
                            setPrompt(
                                "I want a strong perfume for a party"
                            )
                        }
                    >

                        🎉 Strong perfume for a party

                    </button>


                </div>


            </section>


            {/* ====================================== */}
            {/* ERROR */}
            {/* ====================================== */}

            {error && (

                <div className="ai-error">

                    {error}

                </div>

            )}


            {/* ====================================== */}
            {/* LOADING */}
            {/* ====================================== */}

            {loading && (

                <div className="ai-loading">

                    <div className="loading-orb">

                        ✨

                    </div>


                    <h3>
                        ScentMatch AI is thinking...
                    </h3>


                    <p>
                        Analyzing your fragrance preferences
                    </p>

                </div>

            )}


            {/* ====================================== */}
            {/* RECOMMENDATIONS */}
            {/* ====================================== */}

            {!loading &&
                recommendations.length > 0 && (

                <section className="ai-results">


                    <div className="results-heading">


                        <div>

                            <span>
                                YOUR AI RESULTS
                            </span>


                            <h2>

                                Perfect scents
                                <strong>
                                    for you.
                                </strong>

                            </h2>

                        </div>


                        <p>

                            Based on your description,
                            these fragrances match your preferences.

                        </p>


                    </div>


                    <div className="ai-perfume-grid">


                        {recommendations.map(
                            (perfume) => (

                                <div
                                    className="ai-perfume-card"
                                    key={perfume.id}
                                >


                                    <div className="ai-image-wrapper">


                                        <img

                                            src={
                                                perfume.imageUrl
                                            }

                                            alt={
                                                perfume.name
                                            }

                                        />


                                        <div className="ai-price">

                                            ₹{
                                                perfume.price
                                            }

                                        </div>


                                    </div>


                                    <div className="ai-perfume-info">


                                        <span>

                                            {
                                                perfume.brand
                                            }

                                        </span>


                                        <h3>

                                            {
                                                perfume.name
                                            }

                                        </h3>


                                        <p>

                                            {
                                                perfume.description
                                            }

                                        </p>


                                        <div className="ai-tags">


                                            <span>

                                                {
                                                    perfume.fragranceFamily
                                                }

                                            </span>


                                            <span>

                                                {
                                                    perfume.gender
                                                }

                                            </span>


                                        </div>


                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/perfume/${perfume.id}`
                                                )
                                            }
                                        >

                                            View Details →

                                        </button>


                                    </div>


                                </div>

                            )
                        )}


                    </div>


                </section>

            )}


            {/* ====================================== */}
            {/* EMPTY RESULTS */}
            {/* ====================================== */}

            {!loading &&
                recommendations.length === 0 &&
                prompt &&
                !error && (

                <div className="ai-empty">

                    Your recommendations will appear here.

                </div>

            )}


        </div>

    );

}

export default AiScentAssistant;