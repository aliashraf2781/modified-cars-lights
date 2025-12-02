import { useTranslation } from "react-i18next";
import { FaTiktok, FaYoutube } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";

export default function ContactPage() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen text-neutral-200 ">
      <div className="container mx-auto px-5 md:px-0 py-20 flex flex-col gap-6">
        <h1 className="text-6xl font-bold mb-5 text-red-700 flex flex-col gap-2">
          {t("contact.title")}
          <span className="text-text text-sm">{t("contact.subtitle")}</span>
        </h1>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d219.7307974201977!2d31.034687!3d31.3848473!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f79d943b1c7d5f%3A0x959a2513409fa9ab!2sKazyon!5e1!3m2!1sar!2seg!4v1732915750000!5m2!1sar!2seg"
          width="100%"
          height="400"
          loading="lazy"
          className="rounded-lg"
        ></iframe>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {/* whatsapp */}
          <a
            href="https://wa.me/+201001744902"
            className=" p-6 rounded-lg flex flex-col bg-secondary gap-2 items-center hover:shadow-lg hover:border-gray-300 hover:border-2 hover:scale-105 transition-all duration-300 cursor-pointer  "
          >
            <FaWhatsapp className="w-25 h-25 text-white bg-green-700 p-3 rounded-xl" />
            <p className="text-text text-center text-sm">
              {t("contact.whatsapp")}
            </p>
          </a>
          <a
            href="https://www.youtube.com/@modifiedcarlights"
            className=" p-6 rounded-lg flex flex-col bg-secondary gap-2 items-center hover:shadow-lg hover:border-gray-300 hover:border-2 hover:scale-105 transition-all duration-300  cursor-pointer  "
          >
            <FaYoutube className="w-25 h-25 text-red-700 bg-white p-3 rounded-xl" />
            <p className="text-text text-center text-sm">
              {t("contact.youtube")}
            </p>
          </a>
          {/* email */}
          <a
            href="https://www.tiktok.com/@modifiedcarlights?is_from_webapp=1&sender_device=pc"
            className=" p-6 rounded-lg flex flex-col bg-secondary gap-2 items-center hover:shadow-lg hover:border-gray-300 hover:border-2 hover:scale-105 transition-all duration-300 cursor-pointer  "
          >
            <FaTiktok className="w-25 h-25 text-white bg-black  p-3 rounded-xl" />
            <p className="text-text text-center text-sm">
              {t("contact.tiktok")}
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}
