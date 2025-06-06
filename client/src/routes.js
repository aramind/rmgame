import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Landing from "./pages/landing/Landing";
import Play from "./pages/play/Play";
import History from "./pages/history/History";

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
      {
        path: "/history",
        element: <History />,
      },
      { path: "*", element: <Landing /> },
    ],
  },
]);

const routes = { router };

export default routes;
