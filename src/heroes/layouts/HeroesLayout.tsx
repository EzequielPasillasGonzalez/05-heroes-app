import { Outlet } from "react-router";

export const HeroesLayout = () => {
  return (
    <div className="bg-red-500">
      {/* Todas las rutas hijas tiene el cascaron externo */}
      {/*  Con Outlet se muestra la ruta hija actual */}
      <Outlet />
    </div>
  );
};
