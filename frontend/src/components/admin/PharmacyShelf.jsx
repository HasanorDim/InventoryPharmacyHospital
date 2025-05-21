import React, { useState } from "react";
import { memo } from "react";
import { FiX, FiPlus } from "react-icons/fi";

const PharmacyShelf = ({ ismodal, onClose }) => {
  const [selectedBox, setSelectedBox] = useState(null);
  const [shelfCapacity, setShelfCapacity] = useState(200);
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Paracetamol 500mg",
      batch: "BATCH-001",
      expiry: "2024-12-31",
      quantity: 150,
    },
    {
      id: 2,
      name: "Amoxicillin 500mg",
      batch: "BATCH-002",
      expiry: "2025-03-15",
      quantity: 80,
    },
  ]);

  //   const shelfBoxes = Array(30)
  //     .fill(null)
  //     .map((_, index) => ({
  //       id: index + 1,
  //       product: products.find((p) => p.id === index + 1) || null,
  //     }));

  const totalBoxes = 30;
  const columns = 6; // This can come from a settings form or state
  const shelfBoxes = Array.from({ length: totalBoxes }, (_, i) => ({
    id: i + 1,
  }));

  console.log("123");

  if (!ismodal) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50  p-4 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="bg-white rounded-lg w-full max-w-6xl h-[90vh] overflow-hidden shadow-lg relative flex flex-col">
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Shelf A-12</h2>
          <div className="text-sm text-gray-600">
            Capacity:{" "}
            <span className="font-semibold">
              {products.reduce((sum, p) => sum + p.quantity, 0)}/{shelfCapacity}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Shelf Grid */}
        <div className="p-4 overflow-auto">
          <div
            className="grid gap-2 justify-center"
            style={{
              gridTemplateColumns: `repeat(${columns}, 80px)`,
            }}
          >
            {shelfBoxes.map((box) => (
              <div
                key={box.id}
                onClick={() => setSelectedBox(box)}
                className={`w-[80px] h-[80px] border rounded p-1 cursor-pointer text-[10px] transition
    flex flex-col justify-betwee
        ${
          box.product
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 bg-gray-100 hover:bg-gray-200"
        }`}
              >
                <div className="flex justify-between items-start text-gray-600">
                  <span className="font-medium">Box {box.id}</span>
                  {!box.product && <FiPlus className="text-xs" />}
                </div>
                {box.product && (
                  <div className="text-[10px]">
                    <p className="font-semibold truncate">{box.product.name}</p>
                    <p className="text-gray-600">
                      {box.product.quantity} units
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Side Panel */}
        {selectedBox && (
          <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-lg z-50 p-6 overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-4">
              <h3 className="text-lg font-semibold">
                {selectedBox.product ? "Product Details" : "Assign Product"}
              </h3>
              <button
                onClick={() => setSelectedBox(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>

            <div className="mt-6">
              {selectedBox.product ? (
                <>
                  <div className="space-y-3 text-sm">
                    <DetailRow label="Name" value={selectedBox.product.name} />
                    <DetailRow
                      label="Batch"
                      value={selectedBox.product.batch}
                    />
                    <DetailRow
                      label="Expiry"
                      value={selectedBox.product.expiry}
                    />
                    <DetailRow
                      label="Quantity"
                      value={selectedBox.product.quantity}
                    />
                    <DetailRow
                      label="Box ID"
                      value={`A-12-${selectedBox.id}`}
                    />
                  </div>
                  <button
                    className="mt-6 w-full bg-red-100 text-red-700 py-2 rounded hover:bg-red-200 transition"
                    onClick={() => {
                      setProducts(
                        products.filter((p) => p.id !== selectedBox.product.id)
                      );
                      setSelectedBox(null);
                    }}
                  >
                    Remove from Shelf
                  </button>
                </>
              ) : (
                <div className="mt-4">
                  <p className="text-gray-600 mb-2 text-sm">
                    Select a product to assign:
                  </p>
                  <select
                    className="w-full border rounded-md p-2 text-sm mb-4"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select Product
                    </option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name} ({product.quantity} units)
                      </option>
                    ))}
                  </select>
                  <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition text-sm">
                    Assign Product
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const DetailRow = ({ label, value }) => (
  <div className="flex justify-between border-b py-1 text-sm">
    <span className="text-gray-600">{label}:</span>
    <span className="font-medium">{value}</span>
  </div>
);

export default memo(PharmacyShelf);
