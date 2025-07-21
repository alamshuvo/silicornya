import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <div
        className={`transition-all duration-300 bg-gradient-to-r from-purple-500 to-purple-300 text-white h-full ${
          isSidebarCollapsed ? "w-16" : "w-64"
        }`}
      >
        <Sidebar isCollapsed={isSidebarCollapsed} />
      </div>

      {/* Main content area */}
      <div className="flex flex-col flex-1 transition-all duration-300">
        <Navbar
          onToggleSidebar={handleToggleSidebar}
          isSidebarOpen={isSidebarCollapsed}
        />
        <main className="flex-1 overflow-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
