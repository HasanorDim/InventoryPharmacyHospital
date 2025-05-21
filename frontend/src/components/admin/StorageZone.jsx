import React from "react";
import {
  FiBox,
  FiDroplet,
  FiLock,
  FiMapPin,
  FiRefreshCw,
} from "react-icons/fi";

const StorageZone = ({ filteredProducts, resetFilters, setSampleModal }) => {
  return (
    <div>
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
                        <div className="font-medium text-sm">Shelf {shelf}</div>
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
    </div>
  );
};

export default StorageZone;
