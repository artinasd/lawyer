import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./Components/Homepage.jsx";
import BlogLanding from "./Components/BlogLanding.jsx";
import BlogPost from "./Components/Blog Components/BlogPost.jsx";

function App() {
    const router = createBrowserRouter([
        {path: '/', element: <Homepage />},
        {path: '/blog', element: <BlogLanding/>},
        {path: '/blog/:postId', element: <BlogPost/>},
    ]);

    return (
        <RouterProvider router={router} />
    );
}

export default App;
