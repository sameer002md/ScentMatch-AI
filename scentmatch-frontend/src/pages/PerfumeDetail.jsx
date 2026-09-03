import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getPerfumeById } from "../services/api";

import "../styles/PerfumeDetail.css";

export default function PerfumeDetail() {

  const { id } = useParams();

  const navigate = useNavigate();


  // ==========================================
  // STATE
  // ==========================================

  const [perfume, setPerfume] = useState(null);

  const [loading, setLoading] = useState(true);

  const [favorite, setFavorite] = useState(false);


  // ==========================================
  // LOAD PERFUME
  // ==========================================

  useEffect(() => {

    const loadPerfume = async () => {

      try {

        setLoading(true);


        const data =
          await getPerfumeById(id);


        console.log(
          "PERFUME DETAIL DATA:",
          data
        );


        setPerfume(data);

      }

      catch (error) {

        console.error(
          "Error loading perfume:",
          error
        );


        setPerfume(null);

      }

      finally {

        setLoading(false);

      }

    };


    loadPerfume();

  }, [id]);


  // ==========================================
  // CHECK FAVORITE
  // ==========================================

  useEffect(() => {

    if (!perfume) return;


    const savedFavorites =

      JSON.parse(
        localStorage.getItem(
          "scentmatchFavorites"
        )
      ) || [];


    const isFavorite =

      savedFavorites.some(

        (item) =>

          String(item.id) ===
          String(perfume.id)

      );


    setFavorite(isFavorite);


  }, [perfume]);


  // ==========================================
  // ADD / REMOVE FAVORITE
  // ==========================================

  const toggleFavorite = () => {

    if (!perfume) return;


    const savedFavorites =

      JSON.parse(
        localStorage.getItem(
          "scentmatchFavorites"
        )
      ) || [];


    const existingIndex =

      savedFavorites.findIndex(

        (item) =>

          String(item.id) ===
          String(perfume.id)

      );


    // ==========================================
    // REMOVE FAVORITE
    // ==========================================

    if (existingIndex !== -1) {


      const updatedFavorites =

        savedFavorites.filter(

          (item) =>

            String(item.id) !==
            String(perfume.id)

        );


      localStorage.setItem(

        "scentmatchFavorites",

        JSON.stringify(
          updatedFavorites
        )

      );


      setFavorite(false);

    }


    // ==========================================
    // ADD FAVORITE
    // ==========================================

    else {


      const updatedFavorites = [

        ...savedFavorites,

        perfume

      ];


      localStorage.setItem(

        "scentmatchFavorites",

        JSON.stringify(
          updatedFavorites
        )

      );


      setFavorite(true);

    }

  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div className="detail-loading">

        <div className="loader"></div>


        <p>

          Loading your fragrance...

        </p>

      </div>

    );

  }


  // ==========================================
  // NOT FOUND
  // ==========================================

  if (!perfume) {

    return (

      <div className="detail-loading">


        <h2>

          Perfume not found

        </h2>


        <button

          onClick={() =>

            navigate("/perfumes")

          }

        >

          ← Back to Collection

        </button>


      </div>

    );

  }


  // ==========================================
  // IMAGE
  // ==========================================

  const image =

    perfume.image ||

    perfume.imageUrl ||

    "/perfumes/default.jpg";


  // ==========================================
  // CATEGORY
  // ==========================================

  const category =

    perfume.category ||

    perfume.gender ||

    "Unisex";


  // ==========================================
  // NOTES
  // ==========================================

  const notes =

    perfume.notes ||

    [

      perfume.topNotes,

      perfume.middleNotes,

      perfume.baseNotes

    ]

      .filter(Boolean)

      .join(", ") ||

    "Fragrance notes information coming soon.";


  const topNotes =

    perfume.topNotes ||

    "Not available";


  const middleNotes =

    perfume.middleNotes ||

    "Not available";


  const baseNotes =

    perfume.baseNotes ||

    "Not available";


  // ==========================================
  // UI
  // ==========================================

  return (

    <div className="perfume-detail-page">


      {/* ======================================
          NAVBAR
      ====================================== */}

      <header className="detail-navbar">


        <div

          className="detail-brand"

          onClick={() =>

            navigate("/dashboard")

          }

        >


          <span className="detail-logo">

            ✦

          </span>


          <div>


            <b>

              ScentMatch

            </b>


            <small>

              AI FRAGRANCE DISCOVERY

            </small>


          </div>


        </div>


        <button

          className="back-collection-btn"

          onClick={() =>

            navigate("/perfumes")

          }

        >

          ← Back to Collection

        </button>


      </header>


      {/* ======================================
          MAIN CONTENT
      ====================================== */}

      <main className="detail-container">


        {/* ======================================
            IMAGE
        ====================================== */}

        <section className="detail-image-section">


          <div className="detail-image">


            <img

              src={image}

              alt={perfume.name}

              onError={(e) => {

                e.currentTarget.onerror = null;

                e.currentTarget.src =
                  "/perfumes/default.jpg";

              }}

            />


            <span className="image-category">

              {category}

            </span>


          </div>


        </section>


        {/* ======================================
            PERFUME INFORMATION
        ====================================== */}

        <section className="detail-info">


          {/* BRAND */}

          <p className="detail-brand-name">

            {perfume.brand}

          </p>


          {/* NAME */}

          <h1>

            {perfume.name}

          </h1>


          {/* PRICE */}

          <h2 className="detail-price">

            ₹

            {Number(
              perfume.price || 0
            ).toLocaleString()}

          </h2>


          {/* DESCRIPTION */}

          <p className="detail-description">


            {

              perfume.description ||

              `Discover the unique character of ${perfume.name}, a carefully selected fragrance from ${perfume.brand}.`

            }


          </p>


          {/* ======================================
              TAGS
          ====================================== */}

          <div className="detail-tags">


            <span>

              {category}

            </span>


            {perfume.season && (

              <span>

                {perfume.season}

              </span>

            )}


            {perfume.occasion && (

              <span>

                {perfume.occasion}

              </span>

            )}


          </div>


          {/* ======================================
              FRAGRANCE NOTES
          ====================================== */}

          <div className="notes-box">


            <div className="notes-header">


              <div>


                <p>

                  FRAGRANCE PROFILE

                </p>


                <h2>

                  Fragrance Notes

                </h2>


              </div>


              <span>

                ✦

              </span>


            </div>


            <p className="notes-summary">

              {notes}

            </p>


            {/* NOTE PYRAMID */}

            {

              (

                perfume.topNotes ||

                perfume.middleNotes ||

                perfume.baseNotes

              )

              &&


              (

                <div className="note-pyramid">


                  <div>


                    <span>

                      TOP NOTES

                    </span>


                    <p>

                      {topNotes}

                    </p>


                  </div>


                  <div>


                    <span>

                      HEART NOTES

                    </span>


                    <p>

                      {middleNotes}

                    </p>


                  </div>


                  <div>


                    <span>

                      BASE NOTES

                    </span>


                    <p>

                      {baseNotes}

                    </p>


                  </div>


                </div>

              )

            }


          </div>


          {/* ======================================
              EXTRA INFORMATION
          ====================================== */}

          <div className="perfume-extra-info">


            {

              perfume.fragranceFamily && (

                <div>


                  <span>

                    Fragrance Family

                  </span>


                  <b>

                    {perfume.fragranceFamily}

                  </b>


                </div>

              )

            }


            {

              perfume.longevity && (

                <div>


                  <span>

                    Longevity

                  </span>


                  <b>

                    {perfume.longevity}

                  </b>


                </div>

              )

            }


            {

              perfume.sillage && (

                <div>


                  <span>

                    Sillage

                  </span>


                  <b>

                    {perfume.sillage}

                  </b>


                </div>

              )

            }


          </div>


          {/* ======================================
              FAVORITE BUTTON
          ====================================== */}

          <button

            className={

              `favorite-btn ${
                favorite ? "active" : ""
              }`

            }

            onClick={toggleFavorite}

          >


            {

              favorite

                ? "♥ Added to Favorites"

                : "♡ Add to Favorites"

            }


          </button>


        </section>


      </main>


    </div>

  );

}