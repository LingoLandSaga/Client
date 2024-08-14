import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import MainLayout from "../pages/MainLayout";
import JoinRoom from "../pages/JoinRoom";
import CreateRoom from "../pages/CreateRoom";
import Room from "../pages/Room";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/join-room",
        element: <JoinRoom />,
      },
      {
        path: "/create-room",
        element: <CreateRoom />,
      },
      {
        path: "/rooms/:roomId",
        element: <Room />,
      },
    ],
  },
]);

export default router;
