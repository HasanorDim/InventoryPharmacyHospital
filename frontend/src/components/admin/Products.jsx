import React, { useState, useEffect, useCallback } from "react";
import {
  FiPlus,
  FiSearch,
  FiX,
  FiAlertTriangle,
  FiCalendar,
} from "react-icons/fi";

import { CiSettings } from "react-icons/ci";

import PharmacyShelf from "./PharmacyShelf";
import AddProductField from "./InputField/AddProductField";
import LoadingData from "../Loader/LoadingData";
import ProductTable from "./ProductTable";
import StorageZone from "./StorageZone";
import { useProductStore } from "../../store/useProductStore";
import ProductSettings from "./ProductSettings";

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

  const setProduct = useProductStore((state) => state.setProduct);

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
    dosageForm: "",
    strength: "",
    unit: "",
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
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;

  //   if (name.startsWith("location.")) {
  //     const locationField = name.split(".")[1];
  //     setFormData({
  //       ...formData,
  //       location: {
  //         ...formData.location,
  //         [locationField]: value,
  //       },
  //     });
  //   } else {
  //     setFormData({
  //       ...formData,
  //       [name]: value,
  //     });
  //   }
  // };

  // Memoize the handleInputChange function
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  // Open modal for adding new product
  const openAddModal = () => {
    setCurrentProduct(null);
    setFormData({
      name: "",
      category: "",
      stock: "",
      dosageForm: "",
      strength: "",
      unit: "",
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
      setProduct(formData);
    }

    setIsModalOpen(false);
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

  const handleClose = useCallback(() => {
    setSampleModal(false);
  }, []);

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
        <LoadingData />
      ) : (
        <>
          <ProductTable
            filteredProducts={filteredProducts}
            openEditModal={openEditModal}
            handleDelete={handleDelete}
          />
          <StorageZone
            filteredProducts={filteredProducts}
            resetFilters={resetFilters}
            setSampleModal={setSampleModal}
          />
        </>
      )}
      {/* Add/Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-opacity-50  p-4 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="flex justify-between items-center border-b-2 border-b-gray-300 px-6 py-4">
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
              <AddProductField
                formData={formData}
                handleInputChange={handleInputChange}
                categories={categories}
                setIsModalOpen={setIsModalOpen}
                currentProduct={currentProduct}
              />
              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  </div>
                </div>

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
                  </div>

                  <div className="grid grid-cols-2 gap-4">
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
              </div> */}
            </form>
          </div>
        </div>
      )}

      <PharmacyShelf ismodal={sampleModal} onClose={handleClose} />

      <ProductSettings />
    </div>
  );
};

export default Products;
