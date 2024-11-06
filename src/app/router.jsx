import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/mainPage/mainPage";
import Page404 from "../pages/page404/page404";

const Router = createBrowserRouter([
    {
        path: '/',
        element: <MainPage />,
        errorElement: <Page404 />
    },
    {
        path: '/',
        element: <MainPage />,
        errorElement: <Page404 />
    },
    {
        path: '/page404',
        element: <Page404 />
    }
])

export default Router;
