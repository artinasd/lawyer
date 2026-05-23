// src/Components/Admin/AuthGuard.jsx
import { Navigate } from "react-router-dom";

export default function AuthGuard({ children }) {
    // If 'isAdmin' is not in localStorage, redirect to login
    const isAuthenticated = localStorage.getItem("isAdmin") === "true";
    return isAuthenticated ? children : <Navigate to="/login" />;
}