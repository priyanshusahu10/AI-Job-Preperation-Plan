import { createBrowserRouter } from "react-router"
import Login from "./src/Features/auth/Pages/Login"
import Register from "./src/Features/auth/Pages/Register"
import Protected from "./src/Features/auth/Components/Protected.jsx"
import Home from "./src/Features/interview/Pages/Home.jsx"
import Interview from "./src/Features/interview/Pages/Interview.jsx"
import Landing from "./src/Features/Landing_page/Landing_page.jsx"

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/contact",
        element: <h2>Contact Us</h2>
    },{
        path: "/",
        element: <Landing />
    },{
        path: "/interview/:interviewId",
        element: <Protected><Interview/></Protected>
    },{
        path: '/generate-report',
        element: <Protected><Home /></Protected>
    }
])