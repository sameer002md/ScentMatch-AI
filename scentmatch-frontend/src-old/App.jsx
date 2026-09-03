import React from "react";
import {
    Routes,
    Route,
    Navigate
} from "react-router-dom";

// ==============================
// PAGES
// ==============================

// DASHBOARDS
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";

// AUTHENTICATION
import Login from "./pages/Login";
import Register from "./pages/Register";

// PERFUMES
import Perfumes from "./pages/Perfumes";
import PerfumeDetails from "./pages/PerfumeDetails";

// ADMIN
import AddPerfume from "./pages/AddPerfume";

// FAVORITES
import Favorites from "./pages/Favorites";

// AI FEATURES
import ScentMatchQuiz from "./pages/ScentMatchQuiz";
import Recommendations from "./pages/Recommendations";
import AiScentAssistant from "./pages/AiScentAssistant";


function App() {

    return (

        <Routes>

            {/* DEFAULT */}

            <Route
                path="/"
                element={<Navigate to="/dashboard" replace />}
            />


            {/* AUTHENTICATION */}

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />


            {/* USER DASHBOARD */}

            <Route
                path="/dashboard"
                element={<Dashboard />}
            />


            {/* ADMIN DASHBOARD */}

            <Route
                path="/admin"
                element={<AdminDashboard />}
            />


            {/* ADD PERFUME */}

            <Route
                path="/admin/add-perfume"
                element={<AddPerfume />}
            />


            {/* PERFUME COLLECTION */}

            <Route
                path="/perfumes"
                element={<Perfumes />}
            />


            {/* PERFUME DETAILS */}

            <Route
                path="/perfume/:id"
                element={<PerfumeDetails />}
            />


            {/* FAVORITES */}

            <Route
                path="/favorites"
                element={<Favorites />}
            />


            {/* AI SCENT MATCH QUIZ */}

            <Route
                path="/scentmatch-quiz"
                element={<ScentMatchQuiz />}
            />


            {/* RECOMMENDATIONS */}

            <Route
                path="/recommendations"
                element={<Recommendations />}
            />


            {/* AI ASSISTANT */}

            <Route
                path="/ai-assistant"
                element={<AiScentAssistant />}
            />


            {/* FALLBACK */}

            <Route
                path="*"
                element={<Navigate to="/dashboard" replace />}
            />

        </Routes>

    );

}


export default App;