import React from "react";
import { FiEdit, FiLayers, FiPlus, FiTrash2 } from "react-icons/fi";

const ProductCategories = ({
  setShowCategoryModal,
  categories,
  openEditCategoryModal,
  setIsDeleteModalOpen,
  setCurrentDeletingId,
  setCurrentCategory,
}) => {
  const handleDelete = (category) => {
    const setToCategory = { ...category, type: "category" };
    setIsDeleteModalOpen(true);
    setCurrentDeletingId(setToCategory);
    setCurrentCategory(category);
  };
  return (
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
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {(categories || [])?.map((category) => (
              <tr key={category.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {category.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {category.description || "---"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => openEditCategoryModal(category)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => {
                      handleDelete(category);
                    }}
                    className="text-red-600 hover:text-red-900"
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductCategories;
