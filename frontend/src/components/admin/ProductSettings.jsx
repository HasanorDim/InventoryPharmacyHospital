import React, { useState } from "react";
import {
  FiPlus,
  FiLayers,
  FiDroplet,
  FiPackage,
  FiTrash2,
  FiEdit,
  FiX,
} from "react-icons/fi";
import { useProductStore } from "../../store/useProductStore";
import { ChevronRight, Loader2 } from "lucide-react";
import { useEffect } from "react";
import ProductDosageForm from "./ProductComponents/ProductDosageForm";
import ProductCategories from "./ProductComponents/ProductCategories";
import DeletingModal from "./Modal/DeletingModal";

const ProductSettings = () => {
  const { unit, storage, dosageForms } = useProductStore();
  const setCategory = useProductStore((state) => state.setCategory);
  const setDeleteDosage = useProductStore((state) => state.setDeleteDosage);
  const setEditCategory = useProductStore((state) => state.setEditCategory);
  const isLoadingCategory = useProductStore((state) => state.isLoadingCategory);
  const isLoadingForm = useProductStore((state) => state.isLoadingForm);
  const setDosageForm = useProductStore((state) => state.setDosageForm);
  const getCategory = useProductStore((state) => state.getCategory);
  const getData = useProductStore((state) => state.getData);
  const categories = useProductStore((state) => state.categories);
  const setNewUnit = useProductStore((state) => state.setNewUnit);
  const isLoadingUnit = useProductStore((state) => state.isLoadingUnit);
  const setNewStorage = useProductStore((state) => state.setNewStorage);
  const isLoadingStorage = useProductStore((state) => state.isLoadingStorage);
  const deleteStorage = useProductStore((state) => state.deleteStorage);
  const isLoadingDeletingUnit = useProductStore(
    (state) => state.isLoadingDeletingUnit
  );
  const isLoadingDeletingStorage = useProductStore(
    (state) => state.isLoadingDeletingStorage
  );
  const setEditDosage = useProductStore((state) => state.setEditDosage);
  const setDeleteCategory = useProductStore((state) => state.setDeleteCategory);
  // const unit = useProductStore((state) => state.unit);
  const deleteUnit = useProductStore((state) => state.deleteUnit);
  // Modal states
  const [showDosageFormModal, setShowDosageFormModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
  });
  const [newDosageForm, setNewDosageForm] = useState({
    name: "",
    requiresStrength: false,
  });

  // const [units, setUnits] = useState(["tablet", "vial", "bottle"]);
  const [newUnit, setterNewUnit] = useState({
    name: "",
  });
  const [newStorage, setterNewStorage] = useState({
    name: "",
  });

  const [idDeleteLoading, setIdDeleteLoading] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentDosage, setCurrentDosage] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentDeletingId, setCurrentDeletingId] = useState(null);

  useEffect(() => {
    getCategory();
    getData();
  }, []);

  // Handle unit creation
  const handleAddUnit = async (e) => {
    e.preventDefault();
    const result = await setNewUnit(newUnit);
    if (result.success) setterNewUnit({ name: "" });
  };

  const handleDeleteUnit = (unitToDelete) => {
    setIdDeleteLoading(unitToDelete.id);
    try {
      deleteUnit({ id: unitToDelete });
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setIdDeleteLoading(null);
    }
  };

  // Handle storage creation
  const handleAddStorage = async (e) => {
    e.preventDefault();
    const result = await setNewStorage(newStorage);
    if (result.success) setterNewStorage({ name: "" });
  };

  const handleDeleteStorage = (storageDelete) => {
    setIdDeleteLoading(storageDelete.id);
    try {
      deleteStorage({ id: storageDelete.id });
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setIdDeleteLoading(null);
    }
  };

  // Handle category creation
  const handleCategory = async (e) => {
    e.preventDefault();
    if (currentCategory) {
      const updatedData = { ...newCategory, id: currentCategory.id };
      const result = await setEditCategory(updatedData);

      if (result.success) {
        setNewCategory({ name: "", description: "" });
        setShowCategoryModal(false);
      }
    } else {
      const result = await setCategory(newCategory);

      if (result.success) {
        setNewCategory({ name: "", description: "" });
        setShowCategoryModal(false);
      }
    }
  };

  const openEditCategoryModal = (category) => {
    setCurrentCategory(category);
    setNewCategory({
      name: category.name,
      description: category.description,
    });
    setShowCategoryModal(true);
  };

  const handleDeleteForm = async (category) => {
    if (category.type === "dosageform") {
      const result = await setDeleteDosage({ id: category.id });
      if (result.success) {
        setCurrentDeletingId(null);
        setIsDeleteModalOpen(false);
      }
    } else {
      const result = await setDeleteCategory({ id: category.id });
      if (result.success) {
        setCurrentDeletingId(null);
        setIsDeleteModalOpen(false);
      }
    }
    setCurrentDeletingId(null);
    setIsDeleteModalOpen(false);
  };

  const handleCancelDeleteCategory = () => {
    setCurrentDeletingId(null);
    setIsDeleteModalOpen(false);
  };

  // Handle Dosage form creation
  const handleAddDosageForm = async (e) => {
    e.preventDefault();

    if (currentDosage) {
      const updatedData = { ...newDosageForm, id: currentDosage.id };
      const result = await setEditDosage(updatedData);

      if (result.success) {
        setNewDosageForm({ name: "", requiresStrength: false });
        setShowDosageFormModal(false);
      }
    } else {
      const result = await setDosageForm(newDosageForm);

      if (result.success) {
        setNewDosageForm({ name: "", requiresStrength: false });
        setShowDosageFormModal(false);
      }
    }
  };

  const openEditDosageModal = (category) => {
    setCurrentDosage(category);
    setNewDosageForm({
      name: category.form_name,
      requiresStrength: category.is_strength_require,
    });
    setShowDosageFormModal(true);
  };

  const handleCancelDeleteDosage = () => {
    setCurrentDosage(null);
    setNewDosageForm({ name: "", requiresStrength: false });
    setShowDosageFormModal(false);
  };

  return (
    <div className="space-y-6 mt-5">
      {/* Categories Card */}
      <ProductCategories
        setShowCategoryModal={setShowCategoryModal}
        categories={categories}
        openEditCategoryModal={openEditCategoryModal}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        setCurrentDeletingId={setCurrentDeletingId}
      />

      {/* Dosage Forms Card */}
      <ProductDosageForm
        setShowDosageFormModal={setShowDosageFormModal}
        dosageForms={dosageForms}
        openEditDosageModal={openEditDosageModal}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        setCurrentDeletingId={setCurrentDeletingId}
      />

      {/* Simplified Countable Units Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold flex items-center">
            <FiPackage className="mr-2 text-blue-600" />
            Stock Unit
            <span className="text-sm text-gray-600 ml-2">
              {" ("}how the item is counted in stock {")"}
            </span>
          </h3>
        </div>

        {/* Input Group - Simplified */}
        <form className="flex mb-4" onSubmit={handleAddUnit}>
          <input
            type="text"
            placeholder="e.g. box, tablet, bottle"
            className="flex-1 block px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={newUnit.name}
            onChange={(e) =>
              setterNewUnit({ ...newUnit, name: e.target.value })
            }
          />
          <button
            type="submit"
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              ${isLoadingUnit ? "bg-gray-300" : ""}
              `}
            disabled={isLoadingUnit}
          >
            {isLoadingUnit ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                {/* Save Category <ChevronRight className="ml-2 h-4 w-4" /> */}
                <FiPlus className="mr-1" /> Add
              </>
            )}
          </button>
        </form>

        {/* Unit Tags - Pharmacy Optimized */}
        <div className="flex flex-wrap gap-2">
          {unit.map((x) => (
            <div
              key={x.id}
              className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm"
            >
              {x.name}
              <button
                type="button"
                className="ml-2 text-gray-500 hover:text-red-500"
                onClick={() => handleDeleteUnit(x.id)}
                disabled={idDeleteLoading == x.id && isLoadingDeletingUnit}
              >
                {idDeleteLoading == x.id && isLoadingDeletingUnit ? (
                  <Loader2 className="h-5 w-5 animate-spin text-red-500" />
                ) : (
                  <FiTrash2 size={14} />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Storage Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold flex items-center">
            <FiPackage className="mr-2 text-blue-600" />
            Storage Room
          </h3>
        </div>

        {/* Input Group - Simplified */}
        <form onSubmit={handleAddStorage} className="flex mb-4">
          <input
            type="text"
            placeholder="e.g. Room temp, Cold, Conrolled"
            className="flex-1 block px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={newStorage.name}
            onChange={(e) =>
              setterNewStorage({ ...newStorage, name: e.target.value })
            }
          />
          <button
            type="submit"
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              ${isLoadingStorage ? "bg-gray-300" : ""}
            `}
            disabled={isLoadingStorage}
          >
            {isLoadingStorage ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                {/* Save Category <ChevronRight className="ml-2 h-4 w-4" /> */}
                <FiPlus className="mr-1" /> Add
              </>
            )}
          </button>
        </form>

        {/* Unit Tags - Pharmacy Optimized */}
        <div className="flex flex-wrap gap-2">
          {storage.map((x) => (
            <div
              key={x.id}
              className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm"
            >
              {x.name}
              <button
                className="ml-2 text-gray-500 hover:text-red-500"
                onClick={() => handleDeleteStorage(x)}
                disabled={idDeleteLoading == x.id && isLoadingDeletingStorage}
              >
                {idDeleteLoading == x.id && isLoadingDeletingStorage ? (
                  <Loader2 className="h-5 w-5 animate-spin text-red-500" />
                ) : (
                  <FiTrash2 size={14} />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Add Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black/30 bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center border-b-2 border-b-gray-300 px-6 py-4">
              <h3 className="text-lg font-semibold">
                {currentCategory
                  ? "Edit Product Category"
                  : "New Product Category"}
              </h3>
              <button
                onClick={() => setShowCategoryModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX />
              </button>
            </div>
            <form className="p-6" onSubmit={handleCategory}>
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
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={isLoadingCategory}
                >
                  {isLoadingCategory ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      Save Category <ChevronRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDosageFormModal && (
        <div className="fixed inset-0 bg-black/30 bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center border-b-2 border-b-gray-300 px-6 py-4">
              <h3 className="text-lg font-semibold">
                {currentDosage ? "Edit Dosage Form" : "New Dosage Form"}
              </h3>
              <button
                onClick={handleCancelDeleteDosage}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX />
              </button>
            </div>
            <form className="p-6" onSubmit={handleAddDosageForm}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Form Name*
                  </label>
                  <input
                    type="text"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={newDosageForm.name}
                    onChange={(e) =>
                      setNewDosageForm({
                        ...newDosageForm,
                        name: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="flex space-x-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Requires Strength
                  </label>
                  <input
                    type="checkbox"
                    className="toggle toggle-success"
                    defaultValue={false}
                    checked={newDosageForm.requiresStrength}
                    onChange={(e) =>
                      setNewDosageForm({
                        ...newDosageForm,
                        requiresStrength: e.target.checked,
                      })
                    }
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={isLoadingForm}
                >
                  {isLoadingForm ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      Save Dosage Form <ChevronRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <DeletingModal
          itemName={currentDeletingId}
          onConfirm={handleDeleteForm}
          onCancel={handleCancelDeleteCategory}
        />
      )}
    </div>
  );
};

export default ProductSettings;
