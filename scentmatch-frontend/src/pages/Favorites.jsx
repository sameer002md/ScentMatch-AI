import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/Favorites.css";


export default function Favorites() {

  const navigate = useNavigate();


  // ================= STATE =================

  const [favorites, setFavorites] =
    useState([]);



  // ================= LOAD FAVORITES =================

  useEffect(() => {

    loadFavorites();

  }, []);



  const loadFavorites = () => {

    try {

      const savedFavorites =
        JSON.parse(
          localStorage.getItem(
            "scentmatchFavorites"
          )
        ) || [];


      setFavorites(savedFavorites);

    } catch (error) {

      console.error(
        "Error loading favorites:",
        error
      );

      setFavorites([]);

    }

  };



  // ================= REMOVE FAVORITE =================

  const removeFavorite = (id) => {

    const updatedFavorites =
      favorites.filter(
        (perfume) =>
          String(perfume.id) !== String(id)
      );


    setFavorites(updatedFavorites);


    localStorage.setItem(
      "scentmatchFavorites",
      JSON.stringify(updatedFavorites)
    );

  };



  return (

    <div className="favorites-page">


      {/* ================= NAVBAR ================= */}

      <nav className="favorites-nav">


        <div
          className="favorites-brand"
          onClick={() =>
            navigate("/dashboard")
          }
        >

          <span>
            ✦
          </span>


          <div>

            <b>
              ScentMatch
            </b>

            <small>
              YOUR FRAGRANCE COLLECTION
            </small>

          </div>


        </div>



        <button
          className="favorites-back"
          onClick={() =>
            navigate("/dashboard")
          }
        >

          ← Dashboard

        </button>


      </nav>



      {/* ================= MAIN ================= */}

      <main className="favorites-main">


        {/* ================= HERO ================= */}

        <section className="favorites-hero">


          <p className="favorites-eyebrow">

            YOUR PERSONAL COLLECTION

          </p>



          <h1>

            Fragrances you

            <span>
              {" "}love.
            </span>

          </h1>



          <p>

            Keep track of your favorite scents
            and build your own personal fragrance
            collection.

          </p>


        </section>



        {/* ================= FAVORITE COUNT ================= */}

        {favorites.length > 0 && (

          <div className="favorites-info">


            <div>

              <span className="favorites-count">

                {favorites.length}

              </span>


              <span>

                {favorites.length === 1
                  ? " fragrance saved"
                  : " fragrances saved"}

              </span>

            </div>



            <button
              onClick={() =>
                navigate("/perfumes")
              }
            >

              + Explore More

            </button>


          </div>

        )}



        {/* ================= FAVORITES GRID ================= */}

        {favorites.length > 0 ? (

          <section className="favorites-grid">


            {favorites.map((perfume) => {


              const image =
                perfume.image ||
                perfume.imageUrl ||
                "/perfumes/default.jpg";


              return (

                <article
                  className="favorite-card"
                  key={perfume.id}
                  onClick={() =>
                    navigate(
                      `/perfume/${perfume.id}`
                    )
                  }
                >


                  {/* IMAGE */}

                  <div className="favorite-image">


                    <img
                      src={image}
                      alt={perfume.name}
                      onError={(e) => {

                        e.currentTarget.onerror = null;

                        e.currentTarget.src =
                          "/perfumes/default.jpg";

                      }}
                    />


                    <span className="favorite-badge">

                      ♥ Favorite

                    </span>


                  </div>



                  {/* DETAILS */}

                  <div className="favorite-details">


                    <p className="favorite-brand">

                      {perfume.brand}

                    </p>



                    <h2>

                      {perfume.name}

                    </h2>



                    <p className="favorite-family">

                      {perfume.fragranceFamily ||
                        perfume.notes ||
                        "Signature fragrance"}

                    </p>



                    <div className="favorite-bottom">


                      <strong>

                        ₹
                        {Number(
                          perfume.price || 0
                        ).toLocaleString()}

                      </strong>



                      <button
                        className="remove-favorite"
                        onClick={(e) => {

                          e.stopPropagation();

                          removeFavorite(
                            perfume.id
                          );

                        }}
                      >

                        Remove

                      </button>


                    </div>


                  </div>


                </article>

              );

            })}


          </section>

        ) : (


          /* ================= EMPTY STATE ================= */

          <section className="favorites-empty">


            <div className="empty-icon">

              ♡

            </div>



            <p className="empty-label">

              YOUR COLLECTION IS EMPTY

            </p>



            <h2>

              Start collecting

              <span>
                {" "}your favorites.
              </span>

            </h2>



            <p>

              Explore our fragrance collection
              and save the scents that speak to you.

              Your personal scent journey starts here.

            </p>



            <button
              onClick={() =>
                navigate("/perfumes")
              }
            >

              Explore Perfumes →

            </button>


          </section>

        )}



        {/* ================= EXPLORE CTA ================= */}

        {favorites.length > 0 && (

          <section className="favorites-cta">


            <div>


              <p>

                KEEP DISCOVERING

              </p>



              <h2>

                Your next favorite scent
                might be waiting.

              </h2>


            </div>



            <button
              onClick={() =>
                navigate("/perfumes")
              }
            >

              Explore Collection →

            </button>


          </section>

        )}


      </main>


    </div>

  );

}