import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { savePreferences } from "../services/api";

function Preferences() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fragranceFamily: "",
        gender: "",
        intensity: "",
        longevity: "",
        occasion: "",
        season: "",
        priceRange: "",
        preferredNotes: ""
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");
        setLoading(true);

        try {

            await savePreferences(formData);

            setMessage(
                "Preferences saved successfully!"
            );

            setTimeout(() => {

                navigate("/recommendations");

            }, 1000);

        } catch (err) {

            setError(err.message);

        } finally {

            setLoading(false);
        }
    };


    return (

        <div className="preferences-page">

            <div className="preferences-card">

                <h1>ScentMatch</h1>

                <h2>Find Your Perfect Scent</h2>

                <p className="preferences-subtitle">
                    Tell us about your fragrance preferences
                </p>


                <form onSubmit={handleSubmit}>


                    {/* Fragrance Family */}

                    <label>
                        Fragrance Family
                    </label>

                    <select
                        name="fragranceFamily"
                        value={formData.fragranceFamily}
                        onChange={handleChange}
                        required
                    >

                        <option value="">
                            Select fragrance family
                        </option>

                        <option value="Woody">
                            Woody
                        </option>

                        <option value="Floral">
                            Floral
                        </option>

                        <option value="Citrus">
                            Citrus
                        </option>

                        <option value="Fresh">
                            Fresh
                        </option>

                        <option value="Oriental">
                            Oriental
                        </option>

                        <option value="Sweet">
                            Sweet
                        </option>

                    </select>


                    {/* Gender */}

                    <label>
                        Gender
                    </label>

                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                    >

                        <option value="">
                            Select gender
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


                    {/* Occasion */}

                    <label>
                        Occasion
                    </label>

                    <select
                        name="occasion"
                        value={formData.occasion}
                        onChange={handleChange}
                        required
                    >

                        <option value="">
                            Select occasion
                        </option>

                        <option value="Daily">
                            Daily
                        </option>

                        <option value="Office">
                            Office
                        </option>

                        <option value="Date">
                            Date
                        </option>

                        <option value="Party">
                            Party
                        </option>

                        <option value="Wedding">
                            Wedding
                        </option>

                        <option value="Date, Party">
                            Date, Party
                        </option>

                    </select>


                    {/* Season */}

                    <label>
                        Season
                    </label>

                    <select
                        name="season"
                        value={formData.season}
                        onChange={handleChange}
                        required
                    >

                        <option value="">
                            Select season
                        </option>

                        <option value="Summer">
                            Summer
                        </option>

                        <option value="Winter">
                            Winter
                        </option>

                        <option value="Spring">
                            Spring
                        </option>

                        <option value="Autumn">
                            Autumn
                        </option>

                    </select>


                    {/* Intensity */}

                    <label>
                        Intensity
                    </label>

                    <select
                        name="intensity"
                        value={formData.intensity}
                        onChange={handleChange}
                        required
                    >

                        <option value="">
                            Select intensity
                        </option>

                        <option value="Light">
                            Light
                        </option>

                        <option value="Moderate">
                            Moderate
                        </option>

                        <option value="Strong">
                            Strong
                        </option>

                    </select>


                    {/* Longevity */}

                    <label>
                        Longevity
                    </label>

                    <select
                        name="longevity"
                        value={formData.longevity}
                        onChange={handleChange}
                        required
                    >

                        <option value="">
                            Select longevity
                        </option>

                        <option value="Short">
                            Short
                        </option>

                        <option value="Medium">
                            Medium
                        </option>

                        <option value="Long">
                            Long
                        </option>

                    </select>


                    {/* Preferred Notes */}

                    <label>
                        Preferred Notes
                    </label>

                    <input
                        type="text"
                        name="preferredNotes"
                        placeholder="Example: Oud, Vanilla, Sandalwood"
                        value={formData.preferredNotes}
                        onChange={handleChange}
                        required
                    />


                    {/* Price Range */}

                    <label>
                        Price Range
                    </label>

                    <select
                        name="priceRange"
                        value={formData.priceRange}
                        onChange={handleChange}
                        required
                    >

                        <option value="">
                            Select price range
                        </option>

                        <option value="Below 5000">
                            Below ₹5,000
                        </option>

                        <option value="5000-10000">
                            ₹5,000 - ₹10,000
                        </option>

                        <option value="10000-15000">
                            ₹10,000 - ₹15,000
                        </option>

                        <option value="15000-20000">
                            ₹15,000 - ₹20,000
                        </option>

                        <option value="Above 20000">
                            Above ₹20,000
                        </option>

                    </select>


                    <button
                        type="submit"
                        disabled={loading}
                    >

                        {loading
                            ? "Saving..."
                            : "Save Preferences"
                        }

                    </button>

                </form>


                {message && (
                    <p className="success">
                        {message}
                    </p>
                )}


                {error && (
                    <p className="error">
                        {error}
                    </p>
                )}

            </div>

        </div>
    );
}

export default Preferences;