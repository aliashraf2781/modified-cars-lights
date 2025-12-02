import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useCategories } from "../../core/hooks/useCategories";
import { useSubCategories } from "../../core/hooks/useSubCategories";
import Modal from "../components/ui/Modal";
import ImageUpload from "../components/ui/ImageUpload";
import { FaEdit, FaTrash, FaPlus, FaFolder, FaFolderOpen } from "react-icons/fa";
import type { Brand } from "../../core/types/categories.";
import type { subCategory } from "../../core/types/subCategories";

// Form Types
interface CategoryFormInputs {
    name_en: string;
    name_ar: string;
    logo: string;
}

interface SubCategoryFormInputs {
    name_en: string;
    name_ar: string;
}

export default function CategoriesManagement() {
    const { categories, loading: catLoading, error: catError, createCategory, updateCategory, deleteCategory } = useCategories();
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

    // Subcategories hook
    const { subCategories, loading: subLoading, error: subError, createSubCategory, updateSubCategory, deleteSubCategory } = useSubCategories(selectedCategoryId || "");

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState<"category" | "subcategory">("category");
    const [editingItem, setEditingItem] = useState<Brand | subCategory | null>(null);

    // Forms
    const { register: registerCat, handleSubmit: handleSubmitCat, reset: resetCat, setValue: setValueCat, watch: watchCat, formState: { errors: errorsCat } } = useForm<CategoryFormInputs>();
    const { register: registerSub, handleSubmit: handleSubmitSub, reset: resetSub, setValue: setValueSub, formState: { errors: errorsSub } } = useForm<SubCategoryFormInputs>();

    const categoryLogo = watchCat("logo");

    // Handlers
    const openModal = (type: "category" | "subcategory", item?: Brand | subCategory) => {
        setModalType(type);
        setEditingItem(item || null);
        setIsModalOpen(true);

        if (type === "category") {
            if (item) {
                const cat = item as Brand;
                setValueCat("name_en", cat.name);
                setValueCat("name_ar", cat.name);
                setValueCat("logo", cat.logo || "");
            } else {
                resetCat();
                setValueCat("logo", "");
            }
        } else {
            if (item) {
                const sub = item as subCategory;
                setValueSub("name_en", sub.name);
                setValueSub("name_ar", sub.name);
            } else {
                resetSub();
            }
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
        resetCat();
        resetSub();
    };

    const onCategorySubmit: SubmitHandler<CategoryFormInputs> = async (data) => {
        try {
            if (editingItem) {
                await updateCategory({ id: editingItem.id.toString(), ...data });
            } else {
                await createCategory(data);
            }
            closeModal();
        } catch (e) {
            console.error(e);
            alert("Error saving category");
        }
    };

    const onSubCategorySubmit: SubmitHandler<SubCategoryFormInputs> = async (data) => {
        if (!selectedCategoryId) return;
        try {
            if (editingItem) {
                await updateSubCategory({ id: editingItem.id.toString(), ...data });
            } else {
                await createSubCategory({ ...data, category_id: selectedCategoryId });
            }
            closeModal();
        } catch (e) {
            console.error(e);
            alert("Error saving subcategory");
        }
    };

    const handleDelete = async (type: "category" | "subcategory", id: string) => {
        if (!confirm("Are you sure you want to delete this item?")) return;
        try {
            if (type === "category") {
                await deleteCategory(id);
                if (selectedCategoryId === id) setSelectedCategoryId(null);
            } else {
                await deleteSubCategory(id);
            }
        } catch (e) {
            console.error(e);
            alert("Error deleting item");
        }
    };

    return (
        <div className="p-6 bg-gray-900 min-h-screen text-white space-y-8">
            <header className="flex justify-between items-center border-b border-gray-800 pb-6">
                <div>
                    <h1 className="text-3xl font-bold text-red-500">Categories Management</h1>
                    <p className="text-gray-400 mt-1">Manage your main categories and their sub-categories</p>
                </div>
                <button
                    onClick={() => openModal("category")}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg transition-all shadow-lg hover:shadow-red-900/20 font-medium"
                >
                    <FaPlus /> Add Category
                </button>
            </header>

            {/* Categories Grid */}
            <section>
                {catLoading && <div className="text-center py-8 text-gray-400">Loading categories...</div>}
                {catError && <div className="bg-red-900/20 border border-red-900 text-red-400 p-4 rounded-lg">Error: {catError}</div>}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {categories.map((cat) => (
                        <div
                            key={cat.id}
                            onClick={() => setSelectedCategoryId(cat.id.toString())}
                            className={`relative group bg-gray-800 rounded-xl p-6 border-2 transition-all cursor-pointer hover:-translate-y-1 hover:shadow-xl ${selectedCategoryId === cat.id.toString()
                                    ? "border-red-500 shadow-red-900/20"
                                    : "border-gray-700 hover:border-gray-600"
                                }`}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-gray-700 rounded-lg">
                                    {cat.logo ? (
                                        <img src={cat.logo} alt={cat.name} className="w-12 h-12 object-contain" />
                                    ) : (
                                        <FaFolder className="w-12 h-12 text-gray-500" />
                                    )}
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); openModal("category", cat); }}
                                        className="p-2 text-blue-400 hover:bg-blue-900/30 rounded-lg transition-colors"
                                        title="Edit"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleDelete("category", cat.id.toString()); }}
                                        className="p-2 text-red-400 hover:bg-red-900/30 rounded-lg transition-colors"
                                        title="Delete"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-1">{cat.name}</h3>
                            <p className="text-sm text-gray-400">ID: {cat.id}</p>
                        </div>
                    ))}
                </div>

                {categories.length === 0 && !catLoading && (
                    <div className="text-center py-12 bg-gray-800/50 rounded-xl border border-dashed border-gray-700">
                        <p className="text-gray-500">No categories found. Create one to get started.</p>
                    </div>
                )}
            </section>

            {/* SubCategories Section */}
            {selectedCategoryId && (
                <section className="animate-fade-in-up bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                    <div className="p-6 border-b border-gray-700 flex justify-between items-center bg-gray-800/50">
                        <div className="flex items-center gap-3">
                            <FaFolderOpen className="text-red-500 text-xl" />
                            <h2 className="text-xl font-bold text-white">
                                SubCategories <span className="text-gray-500 text-sm font-normal ml-2">(Category ID: {selectedCategoryId})</span>
                            </h2>
                        </div>
                        <button
                            onClick={() => openModal("subcategory")}
                            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                        >
                            <FaPlus /> Add SubCategory
                        </button>
                    </div>

                    <div className="p-6">
                        {subLoading && <div className="text-center py-4 text-gray-400">Loading subcategories...</div>}
                        {subError && <div className="text-red-400 py-2">Error: {subError}</div>}

                        {subCategories.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {subCategories.map((sub) => (
                                    <div key={sub.id} className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors group">
                                        <span className="font-medium text-gray-200">{sub.name}</span>
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => openModal("subcategory", sub)}
                                                className="text-blue-400 hover:text-blue-300 p-1"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                onClick={() => handleDelete("subcategory", sub.id.toString())}
                                                className="text-red-400 hover:text-red-300 p-1"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            !subLoading && (
                                <div className="text-center py-8 text-gray-500">
                                    No subcategories found for this category.
                                </div>
                            )
                        )}
                    </div>
                </section>
            )}

            {/* Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={editingItem ? `Edit ${modalType === "category" ? "Category" : "SubCategory"}` : `Add ${modalType === "category" ? "Category" : "SubCategory"}`}
            >
                {modalType === "category" ? (
                    <form onSubmit={handleSubmitCat(onCategorySubmit)} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Name (English)</label>
                                <input
                                    {...registerCat("name_en", { required: "English name is required" })}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2.5 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none transition-colors"
                                    placeholder="e.g. Sports Cars"
                                />
                                {errorsCat.name_en && <span className="text-red-500 text-xs mt-1">{errorsCat.name_en.message}</span>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Name (Arabic)</label>
                                <input
                                    {...registerCat("name_ar", { required: "Arabic name is required" })}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2.5 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none transition-colors text-right"
                                    placeholder="مثال: سيارات رياضية"
                                />
                                {errorsCat.name_ar && <span className="text-red-500 text-xs mt-1">{errorsCat.name_ar.message}</span>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Category Logo</label>
                            <ImageUpload
                                value={categoryLogo}
                                onChange={(val) => setValueCat("logo", val as string)}
                                placeholder="Upload category logo"
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
                            <button type="button" onClick={closeModal} className="px-4 py-2 text-gray-400 hover:text-white transition-colors">Cancel</button>
                            <button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">Save Category</button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleSubmitSub(onSubCategorySubmit)} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Name (English)</label>
                                <input
                                    {...registerSub("name_en", { required: "English name is required" })}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2.5 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none transition-colors"
                                />
                                {errorsSub.name_en && <span className="text-red-500 text-xs mt-1">{errorsSub.name_en.message}</span>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Name (Arabic)</label>
                                <input
                                    {...registerSub("name_ar", { required: "Arabic name is required" })}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2.5 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none transition-colors text-right"
                                />
                                {errorsSub.name_ar && <span className="text-red-500 text-xs mt-1">{errorsSub.name_ar.message}</span>}
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
                            <button type="button" onClick={closeModal} className="px-4 py-2 text-gray-400 hover:text-white transition-colors">Cancel</button>
                            <button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">Save SubCategory</button>
                        </div>
                    </form>
                )}
            </Modal>
        </div>
    );
}
