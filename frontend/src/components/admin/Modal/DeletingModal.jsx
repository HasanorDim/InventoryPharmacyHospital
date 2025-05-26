import React, { useEffect, useRef } from "react";

import { useState } from "react";
import { FiTrash2, FiX } from "react-icons/fi";
import { Loader2 } from "lucide-react";
import { useProductStore } from "../../../store/useProductStore";

const DeletingModal = ({ itemName, onConfirm, onCancel, isLoading }) => {
  const isLoadingCategory = useProductStore((state) => state.isLoadingCategory);
  const isLoadingForm = useProductStore((state) => state.isLoadingForm);

  console;
  return (
    <div className="fixed inset-0 bg-black/30 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Confirm Deletion</h3>
            <button
              onClick={onCancel}
              className="text-gray-500 hover:text-gray-700"
            >
              <FiX size={20} />
            </button>
          </div>

          <p className="text-gray-600 mb-6">
            Are you sure you want to delete{" "}
            <span className="font-medium">
              "{itemName.form_name || itemName.name}"
            </span>
            ? This action cannot be undone.
          </p>

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => onConfirm(itemName)}
              disabled={isLoadingCategory || isLoadingForm}
              className={`px-4 py-2 text-white rounded-md hover:bg-red-700 flex items-center
                ${
                  isLoadingCategory || isLoadingForm
                    ? "bg-gray-300"
                    : "bg-red-600"
                }`}
            >
              {isLoadingCategory || isLoadingForm ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Deleting...
                </>
              ) : (
                <>
                  <FiTrash2 className="mr-2" />
                  Delete
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletingModal;
