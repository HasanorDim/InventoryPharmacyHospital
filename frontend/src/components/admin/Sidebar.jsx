import { LogOut } from "lucide-react";
import React from "react";
import { FaNotesMedical } from "react-icons/fa";
import { FiFileText, FiPackage, FiPieChart, FiUsers } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

const Sidebar = () => {
  const { logout } = useAuthStore();
  const handleLogout = () => {
    logout();
  };
  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 bg-blue-50 border-r border-gray-200">
        <div className="flex items-center justify-center h-16 px-4 bg-blue-600">
          <h1 className="text-white font-bold text-xl">PharmaStock</h1>
        </div>
        <div className="flex flex-col flex-grow px-4 py-4 overflow-y-auto">
          {/* Navigation Links (Takes remaining space) */}
          <nav className="flex-1 space-y-2">
            <NavLink
              to="/dashboard-admin"
              end
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                  isActive
                    ? "bg-blue-200 text-blue-800"
                    : "hover:bg-gray-100 text-gray-600"
                }`
              }
            >
              <FiPieChart className="mr-3" />
              Dashboard
            </NavLink>

            <NavLink
              to="/dashboard-admin/inventory"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                  isActive
                    ? "bg-blue-100 text-blue-800"
                    : "hover:bg-gray-100 text-gray-600"
                }`
              }
            >
              <FiPackage className="mr-3" />
              Inventory
            </NavLink>

            <NavLink
              to="/dashboard-admin/suppliers"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                  isActive
                    ? "bg-blue-100 text-blue-800"
                    : "hover:bg-gray-100 text-gray-600"
                }`
              }
            >
              <FiUsers className="mr-3" />
              Suppliers
            </NavLink>

            <NavLink
              to="/dashboard-admin/products"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                  isActive
                    ? "bg-blue-100 text-blue-800"
                    : "hover:bg-gray-100 text-gray-600"
                }`
              }
            >
              <FaNotesMedical className="mr-3" />
              Products
            </NavLink>

            <NavLink
              to="/dashboard-admin/report"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                  isActive
                    ? "bg-blue-100 text-blue-800"
                    : "hover:bg-gray-100 text-gray-600"
                }`
              }
            >
              <FiFileText className="mr-3" />
              Reports
            </NavLink>
          </nav>

          <div className="mt-auto pt-4 ">
            <button
              className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-300 rounded-lg bg-red-100 mb-5 cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut className="mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
