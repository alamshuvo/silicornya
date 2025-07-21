import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    // For desktop
    setIsSidebarCollapsed((prev) => !prev);
  };

  const handleMobileSidebar = () => {
    // For mobile
    setIsMobileSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar - Desktop */}
      <div
        className={`hidden md:block transition-all duration-300 bg-gradient-to-r from-purple-500 to-purple-300 text-white h-full ${
          isSidebarCollapsed ? "w-16" : "w-64"
        }`}
      >
        <Sidebar isCollapsed={isSidebarCollapsed} />
      </div>

      {/* Sidebar - Mobile */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={handleMobileSidebar}
          ></div>
          <div className="absolute top-0 left-0 w-64 h-full bg-gradient-to-r from-purple-500 to-purple-300 text-white z-50 shadow-lg">
            <Sidebar isCollapsed={false} onClose={handleMobileSidebar} />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-col flex-1 transition-all duration-300">
        <Navbar
          onToggleSidebar={handleToggleSidebar}
          isSidebarOpen={isSidebarCollapsed}
          onMobileSidebar={handleMobileSidebar}
        />
        <main className="flex-1 overflow-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
