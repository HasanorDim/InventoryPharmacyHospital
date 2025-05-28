import React from "react";
import {
  FiBox,
  FiDroplet,
  FiLock,
  FiMapPin,
  FiRefreshCw,
  FiThermometer,
} from "react-icons/fi";

const StorageZone = ({ filteredProducts, resetFilters, setSampleModal }) => {
  // Storage Type Sections
  const STORAGE_SECTIONS = [
    {
      type: "shelf",
      name: "On Shelf Display",
      icon: <FiBox className="text-indigo-600" />,
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
      textColor: "text-indigo-800",
    },
    {
      type: "storage",
      name: "Storage Areas",
      icon: <FiBox className="text-slate-600" />,
      bgColor: "bg-slate-50",
      borderColor: "border-slate-300",
      textColor: "text-slate-800",
    },
  ];

  // Zone Data
  const ZONES = [
    {
      name: "A",
      type: "shelf",
      accentColor: "bg-violet-100",
      borderColor: "border-violet-300",
    },
    {
      name: "B",
      type: "shelf",
      accentColor: "bg-blue-100",
      borderColor: "border-blue-300",
    },
    {
      name: "C",
      type: "shelf",
      accentColor: "bg-cyan-100",
      borderColor: "border-cyan-300",
    },
    {
      name: "Refrigerated",
      type: "storage",
      icon: <FiThermometer className="text-teal-600" />,
      accentColor: "bg-teal-50",
      borderColor: "border-teal-200",
    },
    {
      name: "Narcotics",
      type: "storage",
      icon: <FiLock className="text-rose-600" />,
      accentColor: "bg-rose-50",
      borderColor: "border-rose-200",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mt-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-slate-800 flex items-center">
          <FiMapPin className="mr-2 text-indigo-600" />
          Storage Overview
        </h3>
        <button
          onClick={resetFilters}
          className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center"
        >
          <FiRefreshCw className="mr-1" /> Reset
        </button>
      </div>

      {/* Storage Type Sections */}
      {STORAGE_SECTIONS.map((section) => (
        <div key={section.type} className="mb-8">
          {/* Section Header */}
          <div
            className={`flex items-center mb-4 p-3 ${section.bgColor} ${
              section.borderColor
            } rounded-lg border-l-4 ${
              section.type === "shelf"
                ? "border-l-indigo-400"
                : "border-l-slate-400"
            }`}
          >
            {section.icon}
            <h4 className={`ml-2 font-medium ${section.textColor}`}>
              {section.name}
            </h4>
          </div>

          {/* Zone Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ZONES.filter((zone) => zone.type === section.type).map((zone) => {
              const zoneProducts = filteredProducts.filter(
                (p) => p.location.zone === zone.name
              );
              if (zoneProducts.length === 0) return null;

              return (
                <div
                  key={zone.name}
                  className={`border rounded-xl p-4 ${zone.accentColor} ${zone.borderColor} hover:shadow-md transition-shadow`}
                  onClick={() => {
                    setSampleModal(true);
                  }}
                >
                  <div className="flex items-center mb-3">
                    {zone.icon || (
                      <FiBox
                        className={`mr-2 ${
                          section.type === "shelf"
                            ? "text-indigo-600"
                            : "text-slate-600"
                        }`}
                      />
                    )}
                    <h4 className={`font-medium ${section.textColor}`}>
                      {zone.type === "shelf"
                        ? `🗄️ Zone ${zone.name}`
                        : `📦 ${zone.name}`}
                    </h4>
                    <span className="ml-auto bg-white px-2 py-1 rounded-full text-xs font-medium shadow-xs">
                      {zoneProducts.length} items
                    </span>
                  </div>

                  {/* Shelves */}
                  <div className="grid grid-cols-5 gap-2">
                    {[1, 2, 3, 4, 5].map((shelf) => (
                      <ShelfBox
                        key={shelf}
                        shelf={shelf}
                        zone={zone.name}
                        products={zoneProducts}
                        isStorage={section.type === "storage"}
                        zoneColor={zone.accentColor}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

// Shelf Component with enhanced colors
const ShelfBox = ({ shelf, zone, products, isStorage, zoneColor }) => {
  const shelfProducts = products.filter(
    (p) => p.location.shelf === shelf.toString()
  );

  const stockLevel =
    shelfProducts.length > 10
      ? "high"
      : shelfProducts.length > 5
      ? "medium"
      : "low";

  if (shelfProducts.length === 0) {
    return (
      <div className="border border-dashed border-slate-300 rounded-lg p-1 text-center opacity-70">
        <div className="text-xs text-slate-500">Shelf {shelf}</div>
        <div className="text-xs text-slate-400">Empty</div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-lg p-2 border ${
        isStorage
          ? `bg-white border-slate-300 ${
              stockLevel === "high"
                ? "border-t-green-300 border-t-2"
                : stockLevel === "medium"
                ? "border-t-amber-300 border-t-2"
                : "border-t-rose-300 border-t-2"
            }`
          : `${zoneColor} ${
              stockLevel === "high"
                ? "border-green-300"
                : stockLevel === "medium"
                ? "border-amber-300"
                : "border-rose-300"
            }`
      }`}
    >
      <div className="font-medium text-sm text-slate-800">Shelf {shelf}</div>
      <div
        className={`text-xs ${
          stockLevel === "high"
            ? "text-green-700"
            : stockLevel === "medium"
            ? "text-amber-700"
            : "text-rose-700"
        }`}
      >
        {shelfProducts.length} item{shelfProducts.length !== 1 ? "s" : ""}
        {isStorage && (
          <span className="block text-slate-500 text-[0.65rem]">Storage</span>
        )}
      </div>
    </div>
  );
};

export default StorageZone;
