// lawyer/src/App.jsx
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import Homepage from "./Components/Homepage.jsx";
import BlogLanding from "./Components/BlogLanding.jsx";
import BlogPost from "./Components/Blog Components/BlogPost.jsx";
import AdminPanel from "./Components/Admin/AdminPanel.jsx";
import AdminLogin from "./Components/Admin/AdminLogin.jsx";
import NewPost from "./Components/Admin/NewPost.jsx";
import AllPosts from "./Components/Admin/AllPosts.jsx";
import AdminComments from "./Components/Admin/AdminComments.jsx";
import AdminSettings from "./Components/Admin/AdminSettings.jsx";
import AdminMessages from "./Components/Admin/AdminMessages.jsx";
import NavigationBar from "./Components/Permanent Components/NavigationBar.jsx";
import Footer from "./Components/SPA Components/Footer.jsx";

const RootLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <NavigationBar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

// ENHANCED SECURITY: Validate JWT expiration on the frontend
const AuthGuard = ({ children }) => {
    const token = localStorage.getItem("token");

    // 1. If no token exists at all, redirect to login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // 2. Decode the token to check if it has expired
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const isExpired = payload.exp * 1000 < Date.now();

        if (isExpired) {
            // Token is expired, clean up and force re-login
            localStorage.removeItem("token");
            localStorage.removeItem("isAdmin");
            return <Navigate to="/login" replace />;
        }
    } catch (error) {
        // If token is tampered with or invalid format
        return <Navigate to="/login" replace />;
    }

    // 3. Token is valid and not expired, grant access
    return children;
};

function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <RootLayout />,
            children: [
                { path: '/', element: <Homepage /> },
                { path: '/blog', element: <BlogLanding /> },
                { path: '/blog/:postId', element: <BlogPost /> },
                { path: '/login', element: <AdminLogin /> },

                // Protected Routes
                { path: '/admin', element: <AuthGuard><AdminPanel /></AuthGuard> },
                { path: '/admin/new-post', element: <AuthGuard><NewPost /></AuthGuard> },
                { path: '/admin/all-posts', element: <AuthGuard><AllPosts /></AuthGuard> },
                { path: '/admin/comments', element: <AuthGuard><AdminComments /></AuthGuard> },
                { path: '/admin/settings', element: <AuthGuard><AdminSettings /></AuthGuard> },
                { path: '/admin/messages', element: <AuthGuard><AdminMessages /></AuthGuard> },
            ]
        }
    ]);

    return <RouterProvider router={router} />;
}

export default App;