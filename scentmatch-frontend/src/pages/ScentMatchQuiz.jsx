import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/ScentMatchQuiz.css";

const questions = [
  {
    id: "gender",
    question: "Who are you choosing this fragrance for?",
    subtitle:
      "This helps us understand the fragrance style you may prefer.",
    options: [
      {
        title: "Male",
        description: "Traditionally masculine fragrance styles"
      },
      {
        title: "Female",
        description: "Traditionally feminine fragrance styles"
      },
      {
        title: "Unisex",
        description: "Balanced fragrances for everyone"
      },
      {
        title: "No preference",
        description: "Show me the best match regardless of gender"
      }
    ]
  },

  {
    id: "family",
    question: "Which fragrance family attracts you the most?",
    subtitle:
      "Choose the scent profile that sounds most appealing to you.",
    options: [
      {
        title: "Fresh & Citrus",
        description: "Clean, energetic and refreshing"
      },
      {
        title: "Floral",
        description: "Elegant, soft and romantic"
      },
      {
        title: "Woody",
        description: "Warm, sophisticated and natural"
      },
      {
        title: "Sweet & Vanilla",
        description: "Rich, comforting and addictive"
      }
    ]
  },

  {
    id: "notes",
    question: "Which fragrance notes do you enjoy?",
    subtitle:
      "Pick the note style that best matches your taste.",
    options: [
      {
        title: "Citrus & Fresh",
        description: "Bergamot, lemon, orange and aquatic notes"
      },
      {
        title: "Floral & Soft",
        description: "Rose, jasmine and other elegant flowers"
      },
      {
        title: "Woody & Earthy",
        description: "Sandalwood, cedar and vetiver"
      },
      {
        title: "Sweet & Warm",
        description: "Vanilla, amber, caramel and tonka"
      }
    ]
  },

  {
    id: "occasion",
    question: "When do you usually wear perfume?",
    subtitle:
      "Your lifestyle helps us recommend the right fragrance.",
    options: [
      {
        title: "Daily Routine",
        description: "Easy, versatile and comfortable scents"
      },
      {
        title: "Work & Formal",
        description: "Professional and sophisticated fragrances"
      },
      {
        title: "Dates & Evenings",
        description: "Attractive, warm and memorable scents"
      },
      {
        title: "Special Occasions",
        description: "Luxurious fragrances that make an impression"
      }
    ]
  },

  {
    id: "season",
    question: "Which weather do you wear perfume in most?",
    subtitle:
      "Some fragrances perform better in certain seasons.",
    options: [
      {
        title: "Summer",
        description: "Fresh, light and refreshing scents"
      },
      {
        title: "Winter",
        description: "Warm, sweet and intense fragrances"
      },
      {
        title: "Spring",
        description: "Floral, clean and uplifting scents"
      },
      {
        title: "All Seasons",
        description: "Versatile fragrances for every occasion"
      }
    ]
  },

  {
    id: "longevity",
    question: "How long should your perfume last?",
    subtitle:
      "Choose your preferred fragrance longevity.",
    options: [
      {
        title: "Light",
        description: "Around 3 to 5 hours"
      },
      {
        title: "Moderate",
        description: "Around 5 to 7 hours"
      },
      {
        title: "Long Lasting",
        description: "Around 7 to 10 hours"
      },
      {
        title: "Very Long Lasting",
        description: "Strong performance throughout the day"
      }
    ]
  },

  {
    id: "strength",
    question: "Do you prefer a strong or smooth fragrance?",
    subtitle:
      "This helps us understand your preferred scent intensity.",
    options: [
      {
        title: "Smooth & Subtle",
        description: "Soft fragrances that stay close to the skin"
      },
      {
        title: "Balanced",
        description: "Noticeable but not overwhelming"
      },
      {
        title: "Strong & Bold",
        description: "Powerful fragrances that make a statement"
      },
      {
        title: "Very Strong",
        description: "Intense projection and maximum presence"
      }
    ]
  },

  {
    id: "mood",
    question: "Which personality describes you best?",
    subtitle:
      "Your personality can help us find a fragrance that feels like you.",
    options: [
      {
        title: "Fresh & Energetic",
        description: "Active, confident and full of energy"
      },
      {
        title: "Elegant & Calm",
        description: "Sophisticated, relaxed and refined"
      },
      {
        title: "Bold & Confident",
        description: "Strong, powerful and attention-grabbing"
      },
      {
        title: "Warm & Mysterious",
        description: "Deep, attractive and unforgettable"
      }
    ]
  }
];


