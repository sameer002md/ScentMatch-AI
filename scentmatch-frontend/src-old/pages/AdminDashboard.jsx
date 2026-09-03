import React, {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import "../styles/AdminDashboard.css";


function AdminDashboard() {

    const navigate = useNavigate();


    // ======================================================
    // STATE
    // ======================================================

    const [perfumes, setPerfumes] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [search, setSearch] =
        useState("");

    const [error, setError] =
        useState("");


    // ======================================================
    // FETCH PERFUMES
    // ======================================================

    const fetchPerfumes = async () => {

        try {

            setLoading(true);

            const response = await fetch(
                "http://localhost:8080/api/perfumes"
            );


            if (!response.ok) {

                throw new Error(
                    "Failed to fetch perfumes"
                );

            }


            const data =
                await response.json();


            setPerfumes(data);

            setError("");

        }

        catch (error) {

            console.error(error);

            setError(
                "Unable to load perfumes. Please check the backend server."
            );

        }

        finally {

            setLoading(false);

        }

    };


    // ======================================================
    // LOAD DATA
    // ======================================================

    useEffect(() => {

        fetchPerfumes();

    }, []);


    // ======================================================
    // SEARCH FILTER
    // ======================================================

    const filteredPerfumes =
        useMemo(() => {

            const searchValue =
                search.toLowerCase();


            return perfumes.filter((perfume) => {

                return (

                    perfume.name
                        ?.toLowerCase()
                        .includes(searchValue)

                    ||

                    perfume.brand
                        ?.toLowerCase()
                        .includes(searchValue)

                    ||

                    perfume.fragranceFamily
                        ?.toLowerCase()
                        .includes(searchValue)

                );

            });

        }, [

            perfumes,
            search

        ]);


    // ======================================================
    // LOGOUT
    // ======================================================

    const handleLogout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        localStorage.removeItem("role");


        navigate("/login");

    };


    // ======================================================
    // DELETE PERFUME
    // ======================================================

    const handleDelete = async (id) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this perfume?"
            );


        if (!confirmed) {

            return;

        }


        try {

            const token =
                localStorage.getItem("token");


            const response = await fetch(

                `http://localhost:8080/api/perfumes/${id}`,

                {

                    method: "DELETE",

                    headers: {

                        "Authorization":
                            `Bearer ${token}`

                    }

                }

            );


            if (!response.ok) {

                throw new Error(
                    "Failed to delete perfume"
                );

            }


            setPerfumes((previousPerfumes) =>

                previousPerfumes.filter(

                    (perfume) =>

                        perfume.id !== id

                )

            );


            alert(
                "Perfume deleted successfully!"
            );

        }

        catch (error) {

            console.error(error);


            alert(
                "Unable to delete perfume. Make sure you are logged in as an admin."
            );

        }

    };


    // ======================================================
    // GET UNIQUE BRANDS
    // ======================================================

    const uniqueBrands =

        new Set(

            perfumes.map(

                (perfume) =>
                    perfume.brand

            )

        ).size;


    // ======================================================
    // GET UNIQUE FAMILIES
    // ======================================================

    const uniqueFamilies =

        new Set(

            perfumes.map(

                (perfume) =>
                    perfume.fragranceFamily

            )

        ).size;


    // ======================================================
    // COMPONENT
    // ======================================================

    return (

        <div className="admin-page">


            {/* ================================================= */}
            {/* NAVBAR */}
            {/* ================================================= */}

            <nav className="admin-navbar">


                {/* LOGO */}

                <div

                    className="admin-logo"

                    onClick={() =>
                        navigate("/admin")
                    }

                >

                    <div className="admin-logo-icon">

                        ✦

                    </div>


                    <div>

                        <h1>

                            ScentMatch

                        </h1>


                        <p>

                            ADMIN CONTROL

                        </p>

                    </div>

                </div>



                {/* NAVIGATION */}

                <div className="admin-nav-actions">


                    <button

                        className="view-store-btn"

                        onClick={() =>
                            navigate("/perfumes")
                        }

                    >

                        View Store

                    </button>


                    <button

                        className="admin-logout-btn"

                        onClick={handleLogout}

                    >

                        Logout

                    </button>

                </div>


            </nav>



            {/* ================================================= */}
            {/* HERO SECTION */}
            {/* ================================================= */}

            <section className="admin-hero">


                <div className="admin-hero-content">


                    <div className="admin-badge">

                        <span>

                            ✦

                        </span>

                        ADMIN CONTROL CENTER

                    </div>


                    <h2>

                        Manage your

                        <span>

                            fragrance collection.

                        </span>

                    </h2>


                    <p>

                        Add new perfumes, manage your fragrance
                        collection and keep the ScentMatch
                        experience updated for your users.

                    </p>


                    <div className="admin-hero-buttons">


                        <button

                            className="primary-admin-btn"

                            onClick={() =>
                                navigate(
                                    "/admin/add-perfume"
                                )
                            }

                        >

                            + Add New Perfume

                        </button>


                        <button

                            className="secondary-admin-btn"

                            onClick={() =>

                                document
                                    .getElementById(
                                        "collection"
                                    )
                                    ?.scrollIntoView({

                                        behavior:
                                            "smooth"

                                    })

                            }

                        >

                            Manage Collection

                        </button>

                    </div>


                </div>



                {/* HERO CARD */}

                <div className="admin-hero-card">


                    <div className="hero-card-glow">


                    </div>


                    <div className="hero-card-top">

                        <span>

                            PLATFORM STATUS

                        </span>


                        <div className="status-active">

                            <span>

                            </span>

                            SYSTEM ACTIVE

                        </div>

                    </div>


                    <div className="hero-card-number">

                        {perfumes.length}

                    </div>


                    <p>

                        Perfumes currently available
                        in your collection

                    </p>


                    <div className="hero-card-line">

                    </div>


                    <div className="hero-card-footer">


                        <div>

                            <span>

                                BRANDS

                            </span>

                            <strong>

                                {uniqueBrands}

                            </strong>

                        </div>


                        <div>

                            <span>

                                COLLECTIONS

                            </span>

                            <strong>

                                {uniqueFamilies}

                            </strong>

                        </div>


                    </div>


                </div>


            </section>



            {/* ================================================= */}
            {/* STATISTICS */}
            {/* ================================================= */}

            <section className="admin-stats">


                {/* TOTAL PERFUMES */}

                <div className="stat-card">


                    <div className="stat-icon">

                        🌸

                    </div>


                    <div>

                        <p>

                            Total Perfumes

                        </p>


                        <h3>

                            {perfumes.length}

                        </h3>


                        <span>

                            Available in collection

                        </span>

                    </div>

                </div>



                {/* BRANDS */}

                <div className="stat-card">


                    <div className="stat-icon">

                        ✨

                    </div>


                    <div>

                        <p>

                            Brands

                        </p>


                        <h3>

                            {uniqueBrands}

                        </h3>


                        <span>

                            Unique fragrance brands

                        </span>

                    </div>

                </div>



                {/* FRAGRANCE FAMILIES */}

                <div className="stat-card">


                    <div className="stat-icon">

                        ◈

                    </div>


                    <div>

                        <p>

                            Fragrance Families

                        </p>


                        <h3>

                            {uniqueFamilies}

                        </h3>


                        <span>

                            Explore different scents

                        </span>

                    </div>

                </div>



                {/* PLATFORM */}

                <div className="stat-card">


                    <div className="stat-icon">

                        ⚙

                    </div>


                    <div>

                        <p>

                            Platform

                        </p>


                        <h3>

                            Active

                        </h3>


                        <span>

                            ScentMatch is running

                        </span>

                    </div>

                </div>


            </section>



            {/* ================================================= */}
            {/* PERFUME COLLECTION */}
            {/* ================================================= */}

            <section

                className="perfume-management"

                id="collection"

            >


                {/* HEADER */}

                <div className="management-top">


                    <div>


                        <div className="section-label">

                            PERFUME MANAGEMENT

                        </div>


                        <h2>

                            Manage Collection

                        </h2>


                        <p>

                            View, search and manage all
                            perfumes available in ScentMatch.

                        </p>

                    </div>



                    <button

                        className="add-perfume-small-btn"

                        onClick={() =>
                            navigate(
                                "/admin/add-perfume"
                            )
                        }

                    >

                        + Add Perfume

                    </button>


                </div>



                {/* SEARCH */}

                <div className="management-controls">


                    <div className="search-box">


                        <span>

                            🔍

                        </span>


                        <input

                            type="text"

                            placeholder=
                                "Search by perfume, brand or fragrance family..."

                            value={search}

                            onChange={(event) =>

                                setSearch(
                                    event.target.value
                                )

                            }

                        />

                    </div>



                    <div className="collection-count">

                        Showing

                        <strong>

                            {filteredPerfumes.length}

                        </strong>

                        perfumes

                    </div>


                </div>



                {/* ERROR */}

                {

                    error && (

                        <div className="error-message">

                            ⚠ {error}

                        </div>

                    )

                }



                {/* LOADING */}

                {

                    loading ? (

                        <div className="loading-container">

                            <div className="loader">

                            </div>


                            <p>

                                Loading perfume collection...

                            </p>

                        </div>

                    )

                        :


                    /* TABLE */

                    (

                        <div className="admin-table-container">


                            {

                                filteredPerfumes.length === 0

                                    ?

                                    (

                                        <div className="empty-state">


                                            <div>

                                                🌸

                                            </div>


                                            <h3>

                                                No perfumes found

                                            </h3>


                                            <p>

                                                Try changing your search
                                                or add a new perfume.

                                            </p>


                                        </div>

                                    )


                                    :


                                    (

                                        <table className="admin-table">


                                            <thead>

                                                <tr>

                                                    <th>

                                                        Perfume

                                                    </th>


                                                    <th>

                                                        Brand

                                                    </th>


                                                    <th>

                                                        Family

                                                    </th>


                                                    <th>

                                                        Gender

                                                    </th>


                                                    <th>

                                                        Price

                                                    </th>


                                                    <th>

                                                        Actions

                                                    </th>

                                                </tr>

                                            </thead>



                                            <tbody>


                                                {

                                                    filteredPerfumes.map(

                                                        (perfume) => (

                                                            <tr

                                                                key={
                                                                    perfume.id
                                                                }

                                                            >


                                                                {/* PERFUME */}

                                                                <td>


                                                                    <div className="perfume-info">


                                                                        <div className="perfume-image">


                                                                            {

                                                                                perfume.imageUrl

                                                                                    ?

                                                                                    (

                                                                                        <img

                                                                                            src={
                                                                                                perfume.imageUrl
                                                                                            }

                                                                                            alt={
                                                                                                perfume.name
                                                                                            }

                                                                                            onError={(
                                                                                                event
                                                                                            ) => {

                                                                                                event
                                                                                                    .currentTarget
                                                                                                    .style
                                                                                                    .display =
                                                                                                    "none";

                                                                                            }}

                                                                                        />

                                                                                    )

                                                                                    :

                                                                                    (

                                                                                        "🌸"

                                                                                    )

                                                                            }

                                                                        </div>



                                                                        <div>


                                                                            <strong>

                                                                                {
                                                                                    perfume.name
                                                                                }

                                                                            </strong>


                                                                            <span>

                                                                                ID #

                                                                                {
                                                                                    perfume.id
                                                                                }

                                                                            </span>

                                                                        </div>


                                                                    </div>


                                                                </td>



                                                                {/* BRAND */}

                                                                <td>

                                                                    {
                                                                        perfume.brand
                                                                    }

                                                                </td>



                                                                {/* FAMILY */}

                                                                <td>


                                                                    <span className="family-badge">

                                                                        {
                                                                            perfume.fragranceFamily
                                                                        }

                                                                    </span>


                                                                </td>



                                                                {/* GENDER */}

                                                                <td>

                                                                    {
                                                                        perfume.gender
                                                                    }

                                                                </td>



                                                                {/* PRICE */}

                                                                <td>

                                                                    <strong>

                                                                        ₹

                                                                        {
                                                                            perfume.price
                                                                        }

                                                                    </strong>

                                                                </td>



                                                                {/* ACTIONS */}

                                                                <td>


                                                                    <div className="table-actions">


                                                                        <button

                                                                            className="edit-btn"

                                                                            onClick={() =>

                                                                                alert(
                                                                                    "Edit feature will be connected next!"
                                                                                )

                                                                            }

                                                                        >

                                                                            Edit

                                                                        </button>



                                                                        <button

                                                                            className="delete-btn"

                                                                            onClick={() =>
                                                                                handleDelete(
                                                                                    perfume.id
                                                                                )
                                                                            }

                                                                        >

                                                                            Delete

                                                                        </button>


                                                                    </div>


                                                                </td>


                                                            </tr>

                                                        )

                                                    )

                                                }


                                            </tbody>


                                        </table>

                                    )

                            }


                        </div>

                    )

                }


            </section>



            {/* ================================================= */}
            {/* FOOTER */}
            {/* ================================================= */}

            <footer className="admin-footer">


                <div>

                    <strong>

                        ✦ ScentMatch

                    </strong>


                    <span>

                        AI Powered Fragrance Discovery

                    </span>

                </div>


                <p>

                    © 2026 ScentMatch. Admin Platform.

                </p>


            </footer>


        </div>

    );

}


export default AdminDashboard;