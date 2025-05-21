import React, { useState, useEffect, useCallback } from "react";
import {
  FiPlus,
  FiSearch,
  FiX,
  FiAlertTriangle,
  FiCalendar,
} from "react-icons/fi";

import { CiSettings } from "react-icons/ci";
import ProductSettings from "./ProductSettings";
import Products from "./Products";
const ProductMain = () => {
  const [activeTab, setActiveTab] = useState("products");

  // Open modal for adding new product
  const openAddModal = () => {
    setCurrentProduct(null);
    setFormData({
      name: "",
      category: "",
      stock: "",
      dosageForm: "",
      strength: "",
      stockUnit: "",
    });
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 bg-gray-50 overflow-x-hidden overflow-y-scroll">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Products Management
            </h2>
            <p className="text-gray-600">
              Manage your pharmacy's product inventory
            </p>
          </div>
        </div>
      </div>
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("products")}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "products"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Product Items
        </button>
        <button
          onClick={() => setActiveTab("setting")}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "setting"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <div className="flex items-center">
            <CiSettings className="mr-1" />
            Product Settings
          </div>
        </button>
        <button
          onClick={() => setActiveTab("expiring")}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "expiring"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <div className="flex items-center">
            <FiCalendar className="mr-1" />
            Expiring Soon
          </div>
        </button>
      </div>

      {/* Other View */}

      {activeTab === "products" ? <Products /> : ""}
    </div>

    // <ProductSettings />
  );
};
export default ProductMain;
