import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import StudentPage from "./features/student/StudentPage";
import DriverPage from "./features/driver/DriverPage";
import RoutePage from "./features/route/RoutePage";
import BusPage from "./features/bus/BusPage";
import Dashboard from "./features/dashboard/Dashboard";
import StudentsCompaintsPage from "./features/complaints/StudentsCompaintsPage";
import ErrorPage from "./ui/ErrorPage";
import DriverComplaintsPage from "./features/complaints/DriverComplaintsPage";
import NotificationPage from "./features/notification/NotificationPage";
import DriverNotificationPage from "./features/notification/DriverNotificationPage";
import Login from "./features/login/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./features/login/ProtectedRoute";
import AttendencePage from "./features/attendence/AttendencePage";
import StopAttendance from "./features/attendence/StopAttendance";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="manageStudents" element={<StudentPage />} />
              <Route path="manageDrivers" element={<DriverPage />} />
              <Route path="manageBuses" element={<BusPage />} />
              <Route path="manageRoutes" element={<RoutePage />} />
              <Route
                path="studentComplaints"
                element={<StudentsCompaintsPage />}
              />
              <Route
                path="driverComplaints"
                element={<DriverComplaintsPage />}
              />
              <Route path="notifications" element={<NotificationPage />} />
              <Route
                path="driverNotifications"
                element={<DriverNotificationPage />}
              />
              <Route path="attendence" element={<AttendencePage />} />
              <Route path="stopattendence" element={<StopAttendance />} />
              <Route path="*" element={<ErrorPage />} />
            </Route>
            <Route path="/" index element={<Login />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>
    // <RouterProvider router={router} />
  );
}

export default App;
