import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },
]);

export default router;
