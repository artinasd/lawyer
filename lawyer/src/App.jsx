import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./Components/Homepage.jsx";
import BlogLanding from "./Components/BlogLanding.jsx";
import BlogPost from "./Components/Blog Components/BlogPost.jsx";
import AdminPanel from "./Components/Admin/AdminPanel.jsx";
import AdminLogin from "./Components/Admin/AdminLogin.jsx";
import NewPost from "./Components/Admin/NewPost.jsx";

function App() {
    const router = createBrowserRouter([
        {path: '/', element: <Homepage />},
        {path: '/blog', element: <BlogLanding/>},
        {path: '/blog/:postId', element: <BlogPost/>},
        {path: 'login', element: <AdminLogin/>},
        {path: 'admin', element: <AdminPanel/>},
        {path: 'new-post', element: <NewPost />},
    ]);

    return (
        <RouterProvider router={router} />
    );
}

export default App;
