import React, { useState, useEffect } from "react";
import {
  FiPackage,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiSearch,
  FiX,
  FiMapPin,
  FiRefreshCw,
  FiDroplet,
  FiLock,
  FiBox,
  FiSun,
  FiAlertTriangle,
  FiCalendar,
} from "react-icons/fi";
import PharmacyShelf from "./PharmacyShelf";

const Products = () => {
  // Initial product data with location details
  const initialProducts = [
    {
      id: 1,
      name: "Paracetamol 500mg",
      category: "Pain Relief",
      stock: 142,
      price: 5.99,
      expiry: "2024-12-15",
      supplier: "MediCorp",
      location: {
        zone: "A",
        shelf: "3",
        bin: "42",
        storageType: "Room Temperature",
        building: "Main Pharmacy",
        floor: "1",
      },
    },
    {
      id: 2,
      name: "Amoxicillin 250mg",
      category: "Antibiotic",
      stock: 56,
      price: 12.5,
      expiry: "2025-03-20",
      supplier: "PharmaPlus",
      location: {
        zone: "B",
        shelf: "1",
        bin: "15",
        storageType: "Room Temperature",
        building: "Main Pharmacy",
        floor: "1",
      },
    },
    {
      id: 3,
      name: "Ibuprofen 200mg",
      category: "Pain Relief",
      stock: 4,
      price: 7.25,
      expiry: "2024-11-30",
      supplier: "Global Meds",
      location: {
        zone: "C",
        shelf: "2",
        bin: "7",
        storageType: "Room Temperature",
        building: "Main Pharmacy",
        floor: "1",
      },
    },
    {
      id: 4,
      name: "Insulin Vial",
      category: "Diabetes",
      stock: 32,
      price: 15.75,
      expiry: "2025-05-10",
      supplier: "MediCorp",
      location: {
        zone: "Refrigerated",
        shelf: "R1",
        bin: "3",
        storageType: "Refrigerated",
        building: "Main Pharmacy",
        floor: "1",
      },
    },
    {
      id: 5,
      name: "Morphine 10mg",
      category: "Controlled",
      stock: 8,
      price: 9.99,
      expiry: "2024-10-05",
      supplier: "PharmaPlus",
      location: {
        zone: "Narcotics",
        shelf: "N2",
        bin: "1",
        storageType: "Controlled",
        building: "Main Pharmacy",
        floor: "1",
      },
    },
  ];

  // State management
  const [products, setProducts] = useState([]);
  const [sampleModal, setSampleModal] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [supplierFilter, setSupplierFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    stock: "",
    price: "",
    expiry: "",
    supplier: "",
    location: {
      zone: "",
      shelf: "",
      bin: "",
      storageType: "",
      building: "",
      floor: "",
    },
  });

  // Get unique values for filters
  const categories = [...new Set(products.map((product) => product.category))];
  const suppliers = [...new Set(products.map((product) => product.supplier))];
  const storageTypes = [
    ...new Set(products.map((product) => product.location.storageType)),
  ];
  const buildings = [
    ...new Set(products.map((product) => product.location.building)),
  ];

  // Fetch products (simulated API call)
  useEffect(() => {
    const fetchProducts = () => {
      setLoading(true);
      setTimeout(() => {
        setProducts(initialProducts);
        setFilteredProducts(initialProducts);
        setLoading(false);
      }, 500);
    };
    fetchProducts();
  }, []);

  // Filter products
  useEffect(() => {
    let result = products;

    if (searchTerm) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.location.zone.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter) {
      result = result.filter((product) => product.category === categoryFilter);
    }

    if (supplierFilter) {
      result = result.filter((product) => product.supplier === supplierFilter);
    }

    if (locationFilter) {
      if (
        ["Room Temperature", "Refrigerated", "Controlled"].includes(
          locationFilter
        )
      ) {
        result = result.filter(
          (product) => product.location.storageType === locationFilter
        );
      } else {
        result = result.filter(
          (product) => product.location.zone === locationFilter
        );
      }
    }

    setFilteredProducts(result);
  }, [searchTerm, categoryFilter, supplierFilter, locationFilter, products]);

  // Handle input changes including nested location fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("location.")) {
      const locationField = name.split(".")[1];
      setFormData({
        ...formData,
        location: {
          ...formData.location,
          [locationField]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Open modal for adding new product
  const openAddModal = () => {
    setCurrentProduct(null);
    setFormData({
      name: "",
      category: "",
      stock: "",
      price: "",
      expiry: "",
      supplier: "",
      location: {
        zone: "",
        shelf: "",
        bin: "",
        storageType: "",
        building: "Main Pharmacy",
        floor: "1",
      },
    });
    setIsModalOpen(true);
  };

  // Open modal for editing product
  const openEditModal = (product) => {
    setCurrentProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      stock: product.stock,
      price: product.price,
      expiry: product.expiry,
      supplier: product.supplier,
      location: product.location,
    });
    setIsModalOpen(true);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (currentProduct) {
        // Update existing product
        const updatedProducts = products.map((product) =>
          product.id === currentProduct.id
            ? {
                ...formData,
                id: currentProduct.id,
              }
            : product
        );
        setProducts(updatedProducts);
      } else {
        // Add new product
        const newProduct = {
          ...formData,
          id: Math.max(...products.map((p) => p.id)) + 1,
        };
        setProducts([...products, newProduct]);
      }

      setIsModalOpen(false);
      setLoading(false);
    }, 500);
  };

  // Delete product
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setLoading(true);
      setTimeout(() => {
        setProducts(products.filter((product) => product.id !== id));
        setLoading(false);
      }, 500);
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("");
    setCategoryFilter("");
    setSupplierFilter("");
    setLocationFilter("");
  };

  // Storage type badge component
  const StorageBadge = ({ type }) => {
    switch (type) {
      case "Refrigerated":
        return (
          <span className="px-2 py-1 bg-cyan-100 text-cyan-800 text-xs rounded-full flex items-center">
            <FiDroplet className="mr-1" /> ❄️ Cold Chain
          </span>
        );
      case "Controlled":
        return (
          <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full flex items-center">
            <FiLock className="mr-1" /> 🔒 Controlled
          </span>
        );
      case "Room Temperature":
        return (
          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full flex items-center">
            <FiSun className="mr-1" /> 🌡️ Room Temp
          </span>
        );
      default:
        return null;
    }
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
          <button
            onClick={openAddModal}
            className="mt-4 md:mt-0 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <FiPlus className="mr-2" />
            Add New Product
          </button>
        </div>
      </div>
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "all"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          All Items
        </button>
        <button
          onClick={() => setActiveTab("low")}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "low"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <div className="flex items-center">
            <FiAlertTriangle className="mr-1" />
            Low Stock
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
      {/* Search and Filter */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
          <div className="relative flex-grow mb-4 md:mb-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products or zones..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="block w-full md:w-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            className="block w-full md:w-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={supplierFilter}
            onChange={(e) => setSupplierFilter(e.target.value)}
          >
            <option value="">All Suppliers</option>
            {suppliers.map((supplier) => (
              <option key={supplier} value={supplier}>
                {supplier}
              </option>
            ))}
          </select>
          <select
            className="block w-full md:w-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            <option value="">All Locations</option>
            <option value="Room Temperature">Room Temp</option>
            <option value="Refrigerated">Refrigerated</option>
            <option value="Controlled">Controlled</option>
            <option value="A">Zone A</option>
            <option value="B">Zone B</option>
            <option value="C">Zone C</option>
          </select>
          <button
            onClick={resetFilters}
            className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 flex items-center"
          >
            <FiX className="mr-1" /> Reset
          </button>
        </div>
      </div>
      {/* Products Table */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Storage
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-blue-100">
                              <FiPackage className="h-5 w-5 text-blue-500" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {product.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                ID: {product.id}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StorageBadge type={product.location.storageType} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <FiMapPin className="mr-1 text-gray-400" />
                            <span>
                              {product.location.zone}-{product.location.shelf}-
                              {product.location.bin}
                            </span>
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            {product.location.building}, Floor{" "}
                            {product.location.floor}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => openEditModal(product)}
                            className="text-blue-600 hover:text-blue-900 mr-3"
                          >
                            <FiEdit2 className="inline mr-1" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <FiTrash2 className="inline mr-1" /> Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-4 text-center text-sm text-gray-500"
                      >
                        No products found matching your criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">{filteredProducts.length}</span> of{" "}
              <span className="font-medium">{filteredProducts.length}</span>{" "}
              products
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                1
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>

          {/* Enhanced Storage Zone Overview */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <FiMapPin className="mr-2 text-blue-500" />
                Storage Zone Overview
              </h3>
              <button
                onClick={resetFilters}
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center "
              >
                <FiRefreshCw className="mr-1" /> Reset View
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
              {["A", "B", "C", "Refrigerated", "Narcotics"].map((zone) => {
                const zoneProducts = filteredProducts.filter(
                  (p) => p.location.zone === zone
                );
                if (zoneProducts.length === 0) return null;

                // Determine zone-specific styling
                const zoneStyles = {
                  A: "border-blue-200 bg-blue-50",
                  B: "border-green-200 bg-green-50",
                  C: "border-purple-200 bg-purple-50",
                  Refrigerated: "border-cyan-200 bg-cyan-50",
                  Narcotics: "border-red-200 bg-red-50",
                };

                return (
                  <div
                    key={zone}
                    className={`border rounded-xl p-4 ${
                      zoneStyles[zone] || "border-gray-200 bg-gray-50"
                    }`}
                    onClick={() => {
                      setSampleModal(true);
                    }}
                  >
                    <div className="flex items-center mb-3">
                      {zone === "Refrigerated" ? (
                        <FiDroplet className="text-cyan-500 mr-2" />
                      ) : zone === "Narcotics" ? (
                        <FiLock className="text-red-500 mr-2" />
                      ) : (
                        <FiBox className="text-blue-500 mr-2" />
                      )}
                      <h4 className="font-medium text-gray-800">
                        {zone === "Refrigerated"
                          ? "❄️ Refrigerated"
                          : zone === "Narcotics"
                          ? "🔒 Controlled"
                          : `🗄️ Zone ${zone}`}
                      </h4>
                      <span className="ml-auto bg-white px-2 py-1 rounded-full text-xs font-medium">
                        {zoneProducts.length} items
                      </span>
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {[1, 2, 3, 4, 5].map((shelf) => {
                        const shelfProducts = zoneProducts.filter(
                          (p) => p.location.shelf === shelf.toString()
                        );
                        if (shelfProducts.length === 0)
                          return (
                            <div
                              key={shelf}
                              className="border border-dashed border-gray-300 rounded-lg p-2 text-center opacity-50"
                            >
                              <div className="text-xs text-gray-400">
                                Shelf {shelf}
                              </div>
                              <div className="text-xs text-gray-400">Empty</div>
                            </div>
                          );

                        return (
                          <div
                            key={shelf}
                            className={`border rounded-lg p-2 cursor-pointer transition-all hover:scale-105 ${
                              shelfProducts.length > 10
                                ? "bg-green-100 border-green-300"
                                : shelfProducts.length > 5
                                ? "bg-yellow-100 border-yellow-300"
                                : "bg-red-100 border-red-300"
                            }`}
                            onClick={() => {
                              setLocationFilter(zone);
                              setSearchTerm(shelf.toString());
                            }}
                          >
                            <div className="font-medium text-sm">
                              Shelf {shelf}
                            </div>
                            <div
                              className={`text-xs ${
                                shelfProducts.length > 10
                                  ? "text-green-800"
                                  : shelfProducts.length > 5
                                  ? "text-yellow-800"
                                  : "text-red-800"
                              }`}
                            >
                              {shelfProducts.length} item
                              {shelfProducts.length !== 1 ? "s" : ""}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-100 border border-blue-300 rounded-full mr-1"></div>
                <span>Normal Storage</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-cyan-100 border border-cyan-300 rounded-full mr-1"></div>
                <span>Refrigerated</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-100 border border-red-300 rounded-full mr-1"></div>
                <span>Controlled</span>
              </div>
              {"||"}
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-100 border border-green-300 rounded-full mr-1"></div>
                <span>High Stock</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-100 border border-yellow-300 rounded-full mr-1"></div>
                <span>Medium Stock</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-100 border border-red-300 rounded-full mr-1"></div>
                <span>Low Stock</span>
              </div>
            </div>
          </div>
        </>
      )}
      {/* Add/Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-opacity-50  p-4 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="flex justify-between items-center border-b px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {currentProduct ? "Edit Product" : "Add New Product"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Information */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-800">
                    Product Information
                  </h4>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Generic Name*
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Brand Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Dosage Form*
                    </label>
                    <select
                      name="dosageform"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required
                    >
                      <option value="">Select Form</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Unit*
                      </label>
                      <input
                        type="text"
                        name="strength"
                        value={formData.strength}
                        onChange={handleInputChange}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Strength*
                      </label>
                      <input
                        type="text"
                        name="strength"
                        value={formData.strength}
                        onChange={handleInputChange}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Stock*
                      </label>
                      <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleInputChange}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                        min="0"
                      />
                    </div>
                  </div>
                </div>

                {/* Location Information */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date*
                    </label>
                    <input
                      type="date"
                      name="expiry"
                      value={formData.expiry}
                      onChange={handleInputChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category*
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required
                    >
                      <option value="">Select category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>{" "}
                  <h4 className="font-medium text-gray-800">
                    Storage Location
                  </h4>
                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Storage Type*
                    </label>
                    <select
                      name="location.storageType"
                      value={formData.location.storageType}
                      onChange={handleInputChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required
                    >
                      <option value="">Select storage type</option>
                      <option value="Room Temperature">Room Temperature</option>
                      <option value="Refrigerated">Refrigerated</option>
                      <option value="Controlled">Controlled Substance</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Building*
                    </label>
                    <select
                      name="location.building"
                      value={formData.location.building}
                      onChange={handleInputChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required
                    >
                      <option value="">Select building</option>
                      {buildings.map((building) => (
                        <option key={building} value={building}>
                          {building}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Floor*
                    </label>
                    <input
                      type="text"
                      name="location.floor"
                      value={formData.location.floor}
                      onChange={handleInputChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Zone*
                    </label>
                    <input
                      type="text"
                      name="location.zone"
                      value={formData.location.zone}
                      onChange={handleInputChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Shelf*
                      </label>
                      <input
                        type="text"
                        name="location.shelf"
                        value={formData.location.shelf}
                        onChange={handleInputChange}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bin*
                      </label>
                      <input
                        type="text"
                        name="location.bin"
                        value={formData.location.bin}
                        onChange={handleInputChange}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                      />
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {currentProduct ? "Update Product" : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* {sampleModal && (
        <div className="fixed inset-0 bg-opacity-50  p-4 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="flex justify-between items-center border-b px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {currentProduct ? "Edit Product" : "Set Product Location"}
              </h3>
              <button
                onClick={() => setSampleModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setSampleModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {currentProduct ? "Update Product" : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )} */}

      <PharmacyShelf
        ismodal={sampleModal}
        onClose={() => setSampleModal(false)}
      />
    </div>
  );
};

export default Products;
