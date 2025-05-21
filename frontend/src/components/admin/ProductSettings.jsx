import React, { useState } from "react";
import {
  FiPlus,
  FiLayers,
  FiDroplet,
  FiPackage,
  FiSave,
  FiTrash2,
  FiEdit,
  FiDownload,
  FiUpload,
} from "react-icons/fi";
import { CiSettings } from "react-icons/ci";

const ProductSettings = () => {
  // Sample data states
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Antibiotics",
      description: "Anti-infective medications",
      updatedAt: "2024-05-20",
    },
    {
      id: 2,
      name: "Analgesics",
      description: "Pain management",
      updatedAt: "2024-05-18",
    },
  ]);

  const [dosageForms, setDosageForms] = useState([
    { id: 1, form: "Tablet", needsStrength: true },
    { id: 2, form: "Capsule", needsStrength: true },
    { id: 3, form: "Syrup", needsStrength: false },
  ]);

  const [units, setUnits] = useState([
    "mg",
    "g",
    "mL",
    "L",
    "tablet",
    "capsule",
  ]);

  // Modal states
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    storageRequirements: "",
  });

  // Handle category creation
  const handleAddCategory = () => {
    setCategories([
      ...categories,
      {
        id: Date.now(),
        ...newCategory,
        updatedAt: new Date().toLocaleDateString(),
      },
    ]);
    setShowCategoryModal(false);
    setNewCategory({ name: "", description: "", storageRequirements: "" });
  };

  return (
    <div className="space-y-6">
      {/* Categories Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold flex items-center">
            <FiLayers className="mr-2 text-blue-600" />
            Product Categories
          </h3>
          <button
            onClick={() => setShowCategoryModal(true)}
            className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
          >
            <FiPlus className="mr-1" /> Add Category
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.map((category) => (
                <tr key={category.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {category.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {category.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {category.updatedAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      <FiEdit />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dosage Forms Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold flex items-center">
            <FiDroplet className="mr-2 text-blue-600" />
            Dosage Forms
          </h3>
          <div className="flex space-x-2">
            <button className="flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
              <FiDownload className="mr-1" /> Export
            </button>
            <button className="flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
              <FiUpload className="mr-1" /> Import
            </button>
          </div>
        </div>

        <div className="flex space-x-2 mb-4">
          {["Tablets", "Liquids", "Injectables", "Topicals"].map((type) => (
            <button
              key={type}
              className={`px-3 py-1 text-sm rounded-md ${
                type === "Tablets"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Form
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Requires Strength
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dosageForms.map((form) => (
                <tr key={form.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {form.form}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {form.needsStrength ? "Yes" : "No"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      <FiEdit />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Units & Measurements Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold flex items-center">
            <FiPackage className="mr-2 text-blue-600" />
            Measurement Units
          </h3>
        </div>

        <div className="flex mb-4">
          <select className="block w-32 px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
            <option>Weight</option>
            <option>Volume</option>
            <option>Units</option>
          </select>
          <input
            type="text"
            placeholder="e.g. mg, mL"
            className="flex-1 min-w-0 block px-3 py-2 border-t border-b border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <FiSave className="mr-1" /> Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {units.map((unit) => (
            <div
              key={unit}
              className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-800"
            >
              {unit}
              <button className="ml-2 text-gray-500 hover:text-red-500">
                <FiTrash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Add Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center border-b px-6 py-4">
              <h3 className="text-lg font-semibold">New Product Category</h3>
              <button
                onClick={() => setShowCategoryModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category Name*
                  </label>
                  <input
                    type="text"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={newCategory.name}
                    onChange={(e) =>
                      setNewCategory({ ...newCategory, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={newCategory.description}
                    onChange={(e) =>
                      setNewCategory({
                        ...newCategory,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Storage Requirements
                  </label>
                  <select
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={newCategory.storageRequirements}
                    onChange={(e) =>
                      setNewCategory({
                        ...newCategory,
                        storageRequirements: e.target.value,
                      })
                    }
                  >
                    <option value="">Select storage type</option>
                    <option value="Room Temperature">Room Temperature</option>
                    <option value="Refrigerated">Refrigerated</option>
                    <option value="Controlled">Controlled</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowCategoryModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  disabled={!newCategory.name}
                >
                  Save Category
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductSettings;
