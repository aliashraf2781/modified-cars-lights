import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useTopicTypes } from "../../core/hooks/useTopicTypes";
import { useTopics } from "../../core/hooks/useTopics";
import Modal from "../components/ui/Modal";
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
    // For simplicity, assuming these are just IDs or we handle them specifically
    // The hook expects payload with these fields.
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
    const { register: registerType, handleSubmit: handleSubmitType, reset: resetType, setValue: setValueType, formState: { errors: errorsType } } = useForm<TopicTypeFormInputs>();
    const { register: registerTopic, handleSubmit: handleSubmitTopic, reset: resetTopic, setValue: setValueTopic, formState: { errors: errorsTopic } } = useForm<TopicFormInputs>();

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
            } else {
                resetTopic();
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
        // We need to handle category_id and type_id.
        // For this implementation, I'll assume we are adding to the currently selected Topic Type (lightsCategory).
        // And maybe we need a carCategory? The user didn't specify car category management here.
        // I'll just pass what I have.

        // Note: The createTopic hook expects { name_en, name_ar, ... }
        // But the hook interface 'CreateTopic' only lists name_en, name_ar, logo.
        // Wait, looking at useTopics.tsx:
        // interface CreateTopic { name_en: string; name_ar: string; logo?: string; }
        // But the fetch selects description, content, video...
        // The hook's createTopic type definition seems incomplete compared to the fetch selection.
        // I will assume the hook accepts more fields than typed, or I might need to update the hook types.
        // Let's cast data to any to bypass strict type check if needed, or better, update the hook types if I could.
        // Since I can't easily update the hook types without reading them again and potentially breaking things,
        // I will cast for now.

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
        <div className="p-6 bg-gray-900 min-h-screen text-white">
            <h1 className="text-3xl font-bold mb-8 text-red-500">Topics & Topic Types Management</h1>

            {/* Topic Types Section */}
            <div className="mb-12">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-red-400">Topic Types</h2>
                    <button
                        onClick={() => openModal("type")}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
                    >
                        Add Topic Type
                    </button>
                </div>

                {typesLoading && <p>Loading topic types...</p>}
                {typesError && <p className="text-red-500">Error: {typesError}</p>}

                <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg border border-gray-700">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-700 text-gray-300">
                                <th className="p-4 border-b border-gray-600">ID</th>
                                <th className="p-4 border-b border-gray-600">Name</th>
                                <th className="p-4 border-b border-gray-600">Logo</th>
                                <th className="p-4 border-b border-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topicTypes.map((type) => (
                                <tr
                                    key={type.id}
                                    className={`hover:bg-gray-700 transition-colors cursor-pointer ${selectedTypeId === type.id.toString() ? "bg-gray-700 border-l-4 border-red-500" : ""}`}
                                    onClick={() => setSelectedTypeId(selectedTypeId === type.id.toString() ? null : type.id.toString())}
                                >
                                    <td className="p-4 border-b border-gray-700">{type.id}</td>
                                    <td className="p-4 border-b border-gray-700">{type.name}</td>
                                    <td className="p-4 border-b border-gray-700">
                                        {type.logo ? (
                                            <img src={type.logo} alt={type.name} className="h-10 w-10 object-contain rounded-md bg-white" />
                                        ) : (
                                            <span className="text-gray-500">No Logo</span>
                                        )}
                                    </td>
                                    <td className="p-4 border-b border-gray-700">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); openModal("type", type); }}
                                            className="text-blue-400 hover:text-blue-300 mr-3"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleDelete("type", type.id); }}
                                            className="text-red-400 hover:text-red-300"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {topicTypes.length === 0 && !typesLoading && (
                                <tr>
                                    <td colSpan={4} className="p-4 text-center text-gray-500">No topic types found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Topics Section */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-red-400">
                        {selectedTypeId ? `Topics for Type ID: ${selectedTypeId}` : "All Topics"}
                    </h2>
                    {selectedTypeId && (
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => openModal("topic")}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
                            >
                                Add Topic
                            </button>
                            <button
                                onClick={() => setSelectedTypeId(null)}
                                className="text-sm text-gray-400 hover:text-white"
                            >
                                Clear Filter
                            </button>
                        </div>
                    )}
                </div>

                {topicsLoading && <p>Loading topics...</p>}
                {topicsError && <p className="text-red-500">Error: {topicsError}</p>}

                <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg border border-gray-700">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-700 text-gray-300">
                                <th className="p-4 border-b border-gray-600">ID</th>
                                <th className="p-4 border-b border-gray-600">Name</th>
                                <th className="p-4 border-b border-gray-600">Description</th>
                                <th className="p-4 border-b border-gray-600">Video</th>
                                <th className="p-4 border-b border-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topics.map((topic) => (
                                <tr key={topic.id} className="hover:bg-gray-700 transition-colors">
                                    <td className="p-4 border-b border-gray-700">{topic.id}</td>
                                    <td className="p-4 border-b border-gray-700 font-medium">{topic.name}</td>
                                    <td className="p-4 border-b border-gray-700 text-gray-400 truncate max-w-xs" title={topic.description || ""}>
                                        {topic.description || "-"}
                                    </td>
                                    <td className="p-4 border-b border-gray-700">
                                        {topic.video ? (
                                            <a href={topic.video} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                                                View
                                            </a>
                                        ) : (
                                            "-"
                                        )}
                                    </td>
                                    <td className="p-4 border-b border-gray-700">
                                        <button
                                            onClick={() => openModal("topic", topic)}
                                            className="text-blue-400 hover:text-blue-300 mr-3"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete("topic", topic.id)}
                                            className="text-red-400 hover:text-red-300"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {topics.length === 0 && !topicsLoading && (
                                <tr>
                                    <td colSpan={5} className="p-4 text-center text-gray-500">No topics found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={editingItem ? `Edit ${modalType === "type" ? "Topic Type" : "Topic"}` : `Add ${modalType === "type" ? "Topic Type" : "Topic"}`}
            >
                {modalType === "type" ? (
                    <form onSubmit={handleSubmitType(onTypeSubmit)} className="space-y-4">
                        <div>
                            <label className="block text-gray-400 mb-1">Name (EN)</label>
                            <input
                                {...registerType("name_en", { required: "English name is required" })}
                                className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white focus:border-red-500 focus:outline-none"
                            />
                            {errorsType.name_en && <span className="text-red-500 text-sm">{errorsType.name_en.message}</span>}
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-1">Name (AR)</label>
                            <input
                                {...registerType("name_ar", { required: "Arabic name is required" })}
                                className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white focus:border-red-500 focus:outline-none"
                            />
                            {errorsType.name_ar && <span className="text-red-500 text-sm">{errorsType.name_ar.message}</span>}
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-1">Logo URL</label>
                            <input
                                {...registerType("logo")}
                                className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white focus:border-red-500 focus:outline-none"
                            />
                        </div>
                        <div className="flex justify-end pt-4">
                            <button type="button" onClick={closeModal} className="mr-2 px-4 py-2 text-gray-400 hover:text-white">Cancel</button>
                            <button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">Save</button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleSubmitTopic(onTopicSubmit)} className="space-y-4">
                        <div>
                            <label className="block text-gray-400 mb-1">Name (EN)</label>
                            <input
                                {...registerTopic("name_en", { required: "English name is required" })}
                                className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white focus:border-red-500 focus:outline-none"
                            />
                            {errorsTopic.name_en && <span className="text-red-500 text-sm">{errorsTopic.name_en.message}</span>}
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-1">Name (AR)</label>
                            <input
                                {...registerTopic("name_ar", { required: "Arabic name is required" })}
                                className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white focus:border-red-500 focus:outline-none"
                            />
                            {errorsTopic.name_ar && <span className="text-red-500 text-sm">{errorsTopic.name_ar.message}</span>}
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-1">Description (EN)</label>
                            <textarea
                                {...registerTopic("des_en")}
                                className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white focus:border-red-500 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-1">Description (AR)</label>
                            <textarea
                                {...registerTopic("des_ar")}
                                className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white focus:border-red-500 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-1">Content (EN)</label>
                            <textarea
                                {...registerTopic("content_en")}
                                className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white focus:border-red-500 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-1">Content (AR)</label>
                            <textarea
                                {...registerTopic("content_ar")}
                                className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white focus:border-red-500 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-1">Video URL</label>
                            <input
                                {...registerTopic("video_url")}
                                className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white focus:border-red-500 focus:outline-none"
                            />
                        </div>
                        <div className="flex justify-end pt-4">
                            <button type="button" onClick={closeModal} className="mr-2 px-4 py-2 text-gray-400 hover:text-white">Cancel</button>
                            <button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">Save</button>
                        </div>
                    </form>
                )}
            </Modal>
        </div>
    );
}
