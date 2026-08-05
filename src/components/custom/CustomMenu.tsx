import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router";

export const CustomMenu = () => {
  //const { pathname } = useLocation(); //Es la ubicacion en la que me encuentro actualmente en el url

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* Home */}
        <NavigationMenuItem>
          <NavigationMenuLink
            render={<Link to="/">Inicio</Link>}
            className={navigationMenuTriggerStyle()}
          >
            Documentation
          </NavigationMenuLink>
        </NavigationMenuItem>
        {/* Search */}
        <NavigationMenuItem>
          <NavigationMenuLink
            render={<Link to="/search">Buscar superHéroes</Link>}
            className={navigationMenuTriggerStyle()}
          >
            Documentation
          </NavigationMenuLink>
        </NavigationMenuItem>
        {/*  */}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
