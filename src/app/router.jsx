import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/mainPage/mainPage";
import Page404 from "../pages/page404/page404";
import Catalog from "../pages/catalog/catalog";
import CatalogCard from "../pages/catalogCard/catalogCard";
import AdminPanelCsworldEdit from "../pages/adminPanelCsworldEdit/adminPanelCsworldEdit";
import AdminPanelCatalog from "../pages/adminPanelCatalog/adminPanelCatalog";
import CatalogCardEdit from "../pages/CatalogCardEdit/CatalogCardEdit";
import Login from "../pages/login/Login";
import InformationPage from "../pages/informationPage/informationPage";

const Router = createBrowserRouter([
    {
        path: '/',
        element: <MainPage />,
        errorElement: <Page404 />
    },
    {
        path: '/information page/:name',
        element: <InformationPage />,
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
        path: '/login',
        element: <Login />
    },
    {
        path: '/page404',
        element: <Page404 />
    }
])

export default Router;
