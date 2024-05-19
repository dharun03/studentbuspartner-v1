import { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { IoIosArrowDropdown } from "react-icons/io";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
function MyAccount() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
    toast.success("You have logged out successfully!");
  }

  return (
    <div className="relative">
      <div
        className="inline-flex items-center overflow-hidden rounded-md border bg-white"
        onClick={() => setIsMenuOpen((state) => !state)}
      >
        <a
          href="#"
          className="flex items-center gap-3  px-4 py-2 text-sm/none text-gray-600 hover:bg-gray-50 hover:text-gray-700"
        >
          <FaRegUserCircle size={20} />
          <span>admin@gmail.com</span>
        </a>

        <button className="h-full p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700">
          <span className="sr-only">Menu</span>
          <IoIosArrowDropdown color="currentColor" />
        </button>
      </div>

      {isMenuOpen && (
        <div
          className="absolute end-0 z-10 mt-2 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
          role="menu"
        >
          <div className="p-2">
            <button
              type="submit"
              className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
              role="menuitem"
              onClick={handleLogout}
            >
              <MdLogout color="text-red-700" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyAccount;
