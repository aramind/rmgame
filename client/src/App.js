import { CssBaseline } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import routes from "./routes";
import AckAlert from "./components/alerts/AckAlert";
import AutoHideAlert from "./components/alerts/AutoHideAlert";
function App() {
  return (
    <>
      <CssBaseline />
      <RouterProvider router={routes.router} />
      <AutoHideAlert />
      <AckAlert />
    </>
  );
}

export default App;
