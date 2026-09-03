import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getAllPerfumes,
  deletePerfume,
} from "../services/api";

import "../styles/AdminDashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [perfumes, setPerfumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  // ==========================================
  // LOAD ALL PERFUMES
  // ==========================================

  const loadPerfumes = async () => {
    try {
      setLoading(true);

      const data = await getAllPerfumes();

      console.log("ADMIN PERFUMES:", data);

      setPerfumes(Array.isArray(data) ? data : []);

    } catch (error) {
      console.error(
        "Error loading perfumes:",
        error
      );

      setPerfumes([]);

    } finally {
      setLoading(false);
    }
  };


  // ==========================================
  // LOAD ON PAGE OPEN
  // ==========================================

  useEffect(() => {
    loadPerfumes();
  }, []);


  // ==========================================
  // DELETE PERFUME
  // ==========================================

  const handleDelete = async (id, name) => {
    const confirmed = window.confirm(
      `Are you sure you want to remove "${name}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);

      await deletePerfume(id);

      setPerfumes((previousPerfumes) =>
        previousPerfumes.filter(
          (perfume) =>
            String(perfume.id) !== String(id)
        )
      );

      alert(
        `"${name}" has been removed successfully.`
      );

    } catch (error) {
      console.error(
        "Error deleting perfume:",
        error
      );

      alert(
        "Unable to remove this perfume. Please try again."
      );

    } finally {
      setDeletingId(null);
    }
  };


  // ==========================================
  // LOGOUT ADMIN
  // ==========================================

  const handleExitAdmin = () => {
    navigate("/dashboard");
  };


  // ==========================================
  // TOTAL PERFUMES
  // ==========================================

  const totalPerfumes = perfumes.length;


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="admin-loader"></div>

        <p>
          Loading perfume collection...
        </p>
      </div>
    );
  }


  // ==========================================
  // MAIN UI
  // ==========================================

  return (
    <div className="admin-dashboard">

      {/* =====================================
          NAVBAR
      ===================================== */}

      <header className="admin-navbar">

        <div className="admin-brand">

          <div className="admin-logo">
            ✦
          </div>

          <div className="admin-brand-text">

            <h2>
              ScentMatch
            </h2>

            <span>
              ADMIN CONTROL CENTER
            </span>

          </div>

        </div>


        <div className="admin-nav-actions">

          <button
            className="nav-btn"
            onClick={() =>
              navigate("/perfumes")
            }
          >
            View Collection
          </button>


          <button
            className="exit-admin-btn"
            onClick={handleExitAdmin}
          >
            Exit Admin
          </button>

        </div>

      </header>



      {/* =====================================
          CONTENT
      ===================================== */}

      <main className="admin-content">


        {/* ===================================
            HERO
        =================================== */}

        <section className="admin-hero">

          <div>

            <p className="admin-label">
              ADMIN CONTROL PANEL
            </p>


            <h1>

              Welcome back,
              {" "}

              <span>
                Admin.
              </span>

            </h1>


            <p className="admin-description">

              Manage your fragrance collection,
              review perfumes and keep your
              ScentMatch platform beautifully
              organized.

            </p>

          </div>


          <button
            className="add-perfume-btn"
            onClick={() =>
              navigate("/admin/add-perfume")
            }
          >
            ＋ Add New Perfume
          </button>

        </section>



        {/* ===================================
            STATS
        =================================== */}

        <section className="admin-stats">


          <div className="stat-card">

            <div className="stat-icon">
              ✿
            </div>


            <div className="stat-content">

              <span className="stat-title">
                Total Perfumes
              </span>

              <strong className="stat-value">
                {totalPerfumes}
              </strong>

            </div>

          </div>



          <div className="stat-card">

            <div className="stat-icon">
              ✦
            </div>


            <div className="stat-content">

              <span className="stat-title">
                AI Features
              </span>

              <strong className="stat-value">
                2
              </strong>

            </div>

          </div>



          <div className="stat-card">

            <div className="stat-icon">
              ♥
            </div>


            <div className="stat-content">

              <span className="stat-title">
                Platform
              </span>

              <strong className="stat-value">
                Active
              </strong>

            </div>

          </div>



          <div className="stat-card">

            <div className="stat-icon">
              ⚙
            </div>


            <div className="stat-content">

              <span className="stat-title">
                Management
              </span>

              <strong className="stat-value">
                Ready
              </strong>

            </div>

          </div>


        </section>



        {/* ===================================
            PERFUME MANAGEMENT
        =================================== */}

        <section className="management-section">


          <div className="management-heading">

            <div className="management-heading-left">

              <p className="admin-label">
                PERFUME MANAGEMENT
              </p>


              <h2>
                Manage your collection.
              </h2>


              <p>
                Review, view and manually remove
                perfume data from your collection.
              </p>

            </div>


            <button
              className="small-add-btn"
              onClick={() =>
                navigate("/admin/add-perfume")
              }
            >
              ＋ Add Perfume
            </button>

          </div>



          {/* ================================
              PERFUME TABLE
          ================================= */}

          <div className="perfume-table">


            {/* TABLE HEADER */}

            <div className="table-header">

              <div>
                PERFUME
              </div>

              <div>
                BRAND
              </div>

              <div>
                CATEGORY
              </div>

              <div>
                PRICE
              </div>

              <div>
                FRAGRANCE NOTES
              </div>

              <div>
                ACTIONS
              </div>

            </div>



            {/* EMPTY STATE */}

            {perfumes.length === 0 && (

              <div className="empty-perfume-state">

                <h3>
                  No perfumes found
                </h3>

                <p>
                  Start building your fragrance
                  collection by adding a perfume.
                </p>


                <button
                  className="add-perfume-btn"
                  onClick={() =>
                    navigate("/admin/add-perfume")
                  }
                >
                  ＋ Add First Perfume
                </button>

              </div>

            )}



            {/* PERFUME ROWS */}

            {perfumes.map((perfume) => {

              const image =
                perfume.image ||
                perfume.imageUrl ||
                "/perfumes/default.jpg";


              const category =
                perfume.category ||
                perfume.gender ||
                "Unisex";


              const notes =
                perfume.notes ||
                [
                  perfume.topNotes,
                  perfume.middleNotes,
                  perfume.baseNotes
                ]
                  .filter(Boolean)
                  .join(", ") ||
                "No notes available";


              return (

                <div
                  className="perfume-row"
                  key={perfume.id}
                >


                  {/* PERFUME */}

                  <div className="perfume-info">

                    <img
                      src={image}
                      alt={perfume.name}
                      onError={(e) => {

                        e.currentTarget.onerror =
                          null;

                        e.currentTarget.src =
                          "/perfumes/default.jpg";

                      }}
                    />


                    <div className="perfume-name-box">

                      <h3>
                        {perfume.name}
                      </h3>


                      <p>
                        ID #{perfume.id}
                      </p>

                    </div>

                  </div>



                  {/* BRAND */}

                  <div className="brand-cell">

                    {perfume.brand || "Unknown"}

                  </div>



                  {/* CATEGORY */}

                  <div className="category-cell">

                    <span className="category-badge">

                      {category}

                    </span>

                  </div>



                  {/* PRICE */}

                  <div className="price-cell">

                    ₹
                    {Number(
                      perfume.price || 0
                    ).toLocaleString()}

                  </div>



                  {/* NOTES */}

                  <div className="notes-cell">

                    {notes}

                  </div>



                  {/* ACTIONS */}

                  <div className="action-cell">


                    <button
                      className="view-btn"
                      onClick={() =>
                        navigate(
                          `/perfume/${perfume.id}`
                        )
                      }
                    >

                      View →

                    </button>



                    <button
                      className="remove-btn"
                      disabled={
                        deletingId === perfume.id
                      }
                      onClick={() =>
                        handleDelete(
                          perfume.id,
                          perfume.name
                        )
                      }
                    >

                      {deletingId === perfume.id
                        ? "Removing..."
                        : "Remove"
                      }

                    </button>


                  </div>


                </div>

              );

            })}


          </div>


        </section>


      </main>


    </div>
  );
}