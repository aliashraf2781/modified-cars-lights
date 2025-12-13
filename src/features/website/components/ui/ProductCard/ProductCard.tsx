
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useTranslation } from "react-i18next";
import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { PiXCircleDuotone } from "react-icons/pi";
import type { Topic } from "../../../../core/hooks/useTopics";

export default function ProductCard({ topic } : { topic: Topic }) {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const [openModal, setOpenModal] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  const phoneNumber = "201001744902";

  const message =
    lang === "ar"
      ? `مرحبا، أريد الاستفسار عن المنتج: ${topic.name} لنوع السيارة: ${topic.car_category?.name}`
      : `Hello, I want to inquire about the product: ${topic.name} for car type: ${topic.car_category?.name}`;

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  const openGallery = (e, index) => {
    e.preventDefault(); 
    setStartIndex(index);
    setOpenModal(true);
  };

  return (
    <>
      {openModal && (
        <div
          className="fixed inset-0 bg-black/70 z-9999 flex items-center justify-center"
          onClick={() => setOpenModal(false)}
        >
          <button
            onClick={() => setOpenModal(false)}
            className="absolute cursor-pointer z-9999 top-4 right-4 text-white"
          >
            <PiXCircleDuotone className="w-6 h-6" />
          </button>
          <div className="w-[90%] h-[90%]" onClick={(e) => e.stopPropagation()}>
            <Swiper
              initialSlide={startIndex}
              navigation
              modules={[Navigation]}
              loop
              className="w-full h-full"
            >
              {topic.images?.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <img
                    src={img}
                    className="w-full h-full object-contain"
                    alt="modal-img"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}

      <a
        href={whatsappLink}
        target="_blank"
        onClick={(e) => e.stopPropagation()}
        rel="noopener noreferrer"
        className="border h-fit flex flex-col justify-between p-4 bg-secondary rounded-lg shadow hover:shadow-lg transition-shadow"
      >
        <div className="flex flex-col gap-2">
          {/* فيديو بدون صور */}
          {topic.video && (!topic.images || topic.images.length === 0) && (
            <iframe
              src={`https://www.youtube.com/embed/${topic.video}`}
              title="YouTube video player"
              allowFullScreen
              loading="eager"
              className=" w-full h-[200px] rounded"
            />
          )}

          {/* الصور بالسلايدر */}
          {topic.images && topic.images.length > 0 && (
            <Swiper
              breakpoints={{ 0: { slidesPerView: 1.2 } }}
              spaceBetween={10}
              loop
              className="w-full h-[200px] rounded overflow-hidden"
            >
              {topic.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={image}
                    alt="product"
                    onClick={(e) => openGallery(e, index)}
                    className="w-full h-full object-cover cursor-pointer"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          {/* زر الفيديو لو فيه صور */}
          {topic.video && topic.images?.length > 0 && (
            <a
              href={`https://www.youtube.com/watch?v=${topic.video}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-2 w-full p-2 bg-red-600 text-white rounded hover:bg-red-700 transition text-center"
            >
              {lang === "ar" ? "شاهد الفيديو" : "Watch Video"}
            </a>
          )}
        </div>

        {/* النصوص */}
        <div>
          <h3 className="text-xl text-text font-bold">{topic.name}</h3>
          <p className="text-text mb-2">{topic.description}</p>
          <div className="flex items-center justify-between">
            {topic.car_category && (
              <p className="text-text">
                <span className="font-medium">
                  {lang === "ar" ? "نوع السيارة:" : "Car Type:"}
                </span>{" "}
                {topic.car_category?.name}
              </p>
            )}
            {topic.lights_category && (
              <p className="text-text">
                <span className="font-medium">
                  {lang === "ar" ? "نوع الإضاءة:" : "Lighting Type:"}
                </span>{" "}
                {topic.lights_category?.name}
              </p>
            )}
          </div>
        </div>
      </a>
    </>
  );
}
