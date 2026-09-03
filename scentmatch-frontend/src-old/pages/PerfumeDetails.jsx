import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/PerfumeDetails.css";

import {
    getPerfumeById,
    addFavorite
} from "../services/api";


function PerfumeDetails() {

    const navigate = useNavigate();

    const { id } = useParams();


    // =====================================================
    // STATES
    // =====================================================

    const [perfume, setPerfume] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [favoriteMessage, setFavoriteMessage] = useState("");


    // =====================================================
    // FETCH PERFUME BY ID
    // =====================================================

    useEffect(() => {

        const fetchPerfume = async () => {

            try {

                setLoading(true);

                setError("");


                console.log(
                    "Fetching perfume with ID:",
                    id
                );


                const data =
                    await getPerfumeById(id);


                console.log(
                    "Perfume received from backend:",
                    data
                );


                setPerfume(data);

            }

            catch (error) {

                console.error(
                    "Failed to fetch perfume:",
                    error
                );


                setError(
                    error.message ||
                    "Failed to load perfume"
                );

            }

            finally {

                setLoading(false);

            }

        };


        if (id) {

            fetchPerfume();

        }


    }, [id]);


    // =====================================================
    // ADD TO FAVORITES
    // =====================================================

    const handleAddFavorite = async () => {

        try {

            const perfumeId =
                perfume.id ||
                perfume.perfumeId;


            await addFavorite(
                perfumeId
            );


            setFavoriteMessage(
                "❤️ Added to favorites successfully!"
            );

        }

        catch (error) {

            console.error(error);


            setFavoriteMessage(
                error.message ||
                "Failed to add favorite"
            );

        }

    };


    // =====================================================
    // LOADING SCREEN
    // =====================================================

    if (loading) {

        return (

            <div
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "24px"
                }}
            >

                Loading perfume details...

            </div>

        );

    }


    // =====================================================
    // ERROR SCREEN
    // =====================================================

    if (error) {

        return (

            <div
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "20px"
                }}
            >

                <h1>
                    Perfume not found
                </h1>


                <p>
                    {error}
                </p>


                <button
                    onClick={() =>
                        navigate("/recommendations")
                    }
                >

                    Back to Recommendations

                </button>

            </div>

        );

    }


    // =====================================================
    // SAFETY CHECK
    // =====================================================

    if (!perfume) {

        return (

            <div
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >

                <h1>
                    Perfume not found
                </h1>


                <button
                    onClick={() =>
                        navigate("/recommendations")
                    }
                >

                    Back to Recommendations

                </button>

            </div>

        );

    }


    // =====================================================
    // GET PERFUME ID
    // =====================================================

    const perfumeId =
        perfume.id ||
        perfume.perfumeId;


    // =====================================================
    // PERFUME DETAILS PAGE
    // =====================================================

    return (

        <div
            style={{
                minHeight: "100vh",
                padding: "50px",
                background:
                    "#f5f1ea"
            }}
        >


            {/* BACK BUTTON */}

            <button

                onClick={() =>
                    navigate(-1)
                }

                style={{
                    padding:
                        "10px 20px",

                    marginBottom:
                        "30px",

                    cursor:
                        "pointer"
                }}

            >

                ← Back

            </button>



            {/* MAIN CONTAINER */}

            <div
                style={{
                    maxWidth:
                        "1100px",

                    margin:
                        "auto",

                    background:
                        "white",

                    padding:
                        "40px",

                    borderRadius:
                        "20px",

                    display:
                        "flex",

                    gap:
                        "50px",

                    boxShadow:
                        "0 10px 40px rgba(0,0,0,0.1)"
                }}
            >


                {/* PERFUME IMAGE */}

                <div
                    style={{
                        flex:
                            "1"
                    }}
                >

                    <img

                        src={
                            perfume.imageUrl
                        }

                        alt={
                            perfume.name
                        }

                        style={{
                            width:
                                "100%",

                            maxWidth:
                                "400px",

                            borderRadius:
                                "15px"
                        }}

                    />

                </div>



                {/* PERFUME INFORMATION */}

                <div
                    style={{
                        flex:
                            "1"
                    }}
                >


                    <h3
                        style={{
                            color:
                                "#8a6b3f"
                        }}
                    >

                        {perfume.brand}

                    </h3>



                    <h1
                        style={{
                            fontSize:
                                "45px",

                            marginBottom:
                                "20px"
                        }}
                    >

                        {perfume.name}

                    </h1>



                    {/* TAGS */}

                    <div
                        style={{
                            display:
                                "flex",

                            gap:
                                "10px",

                            marginBottom:
                                "20px"
                        }}
                    >

                        <span
                            style={{
                                background:
                                    "#eee",

                                padding:
                                    "8px 15px",

                                borderRadius:
                                    "20px"
                            }}
                        >

                            🌸 {perfume.fragranceFamily}

                        </span>


                        <span
                            style={{
                                background:
                                    "#eee",

                                padding:
                                    "8px 15px",

                                borderRadius:
                                    "20px"
                            }}
                        >

                            👤 {perfume.gender}

                        </span>

                    </div>



                    {/* DESCRIPTION */}

                    <p
                        style={{
                            fontSize:
                                "17px",

                            lineHeight:
                                "1.7"
                        }}
                    >

                        {perfume.description}

                    </p>



                    {/* NOTES */}

                    <div
                        style={{
                            marginTop:
                                "20px"
                        }}
                    >

                        <h3>
                            🌿 Fragrance Notes
                        </h3>


                        <p>

                            <strong>
                                Top Notes:
                            </strong>

                            {" "}

                            {
                                perfume.topNotes ||
                                "Not available"
                            }

                        </p>


                        <p>

                            <strong>
                                Middle Notes:
                            </strong>

                            {" "}

                            {
                                perfume.middleNotes ||
                                "Not available"
                            }

                        </p>


                        <p>

                            <strong>
                                Base Notes:
                            </strong>

                            {" "}

                            {
                                perfume.baseNotes ||
                                "Not available"
                            }

                        </p>

                    </div>



                    {/* OCCASION */}

                    <p>

                        <strong>
                            Occasion:
                        </strong>

                        {" "}

                        {perfume.occasion}

                    </p>



                    {/* SEASON */}

                    <p>

                        <strong>
                            Season:
                        </strong>

                        {" "}

                        {perfume.season}

                    </p>



                    {/* LONGEVITY */}

                    <p>

                        <strong>
                            Longevity:
                        </strong>

                        {" "}

                        {perfume.longevity}

                    </p>



                    {/* SILLAGE */}

                    <p>

                        <strong>
                            Sillage:
                        </strong>

                        {" "}

                        {perfume.sillage}

                    </p>



                    {/* PRICE */}

                    <h2
                        style={{
                            marginTop:
                                "25px",

                            color:
                                "#8a6b3f"
                        }}
                    >

                        ₹{perfume.price}

                    </h2>



                    {/* ADD FAVORITE */}

                    <button

                        onClick={
                            handleAddFavorite
                        }

                        style={{
                            marginTop:
                                "20px",

                            padding:
                                "12px 25px",

                            background:
                                "#222",

                            color:
                                "white",

                            border:
                                "none",

                            borderRadius:
                                "8px",

                            cursor:
                                "pointer",

                            fontSize:
                                "16px"
                        }}

                    >

                        ❤️ Add to Favorites

                    </button>



                    {/* FAVORITE MESSAGE */}

                    {

                        favoriteMessage && (

                            <p
                                style={{
                                    marginTop:
                                        "15px"
                                }}
                            >

                                {
                                    favoriteMessage
                                }

                            </p>

                        )

                    }


                </div>


            </div>


        </div>

    );

}


export default PerfumeDetails;