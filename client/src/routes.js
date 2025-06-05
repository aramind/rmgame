import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Landing from "./pages/landing/Landing";
import Play from "./pages/play/Play";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Landing />,
      },
      {
        path: "/play",
        element: <Play />,
      },
      { path: "*", element: <Landing /> },
    ],
  },
]);

const routes = { router };

export default routes;
