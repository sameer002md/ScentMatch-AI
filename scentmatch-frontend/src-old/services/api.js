const API_BASE_URL = "http://localhost:8080/api";


// ======================================================
// HELPER FUNCTION
// ======================================================

const getAuthHeaders = () => {

    const token = localStorage.getItem("token");

    return {
        "Content-Type": "application/json",

        ...(token && {
            "Authorization": `Bearer ${token}`
        })
    };
};


// ======================================================
// REGISTER USER
// ======================================================

export const registerUser = async (userData) => {

    const response = await fetch(
        `${API_BASE_URL}/auth/register`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(userData)
        }
    );


    const data = await response.json()
        .catch(() => null);


    if (!response.ok) {

        throw new Error(
            data?.message ||
            data?.error ||
            "Registration failed"
        );
    }


    return data;
};


// ======================================================
// LOGIN USER
// ======================================================

export const loginUser = async (loginData) => {

    const response = await fetch(
        `${API_BASE_URL}/auth/login`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(loginData)
        }
    );


    const data = await response.json()
        .catch(() => null);


    if (!response.ok) {

        throw new Error(
            data?.message ||
            data?.error ||
            "Login failed"
        );
    }


    return data;
};


// ======================================================
// SAVE USER PREFERENCES
// ======================================================

export const savePreferences = async (
    preferenceData
) => {

    const response = await fetch(
        `${API_BASE_URL}/preferences`,
        {
            method: "POST",

            headers: getAuthHeaders(),

            body: JSON.stringify(
                preferenceData
            )
        }
    );


    const data = await response.json()
        .catch(() => null);


    if (!response.ok) {

        throw new Error(
            data?.message ||
            data?.error ||
            "Failed to save preferences"
        );
    }


    return data;
};


// ======================================================
// QUIZ RECOMMENDATIONS
// ======================================================

export const getRecommendations = async (
    recommendationData
) => {

    const token =
        localStorage.getItem("token");


    if (!token) {

        throw new Error(
            "You are not logged in. Please login again."
        );
    }


    console.log(
        "Sending recommendation data:",
        recommendationData
    );


    const response = await fetch(
        `${API_BASE_URL}/recommendations`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",

                "Authorization":
                    `Bearer ${token}`
            },

            body: JSON.stringify(
                recommendationData
            )
        }
    );


    const data = await response.json()
        .catch(() => null);


    console.log(
        "Recommendation response:",
        data
    );


    if (!response.ok) {

        throw new Error(
            data?.message ||
            data?.error ||
            `Failed to get recommendations. Status: ${response.status}`
        );
    }


    return data;
};


// ======================================================
// AI PROMPT RECOMMENDATIONS
// ======================================================

export const getAiRecommendations = async (
    prompt
) => {

    const response = await fetch(
        `${API_BASE_URL}/ai-recommendations`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                prompt: prompt
            })
        }
    );


    const data = await response.json()
        .catch(() => null);


    if (!response.ok) {

        throw new Error(
            data?.message ||
            data?.error ||
            `Failed to get AI recommendations. Status: ${response.status}`
        );
    }


    return data;
};
// ======================================================
// GET PERFUME BY ID
// ======================================================

export const getPerfumeById = async (id) => {

    const response = await fetch(
        `${API_BASE_URL}/perfumes/${id}`,
        {
            method: "GET",

            headers: getAuthHeaders()
        }
    );


    const data = await response.json()
        .catch(() => null);


    if (!response.ok) {

        throw new Error(
            data?.message ||
            data?.error ||
            "Failed to fetch perfume details"
        );
    }


    return data;
};

// ======================================================
// ADD FAVORITE
// ======================================================

export const addFavorite = async (
    perfumeId
) => {

    const response = await fetch(
        `${API_BASE_URL}/favorites/${perfumeId}`,
        {
            method: "POST",

            headers: getAuthHeaders()
        }
    );


    const data = await response.json()
        .catch(() => null);


    if (!response.ok) {

        throw new Error(
            data?.message ||
            data?.error ||
            "Failed to add favorite"
        );
    }


    return data;
};


// ======================================================
// GET MY FAVORITES
// ======================================================

export const getFavorites = async () => {

    const response = await fetch(
        `${API_BASE_URL}/favorites`,
        {
            method: "GET",

            headers: getAuthHeaders()
        }
    );


    const data = await response.json()
        .catch(() => null);


    if (!response.ok) {

        throw new Error(
            data?.message ||
            data?.error ||
            "Failed to get favorites"
        );
    }


    return data;
};


// ======================================================
// REMOVE FAVORITE
// ======================================================

export const removeFavorite = async (
    perfumeId
) => {

    const response = await fetch(
        `${API_BASE_URL}/favorites/${perfumeId}`,
        {
            method: "DELETE",

            headers: getAuthHeaders()
        }
    );


    const data = await response.json()
        .catch(() => null);


    if (!response.ok) {

        throw new Error(
            data?.message ||
            data?.error ||
            "Failed to remove favorite"
        );
    }


    return data;
};