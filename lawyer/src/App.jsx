import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import Homepage from "./Components/Homepage.jsx";
import BlogLanding from "./Components/BlogLanding.jsx";
import BlogPost from "./Components/Blog Components/BlogPost.jsx";
import AdminPanel from "./Components/Admin/AdminPanel.jsx";
import AdminLogin from "./Components/Admin/AdminLogin.jsx";
import NewPost from "./Components/Admin/NewPost.jsx";
import NavigationBar from "./Components/Permanent Components/NavigationBar.jsx";
import Footer from "./Components/SPA Components/Footer.jsx";

// 1. The Layout Wrapper: This renders the Nav and Footer once,
// and puts the active page in the <Outlet />
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

// 2. The Auth Guard: Protects admin routes
const AuthGuard = ({ children }) => {
    const isAuthenticated = localStorage.getItem("isAdmin") === "true";
    return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <RootLayout />, // All routes now use this layout
            children: [
                { path: '/', element: <Homepage /> },
                { path: '/blog', element: <BlogLanding /> },
                { path: '/blog/:postId', element: <BlogPost /> },
                { path: '/login', element: <AdminLogin /> },

                // Protected Routes
                {
                    path: '/admin',
                    element: <AuthGuard><AdminPanel /></AuthGuard>
                },
                {
                    path: '/new-post',
                    element: <AuthGuard><NewPost /></AuthGuard>
                },
            ]
        }
    ]);

    return <RouterProvider router={router} />;
}

export default App;