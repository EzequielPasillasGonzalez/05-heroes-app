import { createBrowserRouter } from "react-router";
import { HomePage } from "../heroes/pages/home/HomePage.tsx";
import { HeroePage } from "../heroes/pages/heroe/HeroePage.tsx";
import { SearchPage } from "../heroes/pages/search/SearchPage.tsx";
import { AdminPage } from "../admin/pages/AdminPage.tsx";
import { HeroesLayout } from "../heroes/layouts/HeroesLayout.tsx";
import { AdminLayout } from "../admin/layouts/adminLayout.tsx";

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
        path: "heroe/1",
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
