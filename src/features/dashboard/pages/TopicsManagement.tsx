import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useTopicTypes } from "../../core/hooks/useTopicTypes";
import { useTopics } from "../../core/hooks/useTopics";
import Modal from "../components/ui/Modal";
import ImageUpload from "../components/ui/ImageUpload";
import { FaEdit, FaTrash, FaPlus, FaVideo, FaImages, FaLayerGroup, FaList } from "react-icons/fa";
import type { TopicType } from "../../core/hooks/useTopicTypes";
import type { Topic } from "../../core/hooks/useTopics";

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
}

export default function TopicsManagement() {
    const { types: topicTypes, loading: typesLoading, error: typesError, createTopicType, updateTopicType, deleteTopicType } = useTopicTypes();
    const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null);

    const { topics, loading: topicsLoading, error: topicsError, createTopic, updateTopic, deleteTopic } = useTopics({
        lightsCategory: selectedTypeId
    });

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState<"type" | "topic">("type");
    const [editingItem, setEditingItem] = useState<TopicType | Topic | null>(null);

    // Forms
    const { register: registerType, handleSubmit: handleSubmitType, reset: resetType, setValue: setValueType, watch: watchType, formState: { errors: errorsType } } = useForm<TopicTypeFormInputs>();
    const { register: registerTopic, handleSubmit: handleSubmitTopic, reset: resetTopic, setValue: setValueTopic, watch: watchTopic, formState: { errors: errorsTopic } } = useForm<TopicFormInputs>();

    const typeLogo = watchType("logo");
    const topicImages = watchTopic("images");

    // Handlers
    const openModal = (type: "type" | "topic", item?: TopicType | Topic) => {
        setModalType(type);
        setEditingItem(item || null);
        setIsModalOpen(true);

        if (type === "type") {
            if (item) {
                const t = item as TopicType;
                setValueType("name_en", t.name);
                setValueType("name_ar", t.name);
                setValueType("logo", t.logo || "");
            } else {
                resetType();
                setValueType("logo", "");
            }
        } else {
            if (item) {
                const t = item as Topic;
                setValueTopic("name_en", t.name);
                setValueTopic("name_ar", t.name);
                setValueTopic("des_en", t.description || "");
                setValueTopic("des_ar", t.description || "");
                setValueTopic("content_en", t.content || "");
                setValueTopic("content_ar", t.content || "");
                setValueTopic("video_url", t.video || "");
                setValueTopic("images", t.images || []);
            } else {
                resetTopic();
                setValueTopic("images", []);
            }
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
        resetType();
        resetTopic();
    };

    const onTypeSubmit: SubmitHandler<TopicTypeFormInputs> = async (data) => {
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
        }
    };

    const onTopicSubmit: SubmitHandler<TopicFormInputs> = async (data) => {
        try {
            const payload = { ...data, type_id: selectedTypeId ? parseInt(selectedTypeId) : null };

            if (editingItem) {
                await updateTopic({ id: editingItem.id, ...payload });
            } else {
                await createTopic(payload);
            }
            closeModal();
        } catch (e) {
            console.error(e);
            alert("Error saving topic");
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
        <div className="p-6 bg-gray-900 min-h-screen text-white space-y-8">
            <header className="flex justify-between items-center border-b border-gray-800 pb-6">
                <div>
                    <h1 className="text-3xl font-bold text-red-500">Topics Management</h1>
                    <p className="text-gray-400 mt-1">Manage topic types and individual topics</p>
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
                {typesLoading && <div className="text-center py-8 text-gray-400">Loading topic types...</div>}
                {typesError && <div className="bg-red-900/20 border border-red-900 text-red-400 p-4 rounded-lg">Error: {typesError}</div>}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {topicTypes.map((type) => (
                        <div
                            key={type.id}
                            onClick={() => setSelectedTypeId(selectedTypeId === type.id.toString() ? null : type.id.toString())}
                            className={`relative group bg-gray-800 rounded-xl p-6 border-2 transition-all cursor-pointer hover:-translate-y-1 hover:shadow-xl ${selectedTypeId === type.id.toString()
                                    ? "border-red-500 shadow-red-900/20"
                                    : "border-gray-700 hover:border-gray-600"
                                }`}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-gray-700 rounded-lg">
                                    {type.logo ? (
                                        <img src={type.logo} alt={type.name} className="w-12 h-12 object-contain" />
                                    ) : (
                                        <FaLayerGroup className="w-12 h-12 text-gray-500" />
                                    )}
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); openModal("type", type); }}
                                        className="p-2 text-blue-400 hover:bg-blue-900/30 rounded-lg transition-colors"
                                        title="Edit"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleDelete("type", type.id); }}
                                        className="p-2 text-red-400 hover:bg-red-900/30 rounded-lg transition-colors"
                                        title="Delete"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-1">{type.name}</h3>
                            <p className="text-sm text-gray-400">ID: {type.id}</p>
                        </div>
                    ))}
                </div>

                {topicTypes.length === 0 && !typesLoading && (
                    <div className="text-center py-12 bg-gray-800/50 rounded-xl border border-dashed border-gray-700">
                        <p className="text-gray-500">No topic types found. Create one to get started.</p>
                    </div>
                )}
            </section>

            {/* Topics Section */}
            <section className="animate-fade-in-up bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                <div className="p-6 border-b border-gray-700 flex justify-between items-center bg-gray-800/50">
                    <div className="flex items-center gap-3">
                        <FaList className="text-red-500 text-xl" />
                        <h2 className="text-xl font-bold text-white">
                            {selectedTypeId ? `Topics (Type ID: ${selectedTypeId})` : "All Topics"}
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
                                className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                            >
                                <FaPlus /> Add Topic
                            </button>
                        </div>
                    )}
                </div>

                <div className="p-6">
                    {topicsLoading && <div className="text-center py-4 text-gray-400">Loading topics...</div>}
                    {topicsError && <div className="text-red-400 py-2">Error: {topicsError}</div>}

                    {topics.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4">
                            {topics.map((topic) => (
                                <div key={topic.id} className="bg-gray-900/50 rounded-lg border border-gray-700 p-4 hover:border-gray-600 transition-colors group">
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-3">
                                                <h3 className="text-lg font-bold text-white">{topic.name}</h3>
                                                {topic.video && <FaVideo className="text-red-500" title="Has Video" />}
                                                {topic.images && topic.images.length > 0 && <FaImages className="text-blue-500" title={`Has ${topic.images.length} Images`} />}
                                            </div>
                                            <p className="text-gray-400 text-sm line-clamp-2 max-w-2xl">{topic.description || "No description"}</p>
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
                title={editingItem ? `Edit ${modalType === "type" ? "Topic Type" : "Topic"}` : `Add ${modalType === "type" ? "Topic Type" : "Topic"}`}
            >
                {modalType === "type" ? (
                    <form onSubmit={handleSubmitType(onTypeSubmit)} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Name (English)</label>
                                <input
                                    {...registerType("name_en", { required: "English name is required" })}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2.5 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none transition-colors"
                                />
                                {errorsType.name_en && <span className="text-red-500 text-xs mt-1">{errorsType.name_en.message}</span>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Name (Arabic)</label>
                                <input
                                    {...registerType("name_ar", { required: "Arabic name is required" })}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2.5 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none transition-colors text-right"
                                />
                                {errorsType.name_ar && <span className="text-red-500 text-xs mt-1">{errorsType.name_ar.message}</span>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Type Logo</label>
                            <ImageUpload
                                value={typeLogo}
                                onChange={(val) => setValueType("logo", val as string)}
                                placeholder="Upload type logo"
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
                            <button type="button" onClick={closeModal} className="px-4 py-2 text-gray-400 hover:text-white transition-colors">Cancel</button>
                            <button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">Save Topic Type</button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleSubmitTopic(onTopicSubmit)} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Name (English)</label>
                                <input
                                    {...registerTopic("name_en", { required: "English name is required" })}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2.5 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none transition-colors"
                                />
                                {errorsTopic.name_en && <span className="text-red-500 text-xs mt-1">{errorsTopic.name_en.message}</span>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Name (Arabic)</label>
                                <input
                                    {...registerTopic("name_ar", { required: "Arabic name is required" })}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2.5 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none transition-colors text-right"
                                />
                                {errorsTopic.name_ar && <span className="text-red-500 text-xs mt-1">{errorsTopic.name_ar.message}</span>}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Description (English)</label>
                                <textarea
                                    {...registerTopic("des_en")}
                                    rows={3}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2.5 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Description (Arabic)</label>
                                <textarea
                                    {...registerTopic("des_ar")}
                                    rows={3}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2.5 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none transition-colors text-right"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Content (English)</label>
                                <textarea
                                    {...registerTopic("content_en")}
                                    rows={5}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2.5 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Content (Arabic)</label>
                                <textarea
                                    {...registerTopic("content_ar")}
                                    rows={5}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2.5 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none transition-colors text-right"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Video URL</label>
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
                            <label className="block text-sm font-medium text-gray-400 mb-2">Gallery Images</label>
                            <ImageUpload
                                value={topicImages}
                                onChange={(val) => setValueTopic("images", val as string[])}
                                multiple={true}
                                placeholder="Upload multiple images for the gallery"
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
                            <button type="button" onClick={closeModal} className="px-4 py-2 text-gray-400 hover:text-white transition-colors">Cancel</button>
                            <button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">Save Topic</button>
                        </div>
                    </form>
                )}
            </Modal>
        </div>
    );
}
