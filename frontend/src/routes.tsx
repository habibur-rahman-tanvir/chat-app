import { createBrowserRouter } from "react-router";
import EventLayout from "./components/layouts/EventLayout";
import Login from "./features/login/Login";
import RootLayout from "./components/layouts/RootLayout";

const router = createBrowserRouter([
  {
    Component: EventLayout,
    children: [
      {
        path: "/",
        Component: RootLayout,
      },
      {
        path: "/login",
        Component: Login,
      },
    ],
  },
]);

export default router;
