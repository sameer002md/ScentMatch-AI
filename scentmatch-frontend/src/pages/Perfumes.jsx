import {
  useEffect,
  useMemo,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  getPerfumes,
  deletePerfume
} from "../services/api";

import "../styles/Perfumes.css";


export default function Perfumes() {


  const navigate =
    useNavigate();


  // ==========================================
  // STATE
  // ==========================================

  const [perfumes, setPerfumes] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("All");

  const [loading, setLoading] =
    useState(true);

  const [deletingId, setDeletingId] =
    useState(null);

  const [error, setError] =
    useState("");


  // ==========================================
  // GET CURRENT USER
  // ==========================================

  const userData =
    localStorage.getItem("user");


  let currentUser = null;


  try {

    currentUser =
      userData
        ? JSON.parse(userData)
        : null;

  } catch (error) {

    console.error(
      "Invalid user data:",
      error
    );

  }


  // ==========================================
  // CHECK ADMIN
  // ==========================================

  const isAdmin =
    currentUser?.role === "ADMIN";


  // ==========================================
  // LOAD PERFUMES
  // ==========================================

  useEffect(() => {


    const loadPerfumes =
      async () => {


        try {

          setLoading(true);


          const data =
            await getPerfumes();


          console.log(
            "PERFUMES FROM BACKEND:",
            data
          );


          setPerfumes(

            Array.isArray(data)
              ? data
              : []

          );


        } catch (error) {

          console.error(

            "Error loading perfumes:",

            error

          );


          setError(

            "Unable to load perfumes."

          );


          setPerfumes([]);

        } finally {

          setLoading(false);

        }

      };


    loadPerfumes();


  }, []);


  // ==========================================
  // REMOVE PERFUME
  // ==========================================

  const handleDelete =
    async (id, name) => {


      const confirmDelete =
        window.confirm(

          `Are you sure you want to remove "${name}" from the ScentMatch collection?`

        );


      if (!confirmDelete) {

        return;

      }


      try {

        setDeletingId(id);


        await deletePerfume(id);


        // ======================================
        // REMOVE FROM UI IMMEDIATELY
        // ======================================

        setPerfumes((previousPerfumes) =>

          previousPerfumes.filter(

            (perfume) =>
              perfume.id !== id

          )

        );


        alert(

          `"${name}" has been removed successfully.`

        );


      } catch (error) {

        console.error(

          "Delete error:",

          error

        );


        alert(

          error.message ||
          "Unable to remove perfume."

        );


      } finally {

        setDeletingId(null);

      }

    };


  // ==========================================
  // NORMALIZE DATA
  // ==========================================

  const normalizedPerfumes =
    useMemo(() => {


      return perfumes.map((p) => ({

        ...p,


        image:

          p.image ||

          p.imageUrl ||

          "/perfumes/default.jpg",


        category:

          p.category ||

          p.gender ||

          "Unisex",


        notes:

          p.notes ||

          [

            p.topNotes,

            p.middleNotes,

            p.baseNotes

          ]

            .filter(Boolean)

            .join(", ")

          ||

          "Notes coming soon"

      }));


    }, [perfumes]);


  // ==========================================
  // FILTER PERFUMES
  // ==========================================

  const filtered =
    useMemo(() => {


      return normalizedPerfumes.filter(

        (p) => {


          const text = `

            ${p.name || ""}

            ${p.brand || ""}

            ${p.notes || ""}

            ${p.fragranceFamily || ""}

          `.toLowerCase();


          const matchesSearch =

            text.includes(

              search.toLowerCase()

            );


          const matchesCategory =

            category === "All" ||

            p.category === category;


          return (

            matchesSearch &&

            matchesCategory

          );

        }

      );


    }, [

      normalizedPerfumes,

      search,

      category

    ]);


  return (


    <div className="perfumes-page">


      {/* ================= HEADER ================= */}

      <header className="perfumes-top">


        <div

          onClick={() =>

            navigate("/dashboard")

          }

          className="simple-brand"

        >


          <span>

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


        <div className="perfumes-header-actions">


          {isAdmin && (

            <button

              className="admin-panel-button"

              onClick={() =>

                navigate("/admin")

              }

            >

              Admin Panel

            </button>

          )}


          <button

            onClick={() =>

              navigate(

                isAdmin
                  ? "/admin"
                  : "/dashboard"

              )

            }

          >

            ← Dashboard

          </button>


        </div>


      </header>



      {/* ================= MAIN ================= */}

      <main className="perfumes-main">



        {/* ================= INTRO ================= */}

        <section className="perfumes-intro">


          <p>

            CURATED FRAGRANCE COLLECTION

          </p>


          <h1>

            Explore your next

            <span>

              {" "}signature scent.

            </span>

          </h1>


          <h3>

            Search, compare and discover
            fragrances that match your mood,
            personality and occasion.

          </h3>


        </section>



        {/* ================= FILTERS ================= */}

        <section className="filters">


          <div className="search-box">


            <span>

              🔎

            </span>


            <input

              value={search}

              onChange={(e) =>

                setSearch(
                  e.target.value
                )

              }

              placeholder="Search perfume, brand or notes..."

            />


          </div>



          <select

            value={category}

            onChange={(e) =>

              setCategory(
                e.target.value
              )

            }

          >


            <option value="All">

              All

            </option>


            <option value="Men">

              Men

            </option>


            <option value="Women">

              Women

            </option>


            <option value="Unisex">

              Unisex

            </option>


          </select>


        </section>



        {/* ================= ADMIN NOTICE ================= */}

        {isAdmin && (

          <div className="admin-mode-banner">


            <span>

              ✦ ADMIN MODE

            </span>


            <p>

              You can manually remove perfumes
              from the collection.

            </p>


          </div>

        )}



        {/* ================= ERROR ================= */}

        {error && (

          <div className="perfumes-error">

            {error}

          </div>

        )}



        {/* ================= RESULT LINE ================= */}

        <div className="result-line">


          <span>


            <b>

              {loading
                ? "..."
                : filtered.length}

            </b>


            {" "}fragrances found


          </span>


          <span>

            Hand-picked for discovery ✦

          </span>


        </div>



        {/* ================= LOADING ================= */}

        {loading && (

          <div className="perfume-loading">


            <div className="loader">

            </div>


            <p>

              Loading your fragrance collection...

            </p>


          </div>

        )}



        {/* ================= EMPTY RESULT ================= */}

        {!loading &&

          filtered.length === 0 && (

            <div className="no-perfumes">


              <div>

                ✦

              </div>


              <h2>

                No fragrances found

              </h2>


              <p>

                Try changing your search
                or selecting another category.

              </p>


              <button

                onClick={() => {


                  setSearch("");


                  setCategory("All");


                }}

              >

                Clear Filters

              </button>


            </div>

          )}



        {/* ================= PERFUME GRID ================= */}

        {!loading &&

          filtered.length > 0 && (

            <section className="perfume-grid">


              {filtered.map((p) => (


                <article

                  className="perfume-card"

                  key={p.id}

                  onClick={() =>

                    navigate(

                      `/perfume/${p.id}`

                    )

                  }

                  role="button"

                  tabIndex={0}

                  onKeyDown={(e) => {


                    if (

                      e.key === "Enter"

                    ) {


                      navigate(

                        `/perfume/${p.id}`

                      );


                    }


                  }}

                >



                  {/* ================= IMAGE ================= */}

                  <div className="card-image">


                    <img

                      src={p.image}

                      alt={p.name}

                      loading="lazy"

                      onError={(e) => {


                        e.currentTarget.src =

                          "/perfumes/default.jpg";


                      }}

                    />


                    <span>

                      {p.category}

                    </span>


                  </div>



                  {/* ================= CARD BODY ================= */}

                  <div className="card-body">


                    <p className="card-brand">

                      {p.brand}

                    </p>


                    <h2>

                      {p.name}

                    </h2>


                    <p className="card-notes">

                      {p.notes}

                    </p>



                    {/* ================= ACTIONS ================= */}

                    <div className="card-bottom">


                      <b>

                        ₹

                        {Number(

                          p.price || 0

                        ).toLocaleString()}

                      </b>


                      <div className="perfume-actions">


                        {/* VIEW */}

                        <button

                          className="view-button"

                          onClick={(e) => {


                            e.stopPropagation();


                            navigate(

                              `/perfume/${p.id}`

                            );


                          }}

                        >

                          View Details →

                        </button>



                        {/* ================= DELETE ================= */}

                        {isAdmin && (

                          <button

                            className="remove-button"

                            disabled={

                              deletingId === p.id

                            }

                            onClick={(e) => {


                              e.stopPropagation();


                              handleDelete(

                                p.id,

                                p.name

                              );


                            }}

                          >

                            {deletingId === p.id

                              ? "Removing..."

                              : "Remove"

                            }

                          </button>

                        )}


                      </div>


                    </div>


                  </div>


                </article>


              ))}


            </section>

          )}


      </main>


    </div>


  );

}