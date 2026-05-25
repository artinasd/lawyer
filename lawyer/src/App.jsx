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
import AdminSettings from "./Components/Admin/AdminSettings.jsx"; // New Import
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

const AuthGuard = ({ children }) => {
    const isAuthenticated = localStorage.getItem("isAdmin") === "true";
    return isAuthenticated ? children : <Navigate to="/login" />;
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
                { path: '/admin/settings', element: <AuthGuard><AdminSettings /></AuthGuard> }, // New Route
            ]
        }
    ]);

    return <RouterProvider router={router} />;
}

export default App;