import { Loader2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { FiInfo } from "react-icons/fi";

const AddProductField = ({
  formData,
  categories,
  setIsModalOpen,
  currentProduct,
  unit,
  dosageForms,
  storage,
  setFormData,
  isProduct,
}) => {
  // useEffect(() => {
  //   handleInputChange({
  //     target: {
  //       name: "location",
  //       value: {
  //         ...formData.location,
  //         isOnShelf: onShelf,
  //       },
  //     },
  //   });
  // }, [onShelf]);

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
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="italic block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
              placeholder="ex.Alaxan"
            />
          </div>
        </div>

        {/* Location Information */}
        <div className="space-y-4">
          {/* On Shelf Toggle */}
          <div className="flex items-center">
            <label className="block text-sm font-medium text-gray-700 mr-3">
              Display on Shelf?
            </label>
            <div className="relative inline-block w-10 mr-2 align-middle select-none">
              <input
                type="checkbox"
                name="onShelf"
                id="onShelf"
                className="toggle toggle-success"
                defaultValue={false}
                checked={formData.onShelf}
                onChange={(e) =>
                  setFormData({ ...formData, onShelf: e.target.checked })
                }
              />
              {/* <div
              className={`block w-10 h-6 rounded-full transition-colors duration-200 ${
                formData.setFormData ? "bg-blue-600" : "bg-gray-300"
              }`}
            ></div> */}
              {/* <div
              className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${
                formData.setFormData ? "transform translate-x-4" : ""
              }`}
            ></div> */}
            </div>
            <span className="text-sm text-gray-600">
              {formData.onShelf ? "Yes (Front Shelf)" : "No (In Storage)"}
            </span>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category*
            </label>
            <select
              name="category"
              value={formData.category || ""}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                formData.category ? "text-gray-900" : "text-gray-400"
              }`}
              required
            >
              <option value="">-- Category --</option>
              {categories?.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Dosage Form */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dosage Form*
            </label>
            <select
              name="dosageForm"
              value={formData.dosageForm || ""}
              onChange={(e) =>
                setFormData({ ...formData, dosageForm: e.target.value })
              }
              className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                formData.dosageForm ? "text-gray-900" : "text-gray-400"
              }`}
              required
            >
              <option value="" className="text-gray-400" disabled>
                -- Form --
              </option>
              {(dosageForms || [])?.map((dosage) => (
                <option key={dosage.id} value={dosage.form_name}>
                  {dosage.form_name}
                </option>
              ))}
            </select>
          </div>

          {/* Storage Room */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Storage Room*
            </label>
            <select
              name="storageType"
              value={formData.storageType || ""}
              onChange={(e) =>
                setFormData({ ...formData, storageType: e.target.value })
              }
              className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                formData.storageType ? "text-gray-900" : "text-gray-400"
              }`}
              required
            >
              <option value="" className="text-gray-400" disabled>
                -- Storage --
              </option>
              {(storage || [])?.map((x) => (
                <option key={x.id} value={x.name}>
                  {x.name}
                </option>
              ))}
            </select>
          </div>

          {/* Stock Unit and Strength */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock Unit*
                <span className="relative ml-2 group inline-block">
                  <FiInfo className="text-gray-500 hover:text-blue-600 cursor-pointer" />
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-56 p-2 text-xs text-white bg-gray-800 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-t-transparent border-b-transparent border-r-gray-800"></div>
                    How the item is counted in stock (e.g. per box, bottle,
                    tablet)
                  </div>
                </span>
              </label>
              <select
                name="stockUnit"
                value={formData.stockUnit}
                onChange={(e) =>
                  setFormData({ ...formData, stockUnit: e.target.value })
                }
                className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                  formData.stockUnit ? "text-gray-900" : "text-gray-400"
                }`}
                required
              >
                <option value="" className="text-gray-400" disabled>
                  -- unit --
                </option>
                {unit?.map((x) => (
                  <option key={x.id} value={x.name}>
                    {x.name}
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
                value={formData.strength || ""}
                onChange={(e) =>
                  setFormData({ ...formData, strength: e.target.value })
                }
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
          className={`flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2
                ${isProduct ? "bg-gray-300" : "bg-blue-600 hover:bg-blue-800"}`}
        >
          {isProduct ? (
            <>
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
              Loading...
            </>
          ) : (
            <>{currentProduct ? "Update Product" : "Add Product"}</>
          )}
        </button>
      </div>
    </div>
  );
};

export default React.memo(AddProductField);
