import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getPerfumes } from "../services/api";

import "../styles/Recommendations.css";


// ==========================================
// HELPER FUNCTION
// ==========================================

const normalizeText = (value) => {
  return String(value || "")
    .toLowerCase()
    .trim();
};


// ==========================================
// MAIN COMPONENT
// ==========================================

export default function Recommendations() {

  const navigate = useNavigate();
  const location = useLocation();


  // ========================================
  // GET QUIZ ANSWERS
  // ========================================

  const routeAnswers =
    location.state?.answers;


  const savedAnswers =
    JSON.parse(
      localStorage.getItem(
        "scentmatchQuizAnswers"
      )
    ) || [];


  const answers =
    Array.isArray(routeAnswers) &&
    routeAnswers.length > 0

      ? routeAnswers

      : savedAnswers;


  // ========================================
  // STATE
  // ========================================

  const [perfumes, setPerfumes] =
    useState([]);


  const [loading, setLoading] =
    useState(true);


  // ========================================
  // LOAD PERFUMES
  // ========================================

  useEffect(() => {

    const loadPerfumes =
      async () => {

        try {

          setLoading(true);


          const data =
            await getPerfumes();


          setPerfumes(

            Array.isArray(data)

              ? data

              : []

          );


        } catch (error) {

          console.error(
            "Error loading recommendations:",
            error
          );


          setPerfumes([]);

        } finally {

          setLoading(false);

        }

      };


    loadPerfumes();


  }, []);


  // ========================================
  // NORMALIZE PERFUME DATA
  // ========================================

  const normalizedPerfumes =
    useMemo(() => {

      return perfumes.map(
        (perfume) => {


          // ==================================
          // COMBINE ALL NOTES
          // ==================================

          const notes = [

            perfume.notes,

            perfume.topNotes,

            perfume.middleNotes,

            perfume.baseNotes

          ]

            .filter(Boolean)

            .join(" ");


          // ==================================
          // SEARCHABLE TEXT
          // ==================================

          const searchableText = `

            ${perfume.name || ""}

            ${perfume.brand || ""}

            ${perfume.category || ""}

            ${perfume.gender || ""}

            ${perfume.fragranceFamily || ""}

            ${perfume.topNotes || ""}

            ${perfume.middleNotes || ""}

            ${perfume.baseNotes || ""}

            ${perfume.notes || ""}

            ${perfume.occasion || ""}

            ${perfume.season || ""}

            ${perfume.longevity || ""}

            ${perfume.sillage || ""}

            ${perfume.description || ""}

          `.toLowerCase();


          return {

            ...perfume,


            // IMAGE

            image:

              perfume.image ||

              perfume.imageUrl ||

              "/perfumes/default.jpg",


            // CATEGORY

            category:

              perfume.category ||

              perfume.gender ||

              "Unisex",


            // NOTES

            notes,


            // SEARCH DATA

            searchableText

          };

        }

      );

    }, [
      perfumes
    ]);


  // ========================================
  // QUIZ PROFILE
  // ========================================

  const quizProfile =
    useMemo(() => {


      const profile = {

        gender: "",

        family: "",

        occasion: "",

        notes: [],

        longevity: "",

        intensity: "",

        season: ""

      };


      answers.forEach(
        (answer) => {


          const value =
            normalizeText(
              answer
            );


          // ==================================
          // GENDER
          // ==================================

          if (

            value.includes("men") ||

            value.includes("male")

          ) {

            profile.gender =
              "men";

          }


          else if (

            value.includes("women") ||

            value.includes("female")

          ) {

            profile.gender =
              "women";

          }


          else if (

            value.includes("unisex") ||

            value.includes("everyone")

          ) {

            profile.gender =
              "unisex";

          }


          // ==================================
          // FRAGRANCE FAMILY
          // ==================================

          if (

            value.includes("citrus")

          ) {

            profile.family =
              "citrus";

          }


          else if (

            value.includes("floral")

          ) {

            profile.family =
              "floral";

          }


          else if (

            value.includes("woody")

          ) {

            profile.family =
              "woody";

          }


          else if (

            value.includes("fresh")

          ) {

            profile.family =
              "fresh";

          }


          else if (

            value.includes("sweet")

          ) {

            profile.family =
              "sweet";

          }


          else if (

            value.includes("vanilla")

          ) {

            profile.family =
              "sweet";

          }


          else if (

            value.includes("oriental")

          ) {

            profile.family =
              "oriental";

          }


          else if (

            value.includes("spicy")

          ) {

            profile.family =
              "spicy";

          }


          // ==================================
          // OCCASION
          // ==================================

          if (

            value.includes("daily") ||

            value.includes("everyday") ||

            value.includes("casual")

          ) {

            profile.occasion =
              "daily";

          }


          else if (

            value.includes("work") ||

            value.includes("office") ||

            value.includes("formal")

          ) {

            profile.occasion =
              "formal";

          }


          else if (

            value.includes("date") ||

            value.includes("evening") ||

            value.includes("night")

          ) {

            profile.occasion =
              "evening";

          }


          else if (

            value.includes("party")

          ) {

            profile.occasion =
              "party";

          }


          else if (

            value.includes("special") ||

            value.includes("occasion")

          ) {

            profile.occasion =
              "special";

          }


          // ==================================
          // LONGEVITY
          // ==================================

          if (

            value.includes("long lasting") ||

            value.includes("all day") ||

            value.includes("long")

          ) {

            profile.longevity =
              "long";

          }


          else if (

            value.includes("moderate") ||

            value.includes("medium")

          ) {

            profile.longevity =
              "moderate";

          }


          else if (

            value.includes("short") ||

            value.includes("light longevity")

          ) {

            profile.longevity =
              "short";

          }


          // ==================================
          // INTENSITY
          // ==================================

          if (

            value.includes("smooth") ||

            value.includes("soft") ||

            value.includes("subtle") ||

            value.includes("light")

          ) {

            profile.intensity =
              "smooth";

          }


          else if (

            value.includes("balanced") ||

            value.includes("moderate")

          ) {

            profile.intensity =
              "balanced";

          }


          else if (

            value.includes("strong") ||

            value.includes("intense") ||

            value.includes("powerful")

          ) {

            profile.intensity =
              "strong";

          }


          // ==================================
          // SEASON
          // ==================================

          if (

            value.includes("summer") ||

            value.includes("hot")

          ) {

            profile.season =
              "summer";

          }


          else if (

            value.includes("winter") ||

            value.includes("cold")

          ) {

            profile.season =
              "winter";

          }


          else if (

            value.includes("spring")

          ) {

            profile.season =
              "spring";

          }


          else if (

            value.includes("autumn") ||

            value.includes("fall")

          ) {

            profile.season =
              "autumn";

          }


          // ==================================
          // NOTE PREFERENCES
          // ==================================

          const noteKeywords = [

            "bergamot",

            "lemon",

            "orange",

            "grapefruit",

            "rose",

            "jasmine",

            "lavender",

            "vanilla",

            "caramel",

            "tonka",

            "amber",

            "musk",

            "cedar",

            "sandalwood",

            "oud",

            "vetiver",

            "pepper",

            "cardamom",

            "mint",

            "marine",

            "aquatic",

            "leather",

            "iris",

            "apple",

            "coconut"

          ];


          noteKeywords.forEach(
            (note) => {

              if (

                value.includes(
                  note
                )

              ) {

                if (

                  !profile.notes.includes(
                    note
                  )

                ) {

                  profile.notes.push(
                    note
                  );

                }

              }

            }

          );


          // ==================================
          // BROAD NOTE GROUPS
          // ==================================

          if (

            value.includes("citrus notes")

          ) {

            profile.notes.push(

              "bergamot",

              "lemon",

              "grapefruit",

              "orange"

            );

          }


          if (

            value.includes("floral notes")

          ) {

            profile.notes.push(

              "rose",

              "jasmine",

              "lavender",

              "iris"

            );

          }


          if (

            value.includes("woody notes")

          ) {

            profile.notes.push(

              "cedar",

              "sandalwood",

              "vetiver",

              "oud"

            );

          }


          if (

            value.includes("sweet notes")

          ) {

            profile.notes.push(

              "vanilla",

              "caramel",

              "tonka"

            );

          }


          if (

            value.includes("spicy notes")

          ) {

            profile.notes.push(

              "pepper",

              "cardamom"

            );

          }


        }

      );


      // REMOVE DUPLICATE NOTES

      profile.notes =
        [...new Set(
          profile.notes
        )];


      return profile;


    }, [
      answers
    ]);


  // ========================================
  // AI MATCHING ENGINE
  // ========================================

  const recommendations =
    useMemo(() => {


      if (

        normalizedPerfumes.length === 0

      ) {

        return [];

      }


      // ======================================
      // KEYWORD DATABASE
      // ======================================

      const familyKeywords = {


        citrus: [

          "citrus",

          "bergamot",

          "lemon",

          "grapefruit",

          "orange",

          "neroli"

        ],


        floral: [

          "floral",

          "rose",

          "jasmine",

          "lavender",

          "iris",

          "tuberose"

        ],


        woody: [

          "woody",

          "wood",

          "cedar",

          "sandalwood",

          "vetiver",

          "oud",

          "oakmoss"

        ],


        fresh: [

          "fresh",

          "aquatic",

          "marine",

          "clean",

          "mint",

          "citrus"

        ],


        sweet: [

          "sweet",

          "vanilla",

          "caramel",

          "tonka",

          "praline",

          "amber"

        ],


        oriental: [

          "oriental",

          "amber",

          "oud",

          "spicy",

          "vanilla",

          "musk"

        ],


        spicy: [

          "spicy",

          "pepper",

          "cardamom",

          "cinnamon",

          "clove"

        ]

      };


      // ======================================
      // OCCASION KEYWORDS
      // ======================================

      const occasionKeywords = {


        daily: [

          "daily",

          "casual",

          "fresh",

          "clean",

          "light",

          "summer"

        ],


        formal: [

          "formal",

          "office",

          "professional",

          "elegant",

          "woody",

          "fresh"

        ],


        evening: [

          "evening",

          "night",

          "date",

          "romantic",

          "amber",

          "vanilla",

          "musk"

        ],


        party: [

          "party",

          "bold",

          "intense",

          "strong",

          "sweet",

          "spicy"

        ],


        special: [

          "special",

          "luxury",

          "rich",

          "intense",

          "oud",

          "amber"

        ]

      };


      // ======================================
      // SEASON KEYWORDS
      // ======================================

      const seasonKeywords = {


        summer: [

          "summer",

          "fresh",

          "citrus",

          "aquatic",

          "marine",

          "clean"

        ],


        winter: [

          "winter",

          "warm",

          "amber",

          "vanilla",

          "oud",

          "spicy",

          "woody"

        ],


        spring: [

          "spring",

          "floral",

          "rose",

          "jasmine",

          "fresh"

        ],


        autumn: [

          "autumn",

          "fall",

          "woody",

          "amber",

          "spicy",

          "vanilla"

        ]

      };


      // ======================================
      // SCORE PERFUME
      // ======================================

      const scorePerfume =
        (perfume) => {


          let score = 0;


          const text =
            perfume.searchableText;


          // ==================================
          // GENDER MATCH
          // ==================================

          const perfumeGender =
            normalizeText(

              perfume.category ||

              perfume.gender

            );


          if (

            quizProfile.gender

          ) {

            if (

              perfumeGender.includes(
                quizProfile.gender
              )

            ) {

              score += 15;

            }


            else if (

              perfumeGender.includes(
                "unisex"
              )

            ) {

              score += 8;

            }

          }


          // ==================================
          // FRAGRANCE FAMILY
          // ==================================

          if (

            quizProfile.family

          ) {

            const selectedFamilyKeywords =

              familyKeywords[
                quizProfile.family
              ] || [];


            selectedFamilyKeywords.forEach(
              (keyword) => {

                if (

                  text.includes(
                    keyword
                  )

                ) {

                  score += 7;

                }

              }

            );


            const backendFamily =
              normalizeText(
                perfume.fragranceFamily
              );


            if (

              backendFamily.includes(
                quizProfile.family
              )

            ) {

              score += 15;

            }

          }


          // ==================================
          // NOTE MATCH
          // ==================================

          quizProfile.notes.forEach(
            (note) => {

              if (

                text.includes(
                  note
                )

              ) {

                score += 8;

              }

            }

          );


          // ==================================
          // OCCASION MATCH
          // ==================================

          if (

            quizProfile.occasion

          ) {

            const selectedOccasionKeywords =

              occasionKeywords[
                quizProfile.occasion
              ] || [];


            selectedOccasionKeywords.forEach(
              (keyword) => {

                if (

                  text.includes(
                    keyword
                  )

                ) {

                  score += 4;

                }

              }

            );


            const backendOccasion =
              normalizeText(
                perfume.occasion
              );


            if (

              backendOccasion.includes(
                quizProfile.occasion
              )

            ) {

              score += 12;

            }

          }


          // ==================================
          // LONGEVITY MATCH
          // ==================================

          if (

            quizProfile.longevity

          ) {

            const backendLongevity =
              normalizeText(
                perfume.longevity
              );


            if (

              quizProfile.longevity ===
              "long"

            ) {

              if (

                backendLongevity.includes(
                  "long"
                ) ||

                backendLongevity.includes(
                  "8"
                ) ||

                backendLongevity.includes(
                  "10"
                ) ||

                backendLongevity.includes(
                  "12"
                )

              ) {

                score += 12;

              }

            }


            else if (

              quizProfile.longevity ===
              "moderate"

            ) {

              if (

                backendLongevity.includes(
                  "moderate"
                ) ||

                backendLongevity.includes(
                  "medium"
                ) ||

                backendLongevity.includes(
                  "6"
                )

              ) {

                score += 10;

              }

            }


            else if (

              quizProfile.longevity ===
              "short"

            ) {

              if (

                backendLongevity.includes(
                  "short"
                ) ||

                backendLongevity.includes(
                  "light"
                )

              ) {

                score += 8;

              }

            }

          }


          // ==================================
          // INTENSITY / SILLAGE MATCH
          // ==================================

          if (

            quizProfile.intensity

          ) {

            const sillage =
              normalizeText(
                perfume.sillage
              );


            const perfumeText =
              normalizeText(
                `${perfume.sillage}
                 ${perfume.description}
                 ${perfume.name}`
              );


            if (

              quizProfile.intensity ===
              "smooth"

            ) {

              const smoothKeywords = [

                "soft",

                "smooth",

                "subtle",

                "light",

                "gentle"

              ];


              smoothKeywords.forEach(
                (keyword) => {

                  if (

                    sillage.includes(
                      keyword
                    ) ||

                    perfumeText.includes(
                      keyword
                    )

                  ) {

                    score += 5;

                  }

                }

              );

            }


            else if (

              quizProfile.intensity ===
              "balanced"

            ) {

              const balancedKeywords = [

                "moderate",

                "medium",

                "balanced"

              ];


              balancedKeywords.forEach(
                (keyword) => {

                  if (

                    sillage.includes(
                      keyword
                    )

                  ) {

                    score += 6;

                  }

                }

              );

            }


            else if (

              quizProfile.intensity ===
              "strong"

            ) {

              const strongKeywords = [

                "strong",

                "intense",

                "heavy",

                "powerful",

                "beast"

              ];


              strongKeywords.forEach(
                (keyword) => {

                  if (

                    sillage.includes(
                      keyword
                    ) ||

                    perfumeText.includes(
                      keyword
                    )

                  ) {

                    score += 6;

                  }

                }

              );

            }

          }


          // ==================================
          // SEASON MATCH
          // ==================================

          if (

            quizProfile.season

          ) {

            const selectedSeasonKeywords =

              seasonKeywords[
                quizProfile.season
              ] || [];


            selectedSeasonKeywords.forEach(
              (keyword) => {

                if (

                  text.includes(
                    keyword
                  )

                ) {

                  score += 4;

                }

              }

            );


            const backendSeason =
              normalizeText(
                perfume.season
              );


            if (

              backendSeason.includes(
                quizProfile.season
              )

            ) {

              score += 12;

            }

          }


          return score;

        };


      // ======================================
      // SCORE ALL PERFUMES
      // ======================================

      const scoredPerfumes =

        normalizedPerfumes.map(
          (perfume) => {


            const score =
              scorePerfume(
                perfume
              );


            return {

              ...perfume,

              score

            };

          }

        );


      // ======================================
      // SORT + GENERATE MATCH %
      // ======================================

      return scoredPerfumes

        .sort(
          (a, b) => {


            if (

              b.score !==
              a.score

            ) {

              return (

                b.score -

                a.score

              );

            }


            return String(
              a.name
            ).localeCompare(

              String(
                b.name
              )

            );

          }

        )

        .slice(
          0,
          5
        )

        .map(
          (perfume, index) => {


            let matchPercentage =

              70 +

              perfume.score +

              (5 - index) * 2;


            matchPercentage =
              Math.min(

                98,

                Math.max(

                  65,

                  Math.round(
                    matchPercentage
                  )

                )

              );


            return {

              ...perfume,

              matchPercentage

            };

          }

        );


    }, [

      normalizedPerfumes,

      quizProfile

    ]);


  // ========================================
  // RETAKE QUIZ
  // ========================================

  const retakeQuiz = () => {


    localStorage.removeItem(
      "scentmatchQuizAnswers"
    );


    navigate(
      "/scentmatch-quiz"
    );

  };


  // ========================================
  // START QUIZ
  // ========================================

  const startQuiz = () => {

    navigate(
      "/scentmatch-quiz"
    );

  };


  // ========================================
  // UI
  // ========================================

  return (

    <div className="recommend-page">


      {/* ================= NAVIGATION ================= */}

      <header className="recommend-top">


        <button

          className="page-back"

          onClick={() =>
            navigate(
              "/dashboard"
            )
          }

        >

          ← Dashboard

        </button>


        <div className="recommend-brand">

          ✦ ScentMatch AI

        </div>


      </header>


      {/* ================= MAIN ================= */}

      <main className="recommend-main">


        {/* ================= HEADER ================= */}

        <section className="recommend-header">


          <p className="eyebrow">

            YOUR PERSONAL SCENTMATCH

          </p>


          <h1>

            These scents feel

            <span>

              {" "}like you.

            </span>

          </h1>


          <p className="recommend-sub">

            {answers.length > 0

              ? "Our ScentMatch AI analyzed your fragrance preferences and compared them with our perfume collection."

              : "Take the ScentMatch quiz and discover fragrances selected especially for you."

            }

          </p>


          {/* ================= ANSWER TAGS ================= */}

          {answers.length > 0 && (

            <div className="answer-tags">

              {answers.map(

                (answer, index) => (

                  <span
                    key={`${answer}-${index}`}
                  >

                    {answer}

                  </span>

                )

              )}

            </div>

          )}


        </section>


        {/* ================= NO QUIZ ================= */}

        {answers.length === 0 && (

          <section className="no-quiz">


            <div className="no-quiz-icon">

              ✦

            </div>


            <h2>

              Let's discover your signature scent

            </h2>


            <p>

              Answer a few questions about your
              fragrance preferences and we'll find
              perfumes that match your personality.

            </p>


            <button
              onClick={startQuiz}
            >

              Start ScentMatch Quiz →

            </button>


          </section>

        )}


        {/* ================= LOADING ================= */}

        {loading &&
          answers.length > 0 && (

            <div className="recommend-loading">


              <div className="loader"></div>


              <h3>

                Analyzing your scent personality...

              </h3>


              <p>

                Comparing your preferences with
                our fragrance collection.

              </p>


            </div>

          )}


        {/* ================= RESULTS ================= */}

        {!loading &&

          answers.length > 0 &&

          recommendations.length > 0 && (

            <section className="recommend-results">


              {/* ============== HEADING ============== */}

              <div className="results-heading">


                <div>


                  <p>

                    TOP MATCHES

                  </p>


                  <h2>

                    Your perfect fragrances

                  </h2>


                </div>


                <span>

                  Top{" "}

                  {recommendations.length}

                  {" "}Matches

                </span>


              </div>


              {/* ============== CARDS ============== */}

              <div className="recommend-grid">


                {recommendations.map(

                  (perfume, index) => (

                    <article

                      className="recommend-card"

                      key={

                        perfume.id ||

                        `${perfume.name}-${index}`

                      }

                    >


                      {/* RANK */}

                      <div className="card-rank">

                        #{index + 1}

                      </div>


                      {/* MATCH PERCENTAGE */}

                      <div className="match-badge">

                        {perfume.matchPercentage}%

                        <small>

                          Match

                        </small>

                      </div>


                      {/* IMAGE */}

                      <div className="recommend-image-wrapper">


                        <img

                          className="recommend-image"

                          src={
                            perfume.image
                          }

                          alt={
                            perfume.name
                          }

                          onError={
                            (e) => {

                              e.currentTarget.onerror =
                                null;


                              e.currentTarget.src =
                                "/perfumes/default.jpg";

                            }
                          }

                        />


                      </div>


                      {/* CONTENT */}

                      <div className="recommend-info">


                        <p className="recommend-brand-name">

                          {perfume.brand}

                        </p>


                        <h3>

                          {perfume.name}

                        </h3>


                        <p className="recommend-family">

                          {

                            perfume.fragranceFamily ||

                            perfume.notes ||

                            "A carefully selected fragrance"

                          }

                        </p>


                        {/* META TAGS */}

                        <div className="recommend-meta">


                          <span>

                            {perfume.category}

                          </span>


                          {perfume.season && (

                            <span>

                              {perfume.season}

                            </span>

                          )}


                          {perfume.longevity && (

                            <span>

                              {perfume.longevity}

                            </span>

                          )}


                        </div>


                        {/* VIEW DETAILS */}

                        <button

                          className="explore-button"

                          onClick={() =>

                            navigate(

                              `/perfume/${perfume.id}`

                            )

                          }

                        >

                          View Details →

                        </button>


                      </div>


                    </article>

                  )

                )}


              </div>


            </section>

          )}


        {/* ================= NO RESULTS ================= */}

        {!loading &&

          answers.length > 0 &&

          recommendations.length === 0 && (

            <section className="no-recommendations">


              <h2>

                No recommendations available

              </h2>


              <p>

                We couldn't find perfumes in your
                collection. Please check that your
                backend and perfume database are
                running.

              </p>


              <button

                onClick={() =>
                  navigate(
                    "/perfumes"
                  )
                }

              >

                Explore Collection →

              </button>


            </section>

          )}


        {/* ================= RETAKE ================= */}

        {answers.length > 0 && (

          <div className="retake-section">


            <p>

              Want to explore a different scent
              personality?

            </p>


            <button

              className="retake"

              onClick={
                retakeQuiz
              }

            >

              ↻ Retake Quiz

            </button>


          </div>

        )}


      </main>


    </div>

  );

}