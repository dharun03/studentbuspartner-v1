import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLaylout from "./ui/AppLaylout";
import StudentPage from "./features/student/StudentPage";
import DriverPage from "./features/driver/DriverPage";
import RoutePage from "./features/route/RoutePage";
import BusPage from "./features/bus/BusPage";
import Dashboard from "./features/dashboard/Dashboard";

const router = createBrowserRouter([
  {
    element: <AppLaylout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "manageStudents",
        element: <StudentPage />,
      },
      {
        path: "manageDrivers",
        element: <DriverPage />,
      },
      {
        path: "manageRoutes",
        element: <RoutePage />,
      },
      {
        path: "manageBuses",
        element: <BusPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
