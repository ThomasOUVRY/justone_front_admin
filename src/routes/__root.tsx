import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Banner } from "../components/shared/Banner.tsx";

export const Route = createRootRoute({
  component: () => (
    <div id={"route-base"} className={"bg-base-200"}>
      <Banner />
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
});
