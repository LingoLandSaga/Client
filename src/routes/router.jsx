import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../pages/MainLayout";
import Home from "../pages/Home";
import CreateRoom from "../pages/CreateRoom";
import JoinRoom from "../pages/JoinRoom";
import BattleFight from "../pages/BattleJoin";







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
        path: "create-room",
        element: <CreateRoom />,
      },
      {
        path: "join-room",
        element: <JoinRoom />,
      },
      {
        path: "battle-fight",
        element: <BattleFight />,
      },
    ],
  },
]);

export default router;
