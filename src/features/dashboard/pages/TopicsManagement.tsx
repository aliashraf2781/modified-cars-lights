import { useEffect, useState } from "react";
import { useForm, useWatch, type SubmitHandler } from "react-hook-form";
import { useTopicTypes } from "../../core/hooks/useTopicTypes";
import { useTopics } from "../../core/hooks/useTopics";
import { useCategories } from "../../core/hooks/useCategories";
import { useSubCategories } from "../../core/hooks/useSubCategories";
import Modal from "../components/ui/Modal";
import ImageUpload from "../components/ui/ImageUpload";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaVideo,
  FaImages,
  FaLayerGroup,
  FaList,
} from "react-icons/fa";
import type { TopicType } from "../../core/hooks/useTopicTypes";
import type { Topic } from "../../core/hooks/useTopics";
import { Helmet } from "react-helmet";

// Form Types
interface TopicTypeFormInputs {
  name_en: string;
  name_ar: string;
  logo: string;
}

interface TopicFormInputs {
  name_en: string;
  name_ar: string;
  des_en: string;
  des_ar: string;
  content_en: string;
  content_ar: string;
  video_url: string;
  images: string[];
  category_id: number; // This is the car model (subcategory) ID
}

export default function TopicsManagement() {
  const {
    types: topicTypes,
    loading: typesLoading,
    error: typesError,
    createTopicType,
    updateTopicType,
    deleteTopicType,
  } = useTopicTypes();
  const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null);

  const {
    topics,
    loading: topicsLoading,
    error: topicsError,
    createTopic,
    updateTopic,
    deleteTopic,
  } = useTopics({
    lightsCategory: selectedTypeId,
  });

  const { categories: brands } = useCategories();

  // State for the form
  const [selectedBrandId, setSelectedBrandId] = useState<string>("");

  // Fetch subcategories (cars) based on selected brand
  const { subCategories: carModels } = useSubCategories(selectedBrandId);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"type" | "topic">("type");
  const [editingItem, setEditingItem] = useState<TopicType | Topic | null>(
    null
  );

  // Submission and Upload States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingTypeLogo, setIsUploadingTypeLogo] = useState(false);
  const [isUploadingTopicImages, setIsUploadingTopicImages] = useState(false);

  // Forms
  const {
    register: registerType,
    control: controlType,
    handleSubmit: handleSubmitType,
    reset: resetType,
    setValue: setValueType,
    formState: { errors: errorsType },
  } = useForm<TopicTypeFormInputs>();
  const {
    register: registerTopic,
    control: controlTopic,
    handleSubmit: handleSubmitTopic,
    reset: resetTopic,
    setValue: setValueTopic,
    formState: { errors: errorsTopic },
  } = useForm<TopicFormInputs>();

  const typeLogo = useWatch({ control: controlType, name: "logo" });
  const topicImages = useWatch({ control: controlTopic, name: "images" });

  // Sync form value when carModels are loaded
  useEffect(() => {
    if (modalType === "topic" && editingItem && carModels.length > 0) {
      const t = editingItem as Topic;
      if (t.car_category) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const carCategoryData = t.car_category as any;
        const car = Array.isArray(carCategoryData)
          ? carCategoryData[0]
          : carCategoryData;

        if (car) {
          // Check if the car model exists in the loaded options
          const exists = carModels.find((m) => m.id === car.id);
          if (exists) {
            setValueTopic("category_id", car.id);
          }
        }
      }
    }
  }, [carModels, editingItem, modalType, setValueTopic]);

  // Handlers
  const openModal = (type: "type" | "topic", item?: TopicType | Topic) => {
    setModalType(type);
    setEditingItem(item || null);
    setIsModalOpen(true);

    if (type === "type") {
      if (item) {
        const t = item as TopicType;
        resetType({
          name_en: t.name,
          name_ar: t.name,
          logo: t.logo || "",
        });
      } else {
        resetType({
          name_en: "",
          name_ar: "",
          logo: "",
        });
      }
    } else {
      if (item) {
        const t = item as Topic;
        let brandId = "";
        let modelId = 0;

        // Handle Car Category Pre-selection
        if (t.car_category) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const carCategoryData = t.car_category as any;
          const car = Array.isArray(carCategoryData)
            ? carCategoryData[0]
            : carCategoryData;

          if (car) {
            brandId = car.category_id.toString();
            modelId = car.id;
          }
        }

        setSelectedBrandId(brandId);

        resetTopic({
          name_en: t.name,
          name_ar: t.name,
          des_en: t.description || "",
          des_ar: t.description || "",
          content_en: t.content || "",
          content_ar: t.content || "",
          video_url: t.video || "",
          images: t.images || [],
          category_id: modelId,
        });
      } else {
        setSelectedBrandId("");
        resetTopic({
          name_en: "",
          name_ar: "",
          des_en: "",
          des_ar: "",
          content_en: "",
          content_ar: "",
          video_url: "",
          images: [],
          category_id: 0,
        });
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    resetType();
    resetTopic();
    setSelectedBrandId("");
  };

  const onTypeSubmit: SubmitHandler<TopicTypeFormInputs> = async (data) => {
    setIsSubmitting(true);
    try {
      if (editingItem) {
        await updateTopicType({ id: editingItem.id, ...data });
      } else {
        await createTopicType(data);
      }
      closeModal();
    } catch (e) {
      console.error(e);
      alert("Error saving topic type");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onTopicSubmit: SubmitHandler<TopicFormInputs> = async (data) => {
    setIsSubmitting(true);
    try {
      const payload = {
        ...data,
        type_id: selectedTypeId ? parseInt(selectedTypeId) : null,
        category_id: data.category_id ? Number(data.category_id) : null,
      };

      if (editingItem) {
        await updateTopic({ id: editingItem.id, ...payload });
      } else {
        await createTopic(payload);
      }
      closeModal();
    } catch (e) {
      console.error(e);
      alert("Error saving topic");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (type: "type" | "topic", id: number) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      if (type === "type") {
        await deleteTopicType(id);
        if (selectedTypeId === id.toString()) setSelectedTypeId(null);
      } else {
        await deleteTopic(id);
      }
    } catch (e) {
      console.error(e);
      alert("Error deleting item");
    }
  };

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <meta name="bingbot" content="noindex, nofollow" />
      </Helmet>
      <div className="p-6 bg-neutral-900 min-h-screen text-gray-100 space-y-8">
        <header className="flex justify-between items-center border-b border-neutral-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold bg-linear-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent">
              Topics Management
            </h1>
            <p className="text-gray-500 mt-1">
              Manage topic types and individual topics
            </p>
          </div>
          <button
            onClick={() => openModal("type")}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg transition-all shadow-lg hover:shadow-red-900/20 font-medium"
          >
            <FaPlus /> Add Topic Type
          </button>
        </header>

        {/* Topic Types Grid */}
        <section>
          {typesLoading && (
            <div className="text-center py-8 text-gray-400">
              Loading topic types...
            </div>
          )}
          {typesError && (
            <div className="bg-red-900/20 border border-red-900 text-red-400 p-4 rounded-lg">
              Error: {typesError}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {topicTypes.map((type) => (
              <div
                key={type.id}
                onClick={() =>
                  setSelectedTypeId(
                    selectedTypeId === type.id.toString()
                      ? null
                      : type.id.toString()
                  )
                }
                className={`relative group bg-linear-to-br from-neutral-800 to-black rounded-xl p-6 border transition-all cursor-pointer hover:-translate-y-1 hover:shadow-xl overflow-hidden ${selectedTypeId === type.id.toString()
                    ? "border-red-500 shadow-red-900/20"
                    : "border-neutral-800 hover:border-red-400"
                  }`}
              >
                <div className="absolute inset-0 bg-linear-to-br from-gray-800/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-gray-700 rounded-lg">
                      {type.logo ? (
                        <img
                          src={type.logo}
                          alt={type.name}
                          className="w-12 h-12 object-contain"
                        />
                      ) : (
                        <FaLayerGroup className="w-12 h-12 text-gray-500" />
                      )}
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal("type", type);
                        }}
                        className="p-2 text-blue-400 hover:bg-blue-900/30 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete("type", type.id);
                        }}
                        className="p-2 text-red-400 hover:bg-red-900/30 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    {type.name}
                  </h3>
                  <p className="text-sm text-gray-400">ID: {type.id}</p>
                </div>
              </div>
            ))}
          </div>

          {topicTypes.length === 0 && !typesLoading && (
            <div className="text-center py-12 bg-gray-800/50 rounded-xl border border-dashed border-gray-700">
              <p className="text-gray-500">
                No topic types found. Create one to get started.
              </p>
            </div>
          )}
        </section>

        {/* Topics Section */}
        <section className="animate-fade-in-up bg-neutral-900 rounded-xl border border-neutral-800 overflow-hidden">
          <div className="p-6 border-b border-neutral-800 flex justify-between items-center bg-neutral-800/30">
            <div className="flex items-center gap-3">
              <FaList className="text-red-500 text-xl" />
              <h2 className="text-xl font-bold text-gray-100">
                {selectedTypeId
                  ? `Topics (Type ID: ${selectedTypeId})`
                  : "All Topics"}
              </h2>
            </div>
            {selectedTypeId && (
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedTypeId(null)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Clear Filter
                </button>
                <button
                  onClick={() => openModal("topic")}
                  className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium border border-neutral-700"
                >
                  <FaPlus /> Add Topic
                </button>
              </div>
            )}
          </div>

          <div className="p-6">
            {topicsLoading && (
              <div className="text-center py-4 text-gray-400">
                Loading topics...
              </div>
            )}
            {topicsError && (
              <div className="text-red-400 py-2">Error: {topicsError}</div>
            )}

            {topics.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl: gap-4">
                {topics.map((topic) => (
                  <div
                    key={topic.id}
                    className="bg-linear-to-br from-neutral-800 to-black rounded-lg border border-neutral-800 p-4 hover:border-red-400 transition-colors group"
                  >
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-bold text-white">
                            {topic.name}
                          </h3>
                          {topic.video && (
                            <FaVideo
                              className="text-red-500"
                              title="Has Video"
                            />
                          )}
                          {topic.images && topic.images.length > 0 && (
                            <FaImages
                              className="text-blue-500"
                              title={`Has ${topic.images.length} Images`}
                            />
                          )}
                          {topic.car_category &&
                            topic.car_category.length > 0 && (
                              <span className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300">
                                {topic.car_category[0].name}
                              </span>
                            )}
                        </div>
                        <p className="text-gray-400 text-sm line-clamp-2 max-w-2xl">
                          {topic.description || "No description"}
                        </p>
                      </div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => openModal("topic", topic)}
                          className="p-2 text-blue-400 hover:bg-blue-900/30 rounded-lg transition-colors"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete("topic", topic.id)}
                          className="p-2 text-red-400 hover:bg-red-900/30 rounded-lg transition-colors"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              !topicsLoading && (
                <div className="text-center py-8 text-gray-500">
                  No topics found.
                </div>
              )
            )}
          </div>
        </section>

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={
            editingItem
              ? `Edit ${modalType === "type" ? "Topic Type" : "Topic"}`
              : `Add ${modalType === "type" ? "Topic Type" : "Topic"}`
          }
        >
          {modalType === "type" ? (
            <form
              onSubmit={handleSubmitType(onTypeSubmit)}
              className="space-y-6"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Name (English)
                  </label>
                  <input
                    {...registerType("name_en", {
                      required: "English name is required",
                    })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2.5 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none transition-colors"
                  />
                  {errorsType.name_en && (
                    <span className="text-red-500 text-xs mt-1">
                      {errorsType.name_en.message}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Name (Arabic)
                  </label>
                  <input
                    {...registerType("name_ar", {
                      required: "Arabic name is required",
                    })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2.5 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none transition-colors text-right"
                  />
                  {errorsType.name_ar && (
                    <span className="text-red-500 text-xs mt-1">
                      {errorsType.name_ar.message}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Type Logo
                </label>
                <ImageUpload
                  value={typeLogo}
                  onChange={(val) => setValueType("logo", val as string)}
                  placeholder="Upload type logo"
                  onUploadingChange={setIsUploadingTypeLogo}
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || isUploadingTypeLogo}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Saving..." : "Save Topic Type"}
                </button>
              </div>
            </form>
          ) : (
            <form
              onSubmit={handleSubmitTopic(onTopicSubmit)}
              className="space-y-6"
            >
              {/* Brand and Car Model Selection */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-700/30 rounded-lg border border-gray-700">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Car Brand
                  </label>
                  <select
                    value={selectedBrandId}
                    onChange={(e) => setSelectedBrandId(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2.5 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none transition-colors"
                  >
                    <option value="">Select Brand</option>
                    {brands.map((brand) => (
                      <option key={brand.id} value={brand.id}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Car Model
                  </label>
                  <select
                    {...registerTopic("category_id", {
                      required: "Car model is required",
                    })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2.5 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none transition-colors"
                  >
                    <option value="">Select Model</option>
                    {carModels.map((model) => (
                      <option key={model.id} value={model.id}>
                        {model.name}
                      </option>
                    ))}
                  </select>
                  {errorsTopic.category_id && (
                    <span className="text-red-500 text-xs mt-1">
                      {errorsTopic.category_id.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Name (English)
                  </label>
                  <input
                    {...registerTopic("name_en", {
                      required: "English name is required",
                    })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2.5 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none transition-colors"
                  />
                  {errorsTopic.name_en && (
                    <span className="text-red-500 text-xs mt-1">
                      {errorsTopic.name_en.message}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Name (Arabic)
                  </label>
                  <input
                    {...registerTopic("name_ar", {
                      required: "Arabic name is required",
                    })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2.5 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none transition-colors text-right"
                  />
                  {errorsTopic.name_ar && (
                    <span className="text-red-500 text-xs mt-1">
                      {errorsTopic.name_ar.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Description (English)
                  </label>
                  <textarea
                    {...registerTopic("des_en")}
                    rows={3}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2.5 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Description (Arabic)
                  </label>
                  <textarea
                    {...registerTopic("des_ar")}
                    rows={3}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2.5 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none transition-colors text-right"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Content (English)
                  </label>
                  <textarea
                    {...registerTopic("content_en")}
                    rows={5}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2.5 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Content (Arabic)
                  </label>
                  <textarea
                    {...registerTopic("content_ar")}
                    rows={5}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2.5 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none transition-colors text-right"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Video URL
                </label>
                <div className="relative">
                  <FaVideo className="absolute left-3 top-3 text-gray-500" />
                  <input
                    {...registerTopic("video_url")}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 p-2.5 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none transition-colors"
                    placeholder="https://youtube.com/..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Gallery Images
                </label>
                <ImageUpload
                  value={topicImages}
                  onChange={(val) => setValueTopic("images", val as string[])}
                  multiple={true}
                  placeholder="Upload multiple images for the gallery"
                  onUploadingChange={setIsUploadingTopicImages}
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || isUploadingTopicImages}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Saving..." : "Save Topic"}
                </button>
              </div>
            </form>
          )}
        </Modal>
      </div>
    </>
  );
}
