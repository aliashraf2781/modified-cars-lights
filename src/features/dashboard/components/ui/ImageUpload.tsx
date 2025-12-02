import { useState } from "react";
import { FaCloudUploadAlt, FaTrash, FaLink, FaImage } from "react-icons/fa";

interface ImageUploadProps {
    value: string | string[];
    onChange: (value: string | string[]) => void;
    multiple?: boolean;
    placeholder?: string;
}

const CLOUDINARY_UPLOAD_PRESET = "ml_default";
const CLOUDINARY_CLOUD_NAME = "deougppf2";

export default function ImageUpload({ value, onChange, multiple = false, placeholder = "Upload Image" }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [urlInput, setUrlInput] = useState("");
    const [showUrlInput, setShowUrlInput] = useState(false);

    const images = Array.isArray(value) ? value : value ? [value] : [];

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploading(true);
        const newUrls: string[] = [];

        try {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const formData = new FormData();
                formData.append("file", file);
                formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

                const res = await fetch(
                    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
                    {
                        method: "POST",
                        body: formData,
                    }
                );

                if (!res.ok) throw new Error("Upload failed");

                const data = await res.json();
                newUrls.push(data.secure_url);
            }

            if (multiple) {
                onChange([...images, ...newUrls]);
            } else {
                onChange(newUrls[0]);
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Failed to upload image. Please check your Cloudinary configuration.");
        } finally {
            setUploading(false);
        }
    };

    const handleUrlSubmit = () => {
        if (!urlInput) return;
        if (multiple) {
            onChange([...images, urlInput]);
        } else {
            onChange(urlInput);
        }
        setUrlInput("");
        setShowUrlInput(false);
    };

    const removeImage = (index: number) => {
        if (multiple) {
            const newImages = [...images];
            newImages.splice(index, 1);
            onChange(newImages);
        } else {
            onChange("");
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-4">
                {/* Upload Controls */}
                <div className="flex gap-2">
                    <label className="flex-1 flex items-center justify-center px-4 py-2 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg cursor-pointer transition-colors group">
                        <input
                            type="file"
                            accept="image/*"
                            multiple={multiple}
                            onChange={handleFileChange}
                            className="hidden"
                            disabled={uploading}
                        />
                        <FaCloudUploadAlt className="text-2xl text-red-500 group-hover:text-red-400 mr-2" />
                        <span className="text-gray-300 group-hover:text-white">
                            {uploading ? "Uploading..." : multiple ? "Upload Images" : "Upload Image"}
                        </span>
                    </label>

                    <button
                        type="button"
                        onClick={() => setShowUrlInput(!showUrlInput)}
                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg text-gray-300 hover:text-white transition-colors"
                        title="Add from URL"
                    >
                        <FaLink />
                    </button>
                </div>

                {/* URL Input */}
                {showUrlInput && (
                    <div className="flex gap-2 animate-fade-in">
                        <input
                            type="text"
                            value={urlInput}
                            onChange={(e) => setUrlInput(e.target.value)}
                            placeholder="Paste image URL here..."
                            className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-red-500 focus:outline-none"
                        />
                        <button
                            type="button"
                            onClick={handleUrlSubmit}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                        >
                            Add
                        </button>
                    </div>
                )}

                {/* Preview Grid */}
                {images.length > 0 && (
                    <div className={`grid gap-4 ${multiple ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-1"}`}>
                        {images.map((img, idx) => (
                            <div key={idx} className="relative group aspect-video bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                                <img
                                    src={img}
                                    alt={`Uploaded ${idx + 1}`}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button
                                        type="button"
                                        onClick={() => removeImage(idx)}
                                        className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {images.length === 0 && !uploading && (
                    <div className="text-center p-6 border-2 border-dashed border-gray-700 rounded-lg text-gray-500">
                        <FaImage className="mx-auto text-3xl mb-2 opacity-50" />
                        <p className="text-sm">{placeholder}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
