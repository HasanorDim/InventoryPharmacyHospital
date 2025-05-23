import React, { useEffect, useState } from "react";
import Sidebar from "../../components/admin/sidebar.jsx";
import Header from "../../components/admin/Header.jsx";
import { Outlet, useNavigate } from "react-router-dom";
import { FiAlertTriangle } from "react-icons/fi";
import { useAuthStore } from "../../store/useAuthStore.js";

const MainContent = () => {
  const checkUser = useAuthStore((state) => state.checkUser);
  const [showSessionExpired, setShowSessionExpired] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      checkUser();
    }, 500);

    // Attach a stopper function to window
    window.stopCheckUserInterval = () => {
      clearInterval(intervalId);
      setShowSessionExpired(true);
    };
  }, []);

  const handleLoginRedirect = () => {
    window.location.reload();
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Navigation */}
        <Header />

        {/* Main Dashboard Content */}
        <Outlet />
      </div>

      {/* Session Expired Modal */}
      {showSessionExpired && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-red-100 p-3 rounded-full">
                  <FiAlertTriangle className="text-red-600 text-2xl" />
                </div>
              </div>

              <h3 className="text-xl font-semibold text-center text-gray-800 mb-2">
                Session Expired
              </h3>

              <p className="text-gray-600 text-center mb-6">
                Your session has expired. Please log in again to continue.
              </p>

              <div className="flex flex-col">
                <button
                  onClick={handleLoginRedirect}
                  className="ml-auto px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainContent;
