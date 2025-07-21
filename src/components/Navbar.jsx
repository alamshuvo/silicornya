import { useState, useRef, useEffect } from "react";
import { Menu, X, ShoppingCart, Bell, UserCircle, Package, User, ChevronRight } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../redux/auth/authSlice";

const Navbar = ({ onToggleSidebar, isSidebarOpen }) => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex font-fustat justify-between items-center px-6 py-4 shadow bg-white transition-all duration-300 relative">
      {/* Left: Hamburger + Title */}
      <div className="flex items-center gap-4">
        <button onClick={onToggleSidebar}>
          {isSidebarOpen ? (
            <X className="w-6 h-6 text-gray-700" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700" />
          )}
        </button>
        <span className="text-xl font-semibold text-purple-700">
          Business Center
        </span>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4 relative" ref={dropdownRef}>
        {token ? (
          <>
            <ShoppingCart className="w-5 h-5 text-gray-600 cursor-pointer" />
            <Bell className="w-5 h-5 text-gray-600 cursor-pointer" />

            {/* User Icon with dropdown */}
            <div className="relative">
              <UserCircle
                className="w-10 h-10 text-purple-500 cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />

              {/* Dropdown Menu */}
              <div
                className={`absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg overflow-hidden transform transition-all duration-300 ${
                  dropdownOpen
                    ? "opacity-100 scale-100 translate-y-0"
                    : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                }`}
              >
                <div className="flex flex-col text-sm text-gray-700">
                  <button
                    className="px-4 py-2 hover:bg-gray-100 text-left flex items-center gap-2"
                    onClick={() => navigate("/user")}
                  >
                    <User></User>
                    Profile
                   
                  </button>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 hover:bg-gray-100 text-left text-red-500 flex items-center gap-2"
                  >   <ChevronRight></ChevronRight>
                    Logout
                 
                  </button>
                </div>
              </div>
            </div>

            <span className="font-medium text-gray-800">
              {user?.name || "Admin"}
            </span>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 text-sm"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
