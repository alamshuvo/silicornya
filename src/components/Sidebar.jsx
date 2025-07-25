// components/Sidebar.jsx
import {
    LayoutDashboard,
    Home,
    User,
    Package,
    ChevronDown,
    ChevronRight,
    X,
  } from "lucide-react";
  import { useState } from "react";
  import { NavLink } from "react-router-dom";
  
  const Sidebar = ({ isCollapsed, onClose }) => {
    const [openProfile, setOpenProfile] = useState(false);
  
    const toggleProfile = () => setOpenProfile(!openProfile);
  
    const menuItems = [
      { icon: <LayoutDashboard />, label: "Dashboard", path: "/" },
      { icon: <Home />, label: "Home", path: "/home" },
    ];
  
    return (
      <div className="h-full p-4 space-y-2 text-white font-fustat relative">
        {/* Close button for mobile */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 md:hidden"
          >
            <X size={24} />
          </button>
        )}
  
        {/* Top menu items */}
        {menuItems.map((item, idx) => (
          <NavLink
            to={item.path}
            key={idx}
            className={({ isActive }) =>
              `flex items-center gap-4 p-2 rounded transition-all cursor-pointer hover:bg-purple-600 ${
                isActive ? "bg-purple-700 font-semibold" : ""
              }`
            }
            onClick={onClose}
          >
            <div>{item.icon}</div>
            {!isCollapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
  
        {/* Dropdown for Profile */}
        <div className="flex flex-col gap-2">
          <div
            onClick={toggleProfile}
            className="flex items-center justify-between hover:bg-purple-600 p-2 rounded transition-all cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <User />
              {!isCollapsed && <span>Profile</span>}
            </div>
            {!isCollapsed && (
              <div>
                {openProfile ? (
                  <ChevronDown size={18} />
                ) : (
                  <ChevronRight size={18} />
                )}
              </div>
            )}
          </div>
  
          {!isCollapsed && openProfile && (
            <div className="ml-8 flex flex-col gap-2">
              <NavLink
                to="/product"
                className={({ isActive }) =>
                  `flex items-center gap-3 p-2 rounded hover:bg-purple-500 transition-all ${
                    isActive ? "bg-purple-600 font-semibold" : ""
                  }`
                }
                onClick={onClose}
              >
                <Package size={16} />
                <span>Product</span>
              </NavLink>
              <NavLink
                to="/user"
                className={({ isActive }) =>
                  `flex items-center gap-3 p-2 rounded hover:bg-purple-500 transition-all ${
                    isActive ? "bg-purple-600 font-semibold" : ""
                  }`
                }
                onClick={onClose}
              >
                <User size={16} />
                <span>User</span>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default Sidebar;
  