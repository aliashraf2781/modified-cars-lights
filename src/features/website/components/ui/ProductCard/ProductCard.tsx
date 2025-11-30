// @ts-nocheck
import React from "react";
import { useTranslation } from "react-i18next";

interface ProductCardProps {
  topic: any; 
}

export default function ProductCard({ topic }: ProductCardProps) {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <div className="border flex flex-col p-4 bg-secondary rounded-lg shadow hover:shadow-lg transition-shadow">
      {topic.video && (
        <iframe
          src={`https://www.youtube.com/embed/${topic.video}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-48 mb-2 rounded"
        ></iframe>
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
    </div>
  );
}
