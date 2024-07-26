import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Loader from "./Loader";
import { Suspense } from "react";

function AppLayout() {
  return (
    <div className="grid grid-cols-1  lg:grid-cols-[240px_auto]">
      <Sidebar />
      <Suspense fallback={<Loader />}>
        <main className="overflow-y-auto pl-3 pr-3 transition-all duration-75">
          <Outlet />
        </main>
      </Suspense>
    </div>
  );
}

export default AppLayout;
