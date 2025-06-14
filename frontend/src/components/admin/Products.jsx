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
import ModalDelete from "./Modal/ModalDelete";

const Products = () => {
  const { unit, storage, dosageForms, categories, productsState } =
    useProductStore();
  const setProduct = useProductStore((state) => state.setProduct);
  const getData = useProductStore((state) => state.getData);
  const setEditProduct = useProductStore((state) => state.setEditProduct);
  const isProduct = useProductStore((state) => state.isProduct);
  const setDeleteProduct = useProductStore((state) => state.setDeleteProduct);
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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [sampleModal, setSampleModal] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentData, setCurrentData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    dosageForm: "",
    strength: "",
    stockUnit: "",
    storageType: "",
    onShelf: false,
  });

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (productsState.length > 0) {
      setProducts(productsState);
      // setFilteredProducts(productsState);
    }
  }, [productsState]);

  useEffect(() => {
    // getData();
    const fetchProducts = () => {
      setLoading(true);
      setTimeout(() => {
        // setProducts(productsState);
        setFilteredProducts(initialProducts);
        setLoading(false);
      }, 500);
    };
    fetchProducts();
  }, []);

  // Memoize the handleInputChange function
  const handleInputChange = useCallback((e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }, []);

  // Open modal for adding new product
  const openAddModal = () => {
    setCurrentProduct(null);
    setFormData({
      name: "",
      category: "",
      dosageForm: "",
      strength: "",
      stockUnit: "",
      storageType: "",
      onShelf: false,
    });
    setIsModalOpen(true);
  };

  // Open modal for editing product
  const openEditModal = (product) => {
    setCurrentProduct(product);
    setFormData({
      name: product.medicine_name,
      category: product.category,
      dosageForm: product.dosage_form,
      strength: product.strength,
      stockUnit: product.stockUnit,
      storageType: product.storageType,
      onShelf: product.onShelf,
    });
    setIsModalOpen(true);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentProduct) {
      const updatedProducts = { ...formData, id: currentProduct.id };
      const result = await setEditProduct(updatedProducts);
      if (result.success) {
        setFormData({
          name: "",
          category: "",
          dosageForm: "",
          strength: "",
          stockUnit: "",
          storageType: "",
          onShelf: false,
        });
        setIsModalOpen(false);
      }
    } else {
      // Add new product
      const result = await setProduct(formData);
      if (result.success) {
        setFormData({
          name: "",
          category: "",
          dosageForm: "",
          strength: "",
          stockUnit: "",
          storageType: "",
          onShelf: false,
        });
        setIsModalOpen(false);
      }
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("");
    setCategoryFilter("");
    setSupplierFilter("");
    setLocationFilter("");
  };

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
  }, [searchTerm, categoryFilter, locationFilter]);

  const handleClose = useCallback(() => {
    setSampleModal(false);
  }, []);

  const handleCancelData = () => {
    setCurrentData(null);
    setIsDeleteModalOpen(false);
  };

  const handleDeleteForm = async (data) => {
    const result = await setDeleteProduct({ id: data.id });
    if (result.success) {
      setIsDeleteModalOpen(false);
    }
  };

  console.log("Form Data: ", formData.onShelf);
  return (
    <div className="p-6 bg-gray-50 overflow-x-hidden">
      <div className="mb-6">
        <div className="flex justify-end">
          <button
            onClick={openAddModal}
            className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <FiPlus className="mr-2" />
            Add New Product
          </button>
        </div>
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
              <option key={category.id} value={category.name}>
                {category.name}
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
            filteredProducts={products}
            openEditModal={openEditModal}
            productsState={productsState}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            setCurrentData={setCurrentData}
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
                isProduct={isProduct}
                formData={formData}
                handleInputChange={handleInputChange}
                categories={categories}
                unit={unit}
                storage={storage}
                dosageForms={dosageForms}
                setIsModalOpen={setIsModalOpen}
                currentProduct={currentProduct}
                setFormData={setFormData}
              />
            </form>
          </div>
        </div>
      )}

      <PharmacyShelf ismodal={sampleModal} onClose={handleClose} />
      {isDeleteModalOpen && (
        <ModalDelete
          currentData={currentData}
          onConfirm={handleDeleteForm}
          onCancel={handleCancelData}
          isLoading={isProduct}
        />
      )}
    </div>
  );
};

export default Products;
