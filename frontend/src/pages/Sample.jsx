import React, { useState } from "react";
import {
  FiPieChart,
  FiPackage,
  FiAlertTriangle,
  FiCalendar,
  FiPlus,
  FiFilter,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiChevronDown,
  FiChevronUp,
  FiPrinter,
  FiDownload,
} from "react-icons/fi";
// import { BsMedicine } from "react-icons/bs";
import { FaNotesMedical } from "react-icons/fa";

const Sample = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showFilters, setShowFilters] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const [expandedCard, setExpandedCard] = useState(null);

  // Sample medication data
  const medications = [
    {
      id: "MED-001",
      name: "Paracetamol 500mg",
      category: "Analgesic",
      batch: "BATCH-2023-05",
      expiry: "2024-06-30",
      currentStock: 142,
      threshold: 20,
      supplier: "PharmaCorp",
      lastRestocked: "2023-10-15",
      shelfLocation: "A12",
    },
    {
      id: "MED-002",
      name: "Amoxicillin 250mg Capsules",
      category: "Antibiotic",
      batch: "BATCH-2023-07",
      expiry: "2024-09-15",
      currentStock: 56,
      threshold: 25,
      supplier: "MediSupply",
      lastRestocked: "2023-11-02",
      shelfLocation: "B07",
    },
    {
      id: "MED-003",
      name: "Ibuprofen 200mg Tablets",
      category: "NSAID",
      batch: "BATCH-2023-04",
      expiry: "2024-03-31",
      currentStock: 4,
      threshold: 30,
      supplier: "HealthPlus",
      lastRestocked: "2023-09-18",
      shelfLocation: "A05",
    },
    {
      id: "MED-004",
      name: "Omeprazole 20mg Capsules",
      category: "PPI",
      batch: "BATCH-2023-08",
      expiry: "2024-11-30",
      currentStock: 32,
      threshold: 15,
      supplier: "PharmaCorp",
      lastRestocked: "2023-10-28",
      shelfLocation: "C03",
    },
  ];

  // Calculate statistics
  const stats = {
    totalMedications: medications.length,
    lowStockItems: medications.filter((m) => m.currentStock < m.threshold)
      .length,
    expiringSoon: medications.filter((m) => {
      const expiryDate = new Date(m.expiry);
      const threeMonthsFromNow = new Date();
      threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);
      return expiryDate <= threeMonthsFromNow;
    }).length,
    needReordering: medications.filter(
      (m) => m.currentStock <= m.threshold * 1.2
    ).length,
  };

  // Sort medications
  const sortedMedications = [...medications].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 bg-white border-r border-gray-200">
          <div className="flex items-center justify-center h-16 px-4 bg-blue-600">
            <h1 className="text-white font-bold text-xl">MedTrack</h1>
          </div>
          <div className="flex flex-col flex-grow px-4 py-4 overflow-y-auto">
            <nav className="flex-1 space-y-1">
              <button
                onClick={() => setActiveTab("overview")}
                className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-lg ${
                  activeTab === "overview"
                    ? "bg-blue-100 text-blue-800"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <FiPieChart className="mr-3" />
                Overview
              </button>
              <button
                onClick={() => setActiveTab("inventory")}
                className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-lg ${
                  activeTab === "inventory"
                    ? "bg-blue-100 text-blue-800"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <FiPackage className="mr-3" />
                All Medications
              </button>
              <button
                onClick={() => setActiveTab("lowstock")}
                className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-lg ${
                  activeTab === "lowstock"
                    ? "bg-blue-100 text-blue-800"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <FiAlertTriangle className="mr-3" />
                Low Stock Alerts
              </button>
              <button
                onClick={() => setActiveTab("expiring")}
                className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-lg ${
                  activeTab === "expiring"
                    ? "bg-blue-100 text-blue-800"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <FiCalendar className="mr-3" />
                Expiring Soon
              </button>
              <button
                onClick={() => setActiveTab("suppliers")}
                className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-lg ${
                  activeTab === "suppliers"
                    ? "bg-blue-100 text-blue-800"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <FaNotesMedical className="mr-3" />
                Suppliers
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Navigation */}
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
          <div className="flex items-center">
            <button className="md:hidden mr-4 text-gray-500">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
            <h2 className="text-lg font-semibold text-gray-800">
              {activeTab === "overview" && "Medication Overview"}
              {activeTab === "inventory" && "All Medications"}
              {activeTab === "lowstock" && "Low Stock Alerts"}
              {activeTab === "expiring" && "Medications Expiring Soon"}
              {activeTab === "suppliers" && "Suppliers Management"}
            </h2>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <FiFilter className="mr-2" />
              Filters
            </button>
            <button className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              <FiDownload className="mr-2" />
              Export
            </button>
            <button className="flex items-center px-3 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700">
              <FiPlus className="mr-2" />
              Add Medication
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50">
                      <FiPackage className="text-blue-500 text-xl" />
                    </div>
                    <span className="text-sm font-medium text-green-600">
                      +5%
                    </span>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-2xl font-semibold text-gray-800">
                      {stats.totalMedications}
                    </h3>
                    <p className="text-sm text-gray-500">Total Medications</p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-50">
                      <FiAlertTriangle className="text-red-500 text-xl" />
                    </div>
                    <span className="text-sm font-medium text-red-600">
                      +{stats.lowStockItems > 0 ? stats.lowStockItems : "0"}
                    </span>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-2xl font-semibold text-gray-800">
                      {stats.lowStockItems}
                    </h3>
                    <p className="text-sm text-gray-500">Low Stock Items</p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-50">
                      <FiCalendar className="text-yellow-500 text-xl" />
                    </div>
                    <span className="text-sm font-medium text-yellow-600">
                      +{stats.expiringSoon > 0 ? stats.expiringSoon : "0"}
                    </span>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-2xl font-semibold text-gray-800">
                      {stats.expiringSoon}
                    </h3>
                    <p className="text-sm text-gray-500">Expiring Soon</p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-50">
                      <FaNotesMedical className="text-purple-500 text-xl" />
                    </div>
                    <span className="text-sm font-medium text-purple-600">
                      +{stats.needReordering > 0 ? stats.needReordering : "0"}
                    </span>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-2xl font-semibold text-gray-800">
                      {stats.needReordering}
                    </h3>
                    <p className="text-sm text-gray-500">Need Reordering</p>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Recent Stock Changes
                </h3>
                <div className="space-y-4">
                  {medications.slice(0, 3).map((med) => (
                    <div key={med.id} className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100">
                          <FiPackage className="h-4 w-4 text-blue-500" />
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {med.name} stock updated
                        </p>
                        <p className="text-sm text-gray-500">
                          Now {med.currentStock} units available
                        </p>
                        <p className="text-xs text-gray-400">
                          Last restocked: {med.lastRestocked}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Critical Medications */}
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Critical Medications
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Medication
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Current Stock
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Threshold
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {medications
                        .filter((m) => m.currentStock < m.threshold * 1.5)
                        .map((med) => (
                          <tr key={med.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-blue-50 rounded-lg">
                                  <FaNotesMedical className="h-5 w-5 text-blue-500" />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {med.name}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {med.category}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {med.currentStock}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">
                                {med.threshold}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  med.currentStock < med.threshold
                                    ? "bg-red-100 text-red-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {med.currentStock < med.threshold
                                  ? "Critical"
                                  : "Warning"}
                              </span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "inventory" && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Filter Bar */}
              {showFilters && (
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500 text-sm">
                        <option>All Categories</option>
                        <option>Analgesic</option>
                        <option>Antibiotic</option>
                        <option>NSAID</option>
                        <option>PPI</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Stock Status
                      </label>
                      <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500 text-sm">
                        <option>All Items</option>
                        <option>Low Stock</option>
                        <option>In Stock</option>
                        <option>Out of Stock</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Supplier
                      </label>
                      <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500 text-sm">
                        <option>All Suppliers</option>
                        <option>PharmaCorp</option>
                        <option>MediSupply</option>
                        <option>HealthPlus</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry
                      </label>
                      <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500 text-sm">
                        <option>All Dates</option>
                        <option>Expiring Soon</option>
                        <option>Next 3 Months</option>
                        <option>Next 6 Months</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Inventory Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => requestSort("name")}
                      >
                        <div className="flex items-center">
                          Medication
                          {sortConfig.key === "name" &&
                            (sortConfig.direction === "asc" ? (
                              <FiChevronUp className="ml-1" />
                            ) : (
                              <FiChevronDown className="ml-1" />
                            ))}
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => requestSort("category")}
                      >
                        <div className="flex items-center">
                          Category
                          {sortConfig.key === "category" &&
                            (sortConfig.direction === "asc" ? (
                              <FiChevronUp className="ml-1" />
                            ) : (
                              <FiChevronDown className="ml-1" />
                            ))}
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => requestSort("currentStock")}
                      >
                        <div className="flex items-center">
                          Stock
                          {sortConfig.key === "currentStock" &&
                            (sortConfig.direction === "asc" ? (
                              <FiChevronUp className="ml-1" />
                            ) : (
                              <FiChevronDown className="ml-1" />
                            ))}
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => requestSort("expiry")}
                      >
                        <div className="flex items-center">
                          Expiry
                          {sortConfig.key === "expiry" &&
                            (sortConfig.direction === "asc" ? (
                              <FiChevronUp className="ml-1" />
                            ) : (
                              <FiChevronDown className="ml-1" />
                            ))}
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sortedMedications.map((medication) => (
                      <React.Fragment key={medication.id}>
                        <tr
                          className={`hover:bg-gray-50 ${
                            medication.currentStock < medication.threshold
                              ? "bg-red-50"
                              : ""
                          }`}
                          onClick={() =>
                            setExpandedCard(
                              expandedCard === medication.id
                                ? null
                                : medication.id
                            )
                          }
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-blue-50 rounded-lg">
                                <FaNotesMedical className="h-5 w-5 text-blue-500" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {medication.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  Batch: {medication.batch}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {medication.category}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div
                                className={`w-24 h-2 rounded-full ${
                                  medication.currentStock < medication.threshold
                                    ? "bg-red-500"
                                    : medication.currentStock <
                                      medication.threshold * 1.5
                                    ? "bg-yellow-500"
                                    : "bg-green-500"
                                }`}
                                style={{
                                  width: "100px",
                                  background: `linear-gradient(to right, ${
                                    medication.currentStock <
                                    medication.threshold
                                      ? "#EF4444"
                                      : medication.currentStock <
                                        medication.threshold * 1.5
                                      ? "#F59E0B"
                                      : "#10B981"
                                  } ${Math.min(
                                    100,
                                    (medication.currentStock /
                                      medication.threshold) *
                                      50
                                  )}%, #E5E7EB ${Math.min(
                                    100,
                                    (medication.currentStock /
                                      medication.threshold) *
                                      50
                                  )}%)`,
                                }}
                              ></div>
                              <span className="ml-2 text-sm text-gray-900">
                                {medication.currentStock}/{medication.threshold}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div
                              className={`text-sm ${
                                new Date(medication.expiry) <
                                new Date(
                                  new Date().setMonth(new Date().getMonth() + 3)
                                )
                                  ? "text-red-600 font-medium"
                                  : "text-gray-900"
                              }`}
                            >
                              {new Date(medication.expiry).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                              <FiEdit2 />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <FiTrash2 />
                            </button>
                          </td>
                        </tr>
                        {expandedCard === medication.id && (
                          <tr className="bg-gray-50">
                            <td colSpan="5" className="px-6 py-4">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                  <h4 className="text-sm font-medium text-gray-500">
                                    Supplier
                                  </h4>
                                  <p className="mt-1 text-sm text-gray-900">
                                    {medication.supplier}
                                  </p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium text-gray-500">
                                    Shelf Location
                                  </h4>
                                  <p className="mt-1 text-sm text-gray-900">
                                    {medication.shelfLocation}
                                  </p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium text-gray-500">
                                    Last Restocked
                                  </h4>
                                  <p className="mt-1 text-sm text-gray-900">
                                    {medication.lastRestocked}
                                  </p>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">1</span> to{" "}
                      <span className="font-medium">{medications.length}</span>{" "}
                      of{" "}
                      <span className="font-medium">{medications.length}</span>{" "}
                      results
                    </p>
                  </div>
                  <div>
                    <nav
                      className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                      aria-label="Pagination"
                    >
                      <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span className="sr-only">Previous</span>
                        <FiChevronLeft className="h-5 w-5" aria-hidden="true" />
                      </button>
                      <button
                        aria-current="page"
                        className="z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                      >
                        1
                      </button>
                      <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                        2
                      </button>
                      <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span className="sr-only">Next</span>
                        <FiChevronRight
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other tabs would be implemented similarly */}
          {activeTab === "lowstock" && (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Low Stock Medications
              </h3>
              {/* Implementation similar to inventory table but filtered */}
            </div>
          )}

          {activeTab === "expiring" && (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Medications Expiring Soon
              </h3>
              {/* Implementation similar to inventory table but filtered */}
            </div>
          )}

          {activeTab === "suppliers" && (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Suppliers Management
              </h3>
              {/* Implementation for suppliers management */}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Sample;
