import { RouteType } from "@multiversx/sdk-dapp/types";
import { Home } from "./pages/Home";
import { Unlock } from "./pages/Unlock";

export const routeNames = {
  home: "/",
  unlock: "/unlock",
};

interface RouteWithTitleType extends RouteType {
  title: string;
}

export const routes: RouteWithTitleType[] = [
  {
    path: routeNames.home,
    title: "Home",
    component: Home,
  },
  {
    path: routeNames.unlock,
    title: "Unlock",
    component: Unlock,
  },
];
