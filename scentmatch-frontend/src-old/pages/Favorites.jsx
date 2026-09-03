import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Favorites.css";

const API_URL = "http://localhost:8080";

function Favorites() {

    const navigate = useNavigate();

    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadFavorites();
    }, []);

    const getToken = () => {
        return (
            localStorage.getItem("token") ||
            localStorage.getItem("jwtToken") ||
            localStorage.getItem("accessToken")
        );
    };

    const loadFavorites = async () => {

        try {

            setLoading(true);
            setError("");

            const token = getToken();

            if (!token) {
                setError("Please login to view your favorites.");
                setLoading(false);
                return;
            }

            const response = await fetch(
                `${API_URL}/api/favorites`,
                {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            if (!response.ok) {

                if (response.status === 401 || response.status === 403) {
                    throw new Error(
                        "Your login session has expired. Please login again."
                    );
                }

                throw new Error(
                    `Failed to load favorites (${response.status})`
                );
            }

            const data = await response.json();

            console.log("Favorites API response:", data);

            setFavorites(data);

        } catch (error) {

            console.error("Favorites error:", error);

            setError(error.message);

        } finally {

            setLoading(false);
        }
    };


    const removeFavorite = async (perfumeId) => {

        try {

            const token = getToken();

            if (!token) {
                alert("Please login first.");
                return;
            }

            const response = await fetch(
                `${API_URL}/api/favorites/${perfumeId}`,
                {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Failed to remove favorite.");
            }

            setFavorites(
                favorites.filter(
                    (favorite) =>
                        favorite.perfume.id !== perfumeId
                )
            );

        } catch (error) {

            console.error(error);

            alert(error.message);
        }
    };


    if (loading) {

        return (
            <div className="favorites-page">

                <div className="favorites-header">

                    <div>
                        <h1>ScentMatch</h1>
                        <p>My Favorite Fragrances</p>
                    </div>

                    <button
                        onClick={() => navigate("/perfumes")}
                        className="back-button"
                    >
                        Explore Perfumes
                    </button>

                </div>

                <div className="favorites-loading">
                    Loading your favorites...
                </div>

            </div>
        );
    }


    if (error) {

        return (
            <div className="favorites-page">

                <div className="favorites-header">

                    <div>
                        <h1>ScentMatch</h1>
                        <p>My Favorite Fragrances</p>
                    </div>

                    <button
                        onClick={() => navigate("/perfumes")}
                        className="back-button"
                    >
                        Explore Perfumes
                    </button>

                </div>

                <div className="favorites-error">

                    <h2>Unable to load favorites</h2>

                    <p>{error}</p>

                    <button
                        onClick={loadFavorites}
                        className="retry-button"
                    >
                        Try Again
                    </button>

                </div>

            </div>
        );
    }


    return (

        <div className="favorites-page">

            {/* HEADER */}

            <div className="favorites-header">

                <div>

                    <h1>ScentMatch</h1>

                    <p>
                        My Favorite Fragrances
                    </p>

                </div>

                <button
                    onClick={() => navigate("/perfumes")}
                    className="back-button"
                >
                    Explore Perfumes
                </button>

            </div>


            {/* MAIN */}

            <main className="favorites-container">

                <div className="favorites-title">

                    <div>

                        <span className="favorite-icon">
                            ❤️
                        </span>

                        <h2>
                            My Favorites
                        </h2>

                    </div>

                    <span className="favorite-count">
                        {favorites.length} perfume
                        {favorites.length !== 1 ? "s" : ""}
                    </span>

                </div>


                {/* EMPTY STATE */}

                {favorites.length === 0 ? (

                    <div className="empty-favorites">

                        <div className="empty-heart">
                            ♡
                        </div>

                        <h2>
                            No favorites yet
                        </h2>

                        <p>
                            Start exploring perfumes and add
                            the fragrances you love.
                        </p>

                        <button
                            onClick={() => navigate("/perfumes")}
                            className="explore-button"
                        >
                            Explore Perfumes
                        </button>

                    </div>

                ) : (

                    <div className="favorites-grid">

                        {favorites.map((favorite) => {

                            const perfume = favorite.perfume;

                            if (!perfume) {
                                return null;
                            }

                            return (

                                <div
                                    className="favorite-card"
                                    key={favorite.id}
                                >

                                    <div
                                        className="favorite-image-container"
                                        onClick={() =>
                                            navigate(
                                                `/perfume/${perfume.id}`
                                            )
                                        }
                                    >

                                        <img
                                            src={perfume.imageUrl}
                                            alt={perfume.name}
                                            className="favorite-image"
                                            onError={(e) => {
                                                e.target.style.display =
                                                    "none";
                                            }}
                                        />

                                    </div>


                                    <div className="favorite-content">

                                        <p className="favorite-brand">
                                            {perfume.brand}
                                        </p>

                                        <h3>
                                            {perfume.name}
                                        </h3>

                                        <p className="favorite-price">
                                            ₹
                                            {Number(
                                                perfume.price
                                            ).toLocaleString("en-IN")}
                                        </p>


                                        <div className="favorite-tags">

                                            {perfume.fragranceFamily && (
                                                <span>
                                                    {
                                                        perfume.fragranceFamily
                                                    }
                                                </span>
                                            )}

                                            {perfume.gender && (
                                                <span>
                                                    {perfume.gender}
                                                </span>
                                            )}

                                        </div>


                                        <div className="favorite-actions">

                                            <button
                                                className="details-button"
                                                onClick={() =>
                                                    navigate(
                                                        `/perfume/${perfume.id}`
                                                    )
                                                }
                                            >
                                                View Details
                                            </button>


                                            <button
                                                className="remove-button"
                                                onClick={() =>
                                                    removeFavorite(
                                                        perfume.id
                                                    )
                                                }
                                            >
                                                ♥ Remove
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            );

                        })}

                    </div>

                )}

            </main>

        </div>
    );
}

export default Favorites;