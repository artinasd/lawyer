import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./Components/Homepage.jsx";
import BlogLanding from "./Components/BlogLanding.jsx";

function App() {
    const router = createBrowserRouter([
        { path: '/', element: <Homepage /> },
        {path: '/blog', element: <BlogLanding/>}
    ]);

    return (
        <RouterProvider router={router} />
    );
}

export default App;
