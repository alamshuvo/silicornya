import {
    LayoutDashboard,
    Home,
    User,
    Package,
    ChevronDown,
    ChevronRight,
  } from "lucide-react";
  import { useState } from "react";
  import { NavLink } from "react-router-dom";
  
  const Sidebar = ({ isCollapsed }) => {
    const [openProfile, setOpenProfile] = useState(false);
  
    const toggleProfile = () => setOpenProfile(!openProfile);
  
    const menuItems = [
      { icon: <LayoutDashboard />, label: "Dashboard", path: "/" },
      { icon: <Home />, label: "Home", path: "/dashboard/home" },
    ];
  
    return (
      <div className="h-full p-4 space-y-2 text-white font-fustat">
        {/* Top items */}
        {menuItems.map((item, idx) => (
          <NavLink
            to={item.path}
            key={idx}
            className={({ isActive }) =>
              `flex items-center gap-4 p-2 rounded transition-all cursor-pointer hover:bg-purple-600 ${
                isActive ? "bg-purple-700 font-semibold" : ""
              }`
            }
          >
            <div>{item.icon}</div>
            {!isCollapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
  
        {/* Profile Dropdown */}
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
              <div>{openProfile ? <ChevronDown size={18} /> : <ChevronRight size={18} />}</div>
            )}
          </div>
  
          {/* Submenu - only show if not collapsed */}
          {!isCollapsed && openProfile && (
            <div className="ml-8 flex flex-col gap-2">
              <NavLink
                to="/dashboard/product"
                className={({ isActive }) =>
                  `flex items-center gap-3 p-2 rounded hover:bg-purple-500 transition-all ${
                    isActive ? "bg-purple-600 font-semibold" : ""
                  }`
                }
              >
                <Package size={16} />
                <span>Product</span>
              </NavLink>
  
              <NavLink
                to="/dashboard/user"
                className={({ isActive }) =>
                  `flex items-center gap-3 p-2 rounded hover:bg-purple-500 transition-all ${
                    isActive ? "bg-purple-600 font-semibold" : ""
                  }`
                }
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
  