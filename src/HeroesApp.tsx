import { RouterProvider } from "react-router";
import { appRouter } from "./router/app.router.tsx";

export const HeroesApp = () => {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
};
