import { useTranslation } from "react-i18next";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  const { t } = useTranslation();
  const phoneNumber = "201001744902"; 
  const message = t("common.whatsappMessage"); 
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-green-500 text-white shadow-lg hover:scale-110 hover:bg-green-600 transition-all duration-300 group"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp size={28} className="relative z-10" />
      {/* Glow effect */}
      <span className="absolute inset-0 rounded-full border border-green-500 animate-pulse bg-green-500 blur-2xl duration-500" />
    </a>
  );
}
