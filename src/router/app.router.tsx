import { AdminPage } from "@/admin/pages/AdminPage";
import { AdminLayout } from "@/admin/layouts/AdminLayout";
import { HeroLayout } from "@/heroes/layouts/HeroLayout";
import { HeroPage } from "@/heroes/pages/hero/HeroPage";
import { HomePage } from "@/heroes/pages/home/HomePage";
// import { SearchPage } from "@/heroes/pages/search/SearchPage";
import { createBrowserRouter, Navigate } from "react-router";
import { lazy } from "react";

const SearchPage = lazy(() => import("@/heroes/pages/search/SearchPage"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HeroLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "heroes/:idSlug", //Pasar argumentos por ruta
        element: <HeroPage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "*",
        // element: <h1>404</h1>
        element: <Navigate to="/" />,
      },
    ],
  },

  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminPage />,
      },
    ],
  },
]);
