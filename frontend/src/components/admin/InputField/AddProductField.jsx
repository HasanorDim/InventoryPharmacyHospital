import React, { useState, useEffect } from "react";
import { FiInfo } from "react-icons/fi";

const AddProductField = ({
  formData,
  handleInputChange,
  categories,
  setIsModalOpen,
  currentProduct,
}) => {
  // Create local state for immediate feedback
  const [localFormData, setLocalFormData] = useState(formData);

  // Sync with parent when formData changes
  useEffect(() => {
    setLocalFormData(formData);
  }, [formData]);

  // Handle local changes immediately
  const handleLocalChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Debounce the parent update if needed
    handleInputChange(e);
  };

  return (
    <div>
      <h4 className="block text-sm font-medium text-gray-700 mb-5">
        Product Information
      </h4>
      <div className="grid px-24 space-y-2">
        {/* Product Information */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Generic Name*
            </label>
            <input
              type="text"
              name="name"
              value={localFormData.name || ""}
              onChange={handleLocalChange}
              className="italic block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
              placeholder="ex.Alaxan"
            />
          </div>
        </div>

        {/* Location Information */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category*
            </label>
            <select
              name="category"
              value={localFormData.category || ""}
              onChange={handleLocalChange}
              className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm
                    ${
                      localFormData.category ? "text-gray-900" : "text-gray-400"
                    }
                `}
              required
            >
              <option value="">-- Category --</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dosage Form*
            </label>
            <select
              name="dosageForm"
              value={localFormData.dosageForm || ""}
              onChange={handleLocalChange}
              className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm
                    ${
                      localFormData.dosageForm
                        ? "text-gray-900"
                        : "text-gray-400"
                    }
                `}
              required
            >
              <option value="" className="text-gray-400" disabled>
                -- Form --
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock Unit*
                <span className="relative ml-2 group inline-block">
                  <FiInfo className="text-gray-500 hover:text-blue-600 cursor-pointer" />
                  {/* Tooltip */}
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-56 p-2 text-xs text-white bg-gray-800 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    {/* Arrow */}
                    <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-t-transparent border-b-transparent border-r-gray-800"></div>
                    How the item is counted in stock (e.g. per box, bottle,
                    tablet)
                  </div>
                </span>
              </label>
              <select
                name="stockUnit"
                value={localFormData.stockUnit || ""}
                onChange={handleLocalChange}
                className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm
                    ${
                      localFormData.stockUnit
                        ? "text-gray-900"
                        : "text-gray-400"
                    }
                `}
                required
              >
                <option value="" className="text-gray-400" disabled>
                  -- unit --
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Strength*
              </label>
              <input
                type="text"
                name="strength"
                value={localFormData.strength || ""}
                onChange={handleLocalChange}
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
      </div>
    </div>
  );
};

export default React.memo(AddProductField);
