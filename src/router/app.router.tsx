import { createBrowserRouter } from "react-router";
// import { HomePage } from "@/heroes/pages/home/HomePage.tsx";
// import { HeroePage } from "@/heroes/pages/heroe/HeroePage.tsx";

import { AdminPage } from "@/admin/pages/AdminPage.tsx";
import { HeroesLayout } from "@/heroes/layouts/HeroesLayout.tsx";
import { AdminLayout } from "@/admin/layouts/AdminLayout.tsx";
import { lazy } from "react";

// Lazy load
const SearchPage = lazy(() => import("@/heroes/pages/search/SearchPage"));
const HeroePage = lazy(() => import("@/heroes/pages/heroe/HeroePage"));
const HomePage = lazy(() => import("@/heroes/pages/home/HomePage"));

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <HeroesLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },

      {
        path: "heroes/1",
        element: <HeroePage />,
      },

      {
        path: "search",
        element: <SearchPage />,
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
