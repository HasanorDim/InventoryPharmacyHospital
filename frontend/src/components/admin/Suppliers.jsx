import React, { useState, useEffect } from "react";
import {
  FiUsers,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiSearch,
  FiX,
  FiPhone,
  FiMail,
  FiMapPin,
} from "react-icons/fi";

const Suppliers = () => {
  // Sample supplier data
  const initialSuppliers = [
    {
      id: 1,
      name: "MediCorp Pharmaceuticals",
      contact: "John Smith",
      email: "john@medicorp.com",
      phone: "(555) 123-4567",
      address: "123 Medical Way, Boston, MA",
      productsSupplied: ["Paracetamol", "Omeprazole"],
      contractDate: "2023-01-15",
      contractExpiry: "2024-12-31",
    },
    {
      id: 2,
      name: "PharmaPlus Distributors",
      contact: "Sarah Johnson",
      email: "sarah@pharmaplus.com",
      phone: "(555) 987-6543",
      address: "456 Health Ave, New York, NY",
      productsSupplied: ["Amoxicillin", "Lisinopril"],
      contractDate: "2023-03-10",
      contractExpiry: "2025-06-30",
    },
    {
      id: 3,
      name: "Global Meds Supply",
      contact: "Michael Chen",
      email: "michael@globalmeds.com",
      phone: "(555) 456-7890",
      address: "789 Wellness Blvd, Chicago, IL",
      productsSupplied: ["Ibuprofen", "Aspirin"],
      contractDate: "2022-11-05",
      contractExpiry: "2024-09-15",
    },
  ];

  // State management
  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSupplier, setCurrentSupplier] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    phone: "",
    address: "",
    productsSupplied: "",
    contractDate: "",
    contractExpiry: "",
  });

  // Fetch suppliers (simulated API call)
  useEffect(() => {
    const fetchSuppliers = () => {
      setLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        setSuppliers(initialSuppliers);
        setFilteredSuppliers(initialSuppliers);
        setLoading(false);
      }, 500);
    };

    fetchSuppliers();
  }, []);

  // Filter suppliers whenever search term changes
  useEffect(() => {
    if (searchTerm) {
      const filtered = suppliers.filter(
        (supplier) =>
          supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          supplier.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
          supplier.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSuppliers(filtered);
    } else {
      setFilteredSuppliers(suppliers);
    }
  }, [searchTerm, suppliers]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Open modal for adding new supplier
  const openAddModal = () => {
    setCurrentSupplier(null);
    setFormData({
      name: "",
      contact: "",
      email: "",
      phone: "",
      address: "",
      productsSupplied: "",
      contractDate: "",
      contractExpiry: "",
    });
    setIsModalOpen(true);
  };

  // Open modal for editing supplier
  const openEditModal = (supplier) => {
    setCurrentSupplier(supplier);
    setFormData({
      name: supplier.name,
      contact: supplier.contact,
      email: supplier.email,
      phone: supplier.phone,
      address: supplier.address,
      productsSupplied: supplier.productsSupplied.join(", "),
      contractDate: supplier.contractDate,
      contractExpiry: supplier.contractExpiry,
    });
    setIsModalOpen(true);
  };

  // Handle form submission (add/edit)
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      if (currentSupplier) {
        // Update existing supplier
        const updatedSuppliers = suppliers.map((supplier) =>
          supplier.id === currentSupplier.id
            ? {
                ...formData,
                id: currentSupplier.id,
                productsSupplied: formData.productsSupplied
                  .split(",")
                  .map((item) => item.trim()),
              }
            : supplier
        );
        setSuppliers(updatedSuppliers);
      } else {
        // Add new supplier
        const newSupplier = {
          ...formData,
          id: Math.max(...suppliers.map((s) => s.id)) + 1,
          productsSupplied: formData.productsSupplied
            .split(",")
            .map((item) => item.trim()),
        };
        setSuppliers([...suppliers, newSupplier]);
      }

      setIsModalOpen(false);
      setLoading(false);
    }, 500);
  };

  // Delete supplier
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this supplier?")) {
      setLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        setSuppliers(suppliers.filter((supplier) => supplier.id !== id));
        setLoading(false);
      }, 500);
    }
  };

  // Reset search
  const resetSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="p-6 bg-gray-50">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Suppliers Management
            </h2>
            <p className="text-gray-600">
              Manage your pharmacy's suppliers and contracts
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="mt-4 md:mt-0 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <FiPlus className="mr-2" />
            Add New Supplier
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search suppliers by name, contact or email..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {searchTerm && (
            <button
              onClick={resetSearch}
              className="ml-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 flex items-center"
            >
              <FiX className="mr-1" /> Clear
            </button>
          )}
        </div>
      </div>

      {/* Suppliers List */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSuppliers.length > 0 ? (
              filteredSuppliers.map((supplier) => (
                <div
                  key={supplier.id}
                  className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {supplier.name}
                    </h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openEditModal(supplier)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => handleDelete(supplier.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center">
                      <FiUsers className="text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">
                        {supplier.contact}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <FiMail className="text-gray-400 mr-2" />
                      <a
                        href={`mailto:${supplier.email}`}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        {supplier.email}
                      </a>
                    </div>
                    <div className="flex items-center">
                      <FiPhone className="text-gray-400 mr-2" />
                      <a
                        href={`tel:${supplier.phone.replace(/\D/g, "")}`}
                        className="text-sm text-gray-600"
                      >
                        {supplier.phone}
                      </a>
                    </div>
                    <div className="flex items-start">
                      <FiMapPin className="text-gray-400 mr-2 mt-1" />
                      <span className="text-sm text-gray-600">
                        {supplier.address}
                      </span>
                    </div>

                    <div className="pt-3 border-t border-gray-100">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Products Supplied:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {supplier.productsSupplied.map((product, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-50 text-blue-800 text-xs rounded"
                          >
                            {product}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-100">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700">
                            Contract Start
                          </h4>
                          <p className="text-sm text-gray-600">
                            {supplier.contractDate}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-700">
                            Contract Expiry
                          </h4>
                          <p
                            className={`text-sm ${
                              new Date(supplier.contractExpiry) < new Date()
                                ? "text-red-600"
                                : "text-gray-600"
                            }`}
                          >
                            {supplier.contractExpiry}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
                <p className="text-gray-500">
                  No suppliers found matching your criteria
                </p>
                {searchTerm && (
                  <button
                    onClick={resetSearch}
                    className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Clear search and try again
                  </button>
                )}
              </div>
            )}
          </div>
        </>
      )}

      {/* Add/Edit Supplier Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-opacity-50  p-4 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="flex justify-between items-center border-b px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {currentSupplier ? "Edit Supplier" : "Add New Supplier"}
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Supplier Name*
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
                    Contact Person*
                  </label>
                  <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email*
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone*
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address*
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Products Supplied*
                  </label>
                  <textarea
                    name="productsSupplied"
                    value={formData.productsSupplied}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Comma separated list of products"
                    rows="3"
                    required
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Separate multiple products with commas (e.g., Paracetamol,
                    Amoxicillin)
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contract Start Date*
                  </label>
                  <input
                    type="date"
                    name="contractDate"
                    value={formData.contractDate}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contract Expiry Date*
                  </label>
                  <input
                    type="date"
                    name="contractExpiry"
                    value={formData.contractExpiry}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
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
                  {currentSupplier ? "Update Supplier" : "Add Supplier"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Suppliers;
