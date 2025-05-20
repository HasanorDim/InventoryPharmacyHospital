import React from "react";
import {
  FiPackage,
  FiFolder,
  FiAlertCircle,
  FiCalendar,
  FiThermometer,
  FiAlertTriangle,
  FiLock,
  FiPlus,
  FiFileText,
  FiUsers,
  FiSettings,
} from "react-icons/fi";
import { FaNotesMedical } from "react-icons/fa";
import Sample from "./fronend/src/pages/sample";

const DashboardAdmin = () => {
  // Stats data
  const stats = [
    {
      title: "Total Products",
      value: "1,248",
      icon: <FiPackage className="text-blue-500" />,
      change: "+12%",
      trend: "up",
    },
    {
      title: "Low Stock Items",
      value: "24",
      icon: <FiAlertCircle className="text-red-500" />,
      change: "+3",
      trend: "up",
    },
    {
      title: "Medicine Categories",
      value: "12",
      icon: <FiFolder className="text-purple-500" />,
      change: "+1",
      trend: "up",
    },
    {
      title: "Expiring Soon",
      value: "18",
      icon: <FaNotesMedical className="text-yellow-500" />,
      change: "-5",
      trend: "down",
    },
  ];

  // Low stock items
  const lowStockItems = [
    { id: 1, name: "Aspirin 81mg", stock: 5, threshold: 20 },
    { id: 2, name: "Lisinopril 10mg", stock: 8, threshold: 25 },
    { id: 3, name: "Metformin 500mg", stock: 3, threshold: 30 },
  ];

  // Recent activities
  const recentActivities = [
    {
      id: 1,
      action: "Added new medicine",
      product: "Paracetamol 500mg",
      time: "10 mins ago",
    },
    {
      id: 2,
      action: "Updated stock",
      product: "Amoxicillin 250mg",
      time: "25 mins ago",
    },
    {
      id: 3,
      action: "Low stock alert",
      product: "Ibuprofen 200mg",
      time: "1 hour ago",
    },
    {
      id: 4,
      action: "Medicine expired",
      product: "Omeprazole 20mg",
      time: "2 hours ago",
    },
  ];

  // New data for widgets
  const expiringSoon = [
    { id: 1, name: "Insulin Glargine", daysLeft: 5 },
    { id: 2, name: "Amoxicillin 250mg", daysLeft: 12 },
    { id: 3, name: "Diazepam 5mg", daysLeft: 18 },
  ];

  const tempStatus = {
    normal: true,
    fridge: false, // Simulating a fridge alert
  };

  const categories = [
    { name: "Pain Relief", count: 42 },
    { name: "Antibiotics", count: 28 },
    { name: "Cardiac", count: 19 },
    { name: "Diabetes", count: 15 },
    { name: "Psychiatric", count: 8 },
    { name: "Other", count: 36 },
  ];

  const criticalAlerts = [
    {
      id: 1,
      icon: <FiAlertCircle className="text-red-500" />,
      title: "Temperature Excursion",
      description: "Refrigerator 2 exceeded 8°C",
    },
    {
      id: 2,
      icon: <FiLock className="text-red-500" />,
      title: "Narcotics Discrepancy",
      description: "2 units unaccounted",
    },
  ];

  return (
    <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>
        <p className="text-gray-600">
          Comprehensive overview of pharmacy operations
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50">
                {stat.icon}
              </div>
              <span
                className={`text-sm font-medium ${
                  stat.trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {stat.value}
              </h3>
              <p className="text-sm text-gray-500">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-xl shadow border border-gray-200 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button className="flex flex-col items-center justify-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <FiPlus className="text-blue-600 text-xl mb-2" />
            <span className="text-sm">Add Medicine</span>
          </button>
          <button className="flex flex-col items-center justify-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <FiFileText className="text-green-600 text-xl mb-2" />
            <span className="text-sm">Generate Report</span>
          </button>
          <button className="flex flex-col items-center justify-center p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
            <FiUsers className="text-purple-600 text-xl mb-2" />
            <span className="text-sm">Manage Staff</span>
          </button>
          <button className="flex flex-col items-center justify-center p-3 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors">
            <FiSettings className="text-amber-600 text-xl mb-2" />
            <span className="text-sm">System Settings</span>
          </button>
        </div>
      </div>

      {/* Critical Alerts */}
      {criticalAlerts.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow border border-red-200 mb-6">
          <h3 className="text-lg font-semibold text-red-700 flex items-center mb-4">
            <FiAlertTriangle className="mr-2" />
            Critical Alerts
          </h3>
          <div className="space-y-3">
            {criticalAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-center p-3 bg-red-50 rounded-lg"
              >
                <div className="mr-3">{alert.icon}</div>
                <div>
                  <p className="font-medium">{alert.title}</p>
                  <p className="text-sm text-red-600">{alert.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Expiry Timeline */}
          <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <FiCalendar className="mr-2 text-amber-500" />
                Expiry Timeline (Next 30 Days)
              </h3>
              <button className="text-sm text-blue-600 hover:underline">
                View All
              </button>
            </div>
            <div className="space-y-3">
              {expiringSoon.map((item) => (
                <div key={item.id} className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-red-600 h-2.5 rounded-full"
                      style={{ width: `${(item.daysLeft / 30) * 100}%` }}
                    ></div>
                  </div>
                  <div className="ml-3 text-sm">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-gray-500 ml-2">
                      {item.daysLeft} days
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category Distribution */}
          <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Medicine Categories
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {categories.map((cat) => (
                <div key={cat.name} className="text-center">
                  <div className="mx-auto w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
                    <span className="text-xl font-bold text-blue-600">
                      {cat.count}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{cat.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Storage Conditions */}
          <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center mb-4">
              <FiThermometer className="mr-2 text-blue-500" />
              Storage Conditions
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div
                className={`p-3 rounded-lg ${
                  tempStatus.normal
                    ? "bg-green-50 border-green-200"
                    : "bg-red-50 border-red-200"
                } border`}
              >
                <div className="flex justify-between items-center">
                  <span>Room Temp</span>
                  <span className="font-bold">24°C</span>
                </div>
                {!tempStatus.normal && (
                  <div className="text-xs text-red-500 mt-1">
                    Alert: Above threshold
                  </div>
                )}
              </div>
              <div
                className={`p-3 rounded-lg ${
                  tempStatus.fridge
                    ? "bg-green-50 border-green-200"
                    : "bg-red-50 border-red-200"
                } border`}
              >
                <div className="flex justify-between items-center">
                  <span>Refrigerated</span>
                  <span className="font-bold">5°C</span>
                </div>
                {!tempStatus.fridge && (
                  <div className="text-xs text-red-500 mt-1">
                    Alert: Above 8°C
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Low Stock Alerts */}
          <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Low Stock Alerts
              </h3>
              <button className="text-sm text-blue-600 hover:underline">
                Manage
              </button>
            </div>
            <div className="space-y-4">
              {lowStockItems.map((item) => (
                <div key={item.id} className="flex items-start">
                  <div className="flex items-center justify-center h-6 w-6 rounded-full bg-red-100 mt-1">
                    <FiAlertCircle className="text-red-500 text-sm" />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Only {item.stock} left (threshold: {item.threshold})
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Recent Activities
            </h3>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100">
                    <FiPackage className="text-blue-500 text-sm" />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">
                      {activity.action}
                    </p>
                    <p className="text-sm text-gray-500">{activity.product}</p>
                    <p className="text-xs text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardAdmin;



// this Sample
// this Sample
// this Sample
// this Sample
// this Sample
// this Sample
// this Sample
// this Sample




import React, { useRef, useState, useCallback } from "react";
import { FiPrinter, FiFileText, FiDownload } from "react-icons/fi";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useReactToPrint } from "react-to-print";

const Report = () => {
  const reportRef = useRef(null);

  const [columnsToShow, setColumnsToShow] = useState({
    name: true,
    category: true,
    stock: true,
    supplier: true,
    expiry: true,
  });

  const reports = [
    {
      id: 1,
      name: "Paracetamol 500mg",
      category: "Pain Relief",
      stock: 142,
      supplier: "PharmaCorp",
      expiry: "2024-06-30",
    },
    {
      id: 2,
      name: "Ibuprofen 200mg",
      category: "Pain Relief",
      stock: 4,
      supplier: "HealthPlus",
      expiry: "2024-03-31",
    },
    {
      id: 3,
      name: "Omeprazole 20mg",
      category: "Antacid",
      stock: 32,
      supplier: "PharmaCorp",
      expiry: "2024-11-30",
    },
  ];

  const handleCheckboxChange = (key) => {
    setColumnsToShow((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "#",
      columnsToShow.name && "Name",
      columnsToShow.category && "Category",
      columnsToShow.stock && "Stock",
      columnsToShow.supplier && "Supplier",
      columnsToShow.expiry && "Expiry Date",
    ].filter(Boolean);

    const tableRows = reports.map((item, index) =>
      [
        index + 1,
        columnsToShow.name && item.name,
        columnsToShow.category && item.category,
        columnsToShow.stock && item.stock,
        columnsToShow.supplier && item.supplier,
        columnsToShow.expiry && item.expiry,
      ].filter(Boolean)
    );

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
    });

    doc.save("report.pdf");
  };

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    removeAfterPrint: true,
  });

  //   const handlePrint = useReactToPrint({
  //     content: () => reportRef.current,
  //     documentTitle: "Inventory Report",
  //     onBeforeGetContent: () => console.log("Preparing to print..."),
  //     onAfterPrint: () => console.log("Print finished."),
  //     removeAfterPrint: true,
  //   });

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FiFileText /> Inventory Report
        </h2>
        <div className="flex gap-4">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow-md"
          >
            <FiPrinter /> Print Report
          </button>
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl shadow-md"
          >
            <FiDownload /> Download PDF
          </button>
        </div>
      </div>

      <div className="mb-4 bg-gray-100 p-4 rounded-lg shadow">
        <p className="font-semibold mb-2">Select Columns to Include:</p>
        <div className="flex flex-wrap gap-4">
          {Object.keys(columnsToShow).map((key) => (
            <label key={key} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={columnsToShow[key]}
                onChange={() => handleCheckboxChange(key)}
              />
              <span className="capitalize">{key}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Printable Area */}
      <div
        ref={reportRef}
        className="bg-white p-4 rounded-xl shadow overflow-x-auto"
      >
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="text-xs uppercase text-gray-500 border-b">
              <th className="py-2 px-4">#</th>
              {columnsToShow.name && <th className="py-2 px-4">Name</th>}
              {columnsToShow.category && (
                <th className="py-2 px-4">Category</th>
              )}
              {columnsToShow.stock && <th className="py-2 px-4">Stock</th>}
              {columnsToShow.supplier && (
                <th className="py-2 px-4">Supplier</th>
              )}
              {columnsToShow.expiry && (
                <th className="py-2 px-4">Expiry Date</th>
              )}
            </tr>
          </thead>
          <tbody>
            {reports.map((item, index) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{index + 1}</td>
                {columnsToShow.name && (
                  <td className="py-2 px-4">{item.name}</td>
                )}
                {columnsToShow.category && (
                  <td className="py-2 px-4">{item.category}</td>
                )}
                {columnsToShow.stock && (
                  <td className="py-2 px-4">{item.stock}</td>
                )}
                {columnsToShow.supplier && (
                  <td className="py-2 px-4">{item.supplier}</td>
                )}
                {columnsToShow.expiry && (
                  <td className="py-2 px-4">{item.expiry}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Report;
