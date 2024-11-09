import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/mainPage/mainPage";
import Page404 from "../pages/page404/page404";
import Catalog from "../pages/catalog/catalog";
import CatalogCard from "../pages/catalogCard/catalogCard";
import AdminPanelCsworldEdit from "../pages/adminPanelCsworldEdit/adminPanelCsworldEdit";
import AdminPanelCatalog from "../pages/adminPanelCatalog/adminPanelCatalog";
import CatalogCardEdit from "../pages/CatalogCardEdit/CatalogCardEdit";

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
        path: '/catalog card/:name/:id',
        element: <CatalogCard />,
        errorElement: <Page404 />
    },
    {
        path: '/edit card/:name/:id',
        element: <CatalogCardEdit />,
        errorElement: <Page404 />
    },
    {
        path: '/adminPanelCsworldEdit',
        element: <AdminPanelCsworldEdit />
    },
    {
        path: '/adminPanelCatalog/:name',
        element: <AdminPanelCatalog />
    },
    {
        path: '/page404',
        element: <Page404 />
    }
])

export default Router;
