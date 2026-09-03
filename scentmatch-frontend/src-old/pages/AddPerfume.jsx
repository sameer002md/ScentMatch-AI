import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AddPerfume.css";

function AddPerfume() {

    const navigate = useNavigate();

    const [perfume, setPerfume] = useState({
        name: "",
        brand: "",
        gender: "",
        fragranceFamily: "",
        topNotes: "",
        middleNotes: "",
        baseNotes: "",
        occasion: "",
        season: "",
        longevity: "",
        sillage: "",
        price: "",
        description: "",
        imageUrl: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {

        const { name, value } = e.target;

        setPerfume({
            ...perfume,
            [name]: value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:8080/api/perfumes",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        ...perfume,
                        price: Number(perfume.price)
                    })
                }
            );


            if (response.ok) {

                setMessage(
                    "Perfume added successfully!"
                );

                setTimeout(() => {

                    navigate("/admin");

                }, 1500);

            } else {

                const errorText =
                    await response.text();

                setMessage(
                    "Failed to add perfume: "
                    + errorText
                );

            }

        } catch (error) {

            console.error(error);

            setMessage(
                "Server connection error!"
            );

        }

    };


    return (

        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#f5f3ef",
                padding: "50px"
            }}
        >


            <button
                onClick={() => navigate("/admin")}
                style={{
                    padding: "10px 20px",
                    marginBottom: "30px",
                    cursor: "pointer"
                }}
            >
                ← Back to Admin
            </button>


            <div
                style={{
                    maxWidth: "900px",
                    margin: "auto",
                    backgroundColor: "white",
                    padding: "40px",
                    borderRadius: "15px"
                }}
            >


                <h1>
                    Add New Perfume
                </h1>


                <p>
                    Add a new fragrance to the ScentMatch collection.
                </p>


                {message && (

                    <p
                        style={{
                            color: message.includes("success")
                                ? "green"
                                : "red",
                            fontWeight: "bold"
                        }}
                    >
                        {message}
                    </p>

                )}


                <form onSubmit={handleSubmit}>


                    {/* PERFUME NAME */}

                    <label>
                        Perfume Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        value={perfume.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter perfume name"
                        style={inputStyle}
                    />


                    {/* BRAND */}

                    <label>
                        Brand
                    </label>

                    <input
                        type="text"
                        name="brand"
                        value={perfume.brand}
                        onChange={handleChange}
                        required
                        placeholder="Enter brand"
                        style={inputStyle}
                    />


                    {/* GENDER */}

                    <label>
                        Gender
                    </label>

                    <select
                        name="gender"
                        value={perfume.gender}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    >

                        <option value="">
                            Select Gender
                        </option>

                        <option value="Male">
                            Male
                        </option>

                        <option value="Female">
                            Female
                        </option>

                        <option value="Unisex">
                            Unisex
                        </option>

                    </select>


                    {/* FRAGRANCE FAMILY */}

                    <label>
                        Fragrance Family
                    </label>

                    <input
                        type="text"
                        name="fragranceFamily"
                        value={perfume.fragranceFamily}
                        onChange={handleChange}
                        placeholder="Woody, Fresh, Floral..."
                        style={inputStyle}
                    />


                    {/* TOP NOTES */}

                    <label>
                        Top Notes
                    </label>

                    <input
                        type="text"
                        name="topNotes"
                        value={perfume.topNotes}
                        onChange={handleChange}
                        placeholder="Lemon, Bergamot..."
                        style={inputStyle}
                    />


                    {/* MIDDLE NOTES */}

                    <label>
                        Middle Notes
                    </label>

                    <input
                        type="text"
                        name="middleNotes"
                        value={perfume.middleNotes}
                        onChange={handleChange}
                        placeholder="Rose, Jasmine..."
                        style={inputStyle}
                    />


                    {/* BASE NOTES */}

                    <label>
                        Base Notes
                    </label>

                    <input
                        type="text"
                        name="baseNotes"
                        value={perfume.baseNotes}
                        onChange={handleChange}
                        placeholder="Vanilla, Musk..."
                        style={inputStyle}
                    />


                    {/* OCCASION */}

                    <label>
                        Occasion
                    </label>

                    <input
                        type="text"
                        name="occasion"
                        value={perfume.occasion}
                        onChange={handleChange}
                        placeholder="Party, Office..."
                        style={inputStyle}
                    />


                    {/* SEASON */}

                    <label>
                        Season
                    </label>

                    <input
                        type="text"
                        name="season"
                        value={perfume.season}
                        onChange={handleChange}
                        placeholder="Summer, Winter..."
                        style={inputStyle}
                    />


                    {/* LONGEVITY */}

                    <label>
                        Longevity
                    </label>

                    <input
                        type="text"
                        name="longevity"
                        value={perfume.longevity}
                        onChange={handleChange}
                        placeholder="8 Hours"
                        style={inputStyle}
                    />


                    {/* SILLAGE */}

                    <label>
                        Sillage
                    </label>

                    <input
                        type="text"
                        name="sillage"
                        value={perfume.sillage}
                        onChange={handleChange}
                        placeholder="Strong"
                        style={inputStyle}
                    />


                    {/* PRICE */}

                    <label>
                        Price
                    </label>

                    <input
                        type="number"
                        name="price"
                        value={perfume.price}
                        onChange={handleChange}
                        required
                        placeholder="Enter price"
                        style={inputStyle}
                    />


                    {/* IMAGE URL */}

                    <label>
                        Image URL
                    </label>

                    <input
                        type="text"
                        name="imageUrl"
                        value={perfume.imageUrl}
                        onChange={handleChange}
                        placeholder="Enter image URL"
                        style={inputStyle}
                    />


                    {/* DESCRIPTION */}

                    <label>
                        Description
                    </label>

                    <textarea
                        name="description"
                        value={perfume.description}
                        onChange={handleChange}
                        placeholder="Enter perfume description"
                        rows="5"
                        style={{
                            ...inputStyle,
                            resize: "vertical"
                        }}
                    />


                    <button
                        type="submit"
                        style={{
                            width: "100%",
                            padding: "15px",
                            marginTop: "25px",
                            backgroundColor: "#111",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            fontSize: "17px",
                            fontWeight: "bold",
                            cursor: "pointer"
                        }}
                    >
                        Add Perfume
                    </button>


                </form>


            </div>


        </div>

    );

}


const inputStyle = {

    width: "100%",

    padding: "12px",

    marginTop: "8px",

    marginBottom: "20px",

    border: "1px solid #ccc",

    borderRadius: "6px",

    boxSizing: "border-box",

    fontSize: "15px"

};


export default AddPerfume;