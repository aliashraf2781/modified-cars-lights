import { HiLanguage } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface Props {
  currentLocale: string;
}

export default function LanguageSwitcher({ currentLocale }: Props) {
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    const newPath = location.pathname.replace(
      `/${i18n.language}`,
      `/${newLang}`
    );
    navigate(newPath);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex w-fit items-center gap-2 text-white font-medium rounded-full px-4 py-2 border hover:shadow-lg hover:scale-105 transition-all duration-300"
    >
      <HiLanguage size={20} />
      <span className="uppercase">{currentLocale}</span>
    </button>
  );
}
