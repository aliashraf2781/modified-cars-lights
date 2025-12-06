import { useTranslation } from "react-i18next";

export default function Loader() {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  return (
    <div className="text-white h-screen flex items-center justify-center">
      {lang === "ar" ? "جاري التحميل...." : "Loading..."}
    </div>
  );
}
