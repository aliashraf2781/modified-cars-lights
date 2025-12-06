// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

interface ProductCardProps {
  topic: {
    id: number;
    name: string;
    description: string | null;
    content: string | null;
    video: string | null;
    images: string[] | null;
    lights_category: { id: number; name: string }[] | null;
    car_category: { id: number; name: string; category_id: number }[] | null;
  };
}

export default function ProductCard({ topic }: ProductCardProps) {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const phoneNumber = "201001744902";

  const message =
    lang === "ar"
      ? `مرحبا، أريد الاستفسار عن المنتج: ${topic.name} لنوع السيارة: ${topic.car_category?.[0]?.name}`
      : `Hello, I want to inquire about the product: ${topic.name} for car type: ${topic.car_category?.[0]?.name}`;

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    if (!topic.images) return;
    setCurrentIndex((prev) => (prev + 1) % topic.images.length);
  };

  const prevImage = () => {
    if (!topic.images) return;
    setCurrentIndex(
      (prev) => (prev - 1 + topic.images.length) % topic.images.length
    );
  };

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="border flex flex-col p-4 bg-secondary rounded-lg shadow hover:shadow-lg transition-shadow"
    >
      {topic.video && (topic.images === null || topic.images.length === 0) && (
        <iframe
          src={`https://www.youtube.com/embed/${topic.video}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="mb-2 p-2 bg-red-600 text-white rounded hover:bg-red-700 transition text-center"
        >
          {lang === "ar" ? "شاهد الفيديو على يوتيوب" : "Watch Video on YouTube"}
        </iframe>
      )}

      {/* الاسلايدر للصور */}
      {topic.images && topic.images.length > 0 && (
        <div className="relative w-full h-48 mb-2">
          <img
            src={topic.images[currentIndex]}
            alt={`${topic.name} image ${currentIndex + 1}`}
            className="w-full h-full object-cover rounded cursor-pointer"
          />
          {/* الأسهم */}
          <button
            onClick={(e) => {
              e.preventDefault();
              prevImage();
            }}
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/50 text-white p-1 rounded"
          >
            ‹
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              nextImage();
            }}
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/50 text-white p-1 rounded"
          >
            ›
          </button>
        </div>
      )}
      {/* زرار فتح الفيديو لو فيه فيديو */}
      {topic.video && topic.images && topic.images.length > 0 && (
        <a
          href={`https://www.youtube.com/watch?v=${topic.video}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-2 p-2 bg-red-600 text-white rounded hover:bg-red-700 transition text-center"
        >
          {lang === "ar" ? "شاهد الفيديو" : "Watch Video"}
        </a>
      )}
      <h3 className="text-xl text-text font-bold">{topic.name}</h3>
      <p className="text-text mb-2">{topic.description}</p>
      <div className="flex items-center justify-between">
        <p className="text-text">
          <span className="font-medium">
            {lang === "ar" ? "نوع السيارة:" : "Car Type:"}
          </span>{" "}
          {topic.car_category?.name}
        </p>
        <p className="text-text">
          <span className="font-medium">
            {lang === "ar" ? "نوع الإضاءة:" : "Lighting Type:"}
          </span>{" "}
          {topic.lights_category?.name}
        </p>
      </div>
    </a>
  );
}
