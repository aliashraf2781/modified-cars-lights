import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { GrLanguage } from "react-icons/gr";

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
      className="flex cursor-pointer w-fit items-center gap-2 text-white font-medium rounded-full px-4 py-2 border hover:shadow-lg hover:scale-105 transition-all duration-300"
    >
      <GrLanguage />
      <span className="uppercase">{currentLocale === "ar" ? "EN" : "AR"}</span>
    </button>
  );
}