export default function ScentMatchQuiz() {

  const navigate = useNavigate();

  const [step, setStep] = useState(0);

  const [answers, setAnswers] = useState({});


  const currentQuestion = questions[step];


  const progress =
    ((step + 1) / questions.length) * 100;


  // =========================================
  // SELECT OPTION
  // =========================================

  const chooseOption = (option) => {

    setAnswers((previousAnswers) => ({

      ...previousAnswers,

      [currentQuestion.id]: option.title

    }));

  };


  // =========================================
  // NEXT QUESTION
  // =========================================

  const nextQuestion = () => {

    // User must select an answer first

    if (!answers[currentQuestion.id]) {
      return;
    }


    // Move to next question

    if (step < questions.length - 1) {

      setStep(step + 1);

    } else {

      // Quiz completed

      navigate(
        "/recommendations",
        {
          state: {
            answers
          }
        }
      );

    }

  };


  // =========================================
  // PREVIOUS QUESTION
  // =========================================

  const previousQuestion = () => {

    if (step > 0) {

      setStep(step - 1);

    }

  };


  return (

    <div className="quiz-page">


      {/* =====================================
          TOP NAVIGATION
      ===================================== */}

      <div className="quiz-top">


        <button
          className="quiz-back"
          onClick={() =>
            navigate("/dashboard")
          }
        >

          ← Dashboard

        </button>


        <div className="quiz-brand">

          <span>
            ✦
          </span>

          ScentMatch AI

        </div>


        {step > 0 ? (

          <button
            className="quiz-previous"
            onClick={previousQuestion}
          >

            ← Previous

          </button>

        ) : (

          <div className="quiz-placeholder"></div>

        )}


      </div>



      {/* =====================================
          QUIZ CARD
      ===================================== */}

      <main className="quiz-card">


        {/* ===================================
            PROGRESS
        =================================== */}

        <div className="quiz-progress-section">


          <div className="quiz-progress">

            <span
              style={{
                width: `${progress}%`
              }}
            />

          </div>


          <div className="progress-text">

            <span>

              Your Scent Profile

            </span>


            <span>

              {step + 1} / {questions.length}

            </span>

          </div>


        </div>



        {/* ===================================
            QUESTION NUMBER
        =================================== */}

        <p className="quiz-question-number">

          QUESTION {step + 1}

          {" "}

          OF

          {" "}

          {questions.length}

        </p>



        {/* ===================================
            QUESTION
        =================================== */}

        <h1>

          {currentQuestion.question}

        </h1>



        {/* ===================================
            SUBTITLE
        =================================== */}

        <p className="quiz-subtitle">

          {currentQuestion.subtitle}

        </p>



        {/* ===================================
            OPTIONS
        =================================== */}

        <div className="quiz-options">


          {currentQuestion.options.map(
            (option) => (

              <button
                key={option.title}

                className={`quiz-option ${
                  answers[currentQuestion.id] === option.title
                    ? "selected"
                    : ""
                }`}

                onClick={() =>
                  chooseOption(option)
                }
              >


                <div className="option-content">


                  <span className="option-title">

                    {option.title}

                  </span>


                  <small>

                    {option.description}

                  </small>


                </div>


                <span className="option-arrow">

                  →

                </span>


              </button>

            )
          )}


        </div>



        {/* ===================================
            BOTTOM SECTION
        =================================== */}

        <div className="quiz-bottom">


          {/* STEP INDICATOR */}

          <div className="quiz-step-indicator">


            {questions.map(
              (_, index) => (

                <span
                  key={index}

                  className={

                    index === step

                      ? "active"

                      : index < step

                        ? "completed"

                        : ""

                  }

                />

              )
            )}


          </div>



          {/* NEXT BUTTON */}

          <button
            className="quiz-next"

            disabled={
              !answers[currentQuestion.id]
            }

            onClick={nextQuestion}
          >


            {step === questions.length - 1

              ? "See My Matches ✦"

              : "Continue →"

            }


          </button>


        </div>


      </main>


    </div>

  );

}