import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Perfumes.css";


function Perfumes() {

    const navigate = useNavigate();

    const [perfumes, setPerfumes] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    // ================================
    // FILTER STATES
    // ================================

    const [search, setSearch] = useState("");

    const [fragranceFamily, setFragranceFamily] =
        useState("All");

    const [gender, setGender] =
        useState("All");

    const [season, setSeason] =
        useState("All");

    const [occasion, setOccasion] =
        useState("All");

    const [maxPrice, setMaxPrice] =
        useState(50000);

    const [sortBy, setSortBy] =
        useState("default");


    // ================================
    // FETCH PERFUMES
    // ================================

    useEffect(() => {

        const loadPerfumes = async () => {

            try {

                console.log(
                    "Loading perfume collection..."
                );

                const response = await fetch(
                    "http://localhost:8080/api/perfumes"
                );

                if (!response.ok) {

                    throw new Error(
                        "Failed to load perfumes"
                    );

                }

                const data =
                    await response.json();

                console.log(
                    "Perfumes received:",
                    data
                );

                setPerfumes(data);

            } catch (err) {

                console.error(
                    "Perfume loading error:",
                    err
                );

                setError(
                    err.message ||
                    "Unable to load perfumes."
                );

            } finally {

                setLoading(false);

            }

        };

        loadPerfumes();

    }, []);


    // ================================
    // FILTER OPTIONS
    // ================================

    const fragranceFamilies = [
        "All",
        "Aromatic",
        "Woody",
        "Sweet",
        "Fresh",
        "Oriental",
        "Floral",
        "Citrus",
        "Spicy"
    ];


    const genders = [
        "All",
        "Men",
        "Women",
        "Unisex"
    ];


    const seasons = [
        "All",
        "Spring",
        "Summer",
        "Autumn",
        "Winter",
        "All Season"
    ];


    const occasions = [
        "All",
        "Daily",
        "Office",
        "Date",
        "Party",
        "Evening",
        "Vacation",
        "Gym",
        "Special Occasion"
    ];


    // ================================
    // FILTER PERFUMES
    // ================================

    let filteredPerfumes =
        perfumes.filter((perfume) => {

            // SEARCH

            const searchText =
                search.toLowerCase().trim();


            const matchesSearch =

                !searchText ||

                perfume.name
                    ?.toLowerCase()
                    .includes(searchText)

                ||

                perfume.brand
                    ?.toLowerCase()
                    .includes(searchText)

                ||

                perfume.fragranceFamily
                    ?.toLowerCase()
                    .includes(searchText)

                ||

                perfume.gender
                    ?.toLowerCase()
                    .includes(searchText);


            // FRAGRANCE FAMILY

            const matchesFamily =

                fragranceFamily === "All" ||

                perfume.fragranceFamily ===
                fragranceFamily;


            // GENDER

            const matchesGender =

                gender === "All" ||

                perfume.gender === gender;


            // SEASON

            const matchesSeason =

                season === "All" ||

                perfume.season
                    ?.toLowerCase()
                    .includes(
                        season.toLowerCase()
                    );


            // OCCASION

            const matchesOccasion =

                occasion === "All" ||

                perfume.occasion
                    ?.toLowerCase()
                    .includes(
                        occasion.toLowerCase()
                    );


            // PRICE

            const matchesPrice =

                Number(perfume.price || 0)
                <= maxPrice;


            return (

                matchesSearch &&

                matchesFamily &&

                matchesGender &&

                matchesSeason &&

                matchesOccasion &&

                matchesPrice

            );

        });


    // ================================
    // SORT
    // ================================

    if (sortBy === "priceLow") {

        filteredPerfumes.sort(
            (a, b) =>
                Number(a.price || 0) -
                Number(b.price || 0)
        );

    }


    if (sortBy === "priceHigh") {

        filteredPerfumes.sort(
            (a, b) =>
                Number(b.price || 0) -
                Number(a.price || 0)
        );

    }


    if (sortBy === "name") {

        filteredPerfumes.sort(
            (a, b) =>
                (a.name || "")
                    .localeCompare(
                        b.name || ""
                    )
        );

    }


    // ================================
    // RESET FILTERS
    // ================================

    const resetFilters = () => {

        setSearch("");

        setFragranceFamily("All");

        setGender("All");

        setSeason("All");

        setOccasion("All");

        setMaxPrice(50000);

        setSortBy("default");

    };


    // ================================
    // LOADING
    // ================================

    if (loading) {

        return (

            <div className="perfumes-loading">

                <div className="loading-icon">
                    ✨
                </div>

                <h2>
                    Loading fragrances...
                </h2>

                <p>
                    ScentMatch is preparing your
                    fragrance collection.
                </p>

            </div>

        );

    }


    // ================================
    // ERROR
    // ================================

    if (error) {

        return (

            <div className="perfumes-error">

                <div className="error-icon">
                    ⚠️
                </div>

                <h2>
                    Unable to load perfumes
                </h2>

                <p>
                    {error}
                </p>

                <button
                    onClick={() =>
                        navigate("/dashboard")
                    }
                >
                    Back to Dashboard
                </button>

            </div>

        );

    }


    // ================================
    // MAIN PAGE
    // ================================

    return (

        <div className="perfumes-page">


            {/* =================================
                HEADER
            ================================= */}

            <header className="perfumes-header">

                <div>

                    <h1>
                        ScentMatch
                    </h1>

                    <p>
                        Explore Our Fragrance Collection
                    </p>

                </div>


                <button
                    onClick={() =>
                        navigate("/dashboard")
                    }
                >
                    Dashboard
                </button>

            </header>


            {/* =================================
                CONTENT
            ================================= */}

            <main className="perfumes-content">


                {/* =================================
                    HEADING
                ================================= */}

                <section className="perfumes-heading">

                    <span>
                        🌸
                    </span>

                    <h2>
                        Explore Perfumes
                    </h2>

                    <p>
                        Discover fragrances from some of
                        the world's most popular perfume houses.
                    </p>

                </section>


                {/* =================================
                    SEARCH
                ================================= */}

                <div className="perfume-search">

                    <span>
                        🔎
                    </span>

                    <input
                        type="text"

                        placeholder=
                        "Search perfume, brand or fragrance family..."

                        value={search}

                        onChange={(event) =>
                            setSearch(
                                event.target.value
                            )
                        }
                    />

                </div>


                {/* =================================
                    FILTER PANEL
                ================================= */}

                <section className="filter-panel">


                    {/* FAMILY */}

                    <div className="filter-group">

                        <label>
                            Fragrance Family
                        </label>

                        <select
                            value={fragranceFamily}

                            onChange={(event) =>
                                setFragranceFamily(
                                    event.target.value
                                )
                            }
                        >

                            {fragranceFamilies.map(
                                (family) => (

                                    <option
                                        key={family}
                                        value={family}
                                    >
                                        {family}
                                    </option>

                                )
                            )}

                        </select>

                    </div>


                    {/* GENDER */}

                    <div className="filter-group">

                        <label>
                            Gender
                        </label>

                        <select
                            value={gender}

                            onChange={(event) =>
                                setGender(
                                    event.target.value
                                )
                            }
                        >

                            {genders.map(
                                (item) => (

                                    <option
                                        key={item}
                                        value={item}
                                    >
                                        {item}
                                    </option>

                                )
                            )}

                        </select>

                    </div>


                    {/* SEASON */}

                    <div className="filter-group">

                        <label>
                            Season
                        </label>

                        <select
                            value={season}

                            onChange={(event) =>
                                setSeason(
                                    event.target.value
                                )
                            }
                        >

                            {seasons.map(
                                (item) => (

                                    <option
                                        key={item}
                                        value={item}
                                    >
                                        {item}
                                    </option>

                                )
                            )}

                        </select>

                    </div>


                    {/* OCCASION */}

                    <div className="filter-group">

                        <label>
                            Occasion
                        </label>

                        <select
                            value={occasion}

                            onChange={(event) =>
                                setOccasion(
                                    event.target.value
                                )
                            }
                        >

                            {occasions.map(
                                (item) => (

                                    <option
                                        key={item}
                                        value={item}
                                    >
                                        {item}
                                    </option>

                                )
                            )}

                        </select>

                    </div>


                    {/* SORT */}

                    <div className="filter-group">

                        <label>
                            Sort By
                        </label>

                        <select
                            value={sortBy}

                            onChange={(event) =>
                                setSortBy(
                                    event.target.value
                                )
                            }
                        >

                            <option value="default">
                                Recommended
                            </option>

                            <option value="priceLow">
                                Price: Low to High
                            </option>

                            <option value="priceHigh">
                                Price: High to Low
                            </option>

                            <option value="name">
                                Name: A to Z
                            </option>

                        </select>

                    </div>


                </section>


                {/* =================================
                    PRICE FILTER
                ================================= */}

                <section className="price-filter">

                    <div className="price-filter-header">

                        <label>
                            Maximum Price
                        </label>

                        <strong>
                            ₹
                            {Number(
                                maxPrice
                            ).toLocaleString("en-IN")}
                        </strong>

                    </div>

                    <input
                        type="range"

                        min="2000"

                        max="50000"

                        step="500"

                        value={maxPrice}

                        onChange={(event) =>
                            setMaxPrice(
                                Number(
                                    event.target.value
                                )
                            )
                        }
                    />

                    <div className="price-range-labels">

                        <span>
                            ₹2,000
                        </span>

                        <span>
                            ₹50,000+
                        </span>

                    </div>

                </section>


                {/* =================================
                    RESULT HEADER
                ================================= */}

                <div className="results-header">

                    <p>

                        Showing{" "}

                        <strong>
                            {filteredPerfumes.length}
                        </strong>{" "}

                        of{" "}

                        <strong>
                            {perfumes.length}
                        </strong>{" "}

                        perfumes

                    </p>


                    <button
                        onClick={resetFilters}
                    >
                        Reset Filters
                    </button>

                </div>


                {/* =================================
                    EMPTY RESULT
                ================================= */}

                {filteredPerfumes.length === 0 && (

                    <div className="no-perfumes">

                        <div>
                            🔍
                        </div>

                        <h3>
                            No perfumes found
                        </h3>

                        <p>
                            Try changing your filters
                            or search for something else.
                        </p>

                        <button
                            onClick={resetFilters}
                        >
                            Clear Filters
                        </button>

                    </div>

                )}


                {/* =================================
                    PERFUME GRID
                ================================= */}

                <div className="perfumes-grid">

                    {filteredPerfumes.map(
                        (perfume) => (

                            <div
                                className=
                                "explore-perfume-card"

                                key={perfume.id}
                            >


                                {/* IMAGE */}

                                <div className="explore-image">

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

                                            event.currentTarget.style.display =
                                                "none";

                                            event.currentTarget
                                                .parentElement
                                                .classList
                                                .add(
                                                    "image-fallback"
                                                );

                                        }}
                                    />

                                </div>


                                {/* DETAILS */}

                                <div className="explore-details">

                                    <h3>
                                        {perfume.name}
                                    </h3>

                                    <p className="explore-brand">
                                        {perfume.brand}
                                    </p>

                                    <p className="explore-price">

                                        ₹
                                        {Number(
                                            perfume.price || 0
                                        ).toLocaleString(
                                            "en-IN"
                                        )}

                                    </p>


                                    {/* TAGS */}

                                    <div className="explore-tags">

                                        <span>
                                            {
                                                perfume.fragranceFamily
                                            }
                                        </span>

                                        <span>
                                            {
                                                perfume.gender
                                            }
                                        </span>

                                    </div>


                                    {/* EXTRA INFO */}

                                    <div className="explore-meta">

                                        <span>
                                            🌦️{" "}
                                            {perfume.season}
                                        </span>

                                        <span>
                                            🎯{" "}
                                            {perfume.occasion}
                                        </span>

                                    </div>


                                    {/* BUTTON */}

                                    <button
                                        className=
                                        "explore-details-button"

                                        onClick={() =>
                                            navigate(
                                                `/perfume/${perfume.id}`
                                            )
                                        }
                                    >
                                        View Perfume Details
                                    </button>

                                </div>

                            </div>

                        )
                    )}

                </div>


            </main>

        </div>

    );

}

export default Perfumes;