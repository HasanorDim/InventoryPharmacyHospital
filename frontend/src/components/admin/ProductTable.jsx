import React from "react";
import {
  FiEdit2,
  FiLock,
  FiMapPin,
  FiPackage,
  FiTrash2,
  FiAlertTriangle,
  FiArchive,
  FiHome,
  FiThermometer,
  FiShield,
  FiBox,
} from "react-icons/fi";

const ProductTable = ({
  filteredProducts,
  openEditModal,
  productsState,
  setIsDeleteModalOpen,
  setCurrentData,
}) => {
  const handleDeleteData = (data) => {
    setCurrentData(data);
    setIsDeleteModalOpen(true);
  };

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
                            {product.medicine_name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StorageBadge type={product?.storageType} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <FiMapPin className="mr-1 text-gray-400" />
                        <span>
                          {product.location?.zone}-{product.location?.shelf}-
                          {product.location?.bin}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {product.location?.building}, Floor{" "}
                        {product.location?.floor}
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
                        onClick={() => handleDeleteData(product)}
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

const StorageBadge = ({ type }) => {
  switch (type.trim()) {
    // Temperature-Controlled
    case "Refrigerated":
      return (
        <span className="px-2 py-1 bg-cyan-100 text-cyan-800 text-xs rounded-full flex items-center">
          <FiThermometer className="mr-1" /> ❄️ Refrigerated (2-8°C)
        </span>
      );
    case "Freezer":
      return (
        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full flex items-center">
          <FiThermometer className="mr-1" /> 🧊 Freezer (-20°C)
        </span>
      );
    case "Room Temperature":
      return (
        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full flex items-center">
          <FiThermometer className="mr-1" /> 🌡️ Room Temp (15-25°C)
        </span>
      );

    // Special Storage
    case "Controlled":
      return (
        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full flex items-center">
          <FiLock className="mr-1" /> 🔒 Controlled
        </span>
      );
    case "Hazardous":
      return (
        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full flex items-center">
          <FiAlertTriangle className="mr-1" /> ⚠️ Hazardous
        </span>
      );
    case "Quarantine":
      return (
        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full flex items-center">
          <FiShield className="mr-1" /> 🚫 Quarantine
        </span>
      );

    // Location-Based
    case "Main Pharmacy":
      return (
        <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full flex items-center">
          <FiHome className="mr-1" /> 🏥 Main Pharmacy
        </span>
      );
    case "Ward Stock":
      return (
        <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full flex items-center">
          <FiArchive className="mr-1" /> 🛏️ Ward Stock
        </span>
      );

    default:
      return (
        <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full flex items-center">
          <FiBox className="mr-1" /> {type}
        </span>
      );
  }
};
export default ProductTable;
