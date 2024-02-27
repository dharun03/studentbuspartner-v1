import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function AppLaylout() {
  return (
    <div className="grid grid-cols-1  lg:grid-cols-[240px_auto] ">
      <Sidebar />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLaylout;
