import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/mainPage/mainPage";
import Page404 from "../pages/page404/page404";
import Catalog from "../pages/catalog/catalog";
import CatalogCard from "../pages/catalogCard/catalogCard";

const Router = createBrowserRouter([
    {
        path: '/',
        element: <MainPage />,
        errorElement: <Page404 />
    },
    {
        path: '/catalog/:name',
        element: <Catalog />,
        errorElement: <Page404 />
    },
    {
        path: '/catalog card/',
        element: <CatalogCard />,
        errorElement: <Page404 />
    },
    {
        path: '/page404',
        element: <Page404 />
    }
])

export default Router;
