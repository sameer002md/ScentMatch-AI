import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AddPerfume from "./pages/AddPerfume";
import Perfumes from "./pages/Perfumes";
import PerfumeDetail from "./pages/PerfumeDetail";
import Favorites from "./pages/Favorites";
import Preferences from "./pages/Preferences";
import ScentMatchQuiz from "./pages/ScentMatchQuiz";
import Recommendations from "./pages/Recommendations";
import AiScentAssistant from "./pages/AiScentAssistant";
import Login from "./pages/Login";
import Register from "./pages/Register";

import ProtectedRoute from "./pages/ProtectedRoute";
import AdminRoute from "./pages/AdminRoute";


export default function App() {

  return (

    <Routes>


      {/* ================= DEFAULT ================= */}

      <Route
        path="/"
        element={
          <Navigate
            to="/dashboard"
            replace
          />
        }
      />


      {/* ================= AUTH ================= */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />


      {/* ================= USER PAGES ================= */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />


      <Route
        path="/perfumes"
        element={
          <ProtectedRoute>
            <Perfumes />
          </ProtectedRoute>
        }
      />


      {/* ================= PERFUME DETAILS ================= */}

      <Route
        path="/perfume/:id"
        element={
          <ProtectedRoute>
            <PerfumeDetail />
          </ProtectedRoute>
        }
      />


      {/* ================= FAVORITES ================= */}

      <Route
        path="/favorites"
        element={
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        }
      />


      {/* ================= PREFERENCES ================= */}

      <Route
        path="/preferences"
        element={
          <ProtectedRoute>
            <Preferences />
          </ProtectedRoute>
        }
      />


      {/* ================= SCENTMATCH QUIZ ================= */}

      <Route
        path="/scentmatch-quiz"
        element={
          <ProtectedRoute>
            <ScentMatchQuiz />
          </ProtectedRoute>
        }
      />


      {/* ================= RECOMMENDATIONS ================= */}

      <Route
        path="/recommendations"
        element={
          <ProtectedRoute>
            <Recommendations />
          </ProtectedRoute>
        }
      />


      {/* ================= AI ASSISTANT ================= */}

      <Route
        path="/ai-assistant"
        element={
          <ProtectedRoute>
            <AiScentAssistant />
          </ProtectedRoute>
        }
      />


      {/* ================= ADMIN PAGES ================= */}

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />


      <Route
        path="/admin/add-perfume"
        element={
          <AdminRoute>
            <AddPerfume />
          </AdminRoute>
        }
      />


      {/* ================= FALLBACK ================= */}

      <Route
        path="*"
        element={
          <Navigate
            to="/dashboard"
            replace
          />
        }
      />


    </Routes>

  );

}