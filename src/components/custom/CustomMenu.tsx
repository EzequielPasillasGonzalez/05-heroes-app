import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router";

export const CustomMenu = () => {
  const { pathname } = useLocation();

  const isActive = (path: string) => pathname === path;

  return (
    <NavigationMenu className="py-2">
      <NavigationMenuList>
        {/* Home */}
        <NavigationMenuItem>
          <NavigationMenuLink
            className={cn(isActive("/") && "bg-slate-200 ", "p-2 rounded-md")}
            render={<Link to="/" />}
          >
            Home
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Search */}
        <NavigationMenuItem>
          <NavigationMenuLink
            className={cn(
              isActive("/search") && "bg-slate-200 ",
              "p-2 rounded-md",
            )}
            render={<Link to="/search" />}
          >
            Search SuperHeroes
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
