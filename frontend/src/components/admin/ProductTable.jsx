import React from "react";
import {
  FiDroplet,
  FiEdit2,
  FiLock,
  FiMapPin,
  FiPackage,
  FiSun,
  FiTrash2,
} from "react-icons/fi";

const ProductTable = ({ filteredProducts, handleDelete, openEditModal }) => {
  return (
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
    </>
  );
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
export default ProductTable;
