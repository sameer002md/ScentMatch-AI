import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Preferences.css";

const options = [
  "Fresh",
  "Citrus",
  "Woody",
  "Floral",
  "Sweet",
  "Spicy",
  "Musky",
  "Vanilla"
];

export default function Preferences() {
  const navigate = useNavigate();

  const [selected, setSelected] = useState(() => {
    const savedPreferences =
      localStorage.getItem("scentPreferences");

    if (savedPreferences) {
      try {
        return JSON.parse(savedPreferences);
      } catch {
        return ["Woody"];
      }
    }

    return ["Woody"];
  });

  const [message, setMessage] = useState("");

  const toggle = (option) => {
    setSelected((current) => {

      if (current.includes(option)) {
        return current.filter(
          (item) => item !== option
        );
      }

      return [
        ...current,
        option
      ];
    });

    setMessage("");
  };


  const savePreferences = () => {

    if (selected.length === 0) {
      setMessage(
        "Please select at least one scent family."
      );

      return;
    }

    localStorage.setItem(
      "scentPreferences",
      JSON.stringify(selected)
    );

    setMessage(
      "✓ Your scent preferences have been saved!"
    );
  };


  return (

    <div className="preferences-page">

      {/* BACK BUTTON */}

      <button
        className="page-back"
        onClick={() =>
          navigate("/dashboard")
        }
      >
        ← Dashboard
      </button>


      {/* HERO */}

      <div className="simple-hero">

        <p>
          YOUR SCENT PROFILE
        </p>

        <h1>
          Fine-tune your
          <span>
            {" "}preferences.
          </span>
        </h1>

        <h3>
          Help ScentMatch understand
          the fragrance families you
          enjoy most.
        </h3>

      </div>


      {/* PREFERENCE CARD */}

      <section className="preference-card">

        <div className="preference-heading">

          <p>
            PERSONALIZATION
          </p>

          <h2>
            Choose your favorite scent families
          </h2>

          <span>
            Select all the fragrance profiles
            that appeal to you.
          </span>

        </div>


        {/* OPTIONS */}

        <div className="choice-grid">

          {options.map((option) => (

            <button
              type="button"

              className={
                selected.includes(option)
                  ? "choice active"
                  : "choice"
              }

              onClick={() =>
                toggle(option)
              }

              key={option}
            >

              {selected.includes(option) && (
                <span className="check-mark">
                  ✓
                </span>
              )}

              {option}

            </button>

          ))}

        </div>


        {/* SELECTED COUNT */}

        <p className="selected-count">

          {selected.length === 0
            ? "No preferences selected"
            : `${selected.length} scent ${
                selected.length === 1
                  ? "family"
                  : "families"
              } selected`
          }

        </p>


        {/* MESSAGE */}

        {message && (

          <div
            className={
              selected.length === 0
                ? "preference-error"
                : "preference-success"
            }
          >

            {message}

          </div>

        )}


        {/* ACTIONS */}

        <div className="preference-actions">

          <button
            type="button"
            className="reset-preferences"
            onClick={() => {
              setSelected([]);
              setMessage("");
            }}
          >
            Reset
          </button>


          <button
            type="button"
            className="save-preferences"
            onClick={savePreferences}
          >
            Save Preferences ✦
          </button>

        </div>

      </section>

    </div>
  );
}