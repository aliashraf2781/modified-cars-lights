// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { useTopics } from "../../../../../core/hooks/useTopics";
import { useTranslation } from "react-i18next";

export default function TopicsSlider() {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const { topics } = useTopics({});

  // sort topics by created_at
  const sortedTopics = topics.sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });
  return (
    <div className="flex container mx-auto flex-col items-center gap-8">
      <h2 className="text-3xl flex items-center gap-2 md:text-4xl font-bold text-text">
        {lang === "ar" ? "احدث " : "Latest"}
        <span className="text-red-600 animate-pulse">
          {lang === "ar" ? "منتجات" : "Products"}{" "}
        </span>
      </h2>

      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        spaceBetween={20}
        breakpoints={{
          0: { slidesPerView: 1.2 },
          640: { slidesPerView: 2.4 },
          1024: { slidesPerView: 3.5 },
        }}
        dir={lang === "ar" ? "rtl" : "ltr"}
        className="w-full h-[450px] "
      >
        {sortedTopics.slice(0, 6).map((topic) => {
          const phoneNumber = "201001744902";

          const message =
            lang === "ar"
              ? `مرحبا، أريد الاستفسار عن المنتج: ${topic.name} لنوع السيارة: ${topic.car_category?.name}`
              : `Hello, I want to inquire about the product: ${topic.name} for car type: ${topic.car_category?.name}`;

          const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
            message
          )}`;
          return (
            <SwiperSlide key={topic.id}>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-[350px] flex flex-col justify-between bg-secondary border rounded-xl overflow-hidden shadow hover:shadow-lg transition p-3 cursor-pointer"
              >
                <div className="flex flex-col gap-2">
                  {topic.video &&
                    (!topic.images || topic.images.length === 0) && (
                      <iframe
                        src={`https://www.youtube.com/embed/${topic.video}`}
                        title="YouTube video player"
                        allowFullScreen
                        loading="eager"
                        className="mb-2 w-full h-[200px] p-2 bg-red-600 text-white rounded"
                      />
                    )}

                  {topic.images && topic.images.length > 0 && (
                    <Swiper
                      breakpoints={{ 0: { slidesPerView: 1 } }}
                      spaceBetween={10}
                      autoplay
                      dir={lang === "ar" ? "rtl" : "ltr"}
                      loop
                      className="w-full h-[200px] rounded overflow-hidden"
                    >
                      {topic.images.map((image, index) => (
                        <SwiperSlide key={index}>
                          <img
                            src={image}
                            alt="product"
                            className="w-full h-full object-cover cursor-pointer"
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="mt-3 text-lg font-semibold text-text text-center">
                    {topic.name}
                  </h3>
                  <p className="text-sm text-gray-400 text-center line-clamp-2">
                    {topic.description}
                  </p>

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
              </a>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
