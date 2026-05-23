import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Homepage from "./Components/Homepage.jsx";
import BlogLanding from "./Components/BlogLanding.jsx";
import BlogPost from "./Components/Blog Components/BlogPost.jsx";
import AdminPanel from "./Components/Admin/AdminPanel.jsx";
import AdminLogin from "./Components/Admin/AdminLogin.jsx";
import NewPost from "./Components/Admin/NewPost.jsx";
import NavigationBar from "./Components/Permanent Components/NavigationBar.jsx";
import Footer from "./Components/SPA Components/Footer.jsx";

// This is the magic wrapper that prevents duplicates!
const RootLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <NavigationBar />
            <main className="flex-grow">
                <Outlet /> {/* The page content goes here */}
            </main>
            <Footer />
        </div>
    )
}

function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <RootLayout />, // Wrap everything in the layout
            children: [
                {path: '/', element: <Homepage />},
                {path: '/blog', element: <BlogLanding/>},
                {path: '/blog/:postId', element: <BlogPost/>},
                // Added leading slashes for safety
                {path: '/login', element: <AdminLogin/>},
                {path: '/admin', element: <AdminPanel/>},
                {path: '/new-post', element: <NewPost />},
            ]
        }
    ]);

    return <RouterProvider router={router} />;
}

export default App;